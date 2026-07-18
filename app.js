// Premium JavaScript Controller - Apka Coach Relationship Harmony Masterclass Redesign

// State to track step quiz progress
let currentQuizStep = 1;
const quizScores = { 1: 0, 2: 0, 3: 0 };

// Personality Dashboard dataset
const personalityData = {
    connector: {
        title: "The Connector",
        emoji: "❤️",
        need: "Requires consistent reassurance, emotional validation, and constant check-ins to feel safe.",
        trigger: "Triggered by emotional silence, sudden withdrawal, or a partner turning away to their screen.",
        mistake: "Pushes for immediate talks, demands answers, and accidentally increases pressure when their partner needs space.",
        tip: "Allow them to express concern without defensiveness. Say: \"I hear you, and I want to resolve this, but I need 10 minutes to process so we don't argue.\""
    },
    driver: {
        title: "The Driver",
        emoji: "⚡",
        need: "Requires respect, independence, efficiency, and feeling productive in the relationship.",
        trigger: "Triggered by feeling micromanaged, passive-aggressive complaints, or circular conversations with no action plan.",
        mistake: "Focuses solely on practical, immediate fixes while ignoring or dismissing their partner's emotional state.",
        tip: "Acknowledge their goals first. Say: \"I appreciate you looking for a solution. Let's align on how we feel first, so the solution works for both of us.\""
    },
    thinker: {
        title: "The Thinker",
        emoji: "🧠",
        need: "Requires logic, processing time, quiet boundaries, and factual clarity during conflicts.",
        trigger: "Triggered by high emotional intensity, loud voice tones, or being forced to answer immediately.",
        mistake: "Withdraws completely into their head, analyzing details while leaving their partner feeling abandoned.",
        tip: "Give them structured processing space. Say: \"I want to hear your thoughts when you are ready. Let's talk about this tonight after dinner.\""
    },
    harmonizer: {
        title: "The Harmonizer",
        emoji: "🌿",
        need: "Requires peace, low voice tones, physical reassurance, and absolute emotional safety.",
        trigger: "Triggered by sudden shouting, harsh words, door slamming, or a threat of breaking up.",
        mistake: "Shuts down completely, agrees superficially to end conflict, but harbors silent resentment for days.",
        tip: "Prioritize safety. Reassure them before raising issues. Say: \"I love you and we are secure. I just want to discuss how we manage our evening screens.\""
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Date Calculation
    const targetSunday = getUpcomingSunday();
    updateWebinarDates(targetSunday);
    initializeCountdown(targetSunday);

    // 2. Seat limit counter simulation
    runSeatsCounter();

    // 3. Setup FAQ accordions
    setupFAQs();

    // 4. Smooth scrolling for anchor tags (e.g. Logo & CTAs)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL hash without jump
                history.pushState(null, null, targetId);
            }
        });
    });
});


// Calculate next coming Sunday at 11:00 AM IST
function getUpcomingSunday() {
    const today = new Date();
    const target = new Date();
    
    const day = today.getDay(); // Sunday = 0, Monday = 1, etc.
    let diffDays = 7 - day;
    
    if (day === 0) {
        // If today is Sunday and it is before 11:00 AM, target today, else target next Sunday
        if (today.getHours() >= 11) {
            diffDays = 7;
        } else {
            diffDays = 0;
        }
    }
    
    target.setDate(today.getDate() + diffDays);
    target.setHours(11, 0, 0, 0); // 11:00 AM
    return target;
}

// Update all upcoming date texts
function updateWebinarDates(targetDate) {
    const formatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateFormatted = targetDate.toLocaleDateString('en-US', formatOptions);
    
    const targets = document.querySelectorAll('.upcoming-date');
    targets.forEach(element => {
        element.textContent = dateFormatted;
    });
}

