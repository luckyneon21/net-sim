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
- [x] contracts базовые типы (Snapshot, Action, WS messages) — **готово**
- [x] TEAM-CHARTER + PROMPT-00/01/02 загружены в `docs/` — **готово**
- [ ] contracts v1 финал (полный набор Action, схемы валидации) — в процессе
- [ ] sim-core спринт 1 (ARP+ICMP, MAC-таблицы, golden-master harness) — в процессе

## Вердикт chief
- **2026-11-20**: Инфраструктура развёрнута. Ветки `sub-a/bootstrap` и `sub-b/bootstrap` созданы. Промпты и хартия доступны в `docs/prompts/` и `docs/TEAM-CHARTER.md`. Оба помощника могут начинать работу в своих ветках. Я (chief) дорабатываю contracts до v1 и начинаю sim-core спринт 1. Ожидаю первые PR от sub-A и sub-B после финальных contracts.
