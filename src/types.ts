export type IssueStatus = "open" | "investigating" | "blocked" | "done";

export type Issue = {
  id: string;
  title: string;
  status: IssueStatus;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: string; // ISO
  owner: string;
  description: string;
};

export type IssueQuery = {
  search: string;
  status: IssueStatus | "all";
  sort: "newest" | "oldest" | "priority_desc" | "priority_asc";
};
