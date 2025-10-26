import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Database, RefreshCw } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const projectId = SUPABASE_URL?.split('//')[1]?.split('.')[0] || '';
const publicAnonKey = SUPABASE_ANON_KEY || '';

interface AdminDebugProps {
  onBack?: () => void;
}

export function AdminDebug({ onBack }: AdminDebugProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/health`;
      console.log('Testing health:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setResult({ test: 'health', status: response.status, data, url });
    } catch (err) {
      console.error('Health test error:', err);
      setResult({ test: 'health', error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const testRegistrations = async () => {
    setLoading(true);
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations`;
      console.log('Testing registrations:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      console.log('Registrations response:', data);
      setResult({ test: 'registrations', status: response.status, data, url });
    } catch (err) {
      console.error('Registrations test error:', err);
      setResult({ test: 'registrations', error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const createTestRegistration = async () => {
    setLoading(true);
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-signup`;
      console.log('Creating test registration:', url);
      
      const testData = {
        firstName: 'Maria',
        lastName: 'Silva',
        email: `test${Date.now()}@example.com`,
        country: 'BR',
        phone: '11999999999',
        specialty: 'tarot',
        experience: 'professional',
        message: 'Este é um cadastro de teste criado pelo painel de debug.'
      };
      
      console.log('Test data:', testData);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      const data = await response.json();
      console.log('Create response:', data);
      setResult({ test: 'create', status: response.status, data, url, requestData: testData });
    } catch (err) {
      console.error('Create test error:', err);
      setResult({ test: 'create', error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-purple-600" />
              <CardTitle>Debug do Painel Admin</CardTitle>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold mb-3 text-purple-900">Informações do Projeto</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-purple-700">Project ID:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded">{projectId}</code>
              </div>
              <div>
                <span className="font-medium text-purple-700">Base URL:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-xs break-all">
                  https://{projectId}.supabase.co/functions/v1/make-server-b85eb51c
                </code>
              </div>
              <div>
                <span className="font-medium text-purple-700">Anon Key:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-xs">
                  {publicAnonKey.substring(0, 30)}...
                </code>
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold">Testes de API</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <Button 
                onClick={testHealth} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                1. Test Health
              </Button>
              <Button 
                onClick={createTestRegistration} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                2. Criar Cadastro Teste
              </Button>
              <Button 
                onClick={testRegistrations} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                3. Buscar Cadastros
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Execute os testes na ordem: 1 → 2 → 3
            </p>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Resultado</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setResult(null)}
                >
                  Limpar
                </Button>
              </div>
              
              {/* Status Badge */}
              {result.status && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status HTTP:</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    result.status >= 200 && result.status < 300 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {result.status}
                  </span>
                </div>
              )}

              {/* URL */}
              {result.url && (
                <div className="text-xs">
                  <span className="font-medium">URL:</span>
                  <code className="ml-2 bg-muted px-2 py-1 rounded break-all">
                    {result.url}
                  </code>
                </div>
              )}

              {/* Response Data */}
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-auto">
                <pre className="text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

              {/* Success Message */}
              {result.data?.success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">✓ Sucesso!</p>
                  {result.test === 'create' && (
                    <p className="text-sm text-green-700 mt-1">
                      Cadastro criado com ID: {result.data.registrationId}
                    </p>
                  )}
                  {result.test === 'registrations' && (
                    <p className="text-sm text-green-700 mt-1">
                      {result.data.count} cadastro(s) encontrado(s)
                    </p>
                  )}
                </div>
              )}

              {/* Error Message */}
              {(result.error || result.data?.error) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">✗ Erro</p>
                  <p className="text-sm text-red-700 mt-1">
                    {result.error || result.data?.error}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          {!result && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Instruções</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Clique em "Test Health" para verificar se o servidor está funcionando</li>
                <li>Clique em "Criar Cadastro Teste" para adicionar dados de exemplo</li>
                <li>Clique em "Buscar Cadastros" para ver todos os cadastros salvos</li>
                <li>Verifique os resultados abaixo de cada teste</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDebug;
