export const metadata = {
  title: 'Objekt Chat',
  description: 'Jede URL /[id] hat ihren eigenen Chat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Arial', background:'#f6f7fb'}}>{children}</body>
    </html>
  );
}
