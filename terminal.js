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

    let commandIndex = 0; // Current command index in the commands array
    let charIndex = 0;    // Current character index within the command prompt
    let currentLine = null; // Reference to the currently typing line

    // Initialize the terminal by starting the first command
    function init() {
        // Directly start typing the first command
        commandIndex = 0;
        typeCommand();
    }
    
    function typeCommand() {
        const currentCommand = commands[commandIndex]; // Get the current command
    
        // Create a new line only when necessary and ensure it's not created prematurely
        if (!currentLine) {
            currentLine = document.createElement('p');
            currentLine.className = 'terminal-line terminal-prompt';
            terminal.appendChild(currentLine);
        }
    
        // Type characters one by one
        if (charIndex < currentCommand.prompt.length) {
            currentLine.textContent += currentCommand.prompt.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, 50); // Delay for typing effect
        } else {
            // Command fully typed, decide what to do next
            if (currentCommand.output) {
                setTimeout(() => showOutput(currentCommand.output), 500); // Show output if available
            } else {
                setTimeout(eraseCommand, 2000); // Erase the command if no output
            }
        }
    }
    

    // Function to display the output for a command
    function showOutput(output) {
        if (output) {
            // Split the output's inner HTML into individual lines
            const outputLines = output.innerHTML.split('<p class="terminal-line">');
            outputLines.forEach(line => {
                if (line.trim()) { // Ignore empty lines
                    const outputLine = document.createElement('p');
                    outputLine.className = 'terminal-line';
                    outputLine.innerHTML = line.replace('</p>', ''); // Remove closing tag
                    terminal.appendChild(outputLine); // Add line to the terminal
                }
            });
        }
        commandIndex++; // Move to the next command
        setTimeout(prepareNextCommand, 1000); // Prepare for the next command
    }

    // Function to erase the current command character by character
    function eraseCommand() {
        if (charIndex > 0) {
            currentLine.textContent = currentLine.textContent.slice(0, -1); // Remove last character
            charIndex--;
            setTimeout(eraseCommand, 30); // Delay for erase effect
        } else {
            currentLine.remove(); // Remove the line entirely
            currentLine = null; // Reset the current line reference
            commandIndex = (commandIndex + 1) % commands.length; // Move to the next command
            setTimeout(typeCommand, 500); // Start typing the next command
        }
    }

    // Prepare for the next command by resetting character index
    function prepareNextCommand() {
        charIndex = 0;
        currentLine = null; // Reset the current line
        typeCommand(); // Start typing the next command
    }

    init(); // Start the terminal simulation
});
