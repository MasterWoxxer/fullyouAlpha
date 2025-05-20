// Node types for workflow builder
export interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
}

export interface Connection {
  source: string;
  target: string;
  path: string;
}

export interface WorkflowVersion {
  nodes: WorkflowNode[];
  connections: Connection[];
}

export interface WorkflowTestConfig {
  isEnabled: boolean;
  versionATraffic: number;
  versionBTraffic: number;
  primaryMetric: string;
  testDuration: string;
}

export interface AssessmentScale {
  name: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
}

export interface TeamAssessmentData {
  scales: AssessmentScale[];
  lastVacation: number;
  lastSelfCare: number;
  burnoutRisk: number;
}

export interface TimeData {
  category: string;
  hours: number;
  color: string;
}

export interface TimeDistributionData {
  actual: TimeData[];
  optimal: TimeData[];
}

export interface CustomerRelationshipData {
  scales: AssessmentScale[];
}

export interface InteractionItem {
  id: number;
  title: string;
  description: string;
  date: Date;
  status: string;
  type: string;
  metadata: Record<string, string>;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}
