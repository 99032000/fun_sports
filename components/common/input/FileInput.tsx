import { InputHTMLAttributes } from "react";
import { useController, Control } from "react-hook-form";

type FileInputProps = {
  required?: boolean;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export function FileInput({
  required,
  name,
  error,
  label,
  ...props
}: FileInputProps) {
  const _label = `${label}:${required ? "*" : ""}`;

  return (
    <div className="flex flex-row gap-4 mt-8 flex-wrap">
      <div className="mockup-code  bg-primary text-primary-content w-full text-xs sm:text-sm">
        <pre data-prefix=">">
          <code>Image can not exceed 6MB.</code>
        </pre>
        <pre data-prefix=">">
          <code>You can upload upto 3 images.</code>
        </pre>
      </div>
      <label htmlFor={name} className="my-auto text-sm sm:text-lg">
        {_label}
      </label>
      <input
        id={name}
        type="file"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm md:file-input-md"
        {...props}
      />
      {error && <span className="text-red-700">{`Oh shit! ${error}`}</span>}
    </div>
  );
}

type ControlledFileInputProps = {
  name: string;
  control: Control<any>;
} & FileInputProps;
export function ControlledFileInput({
  name,
  control,
  ...props
}: ControlledFileInputProps) {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <FileInput error={error?.message} {...field} {...props} />;
}
