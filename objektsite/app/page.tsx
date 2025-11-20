export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',        // nimmt die ganze Bildschirmhöhe
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Objekt Chat – Demo</h1>
      <p>
        Öffne z. B.{' '}
        <a href="/ABC123" style={{ color: '#2563EB' }}>
          /ABC123
        </a>{' '}
        für ein Beispiel.
      </p>
    </main>
  );
}

  );
}
