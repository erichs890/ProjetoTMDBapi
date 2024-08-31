const resultadoDestaque = document.querySelector("#resultadoDestaque")
const resultadoEmBreve = document.querySelector("#resultadoEmBreve")
const nomeInput = document.querySelector("#pesquisar")
const tituloDestaque = document.querySelector("#tituloDestaque")
const tituloEmBreve = document.querySelector("#tituloEmBreve")

async function filmesPopulares() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR")
        const dados = await response.json()
        const array = dados.results

        array.forEach((element) => {
            const card = document.createElement("div")
            card.className = "card"

            const texto = document.createElement("p")
            texto.textContent = element.title
            texto.className = "texto"

            const imagem = document.createElement("img")
            imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            imagem.className = "imagem"

            const descricao = document.createElement("p")
            descricao.textContent = element.overview
            descricao.className = "descricao"

            card.append(texto, imagem, descricao)
            resultadoDestaque.appendChild(card)
        })
    } catch (error) {
        document.write(`Deu erro oh pae, segue o erro: ${error}`)
    }
}

async function emBreve() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR")
        const dados = await response.json()
        const array = dados.results

        array.forEach((element) => {
            const card = document.createElement("div")
            card.className = "card"

            const texto = document.createElement("p")
            texto.textContent = element.title
            texto.className = "texto"

            const imagem = document.createElement("img")
            imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            imagem.className = "imagem"

            const descricao = document.createElement("p")
            descricao.textContent = element.overview
            descricao.className = "descricao"

            card.append(texto, imagem, descricao)
            resultadoEmBreve.appendChild(card)
        })
    } catch (error) {
        document.write(`Deu erro oh pae, segue o erro: ${error}`)
    }
}

filmesPopulares()
emBreve()

nomeInput.addEventListener("input", async () => {
    const query = nomeInput.value.trim()

    if (query === "") {
        resultadoDestaque.innerHTML = ""
        resultadoEmBreve.innerHTML = ""
        tituloDestaque.textContent = "Filmes em destaque"
        tituloEmBreve.textContent = "Em breve"

        filmesPopulares()
        emBreve()
    } else {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=77c4e2b070a2e1396500d0b42ebf7cec&query=${query}&include_adult=false&language=pt-BR&page=1`)
            const dados = await response.json()
            const array = dados.results

            resultadoDestaque.innerHTML = ""
            resultadoEmBreve.innerHTML = ""
            tituloDestaque.textContent = ""
            tituloEmBreve.textContent = ""

            array.forEach((element) => {
                const card = document.createElement("div")
                card.className = "card"

                const texto = document.createElement("p")
                texto.textContent = element.title
                texto.className = "texto"

                const imagem = document.createElement("img")
                imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`
                imagem.className = "imagem"

                const descricao = document.createElement("p")
                descricao.textContent = element.overview

                card.append(texto, imagem, descricao)
                resultadoDestaque.appendChild(card)
            })
        } catch (error) {
            document.write(`Deu erro oh pae, segue o erro: ${error}`)
        }
    }
})
