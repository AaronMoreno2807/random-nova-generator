
import React from 'react';
import { GeneratedNumber } from '../hooks/useRandomNumber';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { History, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryPanelProps {
  history: GeneratedNumber[][];
  onCopy: (numbers: GeneratedNumber[]) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onCopy }) => {
  if (history.length === 0) return null;

  return (
    <Card className="bento-card mt-8 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <History size={18} className="text-primary" />
        <h2 className="text-lg font-medium">Historial</h2>
      </div>
      
      <ScrollArea className="h-60 rounded-md">
        <div className="space-y-2 pr-4">
          {history.map((numbers, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {numbers.map((number) => (
                    <span 
                      key={number.id}
                      className="font-mono text-lg font-medium"
                    >
                      {number.value}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCopy(numbers)}
                  className="h-8 w-8 rounded-full hover:bg-secondary/80"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default HistoryPanel;
