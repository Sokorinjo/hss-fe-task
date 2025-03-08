import { createContext, Provider } from "react";
import { type Post } from "../lib/types";

type PostContextType={
  filteredPosts: Post[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

// type ProviderProps = {
//   children: React.ReactNode
// }

export const PostsContext = createContext<PostContextType | undefined>(undefined)


