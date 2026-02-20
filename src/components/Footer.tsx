import { Heart } from "lucide-react";
import { Link } from "react-router-dom"; // Importação necessária

const Footer = () => {
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
              <li><Link to="/como-funciona" className="hover:text-primary transition-colors">Como Funciona</Link></li>
              <li><Link to="/seguranca" className="hover:text-primary transition-colors">Segurança</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              {/* Links apontando para as rotas que você criou */}
              <li>
                <Link to="/termos" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
              <li>
                <Link to="/privacidade" className="hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2026 LovixPet. Todos os direitos reservados. Feito com <Heart className="inline w-4 h-4 text-primary" /> para pets.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
