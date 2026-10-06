/**
 * Personal Website - Interactive Scripts
 * Inspired by modern Framer personal sites:
 * - Scroll Progress Bar & Scroll Reveal
 * - Interactive 3D Tarot Card Flipper & Archetype Generator
 * - Mindful Yoga Breathing Guide (Inhale/Hold/Exhale pacer)
 * - Live Sourdough Hydration & Ingredient Calculator
 * - Interactive Yarn / Thread Color Palette Generator
 * - Interactive Filterable Tag Cloud ("Sparks & Topics I Tinker With")
 * - 3D Card Hover Tilt Effects
 * - Mobile Navigation & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initDefaultLandingPosition();
  initScrollProgress();
  initScrollReveal();
  initMobileNav();
  initActiveNavHighlight();
  initSmoothScroll();
  initTarotCardWidget();
  initBreathingWidget();
  initBakingCalculator();
  initYarnPaletteGenerator();
  initTagFilter();
  initCard3DTilt();
  initCursorFollower();
  initScrollLinkedMovement();
  initPhotoCycle();
  initAmbientReader();
  initToastNotification();
});

/**
 * Start fresh page loads at the hero while preserving browser back/forward position.
 */
function initDefaultLandingPosition() {
  window.addEventListener('pageshow', (event) => {
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    if (window.location.hash || event.persisted || navigationType === 'back_forward') return;

    document.documentElement.scrollTop = 0;
  });
}

/**
 * 1. Top Reading Scroll Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
    progressBar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/**
 * 2. Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 3. Mobile Navigation Drawer Toggle & Accessibility
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (!toggleBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.remove('translate-x-full');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      mobileBackdrop.classList.add('opacity-100');
    }
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileNav.classList.add('translate-x-full');
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
      mobileBackdrop.classList.remove('opacity-100');
    }
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggleBtn.focus();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * 4. Active Nav Highlighting
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (sections.length === 0 || (desktopLinks.length === 0 && mobileLinks.length === 0)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          const isCurrent = link.getAttribute('href') === `#${id}`;
          if (isCurrent) {
            link.classList.add('bg-espresso', 'text-cream');
            link.classList.remove('text-espresso', 'hover:bg-black/5');
            link.setAttribute('aria-current', 'location');
          } else {
            link.classList.remove('bg-espresso', 'text-cream');
            link.classList.add('text-espresso', 'hover:bg-black/5');
            link.removeAttribute('aria-current');
          }
        });
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => observer.observe(section));
}

/**
 * 5. Smooth Scroll with Sticky Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * 6. Automatic Tarot Card Deck Draw & 3D Reveal Widget
 */
function initTarotCardWidget() {
  const tarotCardInner = document.getElementById('tarot-card-inner');
  const tarotDeckStage = tarotCardInner ? tarotCardInner.closest('.tarot-deck-stage') : null;

  if (!tarotCardInner) return;

  function drawCard() {
    if (tarotDeckStage) tarotDeckStage.classList.add('tarot-deck-shuffling');
    tarotCardInner.classList.add('tarot-card-drawing');
    setTimeout(() => {
      tarotCardInner.classList.remove('tarot-card-drawing');
      tarotCardInner.classList.add('tarot-card-shuffled');
      setTimeout(() => tarotCardInner.classList.remove('tarot-card-shuffled'), 700);
    }, 1100);
    setTimeout(() => tarotDeckStage?.classList.remove('tarot-deck-shuffling'), 2050);
  }

  tarotCardInner.addEventListener('click', drawCard);
  tarotCardInner.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      drawCard();
    }
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(drawCard, 10000);
  }
}

/**
 * 7. Interactive Mindful Breathing Pacer Widget (Yoga)
 */
