//pegando o nome e a label de cada campo para poder trabalhar com eles
//para cada campo cria uma variável boleana que começa falsa
let nome = document.querySelector("#nome");
let nomeLabel = document.querySelector("#nomeLabel");
let validNome = false;

let email = document.querySelector("#email");
let emailLabel = document.querySelector("#emailLabel");
let validEmail = false;

let senha = document.querySelector("#senha");
let senhaLabel = document.querySelector("#senhaLabel");
let validSenha = false;

let confirmaSenha = document.querySelector("#confirmaSenha");
let confirmaSenhaLabel = document.querySelector("#confirmaSenhaLabel");
let validConfirmaSenha = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

//validando cada campo pra ver se o que está digitado é certo
nome.addEventListener("keyup", () => {
    if (nome.value.length <= 2) {
        nomeLabel.setAttribute("style", "color: red");
        nomeLabel.innerHTML = "Nome *Insira no mínimo 3 caracteres";
        nome.setAttribute("style", "border-color: red");
        validNome = false;
    } else {
        nomeLabel.setAttribute("style", "color: green");
        nomeLabel.innerHTML = "Nome:";
        nome.setAttribute("style", "border-color: green");
        validNome = true;
    }
});

email.addEventListener("keyup", () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    
    // Verificando se o e-mail é válido
    if (!emailRegex.test(email.value)) {
        emailLabel.setAttribute("style", "color: red");
        emailLabel.innerHTML = "E-mail *Digite um e-mail válido (exemplo@dominio.com)";
        email.setAttribute("style", "border-color: red");
        validEmail = false;
    }
    // Verificando se o e-mail já existe no localStorage
    else if (listaUser.some(user => user.emailCad === email.value)) {
        emailLabel.setAttribute("style", "color: red");
        emailLabel.innerHTML = "E-mail já cadastrado. Tente outro.";
        email.setAttribute("style", "border-color: red");
        validEmail = false;
    } else {
        emailLabel.setAttribute("style", "color: green");
        emailLabel.innerHTML = "E-mail:";
        email.setAttribute("style", "border-color: green");
        validEmail = true;
    }
});

senha.addEventListener("keyup", () => {
    if (senha.value.length <= 4) {
        senhaLabel.setAttribute("style", "color: red");
        senhaLabel.innerHTML = "Senha *Insira no mínimo 5 caracteres";
        senha.setAttribute("style", "border-color: red");
        validSenha = false;
    } else {
        senhaLabel.setAttribute("style", "color: green");
        senhaLabel.innerHTML = "Senha:";
        senha.setAttribute("style", "border-color: green");
        validSenha = true;
    }
});

confirmaSenha.addEventListener("keyup", () => {
    if (senha.value != confirmaSenha.value) {
        confirmaSenhaLabel.setAttribute("style", "color: red");
        confirmaSenhaLabel.innerHTML = "Confirmar senha *As senhas não estão iguais";
        confirmaSenha.setAttribute("style", "border-color: red");
        validConfirmaSenha = false;
    } else {
        confirmaSenhaLabel.setAttribute("style", "color: green");
        confirmaSenhaLabel.innerHTML = "Confirmar Senha:";
        confirmaSenha.setAttribute("style", "border-color: green");
        validConfirmaSenha = true;
    }
});

function cadastrar() {
    if (validNome && validEmail && validSenha && validConfirmaSenha) {
        //pega a listaUser e adiciona no localStorage e caso não tenha uma lista cria uma
        let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
        //adicionando valores na lista de usuarios
        listaUser.push({
            nomeCad: nome.value,
            emailCad: email.value,
            senhaCad: senha.value
        });
        //adicionando ao localStorage
        localStorage.setItem("listaUser", JSON.stringify(listaUser));
        //mensagens de cadastro
        msgSuccess.setAttribute("style", "display: block");
        msgSuccess.innerHTML = "Cadastrando usuário...";

        msgError.setAttribute("style", "display: none");
        msgError.innerHTML = "";
        //mudando o local da pagina quando o cadastro e realizado
        //criando um atraso pra trocar de janela
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } else {
        //mensagens de erro
        msgError.setAttribute("style", "display: block");
        msgError.innerHTML = "Preencha os campos corretamente!!";

        msgSuccess.setAttribute("style", "display: none");
        msgSuccess.innerHTML = "";
    }
}
