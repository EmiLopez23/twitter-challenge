import type { ChangeEvent } from "react";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { ROUTES } from "../../../util/Constants";
import { useAppDispatch } from "../../../redux/hooks";
import { setToken } from "../../../redux/user";
import { Formik, Form } from "formik";
import { FormikHelpers } from "formik/dist/types";
import ValidateInputWrapper from "../../../components/validate_input_wrapper/ValidateInputWrapper";

interface SignUpData {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const httpRequestService = useHttpRequestService();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const initialValues: SignUpData = {
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t("error.required")),
    name: Yup.string().required(t("error.required")),
    email: Yup.string()
      .email(t("error.email"))
      .required(t("error.required"))
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    password: Yup.string()
      .required(t("error.required"))
      .min(8, t("validation.password"))
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, t("validation.password"))
      .matches(/\d/, t("validation.password")),
    confirmPassword: Yup.string()
      .required(t("error.required"))
      .oneOf([Yup.ref("password")], t("error.confirm-password")),
  });

  const handleSubmit = async (
    values: SignUpData,
    formikHelpers: FormikHelpers<SignUpData>
  ) => {
    const { confirmPassword, ...data } = values;
    try {
      const { token } = await httpRequestService.signUp(data);
      dispatch(setToken(token));
      navigate(ROUTES.HOME);
    } catch (error) {
      setError(true);
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={"input-container"}>
                <ValidateInputWrapper
                  placeholder={"Enter username..."}
                  title={t("input-params.username")}
                  name="username"
                  error={error}
                />
                <ValidateInputWrapper
                  placeholder={"Enter name..."}
                  title={t("input-params.name")}
                  name="name"
                  error={error}
                />
                <ValidateInputWrapper
                  placeholder={"Enter email..."}
                  title={t("input-params.email")}
                  name="email"
                  error={error}
                />
                <ValidateInputWrapper
                  type="password"
                  placeholder={"Enter password..."}
                  title={t("input-params.password")}
                  name="password"
                  error={error}
                />
                <ValidateInputWrapper
                  type="password"
                  placeholder={"Confirm password..."}
                  title={t("input-params.confirm-password")}
                  name="confirmPassword"
                  error={error}
                />
                {error && (
                  <p className={"error-message"}>{t("error.register")}</p>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.FOLLOW}
                  size={"MEDIUM"}
                />
                <Button
                  text={t("buttons.login")}
                  buttonType={ButtonType.OUTLINED}
                  size={"MEDIUM"}
                  onClick={() => navigate(ROUTES.SIGN_IN)}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
