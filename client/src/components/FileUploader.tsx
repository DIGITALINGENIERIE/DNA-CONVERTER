import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileCode, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export function FileUploader({ onFilesSelected, isProcessing }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isProcessing,
    accept: {
      'text/plain': ['.txt', '.dna'],
      'application/json': ['.json']
    }
  });

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={cn(
          "relative overflow-hidden group border-2 border-dashed p-12 transition-all duration-300 cursor-pointer text-center min-h-[300px] flex flex-col items-center justify-center bg-black/40",
          isDragActive ? "border-[#00ff41] bg-[#00ff41]/5" : "border-[#003b00] hover:border-[#00ff41]/50",
          isProcessing ? "opacity-50 cursor-not-allowed border-[#003b00]" : ""
        )}
      >
        <input {...getInputProps()} />
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff41] transition-all group-hover:w-6 group-hover:h-6" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff41] transition-all group-hover:w-6 group-hover:h-6" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff41] transition-all group-hover:w-6 group-hover:h-6" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff41] transition-all group-hover:w-6 group-hover:h-6" />

        <AnimatePresence mode="wait">
          {files.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <FileCode className="w-16 h-16 text-[#00ff41] mx-auto animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-[#00ff41] mb-2">TARGET LOCKED</h3>
                <div className="text-sm text-[#00ff41]/70 font-mono bg-[#003b00]/20 px-4 py-2 border border-[#003b00] inline-block">
                  {files.map(f => f.name).join(', ')}
                </div>
              </div>
              <p className="text-xs text-[#00ff41]/50 mt-4 uppercase tracking-widest">
                {isProcessing ? "UPLOAD IN PROGRESS..." : "CLICK TO REPLACE OR DROP NEW FILES"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="relative inline-block">
                <Upload className={cn(
                  "w-16 h-16 text-[#003b00] transition-colors duration-300",
                  isDragActive || "group-hover:text-[#00ff41]"
                )} />
                {isDragActive && (
                  <motion.div 
                    layoutId="upload-ring"
                    className="absolute inset-0 border-4 border-[#00ff41] rounded-full opacity-50 animate-ping"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00ff41] mb-1">
                  {isDragActive ? "INITIATE UPLOAD" : "DROP DNA SEQUENCE"}
                </h3>
                <p className="text-sm text-[#00ff41]/60 font-mono">
                  OR CLICK TO BROWSE SECURE FILES
                </p>
              </div>
              <div className="pt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto text-xs text-[#00ff41]/40 uppercase tracking-widest">
                <div className="border border-[#003b00] p-2">TXT FORMAT</div>
                <div className="border border-[#003b00] p-2">DNA FORMAT</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scanning Line Effect when dragging or processing */}
        {(isDragActive || isProcessing) && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent h-full w-full animate-scanline opacity-20" />
        )}
      </div>
    </div>
  );
}
