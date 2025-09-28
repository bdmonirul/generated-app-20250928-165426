import React from 'react';
interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold font-display">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}