document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal');
    const skillsOutput = document.getElementById('skills-output');
    const projectsOutput = document.getElementById('projects-output');
    
    const commands = [
        { prompt: 'cat skills.txt', output: skillsOutput },
        { prompt: 'ls projects/', output: projectsOutput },
        { prompt: 'git add run.py', output: null },
        { prompt: 'flask run', output: null },
        { prompt: 'npm start', output: null },
        { prompt: 'java -jar app.jar', output: null },
        { prompt: 'python manage.py runserver', output: null }
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let currentLine;

    function init() {
        currentLine = document.createElement('p');
        currentLine.className = 'terminal-line terminal-prompt';
        terminal.appendChild(currentLine);
        typeCommand();
    }

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        if (charIndex < currentCommand.prompt.length) {
            currentLine.textContent += currentCommand.prompt.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, 50);
        } else {
            if (commandIndex < 2) {
                setTimeout(() => showOutput(currentCommand.output), 500);
            } else {
                setTimeout(eraseCommand, 2000);
            }
        }
    }

    function showOutput(output) {
        const outputContent = output.innerHTML;
        const outputLines = outputContent.split('<p class="terminal-line">');
        outputLines.forEach((line, index) => {
            if (index !== 0) {  // Skip the first empty element
                const outputLine = document.createElement('p');
                outputLine.className = 'terminal-line';
                outputLine.innerHTML = line.replace('</p>', '');
                terminal.appendChild(outputLine);
            }
        });
        commandIndex++;
        setTimeout(prepareNextCommand, 1000);
    }

    function eraseCommand() {
        if (charIndex > 0) {
            currentLine.textContent = currentLine.textContent.slice(0, -1);
            charIndex--;
            setTimeout(eraseCommand, 30);
        } else {
            commandIndex = (commandIndex + 1) % commands.length;
            if (commandIndex < 2) commandIndex = 2;  // Skip back to the first repeating command
            setTimeout(typeCommand, 500);
        }
    }

    function prepareNextCommand() {
        charIndex = 0;
        currentLine = document.createElement('p');
        currentLine.className = 'terminal-line terminal-prompt';
        terminal.appendChild(currentLine);
        typeCommand();
    }

    init();
});