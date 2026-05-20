"use client";

import { useState } from "react";
import { Post } from "@/types";
import { usePostMutation } from "@/hooks/usePostMutation";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { Button, Input, Select, Textarea } from "@/components/common";
import { toast } from "sonner";

type Props = {
  post?: Post;
  onClose: () => void;
};

export default function PostForm({ post, onClose }: Props) {
  const { companies, selectedCompany } = useCompanyStore();
  const { save, isSaving } = usePostMutation();

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [resourceUid, setResourceUid] = useState(
    post?.resourceUid ?? selectedCompany ?? companies[0]?.id ?? "",
  );
  const [dateTime, setDateTime] = useState(post?.dateTime ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await save({ id: post?.id, title, content, resourceUid, dateTime });
      onClose();
    } catch {
      toast.error("저장 실패", { description: "변경사항이 롤백되었습니다." });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-text">
            {post ? "보고서 수정" : "보고서 작성"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-text-muted mb-1">회사</label>
            <Select
              value={resourceUid}
              onChange={(e) => setResourceUid(e.target.value)}
              disabled={!!selectedCompany}
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">
              기준 월
            </label>
            <Input
              type="month"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">제목</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="보고서 제목"
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1">내용</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              placeholder="보고서 내용을 입력하세요"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
