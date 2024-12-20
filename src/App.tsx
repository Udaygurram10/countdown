import React, { useState } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { CountdownPreview } from './components/CountdownPreview';
import { TimerConfig } from './types/timer';

function App() {
  const [config, setConfig] = useState<TimerConfig>({
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    format: 'DD:HH:MM:SS',
    fontFamily: 'Arial',
    fontSize: 24,
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    backgroundOpacity: 0,
    width: 400,
    height: 100,
    expiryMessage: 'Expired'
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({
      ...prev,
      targetDate: new Date(e.target.value)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Email Countdown Timer</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <CountdownTimer 
            targetDate={config.targetDate}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Customize Timer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Date</label>
              <input
                type="datetime-local"
                name="targetDate"
                value={config.targetDate.toISOString().slice(0, 16)}
                onChange={handleDateChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Format</label>
              <select
                name="format"
                value={config.format}
                onChange={handleConfigChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="DD:HH:MM:SS">DD:HH:MM:SS</option>
                <option value="DD days HH:MM:SS">DD days HH:MM:SS</option>
                <option value="HH:MM:SS">HH:MM:SS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text Color</label>
              <input
                type="color"
                name="textColor"
                value={config.textColor}
                onChange={handleConfigChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                name="backgroundColor"
                value={config.backgroundColor}
                onChange={handleConfigChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Opacity</label>
              <input
                type="range"
                name="backgroundOpacity"
                min="0"
                max="1"
                step="0.1"
                value={config.backgroundOpacity}
                onChange={handleConfigChange}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <input
                type="number"
                name="fontSize"
                value={config.fontSize}
                onChange={handleConfigChange}
                min="12"
                max="72"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Timer Preview</h2>
          <CountdownPreview config={config} />
          
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Embed Code:</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <code className="text-sm break-all">
                {`<div id="countdown-timer" data-target="${config.targetDate.toISOString()}" data-format="${config.format}" style="font-family: ${config.fontFamily}; font-size: ${config.fontSize}px; color: ${config.textColor}; background-color: ${config.backgroundColor}; opacity: ${config.backgroundOpacity};"></div>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;