import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";

const ProfileFeed = () => {
  const { posts, loading, hasMore, loadMore } = useGetProfilePosts();

  return (
    <>
      <Feed posts={posts} loading={loading} loadMore={loadMore} hasMore={hasMore}/>
    </>
  );
};
export default ProfileFeed;
