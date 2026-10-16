import React, { useState, useEffect } from 'react';
import { actionHistory } from '../../store/middleware/libraryMiddleware';

/**
 * ReduxActivityLogger Component
 * Visualizes the custom Redux middleware action monitoring on screen
 * Topics: Middleware Action Monitoring (Requirement 6.d)
 */
export default function ReduxActivityLogger() {
  const [logs, setLogs] = useState([...actionHistory]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleActionLogged = (e) => {
      setLogs((prev) => [e.detail, ...prev.slice(0, 7)]);
    };

    window.addEventListener('redux-action-logged', handleActionLogged);
    return () => window.removeEventListener('redux-action-logged', handleActionLogged);
  }, []);

  return (
    <div className="redux-activity-logger" style={{
      background: '#3d0b1a',
      color: '#fbf3f4',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      marginBottom: '1.25rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      fontSize: '0.85rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🛡️</span>
          <strong>Redux Middleware Action Monitor (Experiment 6.d)</strong>
          <span style={{
            fontSize: '0.7rem',
            background: '#5e1229',
            color: '#e3b960',
            padding: '0.15rem 0.45rem',
            borderRadius: '9999px',
            fontFamily: 'monospace'
          }}>
            middleware active
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            color: '#d9bcc3',
            border: 'none',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          {isOpen ? '▲ Collapse' : '▼ Expand Logs'}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '0.65rem', borderTop: '1px solid #5e1229', paddingTop: '0.5rem' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#d9bcc3', fontStyle: 'italic', padding: '0.25rem 0' }}>
              No actions dispatched yet. Interact with the catalog or borrowing buttons to monitor live actions.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '140px', overflowY: 'auto' }}>
              {logs.map((log) => (
                <div key={log.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#2a0813',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem'
                }}>
                  <span style={{ color: '#e3b960' }}>⚡ {log.type}</span>
                  <span style={{ color: '#d9bcc3' }}>{log.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
