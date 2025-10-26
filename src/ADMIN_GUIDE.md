# Guia de Administração - Cadastros de Guias Espirituais

## Visão Geral

Os cadastros de guias espirituais são salvos automaticamente no Supabase KV Store quando um guia espiritual preenche o formulário na landing page.

## Estrutura de Dados

Cada cadastro contém os seguintes campos:

```json
{
  "id": "medium_1234567890_abc123xyz",
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@exemplo.com",
  "country": "BR",
  "phone": "(11) 99999-9999",
  "specialty": "tarot",
  "experience": "professional",
  "message": "Mensagem opcional do guia espiritual...",
  "registeredAt": "2025-10-17T12:34:56.789Z",
  "status": "pending"
}
```

### Campos:
- **id**: ID único gerado automaticamente
- **firstName**: Nome do guia espiritual
- **lastName**: Sobrenome do guia espiritual
- **email**: E-mail de contato
- **country**: Código do país (BR, US, ES, etc.)
- **phone**: Telefone sem o código do país (que já está associado ao country)
- **specialty**: Especialidade (tarot, lenormand, runes, buzios, iching, angels, astrology, numerology, spiritualChanneling, other)
- **experience**: Nível de experiência (beginner, intermediate, advanced, professional)
- **message**: Mensagem opcional
- **registeredAt**: Data/hora do cadastro (ISO 8601)
- **status**: Status do cadastro (pending, contacted, approved, rejected)

## Acessando os Dados

### Via API (recomendado)

Você pode acessar os dados através dos seguintes endpoints:

#### 1. Listar todos os cadastros

```bash
GET https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations
Authorization: Bearer YOUR_ANON_KEY
```

Resposta:
```json
{
  "success": true,
  "count": 5,
  "registrations": [
    {
      "key": "medium_1234567890_abc123xyz",
      "value": { ... }
    }
  ]
}
```

#### 2. Buscar um cadastro específico

```bash
GET https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b85eb51c/medium-registration/{ID}
Authorization: Bearer YOUR_ANON_KEY
```

Resposta:
```json
{
  "success": true,
  "registration": { ... }
}
```

### Via cURL (exemplo)

```bash
# Listar todos os cadastros
curl -X GET \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'

# Buscar cadastro específico
curl -X GET \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b85eb51c/medium-registration/medium_1234567890_abc123xyz' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'
```

### Via JavaScript/TypeScript

```typescript
import { projectId, publicAnonKey } from './utils/supabase/info';

// Listar todos os cadastros
async function getAllMediumRegistrations() {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    }
  );
  
  const data = await response.json();
  console.log('Total de cadastros:', data.count);
  console.log('Cadastros:', data.registrations);
  return data;
}

// Buscar cadastro específico
async function getMediumRegistration(id: string) {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registration/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    }
  );
  
  const data = await response.json();
  console.log('Cadastro:', data.registration);
  return data;
}
```

## Índice de Busca

Para facilitar a busca, cada cadastro também cria um índice por e-mail:
- Chave: `medium_email_{email_lowercase}`
- Valor: ID do cadastro

Isso permite encontrar rapidamente um guia espiritual pelo e-mail.

## Códigos de País Disponíveis

- BR - Brasil (+55)
- US - Estados Unidos (+1)
- GB - Reino Unido (+44)
- CA - Canadá (+1)
- MX - México (+52)
- AR - Argentina (+54)
- CL - Chile (+56)
- CO - Colômbia (+57)
- PE - Peru (+51)
- UY - Uruguai (+598)
- PY - Paraguai (+595)
- BO - Bolívia (+591)
- EC - Equador (+593)
- VE - Venezuela (+58)
- ES - Espanha (+34)
- PT - Portugal (+351)
- FR - França (+33)
- DE - Alemanha (+49)
- IT - Itália (+39)
- AU - Austrália (+61)
- NZ - Nova Zelândia (+64)
- JP - Japão (+81)
- CN - China (+86)
- IN - Índia (+91)
- ZA - África do Sul (+27)
- OTHER - Outro (+)

## Contato Completo

Para obter o telefone completo do médium, combine o código do país com o telefone:

```typescript
// Exemplo
const countries = {
  'BR': '+55',
  'US': '+1',
  // ... outros países
};

const fullPhone = `${countries[registration.country]} ${registration.phone}`;
// Resultado: "+55 (11) 99999-9999"
```

## Segurança

- Todos os endpoints requerem autenticação via Bearer token (ANON_KEY)
- Os dados são armazenados de forma segura no Supabase KV Store
- Somente administradores devem ter acesso aos endpoints de listagem

## Próximos Passos

1. Criar painel administrativo para visualizar e gerenciar cadastros
2. Implementar sistema de notificações para novos cadastros
3. Adicionar filtros e busca avançada
4. Implementar sistema de mudança de status (pending → contacted → approved/rejected)
