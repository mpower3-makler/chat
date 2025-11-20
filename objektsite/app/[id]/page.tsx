import Chat from '../../components/Chat';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main
      style={{
        minHeight: '100vh',           // nimmt die ganze Bildschirmhöhe
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Chat id={params.id} />
    </main>
  );
}
