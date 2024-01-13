import { ChangeEvent, InputHTMLAttributes } from "react";

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  onChecked: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Switch({
  id,
  checked,
  onChecked,
  ...rest
}: SwitchProps) {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChecked}
        className="peer sr-only"
        {...rest}
      />
      <div className="peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-800 rtl:peer-checked:after:-translate-x-full" />
    </label>
  );
}
