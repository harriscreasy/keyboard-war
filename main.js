const typingText = document.querySelector(".typing-text p");
let inpField = document.querySelector(".input-field");

function randomPara(){
    // Nombre hasard toujours plus petit que la longueur du tableau para
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    // Convertir le texte par un lettre par lettre.
    // split() divise une chaîne en un tableau de sous-chaînes et renvoie le tableau :
    // Ajoute chaque lettre dans un span et ajoute ce span dans le paragraphe typingText jusqu'à la fin du paragraphe
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    //Selectionne l'inputfield en appuyat sur une touche
    // Ou en cliquant sur le texte
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}



function initTyping(){
    const characters = typingText.querySelectorAll("span");
    console.log(characters[0]);
}

// Lance la fonction du paragraphe
randomPara();
inpField.addEventListener("input", initTyping);

