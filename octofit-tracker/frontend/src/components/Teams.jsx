import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    label: 'TEAM',
    render: (team) => <span className="data-table__primary">{team.name ?? 'Unnamed team'}</span>,
  },
  {
    label: 'ABOUT',
    render: (team) => team.description || <span className="data-table__muted">No description</span>,
  },
  {
    label: 'ATHLETES',
    className: 'data-table__numeric',
    render: (team) => Array.isArray(team.members) ? team.members.length : Number(team.memberCount ?? 0),
  },
  {
    label: 'TEAM ID',
    render: (team) => <span className="data-table__muted">{String(team._id ?? team.id ?? '-').slice(-6).toUpperCase()}</span>,
  },
]

export default function Teams() {
  return (
    <CollectionPage
      title="Teams"
      eyebrow="COMMUNITY / SQUADS"
      description="Training groups building momentum together."
      endpoint="teams"
      columns={columns}
      emptyTitle="No teams created"
    />
  )
}
