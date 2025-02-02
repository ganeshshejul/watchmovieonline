document.addEventListener('DOMContentLoaded', function () {
    const IndStreamPlayerConfigs = {
        width: 380,
        height: 280,
        id: 'IndStreamPlayer',
        tr: false
    };

    const AwsIndStreamDomain = 'https://akaino330lpx.com'; // Ensure this domain is correct
    let initIndStreamPlayer = false;

    document.getElementById('playButton').addEventListener('click', function () {
        const imdbID = document.getElementById('imdbInput').value.trim();
        if (imdbID) {
            const AwsIndStreamIframeUrl = `${AwsIndStreamDomain}/play/${imdbID}`;
            
            AwsIndStreamAjax(AwsIndStreamIframeUrl, () => {
                loadIframe(AwsIndStreamIframeUrl);
            }, () => {
                alert('Wait 10-15 Seconds After Clicking On Play');
            });
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

    function AwsIndStreamAjax(url, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (typeof success === 'function') success();
                } else {
                    if (typeof error === 'function') error();
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function listener(event) {
        if (event.origin === AwsIndStreamDomain && !initIndStreamPlayer) {
            if (event.data && event.data.event) {
                const playerContainer = document.getElementById(IndStreamPlayerConfigs.id);

                if (event.data.event === 'init') {
                    initIndStreamPlayer = true;
                } else if (event.data.event === 'error' && playerContainer) {
                    playerContainer.innerHTML = ''; // Clear content
                }
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener('message', listener);
    } else {
        window.attachEvent('onmessage', listener);
    }
});
