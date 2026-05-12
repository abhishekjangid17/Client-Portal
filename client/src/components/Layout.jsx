import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', fontFamily: 'var(--font-body)' }}>
        {children}
      </main>
    </div>
  );
}