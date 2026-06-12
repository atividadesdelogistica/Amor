import { db } from “./firebase-config.js”;

import {
doc,
getDoc
} from “https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js”;

const params = new URLSearchParams(
window.location.search
);

const id = params.get(“id”);

if (!id) {

document.body.innerHTML = <h1 style="text-align:center;margin-top:50px;"> Link inválido </h1>;

throw new Error(“ID não informado”);

}

async function carregarCasal() {

try {

const ref = doc(
  db,
  "casais",
  id
);
const snap = await getDoc(ref);
if (!snap.exists()) {
  document.body.innerHTML = `
    <h1 style="text-align:center;margin-top:50px;">
      Casal não encontrado
    </h1>
  `;
  return;
}
const dados = snap.data();
document.getElementById(
  "nomes"
).innerText =
  `${dados.nomeEle} ❤️ ${dados.nomeEla}`;
document.getElementById(
  "mensagem"
).innerText =
  dados.mensagem || "";
iniciarContador(
  dados.inicioRelacionamento
);
carregarFotos(
  dados.fotos || []
);
carregarMusica(
  dados.musicaPrincipal || ""
);

} catch (erro) {

console.error(erro);
alert(
  "Erro ao carregar dados."
);

}

}

function iniciarContador(dataInicio) {

function atualizar() {

const inicio =
  new Date(dataInicio);
const agora =
  new Date();
const diferenca =
  agora - inicio;
const dias =
  Math.floor(
    diferenca /
    (1000 * 60 * 60 * 24)
  );
const horas =
  Math.floor(
    (diferenca /
      (1000 * 60 * 60)) %
      24
  );
const minutos =
  Math.floor(
    (diferenca /
      (1000 * 60)) %
      60
  );
const segundos =
  Math.floor(
    (diferenca / 1000) %
    60
  );
document.getElementById(
  "dias"
).innerText = dias;
document.getElementById(
  "horas"
).innerText = horas;
document.getElementById(
  "minutos"
).innerText = minutos;
document.getElementById(
  "segundos"
).innerText = segundos;

}

atualizar();

setInterval(
atualizar,
1000
);

}

function carregarFotos(fotos) {

const galeria =
document.getElementById(
“galeria”
);

galeria.innerHTML = “”;

fotos.forEach((foto) => {

const img =
  document.createElement(
    "img"
  );
img.src = foto;
img.loading = "lazy";
galeria.appendChild(img);

});

}

function carregarMusica(link) {

if (!link) return;

const musica =
document.getElementById(
“musica”
);

if (
link.includes(“youtube.com”) ||
link.includes(“youtu.be”)
) {

let videoId = "";
if (
  link.includes("watch?v=")
) {
  videoId =
    link.split("watch?v=")[1]
    .split("&")[0];
} else {
  videoId =
    link.split("/").pop();
}
musica.innerHTML = `
  <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/${videoId}"
  frameborder="0"
  allowfullscreen>
  </iframe>
`;
return;

}

if (
link.includes(“spotify.com”)
) {

const embed =
  link.replace(
    "open.spotify.com/",
    "open.spotify.com/embed/"
  );
musica.innerHTML = `
  <iframe
  src="${embed}"
  width="100%"
  height="352"
  frameborder="0"
  allowfullscreen>
  </iframe>
`;

}

}

carregarCasal();
