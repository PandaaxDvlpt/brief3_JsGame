let randomNum = Math.floor(Math.random() * 50) + 1;
let attempts = 0;

// Les Elements HTML
const guess = document.getElementById("guess");
const submit = document.getElementById("submit");
const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attempts");
const attemptsRest = document.getElementById("attemptsRest");

// Les Events 

submit.addEventListener("click", checkGuess);

function checkGuess() {
    const userValue = Number(guess.value);
    attempts++;
  
    // Les Conditions randomNum
    if (userValue == randomNum) {
      hint.textContent = "Félicitations ! Vous avez trouvé le nombre" + attempts + " essais.";
      hint.style.color = "green";
    } else if (userValue < randomNum) {
      hint.textContent = "Trop bas ! Essayez encore.";
      hint.style.color = "red";
    } else {
      hint.textContent = "Trop haut ! Essayez encore.";
      hint.style.color = "red";
    }
    // Les Essais
    if (attempts > 1){
        attemptsText.textContent = "Vous avez dépassé le nombre d'essais autorisés ! Le nombre était " + randomNum;
        attemptsText.style.color = "red";
        submit.disabled = true;
        const video = document.getElementById("loseVideo");
        video.style.display = "block";
        video.play();
    } else if (attempts < 2) {
        attemptsText.textContent = "Vous avez encore " + (2 - attempts) + " essais restants.";
        attemptsText.style.color = "orange";
    } else if (attempts == 1) {
        attemptsText.textContent = "Dernier essai !";
        attemptsText.style.color = "orange";
    }
    
    // Réinitialiser le champ de saisie
    guess.value = ""; 
    guess.focus(); 
}