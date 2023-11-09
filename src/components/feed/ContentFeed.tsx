import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, loading, hasMore, loadMore } = useGetFeed();

  return <Feed posts={posts} loading={loading} loadMore={loadMore} hasMore={hasMore}/>;
};
export default ContentFeed;
