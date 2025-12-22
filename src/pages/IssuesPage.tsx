import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchIssues, updateIssue } from "../api/issuesApi";
import IssueDetails from "../components/IssueDetails";
import IssueList from "../components/IssueList";
import Toolbar from "../components/Toolbar";
import { Issue, IssueQuery, IssueStatus } from "../types";

const STATUSES: (IssueStatus | "all")[] = [
  "all",
  "open",
  "investigating",
  "blocked",
  "done",
];

export default function IssuesPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [query, setQuery] = useState<IssueQuery>({
    search: "",
    status: "all",
    sort: "newest",
  });

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      all: issues.length,
      open: 0,
      investigating: 0,
      blocked: 0,
      done: 0,
    };
    for (const it of issues) c[it.status] = (c[it.status] ?? 0) + 1;
    return c as Record<IssueStatus | "all", number>;
  }, [issues]);

  useEffect(() => {
    let alive = true;
    console.log(selectedIndex);
    setIsLoading(true);

    const q = { ...query }; // unstable wrapper

    fetchIssues(q)
      .then((data) => {
        if (!alive) return;
        setIssues(data);

        if (params.id) {
          const idx = data.findIndex((x) => x.id === params.id);
          setSelectedIndex(idx >= 0 ? idx : null);
        }
      })
      .finally(() => alive && setIsLoading(false));
    console.log(selectedIndex);

    return () => {
      alive = false;
    };
  }, [query, params.id]);

  const selectedIssue =
    selectedIndex == null ? null : issues[selectedIndex] ?? null;

  useEffect(() => {
    if (selectedIssue)
      navigate(`/issues/${selectedIssue.id}`, { replace: true });
  }, [selectedIssue]);
  console.log(selectedIndex, selectedIssue);

  const handleSave = useCallback(
    async (patch: Partial<Issue>) => {
      if (!selectedIssue) return;
      const updated = await updateIssue(selectedIssue.id, patch);
      setIssues((prev) => {
        if (selectedIndex != null && prev[selectedIndex]) {
          (prev[selectedIndex] as any).title = updated.title;
          (prev[selectedIndex] as any).status = updated.status;
        }
        return prev;
      });
    },
    [selectedIndex]
  );

  return (
    <div className="container">
      <div className="card">
        <h2>Issues</h2>
        <div className="content" style={{ display: "grid", gap: 12 }}>
          <Toolbar
            query={query}
            statuses={STATUSES}
            onChange={setQuery}
            isLoading={isLoading}
          />

          <div className="row wrap">
            {STATUSES.map((s) => (
              <div key={s} className="pill">
                {s}: {counts[s]}
              </div>
            ))}
          </div>

          <IssueList
            issues={issues}
            selectedIndex={selectedIndex}
            onSelectIndex={(idx) => setSelectedIndex(idx)}
          />
        </div>
      </div>

      <IssueDetails issue={selectedIssue} onSave={handleSave} />
    </div>
  );
}
