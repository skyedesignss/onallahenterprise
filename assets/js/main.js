/* ON ALLAH MONEY TRANSFERS */
document.addEventListener('DOMContentLoaded', () => {

  const loadComponent = (placeholderId, filePath, callback) => {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`${filePath} not found`);
        return response.text();
      })
      .then(html => {
        placeholder.outerHTML = html;

        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(err => console.error(`Error loading ${filePath}:`, err));
  };

  loadComponent('header-placeholder', 'components/header.html', () => {
    initHeader();
    initActiveNavLink();
  });

  loadComponent('footer-placeholder', 'components/footer.html', () => {
    const yearEl = document.getElementById('copyright-year');

    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });

  setTimeout(initHeroDynamicWord, 400);

});


/* HEADER */
function initHeader() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.header__link');

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); 

  // Mobile menu toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      }
    });
  }
}

/* HERO WORD */
function initHeroDynamicWord() {
  const words = document.querySelectorAll('.hero__word');
  if (words.length === 0) return;

  let currentIndex = 0;
  const totalWords = words.length;
  const intervalTime = 2800;

  words.forEach((word, index) => {
    word.classList.toggle('is-active', index === 0);
  });

  setInterval(() => {
    words[currentIndex].classList.remove('is-active');
    currentIndex = (currentIndex + 1) % totalWords;
    words[currentIndex].classList.add('is-active');
  }, intervalTime);
}

/* SCROLL REVEAL */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initScrollReveal, 500);
});

/* HOW IT WORKS */
function initProcessSteps() {
  const steps = document.querySelectorAll('.process__step');
  const center = document.getElementById('process-center');
  if (!steps.length || !center) return;

  const stepData = [
    {
      number: '01',
      title: 'Visit Us',
      text: 'Come to our office on Mabureh Street in Makeni City, or reach out through WhatsApp or phone.'
    },
    {
      number: '02',
      title: 'Tell Us What You Need',
      text: 'Let us know whether you want to send money, receive money, or ask about available options.'
    },
    {
      number: '03',
      title: 'Choose a Transfer Service',
      text: 'We will guide you through the supported networks available for your transaction.'
    },
    {
      number: '04',
      title: 'Complete the Details',
      text: 'Provide the required information and identification so we can process everything correctly.'
    },
    {
      number: '05',
      title: 'Receive Confirmation',
      text: 'Get your transfer details and any reference numbers you need. We remain available if you need further help.'
    }
  ];

  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      const index = parseInt(step.getAttribute('data-step'));

      // Update active state
      steps.forEach(s => s.classList.remove('is-active'));
      step.classList.add('is-active');

      // Animate center content
      center.style.opacity = '0';
      center.style.transform = 'scale(0.92)';

      setTimeout(() => {
        center.innerHTML = `
          <span class="process__center-number">${stepData[index].number}</span>
          <h3 class="process__center-title">${stepData[index].title}</h3>
          <p class="process__center-text">${stepData[index].text}</p>
        `;
        center.style.opacity = '1';
        center.style.transform = 'scale(1)';
      }, 220);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initProcessSteps, 600);
});

/* TESTIMONIALS CAROUSEL */
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonials-dots');

  if (!track) return;

  const testimonials = [
    {
      quote: "I sent money to my family and the process was clear from start to finish. The staff explained everything patiently and I felt confident using their service.",
      name: "Aminata K.",
      location: "Makeni"
    },
    {
      quote: "Receiving money through ON ALLAH was smooth and professional. They verified everything properly and I got my funds without any confusion.",
      name: "Ibrahim S.",
      location: "Makeni"
    },
    {
      quote: "What I appreciate most is that they are a real local office I can walk into. It gives me peace of mind knowing I can speak to someone face to face.",
      name: "Fatmata J.",
      location: "Bombali"
    },
    {
      quote: "I used their service to receive support from abroad. The team was helpful, the process was legitimate, and I left feeling well taken care of.",
      name: "Mohamed T.",
      location: "Makeni"
    },
    {
      quote: "Clear guidance, respectful service, and no unnecessary complications. This is how a money transfer business should treat its customers.",
      name: "Isatu B.",
      location: "Makeni"
    },
    {
      quote: "I was impressed by how organised and transparent everything was. They made sending money straightforward and I will continue using them.",
      name: "Abdul R.",
      location: "Tonkolili"
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 5500;

  track.innerHTML = testimonials.map((item, index) => `
    <div class="testimonial-slide" data-index="${index}">
      <div class="testimonial-content">
        <div class="testimonial-icon">
          <i class="fa-solid fa-user"></i>
        </div>
        <p class="testimonial-quote">${item.quote}</p>
        <div class="testimonial-author">
          <strong>${item.name}</strong>
          <span>${item.location}</span>
        </div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = testimonials.map((_, index) => `
    <button class="testimonials__dot ${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Go to testimonial ${index + 1}"></button>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.testimonials__dot');

  function goToSlide(index) {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('is-active'));
    dots[currentIndex].classList.add('is-active');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoplayTimer);
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }

    isDragging = false;
    startAutoplay();
  }, { passive: true });


  startAutoplay();
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initTestimonials, 700);
});

