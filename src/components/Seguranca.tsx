import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  AlertOctagon, 
  Users, 
  MapPin, 
  Ban, 
  Camera, 
  Flag, 
  HeartPulse, 
  FileText, 
  CheckCircle2,
  ShieldAlert
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SecurityPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            🔒 Página de Segurança
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sua segurança é nossa prioridade. Trabalhamos para transmitir confiança e educar você sobre como se proteger.
          </p>
        </div>

        <div className="space-y-20">
          
          {/* 1. Como protegemos você */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2 border-b pb-2">
              <Lock className="w-6 h-6 text-primary" /> 1. Como protegemos você
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Search, text: "Verificação de perfis e moderação de conteúdo" },
                { icon: AlertOctagon, text: "Sistema de denúncia em todos os perfis e conversas" },
                { icon: ShieldCheck, text: "Criptografia nas comunicações" },
                { icon: ShieldAlert, text: "Monitoramento contra comportamentos suspeitos" }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-muted/30 rounded-xl border border-border flex flex-col items-center text-center space-y-3">
                  <item.icon className="w-8 h-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Dicas de segurança para você (cards visuais) */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2 border-b pb-2">
              <Users className="w-6 h-6 text-primary" /> 2. Dicas de segurança para você
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border-2 border-destructive/20 bg-destructive/5 space-y-3">
                <Ban className="w-10 h-10 text-destructive" />
                <p className="font-bold text-foreground text-sm">🚫 Nunca compartilhe telefone, endereço ou dados bancários no chat</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background shadow-sm space-y-3">
                <MapPin className="w-10 h-10 text-primary" />
                <p className="font-bold text-foreground text-sm">📍 Primeiro encontro sempre em local público (pet shop, parque, clínica vet)</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background shadow-sm space-y-3">
                <Users className="w-10 h-10 text-primary" />
                <p className="font-bold text-foreground text-sm">👥 Leve um acompanhante ao encontro presencial</p>
              </div>
              <div className="p-6 rounded-xl border-2 border-destructive/20 bg-destructive/5 space-y-3">
                <Ban className="w-10 h-10 text-destructive" />
                <p className="font-bold text-foreground text-sm">❌ Desconfie de quem pede dinheiro adiantado</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background shadow-sm space-y-3">
                <Camera className="w-10 h-10 text-primary" />
                <p className="font-bold text-foreground text-sm">📸 Verifique se as fotos do pet são reais (busca reversa de imagem)</p>
              </div>
              <div className="p-6 rounded-xl border-2 border-primary/20 bg-primary/5 space-y-3">
                <Flag className="w-10 h-10 text-primary" />
                <p className="font-bold text-foreground text-sm">🚨 Denuncie perfis suspeitos imediatamente</p>
              </div>
            </div>
          </section>

          {/* 3. Como denunciar */}
          <section className="bg-muted/50 p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Flag className="w-6 h-6 text-primary" /> 3. Como denunciar
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow space-y-6">
                <p className="text-muted-foreground font-semibold uppercase tracking-wider text-xs italic">Passo a passo simples:</p>
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold">entrar no perfil</span>
                  <span className="text-primary">→</span>
                  <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold">botão "Denunciar"</span>
                  <span className="text-primary">→</span>
                  <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold">escolher motivo</span>
                  <span className="text-primary">→</span>
                  <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold">enviar</span>
                </div>
                <p className="text-sm font-medium text-foreground bg-primary/10 inline-block px-3 py-1 rounded">
                  Prazo de resposta: 24-48h
                </p>
              </div>
            </div>
          </section>

          {/* 4. Cruzamento responsável */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2 border-b pb-2">
              <HeartPulse className="w-6 h-6 text-primary" /> 4. Cruzamento responsável
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">Recomendação de laudo veterinário antes do cruzamento</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">Vacinação em dia de ambos os pets</p>
              </div>
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">Contrato simples entre tutores (pode oferecer um modelo para download)</p>
              </div>
            </div>
          </section>

          {/* 5. Selos / comprometimentos da LovixPet */}
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center uppercase tracking-tighter">5. Selos / comprometimentos da LovixPet</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center font-bold text-foreground text-sm uppercase">
                ✅ Plataforma 100% gratuita — nunca pedimos pagamento
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center font-bold text-foreground text-sm uppercase">
                ✅ Sem intermediação financeira entre usuários
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center font-bold text-foreground text-sm uppercase">
                ✅ Dados protegidos pela LGPD
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;
