// Mobile/tablet -> mailto (opens Gmail app), Desktop -> Gmail web
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const link = document.getElementById('emailLink');
if (isMobile && link) {
  link.href = 'mailto:adityadevelopers2010@gmail.com';
  link.removeAttribute('target');
  link.removeAttribute('rel');
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Project filter
const filterBtns = document.querySelectorAll('#filterBtns button');
const cards = document.querySelectorAll('.project-card');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach((button) => {
      button.className = 'px-3.5 py-2 rounded-full btn-secondary';
    });
    btn.className = 'px-3.5 py-2 rounded-full btn-primary';
    cards.forEach((card) => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
    });
  });
});

// Quote form -> EmailJS + WhatsApp
document.getElementById('quoteForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const params = {
    name: data.get('name'),
    phone: data.get('phone'),
    location: data.get('location'),
    type: data.get('type'),
    area: data.get('area'),
    budget: data.get('budget'),
    message: data.get('message') || ''
  };

  emailjs.send('service_gjlqyy7', 'template_jewmxla', params)
    .then(() => {
      document.getElementById('formMsg')?.classList.remove('hidden');
      const msg = `Hi Aditya Developers, I'm interested in a quote.%0AName: ${params.name}%0APhone: ${params.phone}%0ALocation: ${params.location}%0AType: ${params.type}%0AArea: ${params.area} sqft%0ABudget: ${params.budget}%0A${encodeURIComponent(params.message)}`;
      const waLink = document.createElement('a');
      waLink.href = `https://wa.me/918983621905?text=${msg}`;
      waLink.target = '_blank';
      waLink.rel = 'noopener';
      document.body.appendChild(waLink);
      waLink.click();
      document.body.removeChild(waLink);
      form.reset();
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      alert('Something went wrong. Please try again or WhatsApp us directly.');
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
