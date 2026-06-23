export const C = {
  bg:        '#0B0B0F',
  sidebar:   '#0F0F15',
  card:      '#16161C',
  border:    '#23232E',
  gold:      '#C9A84C',
  goldDim:   '#4A3D1E',
  goldText:  '#E8D49A',
  text:      '#EDE9E0',
  textSub:   '#706C7A',
  textMuted: '#3A3840',
};

export const STATUS_MAP = {
  'Disponível': { color: '#4ADE80', bg: '#052015', border: '#4ADE8025' },
  'Alugado':    { color: '#FBB040', bg: '#201305', border: '#FBB04025' },
  'Em Ajuste':  { color: '#60A5FA', bg: '#051525', border: '#60A5FA25' },
  'Vendido':    { color: '#8B8FA8', bg: '#151720', border: '#8B8FA825' },
};

export const AJUSTE_MAP = {
  'Pendente':     { color: '#8B8FA8', bg: '#151720', border: '#8B8FA825' },
  'Em andamento': { color: '#60A5FA', bg: '#051525', border: '#60A5FA25' },
  'Concluído':    { color: '#4ADE80', bg: '#052015', border: '#4ADE8025' },
};

export const stockInfo = (qtd) => {
  if (qtd === 0) return { color: '#EF4444', bg: '#2D0A0A', border: '#EF444425', label: 'Esgotado',   icon: '●' };
  if (qtd <= 2)  return { color: '#FBB040', bg: '#201305', border: '#FBB04025', label: 'Baixo',      icon: '●' };
                 return { color: '#4ADE80', bg: '#052015', border: '#4ADE8025', label: 'Normal',     icon: '●' };
};

const UNS = 'https://images.unsplash.com/photo';

export const PECAS_INIT = [
  { id: 1, nome: 'Terno Oxford Slim',      tam: 'M',  cor: 'Azul Marinho', aluguel: 180, venda: 850,  status: 'Disponível', qtd: 4, foto: `${UNS}-1507679799987-c73779587ccf?w=480&h=640&fit=crop&q=80` },
  { id: 2, nome: 'Smoking Black Tie',       tam: 'G',  cor: 'Preto',        aluguel: 280, venda: 1200, status: 'Alugado',    qtd: 2, foto: `${UNS}-1598808503746-f34cfaefab78?w=480&h=640&fit=crop&q=80` },
  { id: 3, nome: 'Terno Casamento Marfim',  tam: 'PP', cor: 'Off-White',    aluguel: 220, venda: 1100, status: 'Disponível', qtd: 5, foto: `${UNS}-1583864697784-a0efc8379f70?w=480&h=640&fit=crop&q=80` },
  { id: 4, nome: 'Terno Cinza Oxford',      tam: 'M',  cor: 'Cinza Claro',  aluguel: 160, venda: 780,  status: 'Em Ajuste',  qtd: 1, foto: `${UNS}-1617127365659-c47fa864d8bc?w=480&h=640&fit=crop&q=80` },
  { id: 5, nome: 'Conjunto Padrinho Royal', tam: 'G',  cor: 'Azul Royal',   aluguel: 150, venda: 680,  status: 'Vendido',    qtd: 0, foto: `${UNS}-1626497764746-6dc36546b388?w=480&h=640&fit=crop&q=80` },
  { id: 6, nome: 'Terno Palazzo Classic',   tam: 'M',  cor: 'Preto',        aluguel: 200, venda: 950,  status: 'Disponível', qtd: 3, foto: `${UNS}-1593030761757-71fae45fa0e7?w=480&h=640&fit=crop&q=80` },
];

export const TRANS_INIT = [
  { id: 1, pid: 2, tipo: 'aluguel', cliente: 'Carlos Eduardo Mello', tel: '(11) 98765-4321', retirada: '2026-06-14', dev: '2026-06-22', valor: 280, data: '2026-06-13', devolvido: false },
  { id: 2, pid: 5, tipo: 'venda',   cliente: 'João Paulo Ferreira',  tel: '(11) 91234-5678', retirada: null,         dev: null,         valor: 680, data: '2026-06-10', devolvido: null  },
  { id: 3, pid: 1, tipo: 'aluguel', cliente: 'Rafael Augusto Lima',  tel: '(11) 99876-5432', retirada: '2026-06-01', dev: '2026-06-08', valor: 180, data: '2026-05-30', devolvido: true  },
];

export const AJUSTES_INIT = [
  { id: 1, pid: 4, desc: 'Ajuste na cintura e bainha das calças', entrega: '2026-06-28', status: 'Em andamento' },
];

export const fmt     = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
export const fmtDate = (d) => d ? new Date(d + 'T12:00:00').toLocaleDateString('pt-BR') : '—';
