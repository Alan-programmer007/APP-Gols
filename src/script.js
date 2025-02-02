import ApiConnection from "./api.js"

const api = new ApiConnection();

const button = document.querySelector("#entrada");

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

    inputData.value = "";
    inputGols.value = "";
    inputAssitencia.value = "";
})

async function exibir() {
    const tabela = document.querySelector("#tabela-score tbody");
    tabela.innerHTML = "";

    const dados = await api.listarItens();

    dados.forEach(informacoes => {
        const tr = document.createElement("tr");

        const tdData = document.createElement("td");
        tdData.textContent = informacoes.data;

        const tdGols = document.createElement("td");
        tdGols.textContent = informacoes.gols;

        const tdAssistencia = document.createElement("td");
        tdAssistencia.textContent = informacoes.assitencia;

        const tdExcluir = document.createElement("td");
        tdExcluir.appendChild(criarButton(informacoes.id))

        tr.appendChild(tdData);
        tr.appendChild(tdGols);
        tr.appendChild(tdAssistencia);
        tr.appendChild(tdExcluir);

        const tbody = document.querySelector("tbody")
        tbody.appendChild(tr)
    });
}

function criarButton(id){
    const bnt = document.createElement("button")

    bnt.innerText = "Remover";

    bnt.addEventListener("click", async() => {

        await api.deletarInfo(id)

        exibir()
    })
    return bnt;
}

exibir();
