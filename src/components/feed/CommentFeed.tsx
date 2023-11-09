import React from "react";
import Feed from "./Feed";
import { useGetComments } from "../../hooks/useGetComments";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { posts, loading, hasMore, loadMore } = useGetComments({
    postId,
  });

  return (
    <>
    <Feed posts={posts} loading={loading} loadMore={loadMore} hasMore={hasMore}/>
    </>
  );
};
export default CommentFeed;
