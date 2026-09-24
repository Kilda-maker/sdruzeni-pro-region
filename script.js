const candidates = [
  { name: 'Mgr. Bc. Ladislav Kilián, MBA', age: 54, job: 'místostarosta obce Kněžmost', place: 'Koprník' },
  { name: 'Milan Bez', age: 53, job: 'vedoucí logistických skladů', place: 'Kněžmost' },
  { name: 'Hana Bejrová', age: 73, job: 'důchodkyně', place: 'Koprník' },
  { name: 'Dmytro Salamatin', age: 40, job: 'podnikatel', place: 'Solec' },
  { name: 'Jana Loudová', age: 48, job: 'průmyslový logistik', place: 'Kněžmost' },
  { name: 'Bc. Stanislav Bejr', age: 49, job: 'manažer spol. Gasnet', place: 'Koprník' },
  { name: 'Lukáš Víšek', age: 34, job: 'živnostník', place: 'Srbsko' },
  { name: 'Jaromír Bartoš', age: 26, job: 'podnikatel', place: 'Solec' },
  { name: 'Aleš Rejzek', age: 51, job: 'živnostník', place: 'Kněžmost' },
  { name: 'Ing. Lukáš Kilián', age: 27, job: 'technolog', place: 'Koprník' },
  { name: 'Romana Kyselová', age: 44, job: 'učitelka autoškoly', place: 'Kněžmost' },
  { name: 'Vladislav Hejl', age: 38, job: 'truhlář', place: 'Úhelnice' },
  { name: 'Alena Pažoutová', age: 50, job: 'administrativní pracovnice', place: 'Násedlnice' },
  { name: 'Jiří Najman', age: 68, job: 'důchodce', place: 'Násedlnice' },
  { name: 'Robert Řípa', age: 50, job: 'zedník', place: 'Koprník' },
];

const otherPlaces = new Set(['Srbsko', 'Úhelnice']);
const grid = document.querySelector('#candidate-grid');
const personSvg = `
<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <circle cx="50" cy="35" r="19"></circle>
  <path d="M18 88c2-22 15-34 32-34s30 12 32 34H18Z"></path>
  <path d="M37 56l13 14 13-14 6 7-19 24-19-24 6-7Z" fill="#f7d16b"></path>
</svg>`;

function candidateCard(c) {
  const article = document.createElement('article');
  article.className = 'candidate-card reveal in-view';
  article.dataset.place = c.place;
  article.innerHTML = `
    <div class="candidate-avatar">${personSvg}</div>
    <div>
      <h3>${c.name}</h3>
      <div class="candidate-age">${c.age} let</div>
      <p class="candidate-meta">${c.job},<br>${c.place === 'Kněžmost' ? 'obec Kněžmost' : `místní část ${c.place}`}</p>
    </div>`;
  return article;
}

candidates.forEach(c => grid.append(candidateCard(c)));

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.candidate-card').forEach(card => {
      const place = card.dataset.place;
      const show = filter === 'all' || place === filter || (filter === 'ostatní' && otherPlaces.has(place));
      card.hidden = !show;
    });
  });
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
