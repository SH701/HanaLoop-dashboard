import { useEffect, useMemo } from "react";
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
        if (!cancelled) setPosts(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [setPosts, setLoading, setError]);

  const visiblePosts = useMemo(
    () => selectedCompany ? posts.filter((p) => p.resourceUid === selectedCompany) : posts,
    [posts, selectedCompany]
  );

  return { posts: visiblePosts, isLoading, error };
}
