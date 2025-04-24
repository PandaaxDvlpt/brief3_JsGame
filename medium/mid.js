let randomNum = Math.floor(Math.random() * 50) + 1;
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
    const rest = 1 - attempts; // Nombre d'essais restants
    attempts++;
  
    // Les Conditions randomNum
    if (userValue == randomNum) { // Si userValue = randomNum
      hint.textContent = "Félicitations ! Vous avez trouvé le nombre " + attempts + " essais."; // alors on affiche le message de félicitations
      hint.style.color = "green";
    } else if (userValue < randomNum) {
        if(ecart < 3) {
            hint.textContent = "Un peu bas ! Vous êtes très proche ! Essayez encore.";
            hint.style.color = "yellow";
        } else if(ecart < 5) {
            hint.textContent = "Trop bas ! Vous vous refroidissez! Essayez encore.";
            hint.style.color = "red";
        }
    } else {
        if(ecart > 3) {
            hint.textContent = "Un peu haut ! Vous êtes très proche ! Essayez encore.";
            hint.style.color = "yellow";
        } else if(ecart > 5) {
            hint.textContent = "Trop haut ! Vous vous refroidissez! Essayez encore.";
            hint.style.color = "red";
        }
    }
    // Les Essais
    if (rest > 0) { // Si il reste des essais alors on affiche le nombre d'essais restants
        attemptsText.textContent = `Il vous reste ${rest} essai${rest > 1 ? 's' : ''}.`;
        attemptsText.style.color = "orange";
    } else {
        attemptsText.textContent = "Vous avez dépassé le nombre d'essais autorisés ! Le nombre était " + randomNum; // sinon on affiche le message d'echec + une vidéo se lance
        attemptsText.style.color = "red";
        submit.disabled = true;

        // Screamer
        videoElement.src = "../screamer.mp4";
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.autoplay = true;

        document.body.appendChild(videoElement);

        videoElement.onloadeddata = function () {
            videoElement.requestFullscreen().catch(err => {
                console.error("Erreur lors du passage en plein écran:", err);
            });
        };

        videoElement.play().catch(err => {
            console.error("Erreur lors de la lecture:", err);
        });
    }

    guess.value = ""; // on rénitialise la valeur de l'input
    guess.focus(); 
}