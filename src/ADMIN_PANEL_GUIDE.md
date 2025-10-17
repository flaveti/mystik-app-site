# 🔐 Guia do Painel Administrativo - Mystik

## 🚪 Como Acessar o Painel Admin

### Passo 1: Ativação Secreta
1. Na página inicial do site, **clique 50 vezes seguidas no logo "Mystik"** no canto superior esquerdo
2. Os cliques devem ser feitos rapidamente (dentro de 2 segundos entre cada clique)
3. Após 50 cliques, você será redirecionado para a tela de login

### Passo 2: Login
**Credenciais de Acesso:**
- **Email:** `mcdflavia1@gmail.com`
- **Senha:** `Panda@1550`

> ⚠️ **Importante:** Mantenha estas credenciais em segredo. O acesso é restrito ao administrador.

---

## 📊 Funcionalidades do Painel

### 1. Dashboard de Estatísticas
Visualize métricas importantes em tempo real:
- **Total de Cadastros:** Número total de médiuns cadastrados
- **Pendentes:** Cadastros aguardando primeiro contato
- **Aprovados:** Médiuns confirmados na plataforma
- **Este Mês:** Novos cadastros no mês atual
- **Países:** Quantidade de países diferentes representados

### 2. Sistema de Busca e Filtros

#### Busca Textual
- Pesquise por **nome, email ou telefone**
- A busca é instantânea e case-insensitive
- Clique no X para limpar a busca

#### Filtros Disponíveis
- **Status:**
  - Todos
  - Pendente (aguardando contato)
  - Contatado (em processo)
  - Aprovado (confirmado na plataforma)
  - Rejeitado

- **Especialidade:**
  - Tarô
  - Lenormand
  - Runas
  - Búzios
  - I-Ching
  - Cartas dos Anjos
  - Astrologia
  - Numerologia
  - Mediunidade
  - Outra

- **Nível de Experiência:**
  - Iniciante (menos de 1 ano)
  - Intermediário (1-3 anos)
  - Avançado (3-5 anos)
  - Profissional (5+ anos)

- **País:** Lista todos os países dos cadastros

#### Ordenação
- **Por Data:** Mais recentes primeiro (padrão)
- **Por Nome:** Ordem alfabética

### 3. Gerenciamento de Cadastros

#### Visualizar Detalhes
- Clique em qualquer card de cadastro para ver todos os detalhes
- Visualize informações completas incluindo mensagem enviada pelo médium

#### Atualizar Status
1. Clique no cadastro para abrir os detalhes
2. Use o dropdown "Status do Cadastro" para alterar
3. As mudanças são salvas automaticamente no Supabase
4. Notificação de sucesso aparecerá na tela

#### Deletar Cadastro
1. Passe o mouse sobre o card do cadastro
2. Clique no ícone de lixeira que aparece
3. Confirme a exclusão no diálogo
4. O cadastro será removido permanentemente

> ⚠️ **Atenção:** A exclusão é irreversível!

### 4. Exportação de Dados

#### Exportar para CSV
1. Clique no botão "Exportar CSV" no topo da página
2. O arquivo será baixado automaticamente com formato:
   - Nome do arquivo: `mystik-mediums-YYYY-MM-DD.csv`
   - Inclui todos os cadastros visíveis (respeitando filtros ativos)

#### Dados Incluídos no CSV
- ID do cadastro
- Nome e Sobrenome
- Email
- País
- Telefone
- Especialidade
- Nível de Experiência
- Status
- Data de Cadastro
- Mensagem

### 5. Atualização de Dados
- Clique em "Atualizar" no topo da página para recarregar os dados
- Os dados são carregados automaticamente ao acessar o painel
- Notificação de sucesso aparecerá após atualização

---

## 🎨 Indicadores Visuais

### Cores por Status
- 🟡 **Amarelo:** Pendente
- 🔵 **Azul:** Contatado
- 🟢 **Verde:** Aprovado
- 🔴 **Vermelho:** Rejeitado

### Ícones
- 📧 **Email:** Link direto para enviar email
- 📱 **Telefone:** Número com código de área
- 🌍 **País:** Bandeira + nome do país
- 💼 **Especialidade:** Área de atuação
- 🎓 **Experiência:** Nível profissional
- 📅 **Data:** Quando o cadastro foi feito

---

## 🔄 Fluxo de Trabalho Recomendado

### Para Novos Cadastros
1. ✅ **Receber:** Status "Pendente" automaticamente
2. 📧 **Contatar:** Enviar email inicial → Mudar status para "Contatado"
3. 💬 **Avaliar:** Conversar e validar credenciais do médium
4. ✓ **Aprovar ou Rejeitar:** Atualizar status final

### Dicas de Uso
- Use os filtros para organizar o trabalho por prioridade
- Exporte dados regularmente para backup
- Revise cadastros pendentes semanalmente
- Mantenha as mensagens dos médiuns para referência futura

---

## 🛠️ Troubleshooting

### Não consigo ativar o painel
- **Solução:** Certifique-se de clicar rapidamente no logo (menos de 2 segundos entre cliques)
- Clique exatamente no logo "Mystik" no header

### Login não aceita as credenciais
- **Solução:** Verifique se está usando exatamente:
  - Email: `mcdflavia1@gmail.com`
  - Senha: `Panda@1550`
- As credenciais são case-sensitive

### Dados não aparecem
- **Solução:** 
  1. Clique em "Atualizar"
  2. Verifique se há filtros ativos
  3. Verifique sua conexão com a internet

### Erro ao atualizar status
- **Solução:** Verifique sua conexão e tente novamente
- O erro será mostrado em uma notificação vermelha

---

## 🔒 Segurança

### Boas Práticas
- ✅ Nunca compartilhe as credenciais de login
- ✅ Sempre faça logout ao terminar (botão "Sair")
- ✅ Não deixe o painel aberto em computadores compartilhados
- ✅ Exporte backups regulares dos dados

### Proteção dos Dados
- Todos os dados são armazenados no Supabase KV Store
- Comunicação criptografada (HTTPS)
- Acesso restrito por autenticação
- Logs de todas as ações administrativas

---

## 📞 Suporte

Para dúvidas ou problemas técnicos:
- **Email:** hello@mystikapp.com

---

## 🔄 Atualizações do Sistema

**Versão Atual:** 1.0.0  
**Última Atualização:** 2025

### Funcionalidades Implementadas
- ✅ Sistema de login seguro
- ✅ Acesso secreto por cliques no logo
- ✅ Dashboard com estatísticas
- ✅ Busca e filtros avançados
- ✅ Gerenciamento completo de cadastros
- ✅ Atualização de status
- ✅ Exclusão de cadastros
- ✅ Exportação para CSV
- ✅ Interface responsiva

---

**Desenvolvido para Mystik** 🔮✨
