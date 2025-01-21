import { Header } from './Header';
import { TestCaseTable } from '../table/TestCaseTable';

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex-1 p-6">
        <TestCaseTable />
      </div>
    </div>
  );
}