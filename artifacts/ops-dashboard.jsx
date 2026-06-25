import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react';

const OperationalDashboard = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [expandedPod, setExpandedPod] = useState(null);

  const pods = [
    {
      id: 'A',
      name: 'Command',
      color: '#E63B2E',
      agents: [
        { name: 'Claire', role: 'Ops Lead', phase: 'All', status: 'active', blocker: false },
        { name: 'Maria', role: 'Research Librarian', phase: '1', status: 'complete', blocker: false }
      ]
    },
    {
      id: 'B',
      name: 'Strategy',
      color: '#F2D024',
      agents: [
        { name: 'Weiss', role: 'Customer Insight', phase: '1-2', status: 'complete', blocker: false },
        { name: 'Heyward', role: 'Brand Strategist', phase: '2', status: 'complete', blocker: false },
        { name: 'Jenna', role: 'Product Strategy', phase: '2', status: 'complete', blocker: false }
      ]
    },
    {
      id: 'C',
      name: 'Product',
      color: '#8B7355',
      agents: [
        { name: 'Shreyas', role: 'PMF Lead', phase: '2', status: 'complete', blocker: false },
        { name: 'Andy', role: 'Fulfillment Ops', phase: '4', status: 'ready', blocker: false }
      ]
    },
    {
      id: 'D',
      name: 'Creative',
      color: '#D4A574',
      agents: [
        { name: 'Sean', role: 'Creative Director', phase: '3', status: 'complete', blocker: false },
        { name: 'Joanna', role: 'Copywriter', phase: '3', status: 'complete', blocker: false },
        { name: 'Kurt', role: 'UX Lead', phase: '3', status: 'complete', blocker: false },
        { name: 'Julie', role: 'UI Designer', phase: '3', status: 'complete', blocker: false }
      ]
    },
    {
      id: 'E',
      name: 'Build',
      color: '#6B9BD1',
      agents: [
        { name: 'Tobi', role: 'Platform Lead', phase: '4', status: 'blocked', blocker: 'Fynd access' },
        { name: 'James', role: 'QA Lead', phase: '4', status: 'ready', blocker: false }
      ]
    },
    {
      id: 'F',
      name: 'Growth',
      color: '#9B8B7E',
      agents: [
        { name: 'Nik', role: 'Launch Narrative', phase: '5', status: 'planned', blocker: false },
        { name: 'Avinash', role: 'Performance', phase: '5', status: 'planned', blocker: false },
        { name: 'Eli', role: 'Retention Lead', phase: '5-6', status: 'planned', blocker: false }
      ]
    },
    {
      id: 'G',
      name: 'Marketing',
      color: '#7B6B9D',
      agents: [
        { name: 'Andrew', role: 'Launch Ops', phase: '5', status: 'planned', blocker: false },
        { name: 'Chase', role: 'Social Lead', phase: '5', status: 'ready', blocker: false },
        { name: 'Rachel', role: 'Seeding Lead', phase: '5', status: 'ready', blocker: false }
      ]
    },
    {
      id: 'H',
      name: 'Content',
      color: '#6B9B8B',
      agents: [
        { name: 'Casey', role: 'Content Director', phase: '3,5', status: 'active', blocker: 'Dan photography' }
      ]
    },
    {
      id: 'I',
      name: 'Operations',
      color: '#9B7B6B',
      agents: [
        { name: 'Patrick', role: 'Finance Lead', phase: '1-2', status: 'complete', blocker: false },
        { name: 'Raj', role: 'Logistics', phase: '1', status: 'complete', blocker: false },
        { name: 'Tony', role: 'Launch Logistics', phase: '5-6', status: 'planned', blocker: false },
        { name: 'Lenny', role: 'Finance/Optimization', phase: '6', status: 'planned', blocker: false }
      ]
    }
  ];

  const phases = [
    { num: 1, name: 'Audit', status: 'complete', completion: 100 },
    { num: 2, name: 'Strategy', status: 'complete', completion: 100 },
    { num: 3, name: 'Creative', status: 'complete', completion: 100 },
    { num: 4, name: 'Build', status: 'active', completion: 0 },
    { num: 5, name: 'Launch', status: 'planned', completion: 0 },
    { num: 6, name: 'Optimize', status: 'planned', completion: 0 }
  ];

  const blockers = [
    { severity: 'critical', owner: 'Tobi', item: 'Fynd/Commerce.com store access credentials', unblocks: 'Entire build track' },
    { severity: 'critical', owner: 'Dan', item: 'Hero product photography (dark posterboard setup)', unblocks: 'Product pages, PDP' },
    { severity: 'critical', owner: 'Dan', item: 'Product copy for hero SKUs', unblocks: 'Product pages, PDP' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'complete': return '#22C55E';
      case 'active': return '#F2D024';
      case 'ready': return '#3B82F6';
      case 'blocked': return '#E63B2E';
      case 'planned': return '#6B7280';
      default: return '#9CA3AF';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'complete': return <CheckCircle size={16} />;
      case 'active': return <Zap size={16} />;
      case 'ready': return <Clock size={16} />;
      case 'blocked': return <AlertCircle size={16} />;
      case 'planned': return <TrendingUp size={16} />;
      default: return null;
    }
  };

  return (
    <div style={{
      background: '#1A1A1A',
      color: '#F5F0EB',
      minHeight: '100vh',
      fontFamily: '"Barlow Condensed", sans-serif',
      padding: '48px 32px'
    }}>

      {/* Header */}
      <div style={{ marginBottom: '48px', borderBottom: `2px solid #E63B2E`, paddingBottom: '24px' }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: 700,
          letterSpacing: '-1px',
          margin: '0 0 8px 0',
          color: '#F5F0EB'
        }}>
          Operations Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#9CA3AF',
          margin: '0',
          letterSpacing: '1px'
        }}>
          The Product Lab Relaunch — 25 Agents • 9 Pods • Phase 4 Active
        </p>
      </div>

      {/* Critical Blockers Section */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '16px',
          color: '#F2D024',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          ⚠ Critical Blockers
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {blockers.map((blocker, idx) => (
            <div key={idx} style={{
              background: 'rgba(230, 59, 46, 0.1)',
              border: `1px solid #E63B2E`,
              padding: '16px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                  {blocker.item}
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  Owner: <strong>{blocker.owner}</strong> • Unblocks: <strong>{blocker.unblocks}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Progress */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#F5F0EB',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Phase Progress
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {phases.map((phase) => (
            <div
              key={phase.num}
              onClick={() => setSelectedPhase(selectedPhase === phase.num ? null : phase.num)}
              style={{
                background: selectedPhase === phase.num ? 'rgba(242, 208, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${selectedPhase === phase.num ? '#F2D024' : 'rgba(255, 255, 255, 0.1)'}`,
                padding: '20px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#F2D024' }}>
                    {phase.num}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>
                    {phase.name}
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: phase.status === 'complete' ? '#22C55E' : phase.status === 'active' ? '#F2D024' : '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {phase.status === 'complete' ? '✓' : phase.status === 'active' ? '●' : '○'}
                </div>
              </div>
              <div style={{
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${phase.completion}%`,
                  background: '#E63B2E',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px', textAlign: 'right' }}>
                {phase.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pods Grid */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#F5F0EB',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Agent Pods
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {pods.map((pod) => (
            <div
              key={pod.id}
              onClick={() => setExpandedPod(expandedPod === pod.id ? null : pod.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${pod.color}`,
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: expandedPod === pod.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: expandedPod === pod.id ? `0 8px 32px rgba(${parseInt(pod.color.slice(1,3),16)}, ${parseInt(pod.color.slice(3,5),16)}, ${parseInt(pod.color.slice(5,7),16)}, 0.2)` : 'none'
              }}>

              {/* Pod Header */}
              <div style={{
                background: `linear-gradient(135deg, ${pod.color}20, ${pod.color}05)`,
                padding: '16px',
                borderBottom: `1px solid ${pod.color}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', letterSpacing: '1px', marginBottom: '4px' }}>
                    POD {pod.id}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: pod.color }}>
                    {pod.name}
                  </div>
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: pod.color
                }}>
                  {pod.agents.length}
                </div>
              </div>

              {/* Agents List */}
              <div style={{ padding: '16px' }}>
                {pod.agents.map((agent, idx) => {
                  const hasBlocker = agent.blocker !== false;
                  const statusColor = getStatusColor(agent.status);

                  return (
                    <div key={idx} style={{
                      marginBottom: idx < pod.agents.length - 1 ? '12px' : '0',
                      paddingBottom: idx < pod.agents.length - 1 ? '12px' : '0',
                      borderBottom: idx < pod.agents.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>
                            {agent.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                            {agent.role}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: statusColor
                        }}>
                          {getStatusIcon(agent.status)}
                          <span>{agent.status}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>
                        Phase {agent.phase}
                      </div>
                      {hasBlocker && (
                        <div style={{
                          marginTop: '6px',
                          padding: '6px 8px',
                          background: 'rgba(230, 59, 46, 0.2)',
                          border: `1px solid ${statusColor}`,
                          borderRadius: '3px',
                          fontSize: '11px',
                          color: statusColor
                        }}>
                          🔴 {agent.blocker}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pod Stats */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px 16px',
                borderTop: `1px solid ${pod.color}20`,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                fontSize: '11px'
              }}>
                <div>
                  <div style={{ color: '#9CA3AF' }}>Complete</div>
                  <div style={{ color: '#22C55E', fontWeight: 700, fontSize: '14px' }}>
                    {pod.agents.filter(a => a.status === 'complete').length}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9CA3AF' }}>Active</div>
                  <div style={{ color: '#F2D024', fontWeight: 700, fontSize: '14px' }}>
                    {pod.agents.filter(a => a.status === 'active' || a.status === 'ready').length}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9CA3AF' }}>Blocked</div>
                  <div style={{ color: '#E63B2E', fontWeight: 700, fontSize: '14px' }}>
                    {pod.agents.filter(a => a.status === 'blocked').length}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '24px',
        marginTop: '48px'
      }}>
        <h3 style={{ fontSize: '12px', color: '#9CA3AF', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
          Status Legend
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px'
        }}>
          {[
            { status: 'complete', label: 'Complete', color: '#22C55E' },
            { status: 'active', label: 'Active', color: '#F2D024' },
            { status: 'ready', label: 'Ready', color: '#3B82F6' },
            { status: 'blocked', label: 'Blocked', color: '#E63B2E' },
            { status: 'planned', label: 'Planned', color: '#6B7280' }
          ].map((item) => (
            <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.color
              }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '12px',
        color: '#6B7280',
        textAlign: 'right'
      }}>
        Updated 2026-03-27 • Phase 4 Gate Criteria: Fynd staging live, hero products uploaded, Razorpay live, Shiprocket AWBs live, GA4 tracking confirmed, LCP &lt;3s on 4G, James sign-off
      </div>
    </div>
  );
};

export default OperationalDashboard;
