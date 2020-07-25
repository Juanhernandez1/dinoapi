import DB from "../DataBase/index.js";

// funciones para realizar CRUD

const getDinosaurios = async (req) => {
  
  await DB.connect();
  const result = await DB.query("SELECT * FROM dinosaurios;");

  console.log(result.rowsOfObjects());

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(result.rowsOfObjects()),
  });

  await DB.end();
};

const getDinosauriosID = async (req) => {
  const [_, id] = req.match;

  await DB.connect();

  const result = await DB.query(
    "SELECT * FROM dinosaurios WHERE id_dino = $1;",
    id,
  );

  console.log(result.rowsOfObjects());

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(result.rowsOfObjects()),
  });

  await DB.end();
};

const insertDino = async (req) => {
  const bodyJson = await req.json();
  console.log(bodyJson);

  await DB.connect();
  const result = await DB.query(
    "INSERT INTO dinosaurios(nombre,altura) VALUES ($1,$2) RETURNING *;",
    bodyJson.nombre,
    bodyJson.altura,
  );

  console.log(result.rowsOfObjects());

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(
      {
        mensaje: "los datos an sido ingresados",
        datos: result.rowsOfObjects(),
      },
    ),
  });
  await DB.end();
};

const actualizardino = async (req) => {
  const bodyJson = await req.json();
  console.log(bodyJson);
  console.log(`UPDATE dinosaurios SET ${bodyJson.campo} = '${bodyJson.dato}' WHERE id_dino = ${bodyJson.id_dino} RETURNING *;`)
  await DB.connect();
  const result = await DB.query(`UPDATE dinosaurios SET ${bodyJson.campo.toString()} = '${bodyJson.dato}' WHERE id_dino = ${bodyJson.id_dino} RETURNING *;`);

  console.log(result.rowsOfObjects());

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(
      {
        mensaje: "los datos an sido actualizados",
        datos: result.rowsOfObjects(),
      },
    ),
  });
  await DB.end();
};

const eliminarDinoID = async (req) => {
  const [_, id] = req.match;

  await DB.connect();

  const result = await DB.query(" DELETE FROM dinosaurios WHERE id_dino = $1;", id, );

  console.log(result.rowsOfObjects());

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body:  JSON.stringify({ mensaje:"dinosaurio a sido eliminado" }),
  });

  await DB.end();
};

export {
  getDinosaurios,
  getDinosauriosID,
  insertDino,
  actualizardino,
  eliminarDinoID
};
