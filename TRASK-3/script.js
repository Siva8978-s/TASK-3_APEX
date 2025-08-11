// Global variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let currentSlide = 0;
const totalSlides = 5;

// Quiz questions data
const quizQuestions = [
    {
        question: "What is the correct way to declare a JavaScript variable?",
        options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
        correct: 0
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correct: 1
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Oriented Model", "Document Object Model", "Dynamic Object Model"],
        correct: 2
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "=", "equals()"],
        correct: 1
    },
    {
        question: "What is the purpose of the 'addEventListener' method?",
        options: ["To create new elements", "To remove elements", "To attach event handlers", "To style elements"],
        correct: 2
    }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeCarousel();
    initializeWeather();
    initializeFacts();
    initializeNavigation();
});

// Navigation smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA button scroll to quiz
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        document.getElementById('quiz').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Quiz functionality
function initializeQuiz() {
    loadQuestion();
    
    const optionButtons = document.querySelectorAll('.option-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectAnswer(parseInt(this.dataset.option));
        });
    });
    
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionButtons = document.querySelectorAll('.option-btn');
    const questionCounter = document.getElementById('question-counter');
    
    questionText.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.classList.remove('selected', 'correct', 'incorrect');
        button.disabled = false;
    });
    
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

function selectAnswer(optionIndex) {
    selectedAnswer = optionIndex;
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Remove previous selections
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // Highlight selected answer
    optionButtons[optionIndex].classList.add('selected');
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Show correct/incorrect answers
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) {
            button.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            button.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correct) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    }
    
    // Move to next question or show results
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const questionContainer = document.querySelector('.question-container');
    const quizInfo = document.querySelector('.quiz-info');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const resultContainer = document.getElementById('result-container');
    const finalScore = document.getElementById('final-score');
    const performanceMessage = document.getElementById('performance-message');
    
    questionContainer.style.display = 'none';
    quizInfo.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = `Your Score: ${score}/${quizQuestions.length} (${percentage}%)`;
    
    if (percentage >= 80) {
        performanceMessage.textContent = "Excellent! You have a great understanding of JavaScript!";
        performanceMessage.style.color = '#28a745';
    } else if (percentage >= 60) {
        performanceMessage.textContent = "Good job! Keep practicing to improve your skills.";
        performanceMessage.style.color = '#ffc107';
    } else {
        performanceMessage.textContent = "Keep studying! JavaScript takes practice to master.";
        performanceMessage.style.color = '#dc3545';
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    const questionContainer = document.querySelector('.question-container');
    const quizInfo = document.querySelector('.quiz-info');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const resultContainer = document.getElementById('result-container');
    
    questionContainer.style.display = 'block';
    quizInfo.style.display = 'flex';
    nextBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    resultContainer.style.display = 'none';
    
    document.getElementById('score').textContent = 'Score: 0';
    loadQuestion();
}

// Carousel functionality
function initializeCarousel() {
    const leftBtn = document.querySelector('.carousel-btn--left');
    const rightBtn = document.querySelector('.carousel-btn--right');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    leftBtn.addEventListener('click', () => moveSlide(-1));
    rightBtn.addEventListener('click', () => moveSlide(1));
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel
    setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Remove current classes
    slides[currentSlide].classList.remove('current-slide');
    indicators[currentSlide].classList.remove('current-indicator');
    
    // Update current slide index
    currentSlide += direction;
    
    // Handle wrap-around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Add current classes to new slide
    slides[currentSlide].classList.add('current-slide');
    indicators[currentSlide].classList.add('current-indicator');
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Remove current classes
    slides[currentSlide].classList.remove('current-slide');
    indicators[currentSlide].classList.remove('current-indicator');
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Add current classes
    slides[currentSlide].classList.add('current-slide');
    indicators[currentSlide].classList.add('current-indicator');
}

// Weather API functionality
function initializeWeather() {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    searchBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
    
    // Load default city weather
    getWeatherByCity('London');
}

async function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    await getWeatherByCity(city);
}

