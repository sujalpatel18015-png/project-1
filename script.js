// ----------------------------------------------------
// Testimonials Data & Logic
// ----------------------------------------------------
const testimonials = [
  {
    quote:
      '"Avant Garde didn\'t just cater our gala; they curated an edible art exhibition. The nitrogen-frozen mousse station was the highlight of the year."',
    name: 'Alexandra V.',
    role: 'Director, Met Gala Afterparty',
  },
  {
    quote:
      '"Precision is an understatement. Every plate was identical in geometry and flavor. They operate like a high-performance sports team."',
    name: 'James H.',
    role: 'CEO, TechFlow Systems',
  },
  {
    quote:
      '"I\'ve never seen a catering team blend molecular gastronomy with such soulful flavors. Absolutely transformative experience for our guests."',
    name: 'Elena R.',
    role: 'Editor, Culinary Arts Weekly',
  },
];

let currentTestimonialIndex = 0;

function updateTestimonialUI() {
  const quoteEl = document.getElementById('testimonial-quote');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');

  // Fade out
  quoteEl.style.opacity = '0';
  document.getElementById('testimonial-author').style.opacity = '0';

  setTimeout(() => {
    // Update text
    quoteEl.textContent = testimonials[currentTestimonialIndex].quote;
    nameEl.textContent = testimonials[currentTestimonialIndex].name;
    roleEl.textContent = testimonials[currentTestimonialIndex].role;

    // Fade in
    quoteEl.style.opacity = '1';
    document.getElementById('testimonial-author').style.opacity = '1';
  }, 300);
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  updateTestimonialUI();
}

function prevTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonialUI();
}

// ----------------------------------------------------
// Real-Time Timer Logic
// ----------------------------------------------------
function startTimer() {
  const timerEl = document.getElementById('hero-timer');
  // Set a target time 4 hours from now
  let totalSeconds = 4 * 60 * 60 + 23 * 60 + 15;

  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 4 * 60 * 60; // Reset loop

    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    timerEl.textContent = `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, 1000);
}

$(document).ready(function () {
  // Start Timer
  startTimer();

  // 1. Modern Loader Animation
  let loadProgress = 0;
  const loaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 5) + 2;
    if (loadProgress > 100) loadProgress = 100;

    $('#loader-percent').text(loadProgress + '%');
    $('#loader-bar').css('width', loadProgress + '%');

    if (loadProgress === 100) {
      clearInterval(loaderInterval);

      // Reveal Animation
      gsap.to('#loader', {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.5,
        onComplete: () => {
          // Trigger Hero Animations after loader clears
          gsap.to('.gsap-hero-reveal', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
          });
        },
      });
    }
  }, 50);

  // 2. Navbar Scroll Effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#nav-container')
        .addClass('py-2 bg-obsidian/90')
        .removeClass('py-3 bg-obsidian/80');
    } else {
      $('#nav-container')
        .addClass('py-3 bg-obsidian/80')
        .removeClass('py-2 bg-obsidian/90');
    }
  });

  // 3. Hamburger Menu Logic
  const toggleMenu = () => {
    const menu = $('#mobile-menu');
    const btn = $('.hamburger');

    if (menu.hasClass('translate-x-full')) {
      menu.removeClass('translate-x-full');
      btn.addClass('active');
      $('body').addClass('overflow-hidden');

      gsap.to('.mobile-link', {
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      });
    } else {
      menu.addClass('translate-x-full');
      btn.removeClass('active');
      $('body').removeClass('overflow-hidden');
      gsap.to('.mobile-link', { y: '100%', duration: 0 });
    }
  };

  $('.hamburger').click(function () {
    toggleMenu();
  });
  $('#close-menu-btn').click(function () {
    toggleMenu();
  });

  $('.mobile-link').click(function () {
    if (!$(this).closest('#mobile-menu-dropdown-content').length) {
      toggleMenu();
    }
    if ($(this).closest('#mobile-menu-dropdown-content').length) {
      toggleMenu();
    }
  });

  // Mobile Dropdown
  $('#mobile-menu-dropdown-btn').click(function () {
    const content = $('#mobile-menu-dropdown-content');
    const icon = $(this).find('i');
    if (content.hasClass('hidden')) {
      content.removeClass('hidden').addClass('flex');
      icon.addClass('rotate-180');
      gsap.fromTo(
        content.children(),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
      );
    } else {
      content.addClass('hidden').removeClass('flex');
      icon.removeClass('rotate-180');
    }
  });

  // 4. GSAP ScrollTrigger Animations
  gsap.registerPlugin(ScrollTrigger);

  // Timeline Animation (Blueprint)
  gsap.utils.toArray('.blueprint-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  gsap.from('.trigger-section > *', {
    scrollTrigger: { trigger: '.trigger-section', start: 'top 80%' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
  });

  gsap.from('.trigger-image', {
    scrollTrigger: { trigger: '.trigger-image', start: 'top 70%' },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.menu-card', {
    scrollTrigger: { trigger: '#services', start: 'top 75%' },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  });

  // 5. Number Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = +counter.getAttribute('data-target');
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let count = 0;
        const inc = target / 100;
        const updateCount = () => {
          count += inc;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target + '+';
          }
        };
        updateCount();
      },
    });
  });

  // 6. Magnetic Button
  $('.btn-magnetic').mousemove(function (e) {
    const x = e.pageX - $(this).offset().left;
    const y = e.pageY - $(this).offset().top;
    const centerX = $(this).width() / 2;
    const centerY = $(this).height() / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    $(this).css('transform', `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`);
  });
  $('.btn-magnetic').mouseleave(function () {
    $(this).css('transform', 'translate(0px, 0px)');
  });
});