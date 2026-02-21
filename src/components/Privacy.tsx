import React from "react";
import { Lock, ShieldCheck, Eye, Database, FileText, Globe, Bell, UserCheck, Share2, Trash2, ShieldAlert, AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        
        {/* Cabeçalho */}
        <div className="mb-12 border-b border-border pb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-primary">
            <Lock className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-muted-foreground">
            🐾 **LovixPet** — Última atualização: Fevereiro de 2025
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          
          <section>
            <p className="text-lg">
              A LovixPet está comprometida com a proteção dos seus dados pessoais e com a transparência no tratamento das informações. Esta Política descreve como coletamos, usamos, armazenamos e protegemos seus dados, em conformidade com a **Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)**.
            </p>
          </section>

          {/* 1. Controlador */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> 1. Controlador dos Dados
            </h2>
            <p>O controlador responsável pelo tratamento dos seus dados pessoais é a LovixPet, plataforma de conexão para cruzamento responsável de pets.</p>
            <p className="mt-4 font-semibold text-foreground italic">
              Contato do encarregado (DPO): <span className="text-primary underline">privacidade@lovixpet.com.br</span>
            </p>
          </section>

          {/* 2. Dados Coletados */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" /> 2. Dados que Coletamos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground border-b border-primary/20 pb-1">2.1 Fornecidos pelo Usuário</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nome completo e endereço de e-mail</li>
                  <li>Número de telefone (opcional)</li>
                  <li>Localização aproximada (cidade/estado)</li>
                  <li>Informações do pet: nome, raça, idade, fotos e saúde</li>
                  <li>Preferências de cruzamento</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-foreground border-b border-primary/20 pb-1">2.2 Coletados Automaticamente</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação e interação com a Plataforma</li>
                  <li>Informações de cookies e tecnologias similares</li>
                  <li>Data e hora de acesso</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs italic">2.3 Dados de Terceiros: Caso opte por cadastro via redes sociais (Google), coletamos apenas os dados essenciais liberados por você.</p>
          </section>

          {/* 3. Finalidades */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" /> 3. Finalidades do Tratamento
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-sm">
              <li>Criação e gerenciamento da conta</li>
              <li>Operação do sistema de match entre pets</li>
              <li>Comunicação entre usuários (chat interno)</li>
              <li>Envio de notificações relevantes</li>
              <li>Prevenção de fraudes e segurança da Plataforma</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
              <li>Comunicações de marketing (com consentimento)</li>
            </ul>
          </section>

          {/* 4 e 5. Base Legal e Compartilhamento */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> 4. Base Legal
              </h2>
              <p className="text-sm">Tratamos dados para Execução de Contrato (Termos de Uso), Consentimento, Legítimo Interesse e Cumprimento de Obrigação Legal.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" /> 5. Compartilhamento
              </h2>
              <p className="text-sm">Não vendemos seus dados. Compartilhamos informações com outros usuários (perfil do pet) e prestadores de serviços sob contrato de sigilo.</p>
            </section>
          </div>

          {/* 8. Direitos do Titular */}
          <section className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 8. Seus Direitos (LGPD)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs font-bold text-center">
              {['Confirmação', 'Acesso', 'Correção', 'Anonimização', 'Eliminação', 'Portabilidade', 'Revogação', 'Oposição'].map((item) => (
                <div key={item} className="p-2 border border-border rounded bg-background shadow-sm uppercase tracking-tighter">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm italic text-center">Solicite via: privacidade@lovixpet.com.br</p>
          </section>

          {/* 10. Segurança */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> 10. Segurança da Informação
            </h2>
            <p className="text-sm">
              Adotamos criptografia **SSL/TLS**, armazenamento seguro e monitoramento contínuo. Em caso de incidentes que gerem riscos, notificaremos a **ANPD** e os usuários conforme exigido por lei.
            </p>
          </section>

          {/* 11. AVISO CRÍTICO - PROTEÇÃO NAS CONVERSAS */}
          <section className="bg-destructive/5 border-2 border-destructive/20 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-destructive mb-4 flex items-center gap-2">
              <ShieldAlert className="w-7 h-7" /> 11. Proteção nas Conversas
            </h2>
            <p className="font-bold text-foreground mb-4 text-sm uppercase tracking-tight">
              A LovixPet NÃO se responsabiliza pelo uso indevido de dados que você voluntariamente compartilhe no chat.
            </p>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg border border-destructive/10">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
                   <AlertTriangle className="w-4 h-4 text-amber-500" /> NUNCA COMPARTILHE:
                </p>
                <ul className="grid md:grid-cols-2 gap-1 text-xs list-disc pl-5">
                  <li>Número de telefone ou endereço</li>
                  <li>Documentos (CPF, RG, CNH)</li>
                  <li>Dados bancários ou Chaves Pix</li>
                  <li>Informações de rotina ou horários</li>
                </ul>
              </div>
              <p className="text-xs italic">
                A LovixPet não tem acesso ao conteúdo das mensagens e não pode ser responsabilizada por crimes, fraudes ou golpes resultantes deste compartilhamento.
              </p>
            </div>
          </section>

          {/* 12. Crianças */}
          <section className="border border-border p-6 rounded-xl">
            <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
               12. Crianças e Adolescentes
            </h2>
            <p className="text-sm">
              Plataforma destinada exclusivamente a maiores de 18 anos. Caso identifiquemos dados de menores, estes serão excluídos imediatamente.
            </p>
          </section>

          {/* 14. Contato Final */}
          <footer className="pt-12 border-t border-border text-center space-y-6">
            <div className="flex justify-center gap-2 text-primary items-center">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-bold text-foreground uppercase tracking-widest">Alterações na Política</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm">Encarregado de Dados (DPO): <strong>privacidade@lovixpet.com.br</strong></p>
              <p className="text-xs">
                Você também pode reclamar perante a ANPD: <span className="underline">www.gov.br/anpd</span>
              </p>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
