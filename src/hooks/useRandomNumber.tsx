
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export type NumberFormat = 'integer' | 'decimal' | 'roman';
export type NumberFilter = {
  includeEven: boolean;
  includeOdd: boolean;
  includeDecimals: boolean;
};

export type NumberConfig = {
  format: NumberFormat;
  min: number;
  max: number;
  count: number;
  filters: NumberFilter;
  decimalPlaces: number;
};

export type GeneratedNumber = {
  id: string;
  value: string;
  rawValue: number;
};

const DEFAULT_CONFIG: NumberConfig = {
  format: 'integer',
  min: 1,
  max: 100,
  count: 1,
  filters: {
    includeEven: true,
    includeOdd: true,
    includeDecimals: true
  },
  decimalPlaces: 2
};

// Roman numeral conversion for numbers 1-3999
const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return String(num);
  
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];
  
  let result = '';
  let remaining = Math.floor(num);
  
  for (const { value, symbol } of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  
  return result;
};

// Check if a number passes the filter criteria
const passesFilter = (num: number, filters: NumberFilter, format: NumberFormat): boolean => {
  const isInteger = Number.isInteger(num);
  const isEven = isInteger && num % 2 === 0;
  const isOdd = isInteger && num % 2 !== 0;
  
  // For integer and roman formats, make sure the number is an integer
  if ((format === 'integer' || format === 'roman') && !isInteger) {
    return false;
  }
  
  // Check if even numbers should be included
  if (isEven && !filters.includeEven) return false;
  
  // Check if odd numbers should be included
  if (isOdd && !filters.includeOdd) return false;
  
  // Check if decimal numbers should be included
  if (!isInteger && !filters.includeDecimals) return false;
  
  return true;
};

// Format a number according to the selected format
const formatNumber = (num: number, format: NumberFormat, decimalPlaces: number): string => {
  switch (format) {
    case 'integer':
      return Math.floor(num).toString();
    case 'decimal':
      return num.toFixed(decimalPlaces);
    case 'roman':
      return toRoman(Math.floor(num));
    default:
      return num.toString();
  }
};

export const useRandomNumber = (initialConfig = DEFAULT_CONFIG) => {
  const [config, setConfig] = useState<NumberConfig>(initialConfig);
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumber[]>([]);
  const [history, setHistory] = useState<GeneratedNumber[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const validateConfig = useCallback(() => {
    if (config.min > config.max) {
      toast.error('El valor mínimo no puede ser mayor que el máximo.');
      return false;
    }
    
    if (!config.filters.includeEven && !config.filters.includeOdd && !config.filters.includeDecimals) {
      toast.error('Debe permitir al menos un tipo de número (par, impar o decimal).');
      return false;
    }
    
    if (config.format === 'roman' && config.max > 3999) {
      toast.warning('Los números romanos solo son compatibles hasta 3999.');
      return {...config, max: 3999};
    }
    
    return true;
  }, [config]);
  
  const generateNumber = useCallback(() => {
    const validConfig = validateConfig();
    if (!validConfig) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const newNumbers: GeneratedNumber[] = [];
        const { min, max, count, format, filters, decimalPlaces } = config;
        
        // Attempt to generate numbers (with a safety limit to prevent infinite loops)
        let attempts = 0;
        const maxAttempts = 1000;
        
        while (newNumbers.length < count && attempts < maxAttempts) {
          attempts++;
          
          // Generate a random number within the specified range
          let rawValue = Math.random() * (max - min) + min;
          
          // For integer and roman formats, ensure we have integers
          if (format === 'integer' || format === 'roman') {
            rawValue = Math.floor(rawValue);
          } else if (format === 'decimal') {
            // For decimal format, round to the specified number of decimal places
            const multiplier = Math.pow(10, decimalPlaces);
            rawValue = Math.round(rawValue * multiplier) / multiplier;
          }
          
          // Check if the number passes the filter criteria
          if (passesFilter(rawValue, filters, format)) {
            newNumbers.push({
              id: crypto.randomUUID(),
              value: formatNumber(rawValue, format, decimalPlaces),
              rawValue
            });
          }
        }
        
        if (newNumbers.length === 0) {
          toast.error('No se pudieron generar números con los filtros actuales. Por favor, ajuste los filtros.');
        } else if (newNumbers.length < count) {
          toast.warning(`Solo se pudieron generar ${newNumbers.length} número(s) con los filtros actuales.`);
        }
        
        setGeneratedNumbers(newNumbers);
        if (newNumbers.length > 0) {
          setHistory(prev => [newNumbers, ...prev].slice(0, 10)); // Keep only 10 most recent
        }
      } catch (error) {
        console.error('Error generating random numbers:', error);
        toast.error('Ocurrió un error al generar los números.');
      } finally {
        setIsGenerating(false);
      }
    }, 400); // Add a slight delay for animation effect
  }, [config, validateConfig]);
  
  const copyToClipboard = useCallback(async (numbers: GeneratedNumber[]) => {
    try {
      const text = numbers.map(n => n.value).join(', ');
      await navigator.clipboard.writeText(text);
      toast.success('Número(s) copiado(s) al portapapeles');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('No se pudo copiar al portapapeles');
    }
  }, []);
  
  return {
    config,
    setConfig,
    generatedNumbers,
    history,
    generateNumber,
    isGenerating,
    copyToClipboard
  };
};
