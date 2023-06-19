import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

type DateInputProps = {
  required?: boolean;
  label: string;
  min: Date;
  max: Date;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "min" | "max">;
export function DateInput({
  required,
  label,
  min,
  max,
  error,
  ...props
}: DateInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  return (
    <div className="flex flex-row gap-4 md:mt-8 mt-4 flex-wrap">
      <label className=" my-auto text-sm sm:text-lg ">{_label}</label>
      <input
        type="datetime-local"
        className="input w-full max-w-fit sm:max-w-[300px] md:max-w-[350px] input-primary input-sm"
        {...props}
        min={min.toISOString().slice(0, 16)}
        max={max.toISOString().slice(0, 16)}
      />
      {error && <span className="text-red-700">{`Oh shit! ${error}`}</span>}
    </div>
  );
}

type ControlledDateInputProps = {
  name: string;
  control: Control<any>;
} & Omit<DateInputProps, "value" | "onChange">;
export function ControlledDateInput({
  name,
  control,
  ...props
}: ControlledDateInputProps) {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <DateInput error={error?.message} {...field} {...props} />;
}
