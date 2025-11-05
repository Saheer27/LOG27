import { SelectProps } from "../../types/ui";

export default function Select({
  id,
  value,
  name,
  className,
  onChange,
  options,
  placeholder,
}: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      className={className}
      onChange={onChange}
      value={value}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
