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
      // In a real app, we'd use FormData. 
      // For this specific MVP based on schema, we might be sending text content directly 
      // OR the backend handles multipart. Assuming multipart for robust file handling.
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await fetch(api.jobs.create.path, {
        method: api.jobs.create.method,
        body: formData, 
        // Note: fetch automatically sets Content-Type to multipart/form-data with boundary when body is FormData
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.jobs.create.responses[400].parse(await res.json());
          throw new Error(error.message);
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
