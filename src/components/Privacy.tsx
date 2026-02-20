import React from "react";
import { Lock, ShieldCheck, Eye, FileText, Globe, Bell } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <main className="container mx-auto px-4 max-w-4xl">
        {/* Cabeçalho */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Lock className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-muted-foreground italic">
            🐾 LovixPet — Última atualização: Fevereiro de 2026
          </p>
        </div>

        {/* Texto Introdutório */}
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          A LovixPet está comprometida com a proteção dos seus dados pessoais e com a transparência no tratamento das informações. 
          Esta Política descreve como coletamos, usamos, armazenamos e protegemos seus dados, em conformidade com a 
          **Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)**.
        </p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> 1. Controlador dos Dados
            </h2>
            <p>
              O controlador responsável pelo tratamento dos seus dados pessoais é a **LovixPet**, plataforma de conexão para cruzamento responsável de pets.
            </p>
            <p className="mt-2 font-medium text-foreground">
              Contato do encarregado (DPO): 
              <span className="text-primary ml-2 underline">privacidade@lovixpet.com.br</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Dados que Coletamos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2.1 Fornecidos pelo Usuário</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nome completo e e-mail</li>
                  <li>Número de telefone (opcional)</li>
                  <li>Localização aproximada (cidade/estado)</li>
                  <li>Informações do pet (raça, idade, saúde, fotos)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2.2 Coletados Automaticamente</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação e cookies</li>
                  <li>Data e hora de acesso</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" /> 3. Finalidades do Tratamento
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
              <li>Gerenciamento da conta</li>
              <li>Sistema de match entre pets</li>
              <li>Chat interno entre usuários</li>
              <li>Prevenção de fraudes</li>
              <li>Melhoria da experiência</li>
              <li>Obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal</h2>
            <p>Tratamos seus dados com base na **Execução de contrato**, **Consentimento**, **Legítimo interesse** e **Cumprimento de obrigação legal**.</p>
          </section>

          <section className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">5. Compartilhamento de Dados</h2>
            <p>
              **Não vendemos seus dados pessoais.** O compartilhamento ocorre apenas com outros usuários (perfil do pet), prestadores de serviço (hospedagem/analytics) ou por obrigação legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" /> 8. Seus Direitos (LGPD)
            </h2>
            <div className="bg-background border border-border rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-center">
              <div className="p-2 border border-border rounded">ACESSO</div>
              <div className="p-2 border border-border rounded">CORREÇÃO</div>
              <div className="p-2 border border-border rounded">EXCLUSÃO</div>
              <div className="p-2 border border-border rounded">PORTABILIDADE</div>
            </div>
            <p className="mt-4 text-sm italic">
              Para exercer seus direitos, entre em contato: privacidade@lovixpet.com.br. Atenderemos em até 15 dias úteis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> 10. Segurança da Informação
            </h2>
            <p>
              Adotamos criptografia **SSL/TLS**, armazenamento seguro e monitoramento contínuo contra ameaças para proteger suas informações.
            </p>
          </section>

          <section className="bg-destructive/5 p-6 rounded-xl border border-destructive/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Crianças e Adolescentes</h2>
            <p>
              A Plataforma LovixPet é destinada **exclusivamente a maiores de 18 anos**. Não coletamos dados de menores.
            </p>
          </section>

          <footer className="pt-12 border-t border-border text-center">
            <div className="flex justify-center gap-4 mb-4 text-primary">
              <Bell className="w-5 h-5" />
              <span className="font-semibold text-foreground">Alterações serão comunicadas com 15 dias de antecedência.</span>
            </div>
            <p className="text-sm">
              Dúvidas? <span className="font-bold">contato@lovixpet.com.br</span>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
