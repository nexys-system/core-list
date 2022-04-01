import React from "../_snowpack/pkg/react.js";
const View = (Layout, Row) => ({data, structure, title, description}) => /* @__PURE__ */ React.createElement(Layout, {
  title,
  description
}, structure.map((s, i) => {
  const value = typeof s.value === "function" ? s.value(data) : String(data[s.value]);
  return /* @__PURE__ */ React.createElement(Row, {
    key: i,
    label: s.label,
    value
  });
}));
export default View;