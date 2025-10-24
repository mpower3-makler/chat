'use client';
import { useMemo, useRef, useState } from 'react';

type Msg = { role: 'user'|'bot'|'info'; text: string };
const uid = () => { try { return crypto.randomUUID(); } catch { return String(Date.now())+Math.random(); } };

export default function Chat({ id }: { id: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ role:'bot', text:'Hi 👋 – ich antworte nur für dieses Objekt.' }]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sessionId = useMemo(() => {
    const k='chat-session-id'; const v = typeof window!=='undefined' ? localStorage.getItem(k) : null;
    if (v) return v; const n=uid(); try { localStorage.setItem(k,n); } catch {} return n;
  }, []);

  async function send(text: string){
    if (!text.trim()) return;
    setMsgs(m=>[...m,{role:'user', text}]); setBusy(true);
    try {
      const res = await fetch(`/api/chat/${encodeURIComponent(id)}`, {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ msg:text, sessionId, pageUrl: typeof window!=='undefined'?window.location.href:'' })
      });
      const ct=(res.headers.get('content-type')||'').toLowerCase();
      let reply=''; if (ct.includes('application/json')) { const d=await res.json(); reply=d.answer||d.output||d.message||d.text||JSON.stringify(d); }
      else { reply=await res.text(); }
      setMsgs(m=>[...m,{role:'bot', text: reply||'(keine Antwort)'}]);
    } catch(e:any){
      setMsgs(m=>[...m,{role:'info', text:`Fehler: ${e?.message||e}`}]);
    } finally { setBusy(false); }
  }

  return (
    <div style={{maxWidth:680, margin:'20px auto', padding:16}}>
      <div style={{marginBottom:8, color:'#555'}}>Objekt-ID: <b>{id}</b></div>
      <div style={{border:'1px solid #ddd', borderRadius:12, overflow:'hidden'}}>
        <div style={{height:320, overflow:'auto', padding:12, background:'#fafafa'}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{textAlign: m.role==='user'?'right':'left', margin:'6px 0'}}>
              <span style={{
                display:'inline-block', padding:'8px 10px', borderRadius:12,
                background: m.role==='user'?'#2563EB':'#eee', color:m.role==='user'?'#fff':'#222'
              }}>{m.text}</span>
            </div>
          ))}
          {busy && <div><span style={{background:'#eee', padding:'8px 10px', borderRadius:12}}>…schreibe</span></div>}
        </div>
        <div style={{display:'flex', gap:8, borderTop:'1px solid #eee', padding:8}}>
          <input ref={inputRef} type="text" placeholder="Deine Nachricht…" style={{flex:1, padding:'8px 10px', border:'1px solid #ddd', borderRadius:10}}
            onKeyDown={(e)=>{ if(e.key==='Enter'){ const v=(e.target as HTMLInputElement).value; (e.target as HTMLInputElement).value=''; send(v);} }} />
          <button onClick={()=>{ const el=inputRef.current!; const v=el.value; el.value=''; send(v); }} disabled={busy}
            style={{padding:'8px 14px', borderRadius:10, background:'#2563EB', color:'#fff', border:0, opacity:busy?0.6:1}}>Senden</button>
        </div>
      </div>
    </div>
  );
}
