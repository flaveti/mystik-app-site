import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
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
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const fullHash = window.location.hash;
      
      let tokenHash = fullHash;
      if (fullHash.includes('#access_token=')) {
        const tokenStart = fullHash.indexOf('#access_token=');
        tokenHash = fullHash.substring(tokenStart);
      }
      
      if (tokenHash.includes('access_token=')) {
        const params = new URLSearchParams(tokenHash.replace('#', ''));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken && refreshToken) {
          const { data, error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (data?.session && !setError) {
            setValidSession(true);
            setCheckingSession(false);
            return;
          }
        }
      }
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session && !error) {
        setValidSession(true);
      } else {
        setError('Link expirado ou inválido. Solicite um novo link de redefinição.');
      }
      setCheckingSession(false);
    };
    checkSession();
  }, []);

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
  const strengthColor = strength < 2 ? '#ef4444' : strength < 3 ? '#f97316' : strength < 4 ? '#eab308' : '#22c55e';
  const strengthLabel = strength < 2 ? 'Fraca' : strength < 3 ? 'Regular' : strength < 4 ? 'Boa' : 'Forte';

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (strength < 2) {
      setError('Senha muito fraca');
      return;
    }

    setLoading(true);

    try {
      // 1. Atualiza no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.updateUser({ password });
      if (authError) throw authError;
      
      // 2. Atualiza também na tabela users (hash SHA-256 para compatibilidade com o app)
      if (authData.user?.email) {
        const encoder = new TextEncoder();
        const hashData = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', hashData);
        const passwordHash = Array.from(new Uint8Array(hashBuffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        
        const { error: dbError } = await supabase
          .from('users')
          .update({ password: passwordHash })
          .eq('email', authData.user.email);
        
        if (dbError) {
          console.error('Erro ao atualizar senha na tabela users:', dbError);
          // Não vamos falhar se só essa parte der erro
        }
      }
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  };

  const openApp = () => {
    window.location.href = 'mystikapp://login';
    setTimeout(() => {
      alert('Se o app não abrir, abra-o manualmente e faça login.');
    }, 2000);
  };

  // Loading state
  if (checkingSession) {
    return (
      <div style={styles.container}>
        <style>{globalStyles}</style>
        <div style={styles.card}>
          <div style={styles.loadingSpinner} />
          <p style={styles.loadingText}>Verificando link...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div style={styles.container}>
        <style>{globalStyles}</style>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.card}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            style={styles.successIcon}
          >
            <Check size={22} color="white" strokeWidth={3} />
          </motion.div>

          <h1 style={styles.title}>Senha alterada</h1>
          <p style={styles.subtitle}>
            Sua senha foi redefinida com sucesso.
          </p>

          <button onClick={openApp} style={styles.primaryButton}>
            Abrir Mystik
          </button>

          <a href="/" style={styles.backLink}>
            <ArrowLeft size={14} />
            Voltar ao site
          </a>
        </motion.div>

        <p style={styles.footer}>Mystik © 2025</p>
      </div>
    );
  }

  // Main form
  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        {/* Logo */}
        <div style={styles.logoContainer}>
          <Sparkles size={18} color="#a855f7" />
        </div>

        <h1 style={styles.title}>Nova senha</h1>
        <p style={styles.subtitle}>
          Escolha uma senha segura para sua conta
        </p>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.errorBox}
          >
            <AlertCircle size={14} color="#ef4444" />
            <span>{error}</span>
          </motion.div>
        )}

        {validSession && (
          <form onSubmit={handleResetPassword} style={styles.form}>
            {/* Password field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Nova senha</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength indicator */}
              {password.length > 0 && (
                <div style={styles.strengthContainer}>
                  <div style={styles.strengthBar}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength / 5) * 100}%` }}
                      style={{ ...styles.strengthFill, background: strengthColor }}
                    />
                  </div>
                  <span style={{ ...styles.strengthLabel, color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirmar senha</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite novamente"
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <span style={styles.errorText}>Senhas não coincidem</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !validSession}
              style={{
                ...styles.primaryButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </button>

            <a href="/" style={styles.backLink}>
              <ArrowLeft size={14} />
              Voltar ao site
            </a>
          </form>
        )}
      </motion.div>

      <p style={styles.footer}>Mystik © 2025</p>
    </div>
  );
}

const globalStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .reset-input:focus {
    border-color: #a855f7 !important;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.08) !important;
  }
`;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '340px',
    background: 'white',
    borderRadius: '12px',
    padding: '28px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
    border: '1px solid #f0f0f0'
  },
  logoContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111',
    margin: '0 0 4px 0',
    letterSpacing: '-0.3px'
  },
  subtitle: {
    fontSize: '13px',
    color: '#777',
    margin: '0 0 20px 0',
    lineHeight: '1.4'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  fieldGroup: {
    marginBottom: '14px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '500',
    color: '#444',
    marginBottom: '5px'
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '9px 36px 9px 11px',
    fontSize: '13px',
    border: '1px solid #e5e5e5',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    background: '#fff',
    color: '#111',
    boxSizing: 'border-box'
  },
  eyeButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  strengthContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '6px'
  },
  strengthBar: {
    flex: 1,
    height: '2px',
    background: '#eee',
    borderRadius: '1px',
    overflow: 'hidden'
  },
  strengthFill: {
    height: '100%',
    borderRadius: '1px',
    transition: 'width 0.2s, background 0.2s'
  },
  strengthLabel: {
    fontSize: '10px',
    fontWeight: '500',
    minWidth: '40px',
    textAlign: 'right'
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 10px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    marginBottom: '14px',
    fontSize: '12px',
    color: '#dc2626'
  },
  errorText: {
    fontSize: '11px',
    color: '#ef4444',
    marginTop: '4px',
    display: 'block'
  },
  primaryButton: {
    width: '100%',
    padding: '10px 14px',
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    marginTop: '6px'
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    color: '#999',
    textDecoration: 'none',
    fontSize: '12px',
    marginTop: '14px',
    transition: 'color 0.15s'
  },
  successIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px'
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #f0f0f0',
    borderTopColor: '#a855f7',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 10px'
  },
  loadingText: {
    fontSize: '13px',
    color: '#777',
    textAlign: 'center',
    margin: 0
  },
  footer: {
    fontSize: '11px',
    color: '#bbb',
    marginTop: '20px'
  }
};
