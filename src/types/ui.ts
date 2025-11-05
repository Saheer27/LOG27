export type InputProps = {
  name?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  max?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SelectProps = {
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
