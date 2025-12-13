import React from 'react';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Guide: React.FC = () => {
  const steps = [
    {
      title: "1. 态制备 (³P₀)",
      content: "确保高保真度地制备亚稳态 5s5p ³P₀ 原子。这通常涉及在宽跃迁 461nm 上冷却，随后在窄线宽 689nm 上冷却，最后通过光抽运或相干转移（例如通过 698nm 钟跃迁）进入 ³P₀。"
    },
    {
      title: "2. 317nm 激光器设置",
      content: "317nm 光通常通过 ~634nm 二极管激光器的倍频 (SHG) 产生。确保倍频腔稳定且输出模式干净 (TEM₀₀)。"
    },
    {
      title: "3. 频率锁定",
      content: "将基频 634nm 激光锁定到高精细度 ULE 腔上。里德堡跃迁极窄 (< 10 kHz)。简单的波长计锁定是不够的，必须使用 PDH 锁定。"
    },
    {
      title: "4. 光束准直",
      content: "将 317nm 光束与光镊（通常为 813nm 或 515nm）重叠。由于光镊束腰很小 (< 1µm)，准直至关重要。使用相机将紫外光束与陷阱荧光重叠。"
    },
    {
      title: "5. 激发脉冲",
      content: "施加 317nm 方波或整形脉冲。扫描紫外激光频率（通过基频或紫外光路上的 AOM）以找到里德堡共振。寻找原子损失（如果里德堡态被反俘获或电离）或里德堡态的直接探测信号。"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-500">安全警告</h4>
            <p className="text-sm text-slate-300">317nm 属于 UV-B 辐射。它是不可见的，并且对眼睛和皮肤有害。请务必佩戴合适的紫外护目镜并封闭光路。</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-violet-500 transition-colors">
            <h3 className="text-lg font-semibold text-violet-300 mb-2 flex items-center">
              {step.title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {step.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;