"use client";

import { FC } from "react";
import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  disabled?: boolean;
  value: Record<string, any>;
  options: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
}

export const Select: FC<SelectProps> = ({
  label,
  disabled,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm leading-6 text-gray-900">{label}</label>
      <ReactSelect
        isDisabled={disabled}
        value={value}
        options={options}
        onChange={onChange}
        isMulti
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.body}
        classNames={{
          control: () => "text-sm",
        }}
      />
    </div>
  );
};
