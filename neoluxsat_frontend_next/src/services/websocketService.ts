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
    let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    // 1. FIX: Derive the secure WSS protocol URL.
    // Example: https://ostrog.pp.ua/api  ->  wss://ostrog.pp.ua/websocketsHub
    let rootUrl = apiUrl.replace(/\/api$/, "");

    // We must ensure WSS protocol is used for the connection builder.
    // If the deployment is HTTPS, the WebSocket MUST use WSS.
    let wssUrl = rootUrl.replace(/^https?:\/\//i, "wss://");

    const hubUrl = `${wssUrl}/websocketsHub`; // Final URL: wss://ostrog.pp.ua/websocketsHub

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,

        // 🔑 AGGRESSIVE FIX: Skip negotiation to prevent the proxy from dropping the handshake.
        skipNegotiation: true,

        // Setting protocol to 'https' ensures the initial request uses WSS/HTTPS scheme correctly
        // and provides maximum stability behind a reverse proxy.
        // This is often required by the SignalR client when dealing with non-standard setups.
        withCredentials: true,
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
