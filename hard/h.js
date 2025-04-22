let randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Les Elements HTML
const guess = document.getElementById("guess");
const submit = document.getElementById("submit");
const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attempts");
const attemptsRest = document.getElementById("attemptsRest");
const videoElement = document.createElement("video");
document.getElementById("videoContainer").appendChild(videoElement);


// Les Events 

submit.addEventListener("click", checkGuess);

function checkGuess() {
    const userValue = Number(guess.value);
    const ecart = Math.abs(userValue - randomNum); 
    attempts++;
  
    // Les Conditions randomNum
    if (userValue == randomNum) {
        hint.textContent = "Félicitations ! Vous avez trouvé le nombre " + attempts + " essais.";
        hint.style.color = "green";
      } else if (userValue < randomNum) {
          if(ecart < 2) {
              hint.textContent = "Un peu bas ! Vous êtes très proche ! Essayez encore.";
              hint.style.color = "yellow";
          } else if(ecart < 5) {
              hint.textContent = "Trop bas ! Vous vous refroidissez! Essayez encore.";
              hint.style.color = "red";
          }
      } else {
          if(ecart > 2) {
              hint.textContent = "Un peu haut ! Vous êtes très proche ! Essayez encore.";
              hint.style.color = "yellow";
          } else if(ecart > 5) {
              hint.textContent = "Trop haut ! Vous vous refroidissez! Essayez encore.";
              hint.style.color = "red";
          }
      }
    // Les Essais
    if (attempts > 0){
        attemptsText.textContent = "Vous avez dépassé le nombre d'essais autorisés ! Le nombre était " + randomNum;
        attemptsText.style.color = "red";
        submit.disabled = true; 

        const videoElement = document.createElement("video");
        videoElement.src = "../screamer.mp4";
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.autoplay = true;
        
        document.body.appendChild(videoElement);
        
        videoElement.onloadeddata = function() {
            videoElement.requestFullscreen().catch(err => {
                console.error("Erreur lors du passage en plein écran:", err);
            });
        };
        
        // Démarrer la lecture
        videoElement.play().catch(err => {
            console.error("Erreur lors de la lecture:", err);
        });
    } else if (attempts < 1) {
        attemptsText.textContent = "Vous avez encore " + (2 - attempts) + " essais restants.";
        attemptsText.style.color = "orange";
    } else if (attempts == 0) {
        attemptsText.textContent = "Dernier essai !";
        attemptsText.style.color = "orange";
    }
    
    // Réinitialiser le champ de saisie
    guess.value = ""; 
    guess.focus(); 
}