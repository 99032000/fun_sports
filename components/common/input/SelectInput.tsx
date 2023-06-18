import { SelectHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

type SelectOption = {
  id: number;
  name: string;
};
type SelectInputProps = {
  required?: boolean;
  label: string;
  options: SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;
export function SelectInput({
  required,
  name,
  label,
  placeholder,
  options,
  ...props
}: SelectInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  const _options = [{ id: -1, name: placeholder }, ...options];

  return (
    <div className="flex flex-row gap-4 mt-8 flex-wrap">
      <label htmlFor={name} className=" my-auto text-sm sm:text-lg">
        {_label}
      </label>
      <select
        id={name}
        className="select max-w-fit w-full sm:max-w-[300px] md:max-w-[350px] select-primary select-sm text-xs sm:text-sm"
        {...props}
      >
        {_options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

type ControlledSelectInputProps = {
  name: string;
  control: Control<any>;
} & SelectInputProps;
export function ControlledSelectInput({
  name,
  control,
  ...props
}: ControlledSelectInputProps) {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  return <SelectInput {...field} {...props} />;
}
