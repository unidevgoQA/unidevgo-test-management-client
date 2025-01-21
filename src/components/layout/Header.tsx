import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Share2, Filter, Settings2, LayoutGrid, Search, ChevronRight, Grid, Calendar, ListTodo, Plus } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableViewOptions } from "../table/DataTableViewOptions";
import type { Table } from "@tanstack/react-table";

interface HeaderProps {
  projectName?: string;
  projectSelected?: boolean;
  showTabs?: boolean;
  table?: Table<any>;
}

export function Header({ projectName = "Adrian Bert - CRM Dashboard", projectSelected, showTabs, table }: HeaderProps) {
  const breadcrumbItems = [
    { 
      label: "Projects",
      href: "/projects",
      icon: Grid,
      isSelected: false
    },
    { 
      label: projectName,
      icon: ListTodo,
      isSelected: true
    }
  ];

  return (
    <div className="border-b">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Breadcrumbs items={breadcrumbItems} />
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Spreadsheet
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              1
            </span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {showTabs && (
        <div className="px-4 py-2 border-t flex items-center justify-between bg-muted/5">
          <div className="flex items-center gap-2">
            <Tabs defaultValue="spreadsheet" className="w-auto">
              <TabsList>
                <TabsTrigger value="spreadsheet" className="gap-2">
                  <Grid className="h-4 w-4" />
                  Spreadsheet
                </TabsTrigger>
                <TabsTrigger value="timeline" className="gap-2">
                  <ListTodo className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="board" className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Board
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search test cases..."
                className="pl-8 h-8"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            {table && <DataTableViewOptions table={table} />}
          </div>
        </div>
      )}
    </div>
  );
}