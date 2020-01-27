import * as React from "react";

import { SlateNodeProps } from "../types";
import { map } from "lodash";
import styled from "styled-components";

function getCopyText(node) {
  return node.nodes.reduce((memo, line) => `${memo}${line.text}\n`, "");
}

const languages = {
  none: "None",
  bash: "Bash",
  css: "CSS",
  clike: "C",
  csharp: "C#",
  markup: "HTML",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  powershell: "Powershell",
  python: "Python",
  ruby: "Ruby",
  typescript: "TypeScript"
};

export default function CodeBlock({
  children,
  node,
  readOnly,
  attributes,
  editor
}: SlateNodeProps) {
  //@ts-ignore
  const { data } = node;
  const language = data.get("language") || "javascript";

  const onSelectLanguage = ev => {
    //@ts-ignore
    editor.setNodeByKey(node.key, {
      //@ts-ignore
      data: { ...data, language: ev.target.value }
    });
  };

  return (
    <Container {...attributes} spellCheck={false}>
      <Code className="abc">{children}</Code>
      {!readOnly && (
        <Language
          onChange={onSelectLanguage}
          value={language}
          contentEditable={false}
        >
          {map(languages, (name, value) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Language>
      )}
    </Container>
  );
}

/*
  Based on Prism template by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/prism/)
  Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)
*/
const Code = styled.code`
  display: block;
  overflow-x: auto;
  padding: 0.5em 1em;
  line-height: 1.4em;
  color: #c5c8c6;
  pre {
    -webkit-font-smoothing: initial;
    /* font-family: ${props => props.theme.fontFamilyMono} */
    font-size: 13px;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    color: ${props => props.theme.code};
    margin: 0;
  }

  .token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #7C7C7C;
}

.token.punctuation {
	color: #c5c8c6;
}

.namespace {
	opacity: .7;
}

.token.property,
.token.keyword,
.token.tag {
	color: #96CBFE;
}

.token.class-name {
	color: #FFFFB6;
	text-decoration: underline;
}

.token.boolean,
.token.constant {
	color: #99CC99;
}

.token.symbol,
.token.deleted {
	color: #f92672;
}

.token.number {
	color: #FF73FD;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #A8FF60;
}

.token.variable {
	color: #C6C5FE;
}

.token.operator {
	color: #EDEDED;
}

.token.entity {
	color: #FFFFB6;
	cursor: help;
}

.token.url {
	color: #96CBFE;
}

.language-css .token.string,
.style .token.string {
	color: #87C38A;
}

.token.atrule,
.token.attr-value {
	color: #F9EE98;
}

.token.function {
	color: #DAD085;
}

.token.regex {
	color: #E9C062;
}

.token.important {
	color: #fd971f;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}
`;

const Language = styled.select`
  position: absolute;
  bottom: 2px;
  right: 2px;
  opacity: 0;
`;

const Container = styled.div`
  position: relative;
  background: var(--bg-sections);
  border-radius: 4px;
  border: 1px solid var(--color-border);

  &:hover {
    > span {
      opacity: 1;
    }

    ${Language} {
      opacity: 1;
    }
  }
`;
