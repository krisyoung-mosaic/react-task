import React, { useEffect, useMemo, useState } from "react";
import { Issue, IssueStatus } from "../types";

type Props = {
  issue: Issue | null;
  onSave: (patch: { title: string; status: IssueStatus }) => Promise<void>;
};

export default function IssueDetails({ issue, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<IssueStatus>("open");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!issue) return;
    setTitle(issue.title);
    setStatus(issue.status);
  }, [issue]);

  const wordCount = useMemo(() => {
    if (!issue) return 0;
    const text = issue.title + " " + issue.description;
    return text.split(/\s+/).filter(Boolean).length;
  }, [issue]);

  if (!issue) {
    return (
      <div className="card">
        <h2>Details</h2>
        <div className="content muted">Select an issue…</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Details</h2>
      <div className="content" style={{ display: "grid", gap: 10 }}>
        <div className="row wrap">
          <div className="pill">{issue.id}</div>
          <div className="pill">
            Created {new Date(issue.createdAt).toLocaleString()}
          </div>
          <div className="pill">Owner {issue.owner}</div>
          <div className="pill">~{wordCount} words</div>
        </div>

        <label className="small">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="small">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as IssueStatus)}
        >
          <option value="open">open</option>
          <option value="investigating">investigating</option>
          <option value="blocked">blocked</option>
          <option value="done">done</option>
        </select>

        <label className="small">Description</label>
        <textarea value={issue.description} readOnly rows={7} />

        <div className="row">
          <button
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              try {
                await onSave({ title, status });
              } finally {
                setIsSaving(false);
              }
            }}
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
          <span className="small muted">
            Try: edit title, change filters/sort, navigate away and back.
          </span>
        </div>
      </div>
    </div>
  );
}
