"use client";

import * as signalR from "@microsoft/signalr";
import type { NetworkProblemDto } from "@/types/networkProblem";
import type { ApplicationDto } from "@/types/application";
import type { RepairDto } from "@/types/repair";

const EVENTS = {
  PROBLEM_CREATED: "NetworkProblemCreated",
  PROBLEM_UPDATED: "NetworkProblemUpdated",
  PROBLEM_DELETED: "NetworkProblemDeleted",
};

class WebSocketService {
  private connection: signalR.HubConnection;
  private static instance: WebSocketService;

  private constructor() {
    let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    // Remove /api to get the root URL
    let rootUrl = apiUrl.replace(/\/api$/, "");

    const hubUrl = `${rootUrl}/websocketsHub`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public async start() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.connection.start();
      } catch (err) {
        console.error("SignalR Connection Start Failure: ", err);
        // Optional: Retry logic could go here
      }
    }
  }

  public async stop() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.stop();
    }
  }

  // --- Event Subscriptions ---

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

  public onNetworkProblemDeleted(callback: (id: string) => void) {
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

export const webSocketService = WebSocketService.getInstance();
