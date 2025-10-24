import { NextRequest, NextResponse } from 'next/server';

const N8N_BASE = process.env.N8N_BASE || '';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!N8N_BASE) return NextResponse.json({ error: 'N8N_BASE missing' }, { status: 500 });

  const id = params.id;
  let payload: any = {};
  try { payload = await req.json(); } catch {}

  const url = `${N8N_BASE.replace(/\/$/, '')}/${encodeURIComponent(id)}`;

  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await upstream.text();
  const ct = upstream.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try { return NextResponse.json(JSON.parse(text), { status: upstream.status }); } catch {}
  }
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
