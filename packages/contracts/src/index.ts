// ===== Идентификаторы =====
export type DeviceId = string;
export type SessionId = string;
export type Tick = number;

// ===== Снапшот (что рисует клиент) =====
export type DeviceKind = "host" | "switch" | "router";

export interface SnapshotDevice {
  id: DeviceId;
  kind: DeviceKind;
  label: string;
  x: number;
  y: number;
  ips: string[];
}

export interface SnapshotLink {
  a: DeviceId;
  b: DeviceId;
  bandwidthKbps: number;
  up: boolean;
}

export interface SnapshotPacket {
  id: number;
  src: DeviceId;
  dst: DeviceId;
  l3: "ipv4" | "icmp" | "arp";
  ttl: number;
  progress: number; // 0..1 по линку
}

export interface Snapshot {
  sessionId: SessionId;
  tick: Tick;
  devices: SnapshotDevice[];
  links: SnapshotLink[];
  packets: SnapshotPacket[];
}

// ===== Действия (что шлёт клиент) =====
export type Action =
  | { type: "device.add"; device: Omit<SnapshotDevice, "ips"> & { ip?: string } }
  | { type: "device.remove"; id: DeviceId }
  | { type: "link.set"; a: DeviceId; b: DeviceId; up: boolean }
  | { type: "ping"; src: DeviceId; dst: DeviceId }
  | { type: "reset" };

// ===== Сообщения WebSocket =====
export type ClientMessage =
  | { t: "join"; sessionId: SessionId }
  | { t: "action"; seq: number; action: Action }
  | { t: "hb" }; // heartbeat 5 с

export type ServerMessage =
  | { t: "welcome"; sessionId: SessionId }
  | { t: "ack"; seq: number }
  | { t: "snapshot"; snapshot: Snapshot }
  | { t: "pong" }
  | { t: "error"; code: string; message: string };
