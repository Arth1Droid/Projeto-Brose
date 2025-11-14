  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // impede o refresh

    const data = {
      name: document.getElementById("productName").value,
      description: document.getElementById("productDesc").value
    };

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Erro na requisição");

      const result = await response.json();
      console.log("Produto cadastrado:", result);
      alert("Produto cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o produto");
    }
  });
