import * as React from "react";

import { SlateNodeProps } from "../types";
import map from "lodash.map";
import styled from "styled-components";

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
      <Code className="code-block">{children}</Code>
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
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #7c7c7c;
  }

  .token.punctuation {
    color: #c5c8c6;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.keyword,
  .token.tag {
    color: #96cbfe;
  }

  .token.class-name {
    color: #ffffb6;
    text-decoration: underline;
  }

  .token.boolean,
  .token.constant {
    color: #99cc99;
  }

  .token.symbol,
  .token.deleted {
    color: #f92672;
  }

  .token.number {
    color: #ff73fd;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a8ff60;
  }

  .token.variable {
    color: #c6c5fe;
  }

  .token.operator {
    color: #ededed;
  }

  .token.entity {
    color: #ffffb6;
    cursor: help;
  }

  .token.url {
    color: #96cbfe;
  }

  .language-css .token.string,
  .style .token.string {
    color: #87c38a;
  }

  .token.atrule,
  .token.attr-value {
    color: #f9ee98;
  }

  .token.function {
    color: #dad085;
  }

  .token.regex {
    color: #e9c062;
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
  font-size: 12px;
  border: none;
`;

const Container = styled.div`
  position: relative;

  &:hover {
    > span {
      opacity: 1;
    }

    ${Language} {
      opacity: 1;
    }
  }
`;
