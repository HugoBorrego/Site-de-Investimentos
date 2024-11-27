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
        total = (total + valorMensal) * (1 + jurosMensal);
        totalInvestido += valorMensal;
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
