const navLinks = document.querySelectorAll(".nav-links .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    //Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

//Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Close menu when the nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click())
});

// Contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const form = this;
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            const originalBtnText = submitBtn.textContent;
            
            // Validate form before submission
            if (!form.checkValidity()) {
                // Trigger browser's native validation
                form.reportValidity();
                return;
            }
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            try {
                //send form data to Formspree using AJAX
                const formData = new FormData(form);

                // Send form data to Formspree using fetch API 
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - show message
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';

                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    form.reset();
                    
                    //Keep the success message visible
                    // Remove Auto-hide so success message after stays visible until page refresh

                } else {
                    // Error from Formspree
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Form submission failed');
                }
            } catch (error) {
                // Network or other error
                console.error('Form submission error:', error);
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});