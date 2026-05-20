type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}
