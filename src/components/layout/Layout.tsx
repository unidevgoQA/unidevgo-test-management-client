import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { TableHeader } from '@/components/table/TableHeader';
import { TableContent } from '@/components/table/TableContent';

export function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <div className="flex-1 overflow-auto">
          <TableHeader />
          <TableContent />
        </div>
      </div>
    </div>
  );
}