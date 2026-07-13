import fs from "fs";

import seguidores from "./seguidores.js";
import seguindo from "./seguindo.js";

console.log("Seguidores:", seguidores.length);
console.log("Seguindo:", seguindo.length);

const noFollow = seguindo.map((user) => {
  if (!seguidores.includes(user)) {
    return user;
  }
}).filter((user) => user !== undefined);

console.log("Deixar de seguir total:", noFollow.length);


fs.writeFileSync("unfollow.json", JSON.stringify(noFollow, null, 2));
console.log("Arquivo 'deixar_de_seguir.json' criado com sucesso.");