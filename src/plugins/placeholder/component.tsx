import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import defaultTheme from "./theme.module.css";

const Embedder = ({ blockProps, block }) => {
  const hasError = block.getData().has("error");

  const [text, setText] = useState("");
  const [error, setError] = useState(hasError);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onCancel, setReadOnly, onEnter, theme, placeholder } = blockProps;

  const mergedTheme = theme ? theme : defaultTheme;
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const cancel = () => {
    onCancel(block);
    setReadOnly(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setText(value);
    setError(value.length === 0);
  };

  const onFocus = () => setReadOnly(true);

  const onKeyDown = (event) => {
    // Cancel on Escape or Del.
    if (event.keyCode === 27 || (event.keyCode === 46 && text.length === 0)) {
      cancel();
    }
  };

  const onKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (text.length === 0) return setError(true);
      await onEnter(block, text);
      setReadOnly(false);
    }
  };

  return (
    <div onBlur={cancel} onFocus={onFocus} className={mergedTheme.wrapper}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={text}
        className={error ? mergedTheme.inputError : mergedTheme.input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default Embedder;
