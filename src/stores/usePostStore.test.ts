import { usePostStore } from "./usePostStore";
import { Post } from "@/types";

const makePost = (id: string): Post => ({
  id,
  title: `title-${id}`,
  resourceUid: "c1",
  dateTime: "2024-01",
  content: `content-${id}`,
});

beforeEach(() => {
  usePostStore.setState({ posts: [], _snapshot: null, error: null });
});

describe("usePostStore", () => {
  test("saveSnapshot 후 addPost → rollback 시 이전 상태로 복원된다", () => {
    const store = usePostStore.getState();
    store.setPosts([makePost("1")]);
    store.saveSnapshot();
    store.addPost(makePost("2"));

    expect(usePostStore.getState().posts).toHaveLength(2);

    usePostStore.getState().rollback();
    expect(usePostStore.getState().posts).toHaveLength(1);
    expect(usePostStore.getState().posts[0].id).toBe("1");
  });

  test("saveSnapshot 후 updatePost → rollback 시 이전 상태로 복원된다", () => {
    const store = usePostStore.getState();
    store.setPosts([makePost("1")]);
    store.saveSnapshot();
    store.updatePost({ ...makePost("1"), title: "수정됨" });

    expect(usePostStore.getState().posts[0].title).toBe("수정됨");

    usePostStore.getState().rollback();
    expect(usePostStore.getState().posts[0].title).toBe("title-1");
  });

  test("rollback 후 _snapshot은 null로 초기화된다", () => {
    const store = usePostStore.getState();
    store.setPosts([makePost("1")]);
    store.saveSnapshot();
    store.addPost(makePost("2"));
    usePostStore.getState().rollback();

    expect(usePostStore.getState()._snapshot).toBeNull();
  });
});
