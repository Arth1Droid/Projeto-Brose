document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("searchForm");
  const input = form.querySelector('input[name="q"]');
  const notFoundDiv = document.querySelector(".notfound-item");
  const pecas = document.querySelectorAll(".items");
  const searchButton = document.querySelector(".homepage_search_button");

  // Impede recarregamento da página
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const query = input.value.trim().toLowerCase();
    filtrarPecas(query);
  });

  // Clique no botão da lupa 🔍
  searchButton.addEventListener("click", () => {
    const query = input.value.trim().toLowerCase();
    filtrarPecas(query);
  });

  // 🔎 Função para filtrar peças
  function filtrarPecas(query) {
    if (!query) {
      pecas.forEach(peca => peca.style.display = "");
      notFoundDiv.style.display = "none";
      return;
    }

    let encontrou = false;

    pecas.forEach(peca => {
      const nome = peca.querySelector("h2").textContent.toLowerCase();

      if (nome.includes(query)) {
        peca.style.display = "";
        encontrou = true;
      } else {
        peca.style.display = "none";
      }
    });

    notFoundDiv.style.display = encontrou ? "none" : "block";
  }

});
