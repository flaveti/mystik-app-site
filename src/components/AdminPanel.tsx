import { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Loader2, RefreshCw, Mail, Phone, Globe, Briefcase, User, 
  Download, Search, Filter, X, ChevronDown, LogOut, Trash2,
  Calendar, TrendingUp, Users, CheckCircle, Clock, XCircle, Database
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface MediumRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  specialty: string;
  experience: string;
  message?: string;
  registeredAt: string;
  status: string;
}

interface AdminPanelProps {
  onLogout: () => void;
  onDebug?: () => void;
}

export function AdminPanel({ onLogout, onDebug }: AdminPanelProps) {
  const [registrations, setRegistrations] = useState<MediumRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [selectedReg, setSelectedReg] = useState<MediumRegistration | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [regToDelete, setRegToDelete] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setError('Timeout: O servidor demorou muito para responder. Verifique sua conexão ou tente novamente.');
      setLoading(false);
    }, 15000); // 15 seconds timeout
    
    try {
      console.log('Fetching registrations from:', `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations`);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Response error:', errorData);
        throw new Error(errorData.error || 'Erro ao buscar cadastros');
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        // Extract values from the key-value pairs
        const regs = data.registrations.map((reg: any) => reg.value);
        setRegistrations(regs);
        toast.success(`${regs.length} cadastro${regs.length !== 1 ? 's' : ''} carregado${regs.length !== 1 ? 's' : ''}`);
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar dados';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching registrations:', err);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar status');
      }

      setRegistrations(prev => 
        prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg)
      );
      
      toast.success('Status atualizado com sucesso');
    } catch (err) {
      toast.error('Erro ao atualizar status');
      console.error('Error updating status:', err);
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao deletar cadastro');
      }

      setRegistrations(prev => prev.filter(reg => reg.id !== id));
      toast.success('Cadastro deletado com sucesso');
    } catch (err) {
      toast.error('Erro ao deletar cadastro');
      console.error('Error deleting registration:', err);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'ID', 'Nome', 'Sobrenome', 'Email', 'País', 'Telefone', 
      'Especialidade', 'Experiência', 'Status', 'Data de Cadastro', 'Mensagem'
    ];
    
    const rows = filteredAndSortedRegistrations.map(reg => [
      reg.id,
      reg.firstName,
      reg.lastName,
      reg.email,
      reg.country,
      reg.phone,
      getSpecialtyName(reg.specialty),
      getExperienceName(reg.experience),
      getStatusName(reg.status),
      formatDate(reg.registeredAt),
      reg.message || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mystik-mediums-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV exportado com sucesso');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCountryName = (code: string) => {
    const countries: Record<string, string> = {
      'BR': '🇧🇷 Brasil', 'US': '🇺🇸 EUA', 'ES': '🇪🇸 Espanha', 'PT': '🇵🇹 Portugal',
      'AR': '🇦🇷 Argentina', 'MX': '🇲🇽 México', 'CL': '🇨🇱 Chile', 'CO': '🇨🇴 Colômbia',
      'PE': '🇵🇪 Peru', 'VE': '🇻🇪 Venezuela', 'UY': '🇺🇾 Uruguai', 'PY': '🇵🇾 Paraguai',
      'BO': '🇧🇴 Bolívia', 'EC': '🇪🇨 Equador', 'CR': '🇨🇷 Costa Rica', 'PA': '🇵🇦 Panamá',
      'GT': '🇬🇹 Guatemala', 'HN': '🇭🇳 Honduras', 'SV': '🇸🇻 El Salvador', 'NI': '🇳🇮 Nicarágua',
      'CU': '🇨🇺 Cuba', 'DO': '🇩🇴 Rep. Dominicana', 'CA': '🇨🇦 Canadá', 'GB': '🇬🇧 Reino Unido',
      'FR': '🇫🇷 França', 'IT': '🇮🇹 Itália',
    };
    return countries[code] || code;
  };

  const getSpecialtyName = (specialty: string) => {
    const specialties: Record<string, string> = {
      'tarot': 'Tarô', 'lenormand': 'Lenormand', 'runes': 'Runas', 'buzios': 'Búzios',
      'iching': 'I-Ching', 'angels': 'Cartas dos Anjos', 'astrology': 'Astrologia',
      'numerology': 'Numerologia', 'mediumship': 'Mediunidade', 'other': 'Outra',
    };
    return specialties[specialty] || specialty;
  };

  const getExperienceName = (experience: string) => {
    const levels: Record<string, string> = {
      'beginner': 'Iniciante', 'intermediate': 'Intermediário',
      'advanced': 'Avançado', 'professional': 'Profissional',
    };
    return levels[experience] || experience;
  };

  const getStatusName = (status: string) => {
    const statuses: Record<string, string> = {
      'pending': 'Pendente', 'contacted': 'Contatado',
      'approved': 'Aprovado', 'rejected': 'Rejeitado',
    };
    return statuses[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'contacted': return <Mail className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'contacted': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'approved': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  // Filtros e busca
  const filteredAndSortedRegistrations = useMemo(() => {
    let filtered = [...registrations];

    // Busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.firstName.toLowerCase().includes(query) ||
        reg.lastName.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.phone.includes(query)
      );
    }

    // Filtros
    if (statusFilter !== 'all') {
      filtered = filtered.filter(reg => reg.status === statusFilter);
    }
    if (specialtyFilter !== 'all') {
      filtered = filtered.filter(reg => reg.specialty === specialtyFilter);
    }
    if (experienceFilter !== 'all') {
      filtered = filtered.filter(reg => reg.experience === experienceFilter);
    }
    if (countryFilter !== 'all') {
      filtered = filtered.filter(reg => reg.country === countryFilter);
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
      } else {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
    });

    return filtered;
  }, [registrations, searchQuery, statusFilter, specialtyFilter, experienceFilter, countryFilter, sortBy]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = registrations.length;
    const pending = registrations.filter(r => r.status === 'pending').length;
    const contacted = registrations.filter(r => r.status === 'contacted').length;
    const approved = registrations.filter(r => r.status === 'approved').length;
    const rejected = registrations.filter(r => r.status === 'rejected').length;
    
    const thisMonth = registrations.filter(r => {
      const regDate = new Date(r.registeredAt);
      const now = new Date();
      return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
    }).length;

    const uniqueCountries = new Set(registrations.map(r => r.country)).size;

    return { total, pending, contacted, approved, rejected, thisMonth, uniqueCountries };
  }, [registrations]);

  const uniqueCountries = useMemo(() => 
    Array.from(new Set(registrations.map(r => r.country))).sort(),
    [registrations]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerenciamento de Cadastros - Mystik
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchRegistrations} disabled={loading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button onClick={exportToCSV} variant="outline" disabled={registrations.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button onClick={onLogout} variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total de Cadastros</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.uniqueCountries} países diferentes
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando contato
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Aprovados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.approved}</div>
              <p className="text-xs text-muted-foreground">
                Médiuns confirmados
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Este Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                Novos cadastros
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Busca */}
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nome, email ou telefone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtros em Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="contacted">Contatado</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="tarot">Tarô</SelectItem>
                    <SelectItem value="lenormand">Lenormand</SelectItem>
                    <SelectItem value="runes">Runas</SelectItem>
                    <SelectItem value="buzios">Búzios</SelectItem>
                    <SelectItem value="iching">I-Ching</SelectItem>
                    <SelectItem value="angels">Cartas dos Anjos</SelectItem>
                    <SelectItem value="astrology">Astrologia</SelectItem>
                    <SelectItem value="numerology">Numerologia</SelectItem>
                    <SelectItem value="mediumship">Mediunidade</SelectItem>
                    <SelectItem value="other">Outra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Experiência</Label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                    <SelectItem value="professional">Profissional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>País</Label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {uniqueCountries.map(country => (
                      <SelectItem key={country} value={country}>
                        {getCountryName(country)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ordenar por</Label>
                <Select value={sortBy} onValueChange={(value: 'date' | 'name') => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Data</SelectItem>
                    <SelectItem value="name">Nome</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Limpar Filtros */}
            {(searchQuery || statusFilter !== 'all' || specialtyFilter !== 'all' || 
              experienceFilter !== 'all' || countryFilter !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setSpecialtyFilter('all');
                  setExperienceFilter('all');
                  setCountryFilter('all');
                }}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar todos os filtros
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Loading */}
        {loading && (
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="py-20">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-purple-900">Carregando cadastros...</p>
                  <p className="text-sm text-purple-700">Conectando ao servidor Supabase</p>
                  <div className="mt-4 text-xs text-purple-600 space-y-1">
                    <p>🌐 {projectId}.supabase.co</p>
                    <p>Se demorar mais de 15 segundos, verifique sua conexão</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-red-600 font-semibold mb-2">Erro ao carregar dados</p>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
              
              <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                <p className="text-red-900 font-semibold mb-2">Informações de Debug:</p>
                <div className="space-y-1 text-xs text-red-800">
                  <p><strong>URL:</strong> https://{projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-registrations</p>
                  <p><strong>Project ID:</strong> {projectId}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={fetchRegistrations} variant="outline" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </Button>
                {onDebug && (
                  <Button onClick={onDebug} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Database className="h-4 w-4 mr-2" />
                    Abrir Debug Console
                  </Button>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-900 font-semibold mb-2">💡 Passos para Resolver:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                  <li>Abra o Console do navegador (F12)</li>
                  <li>Veja se há erros detalhados na aba Console</li>
                  <li>Clique em "Abrir Debug Console" para testar os endpoints</li>
                  <li>Verifique se o servidor está funcionando</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultados */}
        {!loading && !error && (
          <>
            <div className="mb-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {filteredAndSortedRegistrations.length} resultado{filteredAndSortedRegistrations.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedRegistrations.map((reg) => (
                <Card 
                  key={reg.id} 
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => setSelectedReg(reg)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <User className="h-5 w-5 text-purple-600 shrink-0" />
                        <CardTitle className="text-base">
                          {reg.firstName} {reg.lastName}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(reg.status)} flex items-center gap-1 shrink-0`}
                      >
                        {getStatusIcon(reg.status)}
                        <span className="hidden sm:inline">{getStatusName(reg.status)}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-xs flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(reg.registeredAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a 
                        href={`mailto:${reg.email}`} 
                        className="text-purple-600 hover:underline truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {reg.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{reg.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{getCountryName(reg.country)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{getSpecialtyName(reg.specialty)}</span>
                    </div>
                    
                    <div className="pt-2 border-t flex items-center justify-between">
                      <Badge variant="outline">
                        {getExperienceName(reg.experience)}
                      </Badge>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRegToDelete(reg.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedRegistrations.length === 0 && (
              <Card>
                <CardContent className="py-20 text-center">
                  <p className="text-muted-foreground">
                    Nenhum cadastro encontrado com os filtros aplicados.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Dialog de Detalhes */}
      <Dialog open={!!selectedReg} onOpenChange={(open) => !open && setSelectedReg(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedReg && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  {selectedReg.firstName} {selectedReg.lastName}
                </DialogTitle>
                <DialogDescription>
                  Cadastrado em {formatDate(selectedReg.registeredAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <Label>Status do Cadastro</Label>
                  <Select 
                    value={selectedReg.status} 
                    onValueChange={(value) => {
                      updateStatus(selectedReg.id, value);
                      setSelectedReg({ ...selectedReg, status: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="contacted">Contatado</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Informações */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-purple-600" />
                      <a href={`mailto:${selectedReg.email}`} className="text-purple-600 hover:underline">
                        {selectedReg.email}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Telefone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-600" />
                      <span>{selectedReg.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">País</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <span>{getCountryName(selectedReg.country)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Especialidade</Label>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                      <span>{getSpecialtyName(selectedReg.specialty)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Experiência</Label>
                    <Badge variant="outline">
                      {getExperienceName(selectedReg.experience)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">ID</Label>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedReg.id}</code>
                  </div>
                </div>

                {/* Mensagem */}
                {selectedReg.message && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Mensagem</Label>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedReg.message}</p>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setRegToDelete(selectedReg.id);
                      setDeleteDialogOpen(true);
                      setSelectedReg(null);
                    }}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Deletar Cadastro
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este cadastro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (regToDelete) {
                  deleteRegistration(regToDelete);
                  setRegToDelete(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}