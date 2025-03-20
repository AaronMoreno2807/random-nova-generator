
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 rounded-full hover:bg-secondary transition-all duration-200"
            onClick={onClick}
          >
            <Copy size={16} />
            <span>Copiar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copiar al portapapeles</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
