type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
