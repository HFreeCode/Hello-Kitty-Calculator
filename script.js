const equationDisplay = document.getElementById('equation');
const resultDisplay = document.getElementById('result');

let equation = '';

// Sounds
const clickSound = new Audio('sounds/click.mp3');
const numberClickSound = new Audio('sounds/number_click.mp3');
const equalsSound = new Audio('sounds/equals.mp3');
const errorSound = new Audio('sounds/error.mp3');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function updateDisplay() {
    equationDisplay.textContent = equation;
    resultDisplay.textContent = equation || '0';
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // Number buttons
        if (/^[0-9.]$/.test(value)) {
            playSound(numberClickSound);
        }
        // Everything except equals
        else if (value !== '=') {
            playSound(clickSound);
        }

        // AC
        if (value === 'AC') {
            equation = '';
            equationDisplay.textContent = '';
            resultDisplay.textContent = '0';
            return;
        }

        // Backspace
        if (value === 'BACK') {
            equation = equation.slice(0, -1);
            updateDisplay();
            return;
        }

        // Equals
        if (value === '=') {
            playSound(equalsSound);

            try {
                const expression = equation.replace(/X/g, '*');
                const result = eval(expression);

                equationDisplay.textContent = equation;
                resultDisplay.textContent = result;

                equation = result.toString();
            } catch {
                playSound(errorSound);

                equationDisplay.textContent = '';
                resultDisplay.textContent = 'Error';
                equation = '';
            }

            return;
        }

        // Plus / Minus
        if (value === '+/-') {
            if (!equation) return;

            if (equation.startsWith('-')) {
                equation = equation.slice(1);
            } else {
                equation = '-' + equation;
            }

            updateDisplay();
            return;
        }

        // Normal input
        equation += value;
        updateDisplay();
    });
});