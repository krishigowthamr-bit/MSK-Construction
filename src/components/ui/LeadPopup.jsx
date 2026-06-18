import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const SERVICES = ['Construction', 'Architecture', 'Interior', 'Renovation'];
const SESSION_KEY = 'msk_popup_shown';

export default function LeadPopup() {
  const [open, setOpen]           = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName:'', mobile:'', email:'', location:'', service:'', message:'' });
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => { setOpen(true); sessionStorage.setItem(SESSION_KEY,'1'); }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())                              e.firstName = 'Required';
    if (!/^\d{10}$/.test(form.mobile.trim()))               e.mobile    = 'Enter valid 10-digit number';
    if (!/\S+@\S+\.\S+/.test(form.email))                   e.email     = 'Enter valid email';
    if (!form.location.trim())                               e.location  = 'Required';
    if (!form.service)                                       e.service   = 'Please select a service';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); }, 3200);
  };

  /* shared styles */
  const fieldWrap  = { marginBottom: 0 };
  const lbl        = { display:'block', fontSize:'13px', fontWeight:500, color:'#374151', marginBottom:'6px', fontFamily:'Jost,sans-serif' };
  const inp = (err) => ({
    width:'100%', padding:'10px 0', fontSize:'14px', fontFamily:'Jost,sans-serif',
    color:'#111', background:'transparent', border:'none', outline:'none',
    borderBottom:`1.5px solid ${err ? '#e53e3e' : '#d1d5db'}`,
    transition:'border-color .2s', boxSizing:'border-box',
  });
  const err_txt    = { color:'#e53e3e', fontSize:'11px', marginTop:'3px', fontFamily:'Jost,sans-serif' };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div key="bd"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={close}
            style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(4px)' }}
          />

          {/* modal */}
          <motion.div key="modal"
            initial={{opacity:0, scale:0.92, y:28}}
            animate={{opacity:1, scale:1, y:0}}
            exit={{opacity:0, scale:0.92, y:16}}
            transition={{duration:0.3, ease:[0.22,1,0.36,1]}}
            style={{
              position:'fixed', zIndex:201,
              top:'50%', left:'50%', transform:'translate(-50%,-50%)',
              width:'92vw', maxWidth:'620px', maxHeight:'92vh', overflowY:'auto',
              background:'#fff', borderRadius:'10px',
              boxShadow:'0 24px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* gold top bar */}
            <div style={{ height:'4px', background:'linear-gradient(90deg,#E8C97A,#C9A84C,#9A7A2E)', borderRadius:'10px 10px 0 0' }} />

            {/* close btn */}
            <button onClick={close}
              style={{
                position:'absolute', top:'14px', right:'14px',
                width:'30px', height:'30px', borderRadius:'50%',
                background:'#C9A84C', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontSize:'17px',
                transition:'background .2s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='#9A7A2E'}
              onMouseLeave={e=>e.currentTarget.style.background='#C9A84C'}
            ><HiX /></button>

            <div style={{ padding:'24px 28px 30px' }}>
              {submitted ? (
                /* success */
                <div style={{ textAlign:'center', padding:'28px 0' }}>
                  <div style={{
                    width:'60px', height:'60px', borderRadius:'50%',
                    background:'linear-gradient(135deg,#E8C97A,#C9A84C)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    margin:'0 auto 18px', fontSize:'26px', color:'#fff',
                  }}>✓</div>
                  <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'26px', fontWeight:500, color:'#111', marginBottom:'10px' }}>
                    Thank You!
                  </h3>
                  <p style={{ color:'#666', fontSize:'14px', lineHeight:1.8 }}>
                    We've received your enquiry.<br/>Our team will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  {/* header */}
                  <div style={{ textAlign:'center', marginBottom:'22px' }}>
                    <img src="/msk-logo.png" alt="MSK Construction"
                      style={{ height:'48px', width:'auto', objectFit:'contain', marginBottom:'10px', display:'block', margin:'0 auto 10px' }} />
                    <h2 style={{
                      fontFamily:'Cormorant Garamond,serif',
                      fontSize:'clamp(20px,3vw,25px)', fontWeight:600, color:'#111', marginBottom:'5px',
                    }}>
                      Start Your Journey with Us!
                    </h2>
                    <p style={{ color:'#888', fontSize:'13px' }}>
                      Get a free consultation from our construction experts
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Row 1 */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' }}>
                      {/* First Name */}
                      <div style={fieldWrap}>
                        <label style={lbl}>First Name</label>
                        <input type="text" placeholder="Enter your  name"
                          value={form.firstName} onChange={e=>set('firstName',e.target.value)}
                          style={inp(errors.firstName)}
                          onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                          onBlur={e=>e.target.style.borderBottomColor=errors.firstName?'#e53e3e':'#d1d5db'}
                        />
                        {errors.firstName && <p style={err_txt}>{errors.firstName}</p>}
                      </div>
                      {/* Mobile */}
                      <div style={fieldWrap}>
                        <label style={lbl}>Mobile</label>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:`1.5px solid ${errors.mobile?'#e53e3e':'#d1d5db'}`, paddingBottom:'10px' }}>
                          <span style={{fontSize:'18px'}}>🇮🇳</span>
                          <span style={{color:'#555',fontSize:'14px',fontFamily:'Jost,sans-serif'}}>+91</span>
                          <input type="tel" placeholder="10-digit number" maxLength={10}
                            value={form.mobile} onChange={e=>set('mobile',e.target.value.replace(/\D/g,''))}
                            style={{ flex:1, border:'none', outline:'none', fontSize:'14px', fontFamily:'Jost,sans-serif', color:'#111', background:'transparent' }}
                          />
                        </div>
                        {errors.mobile && <p style={err_txt}>{errors.mobile}</p>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' }}>
                      {/* Email */}
                      <div style={fieldWrap}>
                        <label style={lbl}>Email</label>
                        <input type="email" placeholder="Enter your email"
                          value={form.email} onChange={e=>set('email',e.target.value)}
                          style={inp(errors.email)}
                          onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                          onBlur={e=>e.target.style.borderBottomColor=errors.email?'#e53e3e':'#d1d5db'}
                        />
                        {errors.email && <p style={err_txt}>{errors.email}</p>}
                      </div>
                      {/* Location */}
                      <div style={fieldWrap}>
                        <label style={lbl}>Location</label>
                        <input type="text" placeholder="Enter your Area/City"
                          value={form.location} onChange={e=>set('location',e.target.value)}
                          style={inp(errors.location)}
                          onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                          onBlur={e=>e.target.style.borderBottomColor=errors.location?'#e53e3e':'#d1d5db'}
                        />
                        {errors.location && <p style={err_txt}>{errors.location}</p>}
                      </div>
                    </div>

                    {/* Service */}
                    <div style={{ marginBottom:'20px' }}>
                      <label style={lbl}>Service</label>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'20px', marginTop:'6px' }}>
                        {SERVICES.map(s => (
                          <label key={s} style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer', fontSize:'14px', color:'#444', fontFamily:'Jost,sans-serif', userSelect:'none' }}>
                            <input type="radio" name="service" value={s}
                              checked={form.service===s}
                              onChange={()=>set('service',s)}
                              style={{ accentColor:'#C9A84C', width:'16px', height:'16px', cursor:'pointer' }}
                            />
                            {s}
                          </label>
                        ))}
                      </div>
                      {errors.service && <p style={err_txt}>{errors.service}</p>}
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom:'24px' }}>
                      <label style={lbl}>Message</label>
                      <textarea placeholder="Write your message..." rows={3}
                        value={form.message} onChange={e=>set('message',e.target.value)}
                        style={{
                          width:'100%', padding:'10px 0', fontSize:'14px',
                          fontFamily:'Jost,sans-serif', color:'#111',
                          background:'transparent', border:'none',
                          borderBottom:'1.5px solid #d1d5db', outline:'none',
                          resize:'none', transition:'border-color .2s', boxSizing:'border-box',
                        }}
                        onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                        onBlur={e=>e.target.style.borderBottomColor='#d1d5db'}
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit"
                      style={{
                        width:'100%', padding:'15px',
                        background:'linear-gradient(135deg,#E8C97A,#C9A84C,#9A7A2E)',
                        color:'#0F0F0F', fontSize:'14px', fontWeight:700,
                        letterSpacing:'0.1em', textTransform:'uppercase',
                        border:'none', borderRadius:'5px', cursor:'pointer',
                        fontFamily:'Jost,sans-serif',
                        boxShadow:'0 4px 20px rgba(201,168,76,0.35)',
                        transition:'box-shadow .25s, transform .2s',
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 28px rgba(201,168,76,0.55)';e.currentTarget.style.transform='translateY(-1px)';}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 4px 20px rgba(201,168,76,0.35)';e.currentTarget.style.transform='translateY(0)';}}
                    >
                      Send Message
                    </button>

                    <p style={{ textAlign:'center', marginTop:'12px', fontSize:'11.5px', color:'#aaa', fontFamily:'Jost,sans-serif' }}>
                      🔒 Your information is safe with us. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
