import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemLogProps {
  logs: string[];
  status: string;
}

export function SystemLog({ logs, status }: SystemLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full terminal-box bg-black/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#003b00] bg-[#051105]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00ff41]" />
          <span className="text-xs font-bold tracking-widest text-[#00ff41]">SYSTEM_LOGS.log</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={cn("w-3 h-3", status === 'processing' ? "animate-pulse text-[#00ff41]" : "text-[#003b00]")} />
          <span className="text-[10px] uppercase text-[#00ff41]/70">{status}</span>
        </div>
      </div>

      {/* Log Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {logs.length === 0 && (
            <div className="text-[#003b00] italic py-2 opacity-50">
              // AWAITING INPUT STREAM...
            </div>
          )}
          
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#00ff41]/90 flex gap-3 group hover:bg-[#003b00]/20 pl-1 -ml-1"
            >
              <span className="text-[#003b00] select-none text-[10px] pt-[2px]">
                {String(index).padStart(3, '0')}
              </span>
              <span className="break-all">{log}</span>
            </motion.div>
          ))}
          
          {status === 'processing' && (
            <motion.div 
              className="w-2 h-4 bg-[#00ff41] mt-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2 border-t border-[#003b00] bg-[#051105] text-[10px] text-[#00ff41]/40 flex justify-between">
        <span>MEM: OK</span>
        <span>CPU: OK</span>
        <span>NET: SECURE</span>
      </div>
    </div>
  );
}
