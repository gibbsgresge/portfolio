document.addEventListener('DOMContentLoaded', function() {
    // Get references to key DOM elements
    const terminal = document.querySelector('.terminal');
    const skillsOutput = document.getElementById('skills-output');
    const projectsOutput = document.getElementById('projects-output');

    // Array of commands to display in the terminal
    const commands = [
        { prompt: 'cat skills.txt', output: skillsOutput },
        { prompt: 'ls projects/', output: projectsOutput },
        { prompt: 'git add run.py', output: null },
        { prompt: 'flask run', output: null },
        { prompt: 'npm start', output: null },
        { prompt: 'java -jar app.jar', output: null },
        { prompt: 'python manage.py runserver', output: null }
    ];

    let commandIndex = 0;  // Track command index
    let charIndex = 0;     // Track character typing index
    let currentLine = null; // Track current line being typed
    let firstCommandsExecuted = false;  // Flag to track first commands execution

    // Initialize the terminal by starting the first command
    function init() {
        commandIndex = 0;
        typeCommand();
    }

    function typeCommand() {
        const currentCommand = commands[commandIndex];

        // Create a new line for command if necessary
        if (!currentLine) {
            currentLine = document.createElement('p');
            currentLine.className = 'terminal-line terminal-prompt';
            terminal.appendChild(currentLine);
        }

        // Type characters one by one
        if (charIndex < currentCommand.prompt.length) {
            currentLine.textContent += currentCommand.prompt.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, 50);  // Typing effect delay
        } else {
            // Command fully typed, handle next action
            if (currentCommand.output) {
                setTimeout(() => showOutput(currentCommand.output), 500);
            } else {
                setTimeout(eraseCommand, 2000);
            }
        }
    }

    function showOutput(output) {
        if (output) {
            // Split the output's inner HTML into lines and display them
            const outputLines = output.innerHTML.split('<p class="terminal-line">');
            outputLines.forEach(line => {
                if (line.trim()) {
                    const outputLine = document.createElement('p');
                    outputLine.className = 'terminal-line';
                    outputLine.innerHTML = line.replace('</p>', '');
                    terminal.appendChild(outputLine);
                }
            });
        }
        commandIndex++; // Move to the next command
        setTimeout(prepareNextCommand, 1000);
    }

    function eraseCommand() {
        if (charIndex > 0) {
            currentLine.textContent = currentLine.textContent.slice(0, -1);
            charIndex--;
            setTimeout(eraseCommand, 30);
        } else {
            currentLine.remove();
            currentLine = null;
            
            if (!firstCommandsExecuted && commandIndex >= 2) {
                firstCommandsExecuted = true;
            }

            // If first commands were executed, loop through the rest
            if (firstCommandsExecuted) {
                commandIndex = ((commandIndex - 2) % (commands.length - 2)) + 2;
            } else {
                commandIndex++;
            }

            setTimeout(typeCommand, 500);
        }
    }

    function prepareNextCommand() {
        charIndex = 0;
        currentLine = null;
        typeCommand();
    }

    init();
});