function initBreathingWidget() {
  const toggleBtn = document.getElementById('breathe-toggle-btn');
  const breatheCircle = document.getElementById('breathe-circle');
  const breatheLabel = document.getElementById('breathe-label');
  const breatheTimer = document.getElementById('breathe-timer');

  if (!toggleBtn || !breatheCircle || !breatheLabel) return;

  let isRunning = false;
  let timerInterval = null;
  let phase = 0; // 0: Inhale (4s), 1: Hold (4s), 2: Exhale (4s), 3: Hold (4s)
  let count = 4;

  const phases = [
    { name: "Inhale...", scale: 1.25, bg: "bg-olive", color: "text-olive-dark" },
    { name: "Hold gently...", scale: 1.25, bg: "bg-olive-dark", color: "text-olive-dark" },
    { name: "Exhale softly...", scale: 0.8, bg: "bg-sunshine", color: "text-espresso" },
    { name: "Rest...", scale: 0.8, bg: "bg-olive-light", color: "text-olive-dark" }
  ];

  function tick() {
    count--;
    if (breatheTimer) breatheTimer.textContent = `${count}s`;

    if (count <= 0) {
      phase = (phase + 1) % phases.length;
      count = 4;
      const current = phases[phase];
      breatheLabel.textContent = current.name;
      breatheCircle.style.transform = `scale(${current.scale})`;
    }
  }

  function start() {
    isRunning = true;
    toggleBtn.innerHTML = `<span>⏸ Pause Breath</span>`;
    toggleBtn.classList.replace('bg-olive', 'bg-espresso');
    toggleBtn.classList.replace('text-cream', 'text-sunshine');
    
    phase = 0;
    count = 4;
    breatheLabel.textContent = phases[0].name;
    breatheCircle.style.transform = `scale(${phases[0].scale})`;
    if (breatheTimer) breatheTimer.textContent = `${count}s`;

    timerInterval = setInterval(tick, 1000);
    showToast("Mindful breathing session started 🧘");
  }

  function stop() {
    isRunning = false;
    clearInterval(timerInterval);
    toggleBtn.innerHTML = `<span>▶ Start Box Breathing</span>`;
    toggleBtn.classList.replace('bg-espresso', 'bg-olive');
    toggleBtn.classList.replace('text-sunshine', 'text-cream');
    breatheLabel.textContent = "Ready to ground";
    breatheCircle.style.transform = "scale(1)";
    if (breatheTimer) breatheTimer.textContent = "4-4-4";
  }

  toggleBtn.addEventListener('click', () => {
    if (isRunning) stop();
    else start();
  });
}

/**
 * 8. Live Sourdough Hydration & Recipe Calculator (Baking)
 */
function initBakingCalculator() {
  const flourInput = document.getElementById('sourdough-flour');
  const hydrationInput = document.getElementById('sourdough-hydration');
  const flourVal = document.getElementById('sourdough-flour-val');
  const hydrationVal = document.getElementById('sourdough-hydration-val');

  const waterResult = document.getElementById('sourdough-water');
  const starterResult = document.getElementById('sourdough-starter');
  const saltResult = document.getElementById('sourdough-salt');
  const totalDough = document.getElementById('sourdough-total');

  if (!flourInput || !hydrationInput) return;

  function recalculate() {
    const flour = parseInt(flourInput.value, 10) || 500;
    const hydration = parseInt(hydrationInput.value, 10) || 75;

    if (flourVal) flourVal.textContent = `${flour}g`;
    if (hydrationVal) hydrationVal.textContent = `${hydration}%`;

    const water = Math.round(flour * (hydration / 100));
    const starter = Math.round(flour * 0.20); // standard 20% levain
    const salt = Math.round(flour * 0.02); // 2% salt
    const total = flour + water + starter + salt;

    if (waterResult) waterResult.textContent = `${water}g`;
    if (starterResult) starterResult.textContent = `${starter}g`;
    if (saltResult) saltResult.textContent = `${salt}g`;
    if (totalDough) totalDough.textContent = `${total}g total dough`;
  }

  flourInput.addEventListener('input', recalculate);
  hydrationInput.addEventListener('input', recalculate);
  recalculate();
}

/**
 * 9. Interactive Yarn / Thread Color Palette Generator
 */
