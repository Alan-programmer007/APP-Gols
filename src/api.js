class ApiConection{

    url = "http://localhost:5151/resultados"

    async listarItens(){
    const response =  await fetch(this.url)
    
    const dados = await response.json()
    console.log(dados)
    
    return dados
    }
    
    async cadastraResultados(informacoes) {
    const response =  await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(informacoes),
        headers: {"Content-Type": "application/json"}
    });
    
    }

    async deletarInfo(id) {
    const response =  await fetch(this.url + "/" +id, {
        method: "DELETE"
    });
        
    }
    
}


export default ApiConection;
//export default ApiConection()
