import React, { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import logo from "../../../assets/logo.png";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwitchButton from "../../switch/SwitchButton";
import { ButtonSize, ButtonType } from "../../button/StyledButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { StyledPromptContainer } from "./PromptContainer";
import { StyledContainer } from "../../common/Container";
import { StyledP } from "../../common/text";
import { setToken } from "../../../redux/user";
import { ROUTES } from "../../../util/Constants";
import { Overlay } from "../../overlay/Overlay";

interface LogoutPromptProps {
  show: boolean;
}

const LogoutPrompt = ({ show }: LogoutPromptProps) => {
  const [showPrompt, setShowPrompt] = useState<boolean>(show);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    setShowModal(true);
  };

  const handleLanguageChange = () => {
    if (i18n.language === "es") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("es");
    }
  };

  const handleLogout = () => {
    dispatch(setToken(""))
    navigate(ROUTES.SIGN_IN);
  };

  useEffect(() => {
    setShowPrompt(show);
  }, [show]);

  return (
    <>
      {showPrompt && (
        <>
        <Overlay onClick={() => setShowPrompt(false)} />
        <StyledPromptContainer>
          <StyledContainer
            flexDirection={"row"}
            gap={"16px"}
            borderBottom={"1px solid #ebeef0"}
            padding={"16px"}
            alignItems={"center"}
          >
            <StyledP primary>Es:</StyledP>
            <SwitchButton
              checked={i18n.language === "es"}
              onChange={handleLanguageChange}
            />
          </StyledContainer>
          <StyledContainer onClick={handleClick} alignItems={"center"}>
            <StyledP primary>{`${t("buttons.logout")} @${
              user.username
            }`}</StyledP>
          </StyledContainer>
        </StyledPromptContainer>
        </>
      )}
      <Modal
        show={showModal}
        text={t("modal-content.logout")}
        img={logo}
        title={t("modal-title.logout")}
        acceptButton={
          <Button
            buttonType={ButtonType.FOLLOW}
            text={t("buttons.logout")}
            size={ButtonSize.MEDIUM}
            onClick={handleLogout}
          />
        }
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default LogoutPrompt;
