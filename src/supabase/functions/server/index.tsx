import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b85eb51c/health", (c) => {
  return c.json({ status: "ok" });
});

// Spiritual Guide Registration Endpoint
app.post('/make-server-b85eb51c/medium-signup', async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    const { firstName, lastName, email, country, phone, specialty, experience, message } = body;
    
    if (!firstName || !lastName || !email || !country || !phone || !specialty || !experience) {
      return c.json({ 
        success: false, 
        error: 'Campos obrigatórios faltando: firstName, lastName, email, country, phone, specialty, experience' 
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ 
        success: false, 
        error: 'Formato de e-mail inválido' 
      }, 400);
    }

    // Validate phone format (only numbers, +, spaces, parentheses, hyphens)
    const phoneRegex = /^[\d\s+()-]+$/;
    if (!phoneRegex.test(phone)) {
      return c.json({ 
        success: false, 
        error: 'Formato de telefone inválido. Use apenas números, +, espaços, parênteses ou hífens.' 
      }, 400);
    }

    // Validate country code
    if (country.length !== 2 && country !== 'OTHER') {
      return c.json({ 
        success: false, 
        error: 'Código de país inválido' 
      }, 400);
    }

    // Create unique ID for this registration
    const timestamp = Date.now();
    const registrationId = `medium_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare data to store
    const spiritualGuideData = {
      id: registrationId,
      firstName,
      lastName,
      email,
      country,
      phone,
      specialty,
      experience,
      message: message || '',
      registeredAt: new Date().toISOString(),
      status: 'pending' // pending, contacted, approved, rejected
    };

    // Store in KV store
    await kv.set(registrationId, spiritualGuideData);

    // Also create an index by email for easy lookup
    await kv.set(`medium_email_${email.toLowerCase()}`, registrationId);

    console.log(`New spiritual guide registration: ${registrationId} - ${firstName} ${lastName} (${email}) from ${country}`);

    return c.json({ 
      success: true, 
      message: 'Cadastro realizado com sucesso!',
      registrationId 
    });

  } catch (error) {
    console.error('Error in spiritual guide signup:', error);
    return c.json({ 
      success: false, 
      error: 'Erro ao processar cadastro. Tente novamente.' 
    }, 500);
  }
});

// Get all spiritual guide registrations (for admin purposes)
app.get('/make-server-b85eb51c/medium-registrations', async (c) => {
  try {
    // Get all entries from KV store with the medium_ prefix
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials');
    }

    // Direct query to get all medium registrations
    const { createClient } = await import('jsr:@supabase/supabase-js@2.49.8');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabase
      .from('kv_store_b85eb51c')
      .select('key, value')
      .like('key', 'medium_%');

    if (error) {
      console.error('Supabase query error:', error);
      throw new Error(error.message);
    }

    // Filter out email index entries
    const spiritualGuideRegistrations = (data || [])
      .filter((item: any) => !item.key.startsWith('medium_email_'))
      .map((item: any) => ({
        key: item.key,
        value: item.value
      }));

    console.log(`Found ${spiritualGuideRegistrations.length} spiritual guide registrations`);

    return c.json({ 
      success: true, 
      count: spiritualGuideRegistrations.length,
      registrations: spiritualGuideRegistrations 
    });

  } catch (error) {
    console.error('Error fetching spiritual guide registrations:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao buscar cadastros' 
    }, 500);
  }
});

// Get spiritual guide registration by ID
app.get('/make-server-b85eb51c/medium-registration/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const registration = await kv.get(id);

    if (!registration) {
      return c.json({ 
        success: false, 
        error: 'Cadastro não encontrado' 
      }, 404);
    }

    return c.json({ 
      success: true, 
      registration 
    });

  } catch (error) {
    console.error('Error fetching spiritual guide registration:', error);
    return c.json({ 
      success: false, 
      error: 'Erro ao buscar cadastro' 
    }, 500);
  }
});

// Update spiritual guide registration status
app.patch('/make-server-b85eb51c/medium-registrations/:id/status', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'contacted', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return c.json({ 
        success: false, 
        error: 'Status inválido. Use: pending, contacted, approved ou rejected' 
      }, 400);
    }

    // Get existing registration
    const registration = await kv.get(id);
    if (!registration) {
      return c.json({ 
        success: false, 
        error: 'Cadastro não encontrado' 
      }, 404);
    }

    // Update status
    const updatedRegistration = {
      ...registration,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(id, updatedRegistration);

    console.log(`Updated registration status: ${id} -> ${status}`);

    return c.json({ 
      success: true, 
      message: 'Status atualizado com sucesso',
      registration: updatedRegistration 
    });

  } catch (error) {
    console.error('Error updating registration status:', error);
    return c.json({ 
      success: false, 
      error: 'Erro ao atualizar status' 
    }, 500);
  }
});

// Delete spiritual guide registration
app.delete('/make-server-b85eb51c/medium-registrations/:id', async (c) => {
  try {
    const id = c.req.param('id');

    // Get existing registration to retrieve email for cleanup
    const registration = await kv.get(id);
    if (!registration) {
      return c.json({ 
        success: false, 
        error: 'Cadastro não encontrado' 
      }, 404);
    }

    // Delete main registration
    await kv.del(id);

    // Delete email index if exists
    if (registration.email) {
      await kv.del(`medium_email_${registration.email.toLowerCase()}`);
    }

    console.log(`Deleted registration: ${id} - ${registration.firstName} ${registration.lastName}`);

    return c.json({ 
      success: true, 
      message: 'Cadastro deletado com sucesso' 
    });

  } catch (error) {
    console.error('Error deleting registration:', error);
    return c.json({ 
      success: false, 
      error: 'Erro ao deletar cadastro' 
    }, 500);
  }
});

Deno.serve(app.fetch);