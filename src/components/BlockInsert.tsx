import React, { useState, useEffect, useRef } from "react";
import { Editor, findDOMNode } from "slate-react";
import { Value, Node } from "slate";
import { Portal } from "react-portal";
import styled from "styled-components";

export const ToggleButton = styled.span`
  transition: 0.1s transform ease-in-out;
  border: 1px solid #ddd;
  border-radius: 100%;
  padding: 4px;
  font-size: 30px;
  user-select: none;
  margin-left: -30px;
`;
type Props = {
  editor: Editor;
  // theme: Object;
};

export default function BlockInsert(props: Props) {
  const [top, setTop] = useState(-1000);
  const [left, setLeft] = useState(-1000);
  const [active, setActive] = useState(false);
  const [closestRootNode, setClosestRootNode] = useState(null);
  const blockEl = useRef(null);
  let mouseMoveTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return function cleanup() {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  useEffect(() => {
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = undefined;
    }
    mouseMoveTimeout = setTimeout(() => setActive(false), 2000);
  }, [active]);

  function handleMouseMove(event: MouseEvent) {
    const triggerPoint = blockEl.current.getBoundingClientRect().left + 300;
    const result = findClosestRootNode(props.editor.value, event);
    setActive(event.clientX < triggerPoint);
    if (result) {
      setClosestRootNode(result.node);

      // do not show block menu when it's open, the paragraph isn't empty
      // or the current node is an embed.
      const shouldHideToolbar =
        result.node.type !== "paragraph" ||
        !!result.node.text.trim() ||
        result.node.isVoid;

      if (shouldHideToolbar) {
        setLeft(-1000);
        setActive(false);
      } else {
        setLeft(Math.round(result.bounds.left - 20));
        setTop(Math.round(result.bounds.top + window.scrollY));
      }
    }
  }

  function handleToggleButtonClick(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();

    setActive(false);
    props.editor.value.document.nodes.forEach(node => {
      if (node && node.type === "block-toolbar") {
        props.editor.setNodeByKey(node.key, {
          type: "paragraph",
          isVoid: false
        });
      }
    });

    if (
      closestRootNode &&
      !closestRootNode.text.trim() &&
      closestRootNode.type === "paragraph"
    ) {
      props.editor.setNodeByKey(closestRootNode.key, {
        type: "block-toolbar",
        isVoid: true
      });
    }
  }

  const style = {
    top: `${top}px`,
    left: `${left}px`
  };

  return (
    <>
      <span ref={blockEl} />
      <Portal>
        <Trigger active={active} style={style}>
          <ToggleButton
            id="letterpad-editor-toolbar-toggle-button"
            className="material-icons toggle-button"
            onClick={handleToggleButtonClick}
          >
            add
          </ToggleButton>
        </Trigger>
      </Portal>
    </>
  );
}

function findClosestRootNode(value: Value, ev: MouseEvent) {
  let previous;

  for (const node of value.document.nodes) {
    const element = findDOMNode(node);
    const bounds = element.getBoundingClientRect();
    if (bounds.top > ev.clientY) return previous;
    previous = { node, element, bounds };
  }

  return previous;
}

const Trigger = styled.div<any>`
  position: absolute;
  z-index: ${props => {
    return props.theme.zIndex + 99;
  }}; /* must be below toolbar index */
  opacity: 0;
  background-color: ${props => props.theme.background};
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  line-height: 0;
  margin-left: -10px;
  /* box-shadow: inset 0 0 0 2px ${props => props.theme.blockToolbarTrigger}; */
  border-radius: 100%;
  transform: scale(0.9);
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.blockToolbarTrigger};

    svg {
      fill: ${props => props.theme.blockToolbarTriggerIcon};
    }
  }

  ${({ active }) =>
    active &&
    `
    transform: scale(1);
    opacity: .9;
  `};
`;
