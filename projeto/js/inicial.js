const iniciar = document.querySelector('.game__card-button--start');
const gameBoard = document.querySelector('.game__board');

// Função para gerar partidas
function gerarPartidas(fase, listaDeTimes) {
    if (listaDeTimes.length >= 2 && listaDeTimes.length % 2 === 0) {
        let table2HTML = `<h2>${fase}ª Fase</h2>
        <tr>
            <th>Chave A</th>
            <th></th>
            <th>Chave B</th> 
        </tr>`;

        let listaAleatoria = [...listaDeTimes];
        let partidas = []; 

        for (let i = 0; i < listaDeTimes.length / 2; i++) {
            if (listaAleatoria.length < 2) 
                break;

            let indiceAl1 = Math.floor(Math.random() * listaAleatoria.length);
            let timeA = listaAleatoria.splice(indiceAl1, 1)[0];
            console.log("Time A: " + timeA.nome);

            let indiceAl2 = Math.floor(Math.random() * listaAleatoria.length);
            let timeB = listaAleatoria.splice(indiceAl2, 1)[0];
            console.log("Time B: " + timeB.nome);

            partidas.push({ timeA, timeB });

            table2HTML += `
                <tr>
                    <td style="text-align: center;">${timeA.nome}</td>
                    <th>VS</th>
                    <td style="text-align: center;">${timeB.nome}</td>
                </tr>`;
        }

        gameBoard.innerHTML = table2HTML;
        return partidas;
    } else {
        gameBoard.innerHTML = '<p>Número de times deve ser par e pelo menos 2.</p>';
        console.log("Número de times deve ser par e pelo menos 2.");
        return [];
    }
}


let fase = 1;
let partidas = [];

// Iniciar campeonato
iniciar.addEventListener('click', () => {
    partidas = gerarPartidas(fase, listaDeTimes);
    if (partidas.length > 0) {
        fase++;
    }
});

// finalizar partida
var timeVencedor = [];

document.querySelector('.game__end').onclick = function() {
    alert(`Partida encerrada! \nTime A: ${scoreTimeA} pontos \nTime B: ${scoreTimeB} pontos`);

    atualizarPontuacaoNoLocalStorage(partidas[partidaIndex].timeA.nome, scoreTimeA);
    atualizarPontuacaoNoLocalStorage(partidas[partidaIndex].timeB.nome, scoreTimeB);

    const perdedor = scoreTimeA < scoreTimeB ? partidas[partidaIndex].timeA : partidas[partidaIndex].timeB;
    const vencedor = scoreTimeA > scoreTimeB ? partidas[partidaIndex].timeA : partidas[partidaIndex].timeB;

    timeVencedor.push({
        nome: vencedor.nome,
        desclassificado: false,
        vencedor: true  // Definindo que o time é o vencedor
    });

    console.log('Time vencedor:', vencedor.nome);

    marcarTimeComoDesclassificado(perdedor.nome);

    atualizarTabelaDeTimes();
    fecharPopup();

    if (partidaIndex < partidas.length - 1) {
        partidaIndex++;
        displayPartida();
    } else {
        console.log(timeVencedor);
        alert('Não há mais partidas');
    }
};



let proximaFase = document.querySelector('.game__nextFase');

proximaFase.addEventListener('click', () => {
    if (partidas.length > 0) {
        let vencedores = []; 
        partidas.forEach(partida => {
            // Adiciona apenas os times vencedores não desclassificados
            if (!partida.timeA.desclassificado && partida.timeA.vencedor) {
                vencedores.push(partida.timeA);
            }
            if (!partida.timeB.desclassificado && partida.timeB.vencedor) {
                vencedores.push(partida.timeB);
            }
        });

        // Verificar se há vencedores suficientes para a próxima fase
        if (vencedores.length >= 2 && vencedores.length % 2 === 0) {
            partidas = gerarPartidas(fase, vencedores); // Passa a lista de vencedores para gerar novas partidas
            if (partidas.length > 0) {
                fase++;
            }
        } else {
            gameBoard.innerHTML = '<p>Não há mais partidas</p>';
        }
    } else {
        gameBoard.innerHTML = '<p>Não há mais partidas</p>';
    }
});

