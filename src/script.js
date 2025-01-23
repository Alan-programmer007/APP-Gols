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
    adicionarEventosDeletar(resultados);

    data.value = "";
    gols.value = "";
    assitencia.value = "";
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

function adicionarEventosDeletar(resultados) {
    const apagar = document.querySelectorAll(".delete");
    apagar.forEach((botao, indice) => {
        botao.addEventListener("click", async () => {
            const botaoSelecionado = document.querySelector(".selecionado");
            if (botaoSelecionado) {
                botaoSelecionado.classList.remove("selecionado");
            }
            botao.classList.add("selecionado");

            const id = resultados[indice].id;
            await api.deletarInfo(id);

            const novoResultados = await api.listarItens();
            exibir(novoResultados);
            adicionarEventosDeletar(novoResultados);
        });
    });
}

window.onload = async () => {
    const resultados = await api.listarItens();
    exibir(resultados);
    adicionarEventosDeletar(resultados);
};