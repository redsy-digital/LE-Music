import React, { useState } from 'react';
import { MessageSquare, Heart, Send, Sparkles, User } from 'lucide-react';
import { Comment } from '../types';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (texto: string, usuario_nome: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment
}) => {
  const [nome, setNome] = useState('');
  const [texto, setTexto] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    onAddComment(texto, nome.trim() || 'Fã Cibernético');
    setTexto('');
  };

  return (
    <section className="py-16 relative bg-[#050505] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              MURAL DE <span className="text-[#00D4FF]">FÃS</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Deixe seu comentário e faça parte da comunidade LE Music
            </p>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#0A1020]/80 border border-slate-800 mb-8 space-y-4 text-left">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Seu Apelido ou Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="bg-[#050505] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D4FF]"
            />
          </div>

          <textarea
            rows={3}
            required
            placeholder="Escreva sua mensagem para o LE..."
            value={texto}
            onChange={e => setTexto(e.target.value)}
            className="w-full bg-[#050505] border border-slate-800 text-white rounded-xl p-4 text-xs focus:outline-none focus:border-[#00D4FF]"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar Comentário</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4 text-left">
          {comments.map(c => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-[#0A1020]/50 border border-slate-800/80 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] text-black font-bold flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {c.usuario_nome}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {c.data}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {c.texto}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onLikeComment(c.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                    <span>{c.curtidas} curtidas</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
