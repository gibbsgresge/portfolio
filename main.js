document.addEventListener('DOMContentLoaded', function() {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded');
    });

    const fullName = "Gibbs Gresge";
    const typo = "Gibbs Gregse";
    const typingElement = document.getElementById('typing');
    let i = 0;
    let isCorrection = false;

    function typeWriter() {
        if (i < typo.length) {
            typingElement.innerHTML += typo.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else if (!isCorrection) {
            setTimeout(startCorrection, 1000);
        }
    }

    function startCorrection() {
        isCorrection = true;
        let j = typo.length;

        function eraseAndCorrect() {
            if (j > fullName.length - 2) {
                typingElement.innerHTML = typo.substring(0, j);
                j--;
                setTimeout(eraseAndCorrect, 50);
            } else {
                typingElement.innerHTML = fullName.substring(0, fullName.length - 2);
                setTimeout(finishCorrection, 200);
            }
        }

        eraseAndCorrect();
    }

    function finishCorrection() {
        let k = fullName.length - 2;

        function completeTyping() {
            if (k < fullName.length) {
                typingElement.innerHTML += fullName.charAt(k);
                k++;
                setTimeout(completeTyping, 100);
            }
        }

        completeTyping();
    }

    typeWriter();
});