/* FAQ ACCORDION */
function initFAQ() {
  const faqList = document.getElementById('faq-list');

  if (!faqList) return;

  if (document.querySelector('.faq-filter')) return;

  const faqData = [
    {
      question: "Can I send and receive money at your office?",
      answer: "Yes. You can visit any of our offices to send or receive money through the supported transfer networks we offer."
    },
    {
      question: "Which transfer networks do you support?",
      answer: "We currently support Ria, Western Union, MoneyGram, Orange Money, WorldRemit and other available channels depending on the service and location."
    },
    {
      question: "Do I need to create an account on this website?",
      answer: "No. This website is for information and enquiries only. All transactions are handled at our physical offices or through our official channels."
    },
    {
      question: "Where are your offices located?",
      answer: "Makeni City — Mabureh Street (Primary)<br>Bo City — Kenema Highway<br>Koidu City — Konomanyi Street<br>Port Loko City — Kambia Road<br>Freetown City<br>Kenema City<br>Liberia"
    },
    {
      question: "How can I contact your team?",
      answer: "You can visit any of our offices, send an enquiry through this website, or call us '+232 75 415735' for quick assistance."
    }
  ];

  // Build FAQ items
  faqList.innerHTML = faqData.map((item, index) => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>${item.question}</span>
        <i class="fa-solid fa-plus"></i>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  const faqItems = faqList.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initFAQ, 800);
});


/* ACTIVE NAVIGATION LINK */
function initActiveNavLink() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.header__link').forEach(link => {
    const linkUrl = link.getAttribute('href');

    if (!linkUrl || linkUrl === '#') return;

    const linkFile = linkUrl.split('/').pop() || 'index.html';

    const isActive =
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html');

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}


/* CONTACT FORM */

