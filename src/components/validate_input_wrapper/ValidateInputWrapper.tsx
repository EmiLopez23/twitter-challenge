import { CSSProperties, ChangeEvent, useRef, useState } from "react";
import { useField, FieldHookConfig } from "formik";
import { StyledInputContainer } from "../labeled-input/InputContainer";
import { StyledInputTitle } from "../labeled-input/InputTitle";
import { StyledInputElement } from "../labeled-input/StyledInputElement";
import LabeledInput from "../labeled-input/LabeledInput";

interface TextFieldProps {
  type?: "password" | "text";
  title: string;
  name: string;
  placeholder: string;
  helperText?: string;
  error: boolean;
}

const ValidateInputWrapper = (props: TextFieldProps & FieldHookConfig<string>) => {
  const {
    title,
    helperText,
    error,
    placeholder,
    name,
    type,
    ...otherProps
  } = props;
  const [field, meta] = useField(props);
  const helperTextFinal = meta.error ?? helperText;
  return (
    <>
    <LabeledInput title={title} placeholder={placeholder} error={error || !!meta.error} onChange={field.onChange} name={name} required={false} type={type}/>
    {helperTextFinal && <small className={"error-message"}>{helperTextFinal}</small>}
    </>
  );
};

export default ValidateInputWrapper;
