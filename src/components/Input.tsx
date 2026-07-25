type InputProps = {
  id: string;
  name?: string;
  placeholder?: string;
  type?: string;
  step?: string;
};

export default function Input({
  id,
  name = id,
  placeholder = id,
  type = 'text',
  step,
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      step={step}
      className="bg-foreground text-background p-1 rounded-sm"
    />
  );
}
