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

# FASE 2
## Explicación de colores CSS

En general me guié de la playa para escoger los colores, también usé la herrmienta de Adobe Color para guiarme y escoger un tema como lo que quería. (https://color.adobe.com/create/color-wheel)

### Tema Claro

    --fondo: #F6ECD9;
Para el fondo escogí un color crema para que no sea tan contrastante como el planco y se vea playero, cálido y tranquilo todo

    --fondoCard: #FFFDF7;
Para el fondo de las tarjetas utilicé un color igual crema pero un poco mas clarito para que se notara la diferencia

    --acentoPrincipal: #1D6E7E;
Con este color traté de simbolizar un poco el mar y las olas. Traté de que fuera del mismo tono que el crema para que así combinara

    --textoFuerte: #103C44;
Este es como el color anterior pero un poco mas oscuro para que también se pierda un poco más en el diseño y no se sienta tan forzado

    --acentoSecundario: #E08B6A;
Este lo seleccioné para que hiciera un acento y destacara dentro de los demás colores pero aún que pareciera la vibra como playera y de atardecer

    --texto: #173A3F;
Este color lo seleccioné para que combinara con los azules del mar que tenia antes pero mas oscuro para que el texto se viera bien.


### Tema Oscuro

    --fondo: #0A2429;
Para el fondo del tema oscuro utilicé esta misma temática del mar y de los azules como grisáceos para que parezca un mar más profundo, más oscuro

    --fondoCard: #0F3840;
Para el fondo de tarjetas o fondo secundario dejé este mismo azul pero más claro para que fuera sutil la diferencia contra el fondo general

    --acentoPrincipal: #3AA9C0;
Este color de acento lo elegí por que resalta bastante entre los demás azules al ser más claro y brillante 

    --acentoSecundario: #E08B6A;
Este acento lo dejé igual que en el tema claro para que tuviera un poco de concordancia entre ambos y así mantener el tema de atardecer/playa

    --texto: #EAF4EE;
Este color es casi blanco pero un poco verdoso para que no sea tan shokeante o contrastante

    --textoFuerte: #1D4A52;
Este lo tome como segundo texto para que fuera un poco mas claro que el fondo-card pero no tanto para que no se viera tan fuera de lugar
