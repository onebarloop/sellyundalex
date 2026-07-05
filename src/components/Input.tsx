type InputProps = {
  id: string;
  name?: string;
  placeholder?: string;
  type?: string;
};

export default function Input({
  id,
  name = id,
  placeholder = id,
  type = 'text',
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      className="bg-foreground text-background p-1 rounded-sm"
    />
  );
}
