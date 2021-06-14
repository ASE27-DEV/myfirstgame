const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const zombie = document.getElementById('zombie');
const endScreen = document.getElementById('endScreen');

zombieLeft = 30;
gameOverNumber = 20;
loopPlay = false;

function start() {
    count = 0; // Au départ du jeu je met le compteur de socre à 0
    getFaster = 5000; // Je définie un temps maximum entre chaque pop de mob
    zombieRemaining = zombieLeft; // Je dis que le nombre de mob restant égale le nombre de départ stipulé hors fonction

    canvas.innerHTML = ''; // Je met le canvas vide
    score.innerHTML = count; // J'envoi l'information au compteur pour le départ de la partie
    zombie.innerHTML = zombieRemaining; // J'envoi l'information concernant le nombre de zombie à tué

    // Verification de ne pas relancer la fonction game() à chaque boucle
    loopPlay ? '' : game(); // Je lance la fonction game() pour lancer le jeu si et uniquement si loppPlay est égal à False
    loopPlay = true;

    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 1000 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => { // Ici je régle un temps entre chaque apparition de zombie
            if (zombieRemaining === 0) { // Si tu as tué le nombre de zombie demandés alors
                youWin(); // Tu as gagné!
            }
            else if (canvas.childElementCount < gameOverNumber) { // S'il n'y a pas encore le nombre de zombie max sur l'écran alors le jeu continue
                zombiePop(); // Lance la fonction d'apparition
                game(); // Je relance la fonction game pour que de nouveaux mobs apparaissent tout le temps
            } 
            else { // Si le nombres de zombies à l'écran atteint le nombre de zombieRemaining alors
                gameOver(); // Tu as perdu!
            }
        }, randomTime); // Ici je demande de rejouer la fonction sur un temps indéfinie 

    };

    // Fonction gameOver pour afficher l'écran de Fin
    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game Over <br/>score : ${count} <br/> Tu t'es laissé envahir...</div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

    // Fonction youWin pour afficher l'écran de Fin
    const youWin = () => {
        let accuracy = Math.round(count / zombieLeft * 100)
        if (accuracy < 70) {
            endScreen.innerHTML = `<div class="youWin">You win !!! <br/><span> Précision : ${accuracy}%</span> <br/> Ta précision laisse à désirer</div>`;
            endScreen.style.visibility = 'visible';
            endScreen.style.opacity = '1';
            loopPlay = false;
        }
        else {
            endScreen.innerHTML = `<div class="youWin">You win !!! <br/><span> Précision : ${accuracy}%</span> <br/> Tu es un excellent tueur de zombies</div>`;
            endScreen.style.visibility = 'visible';
            endScreen.style.opacity = '1';
            loopPlay = false;
        }
    }

}

// Initie la fonction Zombie (donc le mob)
function zombiePop() {
    let zombie = new Image(); // Instancie l'objet zombie en tant qu'image

    zombie.src = "./media/basic-pics/zombie.png"; // Donne le chemin pour l'image des mobs

    zombie.classList.add('zombie'); // Ici j'ajoute la classe zombie de mon CSS a mon objet zombie
    zombie.style.top = Math.random() * 500 + 'px'; // Ici je définie un endroit aléatoire en hauteur pour le départ du mob
    zombie.style.left = Math.random() * 500 + 'px'; // Ici je définie un endroit aléatoire en largeur pour le départ du mob
 
    let x, y;
    x = y = (Math.random() * 45) + 30; // Ici je lui défini une taille aléatoire mais hauteur et largeur sont égaux
    zombie.style.setProperty('--x', `${ x }px`); // J'assigne le résultat de x dynamiquement à mon CSS pour la largeur
    zombie.style.setProperty('--y', `${ y }px`); // J'assigne le résultat de y dynamiquement à mon CSS pour la hauteur

    let plusMinus = Math.random() < 0.5 ? -1 : 1; // Je fais un ternaire avec un random pour que la direction de l'animation soit aleatoire (soit positif soit négatif)
    let trX = Math.random() * 500 * plusMinus; // Ici je rends la direction de la largeur trX aleatoire car multiplier par -1 ou 1 
    let trY = Math.random() * 500 * plusMinus; // Ici je rends la direction de la hauteur trY aleatoire car multiplier par -1 ou 1 
    zombie.style.setProperty('--trX', `${trX}%`); // J'assigne le résultat de x dynamiquement à mon CSS pour la largeur
    zombie.style.setProperty('--trY', `${trY}%`); // J'assigne le résultat de y dynamiquement à mon CSS pour la hauteur

    canvas.appendChild(zombie);
}

// Retrait de l'élément cliqué
document.addEventListener('click', function(e) { // Fonction permettant de cibler l'élement cliqué
    targetElement = e.target || e.srcElement; // Variable permettant de retenir l'élément cliqué
 
    if (targetElement.classList.contains('zombie')) { // Si l'élement cliqué contient la classe zombie alors
        targetElement.remove(); // Remove l'élément cliqué
        count++; // Rajoute 1 au compteur
        score.innerHTML = count; // Envoi l'information à la page HTML pour tenir le compteur a jour
    };
    console.log(targetElement)
});

// Compteur dynamique sur le nombre de zombies restant à tué
canvas.addEventListener('click', () => { // Lorsque je clique sur un zombie
    if (zombieRemaining > 0) { // Si le compteur est au-dessus de 0
        zombieRemaining--; // Enleve 1 au compteur de zombieRemaining
        zombie.innerHTML = zombieRemaining; // Envoi l'information sur la page HTML
    }
});

// Je cree un TimeOut afin que si l'utilisateur clique sans arret même apres avoir gagné, l'écran de fin reste affiché 2.5 sec
endScreen.addEventListener('click', () => {
    setTimeout(() => {
        start();
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 2500);
});

