
import React from 'react';
import { NumberConfig, NumberFormat } from '../hooks/useRandomNumber';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Settings } from 'lucide-react';

interface ConfigPanelProps {
  config: NumberConfig;
  onConfigChange: (config: NumberConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onConfigChange }) => {
  const handleFormatChange = (value: NumberFormat) => {
    onConfigChange({ ...config, format: value });
  };

  const handleCountChange = (count: number) => {
    onConfigChange({ ...config, count: Math.min(Math.max(1, count), 3) });
  };

  const handleMinChange = (min: number) => {
    onConfigChange({ ...config, min });
  };

  const handleMaxChange = (max: number) => {
    onConfigChange({ ...config, max });
  };

  const handleDecimalPlacesChange = (decimalPlaces: number) => {
    onConfigChange({
      ...config,
      decimalPlaces: Math.min(Math.max(0, decimalPlaces), 10)
    });
  };

  return (
    <Card className="bento-card">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={18} className="text-primary" />
        <h2 className="text-lg font-medium">Configuración</h2>
      </div>

      <div className="space-y-6">
        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">Formato</Label>
          <RadioGroup 
            defaultValue={config.format} 
            value={config.format}
            onValueChange={(value) => handleFormatChange(value as NumberFormat)}
            className="flex flex-wrap gap-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="integer" 
                      id="r1" 
                      className="text-primary" 
                    />
                    <Label htmlFor="r1" className="cursor-pointer">Entero</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Números enteros (1, 2, 3...)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="decimal" 
                      id="r2" 
                      className="text-primary" 
                    />
                    <Label htmlFor="r2" className="cursor-pointer">Decimal</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Números con decimales (1.5, 2.75...)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="roman" 
                      id="r3" 
                      className="text-primary" 
                    />
                    <Label htmlFor="r3" className="cursor-pointer">Romano</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Números romanos (I, V, X...)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </RadioGroup>
        </div>

        {/* Count Selection */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label className="text-sm text-muted-foreground">Cantidad de números</Label>
            <span className="text-sm font-medium">{config.count}</span>
          </div>
          <Slider 
            min={1} 
            max={3} 
            step={1}
            value={[config.count]}
            onValueChange={(value) => handleCountChange(value[0])}
            className="cursor-pointer"
          />
        </div>

        {/* Range Configuration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min" className="text-sm text-muted-foreground">
              Valor mínimo
            </Label>
            <Input
              id="min"
              type="number"
              value={config.min}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max" className="text-sm text-muted-foreground">
              Valor máximo
            </Label>
            <Input
              id="max"
              type="number"
              value={config.max}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Decimal Places (only shown for decimal format) */}
        {config.format === 'decimal' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-sm text-muted-foreground">Decimales</Label>
              <span className="text-sm font-medium">{config.decimalPlaces}</span>
            </div>
            <Slider 
              min={0} 
              max={10} 
              step={1}
              value={[config.decimalPlaces]}
              onValueChange={(value) => handleDecimalPlacesChange(value[0])}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConfigPanel;
