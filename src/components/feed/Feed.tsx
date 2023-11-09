import React from "react";
import { Post } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";

interface FeedProps {
  posts: Post[];
  loading: boolean;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

const Feed = ({ posts, loading, loadMore, hasMore }: FeedProps) => {
  return (
    <StyledContainer alignItems="center">
      {!posts.length && !loading && <p>No posts found</p>}
      <InfiniteScroll loadMore={loadMore} hasNext={hasMore}>
        {posts.map((post: Post) => (
          <Tweet key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </StyledContainer>
  );
};

export default Feed;
