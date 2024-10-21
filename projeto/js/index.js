//acessar html
const salvar = document.querySelector('#game__salvar-time');

//array de times
let listaDeTimes = [];

var time = new Object()
//criar time
    salvar.addEventListener('click', function(e) {

        e.preventDefault();

        const nomeTime = document.querySelector('#nome__time').value;
        const gritoTime = document.querySelector('#grito').value;
        const fundacaoTime = document.querySelector('#fundacao').value;
        let pontos

       let time = {
            nome: nomeTime,
            grito: gritoTime,
            fundacao: fundacaoTime,
            pontos: 50
        }

        listaDeTimes.push(time);
        localStorage.setItem('listaDeTimes', JSON.stringify(listaDeTimes));


        nomeTime = document.querySelector('#nome__time').value = '';
        gritoTime = document.querySelector('#grito').value = '';
        fundacaoTime = document.querySelector('#fundacao').value = '';
        });
        

    
