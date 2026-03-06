/* ═══════════════════════════════════════════════════════
   RYX WEBSITE — Main Application JS
   ═══════════════════════════════════════════════════════ */

// ─── SYNTAX HIGHLIGHTER ─────────────────────────────────
const RyxHighlighter = {
  keywords: [
    'act', 'retn', 'use', 'pub', 'mut', 'const', 'shared',
    'struct', 'enum', 'trait', 'impl', 'alias',
    'if', 'else', 'loop', 'break', 'next', 'match', 'guard',
    'defer', 'async', 'await', 'unsafe',
    'in', 'as', 'is', 'self',
    'true', 'false',
  ],
  types: [
    'bool', 'int', 'uint', 'float', 'str', 'bytes', 'void', 'tensor',
    'Vec', 'Map', 'Set', 'Option', 'Result', 'Ok', 'Err', 'Some', 'None',
  ],
  builtins: [
    'println', 'print', 'std', 'io', 'math', 'alloc', 'free',
    'len', 'push', 'pop', 'insert', 'remove', 'get', 'contains',
    'parse_int', 'parse_float', 'to_str', 'is_empty',
    'open', 'close', 'read', 'write',
  ],

  highlight(code) {
    // Escape HTML first
    let result = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Apply rules in order (build up replacement tokens)
    result = result
      // Comments
      .replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>')
      // String literals
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="tok-string">$1</span>')
      // Numbers
      .replace(/\b(0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?u?)\b/g,
               '<span class="tok-number">$1</span>')
      // Keywords
      .replace(new RegExp(`\\b(${this.keywords.join('|')})\\b`, 'g'),
               '<span class="tok-keyword">$1</span>')
      // Types
      .replace(new RegExp(`\\b(${this.types.join('|')})\\b`, 'g'),
               '<span class="tok-type">$1</span>')
      // Function calls / definitions
      .replace(/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="tok-function">$1</span>')
      // Constants (ALL_CAPS)
      .replace(/\b([A-Z][A-Z0-9_]+)\b/g, '<span class="tok-const">$1</span>')
      // Operators
      .replace(/(:=|->|~&gt;|\?|\.\.=?|&&|\|\|)/g, '<span class="tok-operator">$1</span>')
      // Builtins
      .replace(new RegExp(`\\b(${this.builtins.join('|')})\\b`, 'g'),
               '<span class="tok-builtin">$1</span>');

    return result;
  },

  highlightAll() {
    document.querySelectorAll('[data-lang="ryx"]').forEach(el => {
      el.innerHTML = this.highlight(el.textContent);
      el.classList.add('ryx-code');
    });
  }
};

// ─── NAVIGATION ──────────────────────────────────────────
const Nav = {
  init() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileClose');

    // Scroll behavior
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Mobile toggle
    if (toggle) {
      toggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close mobile on link click
    document.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Active nav item
    this.setActiveLink();
  },

  setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === path || (path === 'index.html' && href === '#')) {
        link.classList.add('active');
      }
    });
  }
};

// ─── SCROLL REVEAL ────────────────────────────────────────
const ScrollReveal = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

// ─── CODE TABS ────────────────────────────────────────────
const CodeTabs = {
  init() {
    // Code editor tabs
    document.querySelectorAll('.code-editor__tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const editor = tab.closest('.code-editor');
        const target = tab.dataset.tab;

        editor.querySelectorAll('.code-editor__tab').forEach(t => t.classList.remove('active'));
        editor.querySelectorAll('.code-editor__content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const content = editor.querySelector(`[data-panel="${target}"]`);
        if (content) content.classList.add('active');
      });
    });

    // Code showcase nav
    document.querySelectorAll('.code-nav__item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.panel;
        const showcase = item.closest('.code-showcase');

        showcase.querySelectorAll('.code-nav__item').forEach(i => i.classList.remove('active'));
        showcase.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const panel = showcase.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }
};

// ─── COPY TO CLIPBOARD ───────────────────────────────────
const Clipboard = {
  init() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const target = btn.dataset.copy;
        const textEl = target
          ? document.querySelector(target)
          : btn.previousElementSibling;

        const text = textEl ? textEl.textContent.trim() : '';

        try {
          await navigator.clipboard.writeText(text);
          const original = btn.innerHTML;
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });
    });
  }
};

// ─── INSTALL PLATFORMS ───────────────────────────────────
const InstallPlatforms = {
  commands: {
    linux:   'curl -fsSL https://ryx.dev/install.sh | sh',
    macos:   'brew install ryx',
    windows: 'winget install ryx-lang.ryx',
  },

  init() {
    document.querySelectorAll('.platform-card').forEach(card => {
      card.addEventListener('click', () => {
        const platform = card.dataset.platform;
        document.querySelectorAll('.platform-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const cmdEl = document.getElementById('installCommand');
        if (cmdEl && this.commands[platform]) {
          cmdEl.textContent = this.commands[platform];
        }
      });
    });
  }
};

// ─── PERFORMANCE BARS ANIMATION ──────────────────────────
const PerfBars = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.perf-bar__fill').forEach(bar => {
            const width = bar.dataset.width;
            setTimeout(() => { bar.style.width = width; }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.perf-bars').forEach(el => observer.observe(el));
  }
};

// ─── TYPEWRITER EFFECT ────────────────────────────────────
const Typewriter = {
  init() {
    const els = document.querySelectorAll('[data-typewrite]');
    els.forEach(el => {
      const words = el.dataset.typewrite.split('|');
      let wordIdx = 0;
      let charIdx = 0;
      let deleting = false;
      let paused = false;

      const type = () => {
        const word = words[wordIdx % words.length];

        if (paused) {
          paused = false;
          setTimeout(type, 2000);
          return;
        }

        if (!deleting) {
          el.textContent = word.slice(0, charIdx + 1);
          charIdx++;
          if (charIdx === word.length) {
            paused = true;
            deleting = true;
            setTimeout(type, 80);
            return;
          }
        } else {
          el.textContent = word.slice(0, charIdx - 1);
          charIdx--;
          if (charIdx === 0) {
            deleting = false;
            wordIdx++;
          }
        }

        setTimeout(type, deleting ? 40 : 70);
      };

      type();
    });
  }
};

// ─── HERO FLOATING PARTICLES ─────────────────────────────
const Particles = {
  init() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const count = 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 236, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(30, 236, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(draw);
    };

    draw();
  }
};

// ─── SMOOTH ANCHOR SCROLL ────────────────────────────────
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
};

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  ScrollReveal.init();
  CodeTabs.init();
  Clipboard.init();
  InstallPlatforms.init();
  PerfBars.init();
  Typewriter.init();
  Particles.init();
  SmoothScroll.init();
  RyxHighlighter.highlightAll();
});
