# Mi Colección de Viajes

Aplicación web para registrar viajes con destinos visitados y pendientes. Hecha con React + Vite en el frontend y Express + better-SQLite3 en el backend.



## Mis primeros Items

![Captura de destinos1](images/image.png)
![Captura de destinos2](images/image-1.png)
![Captura de destinos3](images/image-2.png)


## Stack

- **Frontend:** React 18 + Vite
- **Estilos:** CSS (falta)
- **Backend:** Node.js + Express
- **Base de datos:** SQLite (better-sqlite3)


## Cómo correr el proyecto

**Frontend:**
```
cd frontend
npm install
npm run dev
```

**Backend:**
```
cd backend
npm install
node src/index.js
```

El frontend corre en `http://localhost:5173` y el backend en `http://localhost:3001`.


## Endpoints del backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/items | Trae todos los destinos activos |
| POST | /api/items | Agrega un destino nuevo |
| PUT | /api/items/:id | Actualiza un destino |
| DELETE | /api/items/:id | Archiva un destino |
| POST | /api/items/:id/registro | Registra días en un destino |
