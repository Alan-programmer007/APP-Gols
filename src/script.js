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

    if (data != "" && gols != "" && assitencia != "") {
        const container = {
            data: data,
            gols: gols,
            assitencia: assitencia
        };
        console.log(container)
        await api.cadastraResultados(container)
    
        const resultados = await api.listarItens();
        exibir(resultados);
    
        inputData.value = "";
        inputGols.value = "";
        inputAssitencia.value = "";
    }else{
        alert("Preencha todos os campos!")
    }
})

async function exibir() {
    const tabela = document.querySelector("#tabela-score tbody");
    tabela.innerHTML = "";

    const dados = await api.listarItens();

    dados.forEach(container => {
        const tr = document.createElement("tr");

        const tdData = document.createElement("td");
        tdData.textContent = container.data;

        const tdGols = document.createElement("td");
        tdGols.textContent = container.gols;

        const tdAssistencia = document.createElement("td");
        tdAssistencia.textContent = container.assitencia;

        const tdExcluir = document.createElement("td");
        tdExcluir.appendChild(criarButton(container.id))

        const bntAtualizar = document.createElement("td");
        bntAtualizar.appendChild(criarButtonAtualizar(container.id))

        tr.appendChild(tdData);
        tr.appendChild(tdGols);
        tr.appendChild(tdAssistencia);
        tr.appendChild(tdExcluir);
        tr.appendChild(bntAtualizar);

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

function criarButtonAtualizar(id){
    const bntAtualizar = document.createElement("button")

    bntAtualizar.innerText = "Atualizar";

    bntAtualizar.addEventListener("click", async() => {

    const modal = document.getElementById("janela-atualizar");

    modal.classList.add("abrir")

    modal.addEventListener("click", (e) => {
        if(e.target.id == 'sair' || e.target.id == 'janela-atualizar'){
            modal.classList.remove("abrir")
        }
    })

        pegarValores(id)

    })
    return bntAtualizar;
}

function pegarValores(id) {
    const concluir = document.querySelector(".concluir")

    concluir.addEventListener("click", async() => {

        const inputDataNovo = document.querySelector("#input-data-atualizado");
        const inputGolsNovo = document.querySelector("#input-gols-atualizado");
        const inputAssitenciaNovo = document.querySelector("#input-assitencia-atualizado");

        const dataAtualizado = inputDataNovo.value;
        const golsAtualizados = inputGolsNovo.value;
        const assitenciaAtualizados = inputAssitenciaNovo.value;

        if (dataAtualizado != "" && golsAtualizados != "" && assitenciaAtualizados != "") {
            const novaLinha = {
                data: dataAtualizado,
                gols: golsAtualizados,
                assitencia: assitenciaAtualizados
            };
    
            console.log(id, novaLinha)
            await api.atualizarLinha(id, novaLinha);
    
            inputDataNovo.value = "";
            inputGolsNovo.value = "";
            inputAssitenciaNovo.value = "";
    
            exibir()

            alert("Atualizações feitas!")
        }else{
            alert("Preencha todos os campos!")
        }


    }, { once: true })

    exibir()
}

exibir();
