import * as signalR from '@microsoft/signalr';
import type { NetworkProblemDto } from '@/types/networkProblem';
import type { ApplicationDto } from '@/types/application';
import type { RepairDto } from '@/types/repair';

// Назви подій, які ми очікуємо від бекенду
const EVENTS = {
  PROBLEM_CREATED: 'NetworkProblemCreated',
  PROBLEM_UPDATED: 'NetworkProblemUpdated', // Припускаємо, що ви додасте це
  PROBLEM_DELETED: 'NetworkProblemDeleted', // Припускаємо, що ви додасте це
};

class WebSocketService {
  private connection: signalR.HubConnection;
  private static instance: WebSocketService;

  // Конструктор робимо приватним для сінглтона
  private constructor() {
    let apiUrl = import.meta.env.VITE_API_BASE_URL;
    apiUrl = apiUrl.slice(0, apiUrl.length - 4);
    // Шлях до хабу, який ми вказали у Program.cs
    const hubUrl = `${apiUrl}/websocketsHub`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect() // Дуже корисна функція
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  // Метод для отримання єдиного екземпляра сервісу
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Запуск з'єднання (якщо воно ще не встановлене)
  public async start() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.connection.start();
      } catch (err) {
        console.error('SignalR Connection Error: ', err);
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
    this.connection.on('ApplicationCreated', callback);
  }

  public offApplicationCreated(
    callback: (application: ApplicationDto) => void
  ) {
    this.connection.off('ApplicationCreated', callback);
  }

  public onApplicationUpdated(callback: (application: ApplicationDto) => void) {
    this.connection.on('ApplicationUpdated', callback);
  }

  public offApplicationUpdated(
    callback: (application: ApplicationDto) => void
  ) {
    this.connection.off('ApplicationUpdated', callback);
  }

  public onApplicationDeleted(callback: (id: string) => void) {
    this.connection.on('ApplicationDeleted', callback);
  }

  public offApplicationDeleted(callback: (id: string) => void) {
    this.connection.off('ApplicationDeleted', callback);
  }

  public onRepairCreated(callback: (repair: RepairDto) => void) {
    this.connection.on('RepairCreated', callback);
  }

  public offRepairCreated(callback: (repair: RepairDto) => void) {
    this.connection.off('RepairCreated', callback);
  }

  public onRepairUpdated(callback: (repair: RepairDto) => void) {
    this.connection.on('RepairUpdated', callback);
  }

  public offRepairUpdated(callback: (repair: RepairDto) => void) {
    this.connection.off('RepairUpdated', callback);
  }

  public onRepairDeleted(callback: (id: string) => void) {
    this.connection.on('RepairDeleted', callback);
  }

  public offRepairDeleted(callback: (id: string) => void) {
    this.connection.off('RepairDeleted', callback);
  }
}

// Експортуємо один екземпляр на весь додаток
export const webSocketService = WebSocketService.getInstance();
