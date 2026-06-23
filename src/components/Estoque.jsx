import { useState, useRef } from 'react';
import { C, STATUS_MAP, fmt, stockInfo } from '../constants';
import { Badge, Card, SectionTitle, TH, TD, Inp, Sel, BtnGold, BtnOut } from './UI';

let _pecaId = 7;

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='640' viewBox='0 0 480 640'%3E%3Crect width='480' height='640' fill='%2316161C'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia' font-size='16' fill='%23706C7A'%3ESem foto%3C/text%3E%3C/svg%3E";

// ── Stock bar component ─────────────────────────────────────────
function StockBar({ qtd }) {
  const info = stockInfo(qtd);
  const MAX  = 5;
  const fill = Math.min(qtd / MAX, 1);

  return (
    <div>
      {/* track */}
      <div style={{
        height: 3, background: C.border, borderRadius: 2, overflow: 'hidden', marginBottom: 5,
      }}>
        <div style={{
          height: '100%', width: `${fill * 100}%`,
          background: info.color, borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>
      {/* label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: info.color, fontWeight: 700 }}>
          {info.icon} {info.label.toUpperCase()}
        </span>
        <span style={{ fontSize: 10, color: C.textSub, fontWeight: 600 }}>
          {qtd} un.
        </span>
      </div>
    </div>
  );
}

// ── Stock badge (for table) ────────────────────────────────────
function StockBadge({ qtd }) {
  const info = stockInfo(qtd);
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
      background: info.bg, color: info.color, border: `1px solid ${info.border}`,
      whiteSpace: 'nowrap',
    }}>
      {qtd} un. · {info.label}
    </span>
  );
}

// ── Image upload ───────────────────────────────────────────────
function ImageUpload({ value, onChange }) {
  const fileRef = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {/* preview */}
      <div
        onClick={() => fileRef.current.click()}
        title="Clique para trocar a foto"
        style={{
          width: 90, height: 120, borderRadius: 8, overflow: 'hidden',
          border: `1px dashed ${value ? C.gold : C.border}`,
          cursor: 'pointer', position: 'relative', flexShrink: 0,
        }}
      >
        <img
          src={value || PLACEHOLDER}
          alt="preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          opacity: 0, transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        >
          <span style={{ fontSize: 18, color: '#fff' }}>📷</span>
          <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>Trocar</span>
        </div>
      </div>

      {/* buttons */}
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        style={{
          padding: '5px 10px', background: 'transparent', fontFamily: 'inherit',
          color: C.goldText, border: `1px solid ${C.goldDim}`,
          borderRadius: 6, fontSize: 11, cursor: 'pointer', width: '100%',
        }}
      >
        Escolher foto
      </button>
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            padding: '4px 10px', background: 'transparent', fontFamily: 'inherit',
            color: C.textSub, border: `1px solid ${C.border}`,
            borderRadius: 6, fontSize: 10, cursor: 'pointer', width: '100%',
          }}
        >
          Remover
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  );
}

