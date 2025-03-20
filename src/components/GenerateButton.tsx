
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isGenerating }) => {
  return (
    <Button
      onClick={onClick}
      disabled={isGenerating}
      className="w-full py-6 text-lg rounded-xl bg-primary shadow-md transition-all duration-300 hover:shadow-lg hover:bg-primary/90 active:scale-[0.98]"
    >
      <Zap className="mr-2 h-5 w-5" />
      Generar Número
    </Button>
  );
};

export default GenerateButton;
