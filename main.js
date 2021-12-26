const typingText = document.querySelector(".typing-text p");
let inpField = document.querySelector(".input-field");
let timeTag = document.querySelector(".time span");
let mistakeTag = document.querySelector(".mistake span");
let wpmTag = document.querySelector(".WPM span");
let cpmTag = document.querySelector(".CPM span");
let tryAgainBtn = document.querySelector("button");

let timer, 
maxTime = 60, 
timeLeft = maxTime, 
charIndex = mistakes = isTyping = 0;




function randomPara(){
    // Nombre hasard toujours plus petit que la longueur du tableau para
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // Convertir le texte par un lettre par lettre.
    // split() divise une chaîne en un tableau de sous-chaînes et renvoie le tableau :
    // Ajoute chaque lettre dans un span et ajoute ce span dans le paragraphe typingText jusqu'à la fin du paragraphe
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");

    //Selectionne l'inputfield en appuyat sur une touche
    // Ou en cliquant sur le texte
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

// Permet de connecter les characteres de l'input et les caractères du texte, 
//Si la bonne lettre est tapé on lui met la class correct sinon incorrect
// On incremente charIndex pour passer à la lettre suivante

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

   if(charIndex < characters.length - 1 && timeLeft > 0 ){

    if(!isTyping){
        let timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    

    // Pour effacer
    if(typedChar == null){
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    } else{

        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct");
            
        } else{
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }

        charIndex++; //Que ce soit correct ou incorrect
        // Pour suivre le caractère actif

    }

    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round((((charIndex - mistakes) /5) /(maxTime - timeLeft)) *60);
    wpm = wpm < 0 || wpm == Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;


   } else{
       //l'user ne peut plus écrire si le time est à 0
       inpField.value = "";
        clearInterval(timer);
   }

}

function initTimer(){
    if (timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomPara();
    inpField.value = "";
    clearInterval(timer);
     timeLeft = maxTime,
     charIndex = mistakes = isTyping = 0;
     timeTag.innerText = timeLeft;
     mistakeTag.innerText = mistakes;
     wpmTag.innerText = 0;
     cpmTag.innerText = 0;
}



// Lance la fonction du paragraphe
randomPara();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

