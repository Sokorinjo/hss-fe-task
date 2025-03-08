import { createContext, Provider } from "react";
import { type Post } from "../lib/types";

export const PostsContext = createContext<Post | undefined>(undefined)

