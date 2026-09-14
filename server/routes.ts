import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertTeamAssessmentSchema, 
  insertTimeDistributionSchema,
  insertWorkflowSchema,
  insertCustomerSchema,
  insertCustomerInteractionSchema
} from "@shared/schema";
import { getWorthItMap, createFocusItem, appendLensRating, deleteFocusItem, upsertPresentationState } from "./worthItStorage";

const createFocusItemSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  kind: z.string().optional(),
});

const appendLensRatingSchema = z.object({
  userId: z.string().min(1),
  focusItemId: z.number(),
  lensKey: z.string().min(1),
  value: z.number(),
  source: z.string().optional(),
});

const upsertPresentationSchema = z.object({
  userId: z.string().min(1),
  parked: z.boolean().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Users routes
  app.get("/api/users", async (req, res) => {
    const users = await storage.listUsers();
    res.json(users);
  });
  
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  });
  
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Team Assessments routes
  app.get("/api/team-assessments", async (req, res) => {
    const assessments = await storage.listTeamAssessments();
    res.json(assessments);
  });
  
  app.get("/api/team-assessments/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const assessment = await storage.getTeamAssessmentByUser(userId);
    
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    
    res.json(assessment);
  });
  
  app.post("/api/team-assessments", async (req, res) => {
    try {
      const assessmentData = insertTeamAssessmentSchema.parse(req.body);
      const assessment = await storage.createTeamAssessment(assessmentData);
      res.status(201).json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/team-assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessmentData = insertTeamAssessmentSchema.partial().parse(req.body);
      const updated = await storage.updateTeamAssessment(id, assessmentData);
      
      if (!updated) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Time Distribution routes
  app.get("/api/time-distributions/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const distribution = await storage.getTimeDistributionByUser(userId);
    
    if (!distribution) {
      return res.status(404).json({ message: "Time distribution not found" });
    }
    
    res.json(distribution);
  });
  
  app.post("/api/time-distributions", async (req, res) => {
    try {
      const distributionData = insertTimeDistributionSchema.parse(req.body);
      const distribution = await storage.createTimeDistribution(distributionData);
      res.status(201).json(distribution);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid time distribution data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/time-distributions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const distributionData = insertTimeDistributionSchema.partial().parse(req.body);
      const updated = await storage.updateTimeDistribution(id, distributionData);
      
      if (!updated) {
        return res.status(404).json({ message: "Time distribution not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid time distribution data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Workflow routes
  app.get("/api/workflows", async (req, res) => {
    const workflows = await storage.listWorkflows();
    res.json(workflows);
  });
  
  app.get("/api/workflows/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const workflow = await storage.getWorkflow(id);
    
    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }
    
    res.json(workflow);
  });
  
  app.post("/api/workflows", async (req, res) => {
    try {
      const workflowData = insertWorkflowSchema.parse(req.body);
      const workflow = await storage.createWorkflow(workflowData);
      res.status(201).json(workflow);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workflow data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/workflows/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workflowData = insertWorkflowSchema.partial().parse(req.body);
      const updated = await storage.updateWorkflow(id, workflowData);
      
      if (!updated) {
        return res.status(404).json({ message: "Workflow not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workflow data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/workflows/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await storage.deleteWorkflow(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Workflow not found" });
    }
    
    res.status(204).send();
  });
  
  // Customer routes
  app.get("/api/customers", async (req, res) => {
    const customers = await storage.listCustomers();
    res.json(customers);
  });
  
  app.get("/api/customers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const customer = await storage.getCustomer(id);
    
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    
    res.json(customer);
  });
  
  app.post("/api/customers", async (req, res) => {
    try {
      const customerData = insertCustomerSchema.parse(req.body);
      const existingCustomer = await storage.getCustomerByEmail(customerData.email);
      
      if (existingCustomer) {
        return res.status(409).json({ message: "Email already exists" });
      }
      
      const customer = await storage.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid customer data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/customers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const customerData = insertCustomerSchema.partial().parse(req.body);
      const updated = await storage.updateCustomer(id, customerData);
      
      if (!updated) {
        return res.status(404).json({ message: "Customer not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid customer data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Customer Interaction routes
  app.get("/api/customer-interactions/:customerId", async (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const interactions = await storage.listCustomerInteractions(customerId);
    res.json(interactions);
  });
  
  app.post("/api/customer-interactions", async (req, res) => {
    try {
      const interactionData = insertCustomerInteractionSchema.parse(req.body);
      const interaction = await storage.createCustomerInteraction(interactionData);
      res.status(201).json(interaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid interaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Worth-It routes (minimal persistent slice: items + event-sourced ratings only)
  app.get("/api/worth-it/map", async (req, res) => {
    try {
      const userId = String(req.query.userId ?? "");
      if (!userId) {
        return res.status(400).json({ message: "userId query param is required" });
      }
      const map = await getWorthItMap(userId);
      res.json(map);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/worth-it/items", async (req, res) => {
    try {
      const { userId, title, kind } = createFocusItemSchema.parse(req.body);
      const item = await createFocusItem(userId, title, kind);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/worth-it/ratings", async (req, res) => {
    try {
      const { userId, focusItemId, lensKey, value, source } = appendLensRatingSchema.parse(req.body);
      await appendLensRating(userId, focusItemId, lensKey, value, source);
      res.status(201).json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid rating data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/worth-it/items/:itemId", async (req, res) => {
    try {
      const userId = String(req.query.userId ?? "");
      const itemId = parseInt(req.params.itemId);
      if (!userId || Number.isNaN(itemId)) {
        return res.status(400).json({ message: "userId query param and numeric itemId are required" });
      }
      await deleteFocusItem(userId, itemId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/worth-it/presentation/:itemId", async (req, res) => {
    try {
      const itemId = parseInt(req.params.itemId);
      if (Number.isNaN(itemId)) {
        return res.status(400).json({ message: "numeric itemId is required" });
      }
      const { userId, ...patch } = upsertPresentationSchema.parse(req.body);
      await upsertPresentationState(userId, itemId, patch);
      res.status(200).json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid presentation data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
