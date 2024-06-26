const questions = [
    {
        question: "What type of personality do you prefer?",
        options: ["Tsundere", "Yandere", "Kuudere", "Dandere"],
        key: "personality"
    },
    {
        question: "What hair color do you prefer?",
        options: ["Black", "Blonde", "Red", "Blue"],
        key: "hairColor"
    },
    {
        question: "What eye color do you prefer?",
        options: ["Brown", "Blue", "Green", "Gray"],
        key: "eyeColor"
    },
    {
        question: "What is their favorite hobby?",
        options: ["Sports", "Reading", "Gaming", "Cooking"],
        key: "hobby"
    },
    {
        question: "What role do you prefer?",
        options: ["Hero", "Villain", "Sidekick", "Mentor"],
        key: "role"
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
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        };
        questionElement.appendChild(button);
    });

    questionContainer.appendChild(questionElement);
}

function findMatch() {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(dataList => {
            const match = dataList.find(character => 
                character.personality === userPreferences.personality &&
                character.hair_color === userPreferences.hairColor &&
                character.eye_color === userPreferences.eyeColor &&
                character.hobby === userPreferences.hobby &&
                character.role === userPreferences.role
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
