import React from "react";

import * as T from "./type";
import { isNotPartial } from "./utils";

interface FormWrapperProps<A, B> {
  onSuccess: (formData: A, asyncCallResponse?: B) => void;
  clientValidationFunction?: <A>(_a: Partial<A>) => T.FormErrors<A>;
  asyncCall?: (formData: A) => Promise<B>;
  FormUI: (props: T.FormUIProps<A>) => JSX.Element;
  errors?: T.FormErrors<A>;
  children?: JSX.Element;
}

export const FormWrapper = <A, B>({
  onSuccess,
  clientValidationFunction,
  FormUI,
  errors: externalErrors,
  asyncCall,
  children,
}: FormWrapperProps<A, B>) => {
  const [formData, setFormData] = React.useState<Partial<A>>({});
  const [errors, setErrors] = React.useState<T.FormErrors<A>>(
    externalErrors || {}
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // client validation
    const validation = clientValidationFunction
      ? clientValidationFunction(formData)
      : {};

    if (!isNotPartial(formData, validation)) {
      // errors found
      setErrors(validation);
      return;
    }

    // reset errors
    setErrors({});
    // and pass value up

    if (asyncCall) {
      setLoading(true);
      asyncCall(formData)
        .then((response) => {
          onSuccess(formData, response);
        })
        .catch((x) => setErrors(x))
        .finally(() => setLoading(false));

      return;
    }

    onSuccess(formData);
  };

  return (
    <FormUI
      loading={loading}
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      onSubmit={handleSubmit}
    >
      {children}
    </FormUI>
  );
};

//

export const generateFormUI =
  (
    InputGeneric: (uxType: T.UXType) => (a: T.InputProps<any>) => JSX.Element,
    Wrapper: (a: T.WrapperProps) => JSX.Element,
    SubmitButton: (a: T.SubmitButtonProps) => JSX.Element
  ) =>
  <A,>(formDef: T.FormDefUnit<A>[]) =>
  (props: T.FormUIProps<A>): JSX.Element =>
    (
      <form onSubmit={props.onSubmit}>
        {formDef.map(({ name, uxType, label, placeholder, info }, key) => {
          const Input = InputGeneric(uxType);

          return (
            <Wrapper
              key={key}
              label={label}
              error={props.errors[name]}
              info={info}
            >
              <Input
                disabled={props.loading}
                placeholder={placeholder}
                value={props.formData[name]}
                onChange={(value) =>
                  props.setFormData({ ...props.formData, [name]: value })
                }
              />
            </Wrapper>
          );
        })}

        <SubmitButton disabled={props.loading} />
        {props.children}
      </form>
    );