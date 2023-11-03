import { useField, FieldHookConfig } from "formik";
import CustomField from "../input-element/CustomField";
import { InputContainerMode } from "../input-element/StyledInputContainer";

interface TextFieldProps {
  type?: "password" | "text";
  title: string;
  name: string;
  placeholder: string;
  helperText?: string;
  error: boolean;
}

const ValidateInputWrapper = (
  props: TextFieldProps & FieldHookConfig<string>
) => {
  const { title, helperText, error, placeholder, name, type, ...otherProps } =
    props;
  const [field, meta] = useField(props);
  const helperTextFinal = meta.error ?? helperText;
  return (
    <>
      <CustomField
        mode={InputContainerMode.DEFAULT}
        label={title}
        placeholder={placeholder}
        error={error || !!meta.error}
        onChange={field.onChange}
        name={name}
        required={false}
        type={type}
      />
      {helperTextFinal && (
        <small className={"error-message"}>{helperTextFinal}</small>
      )}
    </>
  );
};

export default ValidateInputWrapper;
