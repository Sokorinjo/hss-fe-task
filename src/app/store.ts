import { create } from "zustand";
import { type Post } from "../lib/types";

type PostsStore = {
  count: number,
  selectedPosts: Post[],
  appendPost: (post: Post) => void
  removePost: (id: number) => void
  clearPostsArray:() => void
}

export const usePostsStore = create<PostsStore>((set) => ({
  count: 0,
  selectedPosts:[],
  appendPost: (post: Post) => {
    set((state) => ({selectedPosts: [...state.selectedPosts, post]}))
  },
  removePost: (id: number) => {
    set((state) => ({selectedPosts: state.selectedPosts.filter((post) => {
      return post.id !== id
    })}))
  },
  clearPostsArray: () => {
    set((state) => ({selectedPosts: []}))
  }
}))

