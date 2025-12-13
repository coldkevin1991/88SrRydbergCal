import React from 'react';
import { Lightbulb, Shield, Move } from 'lucide-react';

const StrayFields: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold text-slate-100 mb-4">中和电场</h2>
        <p className="text-slate-300 mb-6">
          里德堡原子具有巨大的电偶极矩。真空腔玻璃壁上吸附的电荷会产生杂散直流电场，通过斯塔克效应 ($\Delta E = -\frac{1}{2}\alpha E^2$) 导致能级移动和退相干。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-6 h-6 text-violet-400 mr-2" />
              <h3 className="font-semibold text-violet-200">紫外解吸（“手电筒”技巧）</h3>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              高能光子可以将电子从玻璃表面射出或解吸吸附原子，从而有效地平衡电荷分布。
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>使用高功率紫外 LED（标准为 365nm）。</li>
              <li>直接照射在原子附近的玻璃腔面上。</li>
              <li>可以是脉冲式（冷却期间）或直流（注意加热）。</li>
              <li>常用于每天“重置”电场环境。</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
            <div className="flex items-center mb-3">
              <Shield className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="font-semibold text-blue-200">电极补偿</h3>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              如果腔体有外部或内部电极（例如 ITO 涂层、金属杆），施加直流电压以抵消电场。
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>进行斯塔克光谱测量（测量频移随电压的变化）。</li>
              <li>找到斯塔克抛物线的顶点以确定零场。</li>
              <li>通常需要三轴控制。</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
          <Move className="w-5 h-5 mr-2 text-emerald-400" />
          电场归零实验方案
        </h3>
        <ol className="list-decimal list-inside space-y-3 text-slate-300">
          <li>激发到高 <i>n</i> 里德堡态（例如 n=70），此时灵敏度很高。</li>
          <li>扫描激光频率穿过共振峰。</li>
          <li>观察线宽。在梯度场中，谱线变宽。在强直流场中，谱线发生频移。</li>
          <li>施加紫外光 10-30 秒。</li>
          <li>重新扫描。如果谱线变窄或移回理论零场值，则电荷已被中和。</li>
          <li>如果使用电极：扫描电压 $V_x$，找到频率极小值（最大束缚能），对 $V_y, V_z$ 重复此操作。</li>
        </ol>
      </div>
    </div>
  );
};

export default StrayFields;