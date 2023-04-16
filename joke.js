const punchlineContainer = document.querySelector("#punchline");
const urlParams = new URLSearchParams(window.location.search);
const jokeId = urlParams.get('id');
const apiUrl = 'https://api.noroff.dev/api/v1/jokes';

function getJoke(apiUrl, jokeId) {
  if (!jokeId) {
    console.error('Invalid joke ID');
    return;
  }

  fetch(`${apiUrl}/${jokeId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No respons');
      }
      return response.json();
    })
    .then(joke => {
      document.getElementById('type').textContent = joke.type;
      document.getElementById('setup').textContent = joke.setup;
      document.getElementById('punchline-text').textContent = joke.punchline;
    })
    .catch(error => {
      console.error('Error getting joke:', error);
    });
}

getJoke(apiUrl, jokeId);

punchlineContainer.style.display = 'none';
document.getElementById('reveal').addEventListener('click', function() {
  punchlineContainer.style.display = 'block';
  this.style.display = 'none';
});
