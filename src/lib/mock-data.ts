import { TestCase } from "@/types/testcase";

// Mock data for test cases
export const mockTestCases: TestCase[] = Array.from({ length: 10 }, (_, i) => ({
  id: `TC-${(i + 1).toString().padStart(3, '0')}`,
  title: `Test Case ${i + 1}`,
  owner: ['John Doe', 'Jane Smith', 'Bob Johnson'][Math.floor(Math.random() * 3)],
  createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
  createdBy: ['John Doe', 'Jane Smith', 'Bob Johnson'][Math.floor(Math.random() * 3)],
  priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as TestCase['priority'],
  type: ['Manual', 'Automated'][Math.floor(Math.random() * 2)] as TestCase['type'],
  lastExecution: Math.random() > 0.3 
    ? new Date(2024, 1, Math.floor(Math.random() * 28) + 1).toISOString()
    : null,
  checked: false,
}));