window.addEventListener("DOMContentLoaded", toggleModal);
window.toggleModal = toggleModal;

async function toggleModal() {
  const idCadastro = document.getElementById("cadastroModal");
  const modalSucesso = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeModal");
  const idDetalhes = document.getElementById("detailModal");
  const closeDetailModal = document.getElementById("closeDetailModal");
  const showDetailModal = document.querySelector(".items");
  if (modalSucesso) {
    function showSuccessModal() {
      modalSucesso.classList.add("active");
    }

    function hideSuccessModal() {
      modalSucesso.classList.remove("active");
    }

    modalSucesso.addEventListener("click", (event) => {
      if (event.target === modalSucesso) {
        hideSuccessModal();
      }
    });
  } else if (idCadastro) {
    function showCadastroModal() {
      idCadastro.classList.add("active");
    }
  });

    function hideCadastroModal() {
      idCadastro.classList.remove("active");
    }
  }

    if (addButton) {
      addButton.addEventListener("click", showCadastroModal);
    }
    if (closeBtn) closeBtn.addEventListener("click", hideCadastroModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideCadastroModal);

  else if(idDetalhes){
    function showDetalhe() {
      idDetalhes.classList.add("active");
    }
    function closeDetalhe(){
        idDetalhes.classList.remove("active");
    }
    if (closeDetailModal) {
        closeDetailModal.addEventListener("click", closeDetalhe)
    }
    if (showDetailModal) {
      showDetailModal.addEventListener("click", showDetalhe);
    }
}
}
// --------------------------------------------------------------------------------------------------:>


 // if (successModal) {
  //     function showSuccessModal(){
  //         successModal.classList.add('active');
  //     }

  //     function hideSuccessModal(){
  //         successModal.classList.remove('active');
  //     }

  //     successModal.addEventListener('click', (event) => {
  //         if (event.target === successModal) {
  //             hideSuccessModal();
  //         }
  //     });
  // }

// // MODAL DE CADASTRO
// document.addEventListener("DOMContentLoaded", function () {
//   const modalCadastro = document.getElementById("cadastroModal");
//   const modalSucesso = document.getElementById("successModal");
//   const form = document.getElementById("productForm");
//   const closeBtn = document.getElementById("closeModal");
//   const cancelBtn = document.querySelector("#cancel-btn");
//   const addButton = document.querySelector("#homepage-add");
//   const searchInput = document.querySelector('input[name="q"]');

//   function showCadastroModal() {
//     modalCadastro.classList.add("active");
//   }

//   function hideCadastroModal() {
//     modalCadastro.classList.remove("active");
//   }

//   if (addButton) {
//     addButton.addEventListener("click", showCadastroModal);
//   }
//   if (closeBtn) closeBtn.addEventListener("click", hideCadastroModal);
//   if (cancelBtn) cancelBtn.addEventListener("click", hideCadastroModal);

//   // FORMULÁRIO DE CADASTRO
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();
//     e.stopPropagation();

//     const name = document.getElementById("productName").value.trim();
//     const descricao = document.getElementById("productDesc").value.trim();

//     if (!name || !descricao) {
//       alert("Por favor, preencha todos os campos!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/produtos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nome: name, descricao: descricao }),
//       });

//       if (!response.ok) throw new Error("Erro ao cadastrar");

//       const result = await response.json();
//       console.log("Produto cadastrado:", result);

//       hideCadastroModal();
//       form.reset();
//       showSuccessModal();

//       // Recarrega a lista de produtos
//       await loadProducts();
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao salvar o produto: " + err.message);
//     }
//   });

//   // MODAL DE DETALHES
//   const detailModal = document.getElementById("detailModal");
//   const closeDetailModal = document.getElementById("closeDetailModal");
//   const historicoList = document.getElementById("historico-list");
//   const contadorSpan = document.getElementById("detailQuantidade");
//   const editButton = document.querySelector(".edit-bottom-contabiliza");
//   const contadorBox = document.querySelector(".contador-box");

//   let produtoAtual = null;
//   let editMode = false;

  


//   detailModal.addEventListener("click", (e) => {
//     if (e.target === detailModal) {
//       detailModal.classList.remove("active");
//       const controls = document.querySelector(".contador-controles");
//   };



//   if (editButton) {
//     editButton.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       if (!produtoAtual) return;

//       editMode = !editMode;

//       if (editMode) {
//         if (!document.querySelector(".contador-controles")) {
//           const controls = document.createElement("div");
//           controls.classList.add("contador-controles");
//           controls.innerHTML = `
//                         <button id="menos" class="btn-control">-</button>
//                         <button id="mais" class="btn-control">+</button>
//                     `;
//           contadorBox.appendChild(controls);

//           document.getElementById("mais").addEventListener("click", () => {
//             const dados = carregarDados();
//             dados[produtoAtual].quantidade++;
//             salvarDados(dados);
//             contadorSpan.textContent = dados[produtoAtual].quantidade;

//             const agora = new Date();
//             const hoje =
//               agora.toLocaleDateString("pt-BR", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               }) +
//               " - " +
//               agora.toLocaleTimeString("pt-BR", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//             dados[produtoAtual].historico.push({ data: hoje, total: "+1" });
//             salvarDados(dados);
//             renderHistorico();
//           });

//           document.getElementById("menos").addEventListener("click", () => {
//             const dados = carregarDados();
//             if (dados[produtoAtual].quantidade > 0) {
//               dados[produtoAtual].quantidade--;
//               salvarDados(dados);
//               contadorSpan.textContent = dados[produtoAtual].quantidade;

//               const agora = new Date();
//               const hoje =
//                 agora.toLocaleDateString("pt-BR", {
//                   day: "2-digit",
//                   month: "long",
//                   year: "numeric",
//                 }) +
//                 " - " +
//                 agora.toLocaleTimeString("pt-BR", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//               dados[produtoAtual].historico.push({ data: hoje, total: "-1" });
//               salvarDados(dados);
//               renderHistorico();
//             }
//           });
//         }
//         editButton.style.opacity = "0.6";
//       } else {
//         const controls = document.querySelector(".contador-controles");
//         if (controls) controls.remove();
//         editButton.style.opacity = "1";
//       }
//     });
//   }

//   const clearHistoryBtn = document.getElementById("clearHistoryBtn");
//   if (clearHistoryBtn) {
//     clearHistoryBtn.addEventListener("click", () => {
//       const dados = carregarDados();
//       if (produtoAtual && dados[produtoAtual]) {
//         dados[produtoAtual].historico = [];
//         salvarDados(dados);
//         renderHistorico();
//       }
//     });
//   }
// });
