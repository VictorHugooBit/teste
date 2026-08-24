const form = document.getElementById("formCadastro");
const cepInput = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");

// Preenche o endereço usando a API ViaCEP
cepInput.addEventListener("blur", async () => {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        document.getElementById("logradouro").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

        salvarDados();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível consultar o CEP.");
    }
});

// Salva os dados no localStorage
function salvarDados() {
    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    };

    localStorage.setItem("cadastroUsuario", JSON.stringify(dados));
}

// Salva automaticamente quando algum campo for alterado
form.addEventListener("input", salvarDados);

// Salva ao enviar o formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();

    salvarDados();

    mensagem.textContent = "Cadastro salvo com sucesso!";
});

// Recupera os dados salvos quando a página é carregada
window.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("cadastroUsuario");

    if (!dadosSalvos) {
        return;
    }

    const dados = JSON.parse(dadosSalvos);

    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("email").value = dados.email || "";
    document.getElementById("cep").value = dados.cep || "";
    document.getElementById("logradouro").value = dados.logradouro || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("cidade").value = dados.cidade || "";
    document.getElementById("estado").value = dados.estado || "";
});