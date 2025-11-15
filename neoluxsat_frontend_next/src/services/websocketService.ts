"use client";

import * as signalR from "@microsoft/signalr";
import type { NetworkProblemDto } from "@/types/networkProblem";
import type { ApplicationDto } from "@/types/application";
import type { RepairDto } from "@/types/repair";

// Names of events we expect from the backend
const EVENTS = {
  PROBLEM_CREATED: "NetworkProblemCreated",
  PROBLEM_UPDATED: "NetworkProblemUpdated",
  PROBLEM_DELETED: "NetworkProblemDeleted",
};

class WebSocketService {
  private connection: signalR.HubConnection;
  private static instance: WebSocketService;

  // Constructor is private for singleton pattern
  private constructor() {
    // 1. 🔑 FIX URL CALCULATION: Get the base URL from the public environment variable.
    // We expect the environment variable to be: https://ostrog.pp.ua/api
    let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    // We strip off the '/api' part to get the root domain (https://ostrog.pp.ua)
    // This is much safer than fragile index slicing.
    let rootUrl = apiUrl.replace(/\/api$/, "");

    // The hub URL is now built on the root domain: https://ostrog.pp.ua/websocketsHub
    const hubUrl = `${rootUrl}/websocketsHub`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        // 2. 🔑 CRITICAL FIX: Force WebSockets as the transport protocol.
        // This stops the fragile negotiation fallback to SSE/Long Polling.
        transport: signalR.HttpTransportType.WebSockets,

        // 3. Optional: Add required headers, although Nginx should handle this:
        headers: {
          "X-Forwarded-Proto": "https",
        },
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  // Method to get the single instance of the service
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Launch connection (if not already established)
  public async start() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.connection.start();
      } catch (err) {
        // This will log the final negotiation error in the console
        console.error("SignalR Connection Start Failure: ", err);
      }
    }
  }

  // Зупинка з'єднання
  public async stop() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.stop();
    }
  }

  // --- Методи підписки на події ---

  public onNetworkProblemCreated(
    callback: (problem: NetworkProblemDto) => void
  ) {
    this.connection.on(EVENTS.PROBLEM_CREATED, callback);
  }
  public offNetworkProblemCreated(
    callback: (problem: NetworkProblemDto) => void
  ) {
    this.connection.off(EVENTS.PROBLEM_CREATED, callback);
  }

  public onNetworkProblemUpdated(
    callback: (problem: NetworkProblemDto) => void
  ) {
    this.connection.on(EVENTS.PROBLEM_UPDATED, callback);
  }
  public offNetworkProblemUpdated(
    callback: (problem: NetworkProblemDto) => void
  ) {
    this.connection.off(EVENTS.PROBLEM_UPDATED, callback);
  }

  public onNetworkProblemDeleted(
    // Припускаємо, що бекенд надсилає ID видаленої сутності
    callback: (id: string) => void
  ) {
    this.connection.on(EVENTS.PROBLEM_DELETED, callback);
  }
  public offNetworkProblemDeleted(callback: (id: string) => void) {
    this.connection.off(EVENTS.PROBLEM_DELETED, callback);
  }

  public onApplicationCreated(callback: (application: ApplicationDto) => void) {
    this.connection.on("ApplicationCreated", callback);
  }

  public offApplicationCreated(
    callback: (application: ApplicationDto) => void
  ) {
    this.connection.off("ApplicationCreated", callback);
  }

  public onApplicationUpdated(callback: (application: ApplicationDto) => void) {
    this.connection.on("ApplicationUpdated", callback);
  }

  public offApplicationUpdated(
    callback: (application: ApplicationDto) => void
  ) {
    this.connection.off("ApplicationUpdated", callback);
  }

  public onApplicationDeleted(callback: (id: string) => void) {
    this.connection.on("ApplicationDeleted", callback);
  }

  public offApplicationDeleted(callback: (id: string) => void) {
    this.connection.off("ApplicationDeleted", callback);
  }

  public onRepairCreated(callback: (repair: RepairDto) => void) {
    this.connection.on("RepairCreated", callback);
  }

  public offRepairCreated(callback: (repair: RepairDto) => void) {
    this.connection.off("RepairCreated", callback);
  }

  public onRepairUpdated(callback: (repair: RepairDto) => void) {
    this.connection.on("RepairUpdated", callback);
  }

  public offRepairUpdated(callback: (repair: RepairDto) => void) {
    this.connection.off("RepairUpdated", callback);
  }

  public onRepairDeleted(callback: (id: string) => void) {
    this.connection.on("RepairDeleted", callback);
  }

  public offRepairDeleted(callback: (id: string) => void) {
    this.connection.off("RepairDeleted", callback);
  }
}

// Експортуємо один екземпляр на весь додаток
export const webSocketService = WebSocketService.getInstance();
