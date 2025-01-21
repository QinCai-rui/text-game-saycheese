let stories = {};

// Fetch stories from external JSON file
fetch('https://raw.githubusercontent.com/QinCai-rui/text-game-saycheese/refs/heads/main/static/stories.json')
    .then(response => response.json())
    .then(data => {
        stories = data;
        // Initial setup once the data is loaded
        document.getElementById("story").textContent = stories.start;
        document.getElementById("start-button").style.display = 'none';
        document.getElementById("game-box").innerHTML += getNextButtons('start');
    })
    .catch(error => {
        console.error('Error fetching stories:', error);
        document.getElementById("story").textContent = "Failed to load story data.";
    });

function choose(option) {
    const storyText = stories[option] || stories.start;
    displayText(storyText, () => {
        document.getElementById("game-box").innerHTML += getNextButtons(option);
    });
}

function startGame() {
    choose('start');
}

function getNextButtons(option) {
    switch (option) {
        case 'start':
            return '<button onclick="choose(\'left\')">Go Left</button>' +
                   '<button onclick="choose(\'right\')">Go Right</button>';
        case 'left':
            return '<button onclick="choose(\'open\')">Open the Chest</button>' +
                   '<button onclick="choose(\'leave\')">Leave the Chest</button>';
        case 'right':
            return '<button onclick="choose(\'talk\')">Talk to the Dragon</button>' +
                   '<button onclick="choose(\'run\')">Run Away</button>';
        case 'talk':
            return '<button onclick="choose(\'accept\')">Accept the Ride</button>' +
                   '<button onclick="choose(\'proceed\')">Proceed on Foot</button>';
        case 'open':
            return '<button onclick="choose(\'read\')">Read the Scroll</button>' +
                   '<button onclick="choose(\'take\')">Take the Gold</button>';
        case 'leave':
            return '<button onclick="choose(\'enter\')">Enter the Cave</button>' +
                   '<button onclick="choose(\'keepWalking\')">Keep Walking</button>';
        case 'read':
            return '<button onclick="choose(\'wizardDuel\')">Wizard Duel</button>' +
                   '<button onclick="choose(\'exploreCity\')">Explore City</button>';
        case 'take':
            return '<button onclick="choose(\'returnGold\')">Return the Gold</button>' +
                   '<button onclick="choose(\'keepGold\')">Keep the Gold</button>';
        case 'enter':
            return '<button onclick="choose(\'exploreCity\')">Explore the City</button>' +
                   '<button onclick="choose(\'escapeForest\')">Escape Forest</button>';
        case 'accept':
            return '<button onclick="choose(\'exploreTemple\')">Explore the Temple</button>' +
                   '<button onclick="choose(\'hiddenTemple\')">Hidden Temple</button>';
        case 'wizardDuel':
            return '<button onclick="choose(\'acceptDuel\')">Accept Duel</button>' +
                   '<button onclick="choose(\'resolvePeacefully\')">Resolve Peacefully</button>';
        default:
            return '<button onclick="choose(\'start\')">Start Again</button>';
    }
}

function displayText(text, callback) {
    let i = 0;
    document.getElementById('game-box').innerHTML = "<p id='story'></p>";
    const interval = setInterval(() => {
        document.getElementById('story').innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 30);
}