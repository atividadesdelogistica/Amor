import { db, storage } from "./firebase-config.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

const SENHA = "123456";

window.entrar = () => {

  const senha =
    document.getElementById("senha").value;

  if (senha === SENHA) {

    document.getElementById("login").style.display =
      "none";

    document.getElementById("painel").style.display =
      "block";

  } else {

    alert("Senha incorreta");

  }

};

function gerarCodigo() {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let codigo = "";

  for (let i = 0; i < 8; i++) {

    codigo += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );

  }

  return codigo;

}

async function uploadImagem(arquivo, codigo) {

  return new Promise((resolve, reject) => {

    const nomeArquivo =
      Date.now() + "_" + arquivo.name;

    const storageRef = ref(
      storage,
      `casais/${codigo}/${nomeArquivo}`
    );

    const uploadTask =
      uploadBytesResumable(
        storageRef,
        arquivo
      );

    uploadTask.on(

      "state_changed",

      (snapshot) => {

        const progresso =
          (
            snapshot.bytesTransferred /
            snapshot.totalBytes
          ) * 100;

        document.getElementById(
          "progresso"
        ).innerText =
          `Upload ${Math.round(progresso)}%`;

      },

      (erro) => {

        reject(erro);

      },

      async () => {

        const url =
          await getDownloadURL(
            uploadTask.snapshot.ref
          );

        resolve(url);

      }

    );

  });

}

window.criar = async () => {

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

    const arquivos =
      document.getElementById("fotos").files;

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

    const codigo =
      gerarCodigo();

    let urlsFotos = [];

    document.getElementById(
      "progresso"
    ).innerText =
      "Enviando fotos...";

    for (
      let i = 0;
      i < arquivos.length;
      i++
    ) {

      const url =
        await uploadImagem(
          arquivos[i],
          codigo
        );

      urlsFotos.push(url);

    }

    const dados = {

      codigo,

      nomeEle,

      nomeEla,

      inicioRelacionamento: data,

      mensagem,

      musicaPrincipal: musica,

      fotos: urlsFotos,

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

      <h2>❤️ Site criado!</h2>

      <input
      value="${link}"
      readonly
      style="
      width:100%;
      padding:12px;
      border-radius:10px;
      ">

      <br><br>

      <button onclick="navigator.clipboard.writeText('${link}')">
      Copiar Link
      </button>

    `;

    document.getElementById(
      "progresso"
    ).innerText =
      "Concluído ✅";

  } catch (erro) {

    console.error(erro);

    alert(
      "Erro ao criar site."
    );

  }

};
