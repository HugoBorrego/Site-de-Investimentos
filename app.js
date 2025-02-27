function formatoDinheiro(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value !== '') {
        input.value = parseFloat(reais).toLocaleString('pt-BR');
    } else {
        input.value = '';
    }
}

function formatoPorcentagem(input) {
    let value = input.value.replace(/\D/g, '');
    if (value !== '') {
        input.value = parseFloat(percentual).toFixed(2);
    } else {
        input.value = '';
    }
}

function formatoMeses(input) {
    let value = input.value.replace(/\D/g, '');
    if (value !== '') {
        input.value = value;
    } else {
        input.value = '';
    }
}

function calcular() {
    const valorInicial = parseFloat(document.getElementById('valorinicial').value.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const taxaJuros = parseFloat(document.getElementById('taxa').value.replace(/[^\d,.-]/g, '').replace(',', '.')) / 100;
    const periodo = parseFloat(document.getElementById('periodo').value.replace(/[^\d]/g, ''));
    const valorMensal = parseFloat(document.getElementById('valormensal').value.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const aliquotaImposto = parseFloat(document.getElementById('aliquota').value.replace(/[^\d,.-]/g, '').replace(',', '.')) / 100;

    if (isNaN(valorInicial) || isNaN(taxaJuros) || isNaN(periodo) || isNaN(valorMensal) || isNaN(aliquotaImposto)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let total = valorInicial;
    let totalInvestido = valorInicial;
    let jurosMensal = taxaJuros / 12;
    
    for (let i = 0; i < periodo; i++) {
        if (i == 0) {
            // No primeiro mês, apenas aplicamos os juros ao valor inicial
            total *= (1 + jurosMensal);
        } else {
            // A partir do segundo mês, somamos o valor mensal e aplicamos os juros
            total = (total + valorMensal) * (1 + jurosMensal);
            totalInvestido += valorMensal;
        }
    }
    
    const rendimentoBruto = total - totalInvestido;
    const imposto = rendimentoBruto * aliquotaImposto;
    const totalLiquido = total - imposto;
    

    document.getElementById('valorliquido').textContent = totalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('rendimento').textContent = rendimentoBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('imposto').textContent = imposto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function limpar() {
    document.getElementById('valorinicial').value = '';
    document.getElementById('valormensal').value = '';
    document.getElementById('periodo').value = '';
    document.getElementById('taxa').value = '';
    document.getElementById('aliquota').value = '';
    document.getElementById('valorliquido').textContent = 'R$ 0,00';
    document.getElementById('rendimento').textContent = 'R$ 0,00';
    document.getElementById('imposto').textContent = 'R$ 0,00';
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCharts);

function drawCharts() {
    var barData = google.visualization.arrayToDataTable([
        ['Ano', 'Investimento', 'Financiamento'],
        ['1', 10000, 10000],
        ['2', 10960, 9000],
        ['3', 12010, 8000],
        ['4', 13160, 7000],
        ['5', 14420, 6000],
        ['6', 15810, 5000],
        ['7', 17330, 4000],
        ['8', 19000, 3000],
        ['9', 20820, 2000],
        ['10', 22810, 1000],
        ['11', 25000, 0]
    ]);

    var barOptions = {
        focusTarget: 'category',
        backgroundColor: 'transparent',
        colors: ['blue', 'red'],
        fontName: 'Open Sans',
        chartArea: {
            left: 50,
            top: 10,
            width: '100%',
            height: '70%'
        },
        bar: {
            groupWidth: '80%'
        },
        hAxis: {
            textStyle: {
                fontSize: 11
            }
        },
        vAxis: {
            minValue: 0,
            maxValue: 30000,
            baselineColor: '#DDD',
            gridlines: {
                color: '#DDD',
                count: 4
            },
            textStyle: {
                fontSize: 11
            }
        },
        legend: {
            position: 'bottom',
            textStyle: {
                fontSize: 12
            }
        },
        animation: {
            duration: 1200,
            easing: 'out',
            startup: true
        }
    };

    var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
    barChart.draw(barData, barOptions);

    var lineData = google.visualization.arrayToDataTable([
    ['Ano', 'Imóvel', 'Aluguel'],
        ['2000', 10000, 6000],
        ['2002', 11000, 6600],
        ['2004', 12000, 7200],
        ['2006', 13000, 7800],
        ['2008', 14000, 8400],
        ['2010', 15000, 9000],
        ['2012', 16000, 9600],
        ['2014', 17000, 10200],
        ['2016', 18000, 10800],
        ['2018', 19000, 11400],
        ['2020', 20000, 12000],
        ['2022', 21000, 12600],
        ['2024', 22000, 13200]
    ]);

    var lineOptions = {
        backgroundColor: 'transparent',
        colors: ['blue', 'red'],
        fontName: 'Open Sans',
        focusTarget: 'category',
        chartArea: {
            left: 50,
            top: 10,
            width: '100%',
            height: '70%'
        },
        hAxis: {
            textStyle: {
                fontSize: 11
            },
            baselineColor: 'transparent',
            gridlines: {
                color: 'transparent'
            }
        },
        vAxis: {
            minValue: 0,
            maxValue: 1000,
            baselineColor: '#DDD',
            gridlines: {
                color: '#DDD',
                count: 4
            },
            textStyle: {
                fontSize: 11
            }
        },
        legend: {
            position: 'bottom',
            textStyle: {
                fontSize: 12
            }
        },
        animation: {
            duration: 1200,
            easing: 'out',
            startup: true
        }
    };

    var lineChart = new google.visualization.LineChart(document.getElementById('line-chart'));
    lineChart.draw(lineData, lineOptions);
}
