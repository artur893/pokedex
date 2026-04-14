## Pokedex (PL)

Kompletny projekt Pokedex zbudowany w React z lokalnym API (`json-server`). Zawiera CRUD, autoryzację, paginację, wyszukiwanie, logikę walki na arenie i integrację z zewnętrznym API (PokeAPI).

## Zawartość repozytorium

- Aplikacja frontendowa (React + Tailwind)
- Lokalny serwer API oparty na `json-server`

## Najważniejsze funkcje

- Lista Pokémonów z paginacją i wyszukiwarką
- Strona szczegółów Pokémona
- Rejestracja i logowanie
- Formularze walidowane przez `react-hook-form`
- Arena: walka dwóch Pokémonów, zapis wyników w lokalnym API
- Ranking: sortowalna tabela
- Edytor / tworzenie Pokémona z możliwością wyboru grafiki z PokeAPI
- Tryb ciemny
- Komunikaty (notistack)

---

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- API: json-server (lokalny)
- Biblioteki: `react-hook-form`, `react-router`, `tailwind`, `notistack`
- Dev: ESLint, Prettier

---

## Szybki start (lokalnie)

Wymagania: `Node.js` i `npm`.

1. Zainstaluj zależności:

```bash
npm install
```

2. Uruchom frontend i lokalne API równocześnie:

```bash
npm run start
```

Alternatywnie uruchom je osobno:

```bash
npm run dev    # uruchamia Vite (frontend)
npm run server # uruchamia json-server na http://localhost:3000
```

Po uruchomieniu frontend jest dostępny zwykle pod `http://localhost:5173`, a API pod `http://localhost:3000`.

---

## Pokedex (EN)

A complete Pokédex project built with React and a local API (`json-server`).
It includes full CRUD functionality, authentication, pagination, search, battle logic for the arena, and integration with the external PokeAPI.

## Repository Contents

- Frontend application (React + Tailwind)
- Local API server powered by `json-server`

## Key Features

- Pokémon list with pagination and search
- Pokémon detail page
- User registration and login
- Forms validated with `react-hook-form`
- Arena: battle between two Pokémon with results saved to the local API
- Ranking: sortable leaderboard
- Pokémon editor/creator with image selection from PokeAPI
- Dark mode
- Notifications (notistack)

---

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- API: json-server (local)
- Libraries: `react-hook-form`, `react-router`, `tailwind`, `notistack`
- Dev: ESLint, Prettier

---

## Quick Start (Local)

Requirements: `Node.js` and `npm`.

1. Install dependencies:

```bash
npm install
```

2. Run the frontend and local API simultaneously:

```bash
npm run start
```

Alternatively, run them separately:

```bash
npm run dev    # starts Vite (frontend)
npm run server # starts json-server at http://localhost:3000
```

After launching, the frontend is usually available at `http://localhost:5173`, and the API at `http://localhost:3000`.
