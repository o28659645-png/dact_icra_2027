window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

var comparisonScenarios = [
  ['4 kg Weight Drop', 'Response to a sudden 4 kg weight-drop disturbance, shown from three camera views.', [
    ['Front view', 'front_4kg_drop_dact_processed.mp4', 'front_4kg_drop_pos_ctrl_processed.mp4'],
    ['Side view', 'side_4kg_drop_dact_processed.mp4', 'side_4kg_drop_pos_processed.mp4'],
    ['Top view', 'top_4kg_drop_dact_processed.mp4', 'top_4kg_drop_pos_processed.mp4']
  ]],
  ['6 kg Weight Drop', 'Response to a sudden 6 kg weight-drop disturbance, shown from three camera views.', [
    ['Front view', 'front_6kg_drop_dact_processed.mp4', 'front_6kg_drop_pos_processed.mp4'],
    ['Side view', 'side_6kg_drop_dact_processed.mp4', 'side_6kg_drop_pos_processed.mp4'],
    ['Top view', 'top_6kg_drop_dact_processed.mp4', 'top_6kg_drop_pos_processed.mp4']
  ]],
  ['4 kg Swinging Load', 'Comparison under a 4 kg suspended load that introduces a time-varying swinging disturbance.', [
    ['Front view', 'front_4kg_swing_dact_processed.mp4', 'front_4kg_swing_pos_processed.mp4'],
    ['Top view — Trial 1', 'top_4kg_swing_dact_processed_01.mp4', 'top_4kg_swing_pos_processed_01.mp4'],
    ['Top view — Trial 2', 'top_4kg_swing_dact_processed_02.mp4', 'top_4kg_swing_pos_processed_02.mp4']
  ]],
  ['6 kg Swinging Load', 'Comparison under a heavier 6 kg suspended load with a time-varying swinging disturbance.', [
    ['Front view', 'front_6kg_swing_dact.mp4', 'front_6kg_swing_pos_ctrl.mp4'],
    ['Top view — Trial 1', 'top_6kg_swing_dact.mp4', 'top_6kg_swing_pos_processed_01.mp4'],
    ['Top view — Trial 2', 'top_6kg_swing_dact_processed_01.mp4', 'top_6kg_swing_pos_processed_01_1.mp4']
  ]],
  ['6 L Liquid Payload', 'Locomotion with a 6 L liquid payload that produces dynamic, shifting load disturbances.', [
    ['Front view', 'front_6L_liquid_dact_processed.mp4', 'front_6L_liquid_pos_processed.mp4'],
    ['Side view', 'side_6L_liquid_dact_processed.mp4', 'side_6L_liquid_pos_processed.mp4'],
    ['Top view', 'top_6L_liquid_dact_processed.mp4', 'top_6L_liquid_pos_processed.mp4']
  ]],
  ['8 L Liquid Payload', 'Locomotion with a larger 8 L liquid payload and its dynamic, shifting load disturbances.', [
    ['Front view', 'front_8L_liquid_dact_processed.mp4', 'front_8L_liquid_pos_processed.mp4'],
    ['Side view', 'side_8L_liquid_dact_processed.mp4', 'side_8L_liquid_pos_processed.mp4'],
    ['Top view', 'top_8L_liquid_dact_processed.mp4', 'top_8L_liquid_pos_processed.mp4']
  ]],
  ['6 kg Offset Payload', "Locomotion with a 6 kg payload mounted away from the robot's nominal center of mass.", [
    ['Front view', 'front_6kg_offset_dact_processed.mp4', 'front_6kg_offset_pos_processed.mp4'],
    ['Side view', 'side_6kg_offset_dact_processed.mp4', 'side_6kg_offset_pos_processed.mp4'],
    ['Top view', 'top_6kg_offset_dact_processed.mp4', 'top_6kg_offset_pos_processed.mp4']
  ]],
  ['8 kg Offset Payload', "Locomotion with a heavier 8 kg payload mounted away from the robot's nominal center of mass.", [
    ['Front view', 'front_8kg_offset_dact_processed.mp4', 'front_8kg_off_pos_processed.mp4'],
    ['Top view — Trial 1', 'top_8kg_offset_dact_processed.mp4', 'top_8kg_offset_pos_processed.mp4'],
    ['Top view — Trial 2', 'top_8kg_offset_dact_processed_1.mp4', 'top_8kg_offset_pos_processed_1.mp4']
  ]]
];

