import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import { Overlay } from "../overlay/Overlay";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  return (
    <>
      {show && (
          <StyledBlurredBackground>
            <Overlay onClick={onClose} />
            <StyledTweetModalContainer>
              <ModalCloseButton onClick={onClose} />
              {children}
            </StyledTweetModalContainer>
          </StyledBlurredBackground>
      )}
    </>
  );
};
