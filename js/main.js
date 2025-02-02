document.addEventListener('DOMContentLoaded', function() {
    const IndStreamPlayerConfigs = {
  width: 380,
  height: 280,
  id: 'IndStreamPlayer',
  tr: false
};

const AwsIndStreamDomain = 'https://akaino330lpx.com'; // Ensure this domain is correct

document.getElementById('playButton').addEventListener('click', function () {
  const imdbID = document.getElementById('imdbInput').value.trim();
  if (imdbID) {
    const AwsIndStreamIframeUrl = `${AwsIndStreamDomain}/play/${imdbID}`;
    loadIframe(AwsIndStreamIframeUrl);
  } else {
    alert('Please enter a valid IMDb ID.');
  }
});

function loadIframe(url) {
  const playerContainer = document.getElementById(IndStreamPlayerConfigs.id);
  playerContainer.innerHTML = ''; // Clear previous iframe if any

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', url);
  iframe.setAttribute('width', IndStreamPlayerConfigs.width);
  iframe.setAttribute('height', IndStreamPlayerConfigs.height);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', 'true');

  playerContainer.appendChild(iframe);

  // Feedback while loading the iframe
  iframe.onload = function () {
    console.log('Iframe loaded successfully.');
  };

  iframe.onerror = function () {
    playerContainer.innerHTML = '<p style="color:white;">Error loading the stream. Please try again.</p>';
  };
}
