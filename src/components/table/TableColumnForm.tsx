import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TableColumn } from "@/types/table";

interface TableColumnFormProps {
  column: TableColumn;
  onChange: (column: TableColumn) => void;
}

const DATA_TYPES = [
  "text",
  "integer",
  "boolean",
  "timestamp",
  "uuid",
  "json",
  "float",
] as const;

export function TableColumnForm({ column, onChange }: TableColumnFormProps) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 border rounded-lg">
      <div className="col-span-4">
        <Input
          value={column.name}
          onChange={(e) => onChange({ ...column, name: e.target.value })}
          placeholder="Column name"
        />
      </div>
      
      <div className="col-span-4">
        <Select
          value={column.type}
          onValueChange={(value) => onChange({ ...column, type: value as TableColumn["type"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {DATA_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-4 flex items-center justify-end gap-2">
        <Label htmlFor="nullable">Nullable</Label>
        <Switch
          id="nullable"
          checked={column.nullable}
          onCheckedChange={(checked) => onChange({ ...column, nullable: checked })}
        />
      </div>
    </div>
  );
}