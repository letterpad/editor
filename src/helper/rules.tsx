import { Rule } from "slate-html-serializer";
import { pluginConfigs } from "../plugins";

const rules: Rule[] = [];

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
