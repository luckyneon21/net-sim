# Статус работ — живой журнал

> Каждый агент обновляет ТОЛЬКО свой раздел. Chief читает всё и пишет в раздел «Вердикт chief».
> Формат: `- [ ] задача — статус (что сделано, что блокирует)`

## sub-A (client, Kimi №2)
- [ ] packages/client собирается (vite build) — не начато
- [ ] Canvas-рендер устройств и линков — не начато
- [ ] HUD (тик, FPS, счётчик пакетов) — не начато
- [ ] Wireshark-lite (таблица пакетов) — не начато

## sub-B (server, ChatGPT)
- [ ] packages/server запускается (npm run dev) — не начато
- [ ] Fastify gateway + WebSocket endpoint — не начато
- [ ] Worker-процесс с симуляцией — не начато
- [ ] MessagePack wire format — не начато

## chief (sim-core + contracts)
- [x] Монорепо-скелет, npm workspaces, docker-compose — **готово**
- [x] contracts v1 — **готово** (VLAN, DHCP, NAT, ACL, OSPF)
- [x] TEAM-CHARTER + PROMPT-00/01/02 загружены в `docs/` — **готово**
- [ ] sim-core спринт 1 (ARP+ICMP, MAC-таблицы, golden-master harness) — в процессе

## Вердикт chief
- **2026-11-20**: Contracts v1 финализированы. **Оба помощника могут начинать работу.** sub-A имеет полные типы для Canvas-рендера. sub-B имеет полные типы для Gateway/Worker. Ожидаю первые PR.
