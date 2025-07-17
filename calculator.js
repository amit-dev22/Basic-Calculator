const display = document.getElementById('display');

    function append(val) {
      if (display.innerText === '0' || display.innerText === 'Error') {
        display.innerText = val;
      } else {
        display.innerText += val;
      }
    }

    function clearDisplay() {
      display.innerText = '0';
    }

    function backspace() {
      display.innerText = display.innerText.slice(0, -1) || '0';
    }

    function toggleSign() {
      try {
        let value = eval(display.innerText);
        display.innerText = -value;
      } catch {
        display.innerText = 'Error';
      }
    }

    function squareRoot() {
      try {
        let value = eval(display.innerText);
        if (value < 0) throw new Error();
        display.innerText = Math.sqrt(value);
      } catch {
        display.innerText = 'Error';
      }
    }

    function calculate() {
      try {
        let result = Function('"use strict"; return (' + display.innerText + ')')();
        display.innerText = Number.isFinite(result) ? result : 'Error';
      } catch {
        display.innerText = 'Error';
      }
    }

    function toggleTheme(checkbox) {
      const body = document.body;
      const label = document.getElementById('theme-label');
      if (checkbox.checked) {
        body.classList.add('light-mode');
        label.textContent = '☀️ Light';
      } else {
        body.classList.remove('light-mode');
        label.textContent = '🌙 Dark';
      }
    }

    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
        append(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key.toLowerCase() === 'c') {
        clearDisplay();
      }
    });