export interface GroupType {
  id: string;
  name: string;
  emoji: string;
  color: string;
  testCaseCount: number;
  subgroups?: GroupType[];
}