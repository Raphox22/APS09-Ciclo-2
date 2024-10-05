// Função para buscar os detalhes de um usuário
async function carregarUsuario() {
    const token = localStorage.getItem('token'); // Recupera o token de autenticação
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); // Obtém o ID do usuário da URL

    if (!userId) {
        exibirErro('ID do usuário não foi informado.');
        return;
    }

    if (!token) {
        exibirErro('Por favor, faça login para acessar os detalhes do usuário.');
        mostrarBotaoLogin(); // Exibe botão de login
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const usuario = await response.json(); // Converte a resposta em JSON
            mostrarDetalhes(usuario); // Exibe as informações do usuário
        } else {
            throw new Error('Erro ao buscar os detalhes do usuário.');
        }
    } catch (error) {
        console.error('Erro encontrado:', error);
        exibirErro('Falha ao carregar os detalhes do usuário.');
    }
}

// Função para exibir as informações do usuário na tela
function mostrarDetalhes(usuario) {
    document.getElementById('usuarioNome').textContent = usuario.name;
    document.getElementById('usuarioEmail').textContent = usuario.email;
    const dataCriacao = new Date(usuario.created_at); // Formata a data de criação
    const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Usa o formato 24 horas
    });
    document.getElementById('usuarioDataCriacao').textContent = `Criado em: ${dataFormatada}`;
    document.getElementById('usuarioDetalhes').classList.remove('d-none'); // Exibe os detalhes
}

// Função para exibir mensagens de erro
function exibirErro(mensagem) {
    const mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.textContent = mensagem; // Define o texto da mensagem de erro
    mensagemErro.classList.remove('d-none'); // Torna a mensagem visível
}

// Função para exibir o botão de login
function mostrarBotaoLogin() {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.classList.remove('d-none'); // Torna o botão visível
    loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html'; // Redireciona para a página de login
    });
}

// Função para voltar à página anterior
document.getElementById('voltarBtn').addEventListener('click', function() {
    window.history.back(); // Volta à página anterior
});

// Inicializa a função para carregar o usuário ao carregar a página
document.addEventListener('DOMContentLoaded', carregarUsuario);
