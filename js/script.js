// Cyberpunk Portfolio - script.js

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const volumeProgress = document.querySelector('.volume-progress');
const volumeContainer = document.querySelector('.volume-slider');
const audioSource = document.getElementById('audio-source');
const playerToggle = document.getElementById('player-toggle');
const musicPlayer = document.querySelector('.music-player');

// Initial state
let isPlaying = false;
let isMusicPlayerVisible = true;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    setupAnimations();
});

// Initialize the application
function initApp() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Setup audio player if it exists
    if (audioPlayer) {
        setupAudioPlayer();
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling();

    // Add cyberpunk effects
    addCyberpunkEffects();

    // Show content with animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
    });
}

// Setup Audio Player functions
function setupAudioPlayer() {
    // Play/Pause functionality
    playBtn.addEventListener('click', togglePlay);

    // Update progress bar as audio plays
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Set progress bar on click
    progressContainer.addEventListener('click', setProgress);

    // Update volume on click
    volumeContainer.addEventListener('click', setVolume);

    // When audio ends
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayIcon();
    });

    // Update play icon
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayIcon();
    });

    // Update play icon
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayIcon();
    });

    // Toggle player visibility
    if (playerToggle) {
        playerToggle.addEventListener('click', () => {
            isMusicPlayerVisible = !isMusicPlayerVisible;
            musicPlayer.style.transform = isMusicPlayerVisible ? 'translateY(0)' : 'translateY(100%)';
            playerToggle.innerHTML = isMusicPlayerVisible ? '<i class="fas fa-times"></i>' : '<i class="fas fa-music"></i>';
        });
    }

    // Load audio metadata
    audioPlayer.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60);
        duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    });
}

// Toggle play/pause
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

// Update play icon based on playing state
function updatePlayIcon() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

// Update progress bar
function updateProgress() {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update current time display
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

// Set progress bar on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Set volume
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    
    audioPlayer.volume = volume;
    volumeProgress.style.width = `${volume * 100}%`;
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add cyberpunk visual effects
function addCyberpunkEffects() {
    // Apply glitch effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.setAttribute('data-text', title.textContent);
        title.classList.add('glitch');
    });

    // Create scanlines
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
}

// Setup intersection observers for animations
function setupAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    const elements = document.querySelectorAll('.project-card, .language-item, .thanks-item');
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Helper function to animate counting
function animateCount(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        element.textContent = currentCount;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}