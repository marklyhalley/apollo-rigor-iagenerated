import { useState } from 'react';
import { C, fmt, fmtDate } from '../constants';
import { Card, SectionTitle, TH, TD, Inp, Sel, BtnGold, BtnOut } from './UI';

let _transId = 4;
let _ajusteId = 2;

export default function Vendas({ pecas, setPecas, trans, setTrans, setAjustes }) {
  const [aba, setAba]   = useState('hist');
  const [tipo, setTipo] = useState('aluguel');

  const EMPTY_F = { pid: '', cliente: '', tel: '', retirada: '', dev: '', valor: '' };
  const EMPTY_D = { tid: '', ajuste: false, desc: '', entrega: '' };
  const [f, setF] = useState(EMPTY_F);
  const [d, setD] = useState(EMPTY_D);

  const disponiveis = pecas.filter((p) => p.status === 'Disponível');
  const abertos     = trans.filter((t) => t.tipo === 'aluguel' && t.devolvido === false);
  const fat         = trans.reduce((s, t) => s + t.valor, 0);

  const registrar = () => {
    if (!f.pid || !f.cliente || !f.valor) return;
    setTrans((prev) => [
      ...prev,
      {
        id: _transId++, pid: Number(f.pid), tipo,
        cliente: f.cliente, tel: f.tel,
        retirada: f.retirada || null, dev: f.dev || null,
        valor: Number(f.valor), data: new Date().toISOString().slice(0, 10),
        devolvido: tipo === 'venda' ? null : false,
      },
    ]);
    setPecas((prev) =>
      prev.map((p) =>
        p.id === Number(f.pid)
          ? { ...p, status: tipo === 'aluguel' ? 'Alugado' : 'Vendido' }
          : p
      )
    );
    setF(EMPTY_F);
    setAba('hist');
  };

  const devolver = () => {
    if (!d.tid) return;
    const t = trans.find((x) => x.id === Number(d.tid));
    if (!t) return;
    setTrans((prev) => prev.map((x) => x.id === t.id ? { ...x, devolvido: true } : x));
    if (d.ajuste) {
      setPecas((prev) => prev.map((p) => p.id === t.pid ? { ...p, status: 'Em Ajuste' } : p));
      setAjustes((prev) => [
        ...prev,
        { id: _ajusteId++, pid: t.pid, desc: d.desc || 'A definir', entrega: d.entrega || '', status: 'Pendente' },
      ]);
    } else {
      setPecas((prev) => prev.map((p) => p.id === t.pid ? { ...p, status: 'Disponível' } : p));
    }
    setD(EMPTY_D);
    setAba('hist');
  };

  const abas = [
    { key: 'hist', label: 'Histórico' },
    { key: 'reg',  label: 'Registrar Transação' },
    { key: 'dev',  label: 'Registrar Devolução' },
  ];

  return (
    <div>
      {/* Faturamento */}
      <div style={{
        background: C.card, border: `1px solid ${C.goldDim}`, borderRadius: 10,
        padding: '14px 20px', marginBottom: 18,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ margin: 0, color: C.textSub, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>FATURAMENTO TOTAL</p>
        <p style={{ margin: 0, color: C.goldText, fontSize: 26, fontWeight: 700 }}>R$ {fmt(fat)}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
        {abas.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setAba(key)}
            style={{
              padding: '7px 16px', borderRadius: 7, cursor: 'pointer',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              background: aba === key ? C.gold : 'transparent',
              color: aba === key ? '#0B0B0F' : C.textSub,
              border: aba === key ? 'none' : `1px solid ${C.border}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Histórico */}
      {aba === 'hist' && (
        <Card>
          {trans.length === 0 ? (
            <p style={{ color: C.textSub, fontSize: 13 }}>Nenhuma transação registrada.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr><TH>Peça</TH><TH>Cliente</TH><TH>Tipo</TH><TH>Retirada</TH><TH>Devolução</TH><TH>Valor</TH><TH>Status</TH></tr>
              </thead>
              <tbody>
                {[...trans].reverse().map((t) => {
                  const p = pecas.find((x) => x.id === t.pid);
                  const stLabel = t.devolvido === null ? 'Concluída' : t.devolvido ? 'Devolvido' : 'Em aberto';
                  const stColor = t.devolvido === null ? '#4ADE80' : t.devolvido ? '#8B8FA8' : '#FBB040';
                  return (
                    <tr key={t.id}>
                      <TD><span style={{ color: C.text, fontWeight: 500 }}>{p?.nome || '—'}</span></TD>
                      <TD><span style={{ color: C.textSub, fontSize: 12 }}>{t.cliente}</span></TD>
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
                      <TD><span style={{ color: C.textSub, fontSize: 12 }}>{fmtDate(t.retirada)}</span></TD>
                      <TD><span style={{ color: C.textSub, fontSize: 12 }}>{fmtDate(t.dev)}</span></TD>
                      <TD><span style={{ color: C.goldText, fontWeight: 500 }}>R$ {fmt(t.valor)}</span></TD>
                      <TD><span style={{ color: stColor, fontWeight: 600, fontSize: 12 }}>{stLabel}</span></TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* Registrar */}
      {aba === 'reg' && (
        <Card style={{ borderColor: C.goldDim }}>
          <SectionTitle>NOVA TRANSAÇÃO</SectionTitle>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[{ key: 'aluguel', label: 'Aluguel', color: '#FBB040' }, { key: 'venda', label: 'Venda', color: '#4ADE80' }].map((t) => (
              <button
                key={t.key}
                onClick={() => setTipo(t.key)}
                style={{
                  padding: '6px 18px', borderRadius: 7, cursor: 'pointer',
                  fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
                  background: tipo === t.key ? t.color : 'transparent',
                  color: tipo === t.key ? '#0B0B0F' : C.textSub,
                  border: tipo === t.key ? 'none' : `1px solid ${C.border}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <Sel
              label="Peça (disponíveis)"
              value={f.pid}
              onChange={(e) => setF((x) => ({ ...x, pid: e.target.value }))}
              options={disponiveis.map((p) => ({ value: p.id, label: `${p.nome} (${p.tam} — ${p.cor})` }))}
            />
            <Inp label="Nome do Cliente"      value={f.cliente}  onChange={(e) => setF((x) => ({ ...x, cliente: e.target.value }))}  placeholder="Nome completo" />
            <Inp label="Telefone"             value={f.tel}      onChange={(e) => setF((x) => ({ ...x, tel: e.target.value }))}      placeholder="(11) 99999-9999" />
            <Inp label="Valor Cobrado (R$)"   type="number" value={f.valor} onChange={(e) => setF((x) => ({ ...x, valor: e.target.value }))} placeholder="0,00" />
            {tipo === 'aluguel' && (
              <>
                <Inp label="Data de Retirada"              type="date" value={f.retirada} onChange={(e) => setF((x) => ({ ...x, retirada: e.target.value }))} />
                <Inp label="Data Prevista de Devolução"    type="date" value={f.dev}      onChange={(e) => setF((x) => ({ ...x, dev: e.target.value }))} />
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <BtnGold onClick={registrar}>Registrar {tipo === 'aluguel' ? 'Aluguel' : 'Venda'}</BtnGold>
            <BtnOut onClick={() => setAba('hist')}>Cancelar</BtnOut>
          </div>
        </Card>
      )}

      {/* Devolução */}
      {aba === 'dev' && (
        <Card style={{ borderColor: C.goldDim }}>
          <SectionTitle>REGISTRAR DEVOLUÇÃO</SectionTitle>
          <Sel
            label="Aluguel em aberto"
            value={d.tid}
            onChange={(e) => setD((x) => ({ ...x, tid: e.target.value }))}
            options={abertos.map((t) => {
              const p = pecas.find((x) => x.id === t.pid);
              return { value: t.id, label: `${p?.nome || '?'} — ${t.cliente}` };
            })}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 14px' }}>
            <input
              type="checkbox"
              id="cb-ajuste"
              checked={d.ajuste}
              onChange={(e) => setD((x) => ({ ...x, ajuste: e.target.checked }))}
              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: C.gold }}
            />
            <label htmlFor="cb-ajuste" style={{ fontSize: 13, color: C.textSub, cursor: 'pointer' }}>
              Peça precisa de ajuste de costura antes de voltar ao estoque
            </label>
          </div>
          {d.ajuste && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
              <Inp label="Descrição do Ajuste"        value={d.desc}    onChange={(e) => setD((x) => ({ ...x, desc: e.target.value }))}    placeholder="Ex: Ajuste na cintura" />
              <Inp label="Data Prevista de Entrega"   type="date" value={d.entrega} onChange={(e) => setD((x) => ({ ...x, entrega: e.target.value }))} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <BtnGold onClick={devolver}>Confirmar Devolução</BtnGold>
            <BtnOut onClick={() => setAba('hist')}>Cancelar</BtnOut>
          </div>
        </Card>
      )}
    </div>
  );
}
