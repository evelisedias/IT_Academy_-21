// atualizar pontos
function atualizaPontos() {
    document.getElementById('score-timeA').textContent = scoreTimeA;
    document.getElementById('score-timeB').textContent = scoreTimeB;

    atualizarPontuacaoNoLocalStorage('Time A', scoreTimeA);
    atualizarPontuacaoNoLocalStorage('Time B', scoreTimeB);

    atualizarTabelaDeTimes();
}

function atualizarPontuacaoNoLocalStorage(nomeTime, novaPontuacao) {
    listaDeTimes = JSON.parse(localStorage.getItem('listaDeTimes')) || [];
    const time = listaDeTimes.find(t => t.nome === nomeTime);
    if (time) {
        time.pontos = novaPontuacao;
        localStorage.setItem('listaDeTimes', JSON.stringify(listaDeTimes));
    }
}

function atualizarTabelaDeTimes() {
    listaDeTimes = JSON.parse(localStorage.getItem('listaDeTimes')) || [];
    const times = document.querySelector('#game__lista-equipes');

    if (listaDeTimes && listaDeTimes.length > 0) {
        let tableHTML = `
            <tr>
                <th>Nome do Time</th>
                <th>Pontuação</th>
            </tr>`;
        
        listaDeTimes.forEach(time => {
            const isDesclassificado = time.desclassificado; 
            tableHTML += `
                <tr style="${isDesclassificado ? 'background-color: red; color: white;' : ''}"> 
                    <td style="text-align: center;">${time.nome}</td>
                    <td style="text-align: center;">${time.pontos}</td>
                </tr>`;
        });

        times.innerHTML = tableHTML;
    } else {
        times.innerHTML = '<p>Nenhum time Cadastrado</p>';
    }
}