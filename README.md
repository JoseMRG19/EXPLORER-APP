# EXPLORER APP

App web para explorar personajes de Rick and Morty usando la API publica.

## Como correr

1. Instala dependencias:
   - `npm install`
2. Levanta el entorno local:
   - `npm run dev`
3. Ejecuta tests:
   - `npm run test`

## Decisiones tecnicas

- Vite + React + TypeScript para un setup rapido y moderno.
- React Router para manejar el flujo entre listado, detalle y favoritos.
- Debounce de 400ms en el input de busqueda para evitar multiples requests.
- Cache en memoria simple en `fetchJson` para evitar re-fetch al volver atras.
- Persistencia de favoritos en `localStorage`.
- Episodios resueltos con un solo request a `/episode/[1,2,3]`.

## Que haria diferente con mas tiempo

- Agregar manejo de paginacion con infinite scroll.
- Mejorar la cobertura de tests con casos de error y accesibilidad.
- Agregar estado offline y reintentos automaticos con backoff.

## Estructura

- `src/components`: UI reutilizable.
- `src/pages`: pantallas principales.
- `src/hooks`: logica de datos, cache y favoritos.
- `src/services`: capa de API.
- `src/types`: tipos compartidos.
