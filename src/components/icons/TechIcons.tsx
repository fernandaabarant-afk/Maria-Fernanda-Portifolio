import React from 'react';

interface TechIconProps {
  iconName: string;
}

export const TechIconBadge: React.FC<TechIconProps> = ({ iconName }) => {
  switch (iconName) {
    case 'html':
      return (
        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-orange-600 text-sm">
          5
        </div>
      );
    case 'css':
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-sm">
          3
        </div>
      );
    case 'js':
      return (
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-600 text-xs tracking-tight font-mono">
          JS
        </div>
      );
    case 'ts':
      return (
        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center font-bold text-sky-600 text-xs tracking-tight font-mono">
          TS
        </div>
      );
    case 'react':
      return (
        <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center font-bold text-cyan-600 text-base">
          ⚛
        </div>
      );
    case 'git':
      return (
        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-bold text-rose-600 text-sm">
          ⎇
        </div>
      );
    case 'github':
      return (
        <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center font-bold text-neutral-800 text-base">
          🐙
        </div>
      );
    case 'figma':
      return (
        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-bold text-purple-600 text-base">
          ❖
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center font-bold text-pink-600 text-sm">
          &lt;/&gt;
        </div>
      );
  }
};
