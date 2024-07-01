const questions = [
    {
        question: "Would you rather hang around:",
        options: ["Titan", "Dwarf", "Elf", "Doesn't matter"],
        key: "height"
    },
    {
        question: "What would be an ideal outcome in an arm wrestling match?",
        options: ["Lose on purpose", "KO", "Close win", "Tactical warfare", "Complete loss"],
        key: "physique"
    },
    {
        question: "What is the first color you want to see when you wake up in the morning?",
        options: ["Warm colors", "Cold colors", "Bright", "IDK"],
        key: "eye color",
        subOptions: {
            "Warm colors": ["Golden", "Red-orange", "Green", "Light pink"],
            "Cold colors": ["Black", "Purple", "Gray", "Subtle/Dark blue"],
            "Bright": ["White", "Sky blue", "Hot pink", "Yellow"]
        }
    },
    {
        question: "If you fell down the stairs, whose gaze would you prefer to meet?",
        options: ["A Gentle gaze", "Mocking", "Emotionless", "I will stand by my own"],
        key: "personality"
    }
];

let currentQuestionIndex = 0;
const userPreferences = {};

function displayQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    if (index >= questions.length) {
        findMatch();
        return;
    }

    const question = questions[index];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<h3>${question.question}</h3>`;

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => {
            userPreferences[question.key] = option.toLowerCase();
            if (question.subOptions && question.subOptions[option]) {
                displaySubOptions(question.subOptions[option], question.key);
            } else {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
            }
        };
        questionElement.appendChild(button);
    });

    questionContainer.appendChild(questionElement);
}

function displaySubOptions(subOptions, parentKey) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    subOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => {
            userPreferences[`${parentKey}Sub`] = option.toLowerCase();
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        };
        questionContainer.appendChild(button);
    });
}

function findMatch() {
    fetch('get_characters.php')
        .then(response => response.json())
        .then(dataList => {
            const match = dataList.find(character => 
                character.race === userPreferences.race &&
                character.arm_wrestling_outcome === userPreferences.armWrestlingOutcome &&
                character.first_color === userPreferences.firstColor &&
                (!userPreferences.firstColorSub || character.first_color_sub === userPreferences.firstColorSub) &&
                character.fall_gaze === userPreferences.fallGaze
            );

            const questionContainer = document.getElementById('question-container');
            if (match) {
                questionContainer.innerHTML = `<h3>Your match is ${match.name}!</h3>`;
            } else {
                questionContainer.innerHTML = `<h3>No match found</h3>`;
            }
        })
        .catch(error => console.error('Error fetching character data:', error));
}

// Initialize the first question
displayQuestion(currentQuestionIndex);
