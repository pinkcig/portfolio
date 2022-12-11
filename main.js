// Set a random --color-heading linear gradient for each card

/**
 * @param {string} selector
 * @returns {Element}
 */
function $(selector) {
  return document.querySelector(selector);
}

/**
 * @param {string} selector
 * @returns {Element[]}
 */
function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * @param {unknown[]} arr
 */
function cycle(arr) {
  let i = 0;

  return () => {
    const value = arr[i];

    i = (i + 1) % arr.length;

    return value;
  };
}

/**
 * @param {unknown[]} arr
 */
function scramble(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * len),
      temp = arr[i];

    arr[i] = arr[random];
    arr[random] = temp;
  }

  return arr;
}

/**
 * @param {((...args: unknown[]) => unknown)[]} fns
 */
function pipe(...fns) {
  return (...args) => fns.reduce((acc, fn) => fn(acc), ...args);
}

const gradient = pipe(
  scramble,
  cycle
)([
  '#a18cd1, #fbc2eb, #a6c1ee, #fbc2eb',
  '#fbc2eb, #a6c1ee, #fbc2eb, #a18cd1',
  '#a6c1ee, #fbc2eb, #a18cd1, #fbc2eb',
]);

$('.cards').onmousemove = (event) => {
  for (const target of $$('.card')) {
    const rect = target.getBoundingClientRect(),
      x = event.clientX - rect.left,
      y = event.clientY - rect.top;

    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  }
};

for (const target of $$('.card')) {
  const cardGradient = gradient();

  // General text glow
  target.style.setProperty(
    '--color-heading',
    `linear-gradient(to right, ${cardGradient})`
  );

  // Border glow
  target.style.setProperty(
    '--radial-gradient',
    `radial-gradient(600px circle at var(--x) var(--y),
    ${cardGradient},
    transparent 40%)`
  );
}

const born = new Date(2006, 6, 13);
const programmingSince = new Date(2018, 8, 1);

$('#age').textContent = new Date().getFullYear() - born.getFullYear();
$('#programming-since').textContent =
  new Date().getFullYear() - programmingSince.getFullYear();

if (
  born.getMonth() === new Date().getMonth() &&
  born.getDate() === new Date().getDate()
) {
  $('#age').textContent += ' 🎂';
}
