type InputProps = {
  id: string;
  name?: string;
  placeholder?: string;
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
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      step={step}
      defaultValue={defaultValue}
      className={`${className} bg-rose-100 text-foreground p-1 rounded-md outline-foreground `}
    />
  );
}
