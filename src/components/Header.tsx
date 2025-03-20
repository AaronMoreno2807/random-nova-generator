
import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-soft">
          <Zap size={24} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Generador de Números Aleatorios
        </h1>
      </div>
    </header>
  );
};

export default Header;
