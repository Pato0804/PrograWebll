MUNDICONNECT
Integrantes del equipo

200416 – Patricio Arturo González Guzmán

1975336 – Ricardo Linares Renedo

1802856 – Aldo Andrés Plascencia García

1900171 – Magdala Shania Quiroz González 

Diseño tecnico1

Descripción de la aplicación

MUNDICONNECT es una red social enfocada en los aficionados del fútbol y especialmente en la experiencia del Mundial. La plataforma permite que los usuarios puedan registrarse, iniciar sesión, compartir publicaciones y comentar sobre diferentes eventos relacionados con los mundiales de fútbol. 

Diseño tecnico1

Además, el sistema incluye una sección de historial de mundiales, donde los usuarios pueden consultar información sobre torneos pasados y participar en conversaciones con otros usuarios sobre dichos eventos.

El objetivo de la aplicación es crear un espacio digital donde los aficionados puedan interactuar, compartir opiniones y vivir el Mundial de forma más social.

Tecnologías utilizadas:

Node.js – Entorno de ejecución del backend

Express – Framework para manejo de rutas del servidor

Sequelize – ORM para la comunicación con la base de datos

MySQL – Sistema de gestión de base de datos

Descripción de carpetas

/ORM:
Contiene los modelos de Sequelize que representan las tablas de la base de datos, como el modelo de usuarios.

usuarios.js,tipo_usuarios.js,amistades.js,categorias.js,comentarios.js,mundiales.js,notificaciones.js,publicaciones.js,reacciones.js y suscripciones_mundiales.js (routers):
Archivos donde se implementa el CRUD de los modelos ORM, permitiendo crear, consultar, actualizar y eliminar registros.

database.js:
Archivo encargado de configurar la conexión entre el backend y la base de datos MySQL.

index.js:
Archivo principal del servidor. Inicializa Express, conecta la base de datos y registra las rutas de la aplicación.


En este primer avance se ha implementado:

Estructura inicial del backend

Conexión con base de datos MySQL

Implementación de Sequelize como ORM

Modelo de usuarios

CRUD básico de usuarios

Este avance representa la base funcional del backend del sistema.