// Countdown clock calculator
function initializeCountdown(targetDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function update() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
            // Target next Sunday once countdown completes
            const nextSunday = getUpcomingSunday();
            initializeCountdown(nextSunday);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// Interactive step-based quiz handler
window.selectOption = function(stepNum, scoreVal, textSelected) {
    // Record score
    quizScores[stepNum] = scoreVal;
    
    // Animate selection effect on clicked buttons (visual feedback)
    const activePane = document.getElementById(`step-${stepNum}`);
    const options = activePane.querySelectorAll('.quiz-opt');
    options.forEach(opt => {
        if (opt.textContent.trim().includes(textSelected.trim())) {
            opt.style.borderColor = '#FF7E67';
            opt.style.backgroundColor = 'rgba(255, 126, 103, 0.08)';
        }
    });

    setTimeout(() => {
        transitionStep(stepNum + 1);
    }, 250);
};

// Transition steps
function transitionStep(nextStep) {
    const currentPane = document.querySelector('.quiz-step-pane.active');
    if (currentPane) {
        currentPane.classList.remove('active');
    }

    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('quiz-progress-text');

    if (nextStep <= 3) {
        const nextPane = document.getElementById(`step-${nextStep}`);
        nextPane.classList.add('active');
        
        const progressPercentage = Math.round((nextStep / 3) * 100);
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `Step ${nextStep} of 3 (${progressPercentage}%)`;
    } else {
        const resultPane = document.getElementById('quiz-result-pane');
        resultPane.classList.add('active');
        
        progressFill.style.width = `100%`;
        progressText.textContent = `Completed (100%)`;
        
        showQuizResults();
    }
}

// Score outputs configurations
function showQuizResults() {
    const totalScore = quizScores[1] + quizScores[2] + quizScores[3];
    // Map total score (min 3, max 9) to percentage (33% to 100%)
    const percentage = Math.round((totalScore / 9) * 100);
    
    const strokeEl = document.getElementById('result-stroke');
    const numericEl = document.getElementById('numeric-score');
    const statusTitleEl = document.getElementById('result-status-title');
    const summaryDescEl = document.getElementById('result-summary-desc');

    // Trigger SVG dashboard circular fill animation
    strokeEl.setAttribute('stroke-dasharray', `${percentage}, 100`);
    
    // Numeric counter animation
    let currentPct = 0;
    const interval = setInterval(() => {
        if (currentPct >= percentage) {
            clearInterval(interval);
            numericEl.textContent = `${percentage}%`;
        } else {
            currentPct++;
            numericEl.textContent = `${currentPct}%`;
        }
    }, 10);

    // Conditional color, title and copies depending on score index
    if (totalScore <= 4) {
        statusTitleEl.textContent = "Low Friction - Stable Connection";
        statusTitleEl.style.color = "#3E9B8D";
        summaryDescEl.innerHTML = "Your relationship has a solid foundation, but early bedtime screen habits can build minor emotional distance. Use this masterclass to protect your bond before screens take over.";
        strokeEl.style.stroke = "#3E9B8D";
    } else if (totalScore <= 7) {
        statusTitleEl.textContent = "Moderate Friction - Digital Gaps Active";
        statusTitleEl.style.color = "#FF8A65";
        summaryDescEl.innerHTML = "Screens are actively replacing bedtime talk, and minor text message comments trigger silent withdrawal. The masterclass blueprint will show you how to resolve this loop.";
        strokeEl.style.stroke = "#FF8A65";
    } else {
        statusTitleEl.textContent = "High Risk - Silent Roommate Cycle";
        statusTitleEl.style.color = "#FF5A70";
        summaryDescEl.innerHTML = "Digital habits have created a massive screen barrier. You lie side by side scrolling in the dark, feeling isolated. Immediate personality mapping is recommended to restore intimacy.";
        strokeEl.style.stroke = "#FF5A70";
    }
}

// Interactive Personality Mapping Dashboard Switcher
window.showPersonality = function(key) {
    const data = personalityData[key];
    if (!data) return;

    // Update active tab styling
    const tabs = document.querySelectorAll('.dash-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-personality') === key) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Animate panel transitions
    const panel = document.getElementById('personality-panel');
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(4px)';

    setTimeout(() => {
        // Load properties
        document.getElementById('panel-emoji').textContent = data.emoji;
        document.getElementById('panel-title').textContent = data.title;
        document.getElementById('panel-need').textContent = data.need;
        document.getElementById('panel-trigger').textContent = data.trigger;
        document.getElementById('panel-mistake').textContent = data.mistake;
        document.getElementById('panel-tip').textContent = data.tip;

        // Restore animation
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
    }, 150);
};

// Seat decreaser simulator
function runSeatsCounter() {
    const counterEl = document.getElementById('seats-left');
    let currentLeft = 14;

    const interval = setInterval(() => {
        if (currentLeft <= 3) {
            clearInterval(interval);
            return;
        }

        if (Math.random() > 0.65) {
            currentLeft--;
            counterEl.textContent = currentLeft;
        }
    }, 12000);
}

// FAQ Accordion selectors
function setupFAQs() {
    const triggers = document.querySelectorAll('.faq-question');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const alreadyOpen = currentItem.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if not already open
            if (!alreadyOpen) {
                currentItem.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Policies popup modal triggers
window.openModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }
};

window.closeModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('active');
        targetModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Release scrolling
    }
};

// Close overlay on background click
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-overlay')) {
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    }
});


