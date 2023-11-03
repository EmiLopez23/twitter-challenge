import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonSize, ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { ROUTES } from "../../../util/Constants";
import { useAppDispatch } from "../../../redux/hooks";
import { setToken } from "../../../redux/user";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import ValidateInputWrapper from "../../../components/validate_input_wrapper/ValidateInputWrapper";

interface SignInData {
  username: string;
  password: string;
}

const SignInPage = () => {
  const [error, setError] = useState(false);
  const httpRequestService = useHttpRequestService();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues: SignInData = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t("error.required")),
    password: Yup.string().required(t("error.required")),
  });

  const handleSubmit = async (
    values: SignInData,
    formikHelpers: FormikHelpers<SignInData>
  ) => {
    try {
      const { token } = await httpRequestService.signIn(values);
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
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className={"input-container"}>
                <ValidateInputWrapper
                  type="text"
                  placeholder={"Enter user..."}
                  title={t("input-params.username")}
                  error={error}
                  name={"username"}
                />
                <ValidateInputWrapper
                  type="password"
                  placeholder={"Enter password..."}
                  title={t("input-params.password")}
                  error={error}
                  name={"password"}
                />
                {error && <p className={"error-message"}> {t("error.login")}</p>}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  text={t("buttons.login")}
                  buttonType={ButtonType.FOLLOW}
                  size={ButtonSize.MEDIUM}
                />
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.OUTLINED}
                  size={ButtonSize.MEDIUM}
                  onClick={() => navigate("/sign-up")}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
