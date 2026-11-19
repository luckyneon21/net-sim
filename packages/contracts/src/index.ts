// ===== Идентификаторы =====
export type DeviceId = string;
export type SessionId = string;
export type Tick = number;
export type VlanId = number;

// ===== Снапшот (что рисует клиент) =====
export type DeviceKind = "host" | "switch" | "router";

export interface SnapshotDevice {
  id: DeviceId;
  kind: DeviceKind;
  label: string;
  x: number;
  y: number;
  ips: string[];
  vlan?: VlanId | null;
  services?: ("dns" | "dhcp" | "http" | "https" | "smtp" | "sql")[];
  // L3 — router-specific
  routes?: SnapshotRoute[];
  dhcp_pools?: DhcpPool[];
  nat?: NatConfig;
  acl?: AclRule[];
  ospf?: OspfConfig;
}

export interface SnapshotRoute {
  dest: string;      // CIDR, e.g. "10.0.10.0/24"
  via: string;       // "direct" or next-hop IP
  iface: string;     // egress interface, e.g. "eth0"
  metric?: number;   // for RIP/OSPF
}

export interface DhcpPool {
  vlan: VlanId;
  range: [string, string];  // [start, end]
  gateway: string;
  dns: string;
  lease_time?: number;      // seconds, default 3600
}

export interface NatConfig {
  type: "snat" | "dnat" | "pat";
  inside_ifaces: string[];
  outside_iface: string;
  pool: string[];           // IP range for SNAT/PAT
  mappings?: DnatMapping[]; // for DNAT
}

export interface DnatMapping {
  external_ip: string;
  external_port: number;
  internal_ip: string;
  internal_port: number;
  proto: "tcp" | "udp";
}

export interface AclRule {
  action: "allow" | "deny";
  src: string;       // CIDR or "any"
  dst: string;       // CIDR or "any"
  proto: "tcp" | "udp" | "icmp" | "any";
  sport?: number;
  dport?: number;
  log?: boolean;
}

export interface OspfConfig {
  area: number;
  router_id: string; // e.g. "1.1.1.1"
  neighbors?: DeviceId[];
}

export interface SnapshotLink {
  a: DeviceId;
  b: DeviceId;
  bandwidthKbps: number;
  up: boolean;
  vlan_tag?: "trunk" | "access" | VlanId | null;
}

export interface SnapshotPacket {
  id: number;
  src: DeviceId;
  dst: DeviceId;
  l3: "ipv4" | "icmp" | "arp" | "dns" | "tcp" | "udp";
  ttl: number;
  progress: number; // 0..1 по линку
  payload?: string; // hex preview для Wireshark-lite
  flags?: string[]; // e.g. ["SYN"], ["ACK"]
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
  | { type: "dns_query"; src: DeviceId; name: string; server: DeviceId }
  | { type: "http_get"; src: DeviceId; dst: DeviceId; port: number; path?: string }
  | { type: "wait"; ticks: number }
  | { type: "load_topology"; preset: TopologyPreset }
  | { type: "reset" };

// ===== Topology Preset (JSON scenario file) =====
export interface TopologyPreset {
  name: string;
  level: number;
  description: string;
  devices: SnapshotDevice[];
  links: SnapshotLink[];
  scenarios?: Scenario[];
}

export interface Scenario {
  name: string;
  description: string;
  actions: Action[];
  expected?: string[];
}

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
  | { t: "error"; code: string; message: string }
  | { t: "scenario"; name: string; description: string }
  | { t: "topology_loaded"; preset: TopologyPreset };
