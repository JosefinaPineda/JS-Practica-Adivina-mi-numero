document.addEventListener('DOMContentLoaded', () => {
    let min, max, guess;
    const adivinadorImages = [
        '/src/img/Bruja1.png', 
        '/src/img/Bruja2.png', 
        '/src/img/Bruja3.png', 
        '/src/img/Bruja4.png',
        '/src/img/Bruja5.png'
    ]; 
    let currentAdivinadorIndex = 0;

    const dialogue = document.getElementById('dialogue');
    const resultDiv = document.getElementById('result');
    const startGameButton = document.getElementById('start-game');
    const feedbackDiv = document.getElementById('feedback');
    const adivinadorImg = document.getElementById('adivinador');

    startGameButton.addEventListener('click', startGame);

    function startGame() {
        min = 1;
        max = 100;
        guess = Math.floor((min + max) / 2);
        startGameButton.style.display = 'none';
        resultDiv.style.display = 'none';
        feedbackDiv.innerHTML = '';
        dialogue.style.display = 'none'; 
        updateAdivinadorImage();
        showDialogue(`Piensa en un número del 1 al 100.<br>¿Es tu número ${guess}?`, true);
    }

    function updateAdivinadorImage() {
        currentAdivinadorIndex = (currentAdivinadorIndex + 1) % adivinadorImages.length;
        adivinadorImg.src = adivinadorImages[currentAdivinadorIndex];
    }

    function addEventListeners(type) {
        if (type === 'question') {
            document.getElementById('yes').addEventListener('click', () => {
                showResult(`¡Tu número es ${guess}, excelente decisión!`, true);
            });

            document.getElementById('no').addEventListener('click', () => {
                showFeedback(`¿Tu número es mayor que ${guess}?`, true);
            });
        } else if (type === 'feedback') {
            document.getElementById('greater').addEventListener('click', () => {
                min = guess + 1;
                nextGuess();
            });

            document.getElementById('less').addEventListener('click', () => {
                max = guess - 1;
                nextGuess();
            });
        }
    }

    function nextGuess() {
        if (min > max) {
            showResult(`Algo salió mal, no hay más números posibles.`, true);
            return;
        }

        guess = Math.floor((min + max) / 2);
        updateAdivinadorImage();
        showDialogue(`¿Es tu número ${guess}?`);
    }

    function showDialogue(message, hideFeedback = false) {
        resultDiv.style.display = 'none';
        feedbackDiv.innerHTML = '';

        dialogue.innerHTML = `
            <div class="dialogue-message">
                ${message}
            </div>
            <div class="button-container">
                <button class="btn btn-dark" id="yes">Sí</button>
                <button class="btn btn-dark" id="no">No</button>
            </div>
        `;
        
        dialogue.style.display = 'block'; 

        if (hideFeedback) {
            feedbackDiv.innerHTML = ''; 
        }

        addEventListeners('question');
    }

    function showFeedback(message) {
        dialogue.innerHTML = `
            <div class="feedback-message">
                ${message}
            </div>
            <div class="button-container">
                <button class="btn btn-dark" id="greater">Sí</button>
                <button class="btn btn-dark" id="less">No</button>
            </div>
        `;
        
        dialogue.style.display = 'block'; 

        resultDiv.style.display = 'none';
        addEventListeners('feedback');
    }

    function showResult(message, restart = false) {
        dialogue.innerHTML = `
            <div class="result-message">
                ${message}
            </div>
        `;
        feedbackDiv.innerHTML = '';
        resultDiv.style.display = 'block';

        const existingRestartButton = document.getElementById('restart');
        if (existingRestartButton) {
            existingRestartButton.remove();
        }

        if (restart) {
            resultDiv.innerHTML += `
                <button class="btn btn-dark mt-3" id="restart">Reiniciar</button>
            `;
            document.getElementById('restart').addEventListener('click', startGame);
        }
    }
});
