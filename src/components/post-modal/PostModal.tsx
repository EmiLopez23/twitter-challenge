import React, { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

interface PostModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const PostModal = ({ onClose, children }: PostModalProps) => {
  const ref = useOutsideAlerter(onClose);
  return createPortal(
    <StyledBlurredBackground>
      <StyledTweetModalContainer ref={ref}>
        <ModalCloseButton onClick={onClose} />
        {children}
      </StyledTweetModalContainer>
    </StyledBlurredBackground>,
    document.body
  );
};
