//Captura de dados
const nome = document.querySelector('#nome-var')
const nome2 = document.querySelector('#nome-var2')
const dados = document.getElementById("dados")
const resultado = document.getElementById("button")
const tabela = document.getElementById("tabelasvariaveis")
const tipo_variavel = document.getElementById("tipo de variavel")
const ordem = document.getElementById("ordem_dados")
const pontos_centrais = document.getElementById('tabela_medias')
let vetor_final2 = []
let total = 0
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
let vetor_continuo = []

function botaoClique() {
    // CRIANDO O VETOR            
    let dados_valores = dados.value
    let vetor1 = dados_valores.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_final = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
    // Coloca em ordem
    let conta_numero = 0
    let conta_string = 0
    let organizar_string = []
    let organizar_numero = []
    for (conteudo of vetor_final) {
        let descubra = parseFloat(conteudo)

        if (isNaN(descubra)) {
            conta_string++
            organizar_string.push(conteudo)
        } else {
            conta_numero++
            organizar_numero.push(conteudo)
        }

    }

    if (conta_string == 0) {
        vetor_final.sort(function (a, b) {
            return a - b;
        });
        vetor_final
    } else if (conta_string > 0 && conta_numero > 0) {
        organizar_numero.sort(function (a, b) {
            return a - b;
        });
        organizar_numero
        organizar_string.sort()
        let aux = vetor_final.length
        vetor_final.splice(0, aux)
        for (dado of organizar_string) {
            vetor_final.push(dado)
        }
        for (dado of organizar_numero) {
            vetor_final.push(dado)
        }
    } else {
        vetor_final.sort()
    }
    // valida dados
    // estes lets ajudam na validação 
    let podeseguir = true
    let ordem_dados = ordem.value
    let vetor_organizador = ordem_dados.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_ordem = vetor_organizador.filter(x => x.trim()) // Remove itens vazios do vetor


    if (nome.value.trim() == '') {
        alert('O nome da variavel deve ser preenchido.')
        nome.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (conta_numero == 0 && conta_string == 0) {
        alert('insira os dados')
        dados.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (tipo_variavel.selectedIndex == 0) {
        alert('Escolha o tipo de dado')
        tipo_variavel.focus() // Coloca o cursor no elemento especificado
        podeseguir = false

    } else if (tipo_variavel.selectedIndex == 2 && vetor_ordem[0] === undefined) {
        alert('insira a ordem desejada')
        ordem.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if ((tipo_variavel.selectedIndex == 3 || tipo_variavel.selectedIndex == 4) && conta_string > 0) {
        alert('Dados ou seleção do tipo de dados errados')
        dados.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (vetor_ordem[0] != undefined && tipo_variavel.selectedIndex != 2) {
        alert("selecione o tipo de variavel correta ou apague a ordem")
        tipo_variavel.focus()
        podeseguir = false
    } else if (tipo_variavel.selectedIndex == 2) {
        for (dado of vetor_final) {
            let tem = vetor_ordem.indexOf(dado)
            if (tem < 0) {
                alert("Item da ordem não existente " + dado)
                ordem.focus()
                podeseguir = false
                break
            }
        }
        for (falto of vetor_ordem) {
            let tems = vetor_final.indexOf(falto)

            if (tems < 0) {
                alert("Item dos dado não existente na ordem desejada o item é " + falto)
                ordem.focus()
                podeseguir = false
                break
            }

        }

    }

    // se não faltar dado o programa continua 
    if (podeseguir) {

        // nome2.innerHTML = nome.value
        // Contando as ocorrências de cada item no vetor 

        for (let i = 0; i < vetor_final.length; i++) {
            let valido = true

            if (vetor_final[i] == vetor_final[i - 1]) {
                valido = false
            }

            if (valido) {
                let indices = []
                let item = vetor_final[i]
                let idx = vetor_final.indexOf(item)
                while (idx != -1) {
                    indices.push(idx);
                    idx = vetor_final.indexOf(item, idx + 1);
                }

                total += parseInt(indices.length)

                inserir_obj(item, indices.length)
            }
        }




        if (tipo_variavel.selectedIndex == 2) {
            let vetor_aux = []

            function buscaSequencial(lista, valorBusca, fnComp) {
                for (let i = 0; i < lista.length; i++) {
                    //Encontrou o que está buscando: retorna a posição
                    //em que foi encontrado
                    if (fnComp(lista[i], valorBusca)) return i
                }
                return -1 // valorBusca não foi encontrado em lista
            }
            for (dado of vetor_ordem) {
                let a = buscaSequencial(vetor_final2, dado, (obj, valor) => obj['nome'] === valor)
                let help = vetor_final2[a]
                vetor_aux.push(help)
                vetor_final2.splice(a, 1)
            }
            vetor_final2 = vetor_aux


        }
        // Quando é o caso de quantitativo continuo
        if (tipo_variavel.selectedIndex == 4) {
            //primeiro número da sequencia
            let inicio_classe = vetor_final2[0]['nome']
            //calcula a amplitude do dados 
            let aux = vetor_final2.length - 1
            let amplitude_total = vetor_final2[aux]['nome'] - vetor_final2[0]['nome']
            let k = (total) ** (1 / 2)

            //possiveis numeros de linhas
            let nl1 = Math.floor(k)
            let nl2 = nl1 + 1
            let nl3 = nl1 - 1
            let x = true
            let aux3 = amplitude_total + 1
            let intervalo_de_classe
            let numero_de_linhas
            //testando possiveis número de linhas
            while (x == true) {
                if (aux3 % nl1 == 0) {
                    numero_de_linhas = nl1
                    x = false
                    intervalo_de_classe = aux3 / nl1
                } else if (aux3 % nl2 == 0) {
                    numero_de_linhas = nl2
                    x = false
                    intervalo_de_classe = aux3 / nl2
                } else if (aux3 % nl3 == 0) {
                    numero_de_linhas = nl3
                    x = false
                    intervalo_de_classe = aux3 / nl3
                } else {
                    aux3 += 1
                }
            }
            //organizando os dados dessa categoria 
            let ajuda = parseFloat(inicio_classe)
            let contador = 0
            let aux2 = 0
            let aux4 = numero_de_linhas - 1

            for (let i = 0; i < numero_de_linhas; i++) {
                let ajuda_antiga = ajuda
                ajuda += intervalo_de_classe,
                    contador = 0

                for (let q = 0; q < vetor_final2.length; q++) {
                    if (aux4 != i) {
                        if ((parseFloat(vetor_final2[q]['nome']) < ajuda)) {
                            contador = contador + vetor_final2[q]['valor']
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 == 0) {
                            let string = `${vetor_final2[0]['nome']} |-------${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 > 0) {
                            let string = `${ajuda_antiga}|--------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        }
                    } else {

                        for (w = 0; w <= vetor_final2.length; w++)
                            if (w < vetor_final2.length) {
                                contador = contador + vetor_final2[w]['valor']
                            }
                        else {
                            let string = `${ajuda_antiga}|--------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, w)
                            break
                        }
                    }
                }

            }
            vetor_final2 = vetor_continuo

        }
        //calculando as frequencias chamando uma função a parte 
        for (let i = 0; i < vetor_final2.length; i++) {
            frequencias(i)
        }

        // cria o cabeçalho da tabela
        let linha_nomes = document.createElement('tr')
        tabela.appendChild(linha_nomes)
        //Nome da Variável
        let Nome_da_Variavel = document.createElement('td')
        Nome_da_Variavel.id = 'Nome_da_Variavel'
        Nome_da_Variavel.innerText = nome.value
        linha_nomes.appendChild(Nome_da_Variavel)
        //Frequência Simples (fi)
        let Frequencia_Simples = document.createElement('td')
        Frequencia_Simples.id = 'Frequencia_Simples'
        Frequencia_Simples.innerText = "Frequência Simples (fi)"
        linha_nomes.appendChild(Frequencia_Simples)
        //Frequencia Relativa(Fr%)
        let Frequencia_Relativa = document.createElement('td')
        Frequencia_Relativa.id = 'Frequencia_Relativa'
        Frequencia_Relativa.innerText = "Frequencia Relativa(Fr%)"
        linha_nomes.appendChild(Frequencia_Relativa)
        //Frequencia Acumulativa
        let Frequencia_Acumulativa = document.createElement('td')
        Frequencia_Acumulativa.id = 'Frequencia_Acumulativa'
        Frequencia_Acumulativa.innerText = "Frequencia Acumulativa"
        linha_nomes.appendChild(Frequencia_Acumulativa)
        //Frequencia Relativa Acumulativa(%)
        let Frequencia_Relativa_Acumulativa = document.createElement('td')
        Frequencia_Relativa_Acumulativa.id = 'Frequencia_Relativa_Acumulativa'
        Frequencia_Relativa_Acumulativa.innerText = "Frequencia Relativa Acumulativa(%)"
        linha_nomes.appendChild(Frequencia_Relativa_Acumulativa)



        for (let i = 0; i < vetor_final2.length; i++) {
            //CRIAR LINHA NA TABELA
            let linha = document.createElement('tr')
            tabela.appendChild(linha)
            //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
            let cel1 = document.createElement('td')
            cel1.id = 'celula1'
            cel1.innerText = vetor_final2[i]['nome']
            linha.appendChild(cel1)
            //CRIAR CÉLULA COM A QUANTIDADE ENCONTRADA
            let cel2 = document.createElement('td')
            cel2.id = 'celula2'
            cel2.innerText = vetor_final2[i]['valor']
            linha.appendChild(cel2)
            //CRIAR CÉLULA COM A Frequencia Relativa
            let cel3 = document.createElement('td')
            cel3.id = 'celula3'
            cel3.innerText = vetor_final2[i]['Frequencia relativa'].toFixed(2)
            linha.appendChild(cel3)
            //CRIAR CÉLULA COM A Frequencia Acumulativa
            let cel4 = document.createElement('td')
            cel4.id = 'celula4'
            cel4.innerText = vetor_final2[i]['Frequencia acumulada']
            linha.appendChild(cel4)
            //CRIAR CÉLULA COM A Frequencia relativa Acumulativa
            let cel5 = document.createElement('td')
            cel5.id = 'celula5'
            cel5.innerText = vetor_final2[i]['Frequencia relativa acumulada'].toFixed(2)
            linha.appendChild(cel5)
        }
        //total
        //CRIAR LINHA NA TABELA
        let linha = document.createElement('tr')
        tabela.appendChild(linha)
        //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
        let cel6 = document.createElement('td')
        cel6.id = 'total'
        cel6.innerText = 'total'
        linha.appendChild(cel6)
        let cel7 = document.createElement('td')
        cel7.id = 'total'
        cel7.innerText = total
        linha.appendChild(cel7)

        grafico(vetor_final2, tipo_variavel.selectedIndex, nome.value)
        tendencia_central(vetor_final2, tipo_variavel.selectedIndex, total)
    }


}


resultado.addEventListener('click', botaoClique)

function inserir_obj(dado, quantidade) {
    let obj = {
        nome: dado,
        valor: quantidade
    }
    vetor_final2.push(obj)
}

function frequencias(i) {
    let aux = (i - 1)
    if (aux < 0) {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = vetor_final2[i].valor
        vetor_final2[i]['Frequencia acumulada'] = b
        let c = vetor_final2[i]['Frequencia relativa']
        vetor_final2[i]['Frequencia relativa acumulada'] = c
        vetor_final2[i]['intervalo inferior frequencia acumulada'] = 0
    } else {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = (vetor_final2[i].valor) + (vetor_final2[aux]['Frequencia acumulada'])
        vetor_final2[i]['Frequencia acumulada'] = b;
        let c = (vetor_final2[i]['Frequencia relativa']) + (vetor_final2[aux]['Frequencia relativa acumulada'])
        vetor_final2[i]['Frequencia relativa acumulada'] = c
        let d = vetor_final2[aux]['Frequencia acumulada']
        vetor_final2[i]['intervalo inferior frequencia acumulada'] = d
    }

}

function grafico(vetor_final2, tipo_variavel, titulo) {
    let nome_dado = []
    let valor_dado = []
    let valor_porcentagem = []
    let cores_aleatorias = []
    let cores_aleatorias2 = []
    for (let i = 0; i < vetor_final2.length; i++) {
        nome_dado.push(vetor_final2[i]['nome'])
        valor_dado.push(vetor_final2[i]['valor'])
        valor_porcentagem.push(vetor_final2[i]['Frequencia relativa'].toFixed(2))
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let cor = `rgba(${r},${g},${b},0.25)`
        let cor2 = `rgba(${r},${g},${b},1)`
        cores_aleatorias.push(cor)
        cores_aleatorias2.push(cor2)

    }
    var ctx = document.getElementById('myChart');
    if (tipo_variavel == 1 || tipo_variavel == 2) {

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nome_dado,
                datasets: [{
                    label: valor_dado,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: titulo
                }
            }
        });
    } else if (tipo_variavel == 3) {

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nome_dado,
                datasets: [{
                    label: titulo,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    } else if (tipo_variavel == 4) {
        let nome_continuo = []
        for (let i = 0; i < vetor_final2.length; i++) {
            nome_continuo.push(vetor_final2[i]['nome'])
        }
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nome_continuo,
                datasets: [{
                    label: titulo,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1.25,
                    }, {
                        display: false,
                        ticks: {
                            autoSkip: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })


    }

} // fim função

function tendencia_central(vetordados, tipo_variavel, total) {
    let vetor_aux2 = vetordados.slice(0, vetordados.length)
    let stringmediana = ""
    let stringmoda = ""
    let stringmedia = ""
    if (tipo_variavel == 1 || tipo_variavel == 2) {

        stringmediana = achando_mediana(vetordados, total, tipo_variavel)
        stringmoda = achando_moda(vetordados, vetor_aux2)

        stringmedia = "Não possui média"

    } // tipo de variavel nominal e ordinal fim
    else if (tipo_variavel == 3) {
        //média 
        let soma = 0
        for (let i = 0; i < vetor_aux2.length; i++) {
            soma += Number(vetor_aux2[i]['nome'] * vetor_aux2[i]['valor'])
        }
        stringmedia = soma / total
        stringmediana = achando_mediana(vetordados, total, tipo_variavel)
        stringmoda = achando_moda(vetordados, vetor_aux2)
    } else if (tipo_variavel == 4) {
        let soma = 0

        for (let i = 0; i < vetor_aux2.length; i++) {
            let media_simples = 0
            media_simples = Number((vetor_aux2[i]['limite_inferior'] + vetor_aux2[i]['limite_superior']) / 2)
            soma += Number(vetor_aux2[i]['valor'] * media_simples)

        }
        stringmedia = soma / total
        stringmoda = achando_moda(vetordados, vetor_aux2)


        let possiveis_medianas_continua = achando_mediana(vetordados, total, tipo_variavel)
        let medianas_continuas = []
        let auxiliar = 0
        for(i =0 ; i < possiveis_medianas_continua.length;i++){
           let nome2 = possiveis_medianas_continua[i]
            for(a =0 ; a < vetordados.length;a++){
                let nome1 = vetordados[a]['nome']
                if(nome2 == nome1){
                  if(possiveis_medianas_continua.length == 1){
                      let somatoria = Math.ceil(total/2)
                      let fant = vetordados[a-1]['Frequencia acumulada']
                      let fimd = vetordados[a]["valor"]
                      let h = vetordados[a]['limite_superior'] + vetordados[a]['limite_inferior']
                      let i = vetordados[a]['limite_inferior']
                      let fracao = (somatoria - fant)/fimd
                      let md = (fracao*h)+i
                      medianas_continuas.push(md)
                  }
                
                  else if(possiveis_medianas_continua.length > 1){
                      auxiliar++
                    if(auxiliar == 1){
                        let somatoria = Math.ceil(total/2)
                        let fant = vetordados[a-1]['Frequencia acumulada']
                        let fimd = vetordados[a]["valor"]
                        let h = vetordados[a]['limite_superior'] + vetordados[a]['limite_inferior']
                        let i = vetordados[a]['limite_inferior']
                        let fracao = (somatoria - fant)/fimd
                        let md = (fracao*h)+i
                        medianas_continuas.push(md)
  
                    }
                        else if(auxiliar == 2){
                            let somatoria2 = Math.ceil((total/2)+1)
                            let fant = vetordados[a-1]['Frequencia acumulada']
                            let fimd = vetordados[a]["valor"]
                            let h = vetordados[a]['limite_superior'] + vetordados[a]['limite_inferior']
                            let i = vetordados[a]['limite_inferior']
                            let fracao = (somatoria2 - fant)/fimd
                            let md = (fracao*h)+i
                            medianas_continuas.push(md) 
                        }
                  }
                }
            }
        }
        for(dado of medianas_continuas){
            stringmediana += dado + " "
            
        }
    }
    
    // criando a tabela dos pontos mediais 
    // cria o cabeçalho da tabela
    let linha_nomes = document.createElement('tr')
    pontos_centrais.appendChild(linha_nomes)
    //média
    let media = document.createElement('td')
    media.id = 'media'
    media.innerText = "Média"
    linha_nomes.appendChild(media)
    //Mediana
    let mediana_tabela = document.createElement('td')
    mediana_tabela.id = 'mediana_tabela'
    mediana_tabela.innerText = "Mediana"
    linha_nomes.appendChild(mediana_tabela)
    //Moda
    let moda_tabela = document.createElement('td')
    moda_tabela.id = 'moda_tabela'
    moda_tabela.innerText = "Moda"
    linha_nomes.appendChild(moda_tabela)
    //inserindo os valores 
    //CRIAR LINHA NA TABELA
    let linha = document.createElement('tr')
    pontos_centrais.appendChild(linha)
    //valor da média
    let cel1 = document.createElement('td')
    cel1.id = 'media_valor'
    cel1.innerText = stringmedia
    linha.appendChild(cel1)
    //valor da mediana
    let cel2 = document.createElement('td')
    cel2.id = 'mediana_valor'
    cel2.innerText = stringmediana
    linha.appendChild(cel2)
    //valor da moda
    let cel3 = document.createElement('td')
    cel3.id = 'moda_valor'
    cel3.innerText = stringmoda
    linha.appendChild(cel3)
}

function buscaSequencial(lista, valorBusca, fnComp) {
    for (let i = 0; i < lista.length; i++) {
        //Encontrou o que está buscando: retorna a posição
        //em que foi encontrado
        if (fnComp(lista[i], valorBusca)) return i
    }
    return -1 // valorBusca não foi encontrado em lista
}

// acha a mediana dos 3 primeiros casos
function achando_mediana(vetordados, total, tipo_variavel) {
    let mediana = []
    let stringmediana = ""
    if (total % 2 == 0) {
        let possivel_mediana1 = total / 2
        let possivel_mediana2 = possivel_mediana1 + 1
        for (let i = 0; i < vetordados.length; i++) {
            if (possivel_mediana1 <= vetordados[i]['Frequencia acumulada'] && vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana1) {
                mediana.push(vetordados[i]['nome'])
            } else if (possivel_mediana2 <= vetordados[i]['Frequencia acumulada'] && vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana2) {
                mediana.push(vetordados[i]['nome'])
            }
        }


    } else if (total % 2 != 0) {
        let possivel_mediana = Math.ceil(total / 2)
        for (let i = 0; i < vetordados.length; i++) {
            if ((possivel_mediana <= vetordados[i]['Frequencia acumulada']) && (vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana)) {
                mediana.push(vetordados[i]['nome'])

            }
        }
    }
    if (tipo_variavel == 1 || tipo_variavel == 2 || tipo_variavel == 3) {
        for (dado of mediana) {
            stringmediana += dado + " "

        }
        return stringmediana
    } else if (tipo_variavel == 4) {
        return mediana
    }
}

function achando_moda(vetordados, vetor_aux2) {
    let vetor_frequecias = []
    let moda = []
    let maior_frequencia
    let vetor_frequecias_ordenado = []
    let stringmoda = ""
    for (let i = 0; i < vetor_aux2.length; i++) {
        vetor_frequecias.push(vetor_aux2[i]['valor'])
    }
    vetor_frequecias.sort(function (a, b) {
        return a - b;
    });
    vetor_frequecias_ordenado = vetor_frequecias
    maior_frequencia = vetor_frequecias_ordenado[vetor_frequecias_ordenado.length - 1]
    let vezes_do_vetor = vetor_aux2.length

    for (let a = 0; a < vezes_do_vetor; a++) {

        let indice_moda = buscaSequencial(vetor_aux2, maior_frequencia, (obj, valor) => obj['valor'] === valor)

        if (indice_moda >= 0) {
            moda.push(vetor_aux2[indice_moda]['nome'])
            vetor_aux2.splice(indice_moda, 1)

        } else if (indice_moda == -1) {

            // break
        }
    }

    let tamanho_moda = moda.length
    let tamanho_vetordados = vetordados.length
    if (tamanho_moda == tamanho_vetordados) {
        stringmoda = "Não possui moda"

    } else {
        if (moda.length == 1) {
            stringmoda = moda[0]
        } else if (moda.length > 1) {
            for (dado of moda) {
                stringmoda += dado + "/ "

            }
        }

    }
    return stringmoda
}