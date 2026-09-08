"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, ArrowRightLeft, DollarSign, LineChart as LineChartIcon, 
  Menu, X, Sun, Moon, Download, Clock, Delete, Activity, Flame, Box,
  Info, ShieldCheck, ExternalLink
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import * as math from 'mathjs';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// --- TYPES ---
type Mode = 'standard' | 'converter' | 'financial' | 'graph' | 'bmi' | 'bmr' | 'geometry' | 'about';

export default function App() {
  const [activeMode, setActiveMode] = useState<Mode>('standard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'dark' : ''} flex h-screen w-full overflow-hidden transition-colors duration-300 relative ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
      
      {/* Animated blob background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-400/40  filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/30  filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-400/30  filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white/20'} backdrop-blur-2xl border-r shadow-[10px_0_30px_rgba(0,0,0,0.05)] flex flex-col`}>
        <div className="p-4 flex justify-between items-center border-b border-inherit">
          <div className="flex items-center gap-3">
            <img 
              src="/app-icon.png" 
              alt="Rytics Calculator" 
              className="w-9 h-9 object-contain rounded-xl shadow-md transition-transform hover:scale-105"
            />
            <span className="font-bold text-lg tracking-tight">Rytics-Calculator</span>
          </div>
          <button className="md:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <NavItem active={activeMode === 'standard'} onClick={() => {setActiveMode('standard'); setIsSidebarOpen(false)}} icon={<Calculator />} label="Standard & Scientific" />
          <NavItem active={activeMode === 'converter'} onClick={() => {setActiveMode('converter'); setIsSidebarOpen(false)}} icon={<ArrowRightLeft />} label="Converter" />
          <NavItem active={activeMode === 'financial'} onClick={() => {setActiveMode('financial'); setIsSidebarOpen(false)}} icon={<DollarSign />} label="Financial" />
          <NavItem active={activeMode === 'graph'} onClick={() => {setActiveMode('graph'); setIsSidebarOpen(false)}} icon={<LineChartIcon />} label="Graphing & Math" />
          <NavItem active={activeMode === 'bmi'} onClick={() => {setActiveMode('bmi'); setIsSidebarOpen(false)}} icon={<Activity />} label="BMI Calculator" />
          <NavItem active={activeMode === 'bmr'} onClick={() => {setActiveMode('bmr'); setIsSidebarOpen(false)}} icon={<Flame />} label="BMR & Kalori" />
          <NavItem active={activeMode === 'geometry'} onClick={() => {setActiveMode('geometry'); setIsSidebarOpen(false)}} icon={<Box />} label="Luas & Volume" />
          <NavItem active={activeMode === 'about'} onClick={() => {setActiveMode('about'); setIsSidebarOpen(false)}} icon={<Info />} label="Tentang / About" />
        </nav>

        <div className="p-4 border-t border-inherit space-y-3">
          <div className="p-3 rounded-xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-xs">
            <div className="font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-gray-100">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-500" /> Official App
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-600 dark:text-primary-400 font-bold">v1.0</span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Created by <span className="font-semibold text-gray-800 dark:text-gray-200">Rizqi Trisaputra</span>
            </div>
            <a 
              href="https://github.com/rizqitrisaputra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-[11px] transition-all shadow-sm active:scale-95"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/rizqitrisaputra</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>

          <button 
            onClick={toggleDarkMode} 
            className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${darkMode ? 'bg-black/50 hover:bg-black/70 backdrop-blur-md' : 'bg-white/50 hover:bg-white/70 backdrop-blur-md'}`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden p-3 flex items-center justify-between border-b border-inherit backdrop-blur-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/app-icon.png" 
              alt="Rytics Calculator" 
              className="w-7 h-7 object-contain rounded-lg shadow-xs"
            />
            <span className="font-bold text-sm">Rytics-Calculator</span>
          </div>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            {activeMode === 'standard' && <StandardCalculator darkMode={darkMode} />}
            {activeMode === 'converter' && <Converter darkMode={darkMode} />}
            {activeMode === 'financial' && <FinancialCalculator darkMode={darkMode} />}
            {activeMode === 'graph' && <GraphingNotes darkMode={darkMode} />}
            {activeMode === 'bmi' && <BMICalculator darkMode={darkMode} />}
            {activeMode === 'bmr' && <BMRCalculator darkMode={darkMode} />}
            {activeMode === 'geometry' && <GeometryCalculator darkMode={darkMode} />}
            {activeMode === 'about' && <AboutDeveloper darkMode={darkMode} />}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-left
        ${active ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-r-4 border-primary-500 font-medium' 
                 : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}
    >
      <span className="w-5 h-5">{icon}</span>
      {label}
    </button>
  );
}

// --- 1. STANDARD & SCIENTIFIC CALCULATOR ---
function StandardCalculator({ darkMode }: { darkMode: boolean }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<{expr: string, res: string}[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const handleInput = (val: string) => setExpression(prev => prev + val);
  const clear = () => { setExpression(''); setResult(''); };
  const backspace = () => setExpression(prev => prev.slice(0, -1));

  const calculate = () => {
    try {
      if (!expression) return;
      const evaluated = math.evaluate(expression.replace(/x/g, '*'));
      const resStr = math.format(evaluated, { lowerExp: -100, upperExp: 100 });
      setResult(resStr);
      setHistory(prev => [{expr: expression, res: resStr}, ...prev]);
    } catch (e) {
      setResult('Error');
    }
  };

  const exportCSV = () => {
    let csv = "Expression,Result\n";
    history.forEach(row => { csv += `"${row.expr}","${row.res}"\n`; });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const buttons = [
    '(', ')', '%', 'C',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const scientificButtons = [
    'sin(', 'cos(', 'tan(', 'pi',
    'asin(', 'acos(', 'atan(', 'e',
    'log(', 'ln(', 'sqrt(', '^',
    '!', 'exp(', 'abs(', 'deg'
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className={`flex-1 flex flex-col rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}`}>
        <div className="p-6 pb-4 flex-none border-b border-inherit">
          <div className="flex justify-between items-center mb-2 text-gray-500 dark:text-gray-400">
            <button onClick={() => setIsScientific(!isScientific)} className="text-sm font-medium hover:text-primary-500 transition-colors">
              {isScientific ? 'Hide Scientific' : 'Show Scientific'}
            </button>
            <button onClick={() => setShowHistory(!showHistory)} className="lg:hidden p-1">
              <Clock className="w-5 h-5" />
            </button>
          </div>
          <div className="text-right min-h-[2rem] text-xl text-gray-500 dark:text-gray-400 break-all">{expression.replace(/\*/g, '×') || '\u00A0'}</div>
          <div className="text-right text-4xl md:text-5xl font-bold mt-1 break-all tracking-tight">{result || '0'}</div>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10">
          {isScientific && (
            <div className="grid grid-cols-4 gap-2 mb-2">
              {scientificButtons.map(btn => (
                <button 
                  key={btn === '*' ? '×' : btn} onClick={() => handleInput(btn === 'deg' ? ' deg' : btn)}
                  className={`p-2 sm:p-3 text-sm rounded-xl font-medium transition-all active:scale-95 ${darkMode ? 'bg-black/50 hover:bg-black/70 backdrop-blur-md text-primary-300' : 'bg-white/50 hover:bg-white/70 backdrop-blur-md text-primary-700'}`}
                >
                  {btn.replace('(', '')}
                </button>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 flex-1">
            {buttons.map(btn => {
              const isOp = ['/', '*', '-', '+', '='].includes(btn);
              const isAction = ['C', '%', '(', ')'].includes(btn);
              return (
                <button
                  key={btn === '*' ? '×' : btn}
                  onClick={() => {
                    if (btn === 'C') clear();
                    else if (btn === '=') calculate();
                    else handleInput(btn);
                  }}
                  className={`p-3 sm:p-4 text-xl sm:text-2xl rounded-xl font-medium transition-all active:scale-95
                    ${btn === '=' ? 'bg-primary-600 hover:bg-primary-700 text-white row-span-2 shadow-lg shadow-primary-500/30' : 
                      isOp ? (darkMode ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-primary-100 text-primary-600 hover:bg-primary-200') :
                      isAction ? (darkMode ? 'bg-black/50 hover:bg-black/70 backdrop-blur-md text-gray-300' : 'bg-white/50 hover:bg-white/70 backdrop-blur-md text-gray-700') :
                      (darkMode ? 'bg-black/50 hover:bg-black/60 backdrop-blur-md text-gray-100' : 'bg-white/70 hover:bg-white/60 backdrop-blur-md text-gray-900 border border-gray-100 shadow-sm')
                    }
                  `}
                  style={btn === '=' ? { gridRow: 'span 2' } : {}}
                >
                  {btn === '*' ? '×' : btn}
                </button>
              );
            })}
            <button 
              onClick={backspace}
              className={`p-3 sm:p-4 text-xl rounded-xl font-medium flex items-center justify-center transition-all active:scale-95 ${darkMode ? 'bg-black/50 hover:bg-black/60 backdrop-blur-md text-red-400' : 'bg-white/70 hover:bg-white/60 backdrop-blur-md text-red-500 border border-gray-100 shadow-sm'}`}
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={`${showHistory ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-none rounded-2xl border ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'} flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-inherit flex justify-between items-center bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10">
          <h2 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4"/> History</h2>
          {history.length > 0 && (
            <button onClick={exportCSV} className="text-xs flex items-center gap-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-1 rounded-md hover:opacity-80">
              <Download className="w-3 h-3" /> CSV
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-10">No history yet</div>
          ) : (
            history.map((h, i) => (
              <div key={i} className="text-right border-b border-gray-100 dark:border-gray-700 pb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded p-1" onClick={() => setExpression(h.expr)}>
                <div className="text-sm text-gray-500 dark:text-gray-400">{h.expr.replace(/\*/g, '×')}</div>
                <div className="font-semibold text-lg">{h.res}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// --- 2. CONVERTER ---
type UnitCategory = 'currency' | 'length' | 'weight' | 'temperature' | 'volume' | 'speed' | 'storage';
const CONVERSION_RATES: Record<string, Record<string, number>> = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
  weight: { kg: 1, g: 1000, mg: 1000000, lbs: 2.20462, oz: 35.274 },
  volume: { l: 1, ml: 1000, gal: 0.264172, quart: 1.05669, pint: 2.11338, cup: 4.22675 },
  speed: { 'm/s': 1, 'km/h': 3.6, 'mph': 2.23694, knot: 1.94384 },
  storage: { B: 1, KB: 1/1024, MB: 1/(1024**2), GB: 1/(1024**3), TB: 1/(1024**4) }
};

function Converter({ darkMode }: { darkMode: boolean }) {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [amount, setAmount] = useState<string>('1');
  const [result, setResult] = useState<string>('');
  
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({});
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const categories = Object.keys(CONVERSION_RATES).concat(['temperature', 'currency']) as UnitCategory[];

  useEffect(() => {
    if (category === 'currency') {
      setFromUnit('USD'); setToUnit('IDR');
      fetchCurrency();
    } else if (category === 'temperature') {
      setFromUnit('C'); setToUnit('F');
    } else {
      const units = Object.keys(CONVERSION_RATES[category]);
      setFromUnit(units[0]); setToUnit(units[1]);
    }
  }, [category]);

  const fetchCurrency = async () => {
    setCurrencyLoading(true);
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await res.json();
      setCurrencyRates(data.rates);
    } catch (e) {
      console.error(e);
    }
    setCurrencyLoading(false);
  };

  useEffect(() => {
    if (!amount) { setResult(''); return; }
    const val = parseFloat(amount);
    if (isNaN(val)) { setResult('Invalid Input'); return; }

    if (category === 'temperature') {
      let tempResult = 0;
      if (fromUnit === 'C' && toUnit === 'F') tempResult = (val * 9/5) + 32;
      else if (fromUnit === 'F' && toUnit === 'C') tempResult = (val - 32) * 5/9;
      else if (fromUnit === 'C' && toUnit === 'K') tempResult = val + 273.15;
      else if (fromUnit === 'K' && toUnit === 'C') tempResult = val - 273.15;
      else if (fromUnit === 'F' && toUnit === 'K') tempResult = (val - 32) * 5/9 + 273.15;
      else if (fromUnit === 'K' && toUnit === 'F') tempResult = (val - 273.15) * 9/5 + 32;
      else tempResult = val;
      setResult(tempResult.toFixed(4).replace(/\.?0+$/, ''));
    } else if (category === 'currency') {
      if (!currencyRates[fromUnit] || !currencyRates[toUnit]) return;
      const usdAmount = val / currencyRates[fromUnit];
      const targetAmount = usdAmount * currencyRates[toUnit];
      setResult(targetAmount.toFixed(4));
    } else {
      const rates = CONVERSION_RATES[category];
      const baseVal = val / rates[fromUnit];
      const targetVal = baseVal * rates[toUnit];
      setResult(targetVal.toFixed(6).replace(/\.?0+$/, ''));
    }
  }, [amount, fromUnit, toUnit, category, currencyRates]);

  const getUnitOptions = () => {
    if (category === 'currency') return Object.keys(currencyRates);
    if (category === 'temperature') return ['C', 'F', 'K'];
    return Object.keys(CONVERSION_RATES[category] || {});
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className={`max-w-2xl mx-auto rounded-2xl shadow-xl overflow-hidden border p-6 md:p-8 ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ArrowRightLeft className="text-primary-500" /> Unit Converter
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c as UnitCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${category === c ? 'bg-primary-500 text-white' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {(category === 'currency' && currencyLoading) && (
        <div className="text-sm text-primary-500 mb-4 animate-pulse">Updating live exchange rates...</div>
      )}

      <div className="space-y-6 bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">From</label>
          <div className="flex gap-2">
            <input 
              type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className={`flex-1 px-4 py-3 text-lg rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none transition-all ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md text-white' : 'bg-white/70 border-white/40 backdrop-blur-md'}`}
            />
            <select 
              value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
              className={`w-28 px-4 py-3 text-lg rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md text-white' : 'bg-white/70 border-white/40 backdrop-blur-md'}`}
            >
              {getUnitOptions().map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={swapUnits}
            className={`p-3 rounded-full shadow-md border hover:rotate-180 transition-transform duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-primary-400 hover:bg-gray-600' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-primary-600 hover:bg-gray-50'}`}
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">To</label>
          <div className="flex gap-2">
            <input 
              type="text" readOnly value={result}
              className={`flex-1 px-4 py-3 text-lg rounded-lg border font-semibold outline-none ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md text-white' : 'bg-white/60 border-white/30 backdrop-blur-md text-gray-900'}`}
            />
            <select 
              value={toUnit} onChange={(e) => setToUnit(e.target.value)}
              className={`w-28 px-4 py-3 text-lg rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md text-white' : 'bg-white/70 border-white/40 backdrop-blur-md'}`}
            >
              {getUnitOptions().map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. FINANCIAL CALCULATOR ---
function FinancialCalculator({ darkMode }: { darkMode: boolean }) {
  const [finMode, setFinMode] = useState<'loan' | 'discount' | 'compound' | 'tax'>('loan');

  return (
    <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}`}>
      <div className="flex overflow-x-auto border-b border-inherit">
        {['loan', 'discount', 'compound', 'tax'].map(mode => (
          <button
            key={mode} onClick={() => setFinMode(mode as any)}
            className={`flex-1 px-6 py-4 font-medium text-sm md:text-base capitalize whitespace-nowrap transition-colors ${finMode === mode ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
          >
            {mode === 'loan' ? 'KPR / Loan' : mode}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8">
        {finMode === 'loan' && <LoanCalc darkMode={darkMode} />}
        {finMode === 'discount' && <DiscountCalc darkMode={darkMode} />}
        {finMode === 'compound' && <CompoundCalc darkMode={darkMode} />}
        {finMode === 'tax' && <TaxCalc darkMode={darkMode} />}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, prefix, suffix, darkMode, type="number" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">{label}</label>
      <div className={`flex rounded-lg border focus-within:ring-2 focus-within:ring-primary-500 overflow-hidden transition-all ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md' : 'bg-white/70 border-white/40 backdrop-blur-md'}`}>
        {prefix && <span className={`px-4 py-3 text-gray-500 font-medium ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-r border-inherit`}>{prefix}</span>}
        <input 
          type={type} value={value} onChange={e => onChange(e.target.value)}
          className={`flex-1 px-4 py-3 outline-none min-w-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        />
        {suffix && <span className={`px-4 py-3 text-gray-500 font-medium ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l border-inherit`}>{suffix}</span>}
      </div>
    </div>
  );
}

function ResultCard({ title, value, darkMode }: { title: string, value: string, darkMode: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black/60 border-white/10 backdrop-blur-md shadow-inner' : 'bg-white/80 border-white/60 backdrop-blur-md shadow-inner'}`}>
      <div className="text-sm text-primary-600/80 dark:text-primary-300 mb-1">{title}</div>
      <div className="text-2xl font-bold text-primary-700 dark:text-primary-400">{value}</div>
    </div>
  );
}

function LoanCalc({ darkMode }: { darkMode: boolean }) {
  const [principal, setPrincipal] = useState('500000000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('15');

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) / 100 / 12 || 0;
  const n = parseFloat(years) * 12 || 0;
  
  let emi = 0, totalPayment = 0;
  if (r > 0 && n > 0) {
    emi = p * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayment = emi * n;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField label="Loan Amount (Pokok)" value={principal} onChange={setPrincipal} prefix="Rp" darkMode={darkMode} />
        <InputField label="Interest Rate (Bunga/thn)" value={rate} onChange={setRate} suffix="%" darkMode={darkMode} />
        <InputField label="Loan Term (Tenor)" value={years} onChange={setYears} suffix="Years" darkMode={darkMode} />
      </div>
      <div className="space-y-4 flex flex-col justify-center bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <ResultCard title="Monthly Payment (Cicilan/bln)" value={`Rp ${emi.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Total Interest (Total Bunga)" value={`Rp ${(totalPayment - p > 0 ? totalPayment - p : 0).toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Total Payment (Total Bayar)" value={`Rp ${totalPayment.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
      </div>
    </div>
  );
}

function DiscountCalc({ darkMode }: { darkMode: boolean }) {
  const [price, setPrice] = useState('100000');
  const [discount, setDiscount] = useState('20');
  const [tax, setTax] = useState('0');

  const p = parseFloat(price) || 0, d = parseFloat(discount) || 0, t = parseFloat(tax) || 0;
  const discountAmount = p * (d / 100);
  const priceAfterDiscount = p - discountAmount;
  const taxAmount = priceAfterDiscount * (t / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField label="Original Price" value={price} onChange={setPrice} prefix="Rp" darkMode={darkMode} />
        <InputField label="Discount" value={discount} onChange={setDiscount} suffix="%" darkMode={darkMode} />
        <InputField label="Tax (Optional)" value={tax} onChange={setTax} suffix="%" darkMode={darkMode} />
      </div>
      <div className="space-y-4 flex flex-col justify-center bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <ResultCard title="You Save" value={`Rp ${discountAmount.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Final Price" value={`Rp ${finalPrice.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
      </div>
    </div>
  );
}

function CompoundCalc({ darkMode }: { darkMode: boolean }) {
  const [principal, setPrincipal] = useState('10000000');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('5');
  const [monthlyAddition, setMonthlyAddition] = useState('500000');

  const p = parseFloat(principal) || 0, r = parseFloat(rate) / 100 / 12 || 0, n = parseFloat(years) * 12 || 0, pmt = parseFloat(monthlyAddition) || 0;
  let futureValue = p * Math.pow(1 + r, n);
  if (pmt > 0 && r > 0) futureValue += pmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  
  const totalInvestment = p + (pmt * n);
  const totalInterest = futureValue - totalInvestment;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField label="Initial Investment" value={principal} onChange={setPrincipal} prefix="Rp" darkMode={darkMode} />
        <InputField label="Monthly Contribution" value={monthlyAddition} onChange={setMonthlyAddition} prefix="Rp" darkMode={darkMode} />
        <InputField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" darkMode={darkMode} />
        <InputField label="Years to Grow" value={years} onChange={setYears} suffix="Years" darkMode={darkMode} />
      </div>
      <div className="space-y-4 flex flex-col justify-center bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <ResultCard title="Total Investment" value={`Rp ${totalInvestment.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Total Interest Earned" value={`Rp ${totalInterest.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Future Value" value={`Rp ${futureValue.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
      </div>
    </div>
  );
}

function TaxCalc({ darkMode }: { darkMode: boolean }) {
  const [income, setIncome] = useState('10000000');
  const [taxRate, setTaxRate] = useState('11');

  const inc = parseFloat(income) || 0, rate = parseFloat(taxRate) || 0;
  const taxAmount = inc * (rate / 100);
  const afterTax = inc - taxAmount;
  const withTax = inc + taxAmount;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField label="Amount" value={income} onChange={setIncome} prefix="Rp" darkMode={darkMode} />
        <InputField label="Tax Rate (PPN / PPh)" value={taxRate} onChange={setTaxRate} suffix="%" darkMode={darkMode} />
      </div>
      <div className="space-y-4 flex flex-col justify-center bg-white/60 dark:bg-black/40 backdrop-blur-lg border-white/20 dark:border-white/10 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <ResultCard title="Tax Amount" value={`Rp ${taxAmount.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Net Amount (Minus Tax)" value={`Rp ${afterTax.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
        <ResultCard title="Gross Amount (Plus Tax)" value={`Rp ${withTax.toLocaleString('id-ID', {maximumFractionDigits:0})}`} darkMode={darkMode} />
      </div>
    </div>
  );
}

// --- 4. GRAPHING & MATH NOTES ---
function GraphingNotes({ darkMode }: { darkMode: boolean }) {
  const [equation, setEquation] = useState('x^2');
  const [notes, setNotes] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [domainMin, setDomainMin] = useState('-10');
  const [domainMax, setDomainMax] = useState('10');

  useEffect(() => { generateGraph(); }, [equation, domainMin, domainMax]);

  const generateGraph = () => {
    try {
      const min = parseFloat(domainMin) || -10, max = parseFloat(domainMax) || 10;
      const step = (max - min) / 100;
      const node = math.parse(equation);
      const code = node.compile();
      
      const newData = [];
      for (let x = min; x <= max; x += step) {
        let y = code.evaluate({ x });
        if (typeof y === 'number' && !isNaN(y) && isFinite(y)) {
          if (Math.abs(y) > 1000000) y = y > 0 ? 1000000 : -1000000;
          newData.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(4)) });
        }
      }
      setData(newData); setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid Equation');
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-6 h-full ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className={`w-full lg:w-1/3 flex flex-col gap-6 rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}`}>
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LineChartIcon className="text-primary-500" /> Graph Equation
          </h2>
          <label className="block text-sm font-medium mb-1 text-gray-500">y = f(x)</label>
          <input 
            type="text" value={equation} onChange={(e) => setEquation(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none font-mono text-lg ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md' : 'bg-white/60 border-white/30 backdrop-blur-md'}`}
            placeholder="e.g. sin(x) + 2"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-500">Domain Min (x)</label>
            <input type="number" value={domainMin} onChange={e => setDomainMin(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border outline-none ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md' : 'bg-white/60 border-white/30 backdrop-blur-md'}`} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-500">Domain Max (x)</label>
            <input type="number" value={domainMax} onChange={e => setDomainMax(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border outline-none ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md' : 'bg-white/60 border-white/30 backdrop-blur-md'}`} />
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-4">
          <label className="block text-sm font-medium mb-2 text-gray-500">Math Notes</label>
          <textarea 
            value={notes} onChange={(e) => setNotes(e.target.value)}
            className={`flex-1 w-full p-4 rounded-lg border resize-none focus:ring-2 focus:ring-primary-500 outline-none ${darkMode ? 'bg-black/50 border-white/20 backdrop-blur-md text-gray-300' : 'bg-yellow-50 border-yellow-200 text-gray-800'}`}
            placeholder="Write your calculations, notes, or formulas here..."
          />
        </div>
      </div>

      <div className={`flex-1 rounded-2xl shadow-xl border p-4 flex flex-col ${darkMode ? 'bg-black/50 border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : 'bg-white/70 border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}`}>
        <div className="text-center font-semibold mb-4 text-gray-500">y = {equation}</div>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="x" stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{fontSize: 12}} />
              <YAxis domain={['auto', 'auto']} stroke={darkMode ? '#9ca3af' : '#6b7280'} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff', 
                  borderColor: darkMode ? '#374151' : '#e5e7eb',
                  color: darkMode ? '#f3f4f6' : '#111827',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="y" stroke="#701c1c" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- 5. BMI CALCULATOR ---
function BMICalculator({ darkMode }: { darkMode: boolean }) {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) / 100 || 0; // cm to m
  const bmi = h > 0 ? w / (h * h) : 0;

  let category = '';
  let catColor = '';
  if (bmi > 0) {
    if (bmi < 18.5) { category = 'Kekurangan Berat Badan (Underweight)'; catColor = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal (Ideal)'; catColor = 'text-green-500'; }
    else if (bmi < 30) { category = 'Kelebihan Berat Badan (Overweight)'; catColor = 'text-orange-500'; }
    else { category = 'Obesitas (Obese)'; catColor = 'text-red-500'; }
  }

  return (
    <div className={`max-w-2xl mx-auto rounded-2xl shadow-xl overflow-hidden border p-6 md:p-8 ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white/20'} backdrop-blur-2xl`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="text-primary-500" /> Kalkulator BMI
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <InputField label="Berat Badan (Weight)" value={weight} onChange={setWeight} suffix="kg" darkMode={darkMode} />
          <InputField label="Tinggi Badan (Height)" value={height} onChange={setHeight} suffix="cm" darkMode={darkMode} />
        </div>
        <div className={`space-y-4 flex flex-col justify-center items-center text-center p-6 rounded-xl border backdrop-blur-md shadow-inner ${darkMode ? 'bg-black/50 border-white/20' : 'bg-white/60 border-white/30'}`}>
          <div className="text-sm text-gray-500 dark:text-gray-400">Skor BMI Anda</div>
          <div className="text-6xl font-bold text-primary-600 dark:text-primary-400">{bmi > 0 ? bmi.toFixed(1) : '0.0'}</div>
          <div className={`text-lg font-bold mt-2 ${catColor}`}>{category || '-'}</div>
        </div>
      </div>
    </div>
  );
}

// --- 6. BMR CALCULATOR ---
function BMRCalculator({ darkMode }: { darkMode: boolean }) {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [activity, setActivity] = useState('1.2');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;
  
  // Mifflin-St Jeor Equation
  let bmr = 0;
  if (w > 0 && h > 0 && a > 0) {
    if (gender === 'male') bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    else bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
  }
  
  const dailyCalories = bmr * parseFloat(activity);

  return (
    <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border p-6 md:p-8 ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white/20'} backdrop-blur-2xl`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Flame className="text-primary-500" /> BMR & Kebutuhan Kalori
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex gap-4 mb-2">
            <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg font-medium border transition-all ${gender === 'male' ? 'bg-primary-500 text-white border-primary-500 shadow-md' : (darkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-white text-gray-600 border-gray-300')}`}>Pria</button>
            <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg font-medium border transition-all ${gender === 'female' ? 'bg-primary-500 text-white border-primary-500 shadow-md' : (darkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-white text-gray-600 border-gray-300')}`}>Wanita</button>
          </div>
          <InputField label="Usia (Tahun)" value={age} onChange={setAge} suffix="Thn" darkMode={darkMode} />
          <InputField label="Berat Badan" value={weight} onChange={setWeight} suffix="kg" darkMode={darkMode} />
          <InputField label="Tinggi Badan" value={height} onChange={setHeight} suffix="cm" darkMode={darkMode} />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">Tingkat Aktivitas</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className={`w-full px-4 py-3 rounded-lg border outline-none ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
              <option value="1.2">Sangat Jarang Olahraga (Sedentary)</option>
              <option value="1.375">Jarang Olahraga (1-3 hari/minggu)</option>
              <option value="1.55">Normal (3-5 hari/minggu)</option>
              <option value="1.725">Aktif (6-7 hari/minggu)</option>
              <option value="1.9">Sangat Aktif (Pekerja Fisik/Atlet)</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4 flex flex-col justify-center">
          <ResultCard title="BMR (Basal Metabolic Rate)" value={`${bmr > 0 ? Math.round(bmr).toLocaleString('id-ID') : '0'} kkal/hari`} darkMode={darkMode} />
          <ResultCard title="Kebutuhan Kalori Harian (TDEE)" value={`${dailyCalories > 0 ? Math.round(dailyCalories).toLocaleString('id-ID') : '0'} kkal/hari`} darkMode={darkMode} />
          
          <div className={`p-4 rounded-xl text-sm border backdrop-blur-md ${darkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-white/60 border-white/30 text-gray-700'}`}>
            <ul className="space-y-2">
              <li>📉 <strong>Untuk Kurus:</strong> Kurangi ~500 kkal ({dailyCalories > 0 ? Math.round(dailyCalories - 500) : 0})</li>
              <li>⚖️ <strong>Menjaga Berat:</strong> {dailyCalories > 0 ? Math.round(dailyCalories) : 0} kkal</li>
              <li>📈 <strong>Tambah Massa/Otot:</strong> Tambah ~500 kkal ({dailyCalories > 0 ? Math.round(dailyCalories + 500) : 0})</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. GEOMETRY CALCULATOR ---
function GeometryCalculator({ darkMode }: { darkMode: boolean }) {
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  
  // 2D States
  const [shape2D, setShape2D] = useState('persegi');
  const [sisi, setSisi] = useState('');
  const [alas, setAlas] = useState('');
  const [tinggi2D, setTinggi2D] = useState('');
  const [jari, setJari] = useState('');

  // 3D States
  const [shape3D, setShape3D] = useState('kubus');
  const [panjang, setPanjang] = useState('');
  const [lebar, setLebar] = useState('');
  const [tinggi3D, setTinggi3D] = useState('');

  // 2D Calculation
  let area = 0;
  let perimeter = 0;
  if (mode === '2d') {
    const s = parseFloat(sisi) || 0;
    const a = parseFloat(alas) || 0;
    const t = parseFloat(tinggi2D) || 0;
    const r = parseFloat(jari) || 0;

    if (shape2D === 'persegi') {
      area = s * s;
      perimeter = 4 * s;
    } else if (shape2D === 'segitiga') {
      area = 0.5 * a * t;
      // perimeter approximation requires more inputs, just leave it 0 or calc basic right triangle
    } else if (shape2D === 'lingkaran') {
      area = Math.PI * r * r;
      perimeter = 2 * Math.PI * r;
    }
  }

  // 3D Calculation
  let volume = 0;
  let surfaceArea = 0;
  if (mode === '3d') {
    const s = parseFloat(sisi) || 0;
    const p = parseFloat(panjang) || 0;
    const l = parseFloat(lebar) || 0;
    const t = parseFloat(tinggi3D) || 0;
    const r = parseFloat(jari) || 0;

    if (shape3D === 'kubus') {
      volume = s * s * s;
      surfaceArea = 6 * (s * s);
    } else if (shape3D === 'balok') {
      volume = p * l * t;
      surfaceArea = 2 * ((p * l) + (p * t) + (l * t));
    } else if (shape3D === 'tabung') {
      volume = Math.PI * r * r * t;
      surfaceArea = 2 * Math.PI * r * (r + t);
    }
  }

  return (
    <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border p-6 md:p-8 ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white/20'} backdrop-blur-2xl`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Box className="text-primary-500" /> Luas & Volume
      </h2>
      
      <div className="flex overflow-x-auto border-b border-inherit mb-6">
        {['2d', '3d'].map(m => (
          <button
            key={m} onClick={() => setMode(m as any)}
            className={`flex-1 px-6 py-3 font-medium text-sm md:text-base capitalize whitespace-nowrap transition-colors ${mode === m ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
          >
            {m === '2d' ? 'Bangun Datar (Luas)' : 'Bangun Ruang (Volume)'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">Pilih Bangun</label>
            <select 
              value={mode === '2d' ? shape2D : shape3D} 
              onChange={(e) => mode === '2d' ? setShape2D(e.target.value) : setShape3D(e.target.value)} 
              className={`w-full px-4 py-3 rounded-lg border outline-none ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              {mode === '2d' ? (
                <>
                  <option value="persegi">Persegi / Persegi Panjang</option>
                  <option value="segitiga">Segitiga</option>
                  <option value="lingkaran">Lingkaran</option>
                </>
              ) : (
                <>
                  <option value="kubus">Kubus</option>
                  <option value="balok">Balok</option>
                  <option value="tabung">Tabung</option>
                </>
              )}
            </select>
          </div>

          {(shape2D === 'persegi' && mode === '2d') || (shape3D === 'kubus' && mode === '3d') ? (
            <InputField label="Panjang Sisi" value={sisi} onChange={setSisi} suffix="cm" darkMode={darkMode} />
          ) : null}

          {(shape2D === 'segitiga' && mode === '2d') ? (
            <>
              <InputField label="Panjang Alas" value={alas} onChange={setAlas} suffix="cm" darkMode={darkMode} />
              <InputField label="Tinggi" value={tinggi2D} onChange={setTinggi2D} suffix="cm" darkMode={darkMode} />
            </>
          ) : null}

          {(shape2D === 'lingkaran' && mode === '2d') ? (
            <InputField label="Jari-jari (r)" value={jari} onChange={setJari} suffix="cm" darkMode={darkMode} />
          ) : null}

          {(shape3D === 'balok' && mode === '3d') ? (
            <>
              <InputField label="Panjang" value={panjang} onChange={setPanjang} suffix="cm" darkMode={darkMode} />
              <InputField label="Lebar" value={lebar} onChange={setLebar} suffix="cm" darkMode={darkMode} />
              <InputField label="Tinggi" value={tinggi3D} onChange={setTinggi3D} suffix="cm" darkMode={darkMode} />
            </>
          ) : null}

          {(shape3D === 'tabung' && mode === '3d') ? (
            <>
              <InputField label="Jari-jari (r)" value={jari} onChange={setJari} suffix="cm" darkMode={darkMode} />
              <InputField label="Tinggi" value={tinggi3D} onChange={setTinggi3D} suffix="cm" darkMode={darkMode} />
            </>
          ) : null}

        </div>

        <div className="space-y-4 flex flex-col justify-center">
          {mode === '2d' ? (
            <>
              <ResultCard title="Luas (Area)" value={`${Number.isInteger(area) ? area : area.toFixed(2)} cm²`} darkMode={darkMode} />
              {shape2D !== 'segitiga' && (
                <ResultCard title="Keliling (Perimeter)" value={`${Number.isInteger(perimeter) ? perimeter : perimeter.toFixed(2)} cm`} darkMode={darkMode} />
              )}
            </>
          ) : (
            <>
              <ResultCard title="Volume" value={`${Number.isInteger(volume) ? volume : volume.toFixed(2)} cm³`} darkMode={darkMode} />
              <ResultCard title="Luas Permukaan" value={`${Number.isInteger(surfaceArea) ? surfaceArea : surfaceArea.toFixed(2)} cm²`} darkMode={darkMode} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 8. ABOUT & DEVELOPER PROFILE ---
function AboutDeveloper({ darkMode }: { darkMode: boolean }) {
  return (
    <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border p-6 md:p-8 ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white/30'} backdrop-blur-2xl space-y-6`}>
      <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-inherit pb-6">
        <img 
          src="/app-icon.png" 
          alt="Rytics Calculator Logo" 
          className="w-20 h-20 object-contain rounded-2xl shadow-md p-1 bg-white/95 border border-white/20"
        />
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Rytics-Calculator</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-primary-500/20 text-primary-600 dark:text-primary-400">
              v1.0.0
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Platform Kalkulator Multifungsi, Konverter Lengkap, Finansial & Grafik 2D Modern
          </p>
        </div>
      </div>

      {/* Developer Card */}
      <div className={`p-5 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-white/30'} space-y-4`}>
        <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Informasi Pengembang Resmi (Creator / Owner)</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              Rizqi Trisaputra
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Creator & Lead Software Engineer
            </div>
          </div>

          <a 
            href="https://github.com/rizqitrisaputra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Kunjungi Profil GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Anti-Claim & Copyright Protection Notice */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${darkMode ? 'bg-primary-950/30 border-primary-900/40 text-gray-300' : 'bg-primary-50/70 border-primary-200/60 text-gray-700'}`}>
        <div className="font-bold flex items-center gap-1.5 text-primary-600 dark:text-primary-400 mb-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Hak Cipta & Keaslian Karya (Anti-Claim Notice)</span>
        </div>
        <p>
          Aplikasi <strong>Rytics-Calculator</strong> beserta seluruh rancangan kode antarmuka dan logikanya adalah karya orisinal yang dikembangkan dan dimiliki secara resmi oleh <strong>Rizqi Trisaputra</strong>.
        </p>
        <p className="mt-1.5">
          Repositori, pembaruan, dan bukti pengembangan resmi dapat diverifikasi langsung melalui akun GitHub:{" "}
          <a 
            href="https://github.com/rizqitrisaputra" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline font-semibold text-primary-600 dark:text-primary-400"
          >
            https://github.com/rizqitrisaputra
          </a>.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Teknologi yang Digunakan:</div>
        <div className="flex flex-wrap gap-2 text-xs">
          {['Next.js 16 (App Router)', 'React 19', 'Tailwind CSS v4', 'Lucide Icons', 'MathJS Engine', 'Recharts 2D', 'Progressive Web App (PWA)'].map(tech => (
            <span key={tech} className={`px-2.5 py-1 rounded-lg border font-medium ${darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white/80 border-gray-200 text-gray-700'}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center pt-2 text-[11px] text-gray-400 border-t border-inherit">
        © 2026 Rytics-Calculator • Created with ❤️ by Rizqi Trisaputra
      </div>
    </div>
  );
}
