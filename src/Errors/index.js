function ErrorControl(RoutingError) {
  return async (e, req) => {
    // Todos los errores no detectados y los rechazos de promesas no manejados estarán aquí.
    if (e instanceof RoutingError && e.status === 404) {
      // RoutingError es lanzado por el enrutador.
      // Normalmente, cuando ningún middleware respondió a la solicitud.
      // la siguiente linea es por si se mistrar una pagina para indicar el error
      // por se una API solo se mostrar el error en un json
      //  const errorPage = await Deno.open("./public/error.html");
      try {
        await req.respond({
          status: 404,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify(
            {
              error: "404",
              mensaje: "no existe el recurso que ha sido pedido",
              otros: "no se a podido acceder a la base de datos",
            },
          ),
        });
      } catch(e){
        console.log(e);
      }
      //finally {
      //  errorPage.close();
      //}
    } else {
      await req.respond({
        status: 500,
        body: "Error Interno del Servidor Intente Mas Tarde",
      });
    }
  };
}

export default ErrorControl;