// ── Card view ─────────────────────────────────────────────────
function CardView({ pecas, onEdit, onDelete }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
      gap: 14,
    }}>
      {pecas.map((p) => {
        const s    = STATUS_MAP[p.status];
        const info = stockInfo(p.qtd ?? 0);
        return (
          <div key={p.id} style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: 'hidden',
          }}>
            {/* photo */}
            <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
              <img
                src={p.foto || PLACEHOLDER}
                alt={p.nome}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.src = PLACEHOLDER; }}
              />
              {/* status badge */}
              <span style={{
                position: 'absolute', top: 10, right: 10,
                fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
              }}>
                {p.status}
              </span>
              {/* stock pill */}
              <span style={{
                position: 'absolute', top: 10, left: 10,
                fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                background: 'rgba(0,0,0,0.75)', color: info.color,
                backdropFilter: 'blur(4px)',
              }}>
                {p.qtd ?? 0} un.
              </span>
            </div>

            {/* body */}
            <div style={{ padding: '12px 14px 14px' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 2px', lineHeight: 1.3 }}>
                {p.nome}
              </p>
              <p style={{ fontSize: 11, color: C.textSub, margin: '0 0 10px' }}>
                {p.tam} · {p.cor}
              </p>

              {/* prices */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 9, color: C.textSub, margin: '0 0 2px', fontWeight: 700, letterSpacing: '0.06em' }}>ALUGUEL</p>
                  <p style={{ fontSize: 13, color: C.goldText, fontWeight: 600, margin: 0 }}>R$ {fmt(p.aluguel)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 9, color: C.textSub, margin: '0 0 2px', fontWeight: 700, letterSpacing: '0.06em' }}>VENDA</p>
                  <p style={{ fontSize: 13, color: C.goldText, fontWeight: 600, margin: 0 }}>R$ {fmt(p.venda)}</p>
                </div>
              </div>

              {/* stock bar */}
              <div style={{ marginBottom: 12 }}>
                <StockBar qtd={p.qtd ?? 0} />
              </div>

              {/* actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => onEdit(p)} style={{
                  flex: 1, padding: '6px 0', background: 'transparent', fontFamily: 'inherit',
                  color: C.textSub, border: `1px solid ${C.border}`,
                  borderRadius: 6, fontSize: 11, cursor: 'pointer',
                }}>
                  Editar
                </button>
                <button onClick={() => onDelete(p.id)} style={{
                  flex: 1, padding: '6px 0', background: 'transparent', fontFamily: 'inherit',
                  color: '#C0392B', border: '1px solid #C0392B44',
                  borderRadius: 6, fontSize: 11, cursor: 'pointer',
                }}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Table view ────────────────────────────────────────────────
function TableView({ pecas, onEdit, onDelete }) {
  return (
    <Card>
      {pecas.length === 0 ? (
        <p style={{ color: C.textSub, fontSize: 13 }}>Nenhuma peça encontrada.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <TH></TH><TH>Modelo</TH><TH>Tam.</TH><TH>Cor</TH>
              <TH>Aluguel</TH><TH>Venda</TH><TH>Estoque</TH><TH>Status</TH><TH></TH>
            </tr>
          </thead>
          <tbody>
            {pecas.map((p) => (
              <tr key={p.id}>
                <TD style={{ width: 44 }}>
                  <div style={{ width: 36, height: 48, borderRadius: 4, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                    <img
                      src={p.foto || PLACEHOLDER}
                      alt={p.nome}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.target.src = PLACEHOLDER; }}
                    />
                  </div>
                </TD>
                <TD><span style={{ color: C.text, fontWeight: 500 }}>{p.nome}</span></TD>
                <TD><span style={{ color: C.textSub }}>{p.tam}</span></TD>
                <TD><span style={{ color: C.textSub }}>{p.cor}</span></TD>
                <TD><span style={{ color: C.goldText }}>R$ {fmt(p.aluguel)}</span></TD>
                <TD><span style={{ color: C.goldText }}>R$ {fmt(p.venda)}</span></TD>
                <TD><StockBadge qtd={p.qtd ?? 0} /></TD>
                <TD><Badge label={p.status} map={STATUS_MAP} /></TD>
                <TD>
                  <span style={{ display: 'flex', gap: 6 }}>
                    <BtnOut onClick={() => onEdit(p)}>Editar</BtnOut>
                    <BtnOut onClick={() => onDelete(p.id)} color="#C0392B">Excluir</BtnOut>
                  </span>
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

// ── Main component ────────────────────────────────────────────
export default function Estoque({ pecas, setPecas }) {
  const [showForm, setShow]   = useState(false);
  const [editId,   setEditId] = useState(null);
  const [filtro,   setFiltro] = useState('Todos');
  const [view,     setView]   = useState('cards');

  const EMPTY = { nome: '', tam: '', cor: '', aluguel: '', venda: '', qtd: '', status: 'Disponível', foto: '' };
  const [f, setF] = useState(EMPTY);

  const openAdd = () => { setEditId(null); setF(EMPTY); setShow(true); };
  const openEdit = (p) => {
    setEditId(p.id);
    setF({
      nome: p.nome, tam: p.tam, cor: p.cor,
      aluguel: String(p.aluguel), venda: String(p.venda),
      qtd: String(p.qtd ?? 0), status: p.status, foto: p.foto || '',
    });
    setShow(true);
  };

  const save = () => {
    if (!f.nome || !f.tam) return;
    const data = {
      ...f,
      aluguel: Number(f.aluguel) || 0,
      venda:   Number(f.venda)   || 0,
      qtd:     Number(f.qtd)     || 0,
    };
    if (editId) {
      setPecas((prev) => prev.map((p) => p.id === editId ? { ...p, ...data } : p));
    } else {
      setPecas((prev) => [...prev, { id: _pecaId++, ...data }]);
    }
    setShow(false);
  };

  const del = (id) => {
    if (window.confirm('Excluir esta peça?')) setPecas((prev) => prev.filter((p) => p.id !== id));
  };

  const visible = filtro === 'Todos' ? pecas : pecas.filter((p) => p.status === filtro);

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Todos', 'Disponível', 'Alugado', 'Em Ajuste', 'Vendido'].map((s) => (
            <button key={s} onClick={() => setFiltro(s)} style={{
              padding: '5px 13px', borderRadius: 20, cursor: 'pointer',
              fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
              background: filtro === s ? C.gold : 'transparent',
              color: filtro === s ? '#0B0B0F' : C.textSub,
              border: filtro === s ? 'none' : `1px solid ${C.border}`,
            }}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, overflow: 'hidden' }}>
            {[{ key: 'cards', icon: '⊞' }, { key: 'table', icon: '≡' }].map(({ key, icon }) => (
              <button key={key} onClick={() => setView(key)} style={{
                padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: 14,
                background: view === key ? C.goldDim : 'transparent',
                color: view === key ? C.gold : C.textSub, fontFamily: 'inherit',
              }}>
                {icon}
              </button>
            ))}
          </div>
          <BtnGold onClick={openAdd}>+ Nova Peça</BtnGold>
        </div>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <Card style={{ marginBottom: 16, borderColor: C.goldDim }}>
          <SectionTitle>{editId ? 'EDITAR PEÇA' : 'CADASTRAR NOVA PEÇA'}</SectionTitle>

          {/* Row 1: foto + campos principais */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 4, alignItems: 'flex-start' }}>
            <ImageUpload value={f.foto} onChange={(v) => setF((x) => ({ ...x, foto: v }))} />
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 14px' }}>
              <Inp label="Modelo / Nome"  value={f.nome} onChange={e => setF(x => ({ ...x, nome: e.target.value }))} placeholder="Ex: Terno Oxford Slim" />
              <Inp label="Tamanho"        value={f.tam}  onChange={e => setF(x => ({ ...x, tam: e.target.value }))}  placeholder="PP / P / M / G / GG" />
              <Inp label="Cor"            value={f.cor}  onChange={e => setF(x => ({ ...x, cor: e.target.value }))}  placeholder="Ex: Azul Marinho" />
              <Inp label="Valor Aluguel (R$)" type="number" value={f.aluguel} onChange={e => setF(x => ({ ...x, aluguel: e.target.value }))} placeholder="0,00" />
              <Inp label="Valor Venda (R$)"   type="number" value={f.venda}   onChange={e => setF(x => ({ ...x, venda: e.target.value }))}   placeholder="0,00" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 10px' }}>
                <Inp label="Qtd. em estoque" type="number" value={f.qtd} onChange={e => setF(x => ({ ...x, qtd: e.target.value }))} placeholder="0" />
                <Sel label="Status" value={f.status} onChange={e => setF(x => ({ ...x, status: e.target.value }))} options={['Disponível', 'Alugado', 'Em Ajuste', 'Vendido']} />
              </div>
            </div>
          </div>

          {/* preview do estoque */}
          {f.qtd !== '' && (
            <div style={{ marginBottom: 16, padding: '10px 14px', background: '#0D0D12', borderRadius: 7, border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 10, color: C.textSub, margin: '0 0 8px', fontWeight: 700, letterSpacing: '0.06em' }}>PRÉVIA DO INDICADOR DE ESTOQUE</p>
              <StockBar qtd={Number(f.qtd) || 0} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <BtnGold onClick={save}>{editId ? 'Salvar Alterações' : 'Cadastrar Peça'}</BtnGold>
            <BtnOut onClick={() => setShow(false)}>Cancelar</BtnOut>
          </div>
        </Card>
      )}

      {/* ── Empty ── */}
      {visible.length === 0 && (
        <Card>
          <p style={{ color: C.textSub, fontSize: 13 }}>Nenhuma peça encontrada para este filtro.</p>
        </Card>
      )}

      {/* ── Views ── */}
      {visible.length > 0 && view === 'cards' && <CardView pecas={visible} onEdit={openEdit} onDelete={del} />}
      {visible.length > 0 && view === 'table' && <TableView pecas={visible} onEdit={openEdit} onDelete={del} />}
    </div>
  );
}
