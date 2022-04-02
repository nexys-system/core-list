// generic wrapper for forms, see args below for details
import React from 'react';

import * as T from './type';
import * as Validation from '@nexys/validation';
import { isA } from './utils';

/**
 * @type FormShape: shape of the form
 * @param FormUI : UI for the form, must respect FormUIProps
 * @param shape : validation shape
 * @param asyncCall [optional]: async call, typically backend
 * @param onSuccess [optional]: after call to the backend, action
 */
const FormWrapper =
  <FormShape, Out = any>(
    FormUI: (props: T.FormUIProps<FormShape>) => JSX.Element,
    shape: Validation.Type.Shape,
    asyncCall?: (data: FormShape) => Promise<Out>,
    { resetAfterSubmit = true }: { resetAfterSubmit?: boolean } = {}
  ) =>
  ({
    data = { options: {}, dataIn: {} },
    onSuccess,
    onErrors
  }: {
    data?: {
      dataIn: Partial<FormShape>;
      options?: {
        [k in keyof FormShape]?: { id: number; name: string }[];
      };
    };
    onSuccess?: (data: FormShape, out?: Out) => void;
    onErrors?: (
      err: any,
      data: FormShape
    ) => { errors?: T.FormErrorsGeneric<FormShape> };
  }): JSX.Element => {
    type FormErrors = T.FormErrorsGeneric<FormShape>;
    const [form, setForm] = React.useState<Partial<FormShape>>(data.dataIn);
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = Validation.Main.checkObject(form, shape) as FormErrors;

      setErrors(validation);

      if (isA(form, validation)) {
        // here call the backend
        setLoading(true);
        try {
          const out = asyncCall && (await asyncCall(form));
          setLoading(false);
          onSuccess && onSuccess(form, out);
          resetAfterSubmit && setForm({});
        } catch (err) {
          if (onErrors) {
            const { errors } = onErrors(err, form);

            if (errors) {
              setErrors(errors);
              setLoading(false);
            }
          }
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <FormUI
          loading={loading}
          errors={errors}
          form={form}
          setForm={setForm}
          options={data.options || {}}
        />
      </form>
    );
  };

export default FormWrapper;