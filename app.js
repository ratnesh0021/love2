// Array to store questions
let questionList = [];

// Add question event listeners
document.getElementById('userName').addEventListener('input', updateOutputs);
document.getElementById('partnerName').addEventListener('input', updateOutputs);
document.getElementById('memories').addEventListener('input', updateOutputs);

// Handle keyboard events for question input
document.getElementById('questionInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addQuestion();
        e.preventDefault();
    }
});

// Function to add a question to the list
function addQuestion() {
    const questionInput = document.getElementById('questionInput');
    const questionText = questionInput.value.trim();
    
    if (questionText !== '' && !questionList.includes(questionText)) {
        questionList.push(questionText);
        questionInput.value = '';
        renderQuestions();
        updateOutputs();
    }
}

// Clear all questions
function clearQuestions() {
    if (confirm('Are you sure you want to clear all questions?')) {
        questionList = [];
        renderQuestions();
        updateOutputs();
    }
}

// Render questions to the DOM
function renderQuestions() {
    const questionsListElement = document.getElementById('questionsList');
    questionsListElement.innerHTML = '';
    
    questionList.forEach((question, index) => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.textContent = question;
        div.onclick = () => {
            if (confirm('Remove this question?')) {
                questionList.splice(index, 1);
                renderQuestions();
                updateOutputs();
            }
        };
        questionsListElement.appendChild(div);
    });
}

// Update all outputs simultaneously
function updateOutputs() {
    updateQAOutput();
    updateLetterOutput();
    updateProfileNames();
}

// Generate Q&A output
function updateQAOutput() {
    const userName = document.getElementById('userName').value || 'Jane Doe';
    const outputElement = document.getElementById('qaList');
    outputElement.innerHTML = '';
    
    if (questionList.length > 0) {
        questionList.forEach((question, index) => {
            const div = document.createElement('div');
            div.className = 'qa-line';
            div.innerHTML = `<strong>Q${index + 1}:</strong> ${question}<br><em>A${index + 1}: Because you're wonderful!</em>`;
            outputElement.appendChild(div);
        });
    } else {
        outputElement.innerHTML = '<p class="empty-message">No questions yet. Add some to personalize your content!</p>';
    }
}

// Generate love letter output
function updateLetterOutput() {
    const partnerName = document.getElementById('partnerName').value || 'John';
    const userName = document.getElementById('userName').value || 'Jane Doe';
    const memories = document.getElementById('memories').value.trim();
    const loveQAList = document.getElementById('loveQAList');
    const memoriesLine = document.getElementById('specialMemoriesList');
    
    loveQAList.innerHTML = '';
    memoriesLine.innerHTML = '';
    
    // Generate love advice elements from questions
    if (questionList.length > 0) {
        questionList.forEach((question, index) => {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = `<em>"${question}"</em> is a question I often ask myself when I think about how you ${makeAdjectiveAnswer(question)} - it's simply breathtaking how you manage to <strong>bring out the best in me</strong> every single time we're together.`
            loveQAList.appendChild(paragraph);
        });
    } else {
        loveQAList.innerHTML = '<p>Let me share some thoughts about just how special you are to me...</p>';
    }
    
    // Handle memories
    if (memories) {
        memoriesLine.innerHTML = `<p>You know what makes me smile most? Your silly little <em>"${memories.split('\n').slice(0, 2).join('", "')}";</em> - moments that make our relationship uniquely ours and that I treasure every day.</p>`;
    } else {
        memoriesLine.innerHTML = '<p>I want you to know just how special you are to me and how every moment with you creates new memories that light up my life.</p>';
    }
}

// Update name placeholders in letter
function updateProfileNames() {
    document.getElementById('outputUserName').textContent = document.getElementById('userName').value || 'Jane Doe';
    document.getElementById('outputPartnerName').textContent = document.getElementById('partnerName').value || 'John';
    document.getElementById('finalUserName').textContent = document.getElementById('userName').value || 'Jane Doe';
}

// Handle Enter key in question input
function handleQuestionKeyPress(event) {
    if (event.keyCode === 13) { // Enter key
        addQuestion();
        event.preventDefault();
    }
}

// Generate a more personalized answer based on the question
function makeAdjectiveAnswer(question) {
    question = question.toLowerCase();
    
    if (question.includes('love')) return 'so loving, warm, and caring';
    if (question.includes('favorite')) return 'incredible with for showing me your favorite things and making them mine too';
    if (question.includes('make')) return 'capable of making each day extraordinary';
    if (question.includes('best')) return 'a true source of inspiration and joy';
    if (question.includes('beautiful')) return 'beautiful inside and out, brightening even the darkest days';
    if (question.includes('happiest')) return 'always finding ways to make moments together the happiest times';
    if (question.includes('time')) return 'incredible at making every minute we share truly meaningful';
    if (question.includes('compliment')) return 'inspiring so many wonderful things to say and feel';
    
    return 'able to turn ordinary moments into extraordinary memories';
}

// Initialize everything
function generateContent() {
    updateOutputs();
    animateOutputCards();
}

// Copy all content to clipboard
function copyContent() {
    const qaContent = document.getElementById('qaOutput').innerText;
    const letterContent = document.getElementById('letterOutput').innerText;
    const fullContent = `Q&A:\n${qaContent}\n\nLove Letter:\n${letterContent}`; 
    
    navigator.clipboard.writeText(fullContent).then(() => {
        alert('Content copied to clipboard! Ready to share 💖');
    }).catch(err => {
        alert('Failed to copy content: ' + err);
    });
}

// Animation when content is generated
function animateOutputCards() {
    const cards = document.querySelectorAll('.output-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initial generation on load
window.addEventListener('DOMContentLoaded', () => {
    generateContent();
});