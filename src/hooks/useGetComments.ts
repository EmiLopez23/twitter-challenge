import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface UseGetCommentsProps {
  postId: string;
}

const COMMENT_LIMIT = 10;

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  useEffect(() => {
    setHasMore(true);
    try {
      setLoading(true);
      setError(false);
      service.getCommentsByPostId(postId, COMMENT_LIMIT).then((res) => {
        dispatch(updateFeed(res));
        dispatch(setLength(res.length));
        if (!res.length) { setHasMore(false) };
        setLoading(false);
      });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [postId]);

  const loadMore = async () => {
    if (posts.length < COMMENT_LIMIT) {
      setHasMore(false);
      return;
    };
    setLoading(true);
    try {
      const morePosts = await service.getCommentsByPostId(postId, COMMENT_LIMIT, posts.length)
      if (!morePosts.length || morePosts.length < COMMENT_LIMIT) setHasMore(false);
      dispatch(updateFeed([...posts, ...morePosts]))
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { posts, loading, error, hasMore, loadMore };
};
