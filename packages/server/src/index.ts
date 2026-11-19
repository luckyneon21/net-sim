import { Simulation } from "@net-sim/sim-core";
// TODO(sub-B): Fastify gateway + ws worker, MessagePack, Redis pub/sub
const sim = new Simulation("stub-session");
console.log("server boot, tick =", sim.snapshot().tick);
