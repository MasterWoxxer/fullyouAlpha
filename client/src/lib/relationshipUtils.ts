import { AssessmentScale } from './types';

/**
 * Calculates the position of the marker on a scale as a percentage
 * @param value The value on the scale (0-100)
 * @returns A string representing the percentage position
 */
export const calculateMarkerPosition = (value: number): string => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.max(5, Math.min(95, value));
  return `${clampedValue}%`;
};

/**
 * Updates a scale value based on a new position
 * @param scales The array of scales
 * @param index The index of the scale to update
 * @param newValue The new value for the scale
 * @returns A new array with the updated scale
 */
export const updateScaleValue = (
  scales: AssessmentScale[],
  index: number,
  newValue: number
): AssessmentScale[] => {
  return scales.map((scale, i) => {
    if (i === index) {
      return { ...scale, value: newValue };
    }
    return scale;
  });
};

/**
 * Calculates burnout risk based on various factors
 * @param lastVacation Days since last vacation
 * @param lastSelfCare Days since last self-care activity
 * @param energyLevel Energy level score (0-100)
 * @param hopeLevel Hope level score (0-100)
 * @returns A score from 0-100 representing burnout risk (higher is more risk)
 */
export const calculateBurnoutRisk = (
  lastVacation: number,
  lastSelfCare: number,
  energyLevel: number,
  hopeLevel: number
): number => {
  // Base risk starts at 50
  let risk = 50;
  
  // Factor in time since last vacation
  if (lastVacation > 90) risk += 15;
  else if (lastVacation > 60) risk += 10;
  else if (lastVacation > 30) risk += 5;
  else risk -= 5;
  
  // Factor in time since self-care
  if (lastSelfCare > 20) risk += 10;
  else if (lastSelfCare > 10) risk += 5;
  else if (lastSelfCare > 5) risk += 0;
  else risk -= 5;
  
  // Factor in energy level (invert: lower energy = higher risk)
  risk += (100 - energyLevel) * 0.2;
  
  // Factor in hope level (invert: lower hope = higher risk)
  risk += (100 - hopeLevel) * 0.2;
  
  // Ensure risk is within 0-100
  return Math.max(0, Math.min(100, risk));
};

/**
 * Creates a random identifier for workflow nodes
 */
export const createNodeId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Generates an SVG path for connecting workflow nodes
 */
export const generateConnectionPath = (
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number
): string => {
  const midX = (sourceX + targetX) / 2;
  return `M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`;
};

/**
 * Creates default team assessment scales
 */
export const createDefaultTeamScales = (): AssessmentScale[] => {
  return [
    {
      name: "ENERGY",
      leftLabel: "EXHAUSTED BEYOND BELIEF",
      rightLabel: "READY TO RUN A MARATHON",
      value: 35
    },
    {
      name: "AUTONOMY",
      leftLabel: "HELPLESS SLAVERY",
      rightLabel: "TOTAL CONTROL OVER MY WORK & LIFE",
      value: 60
    },
    {
      name: "HOPE",
      leftLabel: "DESPAIR HOPELESS",
      rightLabel: "IT'S ALL WORKING OUT PERFECTLY",
      value: 75
    },
    {
      name: "CLARITY",
      leftLabel: "LOST DIRECTIONLESS",
      rightLabel: "MISSION & PURPOSE ALL ALIGN",
      value: 82
    },
    {
      name: "SAFETY",
      leftLabel: "ROCKETS FALLING ON MY HEAD",
      rightLabel: "SAFE, SECURE & RELAXED",
      value: 70
    }
  ];
};

/**
 * Creates default customer relationship scales
 */
export const createDefaultCustomerScales = (): AssessmentScale[] => {
  return [
    {
      name: "BRAND PERCEPTION",
      leftLabel: "Low Status/No Class",
      rightLabel: "High Status/Super Classy",
      value: 75
    },
    {
      name: "PURCHASING CONSIDERATION",
      leftLabel: "Not Considering Purchase",
      rightLabel: "Actively Considering",
      value: 45
    },
    {
      name: "CUSTOMER LOYALTY",
      leftLabel: "One-time Purchaser",
      rightLabel: "Brand Ambassador",
      value: 60
    },
    {
      name: "CUSTOMER SATISFACTION",
      leftLabel: "Completely Dissatisfied",
      rightLabel: "Extremely Satisfied",
      value: 80
    }
  ];
};

/**
 * Creates default time distribution data
 */
export const createDefaultTimeDistribution = (): {
  actual: { category: string; hours: number; color: string }[];
  optimal: { category: string; hours: number; color: string }[];
} => {
  return {
    actual: [
      { category: "SLEEP", hours: 7, color: "#3B82F6" },
      { category: "WORK", hours: 9, color: "#10B981" },
      { category: "FAMILY", hours: 3, color: "#8B5CF6" },
      { category: "FITNESS", hours: 1, color: "#EF4444" },
      { category: "MEALS", hours: 2, color: "#F59E0B" },
      { category: "FRIENDS", hours: 2, color: "#06B6D4" }
    ],
    optimal: [
      { category: "SLEEP", hours: 8, color: "#3B82F6" },
      { category: "WORK", hours: 8, color: "#10B981" },
      { category: "FAMILY", hours: 4, color: "#8B5CF6" },
      { category: "FITNESS", hours: 1.5, color: "#EF4444" },
      { category: "MEALS", hours: 1.5, color: "#F59E0B" },
      { category: "FRIENDS", hours: 1, color: "#06B6D4" }
    ]
  };
};

/**
 * Creates default customer interactions
 */
export const createDefaultCustomerInteractions = (): any[] => {
  const now = new Date();
  
  return [
    {
      id: 1,
      title: "Support Ticket #4329",
      description: "Product integration issue resolved",
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "Resolved",
      type: "support",
      metadata: {
        responseTime: "1.5 hrs"
      }
    },
    {
      id: 2,
      title: "Product Purchase",
      description: "Premium subscription plan",
      date: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      status: "$1,200 Sale",
      type: "purchase",
      metadata: {
        channel: "Website"
      }
    },
    {
      id: 3,
      title: "Product Demo",
      description: "Enterprise solution demonstration",
      date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      status: "30 min call",
      type: "demo",
      metadata: {
        salesRep: "Michael"
      }
    },
    {
      id: 4,
      title: "Website Sign-up",
      description: "Initial contact through marketing campaign",
      date: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      status: "Lead Generated",
      type: "signup",
      metadata: {
        source: "Google Ads"
      }
    }
  ];
};
