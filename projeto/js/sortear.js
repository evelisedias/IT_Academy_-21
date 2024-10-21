// iniciar campeonato
const iniciar = document.querySelector('.game__card-button--start');
const gameBoard = document.querySelector('.game__board');


//botão sortear times
iniciar.addEventListener('click', () => {
    if ((listaDeTimes.length >= 8 && listaDeTimes.length <= 16) || (listaDeTimes.length >= 8 && listaDeTimes.length % 2 === 0)) {
        let table2HTML = `
        <h2> 1ª Fase </h2>
        <tr>
            <th>Chave A</th>
            <th></th>
            <th>Chave B</th> 
        </tr>`;

        listaAleatoria = [...listaDeTimes];
        partidas = []; 

        for (let i = 0; i < listaDeTimes.length / 2; i++) {
            if (listaAleatoria.length < 2) 
                break;

            let indiceAl1 = Math.floor(Math.random() * listaAleatoria.length);
            let timeA = listaAleatoria.splice(indiceAl1, 1)[0];

            let indiceAl2 = Math.floor(Math.random() * listaAleatoria.length);
            let timeB = listaAleatoria.splice(indiceAl2, 1)[0];

            partidas.push({ timeA, timeB });

            table2HTML += `
                <tr>
                    <td style="text-align: center;">${timeA.nome}</td>
                    <th>VS</th>
                    <td style="text-align: center;">${timeB.nome}</td>
                </tr>`;
        }
        gameBoard.innerHTML = table2HTML;
        perdedores = [];
    } else {
        gameBoard.innerHTML = '<p>Nenhum time Cadastrado</p>';
        console.log("Número de times deve ser entre 8 e 16 ou ser par acima de 8");
    }
});

// Botão iniciar partida - Abrir pop up

document.getElementById('openPopup').onclick = function() {
    const popUp = document.getElementById('popup');
    popUp.style.zIndex = '1';
    popUp.style.display = 'flex';
};

document.getElementById('closePopup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
};

// Botão Start dentro de partida - jogos

document.querySelector('.game__start').onclick = function() {
    partidaIndex = 0; 
    displayPartida();
};

document.querySelector('.game__next').onclick = function() {
    scoreTimeA = 50;
    scoreTimeB = 50;
    atualizaPontos();
    partidaIndex++;
    if (partidaIndex < partidas.length) {
        displayPartida();
    } else {
        alert('Não há mais partidas');
    }
};

//display da partida
function displayPartida() {
    const partidasContainer = document.getElementById("partidas-container");
    
    if (partidaIndex < partidas.length) {
        const { timeA, timeB } = partidas[partidaIndex];
        const partidasHTML = `
            <h2> Jogos da 1ª Fase</h2>
            <table>
                <tr>
                    <td style="text-align: center; font-size: 15px;">${timeA.nome}</td>
                    <th>VS</th>
                    <td style="text-align: center; font-size: 15px;">${timeB.nome}</td>
                </tr>
            </table>`;
        partidasContainer.innerHTML = partidasHTML;
    } else {
        partidasContainer.innerHTML = '<p>Não há mais partidas disponíveis.</p>';
    }
}

var timeVencedor = []

// finalizar partida
document.querySelector('.game__end').onclick = function() {
    alert(`Partida encerrada! \nTime A: ${scoreTimeA} pontos \nTime B: ${scoreTimeB} pontos`);

    atualizarPontuacaoNoLocalStorage(partidas[partidaIndex].timeA.nome, scoreTimeA);
    atualizarPontuacaoNoLocalStorage(partidas[partidaIndex].timeB.nome, scoreTimeB);

    const perdedor = scoreTimeA < scoreTimeB ? partidas[partidaIndex].timeA : partidas[partidaIndex].timeB;
    const vencedor = scoreTimeA > scoreTimeB ? partidas[partidaIndex].timeA : partidas[partidaIndex].timeB;

    timeVencedor.push({
        nome: vencedor.nome,
        desclassificado: false
    });

    console.log('Time vencedor:', vencedor.nome);

    marcarTimeComoDesclassificado(perdedor.nome);

    atualizarTabelaDeTimes();
    fecharPopup();

    if (partidaIndex < partidas.length - 1) {
        partidaIndex++;
        displayPartida();
    } else {
        console.log(timeVencedor)
        alert('Não há mais partidas');
        
    }
};


// time perdedor
function marcarTimeComoDesclassificado(nomeTime) {
    listaDeTimes = JSON.parse(localStorage.getItem('listaDeTimes')) || [];
    listaDeTimes.forEach(time => {
        if (time.nome === nomeTime) {
            time.desclassificado = true;
        }
    });
    localStorage.setItem('listaDeTimes', JSON.stringify(listaDeTimes));
}

function fecharPopup() {
    const popUp = document.getElementById('popup');
    popUp.style.display = 'none';
}
