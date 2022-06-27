import { DataSource } from "typeorm";
const fs = require('fs');

const modelsFolder = './src/models/';
let entities = fs.readdirSync(modelsFolder).map((file: any) => {
  return modelsFolder + file
});


export default new DataSource({
  database: "mydb.sqlite",
  entities,
  logging: true,
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  type: "sqlite",
})