  - Accede a la aplicación con las credenciales predeterminadas: `admin@example.com` y `admin123`. Estas credenciales permiten a los usuarios ingresar y explorar todas las funcionalidades del blog.

# ForumApp: Tu Blog Dinámico y en Tiempo Real 🚀

Bienvenido a **ForumApp**, una aplicación de blog moderna y dinámica creada con Angular, Socket.IO y MongoDB. Este proyecto combina la última tecnología para ofrecerte una experiencia de usuario fluida y emocionante.

## 🌟 Descripción

**ForumApp** es una plataforma de blog que te permite interactuar en tiempo real con tus publicaciones favoritas. Los usuarios pueden dejar comentarios que se actualizan instantáneamente gracias a Socket.IO, mientras que MongoDB se encarga de almacenar todos los datos de manera segura y eficiente. 

### 🛠️ Stack Tecnológico

- **Frontend**: [Angular](https://angular.io)
  - Desplegado en [Vercel](https://vercel.com), el frontend está optimizado para una experiencia de usuario rápida y responsiva. Ten en cuenta que en Vercel solo verás la interfaz, ya que la base de datos se encuentra en otro entorno.

- **Backend**: Node.js con [Socket.IO](https://socket.io)
  - La lógica del backend está preparada para interactuar con MongoDB y gestionar eventos en tiempo real. Aunque el backend no está desplegado en Vercel, está incluido en el proyecto para pruebas locales.

- **Base de Datos**: [MongoDB](https://www.mongodb.com)
  - Todos los comentarios de los usuarios se almacenan de forma segura en MongoDB y se muestran en tiempo real gracias a la integración con Socket.IO.

- **Autenticación**:
  - Accede a la aplicación con las credenciales predeterminadas: `admin@example.com` y `admin123`. Estas credenciales permiten a los usuarios ingresar y explorar todas las funcionalidades del blog.

## 🚀 Configuración del Servidor de Desarrollo

Para comenzar a desarrollar localmente, ejecuta:

```bash
ng serve
```

Luego, navega a `http://localhost:4200/` para ver la aplicación en acción. Los cambios se reflejarán automáticamente en el navegador.

## 🛠️ Generación de Código

Para generar nuevos componentes y otros elementos, usa:

```bash
ng generate component component-name
```

También puedes generar directivas, pipes, servicios y más con los comandos apropiados.

## 🔨 Construcción del Proyecto

Para construir el proyecto y generar los artefactos necesarios, ejecuta:

```bash
ng build
```

Los archivos de construcción se encontrarán en el directorio `dist/`.

## 🧪 Ejecución de Pruebas

Para ejecutar pruebas unitarias, usa:

```bash
ng test
```

Y para pruebas end-to-end, ejecuta:

```bash
ng e2e
```

Asegúrate de tener los paquetes necesarios para pruebas end-to-end.

## 📚 Ayuda Adicional

¿Necesitas más ayuda con Angular CLI? Usa `ng help` o visita la [Guía de Comandos y Referencia de Angular CLI](https://angular.dev/tools/cli).

---

Este formato hace que tu descripción sea más atractiva y fácil de leer, destacando las características clave del proyecto de manera llamativa. ¡Espero que te guste! Si necesitas más ajustes, avísame.
