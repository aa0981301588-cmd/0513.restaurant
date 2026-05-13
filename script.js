document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. File Upload Display Name
    const fileInput = document.getElementById('documentUpload');
    const fileNameDisplay = document.querySelector('.file-name');

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
                fileNameDisplay.style.color = '#fff';
            } else {
                fileNameDisplay.textContent = '選擇檔案或拖曳至此';
                fileNameDisplay.style.color = 'var(--color-text-muted)';
            }
        });
    }

    // 4. Form Validation & Submission
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const modalCloseBtn = document.querySelector('.modal-close');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('has-error');
            });

            // Validate Name
            const fullName = document.getElementById('fullName');
            if (!fullName.value.trim()) {
                showError(fullName);
                isValid = false;
            }

            // Validate Phone
            const phone = document.getElementById('phone');
            if (!phone.value.trim() || !/^\d{8,15}$/.test(phone.value.replace(/[\s-]/g, ''))) {
                showError(phone);
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email);
                isValid = false;
            }

            // Validate Password
            const password = document.getElementById('password');
            if (password.value.length < 8) {
                showError(password);
                isValid = false;
            }

            if (isValid) {
                // Mock API call or form submission
                console.log('Form is valid. Submitting...');
                
                // Show Success Modal
                modal.classList.add('show');
                
                // Optional: Reset form
                form.reset();
                if(fileNameDisplay) {
                    fileNameDisplay.textContent = '選擇檔案或拖曳至此';
                    fileNameDisplay.style.color = 'var(--color-text-muted)';
                }
            }
        });
    }

    // 5. Modal Close Logic
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // Helper Function to show error
    function showError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.add('has-error');
    }
    
    // Remove error class on input
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('input', function() {
            this.closest('.form-group').classList.remove('has-error');
        });
    });
});
