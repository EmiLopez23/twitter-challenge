import React, { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import Button from "../button/Button";
import { ButtonSize, ButtonType } from "../button/StyledButton";
import { StyledModalContainer } from "./ModalContainer";
import { StyledContainer } from "../common/Container";
import { StyledH5, StyledP } from "../common/text";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

interface ModalProps {
  title: string;
  text?: string;
  img?: string;
  onClose: () => void;
  acceptButton: ReactNode;
}

const Modal = ({ text, acceptButton, onClose, img, title }: ModalProps) => {
  const wrapperRef = useOutsideAlerter(onClose);
  return createPortal(
    <StyledBlurredBackground>
      <StyledModalContainer ref={wrapperRef}>
        <StyledContainer alignItems={"center"} justifyContent={"center"}>
          {img && (
            <img src={img} alt={"modal"} width={"32px"} height={"26px"} />
          )}
          <StyledContainer
            alignItems={"center"}
            justifyContent={"center"}
            padding={img ? "24px 0 0 0" : "0"}
            gap={"24px"}
          >
            <StyledContainer gap={img ? "8px" : "24px"}>
              <StyledH5>{title}</StyledH5>
              <StyledP primary={false}>{text}</StyledP>
            </StyledContainer>
            <StyledContainer alignItems={"center"}>
              {acceptButton}
              <Button
                buttonType={ButtonType.OUTLINED}
                text={"Cancel"}
                size={ButtonSize.MEDIUM}
                onClick={onClose}
              />
            </StyledContainer>
          </StyledContainer>
        </StyledContainer>
      </StyledModalContainer>
    </StyledBlurredBackground>,
    document.body
  );
};

export default Modal;
