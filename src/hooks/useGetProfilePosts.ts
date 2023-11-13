import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const POST_LIMIT = 10;

export const useGetProfilePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const posts = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const service = useHttpRequestService();

  useEffect(() => {
    if (!id) return;
    setHasMore(true);
    setLoading(true);
    setError(false);
    service
      .getPostsFromProfile(id, POST_LIMIT)
      .then((res) => {
        dispatch(updateFeed(res));
        dispatch(setLength(res.length));
        if (!res.length) { setHasMore(false) };
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const loadMore = async () => {
    if (!id) return;
    if (posts.length < POST_LIMIT) {
      setHasMore(false);
      return;
    };
    setLoading(true);
    try {
      const morePosts = await service.getPostsFromProfile(id, POST_LIMIT, posts.length)
      if (!morePosts.length || morePosts.length < POST_LIMIT) setHasMore(false);
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
