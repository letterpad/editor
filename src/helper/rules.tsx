import React from "react";
import { Rule } from "slate-html-serializer";
import { pluginConfigs } from "../plugins";

const rules: Rule[] = [
  {
    deserialize(el, next) {
      if (
        el.tagName.toLowerCase() == "p" ||
        el.tagName.toLowerCase() == "div"
      ) {
        return {
          object: "block",
          type: "paragraph",
          data: {
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes)
        };
      }
    },
    // Add a serializing function property to our rule...
    serialize(obj, children) {
      if (obj.object == "block" && obj.type == "paragraph") {
        return <p className={obj.data.get("className")}>{children}</p>;
      }
    }
  }
];

const setRule = (rule: Rule) => {
  rules.push(rule);
};

export const getRules = () => {
  pluginConfigs.forEach(plugin => {
    if (plugin.rules) {
      setRule(plugin.rules);
    }
  });
  return rules;
};
export default rules;
