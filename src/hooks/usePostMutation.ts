import { useState } from "react";
import { createOrUpdatePost } from "@/lib/api";
import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types";

const tempId = () => `__optimistic_${Date.now()}__`;

export function usePostMutation() {
  const [isSaving, setIsSaving] = useState(false);

  const { addPost, updatePost, saveSnapshot, rollback, setError } =
    usePostStore();

  async function save(data: Omit<Post, "id"> & { id?: string }) {
    setIsSaving(true);
    saveSnapshot();

    const isUpdate = !!data.id;
    const optimisticId = tempId();

    if (isUpdate) {
      updatePost(data as Post);
    } else {
      addPost({ ...data, id: optimisticId });
    }

    try {
      const saved = await createOrUpdatePost(data);
      if (!isUpdate) {
        const { posts, setPosts } = usePostStore.getState();
        setPosts(posts.map((p) => (p.id === optimisticId ? saved : p)));
      }
      return saved;
    } catch (e) {
      rollback();
      setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
      throw e;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, isSaving };
}
