var botao = document.getElementById('botao1');

botao.onclick = function(){
var titulo = document.getElementById("mensagem");
var nome1  = document.getElementById("Password");
var nome2   = document.getElementById("confPassword");

if (nome1.value == nome2.value) {
	titulo.innerHTML = "duas Senha sao iguais!"; 
	titulo.style = "color: green"; 
	}
else {	
 	titulo.innerHTML = "Senhas devem ser iguais!"; 
	titulo.style = "color: red";
	};
	console.log(nome1.value + " - " + nome2.value);
}