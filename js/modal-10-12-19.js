(function () {
  var btn = document.getElementById('modal_opener');

  if (btn) {

    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);
    var modal = document.querySelector('.modal');
    var action = getUrlParameter('action'); // "edit"

    if (action == 'show_video')
    {
      toggleModal();
    }

    //const media = document.querySelector('video');

    player.on('play', function() {
    });

    player.on('pause', function() {
    });

    player.on('ended', function() {
      toggleModal();
    });

  }


  function attachModalListeners(modalElm) {
    modalElm.querySelector('.close_modal').addEventListener('click', toggleModal);
    modalElm.querySelector('.overlay').addEventListener('click', toggleModal);
  }

  function detachModalListeners(modalElm) {
    modalElm.querySelector('.close_modal').removeEventListener('click', toggleModal);
    modalElm.querySelector('.overlay').removeEventListener('click', toggleModal);
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function toggleModal() {
    var currentState = modal.style.display;

    // If modal is visible, hide it. Else, display it.
    if (currentState === 'none') {
      modal.style.display = 'block';
      attachModalListeners(modal);
    }
    else
    {
      // Pause the media...
      //media.pause();
      player.pause().then(function() {
        // the video was paused
      }).catch(function(error) {
        switch (error.name) {
          case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          break;

          case 'PrivacyError':
          // the video is private
          break;

          default:
          // some other error occurred
          break;
        }
      });
      modal.style.display = 'none';
      detachModalListeners(modal);

    }
  }
  // Only do this if we have a btn
  if (btn)
  {
    btn.addEventListener('click', toggleModal);
  }

})();
