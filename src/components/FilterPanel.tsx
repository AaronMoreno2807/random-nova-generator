
import React from 'react';
import { NumberConfig, NumberFilter } from '../hooks/useRandomNumber';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FilterPanelProps {
  config: NumberConfig;
  onConfigChange: (config: NumberConfig) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ config, onConfigChange }) => {
  const handleFilterChange = (filter: keyof NumberFilter, value: boolean) => {
    const updatedFilters = { ...config.filters, [filter]: value };
    onConfigChange({
      ...config,
      filters: updatedFilters
    });
  };

  const filterTypes = [
    {
      key: 'includeEven' as keyof NumberFilter,
      label: 'Números pares',
      description: 'Incluir números pares en los resultados',
      icon: config.filters.includeEven ? <Check size={16} /> : <X size={16} />,
    },
    {
      key: 'includeOdd' as keyof NumberFilter,
      label: 'Números impares',
      description: 'Incluir números impares en los resultados',
      icon: config.filters.includeOdd ? <Check size={16} /> : <X size={16} />,
    },
    {
      key: 'includeDecimals' as keyof NumberFilter,
      label: 'Números decimales',
      description: 'Incluir números con parte decimal',
      icon: config.filters.includeDecimals ? <Check size={16} /> : <X size={16} />,
      showForFormat: ['decimal']
    },
  ];

  return (
    <Card className="bento-card">
      <h2 className="text-lg font-medium mb-4">Filtros</h2>
      <div className="space-y-4">
        {filterTypes
          .filter(filter => !filter.showForFormat || filter.showForFormat.includes(config.format))
          .map((filter) => (
            <TooltipProvider key={filter.key}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${config.filters[filter.key] ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                        {filter.icon}
                      </div>
                      <Label 
                        htmlFor={filter.key} 
                        className="cursor-pointer select-none"
                      >
                        {filter.label}
                      </Label>
                    </div>
                    <Switch
                      id={filter.key}
                      checked={config.filters[filter.key]}
                      onCheckedChange={(checked) => handleFilterChange(filter.key, checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{filter.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>
    </Card>
  );
};

export default FilterPanel;
