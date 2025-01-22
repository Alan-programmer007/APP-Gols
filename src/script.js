import ApiConnection from "./api.js"

const api = new ApiConnection();

const button = document.querySelector("#entrada");
const apagar = document.querySelectorAll(".delete");

button.addEventListener('click', async() => {

    const inputData = document.querySelector("#input-data");
    const inputGols = document.querySelector("#input-gols");
    const inputAssitencia = document.querySelector("#input-assitencia");

    const data = inputData.value;
    const gols = inputGols.value;
    const assitencia = inputAssitencia.value;

    const informacoes = {
        data,
        gols,
        assitencia
    };
    
    await api.cadastraResultados(informacoes)

    const resultados = await api.listarItens();
    exibir(resultados);
    const ret = await api.listarItens();
    afim(ret);
})

async function exibir(resultados) {
    const tabela = document.querySelector("#tabela-score tbody");
    tabela.innerHTML = "";

    resultados.forEach(informacoes => {
        const tr = document.createElement("tr");

        const tdData = document.createElement("td");
        tdData.textContent = informacoes.data;
        tr.appendChild(tdData);

        const tdGols = document.createElement("td");
        tdGols.textContent = informacoes.gols;
        tr.appendChild(tdGols);

        const tdAssistencia = document.createElement("td");
        tdAssistencia.textContent = informacoes.assitencia;
        tr.appendChild(tdAssistencia);

        const tdExcluir = document.createElement("td");
        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Deletar";
        buttonDelete.classList.add("delete");
        tdExcluir.appendChild(buttonDelete);
        tr.appendChild(tdExcluir);

        tabela.appendChild(tr);
    });
}

async function afim(ret) {
    ret.forEach(informacoes => {
        console.log(informacoes.id)
    })
}

window.onload = async () => {
    const resultados = await api.listarItens();
    exibir(resultados);
};