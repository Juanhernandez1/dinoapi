import {
  getDinosaurios,
  getDinosauriosID,
  insertDino,
  actualizardino,
  eliminarDinoID
} from "../controllers/dinosaurs.js";
// creando rutas 
export function DinoRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/", async (req) => {
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/plain",
      }),
      body: "Bienvenido a DinoAPI",
    });
  });

  router.get("dinosaurios", getDinosaurios);

  router.get(new RegExp("^buscardino/(.+)"), getDinosauriosID);

  router.post("ingresardino", contentTypeFilter("application/json"), insertDino);

  router.put("actualizardino",contentTypeFilter("application/json"),actualizardino);

  router.delete(new RegExp("^eliminardino/(.+)"), eliminarDinoID)

  return router;
}
