import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Função para garantir que a página suba ao topo ao clicar em qualquer link
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">LovixPet</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Conectando pets para cruzamentos responsáveis e seguros. 
              Encontre o parceiro perfeito para seu melhor amigo!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sobre</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/comofunciona" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/seguranca" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Segurança
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/termos" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/contato" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2026 LovixPet. Todos os direitos reservados. Feito com{" "}
            <Heart className="inline w-4 h-4 text-primary fill-primary" /> para pets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
