import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Heart, Mail, Lock, User, Calendar } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Email inválido');
const passwordSchema = z.string().min(6, 'A senha deve ter pelo menos 6 caracteres');
const nameSchema = z.string().min(2, 'O nome deve ter pelo menos 2 caracteres');

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      if (!isLogin) {
        nameSchema.parse(fullName);
        if (!birthDate) {
          toast.error('Informe sua data de nascimento');
          return false;
        }
        if (calculateAge(birthDate) < 18) {
          toast.error('Você precisa ter pelo menos 18 anos para se cadastrar');
          return false;
        }
        if (!acceptedTerms) {
          toast.error('Você precisa aceitar os Termos de Uso para se cadastrar');
          return false;
        }
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Email ou senha incorretos');
          } else {
            toast.error('Erro ao fazer login. Tente novamente.');
          }
        } else {
          toast.success('Bem-vindo de volta!');
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Este email já está cadastrado');
          } else {
            toast.error('Erro ao criar conta. Tente novamente.');
          }
        } else {
          // Save birth_date and terms acceptance to profile after signup
          toast.success('Conta criada! Complete seu perfil.');
          // Store temporarily to save after profile is created
          localStorage.setItem('pending_birth_date', birthDate);
          localStorage.setItem('pending_terms_accepted', 'true');
          navigate('/profile');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <Card className="w-full max-w-md shadow-strong border-border/50 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? 'Entrar no LovixPet' : 'Criar Conta'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin
                ? 'Faça login para encontrar o par perfeito para seu pet'
                : 'Cadastre-se e comece a encontrar matches'}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="pl-10"
                      required={!isLogin}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Você deve ter pelo menos 18 anos</p>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg border border-border bg-muted/30">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  />
                 <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    Li e aceito os{' '}
                      <Link to="/termos" target="_blank" onClick={(e) => e.stopPropagation()} // Adicione isso aqui
                        className="text-primary hover:underline font-medium">
                    Termos de Uso
                      </Link>{' '}
                      e a{' '}
                      <Link to="/privacidade" target="_blank" onClick={(e) => e.stopPropagation()} // E aqui também
                       className="text-primary hover:underline font-medium">
                      Política de Privacidade
                        </Link>
                  </label>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Criar Conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
