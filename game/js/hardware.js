const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [ /*array com o nome das imagens que vão ser utilizadas*/ 
        'teclado',
        'hd',
        'placa-mae',
        'cooler',
        'fonte',
        'mouse',
        'processador',
        'placa_video',
        'memoria_ram',
        'cdrom',
         ];

const createElement = (tag, className) => { /*cria as outras cartas*/ 
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => { /*checha se o jogo terminoux*/
  const disabledCards = document.querySelectorAll('.disabled-card'); /*procura as cartas com a classe disabled-card*/

  if (disabledCards.length === 20) { /*se o numero de cartas for igual a 20*/
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`); /*mensagem de vitória*/ 
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) { /*se primeira a primeira carta for igual a segunda*/ 

    firstCard.firstChild.classList.add('disabled-card'); /*adiciona a classe disable-card se a cartas forem iguais*/
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card'); /*se não forem iguais remove a classe*/  
      secondCard.classList.remove('reveal-card');

      firstCard = ''; 
      secondCard = '';

    }, 500);/*espera 0,5 segundos e vira a carta novamente*/
  }

}

const revealCard = ({ target }) => { /*função revela a carta*/ 



  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') { /*verfica se a carta foi clicada*/ 

    target.parentNode.classList.add('reveal-card'); /*adiciona reveal card*/ 
    firstCard = target.parentNode;

  } else if (secondCard === '') { /*verfica a segunda carta*/ 

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode; /*salva carta*/

    checkCards();

  }
}

const createCard = (character) => { /*cria as divs das cartas*/ 

  const card = createElement('div', 'card'); /*createelement - cria p elemento que está dentro do ()*/ 
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../pag3/${character}.jpg')`; /*imagem de fundo*/ 
  front.style.backgroundSize = 'cover';

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => { /*função que carrega o jogo*/
  const duplicateCharacters = [...characters, ...characters]; /*duplica as cartas*/ 

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); /*as cartas ficam com ordem aleatória - sort e math math random*/ 

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => { /*tempo de jogo*/ 

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;//+ converte string em número
    timer.innerHTML = currentTime + 1; acrescenta
  }, 1000); //a cada segundo que se passa soma-se um no timer

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player'); /*pega o nome digitado no localstorage do devtools*/
  startTimer();
  loadGame(); /*função carrega jogo vai ser executada somente quando a janela  estiver carregada*/ 
}