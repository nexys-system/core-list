import React from "react";

import * as T from "../../lib/form/type";

export const getClassName = (
  errors?: string[],
  mainClass = "form-control"
): string => {
  const isInvalid: boolean = !!errors;

  const classes = [mainClass]; //

  if (isInvalid) {
    classes.push("is-invalid");
  }

  return classes.join(" ");
};

export const InputWrapper = ({
  label,
  children,
  errors,
}: T.InputWrapperProps) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    {children}
    {errors && (
      <div id="validationServer03Feedback" className="invalid-feedback">
        {errors[0]}
      </div>
    )}
  </div>
);

export const Input = ({
  onChange,
  errors,
  disabled,
  value,
  placeholder,
}: T.InputProps<string>) => (
  <input
    className={getClassName(errors)}
    type={"text"}
    value={value || ""}
    onChange={(v) => onChange(v.target.value)}
    disabled={disabled}
    placeholder={placeholder}
  />
);

export const Textarea = ({
  onChange,
  errors,
  disabled,
  value,
}: T.InputProps<string>) => (
  <textarea
    className={getClassName(errors)}
    value={value}
    onChange={(v) => onChange(v.target.value)}
    disabled={disabled}
  />
);

export const Select = <A extends number | string>({
  onChange,
  options,
  value,
  errors,
  disabled,
}: T.InputProps<A>) => (
  <select
    className={getClassName(errors, "form-select")}
    // handle select null again
    onChange={(v) => onChange(Number(v.target.value) as any as A)}
    disabled={disabled}
    defaultValue={value}
  >
    <option></option>
    {options &&
      options.map(({ id, name }, i) => (
        <option key={i} value={id}>
          {name}
        </option>
      ))}
  </select>
);

export const SelectEnum = Select;

export const Checkbox = ({ value, onChange }: T.InputProps<boolean>) => (
  <input
    checked={value}
    type="checkbox"
    onChange={(v) => onChange(Boolean(v.target.value))}
  />
);

export const InputGeneric = (uiType: T.FormUIType) => {
  switch (uiType) {
    case T.FormUIType.Switch:
      return Checkbox;
    case T.FormUIType.Textarea:
      return Textarea;
    case T.FormUIType.SelectObject:
    case T.FormUIType.Select:
    case T.FormUIType.SelectNumber:
      return Select;
    default:
      return Input;
  }
};
