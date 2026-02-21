import React from "react";
import { Lock, ShieldCheck, Eye, Database, FileText, Globe, Bell, UserCheck, Share2, ShieldAlert, AlertTriangle } from "lucide-react";
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
            🐾 **LovixPet** — Última atualização: fevereiro de 2025
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          
          <section>
            <p>
              A LovixPet está comprometida com a proteção dos seus dados pessoais e com a transparência no tratamento das informações. Esta Política descreve como coletamos, usamos, armazenamos e protegemos seus dados, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          {/* 1. Controlador dos Dados */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> 1. Controlador dos Dados
            </h2>
            <p>
              O controlador responsável pelo tratamento dos seus dados pessoais é a LovixPet, plataforma de conexão para cruzamento responsável de pets.
            </p>
            <p className="mt-2 font-medium text-foreground">
              Contato do encarregado (DPO): privacidade@lovixpet.com.br
            </p>
          </section>

          {/* 2. Dados que Coletamos */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" /> 2. Dados que Coletamos
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">2.1 Dados Fornecidos pelo Usuário</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nome completo e endereço de e-mail</li>
                  <li>Número de telefone (opcional)</li>
                  <li>Localização aproximada (cidade/estado)</li>
                  <li>Informações sobre o pet: nome, raça, idade, sexo, fotos e histórico de saúde</li>
                  <li>Preferências de cruzamento</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">2.2 Dados Coletados Automaticamente</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação e interação com a Plataforma</li>
                  <li>Informações de cookies e tecnologias similares</li>
                  <li>Data e hora de acesso</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">2.3 Dados de Terceiros</h3>
                <p className="text-sm">Caso você opte por se cadastrar via redes sociais (ex.: Google), coletamos apenas os dados essenciais liberados por você nessas plataformas.</p>
              </div>
            </div>
          </section>

          {/* 3. Finalidades do Tratamento */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" /> 3. Finalidades do Tratamento
            </h2>
            <p className="text-sm mb-3 font-semibold">Seus dados são tratados para as seguintes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Criação e gerenciamento da sua conta na Plataforma</li>
              <li>Operação do sistema de match entre pets compatíveis</li>
              <li>Comunicação entre usuários (chat interno)</li>
              <li>Envio de notificações relevantes sobre matches e atualizações</li>
              <li>Melhoria contínua da experiência do usuário</li>
              <li>Prevenção de fraudes e garantia da segurança da Plataforma</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
              <li>Comunicações de marketing (somente com seu consentimento)</li>
            </ul>
          </section>

          {/* 4. Base Legal para o Tratamento */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" /> 4. Base Legal para o Tratamento
            </h2>
            <p className="text-sm mb-3">O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Execução de contrato: para cumprir os serviços previstos nos Termos de Uso</li>
              <li>Consentimento: para envio de comunicações de marketing e uso de cookies não essenciais</li>
              <li>Legítimo interesse: para melhoria dos serviços e prevenção de fraudes</li>
              <li>Cumprimento de obrigação legal: quando exigido por lei ou autoridade competente</li>
            </ul>
          </section>

          {/* 5. Compartilhamento de Dados */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Share2 className="w-6 h-6 text-primary" /> 5. Compartilhamento de Dados
            </h2>
            <p className="text-sm mb-3 font-bold text-foreground">Não vendemos seus dados pessoais. Podemos compartilhá-los apenas nas seguintes situações:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Com outros usuários: informações do perfil do pet são visíveis para fins de match</li>
              <li>Com prestadores de serviço: empresas que nos auxiliam na operação da Plataforma (hospedagem, analytics), sempre mediante contrato de confidencialidade</li>
              <li>Por obrigação legal: quando exigido por autoridade judicial ou administrativa</li>
              <li>Em caso de fusão ou aquisição: seus dados poderão ser transferidos ao novo controlador, com notificação prévia</li>
            </ul>
          </section>

          {/* 6. Transferência Internacional de Dados */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Transferência Internacional de Dados</h2>
            <p className="text-sm">Alguns de nossos prestadores de serviço podem estar localizados fora do Brasil. Nesses casos, garantimos que a transferência é realizada em conformidade com a LGPD, adotando as salvaguardas adequadas (cláusulas contratuais padrão ou país com nível de proteção equivalente).</p>
          </section>

          {/* 7. Retenção de Dados */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Retenção de Dados</h2>
            <p className="text-sm">Seus dados são mantidos enquanto sua conta estiver ativa. Após o encerramento da conta, os dados são retidos pelo prazo necessário para cumprimento de obrigações legais (geralmente 5 anos) e, em seguida, excluídos ou anonimizados de forma segura.</p>
          </section>

          {/* 8. Seus Direitos como Titular */}
          <section className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 8. Seus Direitos como Titular
            </h2>
            <p className="text-sm mb-3">Nos termos da LGPD, você tem direito a:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Confirmação: saber se tratamos seus dados pessoais</li>
              <li>Acesso: obter cópia dos dados que mantemos sobre você</li>
              <li>Correção: atualizar dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização ou bloqueio: limitar o uso de dados desnecessários</li>
              <li>Eliminação: solicitar a exclusão de dados tratados com base no consentimento</li>
              <li>Portabilidade: receber seus dados em formato estruturado</li>
              <li>Revogação do consentimento: a qualquer momento, sem custo</li>
              <li>Oposição: contestar tratamentos que violem a LGPD</li>
            </ul>
            <p className="mt-4 text-sm font-medium text-foreground">Para exercer seus direitos, entre em contato: privacidade@lovixpet.com.br. Atenderemos sua solicitação em até 15 dias úteis.</p>
          </section>

          {/* 9. Cookies e Tecnologias de Rastreamento */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Cookies e Tecnologias de Rastreamento</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2 italic">9.1 Tipos de Cookies</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Essenciais: necessários para o funcionamento básico da Plataforma (não requerem consentimento)</li>
                  <li>Analíticos: nos ajudam a entender como a Plataforma é utilizada</li>
                  <li>De marketing: utilizados para personalizar comunicações (somente com consentimento)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2 italic">9.2 Gerenciamento</h3>
                <p className="text-sm">Você pode gerenciar suas preferências de cookies a qualquer momento nas configurações da sua conta ou do seu navegador. A recusa de cookies não essenciais não afetará o funcionamento principal da Plataforma.</p>
              </div>
            </div>
          </section>

          {/* 10. Segurança da Informação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> 10. Segurança da Informação
            </h2>
            <p className="text-sm mb-3">Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação indevida, incluindo:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Criptografia de dados em trânsito (SSL/TLS)</li>
              <li>Armazenamento seguro com controles de acesso</li>
              <li>Monitoramento contínuo contra ameaças</li>
              <li>Treinamento regular da equipe sobre proteção de dados</li>
            </ul>
            <p className="mt-3 text-sm italic">Em caso de incidente de segurança que possa causar risco a você, notificaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os usuários afetados conforme exigido pela LGPD.</p>
          </section>

          {/* 11. Proteção de Dados nas Conversas entre Usuários */}
          <section className="bg-destructive/5 border-2 border-destructive/20 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-destructive mb-4 flex items-center gap-2">
              <ShieldAlert className="w-7 h-7" /> 11. Proteção de Dados nas Conversas entre Usuários
            </h2>
            <p className="font-bold text-foreground mb-4 text-sm">
              AVISO IMPORTANTE: A LovixPet NÃO se responsabiliza pelo uso indevido de dados pessoais que você voluntariamente compartilhe com outros usuários por meio do chat interno ou por outros meios.
            </p>
            <p className="text-sm font-semibold mb-3 italic">Para sua segurança, recomendamos fortemente que você NUNCA compartilhe, em conversas com outros usuários:</p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-xs font-medium text-foreground">
              <li>Número de telefone celular ou fixo</li>
              <li>Endereço residencial, de trabalho ou qualquer localização precisa</li>
              <li>Documentos pessoais (CPF, RG, CNH)</li>
              <li>Dados bancários, chaves Pix ou informações de cartão de crédito</li>
              <li>Senhas ou credenciais de acesso a qualquer serviço</li>
              <li>Informações sobre rotina, horários ou locais que frequenta</li>
            </ul>
            <p className="mt-5 text-sm">
              A LovixPet não tem acesso ao conteúdo das mensagens trocadas no chat e não pode ser responsabilizada por eventuais crimes, fraudes, golpes, roubos, extorsões ou qualquer dano resultante do compartilhamento voluntário dessas informações. Ao fornecer dados pessoais a terceiros, você o faz por sua exclusiva conta e risco.
            </p>
            <p className="mt-2 text-sm">
              Em caso de abuso, ameaça ou suspeita de crime, utilize o botão de denúncia na Plataforma e, se necessário, acione as autoridades policiais competentes.
            </p>
          </section>

          {/* 12. Crianças e Adolescentes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Crianças e Adolescentes</h2>
            <p className="text-sm">A Plataforma LovixPet é destinada exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados de menores de idade. Caso identifiquemos tal situação, excluiremos os dados imediatamente.</p>
          </section>

          {/* 13. Alterações nesta Política */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">13. Alterações nesta Política</h2>
            <p className="text-sm">Esta Política pode ser atualizada periodicamente. Comunicaremos alterações relevantes por e-mail ou notificação na Plataforma com antecedência mínima de 15 dias. Recomendamos que você revise este documento periodicamente.</p>
          </section>

          {/* 14. Contato e Encarregado de Dados */}
          <section className="pt-12 border-t border-border space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">14. Contato e Encarregado de Dados</h2>
            <p className="text-sm mb-2 italic font-semibold text-foreground">Para exercer seus direitos, tirar dúvidas ou registrar reclamações:</p>
            <ul className="space-y-1 text-sm">
              <li>E-mail: <span className="text-primary font-bold">privacidade@lovixpet.com.br</span></li>
              <li>Suporte geral: <span className="text-primary font-bold">contato@lovixpet.com.br</span></li>
            </ul>
            <p className="text-xs mt-4">
              Você também pode registrar reclamações perante a Autoridade Nacional de Proteção de Dados (ANPD): <span className="underline decoration-primary/30">www.gov.br/anpd</span>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
