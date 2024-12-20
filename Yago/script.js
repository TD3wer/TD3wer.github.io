document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("itemForm"); // Captura o formulário
    const itemNameInput = document.getElementById("itemName"); // Campo para nome do item
    const itemImageInput = document.getElementById("itemImage"); // Campo para URL da imagem
    const itemList = document.getElementById("itemList"); // Lista onde os itens serão exibidos
    const loadInitialItemsButton = document.getElementById("loadInitialItems"); // Botão para carregar itens iniciais

    // Lista inicial de itens
    const initialItems = [
        { name: "Brigadeiro", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPg0FgowS1kzDgYZA4QvxXfNgXpFRMQD6CxA&s" },
        { name: "Cupcake", image: "https://img.freepik.com/fotos-premium/cupcake-no-fundo-branco_985046-2281.jpg" },
        { name: "Bolo", image: "https://www.designi.com.br/images/preview/11044773.jpg" }
    ];

    // Função para carregar os itens iniciais no localStorage
    function loadInitialItems() {
        localStorage.setItem("shoppingList", JSON.stringify(initialItems)); // Armazena os itens iniciais
        displayItems(); // Exibe os itens
    }

    // Função para salvar um item no localStorage
    function saveItem(name, image) {
        let items = JSON.parse(localStorage.getItem("shoppingList")) || []; // Obtém itens existentes
        items.push({ name, image }); // Adiciona novo item
        localStorage.setItem("shoppingList", JSON.stringify(items)); // Atualiza localStorage
        displayItems(); // Exibe itens atualizados
    }

    // Função para exibir os itens do localStorage
    function displayItems() {
        itemList.innerHTML = ""; // Limpa a lista atual
        let items = JSON.parse(localStorage.getItem("shoppingList")) || []; // Obtém itens do localStorage
        items.forEach((item, index) => { // Itera sobre os itens
            const itemDiv = document.createElement("div"); // Cria um novo div para o item
            itemDiv.classList.add("item"); // Adiciona classe 'item'

            const img = document.createElement("img"); // Cria elemento de imagem
            img.src = item.image; // Define a fonte da imagem
            img.alt = item.name; // Define texto alternativo

            const name = document.createElement("span"); // Cria elemento de texto para o nome
            name.textContent = item.name; // Define o texto do nome

            const removeButton = document.createElement("button"); // Cria botão de remoção
            removeButton.textContent = "Remover"; // Define texto do botão
            removeButton.onclick = () => removeItem(index); // Define função para remover o item

            itemDiv.appendChild(img); // Adiciona imagem ao div do item
            itemDiv.appendChild(name); // Adiciona nome ao div do item
            itemDiv.appendChild(removeButton); // Adiciona botão ao div do item

            itemList.appendChild(itemDiv); // Adiciona o div do item à lista
        });
    }

    // Função para remover um item do localStorage
    function removeItem(index) {
        let items = JSON.parse(localStorage.getItem("shoppingList")) || []; // Obtém itens do localStorage
        items.splice(index, 1); // Remove o item pelo índice
        localStorage.setItem("shoppingList", JSON.stringify(items)); // Atualiza localStorage
        displayItems(); // Exibe itens atualizados
    }

    // Evento para adicionar um item ao clicar no botão do formulário
    itemForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        const name = itemNameInput.value.trim(); // Obtém nome do item
        const image = itemImageInput.value.trim(); // Obtém URL da imagem
        if (name && image) { // Verifica se ambos os campos estão preenchidos
            saveItem(name, image); // Salva o item
            itemNameInput.value = ""; // Limpa o campo de nome
            itemImageInput.value = ""; // Limpa o campo de imagem
        }
    });

    // Evento para carregar itens iniciais
    loadInitialItemsButton.addEventListener("click", loadInitialItems); // Define a ação do botão

    // Carrega os itens ao iniciar
    displayItems(); // Exibe os itens inicialmente
});
