import { C, STATUS_MAP, fmt, fmtDate } from '../constants';
import { Card, SectionTitle, TH, TD } from './UI';

export default function Dashboard({ pecas, trans }) {
  const disp  = pecas.filter((p) => p.status === 'Disponível').length;
  const alug  = pecas.filter((p) => p.status === 'Alugado').length;
  const ajust = pecas.filter((p) => p.status === 'Em Ajuste').length;
  const fat   = trans.reduce((s, t) => s + t.valor, 0);

  const metrics = [
    { label: 'Total de Peças',    val: pecas.length,      color: '#8B8FA8' },
    { label: 'Disponíveis',       val: disp,              color: '#4ADE80' },
    { label: 'Alugadas',          val: alug,              color: '#FBB040' },
    { label: 'Em Ajuste',         val: ajust,             color: '#60A5FA' },
    { label: 'Faturamento Total', val: `R$ ${fmt(fat)}`,  color: C.goldText, sm: true },
  ];

  const recent = [...trans].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 22 }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: C.card,
              borderTop: `2px solid ${m.color}`,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: '16px 14px',
            }}
          >
            <p style={{ fontSize: 10, color: C.textSub, margin: '0 0 10px', fontWeight: 700, letterSpacing: '0.08em' }}>
              {m.label.toUpperCase()}
            </p>
            <p style={{ fontSize: m.sm ? 17 : 30, fontWeight: 700, margin: 0, color: m.color }}>
              {m.val}
            </p>
          </div>
        ))}
      </div>

      <Card>
        <SectionTitle>ÚLTIMAS TRANSAÇÕES</SectionTitle>
        {recent.length === 0 ? (
          <p style={{ color: C.textSub, fontSize: 13 }}>Nenhuma transação registrada.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <TH>Peça</TH><TH>Cliente</TH><TH>Tipo</TH><TH>Valor</TH><TH>Data</TH>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => {
                const peca = pecas.find((p) => p.id === t.pid);
                return (
                  <tr key={t.id}>
                    <TD><span style={{ color: C.text, fontWeight: 500 }}>{peca?.nome || '—'}</span></TD>
                    <TD><span style={{ color: C.textSub }}>{t.cliente}</span></TD>
                    <TD>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 20,
                        background: t.tipo === 'aluguel' ? '#1A1505' : '#051510',
                        color:      t.tipo === 'aluguel' ? '#FBB040' : '#4ADE80',
                        border: `1px solid ${t.tipo === 'aluguel' ? '#FBB04025' : '#4ADE8025'}`,
                      }}>
                        {t.tipo === 'aluguel' ? 'Aluguel' : 'Venda'}
                      </span>
                    </TD>
                    <TD><span style={{ color: C.goldText, fontWeight: 500 }}>R$ {fmt(t.valor)}</span></TD>
                    <TD><span style={{ color: C.textSub, fontSize: 12 }}>{fmtDate(t.data)}</span></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
