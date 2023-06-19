import React, { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

type NumberInputProps = {
  required?: boolean;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export function NumberInput({
  required,
  name,
  label,
  error,
  ...props
}: NumberInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  return (
    <div className="flex flex-row gap-4 md:mt-8 mt-4">
      <label htmlFor={name} className=" my-auto text-sm sm:text-lg">
        {_label}
      </label>
      <input
        id={name}
        type="number"
        className="input input-bordered w-full input-sm max-w-sm input-primary"
        min="0"
        {...props}
      />
      {error && <span className="text-red-700">{`Oh shit! ${error}`}</span>}
    </div>
  );
}

type ControlledNumberInputProps = {
  name: string;
  control: any;
} & NumberInputProps;
export function ControlledNumberInput({
  name,
  control,
  ...props
}: ControlledNumberInputProps) {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <NumberInput error={error?.message} {...field} {...props} />;
}