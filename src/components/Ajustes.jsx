import { C, AJUSTE_MAP, fmtDate } from '../constants';
import { Badge, Card, BtnOut } from './UI';

export default function Ajustes({ pecas, setPecas, ajustes, setAjustes }) {
  const upd = (id, status) => {
    setAjustes((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    if (status === 'Concluído') {
      const a = ajustes.find((x) => x.id === id);
      if (a) setPecas((prev) => prev.map((p) => p.id === a.pid ? { ...p, status: 'Disponível' } : p));
    }
  };

  if (ajustes.length === 0) {
    return (
      <Card>
        <p style={{ color: C.textSub, fontSize: 13, margin: 0 }}>
          Nenhum ajuste registrado. Os ajustes são criados automaticamente ao registrar uma devolução que requer costura.
        </p>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {ajustes.map((a) => {
        const peca = pecas.find((p) => p.id === a.pid);
        const s = AJUSTE_MAP[a.status] || AJUSTE_MAP['Pendente'];
        return (
          <Card key={a.id} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, color: C.text, fontSize: 15, margin: '0 0 5px', fontFamily: 'Georgia, serif' }}>
                  {peca?.nome || '—'}
                </p>
                <p style={{ color: C.textSub, fontSize: 13, margin: '0 0 8px' }}>{a.desc}</p>
                <p style={{ color: C.textSub, fontSize: 12, margin: 0 }}>
                  Entrega prevista:{' '}
                  <span style={{ color: C.text }}>{fmtDate(a.entrega)}</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge label={a.status} map={AJUSTE_MAP} />
                <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'flex-end' }}>
                  {a.status === 'Pendente' && (
                    <BtnOut onClick={() => upd(a.id, 'Em andamento')} color="#60A5FA">Iniciar</BtnOut>
                  )}
                  {a.status !== 'Concluído' && (
                    <BtnOut onClick={() => upd(a.id, 'Concluído')} color="#4ADE80">Concluir</BtnOut>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