function initYarnPaletteGenerator() {
  const paletteContainer = document.getElementById('yarn-swatches');
  const shuffleBtn = document.getElementById('shuffle-yarn-btn');
  const paletteThemeName = document.getElementById('yarn-theme-name');

  if (!paletteContainer || !shuffleBtn) return;

  const colorStories = [
    {
      name: "Wildflower Meadows",
      colors: ["#E85D75", "#F6AE2D", "#496E4C", "#DDD6FE", "#FAF7F0"]
    },
    {
      name: "Autumn Harvest Hearth",
      colors: ["#F26419", "#B84307", "#F6AE2D", "#2F4B32", "#1E1A17"]
    },
    {
      name: "Cosmic Indigo Night",
      colors: ["#123499", "#1E4ED8", "#DDD6FE", "#F6AE2D", "#FFFFFF"]
    },
    {
      name: "Vintage Botanicals",
      colors: ["#496E4C", "#EDF4EE", "#E85D75", "#FDE8EC", "#F6AE2D"]
    },
    {
      name: "Sunrise Warmth",
      colors: ["#F26419", "#E85D75", "#F6AE2D", "#FEEDE4", "#1E1A17"]
    }
  ];

  let storyIndex = 0;

  function renderPalette() {
    storyIndex = (storyIndex + 1) % colorStories.length;
    const current = colorStories[storyIndex];

    if (paletteThemeName) paletteThemeName.textContent = current.name;

    paletteContainer.innerHTML = '';
    current.colors.forEach(hex => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'flex-1 h-12 sm:h-14 rounded-xl border border-espresso/30 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center text-[10px] font-bold shadow-sm';
      swatch.style.backgroundColor = hex;
      swatch.title = `Click to copy ${hex}`;
      swatch.setAttribute('aria-label', `Color ${hex}`);

      swatch.addEventListener('click', () => {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied color ${hex} to clipboard! 🎨`);
        });
      });

      paletteContainer.appendChild(swatch);
    });
  }

  shuffleBtn.addEventListener('click', renderPalette);
  renderPalette(); // initial render
}

/**
 * 10. Interactive Filterable Tag Cloud ("Sparks & Topics I Tinker With")
 */
function initTagFilter() {
  const filterBtns = document.querySelectorAll('.spark-filter-btn');
  const sparkPills = document.querySelectorAll('.spark-pill');

  if (filterBtns.length === 0 || sparkPills.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update button active state
      filterBtns.forEach(b => {
        b.classList.remove('bg-espresso', 'text-cream');
        b.classList.add('bg-paper', 'text-espresso');
      });
      btn.classList.add('bg-espresso', 'text-cream');
      btn.classList.remove('bg-paper', 'text-espresso');

      // Filter spark pills
      sparkPills.forEach(pill => {
        const pillCat = pill.getAttribute('data-category');
        if (category === 'all' || pillCat === category) {
          pill.style.display = 'inline-flex';
          pill.classList.remove('opacity-0', 'scale-90');
          pill.classList.add('opacity-100', 'scale-100');
        } else {
          pill.style.display = 'none';
          pill.classList.add('opacity-0', 'scale-90');
          pill.classList.remove('opacity-100', 'scale-100');
        }
      });
    });
  });
}

/**
 * 11. 3D Card Hover Tilt Micro-interaction
 */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/**
 * 12. Contextual Cursor Label for Image-led Cards
 */
function initCursorFollower() {
  const canFollowPointer = !window.matchMedia('(pointer: coarse)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('[data-hover-label]');
  if (targets.length === 0) return;

  const label = document.createElement('div');
  label.className = 'cursor-follow-label';
  label.setAttribute('aria-hidden', 'true');
  document.body.appendChild(label);

  targets.forEach(target => {
    const showLabel = () => {
      label.textContent = target.getAttribute('data-hover-label');
      label.style.left = '1rem';
      label.style.top = '5rem';
      label.classList.add('is-visible');
    };
    const hideLabel = () => label.classList.remove('is-visible');

    target.addEventListener('focusin', showLabel);

    if (canFollowPointer) {
      target.addEventListener('mouseenter', showLabel);
      target.addEventListener('mousemove', event => {
        label.style.left = `${event.clientX + 18}px`;
        label.style.top = `${event.clientY + 18}px`;
      });
      target.addEventListener('mouseleave', hideLabel);
    }

    target.addEventListener('focusout', hideLabel);
  });
}

/**
 * 13. Gentle Scroll-linked Decorative Movement
 */
function initScrollLinkedMovement() {
  const elements = document.querySelectorAll('[data-scroll-shift]');
  if (elements.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    const viewportCenter = window.innerHeight / 2;
    elements.forEach(element => {
      const speed = Number(element.getAttribute('data-scroll-shift')) || 0;
      const distance = (element.getBoundingClientRect().top - viewportCenter) * speed;
      element.style.setProperty('--scroll-shift-y', `${distance.toFixed(1)}px`);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/**
 * 14. Read With Me ambient sound mixer
 */
function initAmbientReader() {
  const player = document.querySelector('[data-ambient-player]');
  const masterToggle = document.getElementById('ambient-master-toggle');
  const status = player ? player.querySelector('.ambient-status') : null;
  const tracks = [...document.querySelectorAll('.ambient-track')];
  if (!player || !masterToggle || tracks.length === 0) return;

  const audioSources = {
    fireplace: './public/audio/fireplace.mp3',
    rain: './public/audio/rain.mp3',
    'clock-tick': './public/audio/clock-tick.mp3',
    'cat-purr': './public/audio/cat-purr.mp3',
    'page-turns': './public/audio/page-turns.mp3'
  };
  const savedState = JSON.parse(localStorage.getItem('ambientMixerState') || '{}');
  const trackState = new Map();
  let masterPlaying = false;

  tracks.forEach(track => {
    const name = track.dataset.track;
    const toggle = track.querySelector('.ambient-track-toggle');
    const slider = track.querySelector('.ambient-track-volume');
    const audio = new Audio(audioSources[name]);
    audio.loop = true;
    audio.preload = 'none';
    audio.className = 'ambient-audio';
    audio.setAttribute('aria-hidden', 'true');
    audio.addEventListener('error', () => {
      status.textContent = `Could not load ${name.replace('-', ' ')} audio.`;
    });
    player.appendChild(audio);
    const saved = savedState[name] || {};
    const enabled = typeof saved.enabled === 'boolean' ? saved.enabled : ['rain', 'clock-tick'].includes(name);
    const volume = typeof saved.volume === 'number' ? saved.volume : Number(slider.value) / 100;
    audio.volume = volume;
    slider.value = String(Math.round(volume * 100));
    trackState.set(name, { audio, enabled, toggle, slider, track });

    function render() {
      toggle.setAttribute('aria-pressed', String(enabledState().enabled));
      toggle.classList.toggle('opacity-100', enabledState().enabled);
      toggle.classList.toggle('opacity-50', !enabledState().enabled);
      track.classList.toggle('is-disabled', !enabledState().enabled);
    }

    function enabledState() {
      return trackState.get(name);
    }

    track._renderAmbientState = render;
    render();

    toggle.addEventListener('click', () => {
      const state = trackState.get(name);
      state.enabled = !state.enabled;
      if (masterPlaying && state.enabled) state.audio.play().catch(() => {});
      if (masterPlaying && !state.enabled) state.audio.pause();
      render();
      saveState();
    });

    slider.addEventListener('input', () => {
      const state = trackState.get(name);
      state.audio.volume = Number(slider.value) / 100;
      saveState();
    });
  });

  function saveState() {
    const state = {};
    trackState.forEach((entry, name) => { state[name] = { enabled: entry.enabled, volume: entry.audio.volume }; });
    localStorage.setItem('ambientMixerState', JSON.stringify(state));
  }

  function playEnabledTracks() {
    trackState.forEach(entry => { if (entry.enabled) entry.audio.play().catch(() => {}); });
  }

  function pauseTracks() {
    trackState.forEach(entry => entry.audio.pause());
  }

  function renderMaster() {
    masterToggle.setAttribute('aria-pressed', String(masterPlaying));
    masterToggle.textContent = masterPlaying ? '⏸ Pause ambience' : '▶ Play cozy ambience';
  }

  masterToggle.addEventListener('click', () => {
    masterPlaying = !masterPlaying;
    if (masterPlaying) playEnabledTracks(); else pauseTracks();
    renderMaster();
  });

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting && masterPlaying) pauseTracks();
    if (entries[0].isIntersecting && masterPlaying) playEnabledTracks();
  }, { threshold: 0.05 });
  observer.observe(player);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseTracks();
    else if (masterPlaying) playEnabledTracks();
  });
  renderMaster();
}

/**
 * 15. Toast Notification System
 */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-espresso text-cream border border-sunshine/60 px-4 py-2.5 rounded-2xl shadow-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transform translate-y-16 opacity-0 pointer-events-none transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="text-sunshine">✦</span> <span>${message}</span>`;
  toast.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2800);
}

function initToastNotification() {
  document.querySelectorAll('[data-copy-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-trigger');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy} ✨`);
        });
      }
    });
  });
}

/**
 * Photo-booth-style portrait cycle for the Hold On collage.
 */
function initPhotoCycle() {
  const cycles = document.querySelectorAll('.photo-cycle');
  if (cycles.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cycles.forEach(cycle => {
    const images = Array.from(cycle.querySelectorAll('.photo-cycle-img'));
    if (images.length === 0) return;

    let currentIndex = 0;
    images.forEach((image, index) => {
      image.classList.toggle('is-active', index === currentIndex);
    });

    if (prefersReducedMotion || images.length === 1) return;

    const requestedInterval = Number.parseInt(cycle.dataset.interval ?? '', 10);
    const interval = Number.isFinite(requestedInterval)
      ? Math.min(600, Math.max(400, requestedInterval))
      : 500;
    let intervalId = null;

    const pauseCycle = () => {
      if (intervalId === null) return;
      window.clearInterval(intervalId);
      intervalId = null;
    };

    const resumeCycle = () => {
      if (intervalId !== null || document.hidden) return;

      intervalId = window.setInterval(() => {
        images[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('is-active');
      }, interval);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseCycle();
      } else {
        resumeCycle();
      }
    });

    resumeCycle();
  });
}
