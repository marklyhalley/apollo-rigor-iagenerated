import { C } from '../constants';

export function Badge({ label, map }) {
  const s = map[label] || { color: '#8B8FA8', bg: '#151720', border: '#8B8FA825' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 10, padding: 20, ...style,
    }}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, color: C.goldText, margin: '0 0 18px', letterSpacing: '0.1em' }}>
      {children}
    </p>
  );
}

export const TH = ({ children }) => (
  <th style={{
    textAlign: 'left', padding: '0 14px 10px 0', color: C.textSub,
    fontWeight: 600, fontSize: 10, letterSpacing: '0.08em',
    borderBottom: `1px solid ${C.border}`,
  }}>
    {children}
  </th>
);

export const TD = ({ children, style }) => (
  <td style={{ padding: '11px 14px 11px 0', borderBottom: `1px solid ${C.border}18`, ...style }}>
    {children}
  </td>
);

const inputBase = {
  width: '100%',
  padding: '8px 11px',
  background: '#0D0D12',
  border: `1px solid ${C.border}`,
  borderRadius: 6,
  color: C.text,
  fontSize: 13,
  outline: 'none',
};

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 10, color: C.textSub, margin: '0 0 5px', fontWeight: 700, letterSpacing: '0.08em' }}>
        {label.toUpperCase()}
      </p>
      {children}
    </div>
  );
}

export function Inp({ label, ...props }) {
  return (
    <Field label={label}>
      <input style={inputBase} {...props} />
    </Field>
  );
}

export function Sel({ label, options, ...props }) {
  return (
    <Field label={label}>
      <select style={{ ...inputBase, cursor: 'pointer' }} {...props}>
        <option value="">Selecione...</option>
        {options.map((o) => {
          const v = o.value ?? o;
          const l = o.label ?? o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </Field>
  );
}

export function BtnGold({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '9px 20px',
        background: disabled ? C.goldDim : C.gold,
        color: '#0B0B0F', border: 'none', borderRadius: 7,
        fontWeight: 700, fontSize: 13,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

export function BtnOut({ children, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 14px', background: 'transparent',
        color: color || C.textSub,
        border: `1px solid ${color ? color + '44' : C.border}`,
        borderRadius: 7, fontWeight: 500, fontSize: 12,
        cursor: 'pointer', fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

export function TypeToggle({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {options.map(({ key, label, activeColor }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '6px 18px', borderRadius: 7, cursor: 'pointer',
            fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
            background: value === key ? activeColor : 'transparent',
            color: value === key ? '#0B0B0F' : C.textSub,
            border: value === key ? 'none' : `1px solid ${C.border}`,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
