"use client";

import { useState } from "react";
import { Post } from "@/types";
import { usePosts } from "@/hooks/usePosts";
import { useCompanyStore } from "@/stores/useCompanyStore";
import PostForm from "@/components/dashboard/PostForm";
import { Pencil, Plus } from "lucide-react";
import Button from "@/components/common/Button";

export default function PostList() {
  const { posts } = usePosts();
  const { companies } = useCompanyStore();
  const [formTarget, setFormTarget] = useState<Post | null | "new">(null);

  const companyName = (uid: string) =>
    companies.find((c) => c.id === uid)?.name ?? uid;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-text-muted">보고서 ({posts.length}개)</h2>
        <Button variant="outline" className="py-1 px-2 text-xs" onClick={() => setFormTarget("new")}>
          <Plus size={13} />
          작성
        </Button>
      </div>
      <ul className="space-y-3 overflow-y-auto max-h-[250px]">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border border-border rounded-lg p-4 space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-text truncate">
                {post.title}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-text-muted">{post.dateTime}</span>
                <button
                  onClick={() => setFormTarget(post)}
                  className="text-text-muted hover:text-text transition-colors"
                >
                  <Pencil size={13} />
                </button>
              </div>
            </div>
            <span className="text-xs text-primary">
              {companyName(post.resourceUid)}
            </span>
            <p className="text-sm text-text-muted line-clamp-2">
              {post.content}
            </p>
          </li>
        ))}
      </ul>

      {formTarget !== null && (
        <PostForm
          post={formTarget === "new" ? undefined : formTarget}
          onClose={() => setFormTarget(null)}
        />
      )}
    </>
  );
}
