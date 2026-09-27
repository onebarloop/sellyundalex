type InputProps = {
  id: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  step?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  name = id,
  placeholder = id,
  type = 'text',
  step,
  className,
  defaultValue,
  autocomplete,
  onChange,
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      step={step}
      onChange={onChange}
      autoComplete={autocomplete}
      defaultValue={defaultValue}
      className={`${className} text-foreground outline-foreground rounded-md bg-rose-100 p-2`}
    />
  );
}
