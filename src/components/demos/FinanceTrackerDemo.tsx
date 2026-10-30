import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

export const FinanceTrackerDemo: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: 'Projeto Freelance Website', amount: 850, type: 'income' },
    { id: 2, title: 'Curso de JavaScript Avançado', amount: 120, type: 'expense' },
    { id: 3, title: 'Domínio e Hospedagem', amount: 45, type: 'expense' },
  ]);

  const [desc, setDesc] = useState('');
  const [val, setVal] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!desc.trim() || isNaN(num) || num <= 0) return;
    setTransactions([
      { id: Date.now(), title: desc.trim(), amount: num, type },
      ...transactions,
    ]);
    setDesc('');
    setVal('');
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="bg-[#fcf8fa] p-5 rounded-2xl border border-pink-200 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-neutral-800 text-base">Dashboard Financeiro</h4>
          <p className="text-xs text-neutral-500">Controle prático de receitas e despesas.</p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
          Ao Vivo
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-2.5 rounded-xl border border-pink-100 text-center">
          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Saldo</span>
          <span
            className={`text-sm sm:text-base font-bold ${
              balance >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            R$ {balance.toFixed(2)}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-pink-100 text-center">
          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Entradas</span>
          <span className="text-sm sm:text-base font-bold text-emerald-600">
            +R$ {totalIncome.toFixed(2)}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-pink-100 text-center">
          <span className="text-[10px] text-neutral-400 block uppercase font-medium">Saídas</span>
          <span className="text-sm sm:text-base font-bold text-rose-500">
            -R$ {totalExpense.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={addTransaction} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descrição (ex: Livro de UI)"
          className="flex-1 min-w-[130px] px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#ec5a80]"
        />
        <input
          type="number"
          step="0.01"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Valor R$"
          className="w-24 px-3 py-1.5 text-xs rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#ec5a80]"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="px-2.5 py-1.5 text-xs rounded-xl border border-pink-200 bg-white focus:outline-none cursor-pointer"
        >
          <option value="income">Entrada (+)</option>
          <option value="expense">Saída (-)</option>
        </select>
        <button
          type="submit"
          className="px-3.5 py-1.5 bg-[#ec5a80] hover:bg-[#d9486e] text-white text-xs font-medium rounded-xl cursor-pointer transition-colors"
        >
          Salvar
        </button>
      </form>

      {/* Transaction list */}
      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-xl bg-white border border-pink-50 text-xs"
          >
            <div className="flex items-center gap-2">
              {item.type === 'income' ? (
                <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownCircle className="w-4 h-4 text-rose-500" />
              )}
              <span className="font-medium text-neutral-800">{item.title}</span>
            </div>
            <span
              className={`font-semibold ${
                item.type === 'income' ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
