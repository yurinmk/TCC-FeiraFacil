import React, { useEffect } from "react";

import { useDropDown } from "../../hooks/DropDown";

export const DropDown = ({ items, onChange, placeholder, defaultValue }) => {
  const { DropDown, setPlaceholder, setItems, value, setValue } = useDropDown();

  useEffect(() => {
    setPlaceholder(placeholder);
  }, [placeholder]);

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <DropDown />
    </>
  );
};
