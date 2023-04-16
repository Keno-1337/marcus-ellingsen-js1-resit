const jokeContainer = document.querySelector("#jokeContainer");
const generalBtn = document.querySelector("#general-btn");
const programmingBtn = document.querySelector("#programming-btn");
const allBtn = document.querySelector("#all-btn");

const apiUrl = 'https://api.noroff.dev/api/v1/';

function displayJokes(jokes) {
  jokeContainer.innerHTML = "";

  jokes.forEach(joke => {
    const card = document.createElement('div');
    card.classList.add('joke-card');

    const type = document.createElement('h3');
    type.textContent = joke.type;
    card.appendChild(type);

    const setup = document.createElement('p');
    setup.textContent = joke.setup;
    card.appendChild(setup);

    const punchlineLink = document.createElement('a');
    punchlineLink.textContent = 'View Punchline';
    punchlineLink.href = `joke.html?id=${joke.id}`;
    card.appendChild(punchlineLink);

    jokeContainer.appendChild(card);
  });
}
async function fetchJokes() {
  try {
    const response = await fetch(`${apiUrl}jokes`);
    const jokes = await response.json();
    return jokes;
  } catch (error) {
    console.log(error);
  }
}
async function filterJokesByType(type) {
  const jokes = await fetchJokes();
  const filteredJokes = jokes.filter(joke => joke.type === type);
  displayJokes(filteredJokes);
}

filterJokesByType("general");

generalBtn.addEventListener("click", () => {
  filterJokesByType("general");
});

programmingBtn.addEventListener("click", () => {
  filterJokesByType("programming");
});

allBtn.addEventListener("click", async () => {
  const jokes = await fetchJokes();
  displayJokes(jokes);
});