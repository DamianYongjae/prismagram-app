import React, { useState } from "react";

export type useInputProps = {
  value: string;
  onChange: Function;
};

const useInput = (initialValue: string): useInputProps => {
  const [value, setValue]: [string, Function] = useState(initialValue);

  const onChange = (text: string): void => {
    setValue(text);
  };
  return { value, onChange };
};

export default useInput;
