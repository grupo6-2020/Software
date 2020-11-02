/***********************************************************************************/
/*********************      DISTRIBUIÇÃO BINOMIAL       ****************************/
/***********************************************************************************/

//Captura de dados
let total = document.getElementById('total')
let sucesso = document.getElementById('sucesso')
let falha = document.getElementById("falha")
let k = document.getElementById("evento")
let vetor_final_evento = []
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
const resultado = document.getElementById("button")
const desvio = document.getElementById('tabelasvariaveis')
let cont = 0
const show3 = document.getElementById('to-top')

function botaoClique() {
    if (cont > 0) {
        vetor_final_evento.splice(0)
        while (desvio.firstChild) {
            desvio.removeChild(desvio.firstChild)
        }

    }
    cont += 1

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
                total.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (sucesso.value.trim() == '') {
        Swal.fire({
            icon: "error",
            title: "O 'Sucesso(p)' deve ser preenchido!",
            text: "",
            didClose: () => {
                sucesso.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (vetor_final[0] === undefined) {
        Swal.fire({
            icon: "error",
            title: "O 'Evento(k)' deve ser preenchido!",
            text: "",
            didClose: () => {
                k.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (conta_string > 0) {
        Swal.fire({
            icon: "error",
            title: "O 'Evento(k)' não pode conter letras!",
            text: "",
            didClose: () => {
                k.focus()
            } // Coloca o cursor no elemento especificado
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
                        k.focus()
                    } // Coloca o cursor no elemento especificado
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
        let desvio_padrao = variancia ** (1 / 2)



        // criando a tabela para exibir os valores 
        let linha_nomes = document.createElement('tr')
        linha_nomes.id = 'cabecalho'
        desvio.appendChild(linha_nomes)
        //probabilidade
        let probabilidade = document.createElement('td')
        probabilidade.id = 'probabilidade'
        probabilidade.innerText = "Probabilidade"
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
        cel2.innerText = variancia.toFixed(2) 
        linha.appendChild(cel2)
        //valor do desvio padrão 
        let cel3 = document.createElement('td')
        cel3.id = 'desvio_padrao_valor'
        cel3.innerText = desvio_padrao.toFixed(2) 
        linha.appendChild(cel3)
        //valor do desvio padrão 
        let cel4 = document.createElement('td')
        cel4.id = 'media_valor'
        cel4.innerText = media.toFixed(2) 
        linha.appendChild(cel4)

        show3.style.display = 'flex' // Mostar botão de roalr para cima        

        // Descer a página após clicar no botão
        $('html, body').animate({
            scrollTop: 2000
        }, 0);
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

/***********************************************************************************/
/**********************      DISTRIBUIÇÃO NORMAL       *****************************/
/***********************************************************************************/
let dadoNormal_menor
let dadoNormal_entre
let dadoNormal_maior
const limpa_gauss = document.getElementById('graficoGauss')

function mudarNormal(tipo) {
    if (tipo == 1) {
        document.getElementById('valorMenor').style.display = 'inline-block'
        document.getElementById('entreDe').style.display = 'none'
        document.getElementById('entreAte').style.display = 'none'
        document.getElementById('valorMaior').style.display = 'none'
        dadoNormal_menor = true
        dadoNormal_entre = false
        dadoNormal_maior = false


    }
    if (tipo == 2) {
        document.getElementById('valorMenor').style.display = 'none'
        document.getElementById('entreDe').style.display = 'inline-block'
        document.getElementById('entreAte').style.display = 'inline-block'
        document.getElementById('valorMaior').style.display = 'none'
        dadoNormal_entre = true
        dadoNormal_menor = false
        dadoNormal_maior = false
    }
    if (tipo == 3) {
        document.getElementById('valorMenor').style.display = 'none'
        document.getElementById('entreDe').style.display = 'none'
        document.getElementById('entreAte').style.display = 'none'
        document.getElementById('valorMaior').style.display = 'inline-block'
        dadoNormal_maior = true
        dadoNormal_entre = false
        dadoNormal_menor = false
    }
}



//Cálculos


let media = document.getElementById('media')
let desvioPadrao = document.getElementById('desvioPadrao')
let valorMenor = document.getElementById('valorMenor')
let entreDe = document.getElementById('entreDe')
let entreAte = document.getElementById('entreAte')
let valorMaior = document.getElementById('valorMaior')
const resultado2 = document.getElementById('button2')

resultado2.addEventListener('click', botaoClique2)



function botaoClique2() {
    if (cont > 0) {
        //vetor_final_x.splice(0)
        while (desvio.firstChild) {
            desvio.removeChild(desvio.firstChild)
        }
    }
    cont += 1


    let m = parseFloat(media.value)
    let dp = parseFloat(desvioPadrao.value)
    let vMenor = parseFloat(valorMenor.value)
    let vMaior = parseFloat(valorMaior.value)
    let eDe = parseFloat(entreDe.value)
    let eAte = parseFloat(entreAte.value)
    let areaDe, areaAte, areaMenor, areaMaior;
    let z_1, z_2
    let probabilidade
    let podeseguir = true

    if(eDe >= eAte){
        podeseguir = false
        Swal.fire({
            icon: "error",
            title: "O valor 'De' deve ser menor que o valor 'Até'.",
            text: "",
            didClose: () => {
                entreDe.focus()
            } // Coloca o cursor no elemento especificado
        })
        
    }
    else if(podeseguir){
    //EntreDe, Até..
    if (dadoNormal_entre) {
        if (eDe < m && eAte > m) {
            z_1 = ((m - eDe) / dp).toFixed(2)
            z_2 = ((eAte - m) / dp).toFixed(2) 
            areaDe = tabela_normal(z_1) 
            areaAte = tabela_normal(z_2)
            probabilidade = (areaDe + areaAte) * 100
        } else if (eDe < m && eAte < m) {
            z_1 = ((m - eDe) / dp).toFixed(2) 
            z_2 = ((m - eAte) / dp).toFixed(2) 
            areaDe = tabela_normal(z_1)
            areaAte = tabela_normal(z_2)
            probabilidade = (areaDe - areaAte) * 100
        } else if (eDe > m && eAte > m) {
            z_1 = ((eDe - m) / dp).toFixed(2) 
            z_2 = ((eAte - m) / dp).toFixed(2) 
            areaDe = tabela_normal(z_1)
            areaAte = tabela_normal(z_2)
            probabilidade = (areaAte - areaDe)  * 100
        } else if (eDe < m && eAte == m) {
            z_1 = ((m - eDe) / dp).toFixed(2) 
            areaDe = tabela_normal(z_1)
            probabilidade = areaDe * 100
        } else if (eDe == m && eAte > m) {
            z_1 = ((eAte - m) / dp).toFixed(2) 
            areaAte = tabela_normal(z_1)
            probabilidade = areaAte * 100
        }
        area1 = eDe
        area2 = eAte
    }

    // Valor Maior
    if (dadoNormal_maior) {
        if (vMaior > m) {
            z_1 = ((vMaior - m) / dp).toFixed(2)
            areaMaior = tabela_normal(z_1)
            probabilidade = (0.5 - areaMaior)*100
        } else if (vMaior < m) {
            z_1 = ((m - vMaior) / dp).toFixed(2)
            areaMaior = tabela_normal(z_1)
            probabilidade = (0.5 + areaMaior)*100
        } else if (vMaior == m) {
            z_1 = 0.5
            probabilidade = 50
        }
        area1 = vMaior
        area2 = m+dp+15
    }

    //Valor Menor
    if (dadoNormal_menor) {
        if (vMenor < m) {
            z_1 = ((m - vMenor) / dp).toFixed(2)
            areaMenor = tabela_normal(z_1)
            probabilidade = (0.5 - areaMenor) * 100
        } else if (vMenor > m) {
            z_1 = ((vMenor - m) / dp).toFixed(2)
            areaMenor = tabela_normal(z_1)
            probabilidade = (areaMenor + 0.5)*100
        }
        else if (vMenor == m){
            z_1 = 0.5
            probabilidade = 50
        }
        area1 = m-dp-15
        area2 = vMenor
    }  

    // criando a tabela para exibir os valores 
    let linha_nomes = document.createElement('tr')
    linha_nomes.id = 'cabecalho'
    desvio.appendChild(linha_nomes)
    //probabilidade
    let probabilidade_tabela = document.createElement('td')
    probabilidade_tabela.id = 'probabilidade_tabela'
    probabilidade_tabela.innerText = "Probabilidade"
    linha_nomes.appendChild(probabilidade_tabela)
    //CRIAR LINHA NA TABELA
    let linha = document.createElement('tr')
    desvio.appendChild(linha)
    //probabilidade valor
    let cel1 = document.createElement('td')
    cel1.id = 'probabilidade_valor'
    cel1.innerText = probabilidade.toFixed(2) + '%'
    linha.appendChild(cel1)
    
    }

    // Criando gráfico
    limpa_gauss.classList.remove("gauss")
    graficoGauss(m-dp, m+dp, area1, area2)

    show3.style.display = 'flex' // Mostar botão de roalr para cima        

        // Descer a página após clicar no botão
        $('html, body').animate({
            scrollTop: 2000
        }, 0);
}

function tabela_normal(z){

let distribuicao_normal = 
[0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359,
 0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753,
 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141,
 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517,
 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879,
 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224,
 0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549,
 0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852,
 0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133,
 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389,
 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621,
 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830,
 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015,
 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177,
 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319,
 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441,
 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545,
 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633,
 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706,
 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767,
 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817,
 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857,
 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890,
 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916,
 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936,
 0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952,
 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964,
 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974,
 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981,
 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986,
 0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990,
 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993,
 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995,
 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997,
 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998,
 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998,
 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999,
 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999,
 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999,
 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000,
]
if(z >= 4){ return 0.5}
else if(z <= 3.99){
let posicao = z * 100
return distribuicao_normal[posicao]
}
}

/********************   GRAFICO GAUSS   *********************/

function graficoGauss(comecoGauss, fimGauss, area1, area2){
	const comecoCurva = comecoGauss, fimCurva = fimGauss
	const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2)) * 100000
	const getMean = (comecoCurva, fimCurva) => (fimCurva + comecoCurva) / 2
	const getStdDeviation = (comecoCurva, fimCurva) => (fimCurva - comecoCurva) / 4
	const generatePoints = (comecoCurva, fimCurva) => {
        let stdDev = getStdDeviation(comecoCurva, fimCurva)
        let min = comecoCurva - 2 * stdDev
        let max = fimCurva + 2 * stdDev
        let unit = (max - min) / 100
        return _.range(min, max, unit)
	}
	let mean = getMean(comecoCurva, fimCurva)
	let stdDev = getStdDeviation(comecoCurva, fimCurva)
	let points = generatePoints(comecoCurva, fimCurva)
	let seriesData = points.map(x => ({ x, y: normalY(x, mean, stdDev)}))
	var MyChart = Highcharts.chart('graficoGauss', {
		chart: {
			type: 'area',
            height: 400,
            backgroundColor: '#DCDCDC',
            borderColor: '#4D1717',
            borderWidth: 8
		},
		title: {
            text: 'Gráfico de Gauss',
            style: {
                fontFamily: 'Poppins',
                color: '#4D1717',
                fontSize: "30px",
                fontWeight: 'bolder',
                textDecoration: 'underline'
            },
			y: 50
		},
		yAxis: {
		labels: {
			enabled: false,  	
				},
		gridLineWidth: 0,
		title: ''
		},
		tooltip: {
		enabled: false,
		},
		legend: {
			enabled: false,
			},
		series: [{
            data: seriesData,
            color: '#000000'
		}],
		plotOptions: {
			area: {
				marker:{enabled: false},
			enableMouseTracking: false,
			color: '#4D1717',
			fillColor: '#4D1717',
			zoneAxis: 'x',
			zones: [{
			fillColor: '#DCDCDC',
			value: area1,
		},{
			value: area2,
		},{
			fillColor: '#DCDCDC',
		}]
				}
		}
	});
}

/************************************************************/




/**************FUNÇÃO DE TRANSIÇÃO DOS CARDS****************/
let ativo1 = document.getElementById('ativo1')
let ativo2 = document.getElementById('ativo2')
let ativo3 = document.getElementById('ativo3')

function mudarCard(tipo) {
    if (tipo == 1) {
        ativo1.classList.add("active")
        ativo2.classList.remove("active")
        ativo3.classList.remove("active")
        while (desvio.firstChild) {
            desvio.removeChild(desvio.firstChild)
        }
        limpa_gauss.classList.add("gauss")
    }
    if (tipo == 2) {
        ativo1.classList.remove("active")
        ativo2.classList.add("active")
        ativo3.classList.remove("active")
        while (desvio.firstChild) {
            desvio.removeChild(desvio.firstChild)
        }
        limpa_gauss.classList.add("gauss")
    }
    if (tipo == 3) {
        ativo1.classList.remove("active")
        ativo2.classList.remove("active")
        ativo3.classList.add("active")
        while (desvio.firstChild) {
            desvio.removeChild(desvio.firstChild)
        }
        limpa_gauss.classList.add("gauss")
    }
   
}
/**********************************************************/

/*****************BOTÃO DE LIMPAR DADOS********************/
function botaoApagar() { // BINOMIAL
    vetor_final_evento.splice(0)
    while (desvio.firstChild) {
        desvio.removeChild(desvio.firstChild)
    }
    total.value = ''
    sucesso.value = ''
    k.value = ''
    falha.value = ''
}

function botaoApagar2() { // NORMAL
    while (desvio.firstChild) {
        desvio.removeChild(desvio.firstChild)
    }
    media.value = ''
    desvioPadrao.value = ''
    valorMenor.value = ''
    valorMaior.value = ''
    entreDe.value = ''
    entreAte.value = ''
    limpa_gauss.classList.add("gauss")
}
/***********************************************************/

/*****************BOTÃO DE VOLTAR AO TOPO********************/
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})
/************************************************************/