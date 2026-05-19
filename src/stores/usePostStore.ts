import { create } from "zustand";
import { Post } from "@/types";

type PostStore = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  /** 업데이트 실패 시 복원용 스냅샷 */
  _snapshot: Post[] | null;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  removePost: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  saveSnapshot: () => void;
  rollback: () => void;
};

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  _snapshot: null,
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    })),
  removePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  saveSnapshot: () => set({ _snapshot: get().posts }),
  rollback: () =>
    set((state) => ({
      posts: state._snapshot ?? state.posts,
      _snapshot: null,
    })),
}));