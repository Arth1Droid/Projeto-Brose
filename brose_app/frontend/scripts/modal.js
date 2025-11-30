// ------------------ FUNÇÕES GLOBAIS DE MODAIS ------------------
function showModal(modal) {
  if (modal) modal.classList.add("active");
}

function hideModal(modal) {
  if (modal) modal.classList.remove("active");
}

// Função para abrir o modal de detalhes e preencher os dados
function abrirDetalhes(produto) {
  const detailModal = document.getElementById("detailModal");
  if (!detailModal) return;

  document.getElementById("detailName").textContent = produto.nome;
  document.getElementById("detailDesc").textContent = produto.descricao;

  const quantidadeSpan = document.getElementById("detailQuantidade");
  quantidadeSpan.textContent = produto.quantidade;

  showModal(detailModal);

  // Dispara o evento customizado para notificar que o modal abriu
  const event = new CustomEvent("modalDetalhesAberto", { detail: produto });
  document.dispatchEvent(event);
}


// Tornar global para outros scripts
window.showModal = showModal;
window.hideModal = hideModal;
window.abrirDetalhes = abrirDetalhes;

// ------------------ CONFIGURAÇÃO DE EVENTOS ------------------
document.addEventListener("DOMContentLoaded", () => {
  const cadastroModal = document.getElementById("cadastroModal");
  const successModal = document.getElementById("successModal");
  const detailModal = document.getElementById("detailModal");

  const addButton = document.getElementById("homepage-add");
  const closeCadastroBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancel-btn");
  const closeDetailBtn = document.getElementById("closeDetailModal");

  // Modal de cadastro
  if (addButton) addButton.addEventListener("click", () => showModal(cadastroModal));
  if (closeCadastroBtn) closeCadastroBtn.addEventListener("click", () => hideModal(cadastroModal));
  if (cancelBtn) cancelBtn.addEventListener("click", () => hideModal(cadastroModal));

  // Modal de sucesso
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) hideModal(successModal);
    });
  }

  // Modal de detalhes
  if (closeDetailBtn) closeDetailBtn.addEventListener("click", () => hideModal(detailModal));
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) hideModal(detailModal);
    });
  }
});
