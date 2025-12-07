# 🔐 Como Acessar o Admin Panel

## 📍 Passo 1: Acesse a URL do Admin

### Desenvolvimento (localhost):
```
http://localhost:3001/#admin-login
```

### Produção:
```
https://seu-site.com/#admin-login
```

---

## 🔑 Passo 2: Faça Login

**Credenciais:**
- **Email:** `mcdflavia1@gmail.com`
- **Senha:** `Panda@1550`

---

## 📊 Passo 3: Visualize os Dados

Após o login, você verá:

### **Aba 1: Guias Espirituais**
- Lista completa de guias cadastrados
- Filtros por: especialidade, experiência, país
- Busca por nome, email ou telefone
- Exportar CSV dos guias

### **Aba 2: Lista de Espera**
- Lista completa de emails da waitlist
- Data de cadastro
- Exportar CSV da waitlist

---

## 📈 Estatísticas Exibidas

1. **Guias Cadastrados** - Total de guias espirituais
2. **Lista de Espera** - Total de interessados no app
3. **Guias Este Mês** - Novos cadastros do mês
4. **Waitlist Este Mês** - Novos interessados do mês

---

## ⚙️ Funções Disponíveis

### **Guias Espirituais:**
- ✅ Visualizar todos os dados (nome, email, telefone, país, especialidade, experiência, mensagem)
- ✅ Filtrar por especialidade (tarot, runes, astrology, etc.)
- ✅ Filtrar por experiência (beginner, intermediate, advanced, professional)
- ✅ Filtrar por país
- ✅ Buscar por texto livre
- ✅ Ordenar por data ou nome
- ✅ Exportar CSV
- ✅ Ver detalhes de cada guia (clique no card)

### **Lista de Espera:**
- ✅ Visualizar todos os emails
- ✅ Data de cadastro
- ✅ Exportar CSV

---

## 🚪 Sair do Admin

Clique no botão **"Sair"** no canto superior direito

---

## 🔒 Segurança

- ✅ Login protegido com credenciais
- ✅ Dados armazenados no Supabase com Row Level Security
- ✅ Apenas leitura pública habilitada (não há opção de deletar/editar na UI)

---

## 📱 Acesso Rápido

**Atalho direto no site:**
- Adicione `#admin-login` no final da URL
- Exemplo: `http://localhost:3001/#admin-login`

---

## ❓ Troubleshooting

### Não consigo fazer login
- Verifique se digitou o email e senha corretamente
- Email: `mcdflavia1@gmail.com`
- Senha: `Panda@1550` (case-sensitive!)

### Não vejo dados
- Verifique se as tabelas foram criadas no Supabase
- Acesse: https://supabase.com/dashboard/project/nzjavptevzsskcbqiywv/editor
- Certifique-se que as tabelas `waitlist` e `spiritual_guides` existem

### Erro de variáveis de ambiente
- Verifique se o arquivo `.env` existe na raiz do projeto
- Deve conter: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Copie de `.env.example` se necessário
- Verifique se as tabelas `waitlist` e `spiritual_guides` existem
- Teste preenchendo os formulários no site

### Erro ao carregar
- Veja o console do navegador (F12)
- Verifique se o Supabase está configurado corretamente
- Verifique as credenciais em `src/utils/supabase/info.tsx`

---

**Pronto! Agora você pode gerenciar todos os cadastros!** 🎉
