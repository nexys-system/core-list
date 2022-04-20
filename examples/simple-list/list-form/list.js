import React from "../../../_snowpack/pkg/react.js";
import Icon from "../../../components/icon.js";
import ListItem from "../list-item.js";
const List = ({
  data,
  onRemove,
  onEdit
}) => {
  if (data.length === 0) {
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Nothing was found"));
  }
  return /* @__PURE__ */ React.createElement("ul", {
    className: "list-group list-group"
  }, data.map((d, i) => /* @__PURE__ */ React.createElement(ListItem, {
    key: i,
    title: d.title,
    right: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
      onClick: () => onEdit(d),
      style: {cursor: "pointer"},
      className: "badge bg-warning rounded-pill"
    }, /* @__PURE__ */ React.createElement(Icon, {
      name: "pen"
    })), " ", /* @__PURE__ */ React.createElement("span", {
      onClick: () => onRemove(d.id),
      style: {cursor: "pointer"},
      className: "badge bg-danger rounded-pill"
    }, /* @__PURE__ */ React.createElement(Icon, {
      name: "trash"
    })))
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, d.subtitle))));
};
export default List;
