import { InputProps } from "../../types/ui";

export default function Input({
  name,
  defaultValue,
  type,
  id,
  placeholder,
  value,
  className,
  disabled,
  max,
  onChange,
  onClick,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        defaultValue={defaultValue}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        className={className}
        disabled={disabled}
        max={max}
        onChange={onChange}
        onClick={onClick}
      />
    </>
  );
}
