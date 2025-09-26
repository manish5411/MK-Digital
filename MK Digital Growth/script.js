// script.js — hamburger, smooth nav, carousel, contact handling, reveal

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav') || document.querySelector('.nav');
  hamburger && hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
    nav.classList.toggle('show');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('show')) nav.classList.remove('show');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Testimonials carousel simple implementation
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');
  let index = 0;
  let width = track ? track.clientWidth : 0;
  function updateWidth(){ width = track.clientWidth; }
  window.addEventListener('resize', updateWidth);

  function goTo(i){
    if(!track) return;
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  prevBtn && prevBtn.addEventListener('click', ()=> goTo(index-1));
  nextBtn && nextBtn.addEventListener('click', ()=> goTo(index+1));

  // Auto-play
  let autoplay = setInterval(()=> goTo(index+1), 5000);
  track && track.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  track && track.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(index+1), 5000));

  // Scroll reveal (intersection observer)
  const reveals = document.querySelectorAll('.card, .work-item, .testimonial, .about-media img');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => obs.observe(r));

  // Contact form: basic validation + mailto fallback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.trim();
      const email = data.get('email')?.trim();
      const message = data.get('message')?.trim();
      if(!name || !email || !message){
        alert('Please fill name, email and message.');
        return;
      }
      // Try to open mailto
      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nPhone: ${data.get('phone') || 'N/A'}\nEmail: ${email}`);
      window.location.href = `mailto:kumarmanish322251@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }
});
