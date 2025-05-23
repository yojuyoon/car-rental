import Nav from './Nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 py-6">{children}</main>
    </div>
  );
}
