type SelectOption = {
  value: string;
  label: string;
};

export type FilterConfig = {
  id: string;
  label: string;
  type: "date" | "select" | "boolean" | "range" | "daterange";
  options?: SelectOption[];
  multiple: boolean;
  order: number;
};

export type FilterData = {
  filterType: string;
  filterField: string;
  filterValue?: string;
  filterBoolean?: boolean;
  filterValues?: string[];
};
