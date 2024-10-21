//carregar times criados e acessar html
let listaDeTimes = JSON.parse(localStorage.getItem('listaDeTimes'));
const times = document.querySelector('#game__lista-equipes');


//Criando tabela com times criados na página
if (listaDeTimes && listaDeTimes.length > 0) {
    let tableHTML = `
        <tr>
            <th>Nome do Time</th>
            <th>Pontuação</th>
        </tr>`;
    
    listaDeTimes.forEach(time => {
        tableHTML += `
            <tr> 
                <td style="text-align: center;">${time.nome}</td>
                <td style="text-align: center;">${time.pontos}</td>
            </tr>`;
    });

    times.innerHTML = tableHTML;
} else {
    times.innerHTML = '<p>Nenhum time Cadastrado</p>';
}


