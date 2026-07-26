import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'Booking / Contratação de Shows',
    mensagem: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) return;
    setSent(true);
  };

  return (
    <section id="contato" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Fale com a Equipe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            CONTATO <span className="text-[#00D4FF]">& BOOKING</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <div className="p-8 rounded-3xl bg-[#0A1020]/70 border border-slate-800 backdrop-blur-xl space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Contratações & Imprensa
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Entre em contato com o escritório oficial de gerenciamento do artista LE Music para agendamento de shows, turnês, imprensa e oportunidades de parcerias de marca.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">E-mail de Booking</p>
                    <p className="text-sm font-bold text-white font-mono">booking@lemusic.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Telefone / WhatsApp Comercial</p>
                    <p className="text-sm font-bold text-white font-mono">+55 (11) 98888-7700</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Sede de Gerenciamento</p>
                    <p className="text-sm font-bold text-white">São Paulo, SP — Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="p-8 rounded-3xl bg-[#0A1020]/70 border border-slate-800 backdrop-blur-xl">
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase block mb-2">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: João Silva"
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-[#050505] border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase block mb-2">
                        Seu E-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="joao@exemplo.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#050505] border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase block mb-2">
                      Assunto
                    </label>
                    <select
                      value={formData.assunto}
                      onChange={e => setFormData({ ...formData, assunto: e.target.value })}
                      className="w-full bg-[#050505] border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00D4FF]"
                    >
                      <option value="Booking / Contratação de Shows">Booking / Contratação de Shows</option>
                      <option value="Imprensa / Entrevistas">Imprensa / Entrevistas</option>
                      <option value="Parcerias & Marcas">Parcerias & Marcas</option>
                      <option value="Mensagem de Fã">Mensagem de Fã</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase block mb-2">
                      Sua Mensagem
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Descreva sua solicitação com detalhes..."
                      value={formData.mensagem}
                      onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                      className="w-full bg-[#050505] border border-slate-800 text-white rounded-xl p-4 text-sm focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_#00D4FF] hover:scale-[1.01] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF] text-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_#00D4FF]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase">
                    MENSAGEM ENVIADA!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md">
                    Obrigado pelo contato. A equipe de gerenciamento do LE Music responderá em até 24 horas úteis.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs font-mono text-[#00D4FF] underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
