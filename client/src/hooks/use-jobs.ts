import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useJob(id: number | null) {
  return useQuery({
    queryKey: [api.jobs.get.path, id],
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.jobs.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch job status');
      return api.jobs.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Stop polling if completed or failed
      if (data && (data.status === 'completed' || data.status === 'failed')) {
        return false;
      }
      return 1000; // Poll every 1s
    },
  });
}

export function useCreateJob() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (files: File[]) => {
      // Read all files as text as the backend expects JSON with text content
      const fileData = await Promise.all(
        files.map(async (file) => {
          return new Promise<{ name: string; content: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: file.name,
                content: reader.result as string,
              });
            };
            reader.onerror = reject;
            reader.readAsText(file);
          });
        })
      );

      const res = await fetch(api.jobs.create.path, {
        method: api.jobs.create.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: fileData }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || 'Validation failed');
        }
        throw new Error('Failed to initialize sequence');
      }
      return api.jobs.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "SEQUENCE ABORTED",
        description: error.message,
      });
    },
  });
}
