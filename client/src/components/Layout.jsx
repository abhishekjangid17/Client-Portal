import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0e0e0e' }}>
      <Sidebar />
      <main style={{ flex:1, padding:'32px 40px', overflowY:'auto', color:'#ededed' }}>
        {children}
      </main>
    </div>
  );
}