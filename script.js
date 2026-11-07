// Lógica do Formulário
const form = document.getElementById('formAgendamento');
const mensagemRetorno = document.getElementById('mensagemRetorno');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // Pega os valores
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;

    try {
      mensagemRetorno.style.display = 'block';
      mensagemRetorno.style.color = 'blue';
      mensagemRetorno.textContent = 'Enviando...';

      const response = await fetch('http://localhost:8080/api/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          telefone: telefone,
          servico: servico.toUpperCase()
        })
      });

      // AQUI ESTÁ A MUDANÇA: Lemos como texto, não como JSON
      const data = await response.text();

      if (response.ok) {
        mensagemRetorno.style.color = 'green';
        mensagemRetorno.textContent = 'Sucesso! ' + data;
        form.reset(); // Limpa o formulário
      } else {
        mensagemRetorno.style.color = 'red';
        mensagemRetorno.textContent = 'Erro: ' + data;
      }
    } catch (error) {
      mensagemRetorno.style.color = 'red';
      mensagemRetorno.textContent = 'Erro de conexão com o servidor. O backend está rodando?';
    }
  });
}