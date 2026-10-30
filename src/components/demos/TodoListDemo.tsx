import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoListDemo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Estudar Flexbox e Grid no CSS', completed: true },
    { id: 2, text: 'Criar componentes no React', completed: true },
    { id: 3, text: 'Praticar lógica com JavaScript', completed: false },
    { id: 4, text: 'Tomar água e fazer uma pausa ♡', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="bg-[#fff9fb] p-5 rounded-2xl border border-pink-200/80 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-neutral-800 text-base flex items-center gap-2">
            <span>Minhas Tarefas Diárias</span>
            <span className="text-xs bg-[#fce7eb] text-[#ec5a80] px-2 py-0.5 rounded-full font-medium">
              Demo Interativo
            </span>
          </h4>
          <p className="text-xs text-neutral-500">Adicione, conclua ou filtre suas tarefas em tempo real.</p>
        </div>
        <span className="text-xs font-semibold text-[#ec5a80]">
          {tasks.filter((t) => t.completed).length}/{tasks.length} concluídas
        </span>
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Ex: Praticar animações em CSS..."
          className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#ec5a80] transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#ec5a80] hover:bg-[#d9486e] text-white rounded-xl text-sm font-medium flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </form>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-3">
        {(['all', 'pending', 'completed'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilter(mode)}
            className={`px-3 py-1 rounded-lg text-xs font-medium capitalize cursor-pointer transition-colors ${
              filter === mode
                ? 'bg-[#ec5a80] text-white'
                : 'bg-pink-100/60 text-neutral-600 hover:bg-pink-100'
            }`}
          >
            {mode === 'all' ? 'Todas' : mode === 'pending' ? 'Pendentes' : 'Concluídas'}
          </button>
        ))}
      </div>

      {/* List items */}
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        {filteredTasks.length === 0 ? (
          <p className="text-center py-6 text-xs text-neutral-400">Nenhuma tarefa encontrada neste filtro.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-neutral-50/80 border-neutral-200 text-neutral-400'
                  : 'bg-white border-pink-100 text-neutral-800 shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-2.5 text-left flex-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-[#ec5a80] border-[#ec5a80] text-white'
                      : 'border-pink-300 bg-white hover:border-[#ec5a80]'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={`text-xs sm:text-sm ${task.completed ? 'line-through text-neutral-400' : ''}`}>
                  {task.text}
                </span>
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-neutral-300 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                title="Excluir tarefa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
