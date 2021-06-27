/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { newComment } from "./newComment";

export type comment = newComment & {
  id: number;
  upvotes: number;
  downvotes: number;
  myvote?: comment.myvote;
  created_at?: number;
};

export namespace comment {
  export enum myvote {
    NONE = "none",
    DOWNVOTE = "downvote",
    UPVOTE = "upvote",
  }
}
