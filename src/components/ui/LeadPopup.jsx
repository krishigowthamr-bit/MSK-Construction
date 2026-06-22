import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const SESSION_KEY = 'msk_consultation_popup_seen';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  location: '',
};

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const params = new URLSearchParams(window.location.search);
    if (params.get('lead') === '1') {
      setOpen(true);
      return undefined;
    }

    if (window.sessionStorage.getItem(SESSION_KEY)) return undefined;

    const timer = window.setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(SESSION_KEY, '1');
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openPopup = () => {
      setSubmitted(false);
      setOpen(true);
    };

    window.addEventListener('openLeadPopup', openPopup);
    return () => window.removeEventListener('openLeadPopup', openPopup);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const updateForm = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(form.phone.trim())) nextErrors.phone = 'Enter a valid 10-digit phone number';
    if (!/\S+@\S+\.\S+/.test(form.email.trim())) nextErrors.email = 'Enter a valid email';
    if (!form.location.trim()) nextErrors.location = 'Location is required';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm(initialForm);
    }, 2200);
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    height: '40px',
    border: `1px solid ${hasError ? '#e53e3e' : '#E5E7EB'}`,
    borderRadius: 0,
    background: '#fff',
    color: '#111827',
    fontFamily: 'Jost, sans-serif',
    fontSize: '14px',
    outline: 'none',
    padding: '0 12px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="consultation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.62)',
            }}
          />

          <motion.div
            key="consultation-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
            initial={{ opacity: 0, x: '-50%', y: '-46%', scale: 0.96 }}
            animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
            exit={{ opacity: 0, x: '-50%', y: '-46%', scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lead-popup"
            style={{
              position: 'fixed',
              inset: '50% auto auto 50%',
              zIndex: 201,
              width: 'min(896px, calc(100vw - 32px))',
              maxHeight: 'calc(100vh - 32px)',
              overflow: 'auto',
              background: '#fff',
              boxShadow: '0 28px 90px rgba(0,0,0,0.42)',
            }}
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 3,
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '3px',
                background: '#414AA3',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
              }}
            >
              <HiX style={{ fontSize: '22px' }} />
            </button>

            <div className="lead-popup-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr' }}>
              <div className="lead-popup-image" style={{ minHeight: '430px', background: '#111' }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85"
                  alt="Modern luxury home"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ padding: '34px 32px 32px' }}>
                {submitted ? (
                  <div style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: '#414AA3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '18px' }}>
                      ✓
                    </div>
                    <h2 className="font-display" style={{ color: '#111827', fontSize: '30px', fontWeight: 500, marginBottom: '10px' }}>Thank You</h2>
                    <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.7 }}>We have received your enquiry. Our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h2 id="consultation-popup-title" style={{ color: '#111827', fontSize: '21px', fontWeight: 700, marginBottom: '10px', fontFamily: 'Jost, sans-serif' }}>
                      Get a Free Consultation
                    </h2>
                    <p style={{ color: '#5B6170', fontSize: '15px', lineHeight: 1.5, marginBottom: '22px' }}>
                      Fill out the form below and we'll get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      {[
                        ['name', 'Name', 'Your name', 'text'],
                        ['phone', 'Phone', 'Your phone number', 'tel'],
                        ['email', 'Email', 'your@email.com', 'email'],
                        ['location', 'Location', 'Your location', 'text'],
                      ].map(([field, label, placeholder, type]) => (
                        <div key={field} style={{ marginBottom: '15px' }}>
                          <label htmlFor={`lead-${field}`} style={{ display: 'block', color: '#111827', fontSize: '14px', fontWeight: 500, marginBottom: '7px', fontFamily: 'Jost, sans-serif' }}>
                            {label}
                          </label>
                          <input
                            id={`lead-${field}`}
                            type={type}
                            inputMode={field === 'phone' ? 'numeric' : undefined}
                            maxLength={field === 'phone' ? 10 : undefined}
                            placeholder={placeholder}
                            value={form[field]}
                            onChange={event => updateForm(field, field === 'phone' ? event.target.value.replace(/\D/g, '') : event.target.value)}
                            style={inputStyle(errors[field])}
                            onFocus={event => {
                              event.currentTarget.style.borderColor = '#414AA3';
                              event.currentTarget.style.boxShadow = '0 0 0 3px rgba(65,74,163,0.12)';
                            }}
                            onBlur={event => {
                              event.currentTarget.style.borderColor = errors[field] ? '#e53e3e' : '#E5E7EB';
                              event.currentTarget.style.boxShadow = 'none';
                            }}
                          />
                          {errors[field] && <p style={{ color: '#e53e3e', fontSize: '11px', marginTop: '4px' }}>{errors[field]}</p>}
                        </div>
                      ))}

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          height: '38px',
                          marginTop: '10px',
                          border: 'none',
                          borderRadius: '2px',
                          background: '#414AA3',
                          color: '#fff',
                          cursor: 'pointer',
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '14px',
                          fontWeight: 700,
                          boxShadow: '0 10px 24px rgba(65,74,163,0.24)',
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
