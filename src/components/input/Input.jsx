import "./input.css";

export const Input = ({
  id,
  label,
  required,
  type,
  placeholder,
  value,
  onChange,
  hasError,
  errorMsg,
}) => {
  return (
    <fieldset className="input-field">
      <label htmlFor={id}>
        {label} {required && <span className="error ms-1 fs-18">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hasError && <p className="error">{errorMsg}</p>}
    </fieldset>
  );
};
