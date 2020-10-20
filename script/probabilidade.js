//Captura de dados
const total = document.getElementById('total')
const sucesso = document.getElementById('sucesso')
const falha = document.getElementById("falha")
const k = document.getElementById("evento")
let vetor_final_evento = []
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
const resultado = document.getElementById("button")
const desvio = document.getElementById('tabelasvariaveis')

function botaoClique() {
    let n = parseFloat(total.value)
    let p = parseFloat(sucesso.value)
    let q = parseFloat(falha.value)
    // CRIANDO O VETOR            
    let evento = k.value
    let vetor1 = evento.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_final = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
    // Coloca em ordem
    let conta_numero = 0
    let conta_string = 0
    for (conteudo of vetor_final) {
        let descubra = Number(conteudo)

        if (isNaN(descubra)) {
            conta_string++
        } else {
            conta_numero++
        }

    }

    //organiza os dados
    if (conta_string == 0) {
        vetor_final.sort(function (a, b) {
            return a - b;
        });
        vetor_final
    }
    // valida dados
    // estes lets ajudam na validação 
    let podeseguir = true
    if (total.value.trim() == '') {
        Swal.fire({
            icon: "error",
            title: "O 'Total(n)' deve ser preenchido!", 
            text: "",
            didClose: () => {
            total.focus()} // Coloca o cursor no elemento especificado
        }) 
        podeseguir = false
    } else if (sucesso.value.trim() == '') {
        Swal.fire({
            icon: "error",
            title: "O 'Sucesso(p)' deve ser preenchido!", 
            text: "",
            didClose: () => {
            sucesso.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (vetor_final[0] === undefined) {
        Swal.fire({
            icon: "error",
            title: "O 'Evento(k)' deve ser preenchido!", 
            text: "",
            didClose: () => {
            k.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (conta_string > 0) {
        Swal.fire({
            icon: "error",
            title: "O 'Evento(k)' não pode conter letras!", 
            text: "",
            didClose: () => {
            k.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else {
        for (valor of vetor_final) {
            if (valor > n) {
                podeseguir = false
                Swal.fire({
                    icon: "error",
                    title: "Há no 'Evento(k)' elemento superior ao 'Total(n)'", 
                    text: "",
                    didClose: () => {
                    k.focus()} // Coloca o cursor no elemento especificado
                })
            }
        }
    }


    // se não faltar dado o programa continua 
    if (podeseguir) {
        for (dado of vetor_final) {
            inserir_obj(dado)
        }

    
        let sucesso_final = p / 100
        let falha_final = q / 100
        let total_final = {
            valor: n,
            fatorial: calculo_fatorial(n)
        }

        let probabilidade_acumulada = 0
        for (a = 0; a < vetor_final_evento.length; a++) {
            let nk = calculo_fatorial(total_final['valor'] - vetor_final_evento[a]['valor'])
            let denominador_combinatorio = nk * Number(vetor_final_evento[a]['fatorial'])
            let analise_combinatoria = total_final['fatorial'] / denominador_combinatorio
            let pek = sucesso_final ** vetor_final_evento[a]['valor']
            let qenk = falha_final ** (total_final['valor'] - vetor_final_evento[a]['valor'])
            let probabilidade = analise_combinatoria * pek * qenk
            probabilidade_acumulada += probabilidade
        }
        probabilidade_acumulada *= 100
        let media = total_final['valor'] * sucesso_final
        let variancia = media * falha_final
        let desvio_padrao = variancia **(1/2)



        // criando a tabela para exibir os valores 
        let linha_nomes = document.createElement('tr')
        linha_nomes.id = 'cabecalho'
        desvio.appendChild(linha_nomes)
        //probabilidade
        let probabilidade = document.createElement('td')
        probabilidade.id = 'probabilidade'
        probabilidade.innerText = "Probilidade"
        linha_nomes.appendChild(probabilidade)
        //variança
        let varianca_tabela = document.createElement('td')
        varianca_tabela.id = 'varianca_tabela'
        varianca_tabela.innerText = "Variança"
        linha_nomes.appendChild(varianca_tabela)
        //Desvio Padrão
        let dp = document.createElement('td')
        dp.id = 'desvio_pad'
        dp.innerText = "Desvio Padrão"
        linha_nomes.appendChild(dp)
        // media
        let media_cavecalho = document.createElement('td')
        media_cavecalho.id = 'media_cavecalho'
        media_cavecalho.innerText = "Média"
        linha_nomes.appendChild(media_cavecalho)

        //CRIAR LINHA NA TABELA
        let linha = document.createElement('tr')
        desvio.appendChild(linha)
        //probabilidade valor
        let cel1 = document.createElement('td')
        cel1.id = 'probabilidade_valor'
        cel1.innerText = probabilidade_acumulada.toFixed(2) + '%'
        linha.appendChild(cel1)
        //valor da variança
        let cel2 = document.createElement('td')
        cel2.id = 'varianca_valor'
        cel2.innerText = variancia
        linha.appendChild(cel2)
        //valor do desvio padrão 
        let cel3 = document.createElement('td')
        cel3.id = 'desvio_padrao_valor'
        cel3.innerText = desvio_padrao
        linha.appendChild(cel3)
        //valor do desvio padrão 
        let cel4 = document.createElement('td')
        cel4.id = 'media_valor'
        cel4.innerText = media
        linha.appendChild(cel4)

        const show3 = document.getElementById('to-top')
        show3.style.display= 'flex' // Mostar botão de roalr para cima

       
        // Descer a página após clicar no botão
        $('html, body').animate({ scrollTop: 2000 }, 0);
    }
}


resultado.addEventListener('click', botaoClique)

function inserir_obj(dado) {
    let obj = {
        valor: Number(dado),
        fatorial: calculo_fatorial(dado)
    }
    vetor_final_evento.push(obj)
}

function calculo_fatorial(valor) {
    let fatorial = 1

    if (valor == 0 || valor == 1) {
        return 1


    } else {
        for (i = 1; i <= valor; i++) {
            fatorial *= i

        }

    }
    return fatorial
}


const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})