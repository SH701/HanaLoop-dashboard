import { useEffect } from "react";
import { fetchPosts } from "@/lib/api";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { usePostStore } from "@/stores/usePostStore";

export function usePosts() {
  const { selectedCompany } = useCompanyStore();
  const { posts, isLoading, error, setPosts, setLoading, setError } = usePostStore();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts();
        if (!cancelled) {
          const filtered = selectedCompany
            ? data.filter((p) => p.resourceUid === selectedCompany)
            : data;
          setPosts(filtered);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [selectedCompany, setPosts, setLoading, setError]);

  return { posts, isLoading, error };
}