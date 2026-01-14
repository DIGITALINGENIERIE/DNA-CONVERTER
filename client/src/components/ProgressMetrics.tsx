import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressMetricsProps {
  progress: number;
  currentStep: string;
  status: string;
}

export function ProgressMetrics({ progress, currentStep, status }: ProgressMetricsProps) {
  const isComplete = status === 'completed';
  const isFailed = status === 'failed';
  
  return (
    <div className="space-y-6 w-full p-6 terminal-box bg-[#0d0d0d]/90">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-sm font-bold text-[#00ff41] tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00ff41] inline-block animate-pulse" />
          PROCESS_MONITOR
        </h3>
        <span className="text-2xl font-bold text-[#00ff41] font-mono tabular-nums">
          {progress}%
        </span>
      </div>

      {/* Main Progress Bar */}
      <div className="relative h-4 w-full bg-[#003b00]/30 border border-[#003b00] overflow-hidden">
        {/* Grid lines overlay */}
        <div className="absolute inset-0 z-10 w-full h-full flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-[#0d0d0d]/50" />
          ))}
        </div>
        
        <motion.div 
          className={cn(
            "h-full relative",
            isFailed ? "bg-[#ff0000]" : "bg-[#00ff41]"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>

      {/* Status Text */}
      <div className="flex justify-between items-center text-xs font-mono border-t border-[#003b00] pt-4 mt-4">
        <div className="flex flex-col">
          <span className="text-[#00ff41]/50 mb-1">CURRENT_OPERATION:</span>
          <span className={cn(
            "uppercase font-bold tracking-wider",
            isFailed ? "text-[#ff0000]" : "text-[#00ff41]"
          )}>
            {currentStep || "IDLE"}
          </span>
        </div>
        
        <div className="text-right flex flex-col items-end">
          <span className="text-[#00ff41]/50 mb-1">SYSTEM_STATUS:</span>
          <span className={cn(
            "px-2 py-0.5 text-[10px] font-bold uppercase",
            isComplete ? "bg-[#00ff41] text-black" : 
            isFailed ? "bg-[#ff0000] text-white" :
            status === 'processing' ? "bg-[#003b00] text-[#00ff41] animate-pulse" :
            "text-[#00ff41]/50 border border-[#003b00]"
          )}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Decorative technical bits */}
      <div className="grid grid-cols-4 gap-1 mt-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1 w-full transition-colors duration-500",
              i < (progress / 100) * 16 
                ? (isFailed ? "bg-[#ff0000]" : "bg-[#00ff41]") 
                : "bg-[#003b00]/30"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
