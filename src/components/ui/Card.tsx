import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-white rounded-lg shadow-sm border border-gray-100",
    elevated: "bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg"
  };

  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}; 