type BadgeVariant = "success" | "danger" | "warning" | "default" | "primary";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

const variantClass: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  primary: "bg-primary-bg text-primary",
  default: "bg-gray-100 text-text-muted",
};

export default function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${variantClass[variant]}`}>
      {children}
    </span>
  );
}
