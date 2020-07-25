import {
  createApp,
  RoutingError,
  createRouter,
  contentTypeFilter,
} from "servest";
import ErrorControl from "./src/Errors/index.js";
import { DinoRouter } from "./src/routes/routes.js";
const app = createApp();

// Definir controlador de errores global para la aplicación
app.catch(ErrorControl(RoutingError));

// rutas 
app.route("/", DinoRouter(createRouter, contentTypeFilter));

// puesto de escucha
const port = Number(Deno.env.get("PORT"));

// servidor en ejecucion
app.listen({ port });
