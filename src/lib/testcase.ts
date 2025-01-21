import type { TestCase, SortDirection } from "@/types/testcase";

export const PRIORITIES = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
} as const;

export const TYPES = {
  Manual: "bg-gray-100 text-gray-700",
  Automated: "bg-blue-100 text-blue-700",
} as const;

export function sortTestCases(
  data: TestCase[],
  columnId: keyof TestCase,
  direction: SortDirection
): TestCase[] {
  if (!direction) return data;

  return [...data].sort((a, b) => {
    if (a[columnId] === null) return 1;
    if (b[columnId] === null) return -1;
    if (a[columnId]! < b[columnId]!) return direction === 'asc' ? -1 : 1;
    if (a[columnId]! > b[columnId]!) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}