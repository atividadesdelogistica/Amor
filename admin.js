import { db } from "./firebase-config.js";

import {
  collection,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const SENHA = "123456";

window.entrar = function () {

  const senha = document.getElementById("senha").value;

  if (senha === SENHA) {

    document.getElementById("login").style.display = "none";

    document.getElementById("painel").style.display = "block";

  } else {

    document.getElementById("erro").innerText =
      "Senha incorreta";

  }

};

function gerarCodigo() {

  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let codigo = "";

  for (let i = 0; i < 8; i++) {

    codigo += caracteres.charAt(
      Math.floor(
        Math.random() * caracteres.length
      )
    );

  }

  return codigo;

}

window.criar = async function () {

  try {

    const nomeEle =
      document.getElementById("nomeEle").value;

    const nomeEla =
      document.getElementById("nomeEla").value;

    const data =
      document.getElementById("data").value;

    const mensagem =
      document.getElementById("mensagem").value;

    const musica =
      document.getElementById("musica").value;

    const fotosTexto =
      document.getElementById("fotos").value;

    const eventosTexto =
      document.getElementById("eventos").value;

    if (
      !nomeEle ||
      !nomeEla ||
      !data
    ) {

      alert(
        "Preencha os campos obrigatórios."
      );

      return;

    }

    const fotos = fotosTexto
      .split("\n")
      .map(f => f.trim())
      .filter(f => f !== "");

    const eventos = eventosTexto
      .split("\n")
      .map(item => ({
        titulo: item
      }));

    const codigo = gerarCodigo();

    const dados = {

      codigo,

      nomeEle,

      nomeEla,

      inicioRelacionamento: data,

      mensagem,

      musicaPrincipal: musica,

      fotos,

      eventos,

      criadoEm:
        new Date().toISOString()

    };

    await setDoc(
      doc(db, "casais", codigo),
      dados
    );

    const link =

      `${window.location.origin}/love.html?id=${codigo}`;

    document.getElementById(
      "linkGerado"
    ).innerHTML = `

      <h3>❤️ Site criado!</h3>

      <p>${link}</p>

      <br>

      <button onclick="navigator.clipboard.writeText('${link}')">
        Copiar Link
      </button>

    `;

    alert(
      "Site criado com sucesso!"
    );

  } catch (erro) {

    console.error(erro);

    alert(
      "Erro ao salvar no Firebase."
    );

  }

};
