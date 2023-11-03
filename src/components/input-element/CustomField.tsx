import { useRef, useState, ChangeEvent } from "react";
import {
  InputContainerMode,
  StyledInputContainer,
} from "./StyledInputContainer";
import { StyledInputElement } from "./StyledInputElement";
import { type } from "os";
import { StyledInputLabel } from "./StyledInputLabel";

interface CustomFieldProps {
  mode: InputContainerMode;
  label?: string;
  placeholder: string;
  value?: string;
  required: boolean;
  error?: boolean;
  name: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
  LeftIcon?: React.ComponentType;
  RightIcon?: React.ComponentType;
}

const CustomField = ({
  mode,
  label,
  value,
  placeholder,
  required,
  error,
  onChange,
  name,
  type = "text",
  disabled = false,
  LeftIcon,
  RightIcon,
}: CustomFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <StyledInputContainer
      mode={mode}
      className={`${error ? "error" : ""} ${disabled ? "disabled" : ""}${
        focus ? "active" : ""
      }`}
      onClick={handleClick}
    >
      {label && (
        <StyledInputLabel
          className={`${focus ? "active" : ""} ${error ? "error" : ""}`}
        >
          {label}
        </StyledInputLabel>
      )}
      {LeftIcon && <LeftIcon />}
      <StyledInputElement
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={error ? "error" : ""}
        ref={inputRef}
        disabled={disabled}
      />
      {RightIcon && <RightIcon />}
    </StyledInputContainer>
  );
};

export default CustomField;
