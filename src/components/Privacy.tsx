import React from "react";
import { Lock, ShieldCheck, Eye, Database, FileText, Globe, Bell, UserCheck } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* pt-28 para compensar a Navbar fixa */}
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
            🐾 **LovixPet** — Última atualização: Fevereiro de 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
          
          <section>
            <p className="text-lg">
              A **LovixPet** está comprometida com a proteção dos seus dados pessoais e com a transparência no tratamento das informações. Esta Política descreve como coletamos, usamos, armazenamos e protegemos seus dados, em conformidade com a **Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)**.
            </p>
          </section>

          {/* 1. Controlador */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> 1. Controlador dos Dados
            </h2>
            <p>
              O controlador responsável pelo tratamento dos seus dados pessoais é a LovixPet, plataforma de conexão para cruzamento responsável de pets.
            </p>
            <p className="mt-2 font-medium text-foreground">
              Contato do encarregado (DPO): <span className="text-primary underline">privacidade@lovixpet.com.br</span>
            </p>
          </section>

          {/* 2. Dados coletados */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" /> 2. Dados que Coletamos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground underline decoration-primary/30">2.1 Fornecidos pelo Usuário</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nome completo e endereço de e-mail</li>
                  <li>Número de telefone (opcional)</li>
                  <li>Localização aproximada (cidade/estado)</li>
                  <li>Dados do pet: nome, raça, idade, sexo, fotos e saúde</li>
                  <li>Preferências de cruzamento</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground underline decoration-primary/30">2.2 Coletados Automaticamente</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação e interação</li>
                  <li>Cookies e tecnologias similares</li>
                  <li>Data e hora de acesso</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Finalidades */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" /> 3. Finalidades do Tratamento
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-sm">
              <li>Criação e gerenciamento da conta</li>
              <li>Operação do sistema de match</li>
              <li>Comunicação entre usuários (chat interno)</li>
              <li>Notificações de novos matches</li>
              <li>Prevenção de fraudes e segurança</li>
              <li>Cumprimento de obrigações legais</li>
            </ul>
          </section>

          {/* 5. Compartilhamento */}
          <section className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">5. Compartilhamento de Dados</h2>
            <p className="text-sm">
              **Não vendemos seus dados pessoais.** Compartilhamos informações do perfil do pet com outros usuários para fins de match e com prestadores de serviço (hospedagem/analytics) sob sigilo contratual.
            </p>
          </section>

          {/* 8. Direitos */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 8. Seus Direitos como Titular
            </h2>
            <p className="mb-4 text-sm font-medium italic">Nos termos da LGPD, você pode solicitar:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-center">
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Acesso</div>
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Correção</div>
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Eliminação</div>
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Portabilidade</div>
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Revogação</div>
              <div className="p-3 border border-border rounded-lg bg-background shadow-sm uppercase tracking-wider">Oposição</div>
            </div>
          </section>

          {/* 10. Segurança */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> 10. Segurança da Informação
            </h2>
            <p>
              Adotamos criptografia de dados em trânsito (**SSL/TLS**), armazenamento seguro e monitoramento contínuo contra ameaças e acessos não autorizados.
            </p>
          </section>

          {/* 11. Crianças */}
          <section className="bg-destructive/5 p-6 rounded-xl border border-destructive/20">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
               11. Crianças e Adolescentes
            </h2>
            <p className="font-medium text-foreground">
              A Plataforma LovixPet é destinada exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados de menores de idade.
            </p>
          </section>

          {/* Rodapé de Contato da Página */}
          <section className="pt-12 border-t border-border text-center space-y-4">
            <div className="flex justify-center gap-2 text-primary">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-widest">Alterações nesta Política</span>
            </div>
            <p className="text-sm max-w-lg mx-auto">
              Comunicaremos alterações relevantes por e-mail com 15 dias de antecedência. Dúvidas: 
              <span className="font-bold text-primary ml-1">privacidade@lovixpet.com.br</span>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
