import type { ChangeEvent } from "react";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { ROUTES } from "../../../util/Constants";
import { useAppDispatch } from "../../../redux/hooks";
import { setToken } from "../../../redux/user";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const [data, setData] = useState<Partial<SignUpData>>({});
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };
  const handleSubmit = async () => {
    const { confirmPassword, ...requestData } = data;
    try{
      const token = await httpRequestService.signUp(requestData)
      dispatch(setToken(token))
      navigate(ROUTES.HOME)
    }catch(error){
      setError(true)
    }
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter username..."}
              title={t("input-params.username")}
              error={error}
              onChange={handleChange("username")}
            />
            <LabeledInput
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              error={error}
              onChange={handleChange("email")}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={error}
              onChange={handleChange("password")}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Confirm password..."}
              title={t("input-params.confirm-password")}
              error={error}
              onChange={handleChange("confirmPassword")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.FOLLOW}
              size={"MEDIUM"}
              onClick={handleSubmit}
            />
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.OUTLINED}
              size={"MEDIUM"}
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
