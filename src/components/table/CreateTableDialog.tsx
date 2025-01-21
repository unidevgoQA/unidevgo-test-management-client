import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableColumnForm } from "./TableColumnForm";
import { TableColumn } from "@/types/table";

export function CreateTableDialog() {
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [tableName, setTableName] = useState("");

  const handleAddColumn = () => {
    setColumns([...columns, { name: "", type: "text", nullable: false }]);
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleColumnChange = (index: number, column: TableColumn) => {
    setColumns(columns.map((c, i) => i === index ? column : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement table creation logic
    console.log({ tableName, columns });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New table
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tableName">Table name</Label>
            <Input
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Columns</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddColumn}>
                <Plus className="h-4 w-4 mr-2" />
                Add column
              </Button>
            </div>

            {columns.map((column, index) => (
              <div key={index} className="relative">
                <TableColumnForm
                  column={column}
                  onChange={(column) => handleColumnChange(index, column)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2"
                  onClick={() => handleRemoveColumn(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button type="submit">Create table</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}