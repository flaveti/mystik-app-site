# 🚀 GUIA RÁPIDO - Configurar Supabase em 3 Passos

## ✅ Passo 1: Abrir SQL Editor

1. Acesse: https://supabase.com/dashboard/project/gthsvtbpdrkuvgaexdwl
2. Clique em **SQL Editor** no menu lateral esquerdo
3. Clique em **+ New query**

---

## ✅ Passo 2: Executar o SQL

Copie **TODO** o conteúdo do arquivo:
```
📁 Mystik SITE v3/supabase/migrations/create_tables.sql
```

Cole no editor e clique em **RUN** (canto inferior direito)

Você verá a mensagem: **Success. No rows returned**

Isso significa que as tabelas foram criadas! ✅

---

## ✅ Passo 3: Verificar as Tabelas

1. Clique em **Table Editor** no menu lateral
2. Você verá 2 novas tabelas:
   - 📧 **waitlist** (0 rows)
   - 🔮 **spiritual_guides** (0 rows)

---

## 🎯 Pronto! Agora teste:

### Testar no Site:
1. Abra o site localmente ou em produção
2. Teste o formulário da **Waitlist** (seção "Junte-se à Nossa Lista")
3. Teste o formulário dos **Guias Espirituais** (clique em "Quero Fazer Parte")

### Verificar Dados Salvos:
1. Volte ao Supabase → **Table Editor**
2. Clique na tabela **waitlist** ou **spiritual_guides**
3. Veja os dados em tempo real! 🎉

---

## 📊 Estrutura das Tabelas

### **waitlist** (Lista de Espera)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único (auto) |
| email | TEXT | E-mail do usuário |
| created_at | TIMESTAMP | Data de cadastro |

### **spiritual_guides** (Guias Espirituais)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único (auto) |
| first_name | TEXT | Nome |
| last_name | TEXT | Sobrenome |
| email | TEXT | E-mail |
| country | TEXT | País (código) |
| phone | TEXT | Telefone completo |
| specialty | TEXT | Especialidade |
| experience | TEXT | Experiência |
| message | TEXT | Mensagem |
| created_at | TIMESTAMP | Data de cadastro |

---

## 🔐 Segurança Configurada

✅ **Row Level Security (RLS)** ativo
✅ Qualquer pessoa pode **inserir** (formulários públicos)
✅ Apenas admin autenticado pode **ler** os dados
✅ E-mails únicos (não permite duplicatas)

---

## ❓ Se algo der errado

1. Verifique se está logado no projeto correto: `gthsvtbpdrkuvgaexdwl`
2. Veja os erros no console do SQL Editor
3. Confirme que executou TODO o SQL (inclusive as policies)
4. Veja o arquivo `SUPABASE_SETUP.md` para mais detalhes

---

**Dúvidas?** Veja o guia completo em: `SUPABASE_SETUP.md`
