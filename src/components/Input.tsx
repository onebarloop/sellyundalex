type InputProps = {
  id: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  step?: string;
  className?: string;
  defaultValue?: string;
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
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      step={step}
      autoComplete={autocomplete}
      defaultValue={defaultValue}
      className={`${className} bg-rose-100 text-foreground p-1 rounded-md outline-foreground `}
    />
  );
}
