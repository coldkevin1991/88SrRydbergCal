import React, { useState } from 'react';
import { Tab } from './types';
import Guide from './components/Guide';
import LaserCalculator from './components/LaserCalculator';
import StrayFields from './components/StrayFields';
import AIChat from './components/AIChat';
import EnergyLevelDiagram from './components/EnergyLevelDiagram';
import { Atom, BookOpen, Settings, Zap, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GUIDE);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.GUIDE:
        return <Guide />;
      case Tab.LASER_SPECS:
        return <LaserCalculator />;
      case Tab.STRAY_FIELDS:
        return <StrayFields />;
      case Tab.AI_ASSISTANT:
        return <AIChat />;
      default:
        return <Guide />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-violet-500/30">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-violet-600 p-2 rounded-lg">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              <sup>88</sup>Sr 里德堡实验助手
            </h1>
          </div>
          <div className="text-xs text-slate-500 hidden sm:block">
            v1.0.0 • 3P0 → nS/nD 激发
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Visuals & Navigation */}
          <div className="space-y-6">
            <EnergyLevelDiagram />
            
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab(Tab.GUIDE)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === Tab.GUIDE 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                <span className="font-medium">实验流程</span>
              </button>

              <button
                onClick={() => setActiveTab(Tab.LASER_SPECS)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === Tab.LASER_SPECS 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span className="font-medium">激光参数</span>
              </button>

              <button
                onClick={() => setActiveTab(Tab.STRAY_FIELDS)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === Tab.STRAY_FIELDS 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200'
                }`}
              >
                <Zap className="w-5 h-5 mr-3" />
                <span className="font-medium">杂散场控制</span>
              </button>

              <button
                onClick={() => setActiveTab(Tab.AI_ASSISTANT)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === Tab.AI_ASSISTANT 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                <span className="font-medium">AI 研究助手</span>
              </button>
            </nav>
          </div>

          {/* Right Column: Dynamic Content */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 rounded-2xl p-1 min-h-[600px] border border-slate-800/50 backdrop-blur-sm">
               {renderContent()}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;