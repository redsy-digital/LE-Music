import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { EventSchedule } from '../types';
import { TicketModal } from './TicketModal';

interface EventsSectionProps {
  events: EventSchedule[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventSchedule | null>(null);

  return (
    <section id="eventos" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0066FF]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Turnê & Apresentações</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            AGENDA DE <span className="text-[#00D4FF]">SHOWS</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="group p-5 md:p-6 rounded-2xl bg-[#0A1020]/70 border border-slate-800 hover:border-[#00D4FF]/60 transition-all duration-300 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
            >
              {/* Date Badge */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-[#00D4FF]/40 flex flex-col items-center justify-center font-mono text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <span className="text-xl font-black leading-none">
                    {event.data.split('-')[2]}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                    {new Date(event.data).toLocaleString('pt-BR', { month: 'short' })}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white group-hover:text-[#00D4FF] transition-colors">
                      {event.titulo}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
                      {event.local} — {event.cidade}, {event.pais}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00D4FF]" />
                      {event.hora}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Ticket Button */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${
                  event.status_ingresso === 'Disponível'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : event.status_ingresso === 'Últimos Ingressos'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                  {event.status_ingresso}
                </span>

                {/* Buy Ticket CTA */}
                <button
                  onClick={() => setSelectedEvent(event)}
                  disabled={event.status_ingresso === 'Esgotado'}
                  className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-300 ${
                    event.status_ingresso === 'Esgotado'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.7)] hover:scale-105'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>Comprar Ingressos</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Ticket Modal */}
      <TicketModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};
