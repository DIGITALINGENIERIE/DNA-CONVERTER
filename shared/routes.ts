import { z } from 'zod';
import { jobs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// Simplified API for the MVP
export const api = {
  jobs: {
    create: {
      method: 'POST' as const,
      path: '/api/jobs',
      // We will handle multipart/form-data manually in the route, 
      // so input schema here validates the non-file parts if any, or we rely on logic
      input: z.object({}), 
      responses: {
        201: z.custom<typeof jobs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/jobs/:id',
      responses: {
        200: z.custom<typeof jobs.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    download: {
      method: 'GET' as const,
      path: '/api/jobs/:id/download',
      responses: {
        200: z.any(), // Binary stream
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type JobResponse = z.infer<typeof api.jobs.get.responses[200]>;
