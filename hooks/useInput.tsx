import React, { useState } from "react";

export type useInputProps = {
  value: string;
  onChange: Function;
  setValue: Function;
};

const useInput = (initialValue: string): useInputProps => {
  const [value, setValue]: [string, Function] = useState(initialValue);

  const onChange = (text: string): void => {
    setValue(text);
  };
  return { value, onChange, setValue };
};

export default useInput;