async function getWeatherByCity(city) {
    const loading = document.getElementById('loading');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    loading.style.display = 'block';
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    
    try {
        // Using OpenWeatherMap API (requires API key in production)
        // For demo purposes, we'll simulate API response
        const response = await simulateWeatherAPI(city);
        
        if (response.success) {
            displayWeather(response.data);
        } else {
            showError(response.message);
        }
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
    } finally {
        loading.style.display = 'none';
    }
}

// Simulate weather API response (replace with real API in production)
async function simulateWeatherAPI(city) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample weather data
    const weatherData = {
        'London': {
            name: 'London',
            temp: 15,
            feels_like: 13,
            description: 'Partly cloudy',
            humidity: 65,
            wind_speed: 3.5,
            pressure: 1013
        },
        'New York': {
            name: 'New York',
            temp: 22,
            feels_like: 24,
            description: 'Sunny',
            humidity: 45,
            wind_speed: 2.8,
            pressure: 1020
        },
        'Tokyo': {
            name: 'Tokyo',
            temp: 18,
            feels_like: 16,
            description: 'Light rain',
            humidity: 80,
            wind_speed: 4.2,
            pressure: 1008
        },
        'Paris': {
            name: 'Paris',
            temp: 12,
            feels_like: 10,
            description: 'Overcast',
            humidity: 70,
            wind_speed: 3.1,
            pressure: 1015
        },
        'Sydney': {
            name: 'Sydney',
            temp: 25,
            feels_like: 27,
            description: 'Clear sky',
            humidity: 55,
            wind_speed: 5.0,
            pressure: 1018
        }
    };
    
    const normalizedCity = city.toLowerCase();
    const matchingCity = Object.keys(weatherData).find(key => 
        key.toLowerCase().includes(normalizedCity) || normalizedCity.includes(key.toLowerCase())
    );
    
    if (matchingCity) {
        return {
            success: true,
            data: weatherData[matchingCity]
        };
    } else {
        return {
            success: false,
            message: `Weather data not available for "${city}". Try: London, New York, Tokyo, Paris, or Sydney.`
        };
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const description = document.getElementById('weather-description');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const pressure = document.getElementById('pressure');
    
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.temp);
    description.textContent = data.description;
    feelsLike.textContent = Math.round(data.feels_like);
    humidity.textContent = data.humidity;
    windSpeed.textContent = data.wind_speed;
    pressure.textContent = data.pressure;
    
    weatherInfo.style.display = 'block';
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Fun Facts API functionality
function initializeFacts() {
    const factBtn = document.getElementById('fact-btn');
    factBtn.addEventListener('click', getFunFact);
    
    // Load initial fact
    getFunFact();
}

async function getFunFact() {
    const factElement = document.getElementById('fun-fact');
    const factBtn = document.getElementById('fact-btn');
    
    // Show loading state
    factBtn.disabled = true;
    factBtn.textContent = 'Loading...';
    factElement.textContent = 'Getting a new fun fact...';
    
    try {
        // Using a public API for random facts
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        
        if (response.ok) {
            const data = await response.json();
            factElement.textContent = data.text;
        } else {
            // Fallback to local facts if API fails
            const fallbackFacts = [
                "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
                "A group of flamingos is called a 'flamboyance'.",
                "Octopuses have three hearts and blue blood.",
                "Bananas are berries, but strawberries aren't!",
                "A day on Venus is longer than its year.",
                "There are more possible games of chess than there are atoms in the observable universe.",
                "Wombat poop is cube-shaped.",
                "The shortest war in history lasted only 38-45 minutes.",
                "A shrimp's heart is in its head.",
                "There's a species of jellyfish that is technically immortal."
            ];
            
            const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
            factElement.textContent = randomFact;
        }
    } catch (error) {
        factElement.textContent = "Did you know? JavaScript was created in just 10 days by Brendan Eich in 1995!";
    } finally {
        factBtn.disabled = false;
        factBtn.textContent = 'Get New Fact';
    }
}