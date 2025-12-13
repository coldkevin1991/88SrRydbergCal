import React, { useState } from 'react';
import { Activity, Lock, Zap, Timer, Calculator, Target, Waves } from 'lucide-react';

const LaserCalculator: React.FC = () => {
  const [n, setN] = useState<number>(50); // Principal quantum number
  const [power, setPower] = useState<number>(10); // mW
  const [waist, setWaist] = useState<number>(10); // microns
  const [series, setSeries] = useState<'S' | 'D'>('S'); // Rydberg series selection

  // 物理常数 (Strontium-88) - 校准至 Couturier et al. / Millen et al. 数据
  // Ionization Potential from 5s5p 3P0:
  // Calibrated to match n=50, 3S1 lambda_vac = 316.8144 nm
  const IP_3P0 = 31614.69; 
  // Mass-corrected Rydberg constant for 88Sr (R_inf / (1 + me/M_Sr))
  const RYDBERG = 109736.63; // cm^-1
  
  // Quantum Defects (From literature table)
  const DELTA_S = 3.371; // 5sns 3S1
  const DELTA_D = 2.658; // 5snd 3D1

  // 1. 计算跃迁频率/波长
  const delta = series === 'S' ? DELTA_S : DELTA_D;
  const nStar = n - delta; // 有效主量子数
  const wavenumber = IP_3P0 - RYDBERG / (nStar * nStar); // cm^-1
  const wavelengthUV = (10000000 / wavenumber).toFixed(4); // nm
  const wavelengthFund = (parseFloat(wavelengthUV) * 2).toFixed(4); // nm
  const frequency = (wavenumber * 0.0299792458).toFixed(4); // THz (c = 299792458 m/s)
  const frequencyFund = (parseFloat(frequency) / 2).toFixed(4); // THz

  // 2. 线宽要求 (估算)
  // 1000/n^2 经验公式
  const estLinewidthReq = Math.max(0.1, 1000 / Math.pow(n, 2)).toFixed(2); // kHz

  // 3. 拉比频率 (估算)
  // Ω ∝ sqrt(P)/w * (n*)^{-1.5}
  // 使用 nStar 进行稍微更准确的缩放
  const estRabiFreq = (20 * Math.sqrt(power) / waist * Math.pow(46.6 / nStar, 1.5)).toFixed(2); // MHz (normalized roughly to n=50 S state)

  // 4. 直流斯塔克灵敏度 (估算)
  const sensitivity = Math.pow(nStar/46.6, 7).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-violet-400" />
          参数设置
        </h3>
        
        <div className="space-y-6">
          {/* Series Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">里德堡系列 (Target Series)</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setSeries('S')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  series === 'S' 
                    ? 'bg-violet-600 border-violet-500 text-white' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <sup>3</sup>S<sub>1</sub>
              </button>
              <button
                onClick={() => setSeries('D')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  series === 'D' 
                    ? 'bg-violet-600 border-violet-500 text-white' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <sup>3</sup>D<sub>1</sub>
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-1 text-right">
              量子亏损 δ ≈ {series === 'S' ? DELTA_S : DELTA_D}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">主量子数 (n)</label>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={n} 
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>20</span>
              <span className="text-violet-300 font-mono text-base">n = {n}</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">紫外功率 (mW)</label>
            <div className="flex items-center space-x-3">
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={power} 
                onChange={(e) => setPower(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <input 
                type="number" 
                value={power} 
                onChange={(e) => setPower(parseFloat(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 text-center focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">光斑束腰 (µm)</label>
            <div className="flex items-center space-x-3">
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={waist} 
                onChange={(e) => setWaist(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <input 
                type="number" 
                value={waist} 
                onChange={(e) => setWaist(parseFloat(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 text-center focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-between space-y-4">
        <h3 className="text-lg font-semibold text-slate-200 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          计算结果
        </h3>

        {/* Transition Frequency - NEW */}
        <div className="p-4 bg-gradient-to-br from-violet-900/40 to-slate-900/50 rounded-lg border border-violet-500/30 shadow-lg shadow-violet-900/10">
          <div className="flex justify-between items-start mb-2">
             <div className="text-sm text-violet-200 font-medium">跃迁频率 & 波长 (从 5s5p <sup>3</sup>P<sub>0</sub>)</div>
             <Target className="w-4 h-4 text-violet-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">紫外波长 (UV)</div>
              <div className="text-xl font-bold text-white font-mono">{wavelengthUV} <span className="text-sm text-slate-400">nm</span></div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">频率</div>
              <div className="text-xl font-bold text-white font-mono">{frequency} <span className="text-sm text-slate-400">THz</span></div>
            </div>
            <div className="col-span-2 bg-slate-900/60 p-3 rounded border border-slate-600/50 mt-1">
              <div className="text-xs text-amber-300/80 uppercase tracking-wider font-semibold border-b border-slate-700/50 pb-1 mb-2">倍频前基频参数 (Fundamental)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <div className="text-[10px] text-slate-500 uppercase">波长</div>
                   <div className="text-lg font-bold text-amber-400 font-mono">{wavelengthFund} <span className="text-sm text-amber-400/70">nm</span></div>
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 uppercase">频率</div>
                   <div className="text-lg font-bold text-amber-400 font-mono">{frequencyFund} <span className="text-sm text-amber-400/70">THz</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-start space-x-2">
             <Waves className="w-3 h-3 text-violet-400 mt-0.5" />
             <p className="text-[10px] text-slate-400 leading-tight">
                已根据 Couturier et al. 实验数据校准常数。<br/>
                IP<sub>eff</sub> ≈ 31614.69 cm<sup>-1</sup>, R<sub>Sr</sub> ≈ 109736.63 cm<sup>-1</sup>
             </p>
          </div>
        </div>

        {/* Linewidth */}
        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex justify-between items-start">
             <div className="text-sm text-slate-400">所需激光线宽上限</div>
             <Lock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline mt-1">
            &lt; {estLinewidthReq} <span className="text-sm ml-1 font-normal text-slate-400">kHz</span>
          </div>
          <div className="flex items-start mt-2 space-x-2">
             <Calculator className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
             <p className="text-xs text-slate-500">
               估算公式：<span className="font-mono text-slate-400">1000 / n² (kHz)</span>
             </p>
          </div>
        </div>

        {/* Rabi Freq */}
        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex justify-between items-start">
             <div className="text-sm text-slate-400">估算拉比频率 (Ω/2π)</div>
             <Timer className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline mt-1">
            ~ {estRabiFreq} <span className="text-sm ml-1 font-normal text-slate-400">MHz</span>
          </div>
          <div className="flex items-start mt-2 space-x-2">
             <Calculator className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
             <p className="text-xs text-slate-500">
                公式：<span className="font-mono text-slate-400">Ω ∝ √P / w₀</span>
             </p>
          </div>
        </div>

        {/* Sensitivity */}
        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
           <div className="text-sm text-slate-400">直流斯塔克灵敏度 (相对值)</div>
          <div className="text-2xl font-bold text-white mt-1">
            {sensitivity}x
          </div>
          <p className="text-xs text-slate-500 mt-2">
            相对于 n=50。高 n 态对电场极度敏感。
          </p>
        </div>

      </div>
    </div>
  );
};

export default LaserCalculator;