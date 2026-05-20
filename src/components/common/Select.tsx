type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
