import { Issue, IssueQuery, IssueStatus } from "../types";

const OWNERS = ["Ava", "Noah", "Mia", "Leo", "Priya", "Sam", "Chen", "Fatima"];
const STATUSES: IssueStatus[] = ["open", "investigating", "blocked", "done"];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function words(n: number) {
  const pool = [
    "auth",
    "cache",
    "render",
    "router",
    "query",
    "state",
    "layout",
    "api",
    "timeout",
    "race",
    "key",
    "memo",
    "effect",
    "debounce",
    "list",
    "index",
    "strict",
    "virtualize",
  ];
  return Array.from(
    { length: n },
    () => pool[randInt(0, pool.length - 1)]
  ).join(" ");
}

function makeIssue(i: number): Issue {
  const created = new Date(
    Date.now() - randInt(0, 90) * 86400000 - randInt(0, 86400000)
  );
  return {
    id: `ISSUE-${String(i).padStart(5, "0")}`,
    title: `${words(randInt(3, 7))} (#${i})`,
    status: STATUSES[randInt(0, STATUSES.length - 1)],
    priority: randInt(1, 5) as Issue["priority"],
    createdAt: created.toISOString(),
    owner: OWNERS[randInt(0, OWNERS.length - 1)],
    description: `${words(randInt(30, 60))}.`,
  };
}

const DB: Issue[] = Array.from({ length: 6000 }, (_, i) => makeIssue(i + 1));

function applyQuery(list: Issue[], q: IssueQuery): Issue[] {
  let out = list;

  if (q.status !== "all") {
    out = out.filter((x) => x.status === q.status);
  }

  const s = q.search.trim().toLowerCase();
  if (s) {
    out = out.filter((x) =>
      (x.title + " " + x.description + " " + x.owner).toLowerCase().includes(s)
    );
  }
  out = [...out];
  if (q.sort === "newest")
    out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (q.sort === "oldest")
    out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  if (q.sort === "priority_desc") out.sort((a, b) => b.priority - a.priority);
  if (q.sort === "priority_asc") out.sort((a, b) => a.priority - b.priority);

  return out;
}

export async function fetchIssues(q: IssueQuery): Promise<Issue[]> {
  console.log("[QUERY]:" + JSON.stringify(q));
  const delay = randInt(150, 450);
  await new Promise((r) => setTimeout(r, delay));
  return applyQuery(DB, q);
}

export async function updateIssue(
  id: string,
  patch: Partial<Pick<Issue, "title" | "status">>
): Promise<Issue> {
  console.log("[MUTATE]:" + JSON.stringify(patch));
  await new Promise((r) => setTimeout(r, randInt(150, 350)));

  const idx = DB.findIndex((x) => x.id === id);
  if (idx === -1) throw new Error("Issue not found");

  const next = { ...DB[idx], ...patch };
  DB[idx] = next;
  return next;
}
