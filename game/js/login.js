const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => { /*verificar se o campo não está vazio */ 
  if (target.value.length > 2) { /*verifica se pelo menos duas letras foram digitadas*/ 
    button.removeAttribute('disabled'); /*caso isso ocorra, será removido o atributo disable do botão*/ 
  }
  else{
  button.setAttribute('disabled', ''); /*se a condição não for cumprida, o botão continua desabilitado*/ 
}
}

const handleSubmit = (event) => {
  event.preventDefault(); /*bloqueia o recarregamento automático da página quando o formulário é enviado */ 

  localStorage.setItem('player', input.value); /*armazena o nome do jogador no localstorage(devtoools)*/ 
  window.location = 'pages/game.html'; /*redireciona o usuário a página do jogo*/ 
}

input.addEventListener('input', validateInput); /*usuário digitou algo executa a função acima  */ 
form.addEventListener('submit', handleSubmit); /*quando o formulário for envuiado será executado esta função */