function renderComparisonCards() {
  var cardsContainer = document.getElementById('comparison-cards');
  var cardTemplate = document.getElementById('comparison-card-template');
  var slideTemplate = document.getElementById('comparison-slide-template');

  if (!cardsContainer || !cardTemplate || !slideTemplate) {
    return;
  }

  comparisonScenarios.forEach(function(scenario) {
    var cardFragment = cardTemplate.content.cloneNode(true);
    var card = cardFragment.querySelector('.comparison-card');
    var slidesContainer = cardFragment.querySelector('.comparison-slides');

    card.querySelector('.title').textContent = scenario[0];
    card.querySelector('.comparison-description').textContent = scenario[1];
    card.querySelector('.comparison-previous').setAttribute('aria-label', 'Show previous ' + scenario[0] + ' comparison');
    card.querySelector('.comparison-next').setAttribute('aria-label', 'Show next ' + scenario[0] + ' comparison');
    card.querySelector('.comparison-dots').setAttribute('aria-label', 'Choose a ' + scenario[0] + ' comparison');

    scenario[2].forEach(function(slideData, slideIndex) {
      var slideFragment = slideTemplate.content.cloneNode(true);
      var slide = slideFragment.querySelector('.comparison-slide');
      var videos = slide.querySelectorAll('video');

      slide.dataset.viewLabel = slideData[0];
      slide.hidden = slideIndex !== 0;
      slide.classList.toggle('is-active', slideIndex === 0);
      videos[0].dataset.src = './static/videos/' + slideData[1];
      videos[0].setAttribute('aria-label', 'DACT, ' + scenario[0] + ', ' + slideData[0]);
      videos[1].dataset.src = './static/videos/' + slideData[2];
      videos[1].setAttribute('aria-label', 'POS, ' + scenario[0] + ', ' + slideData[0]);

      slidesContainer.appendChild(slideFragment);
    });

    cardsContainer.appendChild(cardFragment);
  });
}

function initializeComparisonCarousels() {
  document.querySelectorAll('[data-comparison-carousel]').forEach(function(carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.comparison-slide'));
    var dotsContainer = carousel.querySelector('.comparison-dots');
    var status = carousel.querySelector('.comparison-status');
    var playBothButton = carousel.querySelector('.comparison-play-both');
    var activeIndex = 0;

    function getActiveVideos() {
      return Array.prototype.slice.call(slides[activeIndex].querySelectorAll('video'));
    }

    function loadSlideVideos(slide) {
      slide.querySelectorAll('video[data-src]').forEach(function(video) {
        if (!video.getAttribute('src')) {
          video.src = video.dataset.src;
          video.load();
        }
      });
    }

    function pauseAndReset(slide) {
      slide.querySelectorAll('video').forEach(function(video) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch (error) {
          // Metadata may not be available yet, so there is nothing to reset.
        }
      });
    }

    function updatePlayButton() {
      var videos = getActiveVideos();
      var bothPlaying = videos.length > 0 && videos.every(function(video) {
        return !video.paused && !video.ended;
      });
      playBothButton.textContent = bothPlaying ? 'Pause both' : 'Play both';
    }

    function showSlide(index) {
      pauseAndReset(slides[activeIndex]);
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach(function(slide, slideIndex) {
        var isActive = slideIndex === activeIndex;
        slide.hidden = !isActive;
        slide.classList.toggle('is-active', isActive);
      });

      loadSlideVideos(slides[activeIndex]);

      Array.prototype.forEach.call(dotsContainer.children, function(dot, dotIndex) {
        var isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      status.textContent = slides[activeIndex].dataset.viewLabel + ' (' + (activeIndex + 1) + ' of ' + slides.length + ')';
      updatePlayButton();
    }

    slides.forEach(function(slide, slideIndex) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'comparison-dot';
      dot.setAttribute('aria-label', 'Show ' + slide.dataset.viewLabel);
      dot.addEventListener('click', function() {
        showSlide(slideIndex);
      });
      dotsContainer.appendChild(dot);

      slide.querySelectorAll('video').forEach(function(video) {
        video.addEventListener('play', updatePlayButton);
        video.addEventListener('pause', updatePlayButton);
        video.addEventListener('ended', updatePlayButton);
      });
    });

    carousel.querySelector('.comparison-previous').addEventListener('click', function() {
      showSlide(activeIndex - 1);
    });

    carousel.querySelector('.comparison-next').addEventListener('click', function() {
      showSlide(activeIndex + 1);
    });

    playBothButton.addEventListener('click', function() {
      var videos = getActiveVideos();
      var bothPlaying = videos.every(function(video) {
        return !video.paused && !video.ended;
      });

      if (bothPlaying) {
        videos.forEach(function(video) {
          video.pause();
        });
      } else {
        videos.forEach(function(video) {
          video.play().catch(updatePlayButton);
        });
      }
      updatePlayButton();
    });

    showSlide(0);
  });
}


$(document).ready(function() {
    renderComparisonCards();
    initializeComparisonCarousels();

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    if ($('#interpolation-slider').length) {
      preloadInterpolationImages();

      $('#interpolation-slider').on('input', function(event) {
        setInterpolationImage(this.value);
      });
      setInterpolationImage(0);
      $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    }

    bulmaSlider.attach();

})