function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwlpooyp';

  const submitButton = form.querySelector('.contact-form__submit');

  const fields = {
    fullName: form.querySelector('#fullName'),
    email: form.querySelector('#email'),
    phone: form.querySelector('#phone'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message')
  };

  let isSubmitting = false;


  function createToastContainer() {
    let container = document.getElementById('contact-toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'contact-toast-container';
      container.className = 'contact-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');

      document.body.appendChild(container);
    }

    return container;
  }

  /* Show toast notification */
  function showToast(type, title, message) {
    const container = createToastContainer();

    const icon = type === 'success'
      ? 'fa-circle-check'
      : type === 'error'
        ? 'fa-circle-exclamation'
        : 'fa-circle-info';

    const toast = document.createElement('div');
    toast.className = `contact-toast contact-toast--${type}`;

    toast.innerHTML = `
      <div class="contact-toast__icon">
        <i class="fa-solid ${icon}"></i>
      </div>

      <div class="contact-toast__content">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>

      <button 
        type="button" 
        class="contact-toast__close" 
        aria-label="Close notification"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    const closeButton = toast.querySelector('.contact-toast__close');

    const removeToast = () => {
      toast.classList.remove('is-visible');

      setTimeout(() => {
        toast.remove();
      }, 300);
    };

    closeButton.addEventListener('click', removeToast);

    setTimeout(removeToast, 6000);
  }

  /* Mark field as invalid */
  function setFieldError(field, hasError) {
    if (!field) return;

    const formGroup = field.closest('.form-group');

    if (hasError) {
      field.classList.add('is-invalid');

      if (formGroup) {
        formGroup.classList.add('has-error');
      }
    } else {
      field.classList.remove('is-invalid');

      if (formGroup) {
        formGroup.classList.remove('has-error');
      }
    }
  }

  /* * Validate email format */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* Validate all required fields */
  function validateForm() {
    let isValid = true;

    const name = fields.fullName.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value;
    const message = fields.message.value.trim();

    /* Full name */
    if (!name) {
      setFieldError(fields.fullName, true);
      isValid = false;
    } else {
      setFieldError(fields.fullName, false);
    }

    /* Email */
    if (!email || !isValidEmail(email)) {
      setFieldError(fields.email, true);
      isValid = false;
    } else {
      setFieldError(fields.email, false);
    }

    /* Subject */
    if (!subject) {
      setFieldError(fields.subject, true);
      isValid = false;
    } else {
      setFieldError(fields.subject, false);
    }

    /* Message */
    if (!message) {
      setFieldError(fields.message, true);
      isValid = false;
    } else {
      setFieldError(fields.message, false);
    }

    /* Focus the first invalid field */
    if (!isValid) {
      const firstInvalidField = form.querySelector('.is-invalid');

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      showToast(
        'error',
        'Incomplete form',
        'Please complete the highlighted fields before sending your message.'
      );
    }

    return isValid;
  }

  Object.values(fields).forEach(field => {
    if (!field) return;

    field.addEventListener('input', () => {
      if (field.id === 'subject') {
        setFieldError(field, Boolean(!field.value));
        return;
      }

      if (field.value.trim()) {
        setFieldError(field, false);
      }
    });

    field.addEventListener('change', () => {
      if (field.value.trim()) {
        setFieldError(field, false);
      }
    });
  });

  /* Set loading state */
  function setLoadingState(isLoading) {
    isSubmitting = isLoading;

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.disabled = isLoading;
    });

    if (submitButton) {
      submitButton.disabled = isLoading;

      if (isLoading) {
        submitButton.classList.add('is-loading');

        submitButton.innerHTML = `
          <span class="contact-submit-spinner" aria-hidden="true"></span>
          <span>Sending message...</span>
        `;
      } else {
        submitButton.classList.remove('is-loading');

        submitButton.innerHTML = `
          <span>Send Message</span>
          <i class="fa-solid fa-arrow-right"></i>
        `;
      }
    }
  }

  /*
   * Submit form to Formspree
   */
  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) return;

    const formData = new FormData(form);

    setLoadingState(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();

        Object.values(fields).forEach(field => {
          if (field) {
            setFieldError(field, false);
          }
        });

        showToast(
          'success',
          'Message sent successfully',
          'Thank you. Your message has been received. We will get back to you soon.'
        );
      } else {
        let errorMessage =
          'We could not send your message right now. Please try again.';

        if (result && result.errors && result.errors.length > 0) {
          errorMessage = result.errors
            .map(error => error.message)
            .join(' ');
        }

        showToast(
          'error',
          'Message not sent',
          errorMessage
        );
      }
    } catch (error) {
      console.error('Contact form submission error:', error);

      showToast(
        'error',
        'Connection error',
        'Something went wrong while sending your message. Please check your connection and try again.'
      );
    } finally {
      setLoadingState(false);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initContactForm, 300);
});

document.addEventListener('DOMContentLoaded', () => {

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // How It Works 
  const processSteps = document.querySelectorAll('.process__step');
  const processCenter = document.getElementById('process-center');

  if (processSteps.length && processCenter) {
    const stepData = [
      {
        number: '01',
        title: 'Visit Us',
        text: 'Come to our office on Mabureh Street in Makeni City, or reach out through WhatsApp or phone.'
      },
      {
        number: '02',
        title: 'Tell Us What You Need',
        text: 'Explain whether you want to send or receive money and share any relevant details with our team.'
      },
      {
        number: '03',
        title: 'Choose a Service',
        text: 'We will show you the supported networks available and help you select the most suitable option.'
      },
      {
        number: '04',
        title: 'Complete Details',
        text: 'Provide the required identification and transfer information. Our staff will guide you through every field.'
      },
      {
        number: '05',
        title: 'Get Confirmation',
        text: 'Receive confirmation of your transaction and clear next steps so you know exactly what to expect.'
      }
    ];

    processSteps.forEach(step => {
      step.addEventListener('click', () => {

        processSteps.forEach(s => s.classList.remove('is-active'));

        step.classList.add('is-active');

        const index = parseInt(step.dataset.step, 10);
        const data = stepData[index];

        processCenter.style.opacity = '0';
        processCenter.style.transform = 'scale(0.96)';

        setTimeout(() => {
          processCenter.innerHTML = `
            <span class="process__center-number">${data.number}</span>
            <h3 class="process__center-title">${data.title}</h3>
            <p class="process__center-text">${data.text}</p>
          `;
          processCenter.style.opacity = '1';
          processCenter.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

});

/* FAQ */
document.addEventListener('DOMContentLoaded', () => {

  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // FAQ Filter
  const filterButtons = document.querySelectorAll('.faq-filter');
  const faqItems = document.querySelectorAll('.faq-item');
  const emptyState = document.getElementById('faq-empty');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      faqItems.forEach(item => {
        const category = item.dataset.category;

        if (filter === 'all' || category === filter) {
          item.classList.remove('is-hidden');
          visibleCount++;
        } else {
          item.classList.add('is-hidden');
          item.classList.remove('is-open');
          const answer = item.querySelector('.faq-answer');
          if (answer) answer.style.maxHeight = null;
          const icon = item.querySelector('.faq-question i');
          if (icon) icon.style.transform = '';
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    });
  });

  // FAQ Accordion
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

});

/* SCROLL NAVIGATOR */
function initScrollNavigator() {

  if (document.querySelector('.scroll-nav')) return;

  const CIRCUMFERENCE = 2 * Math.PI * 22;

  const btn = document.createElement('button');
  btn.className = 'scroll-nav';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Scroll down');
  btn.innerHTML = `
    <svg class="scroll-nav__ring" viewBox="0 0 52 52" aria-hidden="true">
      <circle class="scroll-nav__track" cx="26" cy="26" r="22"></circle>
      <circle class="scroll-nav__progress" cx="26" cy="26" r="22"></circle>
    </svg>
    <i class="fa-solid fa-arrow-down scroll-nav__icon" aria-hidden="true"></i>
  `;

  document.body.appendChild(btn);

  const progressCircle = btn.querySelector('.scroll-nav__progress');
  const icon = btn.querySelector('.scroll-nav__icon');

  let ticking = false;
  let currentState = 'top';

  function getScrollMetrics() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(docHeight - winHeight, 1);
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    return { scrollTop, docHeight, winHeight, maxScroll, progress };
  }

  function updateNavigator() {
    const { scrollTop, progress } = getScrollMetrics();

    const offset = CIRCUMFERENCE * (1 - progress);
    progressCircle.style.strokeDashoffset = offset;

    if (scrollTop > 120) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }

    let newState;
    if (progress < 0.12) {
      newState = 'top';
    } else if (progress > 0.88) {
      newState = 'bottom';
    } else {
      newState = 'middle';
    }

    if (newState !== currentState) {
      currentState = newState;
      btn.classList.remove('is-top', 'is-middle', 'is-bottom');
      btn.classList.add(`is-${newState}`);

      if (newState === 'top') {
        icon.className = 'fa-solid fa-arrow-down scroll-nav__icon';
        btn.setAttribute('aria-label', 'Scroll down');
      } else if (newState === 'bottom') {
        icon.className = 'fa-solid fa-arrow-up scroll-nav__icon';
        btn.setAttribute('aria-label', 'Back to top');
      } else {
        icon.className = 'fa-solid fa-arrow-down scroll-nav__icon';
        btn.setAttribute('aria-label', 'Continue scrolling');
      }
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavigator);
      ticking = true;
    }
  }

  btn.addEventListener('click', () => {
    const { scrollTop, docHeight, winHeight, maxScroll } = getScrollMetrics();
    const headerOffset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height-scrolled')) || 70;

    let target;

    if (currentState === 'bottom') {

      target = 0;
    } else if (currentState === 'top') {

      target = Math.min(winHeight * 0.85, maxScroll);
    } else {

      target = Math.min(scrollTop + winHeight * 0.8, maxScroll);
    }

    if (target > 0) {
      target = Math.max(0, target - headerOffset);
    }

    window.scrollTo({
      top: target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  updateNavigator();
}

document.addEventListener('DOMContentLoaded', () => {

  initScrollNavigator();
});