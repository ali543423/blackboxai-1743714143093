// Main JavaScript for Fitness Pro app

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle for all pages
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize tooltips
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
    });

    // Form validation for login/signup
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', validateForm);
    });

    // Exercise library search functionality
    const searchInput = document.querySelector('#exercise-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterExercises);
    }

    // Initialize all modals
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', toggleModal);
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            const modal = e.target.closest('.modal');
            modal.classList.add('hidden');
        }
    });

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
});

// Tooltip functions
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap';
    tooltip.textContent = tooltipText;
    tooltip.style.top = `${this.offsetTop - 30}px`;
    tooltip.style.left = `${this.offsetLeft + this.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
    this.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = this.querySelector('div[class*="bg-gray-800"]');
    if (tooltip) {
        tooltip.remove();
    }
}

// Form validation
function validateForm(e) {
    e.preventDefault();
    const form = e.target;
    let isValid = true;

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            field.nextElementSibling?.classList.remove('hidden');
        } else {
            field.classList.remove('border-red-500');
            field.nextElementSibling?.classList.add('hidden');
        }
    });

    // Special validation for password match
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        isValid = false;
        confirmPassword.classList.add('border-red-500');
        document.getElementById('passwordMatchError').classList.remove('hidden');
    }

    if (isValid) {
        // In a real app, you would submit the form here
        alert('Form submitted successfully!');
        form.reset();
    }
}

// Exercise filtering
function filterExercises() {
    const searchTerm = this.value.toLowerCase();
    const exerciseCards = document.querySelectorAll('.exercise-card');

    exerciseCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal functions
function toggleModal(e) {
    const modalId = this.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    modal.classList.toggle('hidden');
}

// Tab switching
function switchTab(e) {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active', 'bg-blue-600', 'text-white');
        button.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-700');
    });

    this.classList.add('active', 'bg-blue-600', 'text-white');
    this.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-700');

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });

    const tabId = this.getAttribute('data-tab') + '-tab';
    document.getElementById(tabId).classList.remove('hidden');
}

// Water intake counter
function updateWaterIntake(amount) {
    const waterElement = document.getElementById('water-amount');
    if (waterElement) {
        let current = parseInt(waterElement.textContent);
        current += amount;
        waterElement.textContent = current;
        
        // Update progress circle
        const circumference = 283; // 2 * π * r (where r is 45)
        const offset = circumference - (current / 4) * circumference;
        const circle = document.querySelector('#water-circle');
        if (circle) {
            circle.style.strokeDashoffset = offset;
        }
    }
}