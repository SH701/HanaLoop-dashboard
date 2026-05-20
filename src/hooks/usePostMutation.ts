import { useState } from "react";
import { createOrUpdatePost } from "@/lib/api";
import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types";

export function usePostMutation() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { addPost, updatePost, saveSnapshot, rollback, setError } = usePostStore();

  async function save(data: Omit<Post, "id"> & { id?: string }) {
    setIsSaving(true);
    setSaveError(null);
    saveSnapshot();

    const isUpdate = !!data.id;

    if (isUpdate) {
      updatePost(data as Post);
    } else {
      addPost({ ...data, id: "__optimistic__" });
    }

    try {
      const saved = await createOrUpdatePost(data);
      if (!isUpdate) {
        const { posts, setPosts } = usePostStore.getState();
        setPosts(posts.map((p) => (p.id === "__optimistic__" ? saved : p)));
      }
      return saved;
    } catch (e) {
      rollback();
      const msg = e instanceof Error ? e.message : "저장에 실패했습니다.";
      setSaveError(msg);
      setError(msg);
      throw e;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, isSaving, saveError, setSaveError };
}
