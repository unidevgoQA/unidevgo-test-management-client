export interface TableColumn {
  name: string;
  type: "text" | "integer" | "boolean" | "timestamp" | "uuid" | "json" | "float";
  nullable: boolean;
}

export interface Table {
  id: string;
  name: string;
  columns: TableColumn[];
  createdAt: string;
}