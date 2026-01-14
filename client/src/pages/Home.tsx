import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, PlayCircle, ShieldAlert, Cpu, Activity, Zap } from 'lucide-react';
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
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto relative overflow-hidden bg-[#050505]">
      {/* Background Grid & Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03)_0%,rgba(0,0,0,0.9)_100%)] z-0" />
      <div className="fixed inset-0 pointer-events-none border-[20px] border-black/20 z-10" />

      {/* Marketplace Suggestion - Only show when complete */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-30 bg-[#00ff41]/5 border border-[#00ff41]/20 p-4 mb-2 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#00ff41] text-black p-2"><Activity className="w-5 h-5" /></div>
              <div>
                <h4 className="text-[#00ff41] font-bold text-xs tracking-widest uppercase">Monetization Ready</h4>
                <p className="text-[9px] text-[#00ff41]/60 font-mono">Vendez ce pack sur Envato, Creative Market ou Etsy pour maximiser vos profits.</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['Envato', 'Creative Market', 'Etsy'].map(m => (
                <span key={m} className="text-[8px] border border-[#00ff41]/30 px-2 py-1 text-[#00ff41]/40 uppercase font-mono">{m}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-20 border-b border-[#00ff41]/30 pb-6 mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00ff41]/40 font-mono text-[10px] tracking-[0.5em] uppercase">
            <span className="w-1 h-1 bg-[#00ff41] rounded-full animate-ping" />
            System Status: Nominal
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#00ff41] tracking-tighter leading-none group">
            ADN<span className="text-[#003b00] group-hover:text-[#00ff41]/20 transition-colors duration-700">_</span>CONVERTER
          </h1>
        </div>
        <div className="text-right font-mono text-[10px] text-[#00ff41]/40 space-y-1 bg-black/40 p-3 border border-[#00ff41]/10 backdrop-blur-sm">
          <div className="flex justify-between gap-8"><span>CORE_TEMP:</span> <span className="text-[#00ff41]">32.4°C</span></div>
          <div className="flex justify-between gap-8"><span>SYS_TIME:</span> <span className="text-[#00ff41]">{new Date().toLocaleTimeString()}</span></div>
          <div className="flex justify-between gap-8"><span>UPLINK:</span> <span className="text-[#00ff41]">ENCRYPTED</span></div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative p-0.5 bg-gradient-to-br from-[#00ff41]/20 to-transparent rounded-sm">
            <div className="bg-black/80 backdrop-blur-md p-1 relative overflow-hidden rounded-sm border border-[#00ff41]/20">
              <div className="absolute top-0 left-0 bg-[#00ff41] text-black text-[9px] font-bold px-3 py-0.5 z-30 tracking-widest uppercase">
                Input.Matrix
              </div>
              <FileUploader 
                onFilesSelected={setFiles} 
                isProcessing={isProcessing} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            {isComplete ? (
              <Button
                onClick={handleDownload}
                size="lg"
                className="w-full h-20 bg-[#00ff41] text-black hover:bg-white transition-all duration-500 rounded-none font-black text-lg tracking-widest animate-pulse border-2 border-[#00ff41]"
              >
                <Download className="mr-3 h-6 w-6" />
                EXTRACT_DATA_PACKAGE
              </Button>
            ) : (
              <Button
                onClick={handleStart}
                disabled={files.length === 0 || isProcessing}
                size="lg"
                className={cn(
                  "w-full h-20 rounded-none font-black text-lg tracking-widest border-2 transition-all duration-500",
                  files.length > 0 && !isProcessing 
                    ? "bg-transparent text-[#00ff41] border-[#00ff41] hover:bg-[#00ff41] hover:text-black" 
                    : "bg-transparent text-[#003b00] border-[#003b00] cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <>
                    <Cpu className="mr-3 h-6 w-6 animate-spin" />
                    DECODING_SEQUENCE...
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-3 h-6 w-6" />
                    INITIATE_DECODING
                  </>
                )}
              </Button>
            )}

            {job?.error && (
              <div className="bg-[#ff0000]/10 border border-[#ff0000]/30 p-4 flex items-start gap-3 text-[#ff0000] rounded-sm backdrop-blur-md">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-[10px] font-mono leading-relaxed">
                  <div className="font-black mb-1 tracking-widest uppercase">CRITICAL_SYSTEM_FAILURE</div>
                  <div className="opacity-80">{job.error}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Data & Logs */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-[600px] lg:h-auto">
          
          {/* Metrics Panel */}
          <div className="shrink-0 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
             <ProgressMetrics 
               progress={job?.progress || 0} 
               currentStep={job?.currentStep || "AWAITING_COMMAND"} 
               status={job?.status || "idle"}
             />
          </div>

            <div className="flex-1 min-h-0 relative flex flex-col gap-4">
              <div className="flex-1 relative">
                <div className="absolute -top-3 right-4 bg-[#051105] text-[#00ff41] text-[9px] px-3 py-1 border border-[#00ff41]/30 z-30 font-black tracking-[0.2em] uppercase">
                  Live_Telemetry
                </div>
                <SystemLog 
                  logs={(job?.logs as unknown as string[]) || []} 
                  status={job?.status || "idle"} 
                />
                {/* Scanline overlay for the terminal */}
                <div className="scanline pointer-events-none absolute inset-0 opacity-10" />
              </div>

              {/* AI Marketing Visual Preview */}
              {job?.imageUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="shrink-0 border border-[#00ff41]/30 bg-black/40 p-2 rounded-sm backdrop-blur-md"
                >
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-[9px] text-[#00ff41] font-black tracking-widest uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse" />
                      AI_Generated_Visual_Asset
                    </span>
                    <span className="text-[8px] text-[#00ff41]/40 font-mono">RES: 512x512 // COMPRESSION: NONE</span>
                  </div>
                  <div className="relative aspect-video overflow-hidden border border-[#00ff41]/10 mb-3">
                    <img src={job.imageUrl} alt="Marketing Asset" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-[#00ff41]/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#00ff41]/5 border border-[#00ff41]/10 p-2">
                       <p className="text-[7px] text-[#00ff41]/40 uppercase tracking-tighter">Market Prediction</p>
                       <p className="text-[9px] text-[#00ff41] font-black truncate">HIGH_DEMAND: CINEMATIC</p>
                    </div>
                    <div className="bg-[#00ff41]/5 border border-[#00ff41]/10 p-2">
                       <p className="text-[7px] text-[#00ff41]/40 uppercase tracking-tighter">Suggested MSRP</p>
                       <p className="text-[9px] text-[#00ff41] font-black">$44.99</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#00ff41]/10 pt-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-[#00ff41]/20 font-mono uppercase tracking-[0.2em]">
        <div className="flex items-center gap-6">
          <span>Authored_by: GEN_SYS // P_ID: 176838</span>
          <span className="hidden md:inline">Node_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
        <div className="flex gap-6 bg-black/40 px-4 py-2 border border-[#00ff41]/5">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00ff41]/50 rounded-full" /> SECURE_MODE: ACTIVE</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00ff41]/50 rounded-full" /> ENCRYPTION: AES-256</span>
        </div>
      </footer>
    </div>
  );
}
