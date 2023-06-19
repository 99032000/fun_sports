import { TextareaHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

type TextareaInputProps = {
  required?: boolean;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextareaInput({
  required,
  label,
  name,
  error,
  ...props
}: TextareaInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  return (
    <div className="flex flex-row gap-4 mt-8 flex-wrap">
      <label htmlFor={name} className=" my-auto text-sm sm:text-lg">
        {_label}
      </label>
      <textarea
        id={name}
        className="textarea textarea-bordered textarea-lg w-full max-w-lg textarea-primary"
        {...props}
      />
      {error && <span className="text-red-700">{`Oh shit! ${error}`}</span>}
    </div>
  );
}

type ControlledTextareaInputProps = {
  name: string;
  control: Control<any>;
} & TextareaInputProps;
export function ControlledTextareaInput({
  name,
  control,
  ...props
}: ControlledTextareaInputProps) {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <TextareaInput error={error?.message} {...field} {...props} />;
}
