# 🔒 Guia de Segurança - Mystik Site v3

## ⚠️ IMPORTANTE: Informações Sensíveis

Este projeto usa **Supabase** e contém chaves de API que **NÃO DEVEM SER COMMITADAS** no Git.

---

## 📝 Arquivo `.env`

O arquivo `.env` contém suas credenciais do Supabase:

```bash
VITE_SUPABASE_URL=https://nzjavptevzsskcbqiywv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ✅ O que é seguro commitar:
- `.env.example` (modelo sem chaves reais)
- Código que usa `import.meta.env.VITE_SUPABASE_URL`

### ❌ O que NUNCA deve ser commitado:
- `.env` (arquivo real com chaves)
- Chaves hard-coded no código
- `dist/` (contém chaves no bundle)

---

## 🛡️ Proteções Implementadas

1. **`.gitignore` atualizado:**
   - Ignora `.env`, `.env.local`, etc.
   - Ignora `dist/` (build de produção)
   - Arquivos sensíveis históricos comentados (já deletados)

2. **Variáveis de ambiente:**
   - Todas as chaves agora vêm de `import.meta.env`
   - Erro lançado se `.env` estiver faltando

3. **Arquivo `.env.example`:**
   - Template para novos desenvolvedores
   - Não contém chaves reais

---

## 🚨 O que fazer se você já commitou chaves:

### 1. Rotacionar as chaves no Supabase:
```
1. Acesse: https://supabase.com/dashboard/project/nzjavptevzsskcbqiywv/settings/api
2. Clique em "Reset" nas chaves expostas
3. Copie as novas chaves para o arquivo .env
```

### 2. Limpar histórico do Git (CUIDADO!):

⚠️ **Nota:** Os arquivos sensíveis já foram deletados do projeto atual.
Se você já commitou esses arquivos no passado, considere rotacionar as chaves.

```bash
# Verificar histórico de arquivos sensíveis
git log --all --full-history -- "*info.tsx"
git log --all --full-history -- "*create-supabase-tables.js"

# Se encontrar commits com chaves, considere force push (APENAS se repo for privado)
# git push origin --force --all
```

### 3. Verificar se há commits públicos:
- Se o repositório é **público**, as chaves estão comprometidas
- Rotacione **IMEDIATAMENTE** no dashboard do Supabase

---

## 📋 Checklist de Segurança

Antes de cada commit, verifique:

- [ ] `.env` está no `.gitignore`?
- [ ] Nenhuma chave hard-coded no código?
- [ ] `dist/` não está sendo commitado?
- [ ] Variáveis de ambiente usando `import.meta.env`?

---

## 🔑 Tipos de Chaves do Supabase

### 1. **ANON KEY (Pública)**
- ✅ Pode ser usada no frontend
- ✅ Protegida por RLS (Row Level Security)
- ⚠️ Ainda deve estar em `.env` para fácil rotação

### 2. **SERVICE_ROLE KEY (Privada)**
- ❌ NUNCA usar no frontend
- ✅ Apenas em backend/serverless functions
- 🚨 Bypassa todas as RLS policies

---

## 📞 Suporte

Se você acidentalmente expôs chaves:
1. Rotacione imediatamente no Supabase
2. Verifique os logs de acesso no dashboard
3. Revise as RLS policies das tabelas

---

**Última atualização:** Outubro 2024
