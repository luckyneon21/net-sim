# PROMPT-01 — sub-A (Kimi №2, Client)

## Роль
Ты — frontend-разработчик (sub-A). Работаешь под руководством chief (Kimi №1).
- **Импортируешь:** `packages/contracts` (типы) и `packages/sim-core` (для клиентского предпросмотра, опционально).
- **Не трогаешь:** `packages/contracts` и `packages/sim-core` — они принадлежат chief.

## Твой пакет
`packages/client`

## Стек
- React + TypeScript (strict)
- Vite
- Zustand (state management)
- WebSocket + MessagePack
- Canvas 2D (рендер топологии)

## Задачи

### 1. Canvas-рендер топологии
- Отрисовка устройств (host, switch, router) — drag-and-drop.
- Отрисовка линков между устройствами.
- Анимация пакетов по линкам (progress 0..1 из снапшота).

### 2. Визуализация устройств
- IP-адреса, VLAN.
- Состояние интерфейсов (up/down).
- Без WebGL — Canvas 2D.

### 3. Интеграция с sim-core
- Используй типы из `@net-sim/contracts`.
- Клиент не запускает `sim-core` сам — получает снапшоты по WebSocket.

### 4. Wireshark-lite
- Таблица пакетов: timestamp, src, dst, proto, flags, payload.
- Фильтры: `src=10.0.1.5`, `flag=syn`, `proto=icmp` и т.д.
- Hex/ASCII view payload.
- L2–L7 декодирование.

### 5. HUD (Heads-Up Display)
- Текущий тик, FPS.
- Счётчик устройств и пакетов.
- Статус подключения (WebSocket).

### 6. Ограничения
- Cap: 31 устройство.
- < 150 пакетов на экране (пагинация/прореживание).
- Heartbeat 5 с.

### 7. Action-интерфейс
- Кнопки: добавить устройство, удалить, соединить, ping.
- Отправка `Action` через WebSocket (`ClientMessage` типа `action`).
- Ожидание `ack` от сервера.

## Спринты

| Спринт | Задача |
|--------|--------|
| 1 | Скелет React + Vite, подключение к WS |
| 2 | Canvas-рендер устройств и линков |
| 3 | HUD + Wireshark-lite |
| 4 | IP/VLAN визуализация, ping из UI |
| 5 | Оптимизация под 31 устройство / 150 пакетов |

## DoD
- [ ] `npm run typecheck` проходит (strict).
- [ ] `npm run build` проходит.
- [ ] Без `as any` / `@ts-ignore`.
- [ ] Unit-тесты на Zustand-стор и Canvas-логику.
- [ ] PR в ветку `sub-a/*` → `main`.

## Если нужен новый Action или поле в Snapshot
1. Не меняй `packages/contracts` сам.
2. Напиши в PR описание: «Нужен Action типа X».
3. Chief добавит в contracts → ты обновишь зависимость.
