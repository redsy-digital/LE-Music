import React, { useState } from 'react';
import { X, Calendar, MapPin, Ticket, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EventSchedule } from '../types';

interface TicketModalProps {
  event: EventSchedule | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, onClose }) => {
  const [ticketType, setTicketType] = useState<'pista' | 'vip' | 'backstage'>('vip');
  const [quantity, setQuantity] = useState(2);
  const [purchased, setPurchased] = useState(false);

  if (!event) return null;

  const prices = {
    pista: 120,
    vip: 220,
    backstage: 450
  };

  const totalPrice = prices[ticketType] * quantity;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchased(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      >
        <div className="relative w-full max-w-lg bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,212,255,0.3)] text-left">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {!purchased ? (
            <form onSubmit={handlePurchase} className="space-y-6">
              {/* Event Summary */}
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <span className="px-2.5 py-1 rounded-md bg-[#00D4FF]/20 text-[#00D4FF] text-[10px] font-mono font-bold uppercase">
                  Turnê Oficial LE
                </span>
                <h3 className="text-xl font-black text-white pt-2">
                  {event.titulo}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
                    {event.local} ({event.cidade})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00D4FF]" />
                    {event.data} às {event.hora}
                  </span>
                </div>
              </div>

              {/* Ticket Type Options */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Selecione o Setor
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pista', label: 'Pista Cyber', price: 'R$ 120' },
                    { id: 'vip', label: 'Camarote VIP', price: 'R$ 220' },
                    { id: 'backstage', label: 'Backstage LE', price: 'R$ 450' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTicketType(item.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        ticketType === item.id
                          ? 'bg-[#00D4FF]/20 border-[#00D4FF] text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                          : 'bg-[#050505] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] font-mono text-[#00D4FF] mt-1">{item.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#050505] border border-slate-800">
                <span className="text-xs font-bold text-white uppercase font-mono">
                  Quantidade de Ingressos
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm hover:bg-[#00D4FF] hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white font-mono w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm hover:bg-[#00D4FF] hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price & Checkout Action */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Total do Pedido</span>
                  <span className="text-2xl font-black text-[#00D4FF] font-mono">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_#00D4FF] hover:scale-105 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Confirmar Ingressos</span>
                </button>
              </div>
            </form>
          ) : (
            /* Purchase Success State */
            <div className="py-8 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF] text-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_#00D4FF]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">
                INGRESSOS GARANTIDOS!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm">
                Seus ingressos digitais para <span className="text-[#00D4FF] font-bold">{event.titulo}</span> foram emitidos com sucesso.
              </p>
              <div className="p-4 rounded-2xl bg-[#050505] border border-slate-800 font-mono text-xs text-slate-400 w-full space-y-1">
                <p>CÓDIGO QR: <span className="text-[#00D4FF] font-bold">LE-TKT-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                <p>SETOR: {ticketType.toUpperCase()} ({quantity}x)</p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 rounded-full bg-[#00D4FF] text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
