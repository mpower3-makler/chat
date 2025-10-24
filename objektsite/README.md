
# objektsite (Next.js + n8n)

Cloud-freundliches Minimal-Setup. Jede URL `/[id]` hat einen eigenen Chat und sendet die ID an n8n.

## Deploy (komplett in der Cloud)

1. Neues GitHub-Repo erstellen und **diese Dateien hochladen**.
2. In **Vercel → Add New → Project → Import Git Repository**.
3. In Vercel unter **Settings → Environment Variables** setzen:

```
N8N_BASE=https://makler123.app.n8n.cloud/webhook-test/59fda2d9-07ec-4f49-8f81-c0972f114e01/chat
```

> Wichtig: **ohne** `:slug` am Ende.

4. Deploy. Seite öffnen: `https://<dein-projekt>.vercel.app/MEINE-ID`

## n8n (minimal)

- Webhook: **POST** Pfad `chat/:slug` (Testmodus bei `/webhook-test/...` aktivieren)
- Danach **Respond to Webhook** mit JSON (Expression):

```js
{{ ({
  answer: `OK – empfangen für ${$json.params.slug}`,
  received: $json.body?.msg ?? $json.query?.msg,
  page: $json.body?.pageUrl ?? $json.query?.page
}) }}
```

## Lokal (optional)
```bash
npm install
npm run dev
# http://localhost:3000/ABC123
```
