const cardWrapper = document.querySelector('.card-wrapper');
const btn = document.querySelector('.button');
let randomAnimals = new Map();
randomAnimals.set(0, 'http://127.0.0.1:5500/assets/shiba.png');
randomAnimals.set(1, 'http://127.0.0.1:5500/assets/cat.png');
randomAnimals.set(2, 'http://127.0.0.1:5500/assets/hippo.png');

let clickCount = 0;
const init = () => {
  setAnimals();
};

const setAnimals = () => {
  for (let index = 0; index < 8; index++) {
    createAnimalCard();
  }
};

const getRandomAnimal = () => {
  const index = Math.floor(Math.random() * randomAnimals.size);
  const animalImage = randomAnimals.get(index);
  return animalImage;
};
let guesses = [];
const createAnimalCard = () => {
  const src = getRandomAnimal();
  const contentWrapper = document.createElement('div');
  contentWrapper.addEventListener('click', () => {
    clickCount++;
    const animal = contentWrapper.children[0].src
      .split('/')
      .pop()
      .split('.')[0];

    guesses.push(animal);
    if (clickCount < 3) {
      contentWrapper.children[0].classList.remove('visually-hidden');
    }
    if (clickCount === 2) {
      console.log(guesses);
      contentWrapper.children[0].classList.remove('visually-hidden');

      setTimeout(() => {
        gameEnded(guesses[0] === guesses[1]);
      }, 200);
    }
  });

  contentWrapper.classList.add(
    'animal',
    'col',
    'card-item',
    'text-center',
    'text-light',
    'm-3',
    'p-3',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );

  const animal = document.createElement('img');
  animal.src = src;
  animal.classList.add('img-fluid', 'visually-hidden');
  contentWrapper.appendChild(animal);
  cardWrapper.appendChild(contentWrapper);
};

init();

const gameEnded = (state) => {
  if (state) {
    alert('You Win');
  } else {
    alert('Game Over');
  }
  cardWrapper.classList.add('visually-hidden');
  btn.classList.remove('visually-hidden');
};

const resetGame = () => {
  console.log('reset');
  while (cardWrapper.firstChild && cardWrapper.firstChild !== btn) {
    cardWrapper.removeChild(cardWrapper.firstChild);
  }
  btn.classList.add('bounce');
  setTimeout(() => {
    btn.classList.add('visually-hidden');
    cardWrapper.classList.remove('visually-hidden');
    btn.classList.remove('bounce');
  }, 1500);
  guesses = [];
  clickCount = 0;

  init();
};
btn.addEventListener('click', () => {
  resetGame();
});
