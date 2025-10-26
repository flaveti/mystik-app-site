import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Users, Mail, Download, LogOut } from 'lucide-react';

interface MediumRegistration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  specialty: string;
  experience: string;
  message?: string;
  created_at: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [guides, setGuides] = useState<MediumRegistration[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: guidesData } = await supabase
        .from('spiritual_guides')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: waitlistData } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (guidesData) setGuides(guidesData);
      if (waitlistData) setWaitlist(waitlistData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportGuidesCSV = () => {
    const headers = ['Nome', 'Email', 'País', 'Telefone', 'Especialidade', 'Experiência', 'Data'];
    const rows = guides.map(g => [
      g.first_name + ' ' + g.last_name,
      g.email,
      g.country,
      g.phone,
      g.specialty,
      g.experience,
      new Date(g.created_at).toLocaleDateString('pt-BR')
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guias-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  };

  const exportWaitlistCSV = () => {
    const headers = ['Email', 'Data'];
    const rows = waitlist.map(w => [
      w.email,
      new Date(w.created_at).toLocaleDateString('pt-BR')
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waitlist-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Mystik - Gerenciamento de Cadastros</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Guias Espirituais</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guides.length}</div>
              <p className="text-xs text-muted-foreground">Total cadastrado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Lista de Espera</CardTitle>
              <Mail className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waitlist.length}</div>
              <p className="text-xs text-muted-foreground">Interessados</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Guias Espirituais</CardTitle>
            <Button onClick={exportGuidesCSV} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nome</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">País</th>
                    <th className="text-left p-2">Especialidade</th>
                    <th className="text-left p-2">Experiência</th>
                    <th className="text-left p-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide) => (
                    <tr key={guide.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{guide.first_name} {guide.last_name}</td>
                      <td className="p-2">{guide.email}</td>
                      <td className="p-2">{guide.country}</td>
                      <td className="p-2">{guide.specialty}</td>
                      <td className="p-2">{guide.experience}</td>
                      <td className="p-2">{new Date(guide.created_at).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lista de Espera</CardTitle>
            <Button onClick={exportWaitlistCSV} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Data de Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{entry.email}</td>
                      <td className="p-2">{new Date(entry.created_at).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;