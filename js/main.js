document.addEventListener('DOMContentLoaded', function() {
    const IndStreamPlayerConfigs = {
      width: 380,
      height: 280,
      id: 'IndStreamPlayer',
      tr: false
    };
    const AwsIndStreamDomain = 'https://varu306lit.com';
    
    (function() {
    
      const AwsIndStreamPlayerIframe = document.createElement('iframe');
      var initIndStreamPlayer = false;
    
      const genAwsPlayer = (imdbID) => {
        const AwsIndStreamIframeParamTr = IndStreamPlayerConfigs.tr !== false && IndStreamPlayerConfigs.tr > 0 ? '?tr=' + parseInt(IndStreamPlayerConfigs.tr) : '';
        const AwsIndStreamIframeUrl = `${AwsIndStreamDomain}/play/${imdbID}${AwsIndStreamIframeParamTr}`;
        
        AwsIndStreamPlayerIframe.setAttribute('src', AwsIndStreamIframeUrl);
        AwsIndStreamPlayerIframe.setAttribute('width', IndStreamPlayerConfigs.width); // Fixed width and height
        AwsIndStreamPlayerIframe.setAttribute('height', IndStreamPlayerConfigs.height);
        AwsIndStreamPlayerIframe.setAttribute('frameborder', 0);
        AwsIndStreamPlayerIframe.setAttribute('allowfullscreen', 'true'); // Use 'true' for boolean attributes
    
        const AwsIndStreamPlayerContainer = document.getElementById(IndStreamPlayerConfigs.id);
        
        if (AwsIndStreamPlayerContainer) {
          if (!AwsIndStreamPlayerContainer.querySelector('iframe')) {
            AwsIndStreamPlayerContainer.appendChild(AwsIndStreamPlayerIframe);
          }
        } else {
          setTimeout(() => genAwsPlayer(imdbID), 100);
        }
      }
    
      const AwsIndStreamAjax = (url, success, error) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (typeof success === 'function') success();
            } else {
              if (typeof error === 'function') error();
            }
          }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
      }
    
      document.getElementById('playButton').addEventListener('click', () => {
        const imdbID = document.getElementById('imdbInput').value.trim();
        if (imdbID) {
          const AwsIndStreamIframeUrl = `${AwsIndStreamDomain}/play/${imdbID}`;
          
          AwsIndStreamAjax(AwsIndStreamIframeUrl, () => {
            genAwsPlayer(imdbID);
          }, () => {
            alert('Wait 10-15 Seconds After Clicking On Play');
          });
        } else {
          alert('Please enter a valid IMDb ID.');
        }
      });
    
      function listener(event) {
        if (event.origin === AwsIndStreamDomain && !initIndStreamPlayer) {
          if (event.data && event.data.event) {
            if (event.data.event === 'init') {
              AwsIndStreamPlayerIframe.width = IndStreamPlayerConfigs.width;
              AwsIndStreamPlayerIframe.height = IndStreamPlayerConfigs.height;
              initIndStreamPlayer = true;
            } else if (event.data.event === 'error') {
              const AwsIndStreamPlayerContainer = document.getElementById(IndStreamPlayerConfigs.id);
              if (AwsIndStreamPlayerContainer) {
                AwsIndStreamPlayerContainer.innerHTML = ''; // Clear content
              }
            }
          }
        }
      }
    
      if (window.addEventListener) {
        window.addEventListener('message', listener);
      } else {
        window.attachEvent('onmessage', listener);
      }
    })();
  });
  