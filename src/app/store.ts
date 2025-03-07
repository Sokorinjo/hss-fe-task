import { create } from "zustand";

type PostsStore = {
  count: 0
  selectedPosts: []
}

export const usePostsStore = create<PostsStore>(() => ({
  count: 0,
  selectedPosts: []
})) 