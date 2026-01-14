import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, PlayCircle, ShieldAlert, Cpu } from 'lucide-react';
import { FileUploader } from '@/components/FileUploader';
import { SystemLog } from '@/components/SystemLog';
import { ProgressMetrics } from '@/components/ProgressMetrics';
import { useCreateJob, useJob } from '@/hooks/use-jobs';
import { Button } from '@/components/ui/button';
import { api, buildUrl } from '@shared/routes';
import { cn } from '@/lib/utils';

export default function Home() {
  const [jobId, setJobId] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { data: job } = useJob(jobId);

  const isProcessing = isCreating || (job?.status === 'pending' || job?.status === 'processing');
  const isComplete = job?.status === 'completed';

  const handleStart = () => {
    if (files.length === 0) return;
    createJob(files, {
      onSuccess: (data) => setJobId(data.id),
    });
  };

  const handleDownload = () => {
    if (!jobId) return;
    const url = buildUrl(api.jobs.download.path, { id: jobId });
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto relative overflow-hidden">
      {/* Background Grid - Pure CSS handled in index.css, just adding a vignette here */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0" />

      {/* Header */}
      <header className="relative z-10 border-b-2 border-[#00ff41] pb-6 mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-[#00ff41] tracking-tighter glich-text">
            ADN<span className="text-[#003b00] mx-2">///</span>CONVERTER
          </h1>
          <div className="text-[#00ff41]/60 font-mono text-sm tracking-[0.3em] mt-2 flex items-center gap-4">
             <span>V2.1 [CLASSIFIED]</span>
             <span className="w-2 h-2 bg-[#00ff41] animate-pulse rounded-full" />
             <span>SECURE CONNECTION ESTABLISHED</span>
          </div>
        </div>
        <div className="hidden md:block text-right font-mono text-xs text-[#00ff41]/40">
          <div>SYS_TIME: {new Date().toLocaleTimeString()}</div>
          <div>LOC: UNKNOWN_SECTOR</div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="terminal-box p-1 relative group">
            <div className="absolute top-0 left-0 bg-[#00ff41] text-black text-[10px] font-bold px-2 py-0.5 z-20">
              INPUT_MODULE
            </div>
            <FileUploader 
              onFilesSelected={setFiles} 
              isProcessing={isProcessing} 
            />
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            {isComplete ? (
              <button
                onClick={handleDownload}
                className="terminal-button w-full flex items-center justify-center gap-3 py-6 bg-[#00ff41] text-black hover:bg-[#fff] hover:text-black animate-pulse"
              >
                <Download className="w-6 h-6" />
                DOWNLOAD PACKAGE
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={files.length === 0 || isProcessing}
                className={cn(
                  "terminal-button w-full flex items-center justify-center gap-3 py-6",
                  isProcessing && "opacity-50 cursor-wait"
                )}
              >
                {isProcessing ? (
                  <>
                    <Cpu className="w-5 h-5 animate-spin" />
                    PROCESSING SEQUENCE...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    INITIATE CONVERSION
                  </>
                )}
              </button>
            )}

            {job?.error && (
              <div className="bg-[#ff0000]/10 border border-[#ff0000] p-4 flex items-start gap-3 text-[#ff0000]">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <div className="font-bold mb-1">CRITICAL FAILURE</div>
                  {job.error}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Data & Logs */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-[600px] lg:h-auto">
          
          {/* Metrics Panel */}
          <div className="shrink-0">
             <ProgressMetrics 
               progress={job?.progress || 0} 
               currentStep={job?.currentStep || "WAITING_FOR_COMMAND"} 
               status={job?.status || "idle"}
             />
          </div>

          {/* Terminal Log */}
          <div className="flex-1 min-h-0 relative">
            <div className="absolute -top-3 right-0 bg-[#003b00] text-[#00ff41] text-[10px] px-2 py-0.5 border border-[#00ff41]/30">
              LIVE_FEED
            </div>
            <SystemLog 
              logs={(job?.logs as string[]) || []} 
              status={job?.status || "idle"} 
            />
            {/* Scanline overlay for the terminal */}
            <div className="scanline pointer-events-none absolute inset-0 opacity-20" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#003b00] pt-4 mt-auto text-center md:text-left flex justify-between items-center text-[10px] text-[#00ff41]/30 font-mono uppercase">
        <div>
          Authored by GEN_SYS // Project 176838
        </div>
        <div className="flex gap-4">
          <span>SECURE_MODE: ON</span>
          <span>ENCRYPTION: AES-256</span>
        </div>
      </footer>
    </div>
  );
}
