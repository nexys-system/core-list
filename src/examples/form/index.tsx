import React from "react";

import FormWrapper from "../../lib/form/form-wrapper";

import { FormDataShape, Out } from "./type";
import FormUI from "./ui";
import FormGenerated from "./generated";

import { apiCall, onSuccess, cartoonCharacters, shape } from "./utils";

export const continents = [
  { id: 1, name: "Asia" },
  { id: 2, name: "Africa" },
  { id: 3, name: "Europe" },
  { id: 4, name: "North America" },
  { id: 5, name: "South America" },
  { id: 6, name: "Australia/Oceania" },
  { id: 7, name: "Antarctica" },
];

const ages = [
  { id: 1, name: "<20" },
  { id: 2, name: "20-40" },
  { id: 3, name: "40-60" },
  { id: 4, name: "60+" },
];

const methods = [
  { id: "GET", name: "GET" },
  { id: "POST", name: "POST" },
];

const Form = FormWrapper<FormDataShape, Out>(FormUI, shape, apiCall);

export default () => (
  <>
    <h1>Form</h1>

    <p>
      Form demo.&nbsp;
      <small>
        To simulate a form rejection insert one of the following first names:{" "}
        <code>{JSON.stringify(cartoonCharacters)}</code>
      </small>
    </p>

    <Form onSuccess={onSuccess} onErrors={(errors) => ({ errors })} />

    <hr />

    <h3>Form Generated</h3>

    <FormGenerated
      data={{
        dataIn: {},
        options: {
          continent: continents,
          age: ages,
          method: methods,
        },
      }}
      onSuccess={onSuccess}
      onErrors={(errors) => ({ errors })}
    />
  </>
);
