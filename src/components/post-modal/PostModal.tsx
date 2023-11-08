import React, { ReactNode, useRef } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const ref = useRef(null)
  useOutsideAlerter(ref, onClose)
  return (
    <>
      {show && (
        <StyledBlurredBackground>
          <StyledTweetModalContainer ref={ref}>
            <ModalCloseButton onClick={onClose} />
            {children}
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>
  );
};
