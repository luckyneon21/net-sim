import type { Action, DeviceId, SessionId, Snapshot, Tick } from "@net-sim/contracts";
import { Rng } from "./rng.js";

export class Simulation {
  private tick: Tick = 0;
  private readonly rng: Rng;

  constructor(
    private readonly sessionId: SessionId,
    seed = 1, // seed приходит из БД/сессии, НЕ Date.now()
  ) {
    this.rng = new Rng(seed);
  }

  apply(action: Action): void {
    switch (action.type) {
      case "device.add":  /* TODO chief: спринт 1 */ break;
      case "device.remove": break;
      case "link.set":    break;
      case "ping":        break; // ARP+ICMP — спринт 1
      case "reset":       this.tick = 0; break;
    }
  }

  /** 20 тиков/с; один вызов = один тик */
  step(): void { this.tick++; }

  snapshot(): Snapshot {
    return { sessionId: this.sessionId, tick: this.tick,
             devices: [], links: [], packets: [] };
  }
}

export { Rng };
export type { DeviceId };
