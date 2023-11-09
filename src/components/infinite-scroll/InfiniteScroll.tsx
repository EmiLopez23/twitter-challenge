import { useEffect, useRef } from "react";
import Loader from "../loader/Loader";

interface InfiniteScrollProps {
  children: React.ReactNode;
  loadMore: () => Promise<void>;
  hasNext: boolean;
}

const InfiniteScroll = ({
  children,
  loadMore,
  hasNext,
}: InfiniteScrollProps) => {
  const ref = useRef(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNext && !isFetching.current) {
          isFetching.current = true;
          loadMore().finally(() => {
            isFetching.current = false;
          });
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasNext, loadMore]);

  return (
    <div style={{ width: "100%" }}>
      {children}
      <div ref={ref}></div>
      {hasNext && <Loader />}
    </div>
  );
};

export default InfiniteScroll;
