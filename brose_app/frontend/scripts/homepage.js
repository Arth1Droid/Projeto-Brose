document.addEventListener("DOMContentLoaded", () => {
  // Captura o parâmetro 'q' da URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.trim().toLowerCase();

  // Pega a div da mensagem de "não encontrado"
  const notFoundDiv = document.querySelector(".notfound-item");

  // Se tiver algo digitado na busca
  if (query) {
    // Preenche o input com o valor pesquisado
    document.querySelector('input[name="q"]').value = query;

    // Pega todas as peças
    const pecas = document.querySelectorAll(".items");
    let encontrouAlguma = false;

    pecas.forEach(peca => {
      const nome = peca.querySelector("h2").textContent.toLowerCase();

      // Mostra só as peças que têm o texto pesquisado
      if (nome.includes(query)) {
        peca.style.display = "";
        encontrouAlguma = true;
      } else {
        peca.style.display = "none";
      }
    });

    // Mostra ou esconde a div de "não encontrado"
    if (!encontrouAlguma) {
      notFoundDiv.style.display = "block";
    } else {
      notFoundDiv.style.display = "none";
    }
  } else {
    // Se não tiver busca, esconde a mensagem
    notFoundDiv.style.display = "none";
  }
});
