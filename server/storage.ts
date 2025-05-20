import { 
  users, type User, type InsertUser,
  teamAssessments, type TeamAssessment, type InsertTeamAssessment,
  timeDistributions, type TimeDistribution, type InsertTimeDistribution,
  workflows, type Workflow, type InsertWorkflow,
  customers, type Customer, type InsertCustomer,
  customerInteractions, type CustomerInteraction, type InsertCustomerInteraction
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  listUsers(): Promise<User[]>;
  
  // Team Assessment methods
  getTeamAssessment(id: number): Promise<TeamAssessment | undefined>;
  getTeamAssessmentByUser(userId: number): Promise<TeamAssessment | undefined>;
  createTeamAssessment(assessment: InsertTeamAssessment): Promise<TeamAssessment>;
  updateTeamAssessment(id: number, assessment: Partial<InsertTeamAssessment>): Promise<TeamAssessment | undefined>;
  listTeamAssessments(): Promise<TeamAssessment[]>;
  
  // Time Distribution methods
  getTimeDistribution(id: number): Promise<TimeDistribution | undefined>;
  getTimeDistributionByUser(userId: number): Promise<TimeDistribution | undefined>;
  createTimeDistribution(distribution: InsertTimeDistribution): Promise<TimeDistribution>;
  updateTimeDistribution(id: number, distribution: Partial<InsertTimeDistribution>): Promise<TimeDistribution | undefined>;
  
  // Workflow methods
  getWorkflow(id: number): Promise<Workflow | undefined>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  updateWorkflow(id: number, workflow: Partial<InsertWorkflow>): Promise<Workflow | undefined>;
  deleteWorkflow(id: number): Promise<boolean>;
  listWorkflows(): Promise<Workflow[]>;
  
  // Customer methods
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  listCustomers(): Promise<Customer[]>;
  
  // Customer Interaction methods
  getCustomerInteraction(id: number): Promise<CustomerInteraction | undefined>;
  createCustomerInteraction(interaction: InsertCustomerInteraction): Promise<CustomerInteraction>;
  listCustomerInteractions(customerId: number): Promise<CustomerInteraction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teamAssessments: Map<number, TeamAssessment>;
  private timeDistributions: Map<number, TimeDistribution>;
  private workflows: Map<number, Workflow>;
  private customers: Map<number, Customer>;
  private customerInteractions: Map<number, CustomerInteraction>;
  
  private userIdCounter: number;
  private teamAssessmentIdCounter: number;
  private timeDistributionIdCounter: number;
  private workflowIdCounter: number;
  private customerIdCounter: number;
  private customerInteractionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.teamAssessments = new Map();
    this.timeDistributions = new Map();
    this.workflows = new Map();
    this.customers = new Map();
    this.customerInteractions = new Map();
    
    this.userIdCounter = 1;
    this.teamAssessmentIdCounter = 1;
    this.timeDistributionIdCounter = 1;
    this.workflowIdCounter = 1;
    this.customerIdCounter = 1;
    this.customerInteractionIdCounter = 1;
    
    // Initialize with sample data
    this.seedInitialData();
  }

  private seedInitialData() {
    // Create initial user
    const user: InsertUser = {
      username: "johndoe",
      password: "password123",
      name: "John Doe",
      role: "admin"
    };
    this.createUser(user);
    
    // Other seed data will be created when needed
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Team Assessment methods
  async getTeamAssessment(id: number): Promise<TeamAssessment | undefined> {
    return this.teamAssessments.get(id);
  }
  
  async getTeamAssessmentByUser(userId: number): Promise<TeamAssessment | undefined> {
    return Array.from(this.teamAssessments.values()).find(
      (assessment) => assessment.userId === userId
    );
  }
  
  async createTeamAssessment(assessment: InsertTeamAssessment): Promise<TeamAssessment> {
    const id = this.teamAssessmentIdCounter++;
    const now = new Date();
    const teamAssessment: TeamAssessment = { ...assessment, id, createdAt: now };
    this.teamAssessments.set(id, teamAssessment);
    return teamAssessment;
  }
  
  async updateTeamAssessment(id: number, assessment: Partial<InsertTeamAssessment>): Promise<TeamAssessment | undefined> {
    const existing = this.teamAssessments.get(id);
    if (!existing) return undefined;
    
    const updated: TeamAssessment = { ...existing, ...assessment };
    this.teamAssessments.set(id, updated);
    return updated;
  }
  
  async listTeamAssessments(): Promise<TeamAssessment[]> {
    return Array.from(this.teamAssessments.values());
  }
  
  // Time Distribution methods
  async getTimeDistribution(id: number): Promise<TimeDistribution | undefined> {
    return this.timeDistributions.get(id);
  }
  
  async getTimeDistributionByUser(userId: number): Promise<TimeDistribution | undefined> {
    return Array.from(this.timeDistributions.values()).find(
      (distribution) => distribution.userId === userId
    );
  }
  
  async createTimeDistribution(distribution: InsertTimeDistribution): Promise<TimeDistribution> {
    const id = this.timeDistributionIdCounter++;
    const now = new Date();
    const timeDistribution: TimeDistribution = { ...distribution, id, createdAt: now };
    this.timeDistributions.set(id, timeDistribution);
    return timeDistribution;
  }
  
  async updateTimeDistribution(id: number, distribution: Partial<InsertTimeDistribution>): Promise<TimeDistribution | undefined> {
    const existing = this.timeDistributions.get(id);
    if (!existing) return undefined;
    
    const updated: TimeDistribution = { ...existing, ...distribution };
    this.timeDistributions.set(id, updated);
    return updated;
  }
  
  // Workflow methods
  async getWorkflow(id: number): Promise<Workflow | undefined> {
    return this.workflows.get(id);
  }
  
  async createWorkflow(workflow: InsertWorkflow): Promise<Workflow> {
    const id = this.workflowIdCounter++;
    const now = new Date();
    const newWorkflow: Workflow = { ...workflow, id, createdAt: now };
    this.workflows.set(id, newWorkflow);
    return newWorkflow;
  }
  
  async updateWorkflow(id: number, workflow: Partial<InsertWorkflow>): Promise<Workflow | undefined> {
    const existing = this.workflows.get(id);
    if (!existing) return undefined;
    
    const updated: Workflow = { ...existing, ...workflow };
    this.workflows.set(id, updated);
    return updated;
  }
  
  async deleteWorkflow(id: number): Promise<boolean> {
    return this.workflows.delete(id);
  }
  
  async listWorkflows(): Promise<Workflow[]> {
    return Array.from(this.workflows.values());
  }
  
  // Customer methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }
  
  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.email === email
    );
  }
  
  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const id = this.customerIdCounter++;
    const now = new Date();
    const newCustomer: Customer = { ...customer, id, createdAt: now };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }
  
  async updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const existing = this.customers.get(id);
    if (!existing) return undefined;
    
    const updated: Customer = { ...existing, ...customer };
    this.customers.set(id, updated);
    return updated;
  }
  
  async listCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
  
  // Customer Interaction methods
  async getCustomerInteraction(id: number): Promise<CustomerInteraction | undefined> {
    return this.customerInteractions.get(id);
  }
  
  async createCustomerInteraction(interaction: InsertCustomerInteraction): Promise<CustomerInteraction> {
    const id = this.customerInteractionIdCounter++;
    const newInteraction: CustomerInteraction = { ...interaction, id };
    this.customerInteractions.set(id, newInteraction);
    return newInteraction;
  }
  
  async listCustomerInteractions(customerId: number): Promise<CustomerInteraction[]> {
    return Array.from(this.customerInteractions.values())
      .filter(interaction => interaction.customerId === customerId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}

// Create and export a storage instance
export const storage = new MemStorage();
