import { FilteredPost, Post } from "../../../types/PostResponse";

export interface PostGridProps {
    posts: Array<Post | FilteredPost>
}