# MUNDICONNECT

## Integrantes del equipo

* **200416** – Patricio Arturo González Guzmán
* **1975336** – Ricardo Linares Renedo
* **1802856** – Aldo Andrés Plascencia García
* **1900171** – Magdala Shania Quiroz González

---

## Descripción de la aplicación

**MUNDICONNECT** es una red social enfocada en los aficionados del fútbol, especialmente en la experiencia de los mundiales.

La plataforma permite a los usuarios:

* Registrarse e iniciar sesión.
* Explorar mundiales disponibles.
* Suscribirse a mundiales de interés.
* Crear publicaciones con texto, imágenes y video.
* Editar y eliminar sus publicaciones.
* Comentar publicaciones.
* Editar y eliminar comentarios propios.
* Reaccionar a publicaciones mediante likes y dislikes.
* Consultar historial de mundiales.
* Visualizar su perfil de usuario.

El objetivo de la aplicación es ofrecer un espacio digital donde los aficionados puedan interactuar, compartir opiniones y seguir eventos históricos y actuales del fútbol mundial.

---

## Tecnologías utilizadas

### Backend

* Node.js — Entorno de ejecución
* Express — Framework para servidor y rutas
* Sequelize — ORM para conexión con base de datos
* MySQL — Sistema gestor de base de datos

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

---

## Estructura del proyecto

### `/ORM`

Contiene los modelos de Sequelize que representan las tablas del sistema:

* usuarios
* tipo_usuarios
* amistades
* categorias
* comentarios
* mundiales
* notificaciones
* publicaciones
* reacciones
* suscripciones_mundiales

---

### `/routes`

Contiene la lógica CRUD y endpoints del backend:

* usuarios.js
* tipo_usuarios.js
* amistades.js
* categorias.js
* comentarios.js
* mundiales.js
* notificaciones.js
* publicaciones.js
* reacciones.js
* suscripciones_mundiales.js

---

### `/HTML`

Contiene las pantallas principales del sistema:

* **login.html** → Inicio de sesión
* **register.html** → Registro de usuario
* **home.html** → Feed principal de publicaciones
* **explore.html** → Exploración y suscripción a mundiales
* **profile.html** → Perfil de usuario
* **history.html** → Historial de mundiales

---

### Archivos principales

**database.js**
Configuración de conexión con MySQL.

**index.js**
Archivo principal del servidor. Configura Express, middlewares y rutas.

---

## Funcionalidades implementadas

### Usuarios

* Registro de usuario
* Inicio de sesión
* Persistencia de sesión con LocalStorage

### Publicaciones

* Crear publicación
* Editar publicación
* Eliminar publicación
* Visualización en feed
* Soporte para imágenes
* Soporte para videos

### Comentarios

* Crear comentarios
* Editar comentarios
* Eliminar comentarios
* Mostrar comentarios por publicación

### Reacciones

* Like a publicaciones
* Dislike a publicaciones
* Cambio de reacción
* Eliminación de reacción al repetir selección
* Conteo de likes/dislikes por publicación

### Mundiales

* Consulta de mundiales
* Suscripción a mundiales
* Historial de mundiales

### Navegación

* Barra de navegación funcional entre pantallas
* Acceso mediante rutas definidas

---

## Rutas principales del sistema

### Frontend

* /login.html
* /register.html
* /home.html
* /explore.html
* /profile.html
* /history.html

### Backend API

* /users
* /posts
* /comments
* /reactions
* /worldcups
* /subscriptions

---

## Estado actual del proyecto

En este segundo avance se ha implementado:

* Backend funcional con Express y Sequelize
* Base de datos conectada a MySQL
* CRUD de usuarios
* CRUD de publicaciones
* CRUD de comentarios
* Sistema de reacciones
* Pantallas maquetadas y funcionales
* Navegación entre pantallas
* Integración frontend-backend
* Feed dinámico conectado a base de datos

Este avance representa una versión funcional de la aplicación con interacción completa entre usuarios, publicaciones y mundiales.
