# 🔧 Guia de Configuração do Supabase Cloud

## 📋 Tabelas Criadas

Este projeto usa **duas tabelas** no Supabase para armazenar dados dos formulários:

### 1️⃣ **waitlist** - Lista de Espera do Lançamento
Armazena e-mails de usuários interessados no lançamento do app.

**Campos:**
- `id` (UUID) - Gerado automaticamente
- `email` (TEXT) - E-mail do usuário (único)
- `created_at` (TIMESTAMP) - Data de inscrição

### 2️⃣ **spiritual_guides** - Cadastro de Guias Espirituais
Armazena informações completas de guias espirituais que querem se juntar à plataforma.

**Campos:**
- `id` (UUID) - Gerado automaticamente
- `first_name` (TEXT) - Primeiro nome
- `last_name` (TEXT) - Sobrenome
- `email` (TEXT) - E-mail (único)
- `country` (TEXT) - Código do país (BR, US, ES, etc.)
- `phone` (TEXT) - Telefone completo com código do país
- `specialty` (TEXT) - Especialidade (tarot, runes, astrology, etc.)
- `experience` (TEXT) - Nível de experiência (beginner, intermediate, advanced, professional)
- `message` (TEXT) - Mensagem adicional (opcional)
- `created_at` (TIMESTAMP) - Data de cadastro

---

## 🚀 Passos para Configurar

### 1. Criar as Tabelas no Supabase

1. Acesse seu projeto Supabase em: https://supabase.com/dashboard
2. Vá para **SQL Editor** no menu lateral
3. Copie e execute o SQL do arquivo: `supabase/migrations/create_tables.sql`
4. Clique em **RUN** para criar as tabelas

### 2. Verificar Row Level Security (RLS)

As políticas RLS já estão configuradas no SQL:
- ✅ **Inserção pública**: Qualquer pessoa pode inserir dados (formulários públicos)
- ✅ **Leitura autenticada**: Apenas usuários autenticados podem ler os dados (Admin Panel)

### 3. Verificar Credenciais

Certifique-se de que o arquivo `.env` na raiz do projeto contém:
```bash
VITE_SUPABASE_URL=https://seu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

Encontre essas informações em:
- Supabase Dashboard → **Settings** → **API**
- **Project URL**: `https://[projectId].supabase.co`
- **anon/public key**: Use a chave **anon public**

**Importante:** Copie de `.env.example` se o arquivo `.env` não existir.

---

## 📊 Visualizar os Dados

### Opção 1: Table Editor (Interface Visual)
1. Vá para **Table Editor** no Supabase Dashboard
2. Selecione a tabela `waitlist` ou `spiritual_guides`
3. Veja todos os registros em tempo real

### Opção 2: SQL Editor (Queries)
```sql
-- Ver todos da waitlist
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Ver todos os guias espirituais
SELECT * FROM spiritual_guides ORDER BY created_at DESC;

-- Contar inscritos
SELECT COUNT(*) as total FROM waitlist;
SELECT COUNT(*) as total FROM spiritual_guides;

-- Filtrar por especialidade
SELECT * FROM spiritual_guides 
WHERE specialty = 'tarot' 
ORDER BY created_at DESC;

-- Filtrar por país
SELECT * FROM spiritual_guides 
WHERE country = 'BR' 
ORDER BY created_at DESC;
```

---

## 🔍 Testando os Formulários

### Testar Waitlist
1. Acesse o site e role até a seção **"Junte-se à Nossa Lista de Espera"**
2. Insira um e-mail
3. Clique em **"Entrar na Lista"**
4. Verifique no Supabase se o e-mail foi salvo

### Testar Cadastro de Guias Espirituais
1. Role até a seção **"Para Guias Espirituais"**
2. Clique em **"Quero Fazer Parte"**
3. Preencha todos os campos do formulário
4. Clique em **"Enviar Cadastro"**
5. Verifique no Supabase se os dados foram salvos

---

## ⚠️ Tratamento de Erros

O código já trata automaticamente:

- ✅ **E-mail duplicado**: Mostra mensagem "Este e-mail já está cadastrado!"
- ✅ **E-mail inválido**: Validação antes de enviar
- ✅ **Campos obrigatórios**: Formulário não envia se campos vazios
- ✅ **Telefone**: Formata com código do país automaticamente

---

## 🔐 Segurança

- ✅ **RLS ativado**: Proteção de dados em nível de linha
- ✅ **Inserção pública**: Apenas formulários podem inserir dados
- ✅ **Leitura restrita**: Apenas admin autenticado pode ver dados
- ✅ **Unique constraints**: Previne e-mails duplicados
- ✅ **Validation**: Validação de campos no frontend e backend

---

## 📱 Integração com Admin Panel

O Admin Panel já existente pode ser atualizado para mostrar:
- Lista de inscritos na waitlist
- Lista de guias espirituais cadastrados
- Filtros por especialidade, país, experiência
- Exportação de dados

Para adicionar essas visualizações, use o cliente Supabase:
```typescript
import { supabase } from '../lib/supabase';

// Buscar waitlist
const { data, error } = await supabase
  .from('waitlist')
  .select('*')
  .order('created_at', { ascending: false });

// Buscar guias espirituais
const { data, error } = await supabase
  .from('spiritual_guides')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 🎯 Próximos Passos

1. ✅ Criar tabelas no Supabase (execute o SQL)
2. ✅ Testar formulários
3. ✅ Verificar dados no Table Editor
4. 📊 (Opcional) Adicionar visualização no Admin Panel
5. 📧 (Opcional) Configurar notificações por e-mail para novos cadastros

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do Supabase Dashboard
3. Confirme que RLS está configurado corretamente
4. Verifique se as credenciais estão corretas em `info.tsx`
