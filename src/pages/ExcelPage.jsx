import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ExcelPage.css'

const SIDEBAR_ITEMS = [
  {
    section: 'Master Data',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    items: ['Chart of Accounts', 'Cost Centers', 'Currencies', 'Tax Codes', 'Vendors', 'Customers'],
  },
  {
    section: 'Financial Data',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    items: ['General Ledger', 'Trial Balance', 'P&L Statement', 'Balance Sheet', 'Cash Flow', 'Budgets'],
  },
  {
    section: 'Sync Data',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>
      </svg>
    ),
    items: ['Live Sync', 'Schedule Sync', 'Sync History', 'Conflict Resolution'],
  },
  {
    section: 'Import / Export',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    items: ['Import from Excel', 'Export to Excel', 'Export to PDF', 'Bulk Import', 'Templates'],
  },
]

const COLUMN_COUNT = 12
const ROW_COUNT = 40
const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, index) => String.fromCharCode(65 + index))
const ROWS = Array.from({ length: ROW_COUNT }, (_, index) => index + 1)
const SHEETS = ['Sheet1', 'Sheet2', 'Sheet3']

function ExcelPage() {
  const navigate = useNavigate()
  const [creds, setCreds] = useState(null)
  const [activeSheet, setActiveSheet] = useState(0)
  const [activeSideItem, setActiveSideItem] = useState('P&L Statement')
  const [expandedSections, setExpandedSections] = useState({ 'Master Data': false, 'Financial Data': true, 'Sync Data': false, 'Import / Export': false })
  const [selectedCell, setSelectedCell] = useState(null)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState('Just now')

  useEffect(() => {
    const stored = localStorage.getItem('fa_credentials')
    if (!stored) { navigate('/credentials'); return }
    setCreds(JSON.parse(stored))
  }, [navigate])

  const toggleSection = (section) => {
    setExpandedSections((s) => ({ ...s, [section]: !s[section] }))
  }

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setLastSync(new Date().toLocaleTimeString())
    }, 1800)
  }

  const cellAddress = selectedCell
    ? `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}`
    : 'A1'

  if (!creds) return null

  return (
    <div className="excel-app">
      {/* ── TOP RIBBON ─────────────────────────────────────── */}
      <header className="excel-ribbon" role="banner">
        <div className="excel-windowbar">
          <div className="excel-windowbar__left"><span className="excel-windowbar__app">X</span><span>AutoSave</span><span className="excel-windowbar__toggle" aria-hidden="true" /><span className="excel-windowbar__save">▣</span><span className="excel-windowbar__title">Book1 - Excel</span></div>
          <div className="excel-windowbar__right"><span className="excel-windowbar__avatar">MG</span><button className="excel-windowbar__buy">◇ Buy Microsoft 365</button><span>—</span><span>□</span><span>×</span></div>
        </div>
        <nav className="excel-menu" aria-label="Excel menu"><button>File</button><button className="excel-menu__active">Home</button><button>Insert</button><button>Draw</button><button>Page Layout</button><button>Formulas</button><button>Data</button><button>Review</button><button>View</button><button>Help</button><span className="excel-menu__search">⌕&nbsp; Tell me what you want to do</span><button className="excel-menu__share">Share</button></nav>
        {/* Brand */}
        <div className="excel-ribbon__brand">
          <div className="excel-ribbon__logo" aria-label="FinAccrual">FN</div>
          <div>
            <span className="excel-ribbon__appname">FinAccrual</span>
            <span className="excel-ribbon__separator">·</span>
            <span className="excel-ribbon__filename">Book1.xlsx</span>
          </div>
        </div>

        {/* Toolbar groups */}
        <nav className="excel-ribbon__tools" aria-label="Toolbar">
          <div className="ribbon-group" aria-label="File operations">
            <button className="ribbon-btn" id="ribbon-new" title="New">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              New
            </button>
            <button className="ribbon-btn" id="ribbon-save" title="Save">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save
            </button>
          </div>
          <div className="ribbon-divider" aria-hidden="true" />
          <div className="ribbon-group" aria-label="Data operations">
            <button className="ribbon-btn ribbon-btn--primary" id="ribbon-sync" title="Sync Data" onClick={handleSync} disabled={syncing} aria-busy={syncing}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={syncing ? 'spin' : ''}><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
              {syncing ? 'Syncing…' : 'Sync'}
            </button>
            <button className="ribbon-btn" id="ribbon-import" title="Import">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Import
            </button>
            <button className="ribbon-btn" id="ribbon-export" title="Export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Export
            </button>
            <button className="ribbon-btn" id="ribbon-report" title="Generate Report">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              Report
            </button>
          </div>
          <div className="ribbon-divider" aria-hidden="true" />
          <div className="ribbon-group" aria-label="View options">
            <button className="ribbon-btn" id="ribbon-filter" title="Filter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
            <button className="ribbon-btn" id="ribbon-chart" title="Chart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Chart
            </button>
          </div>
        </nav>

        {/* User */}
        <div className="excel-ribbon__user" aria-label="User information">
          <div className="excel-ribbon__user-avatar" aria-hidden="true">
            {creds.userId.slice(-2).toUpperCase()}
          </div>
          <div className="excel-ribbon__user-info">
            <span className="excel-ribbon__user-id">{creds.userId}</span>
            <span className="excel-ribbon__sync-time">Synced: {lastSync}</span>
          </div>
          <button className="ribbon-btn ribbon-btn--danger" id="ribbon-close" title="Close" onClick={() => navigate('/credentials')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* ── FORMULA BAR ─────────────────────────────────────── */}
      <div className="excel-formula-bar" role="toolbar" aria-label="Formula bar">
        <div className="formula-cell-ref" aria-label={`Selected cell: ${cellAddress}`}>{cellAddress}</div>
        <div className="formula-separator" aria-hidden="true">fx</div>
        <div className="formula-input" aria-label="Cell value">
          {selectedCell
            ? ''
            : ''}
        </div>
      </div>

      {/* ── MAIN BODY ────────────────────────────────────────── */}
      <div className="excel-body">
        {/* Sidebar */}
        <aside className="excel-sidebar" role="complementary" aria-label="FinAccrual task pane">
          <div className="excel-sidebar__header">
            <div className="excel-sidebar__logo" aria-hidden="true">FN</div>
            <div>
              <div className="excel-sidebar__title">FinAccrual</div>
              <div className="excel-sidebar__subtitle">Task Pane</div>
            </div>
          </div>

          {/* FA ID badge */}
          <div className="excel-sidebar__id-badge" aria-label={`FinAccrual ID: ${creds.id}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            {creds.id}
          </div>

          {/* Navigation */}
          <nav className="excel-sidebar__nav" aria-label="FinAccrual navigation">
            {SIDEBAR_ITEMS.map((group) => (
              <div key={group.section} className="sidebar-group">
                <button
                  className={`sidebar-group__header ${expandedSections[group.section] ? 'sidebar-group__header--open' : ''}`}
                  onClick={() => toggleSection(group.section)}
                  aria-expanded={expandedSections[group.section]}
                  aria-controls={`sidebar-group-${group.section.replace(/\s/g, '-')}`}
                >
                  <span className="sidebar-group__icon" aria-hidden="true">{group.icon}</span>
                  <span className="sidebar-group__label">{group.section}</span>
                  <svg className="sidebar-group__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {expandedSections[group.section] && (
                  <ul className="sidebar-group__items" id={`sidebar-group-${group.section.replace(/\s/g, '-')}`} role="list">
                    {group.items.map((item) => (
                      <li key={item}>
                        <button
                          className={`sidebar-item ${activeSideItem === item ? 'sidebar-item--active' : ''}`}
                          onClick={() => setActiveSideItem(item)}
                          aria-current={activeSideItem === item ? 'page' : undefined}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* Quick stats */}
          <div className="excel-sidebar__stats" aria-label="Quick statistics">
            <div className="excel-sidebar__stat">
              <span className="excel-sidebar__stat-label">Net Income Q1</span>
              <span className="excel-sidebar__stat-value excel-sidebar__stat-value--green">$121,612</span>
            </div>
            <div className="excel-sidebar__stat">
              <span className="excel-sidebar__stat-label">YoY Growth</span>
              <span className="excel-sidebar__stat-value excel-sidebar__stat-value--green">+18.4%</span>
            </div>
            <div className="excel-sidebar__stat">
              <span className="excel-sidebar__stat-label">Accounts</span>
              <span className="excel-sidebar__stat-value">342</span>
            </div>
          </div>
        </aside>

        {/* Spreadsheet area */}
        <main className="excel-sheet-area" role="main" aria-label="Spreadsheet">
          {/* Sheet tabs */}
          <div className="excel-tabs" role="tablist" aria-label="Worksheets">
            {SHEETS.map((s, i) => (
              <button
                key={s}
                role="tab"
                className={`excel-tab ${activeSheet === i ? 'excel-tab--active' : ''}`}
                onClick={() => setActiveSheet(i)}
                aria-selected={activeSheet === i}
                id={`sheet-tab-${i}`}
                aria-controls={`sheet-panel-${i}`}
              >
                {s}
              </button>
            ))}
            <button className="excel-tab excel-tab--add" aria-label="Add sheet" title="New Sheet">+</button>
          </div>

          {/* Spreadsheet grid */}
          <div
            className="excel-grid-wrap"
            role="tabpanel"
            id={`sheet-panel-${activeSheet}`}
            aria-labelledby={`sheet-tab-${activeSheet}`}
          >
            <table className="excel-grid" aria-label="Blank spreadsheet">
              <thead>
                <tr>
                  <th className="excel-row-header" scope="col" aria-label="Row numbers" />
                  {COLUMNS.map((column) => (
                    <th key={column} scope="col" className="excel-col-header" aria-label={`Column ${column}`}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((rowNumber, rIdx) => (
                    <tr key={rowNumber} className="excel-row">
                      <td className="excel-row-number" aria-label={`Row ${rowNumber}`}>{rowNumber}</td>
                      {COLUMNS.map((column, cIdx) => {
                        const isSelected = selectedCell?.row === rIdx && selectedCell?.col === cIdx
                        return (
                          <td
                            key={cIdx}
                            className={`excel-cell ${isSelected ? 'excel-cell--selected' : ''}`}
                            onClick={() => setSelectedCell({ row: rIdx, col: cIdx })}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setSelectedCell({ row: rIdx, col: cIdx })}
                            role="gridcell"
                            aria-label={`Cell ${column}${rowNumber}`}
                          />
                        )
                      })}
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* ── STATUS BAR ──────────────────────────────────────── */}
      <footer className="excel-statusbar" role="contentinfo" aria-label="Status bar">
        <div className="statusbar-left">
          <span className="statusbar-item" aria-label="Current sheet">{SHEETS[activeSheet]}</span>
          <span className="statusbar-sep" aria-hidden="true">|</span>
          <span className="statusbar-item">Ready</span>
          <span className="statusbar-sep" aria-hidden="true">|</span>
          <span className={`statusbar-sync ${syncing ? 'statusbar-sync--syncing' : 'statusbar-sync--ok'}`} aria-live="polite">
            {syncing ? '⟳ Syncing with FinAccrual…' : '✓ Synced'}
          </span>
        </div>
        <div className="statusbar-right" aria-label="Spreadsheet statistics">
          <span className="statusbar-item" aria-label="Zoom level">100%</span>
        </div>
      </footer>
    </div>
  )
}

export default ExcelPage
