import { FilterConfig } from "@/types/filter";

export const filterConfig: FilterConfig[] = [
  // {
  //   id: "createdDate",
  //   label: "Created Date",
  //   type: "date",
  //   multiple: false,
  //   order: 1,
  // },
  // {
  //   id: "updatedDate",
  //   label: "Updated Date",
  //   type: "date",
  //   multiple: false,
  //   order: 2,
  // },
  // {
  //   id: "completed",
  //   label: "Completed",
  //   type: "boolean",
  //   multiple: false,
  //   order: 3,
  // },
  // {
  //   id: "completedDate",
  //   label: "Completed Date",
  //   type: "date",
  //   multiple: false,
  //   order: 4,
  // },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "todo", label: "To Do" },
      { value: "in-progress", label: "In Progress" },
      { value: "done", label: "Done" },
    ],
    multiple: true,
    order: 5,
  },
  {
    id: "hasAttachments",
    label: "Has Attachments",
    type: "boolean",
    multiple: false,
    order: 6,
  },
  {
    id: "priority",
    label: "Priority",
    type: "select",
    options: [
      { value: "low", label: "Low" },
      { value: "normal", label: "Normal" },
      { value: "high", label: "High" },
    ],
    multiple: true,
    order: 7,
  },
];
