import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);

  // Verificar se tem sessão válida do link de email
  useEffect(() => {
    const checkSession = async () => {
      console.log('🔍 [Reset] Verificando sessão de recovery...');
      
      const fullHash = window.location.hash;
      console.log('🔍 [Reset] Hash completo:', fullHash);
      
      // O hash vem como: #/reset-password#access_token=xxx&type=recovery
      // Precisamos extrair a parte após o segundo #
      let tokenHash = fullHash;
      if (fullHash.includes('#access_token=')) {
        // Extrair apenas a parte do token
        const tokenStart = fullHash.indexOf('#access_token=');
        tokenHash = fullHash.substring(tokenStart);
        console.log('🔍 [Reset] Token hash extraído:', tokenHash.substring(0, 50) + '...');
      }
      
      // Tentar definir a sessão manualmente a partir do hash
      if (tokenHash.includes('access_token=')) {
        console.log('🔍 [Reset] Tentando processar token manualmente...');
        
        // Extrair parâmetros do hash
        const params = new URLSearchParams(tokenHash.replace('#', ''));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        console.log('🔍 [Reset] Access token encontrado:', accessToken ? 'SIM' : 'NÃO');
        console.log('🔍 [Reset] Refresh token encontrado:', refreshToken ? 'SIM' : 'NÃO');
        
        if (accessToken && refreshToken) {
          // Definir sessão manualmente
          const { data, error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          console.log('🔍 [Reset] Resultado setSession:', data);
          console.log('🔍 [Reset] Erro setSession:', setError);
          
          if (data?.session && !setError) {
            console.log('✅ [Reset] Sessão definida com sucesso!');
            setValidSession(true);
            return;
          }
        }
      }
      
      // Fallback: tentar getSession normal
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('🔍 [Reset] Sessão via getSession:', session);
      console.log('🔍 [Reset] Erro via getSession:', error);
      
      if (session && !error) {
        console.log('✅ [Reset] Sessão válida encontrada!');
        setValidSession(true);
      } else {
        console.error('❌ [Reset] Nenhuma sessão válida');
        setError('Link expirado ou inválido. Solicite um novo reset de senha.');
      }
    };
    checkSession();
  }, []);

  // Validar força da senha
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthColor = strength < 2 ? '#EF4444' : strength < 3 ? '#F97316' : strength < 4 ? '#EABB08' : '#22C55E';
  const strengthLabel = strength < 2 ? 'Fraca' : strength < 3 ? 'Regular' : strength < 4 ? 'Boa' : 'Forte';

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (strength < 2) {
      setError('Senha muito fraca. Use letras, números e caracteres especiais.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      console.error('Erro ao redefinir senha:', err);
      setError(err.message || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const openApp = () => {
    // Tentar abrir o app via deep link
    window.location.href = 'mystikapp://login';
    
    // Fallback: mostrar instruções se não abrir em 2 segundos
    setTimeout(() => {
      alert('Se o app não abrir automaticamente, abra-o manualmente e faça login com sua nova senha.');
    }, 2000);
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            maxWidth: '450px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '48px 32px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22C55E, #10B981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}
          >
            <CheckCircle size={40} color="white" />
          </motion.div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '12px'
          }}>
            Senha Redefinida!
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Sua senha foi alterada com sucesso. Agora você pode fazer login no app com sua nova senha.
          </p>

          <button
            onClick={openApp}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #A855F7, #EC4899)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Abrir App Mystik
          </button>

          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15), transparent 50%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '450px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '40px 32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #A855F7, #06B6D4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock size={32} color="white" />
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '8px'
          }}>
            Redefinir Senha
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: '1.5'
          }}>
            Digite sua nova senha abaixo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <AlertCircle size={20} color="#EF4444" />
            <span style={{ color: '#FCA5A5', fontSize: '14px' }}>{error}</span>
          </motion.div>
        )}

        {validSession && (
          <form onSubmit={handleResetPassword}>
            {/* Nova Senha */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Nova Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="rgba(255, 255, 255, 0.5)" />
                  ) : (
                    <Eye size={20} color="rgba(255, 255, 255, 0.5)" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {password.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      Força da senha:
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: strengthColor
                    }}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div style={{
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(strength / 5) * 100}%`,
                      background: strengthColor,
                      transition: 'all 0.3s'
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Confirmar Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="rgba(255, 255, 255, 0.5)" />
                  ) : (
                    <Eye size={20} color="rgba(255, 255, 255, 0.5)" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !validSession}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? 'rgba(168, 85, 247, 0.5)' : 'linear-gradient(135deg, #A855F7, #EC4899)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s, opacity 0.2s',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>

            {/* Back to site */}
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              <ArrowLeft size={16} />
              Voltar ao site
            </a>
          </form>
        )}
      </motion.div>
    </div>
  );
}
