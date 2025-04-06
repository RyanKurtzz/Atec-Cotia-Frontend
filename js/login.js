function entrar() {
    let email = document.querySelector("#email")
    let emailLabel = document.querySelector("#emailLabel")

    let senha = document.querySelector("#senha")
    let senhaLabel = document.querySelector("#senhaLabel")

    let msgError = document.querySelector("#msgError")
    let listaUser = []

    // Criando objeto com atributos pré-definidos
    let usuarioValid = {
        nome: "",
        email: "",
        senha: ""
    }

    // Chamando a lista de usuários do localStorage
    listaUser = JSON.parse(localStorage.getItem("listaUser")) || []

    // Varre a lista de usuários para encontrar um e-mail correspondente
    listaUser.forEach((item) => {
        if (email.value === item.emailCad && senha.value === item.senhaCad) {
            usuarioValid = {
                nome: item.nomeCad,
                email: item.emailCad,
                senha: item.senhaCad
            }
        }
    })

    if (email.value === usuarioValid.email && senha.value === usuarioValid.senha) {
        // Se der certo o login, redireciona para outra página
        window.location.href = "cadastroatualizado.html"
    } else {
        // Mensagens de erro no layout
        emailLabel.setAttribute("style", "color: red")
        email.setAttribute("style", "border-color: red")
        senhaLabel.setAttribute("style", "color: red")
        senha.setAttribute("style", "border-color: red")
        msgError.setAttribute("style", "display: block")
        msgError.innerHTML = "E-mail ou senha incorretos"
        
        // Voltar o foco para o campo de e-mail
        email.focus()
    }
}

document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData(this); // Captura os dados do formulário

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "Login realizado com sucesso!") {
            // Redireciona para a página de perfil ou dashboard
            window.location.href = "perfil.php";
        } else {
            // Exibe a mensagem de erro na div #msgError
            document.getElementById('msgError').innerText = data;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
