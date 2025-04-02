// src/components/ui/Avatar.tsx

interface AvatarProps {
  initial: string;
  color?: "indigo" | "yellow" | "purple" | "green" | "red";
  size?: "sm" | "md" | "lg";
  className?: string; // Add this line to accept className
}

export const Avatar = ({ 
  initial, 
  color = "indigo", 
  size = "sm",
  className = "" // Add default value
}: AvatarProps) => {
  // Size classes mapping
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-16 h-16 text-3xl"
  };
  
  // Color classes mapping
  const colorClasses = {
    indigo: "bg-indigo-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    red: "bg-red-500"
  };
  
  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} mr-3 text-white rounded-full flex items-center justify-center font-semibold ${className}`}>
      {initial}
    </div>
  );
};