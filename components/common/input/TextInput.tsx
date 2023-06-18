import { InputHTMLAttributes } from "react";
import { useController, Control } from "react-hook-form";

type TextInputProps = {
  required?: boolean;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;
export function TextInput({ required, name, label, ...props }: TextInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  return (
    <div className="flex flex-row gap-4 md:mt-8 mt-4">
      <label htmlFor={name} className=" my-auto text-sm sm:text-lg">
        {_label}
      </label>
      <input
        id={name}
        className="input input-bordered w-full input-sm max-w-sm input-primary"
        {...props}
      />
    </div>
  );
}

type ControlledTextInputProps = {
  name: string;
  control: Control<any>;
} & TextInputProps;
export function ControlledTextInput({
  name,
  control,
  ...props
}: ControlledTextInputProps) {
  const { field } = useController({
    name,
    control,
  });

  return <TextInput {...field} {...props} />;
}
