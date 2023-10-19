import { useEffect, useState } from "react";
import { StyledContainer } from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
import { useHttpRequestService } from "../../service/HttpRequestService";
import TweetBox from "../../components/tweet-box/TweetBox";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import { useParams } from "react-router-dom";
import { Post } from "../../service";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const service = useHttpRequestService();

  useEffect(()=>{
    service.getPostById(id ?? '').then(data => setPost(data))
  },[id])

  return (
    <StyledContainer borderRight={"1px solid #ebeef0"}>
      <StyledContainer
        padding={"16px"}
        borderBottom={"1px solid #ebeef0"}
        maxHeight={"53px"}
      >
        <StyledH5>Tweet</StyledH5>
      </StyledContainer>
      <StyledFeedContainer>
        {post ? (
          <>
            <Tweet post={post} />
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              padding={"16px"}
            >
              <TweetBox parentId={post.id} />
            </StyledContainer>

            <StyledContainer minHeight={"53.5vh"}>
              <CommentFeed postId={post.id} />
            </StyledContainer>
          </>
        ) : (
          <StyledContainer justifyContent={"center"} alignItems={"center"}>
            <Loader />
          </StyledContainer>
        )}
      </StyledFeedContainer>
    </StyledContainer>
  );
}

export default PostPage;
