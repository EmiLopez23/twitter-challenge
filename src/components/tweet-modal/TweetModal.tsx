import React from "react";
import TweetBox from "../tweet-box/TweetBox";
import { PostModal } from "../post-modal/PostModal";

interface TweetModalProps {
  onClose: () => void;
}

export const TweetModal = ({ onClose }: TweetModalProps) => {
  return (
    <>
      <PostModal onClose={onClose}>
        <TweetBox borderless close={onClose} />
      </PostModal>
    </>
  );
};
export default TweetModal;
