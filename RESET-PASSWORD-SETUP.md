# Página de Reset de Senha - Mystik Site

## 📍 Localização
`src/components/ResetPasswordPage.tsx`

## 🎯 Objetivo
Página para redefinição de senha que abre no navegador quando o usuário clica no link de recuperação recebido por email.

## 🔄 Fluxo Completo

### 1. Usuário no App Mobile
```
1. Clica em "Esqueceu a senha?"
2. Digite email
3. App chama authService.resetPasswordEmail(email)
```

### 2. Email do Supabase
```
- Supabase envia email para o usuário
- Link: https://mystikapp.com/#/reset-password?token=xxx
- Token é válido por 1 hora
```

### 3. Usuário Clica no Link
```
1. Abre https://mystikapp.com no navegador
2. App.tsx detecta hash com type=recovery
3. Redireciona automaticamente para página reset-password
4. ResetPasswordPage carrega
```

### 4. Na Página de Reset
```
1. Verifica sessão do Supabase (se token é válido)
2. Mostra formulário de nova senha
3. Validação de força da senha em tempo real
4. Usuário define nova senha
5. Supabase atualiza senha via auth.updateUser()
```

### 5. Após Sucesso
```
1. Mostra tela de sucesso ✓
2. Botão "Abrir App Mystik"
   - Tenta deep link: mystikapp://login
   - Fallback: instrução manual
3. Usuário volta ao app e faz login com nova senha
```

## 🎨 Design

### Cores e Estilo
- Background: Gradiente roxo escuro (#1a0b2e → #2d1b4e)
- Card: Glassmorphism (blur + transparência)
- Botão principal: Gradiente roxo-rosa (#A855F7 → #EC4899)
- Validações: Sistema de cores semântico
  - ❌ Erro: Vermelho (#EF4444)
  - ✅ Sucesso: Verde (#22C55E)

### Componentes
1. **Formulário de Reset**
   - Campo senha com show/hide
   - Campo confirmar senha
   - Barra de força da senha (5 níveis)
   - Validação em tempo real

2. **Tela de Sucesso**
   - Ícone check verde animado
   - Botão "Abrir App Mystik"
   - Link "Voltar ao site"

3. **Estados de Erro**
   - Token expirado/inválido
   - Senhas não coincidem
   - Senha muito fraca
   - Erro ao salvar

## 🔒 Segurança

### Validações de Senha
```typescript
- Mínimo 8 caracteres ✓
- Letra minúscula ✓
- Letra maiúscula ✓
- Número ✓
- Caractere especial ✓
```

### Níveis de Força
- 0-1: ❌ Fraca (bloqueado)
- 2: ⚠️ Regular (aceito)
- 3: ⭐ Boa
- 4-5: 🌟 Forte

### Proteções
- ✅ Token validado pelo Supabase
- ✅ Sessão expira em 1 hora
- ✅ Validação client-side + server-side
- ✅ Link de uso único

## 🚀 Como Testar

### Desenvolvimento Local
1. No app mobile, clique "Esqueceu senha"
2. Digite um email cadastrado
3. Abra o email recebido
4. **Importante**: Substitua na URL:
   ```
   https://mystikapp.com → http://localhost:5173
   ```
5. Página abre com token válido
6. Teste redefinir senha

### Produção
1. URL automática: https://mystikapp.com/#/reset-password
2. Token no hash da URL
3. Funciona direto sem ajustes

## 📝 Configuração Necessária

### No Supabase Dashboard
1. Ir em **Authentication** → **URL Configuration**
2. Adicionar em **Redirect URLs**:
   ```
   https://mystikapp.com/#/reset-password
   http://localhost:5173/#/reset-password (dev)
   ```

3. **Site URL**: `https://mystikapp.com`

4. Em **Email Templates** → **Reset Password**:
   - Usar template customizado do Mystik
   - Link deve apontar para {{ .ConfirmationURL }}

### No App Mobile
Arquivo: `src/lib/authService.ts`
```typescript
// redirectUrl sempre aponta para o site
const redirectUrl = 'https://mystikapp.com/#/reset-password';
```

## 🔗 Deep Link

### Funcionamento
Após redefinir senha com sucesso, botão tenta abrir:
```
mystikapp://login
```

### Fallback
Se deep link não funcionar (app não instalado):
- Mostra alert com instrução
- Usuário abre app manualmente
- Faz login com nova senha

## 📱 Responsivo
- ✅ Mobile: Tela cheia otimizada
- ✅ Tablet: Card centralizado
- ✅ Desktop: Card centralizado com max-width

## 🐛 Troubleshooting

### Link não funciona
- Verificar se URL está nas Redirect URLs do Supabase
- Verificar se Site URL está correto
- Token expira em 1 hora

### Deep link não abre app
- Normal em alguns navegadores/SO
- Fallback mostra instrução
- Usuário abre app manualmente

### Erro "Sessão inválida"
- Token expirado (solicitar novo)
- URL modificada
- Solicitar novo reset

## 📊 Melhorias Futuras
- [ ] Botão "Solicitar novo link" na tela de erro
- [ ] Timer mostrando tempo restante do token
- [ ] Histórico de tentativas (segurança)
- [ ] Suporte a SMS reset (além de email)
- [ ] Magic link direto (sem senha)

## 🎯 Checklist de Deploy

Site (Mystik SITE v3):
- [x] Componente ResetPasswordPage.tsx criado
- [x] Rota adicionada no App.tsx
- [x] Detecção automática de hash
- [ ] Build e deploy do site
- [ ] Testar em produção

Supabase:
- [ ] Configurar Redirect URLs
- [ ] Configurar Site URL
- [ ] Template de email customizado
- [ ] Testar envio de email

App Mobile:
- [x] URL atualizada para site
- [ ] Testar fluxo completo
- [ ] Validar deep link
