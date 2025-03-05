class ApiConection{

    url = "http://localhost:5151/resultados"

    async listarItens(){
    const response =  await fetch(this.url)
    
    const dados = await response.json()
    return dados
    }
    
    async cadastraResultados(container) {
    const response =  await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(container),
        headers: {"Content-Type": "application/json"}
    });
    
    }

    async deletarInfo(id) {
    const response =  await fetch(this.url + "/" +id, {
        method: "DELETE"
    });
        
    }

    async atualizarLinha(id, novaLinha){
    const response =  await fetch(this.url + "/" + id, {
        method: "PUT",
        body: JSON.stringify(novaLinha),
        headers: {"Content-Type": "application/json"}
    });
    } 
    

    async totalNumeros(total){
        const response =  await fetch(this.url + "/" + total)
        const dados = await response.json()
        return dados
    }
}

export default ApiConection;
