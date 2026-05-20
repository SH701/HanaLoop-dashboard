type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary resize-none ${className}`}
      {...props}
    />
  );
}
