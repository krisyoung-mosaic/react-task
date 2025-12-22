import { IssueQuery, IssueStatus } from "../types";

type Props = {
  query: IssueQuery;
  statuses: (IssueStatus | "all")[];
  onChange: (next: IssueQuery) => void;
  isLoading: boolean;
};

export default function Toolbar({ query, statuses, onChange, isLoading }: Props) {
  return (
    <div className="row wrap">
      <input
        style={{ flex: 1, minWidth: 220 }}
        placeholder="Search title/description/owner..."
        value={query.search}
        onChange={(e) => onChange({ ...query, search: e.target.value })}
      />
      <select value={query.status} onChange={(e) => onChange({ ...query, status: e.target.value as any })}>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select value={query.sort} onChange={(e) => onChange({ ...query, sort: e.target.value as any })}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority_desc">Priority ↓</option>
        <option value="priority_asc">Priority ↑</option>
      </select>
      <div className="pill">
        {isLoading ? <span className="row"><span className="spinner" />&nbsp;Loading</span> : "Idle"}
      </div>
    </div>
  );
}
