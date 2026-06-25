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

        if (/^[0-9.]$/.test(value)) {
            playSound(numberClickSound);
        } else if (value !== '=') {
            playSound(clickSound);
        }

        if (value === 'AC') {
            equation = '';
            equationDisplay.textContent = '';
            resultDisplay.textContent = '0';
            return;
        }

        if (value === 'BACK') {
            equation = equation.slice(0, -1);
            updateDisplay();
            return;
        }

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

        equation += value;
        updateDisplay();
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9' || key === '.') {
        equation += key;
        updateDisplay();
        playSound(numberClickSound);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        equation += key;
        updateDisplay();
        playSound(clickSound);
    } else if (key === 'Enter') {
        try {
            const expression = equation.replace(/X/g, '*');
            const result = eval(expression);
            equationDisplay.textContent = equation;
            resultDisplay.textContent = result;
            equation = result.toString();
            playSound(equalsSound);
        } catch {
            playSound(errorSound);
            equationDisplay.textContent = '';
            resultDisplay.textContent = 'Error';
            equation = '';
        }
    } else if (key === 'Backspace') {
        equation = equation.slice(0, -1);
        updateDisplay();
        playSound(clickSound);
    } else if (key === 'Escape') {
        equation = '';
        equationDisplay.textContent = '';
        resultDisplay.textContent = '0';
        playSound(clickSound);
    }
});