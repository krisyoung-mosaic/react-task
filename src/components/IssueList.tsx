import React from "react";
import { Issue } from "../types";

type Props = {
  issues: Issue[];
  selectedIndex: number | null;
  onSelectIndex: (idx: number) => void;
};

export default function IssueList({
  issues,
  selectedIndex,
  onSelectIndex,
}: Props) {
  return (
    <div className="list">
      {issues.map((issue, idx) => (
        <div
          key={idx}
          className={"item " + (selectedIndex === idx ? "selected" : "")}
          onClick={() => onSelectIndex(idx)}
        >
          <div style={{ minWidth: 74 }}>
            <div className="pill">{issue.status}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="title">{issue.title}</div>
            <div className="meta">
              <span className="muted">{issue.id}</span>
              <span>•</span>
              <span>p{issue.priority}</span>
              <span>•</span>
              <span>{issue.owner}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
