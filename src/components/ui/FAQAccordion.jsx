import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {items.map(([question, answer], index) => {
        const active = open === index;
        return (
          <div key={question} style={{ border: '1px solid rgba(201,168,76,0.16)', background: 'rgba(255,255,255,0.025)' }}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : index)}
              aria-expanded={active}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', padding: '18px 20px', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Jost, sans-serif' }}
            >
              <span style={{ fontSize: '15px', fontWeight: 500 }}>{question}</span>
              <HiChevronDown style={{ color: '#C9A84C', transform: active ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }} />
            </button>
            {active && (
              <div style={{ padding: '0 20px 18px', color: 'rgba(255,255,255,0.52)', fontSize: '14px', lineHeight: 1.8 }}>
                {answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
