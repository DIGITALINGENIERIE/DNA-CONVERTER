import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { converterService } from "./converter";
import { z } from "zod";
import { adnFileSchema } from "@shared/schema";

import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { registerAudioRoutes } from "./replit_integrations/audio";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerChatRoutes(app);
  registerImageRoutes(app);
  registerAudioRoutes(app);
  
  // POST /api/jobs
  app.post(api.jobs.create.path, async (req, res) => {
    try {
      // Expecting JSON with files: { files: [{name, content}, ...] }
      const schema = z.object({ files: z.array(adnFileSchema) });
      const { files } = schema.parse(req.body);

      const job = await storage.createJob({
        status: "pending",
        progress: 0,
        currentStep: "Queued",
        logs: JSON.stringify(["JOB QUEUED. WAITING FOR WORKER..."]), // Init as stringified array
      });

      // Trigger background processing
      converterService.processJob(job.id, files);

      // Return job with parsed logs for frontend
      res.status(201).json({ ...job, logs: JSON.parse(job.logs) });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(400).json({ message: "Invalid request body or file format" });
    }
  });

  // GET /api/jobs/:id
  app.get(api.jobs.get.path, async (req, res) => {
    const job = await storage.getJob(Number(req.params.id));
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Parse logs string to array before sending to frontend
    res.json({ ...job, logs: JSON.parse(job.logs) });
  });

  // GET /api/jobs/:id/download
  app.get(api.jobs.download.path, async (req, res) => {
    const id = Number(req.params.id);
    const job = await storage.getJob(id);
    if (!job || job.status !== 'completed') {
      return res.status(404).json({ message: 'Result not ready or not found' });
    }

    const zip = converterService.results.get(id);
    if (!zip) {
      return res.status(404).json({ message: 'File expired or lost' });
    }

    const content = await zip.generateAsync({ type: "nodebuffer" });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="PRESET_PACKAGE_${id}.zip"`);
    res.send(content);
  });
  
  return httpServer;
}
