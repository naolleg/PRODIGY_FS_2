// components/Theme/Theme.tsx
import React from 'react';

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      {children}
    </div>
  );
};

export default Theme;