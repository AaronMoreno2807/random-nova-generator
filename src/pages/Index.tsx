
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NumberDisplay from '../components/NumberDisplay';
import ConfigPanel from '../components/ConfigPanel';
import FilterPanel from '../components/FilterPanel';
import GenerateButton from '../components/GenerateButton';
import HistoryPanel from '../components/HistoryPanel';
import { useRandomNumber, NumberConfig } from '../hooks/useRandomNumber';

const Index = () => {
  const { 
    config,
    setConfig,
    generatedNumbers,
    history,
    generateNumber,
    isGenerating,
    copyToClipboard
  } = useRandomNumber();

  const handleConfigChange = (newConfig: NumberConfig) => {
    setConfig(newConfig);
  };

  // Initial animation
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const animationClasses = isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <div className="min-h-screen px-4 py-6 md:py-12 lg:px-8 transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        <Header />
        
        <main className="mt-6 space-y-6">
          <div className={`transition-all duration-500 ease-out delay-100 ${animationClasses}`}>
            <NumberDisplay 
              numbers={generatedNumbers} 
              onCopy={copyToClipboard}
              isGenerating={isGenerating}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`transition-all duration-500 ease-out delay-200 ${animationClasses}`}>
              <ConfigPanel 
                config={config} 
                onConfigChange={handleConfigChange} 
              />
            </div>
            
            <div className={`transition-all duration-500 ease-out delay-300 ${animationClasses}`}>
              <FilterPanel 
                config={config} 
                onConfigChange={handleConfigChange} 
              />
            </div>
          </div>
          
          <div className={`transition-all duration-500 ease-out delay-400 ${animationClasses}`}>
            <GenerateButton 
              onClick={generateNumber} 
              isGenerating={isGenerating} 
            />
          </div>
          
          <div className={`transition-all duration-500 ease-out delay-500 ${animationClasses}`}>
            <HistoryPanel 
              history={history} 
              onCopy={copyToClipboard} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
