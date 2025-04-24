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

submit.addEventListener("click", checkGuess); // Ici on appelle la fontion CheckBox pour pouvoir check le nombre

function checkGuess() {
    const userValue = Number(guess.value);
    let ecart = Math.abs(userValue - randomNum); 
    let rest = 0 - attempts; // Nombre d'essais restants
    let win = userValue == randomNum;
    attempts++;
  
    // Les Conditions randomNum
    if (win) {
        hint.textContent = "Félicitations ! Vous avez trouvé le nombre " + attempts + " essais.";
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
    if (rest > 0) {
        attemptsText.textContent = `Il vous reste ${rest} essai${rest > 1 ? 's' : ''}.`;
        attemptsText.style.color = "orange";
    } else if (win == false) {
        attemptsText.textContent = "Vous avez dépassé le nombre d'essais autorisés ! Le nombre était " + randomNum;
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

    guess.value = ""; 
    guess.focus(); 
}