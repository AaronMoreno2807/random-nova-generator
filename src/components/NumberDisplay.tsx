
import React, { useEffect, useRef } from 'react';
import { GeneratedNumber } from '../hooks/useRandomNumber';
import CopyButton from './CopyButton';

interface NumberDisplayProps {
  numbers: GeneratedNumber[];
  onCopy: (numbers: GeneratedNumber[]) => void;
  isGenerating: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ 
  numbers, 
  onCopy,
  isGenerating 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove('animate-number-in');
      // Trigger a reflow to restart animation
      void containerRef.current.offsetWidth;
      containerRef.current.classList.add('animate-number-in');
    }
  }, [numbers]);

  return (
    <div className="bento-card w-full mb-8">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2 text-muted-foreground text-sm">
          {numbers.length > 0 ? 'Números generados' : 'Genere un número aleatorio'}
        </div>
        
        <div
          ref={containerRef}
          className={`relative flex flex-wrap items-center justify-center gap-4 py-8 w-full transition-opacity ${
            isGenerating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {numbers.length > 0 ? (
            numbers.map((number) => (
              <div 
                key={number.id} 
                className="number-display"
              >
                {number.value}
              </div>
            ))
          ) : (
            <div className="number-display text-muted-foreground/50">?</div>
          )}
        </div>
        
        {numbers.length > 0 && (
          <div className="transition-all animate-fade-in">
            <CopyButton onClick={() => onCopy(numbers)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberDisplay;
