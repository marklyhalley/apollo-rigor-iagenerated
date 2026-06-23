import { useState } from 'react';
import { C, PECAS_INIT, TRANS_INIT, AJUSTES_INIT } from './constants';
import Dashboard from './components/Dashboard';
import Estoque   from './components/Estoque';
import Vendas    from './components/Vendas';
import Ajustes   from './components/Ajustes';

const NAV = [
  { key: 'dashboard', label: 'Dashboard'         },
  { key: 'estoque',   label: 'Estoque'            },
  { key: 'vendas',    label: 'Vendas e Aluguéis'  },
  { key: 'ajustes',   label: 'Ajustes de Costura' },
];

export default function App() {
  const [page,    setPage]    = useState('dashboard');
  const [pecas,   setPecas]   = useState(PECAS_INIT);
  const [trans,   setTrans]   = useState(TRANS_INIT);
  const [ajustes, setAjustes] = useState(AJUSTES_INIT);

  const title = NAV.find((n) => n.key === page)?.label || '';
  const disp  = pecas.filter((p) => p.status === 'Disponível').length;
  const alug  = pecas.filter((p) => p.status === 'Alugado').length;

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, color: C.text }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, flexShrink: 0, background: C.sidebar,
        borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '24px 20px 18px', borderBottom: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: C.gold, margin: 0, letterSpacing: '0.1em' }}>
            APOLLO RIGOR
          </p>
          <p style={{ fontSize: 9, color: C.textSub, margin: '4px 0 0', letterSpacing: '0.2em' }}>
            SISTEMA DE GESTÃO
          </p>
        </div>

        <nav style={{ padding: '14px 10px', flex: 1 }}>
          {NAV.map(({ key, label }) => {
            const active = page === key;
            return (
              <button
                key={key}
                onClick={() => setPage(key)}
                style={{
                  display: 'flex', alignItems: 'center', width: '100%',
                  padding: '9px 12px', borderRadius: 7, cursor: 'pointer',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  marginBottom: 3, textAlign: 'left',
                  background: active ? C.goldDim : 'transparent',
                  color: active ? C.gold : C.textSub,
                  border: 'none',
                  borderLeft: active ? `2px solid ${C.gold}` : '2px solid transparent',
                  fontFamily: 'inherit',
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '14px 18px', borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 10, color: C.textMuted, margin: 0 }}>Gerado por IA · 2026</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{
          padding: '15px 28px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
        }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '0.04em' }}>
            {title}
          </p>
          <div style={{ display: 'flex', gap: 20, fontSize: 11, color: C.textSub }}>
            <span><span style={{ color: '#4ADE80', fontWeight: 600 }}>{disp}</span> disponíveis</span>
            <span><span style={{ color: '#FBB040', fontWeight: 600 }}>{alug}</span> alugadas</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '22px 28px', overflowY: 'auto' }}>
          {page === 'dashboard' && <Dashboard pecas={pecas} trans={trans} />}
          {page === 'estoque'   && <Estoque   pecas={pecas} setPecas={setPecas} />}
          {page === 'vendas'    && (
            <Vendas
              pecas={pecas} setPecas={setPecas}
              trans={trans} setTrans={setTrans}
              setAjustes={setAjustes}
            />
          )}
          {page === 'ajustes'   && (
            <Ajustes
              pecas={pecas} setPecas={setPecas}
              ajustes={ajustes} setAjustes={setAjustes}
            />
          )}
        </main>
      </div>
    </div>
  );
}
