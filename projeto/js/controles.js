// Controles de pontos

let scoreTimeA = 50;
let scoreTimeB = 50;

// Tipos de pontos
document.querySelector('.game__blot-timeA').onclick = function() {
    scoreTimeA += 5;
    atualizaPontos();
};

document.querySelector('.game__blot-timeB').onclick = function() {
    scoreTimeB += 5;
    atualizaPontos();
};

document.querySelector('.game__plif-timeA').onclick = function(){
    scoreTimeA += 1;
    atualizaPontos();
}

document.querySelector('.game__plif-timeB').onclick = function(){
    scoreTimeB += 1;
    atualizaPontos();
}