'use strict';

angular.module('TrainerApp')
  .controller('AdminCtrl', function ($scope, $timeout) {

      setTimeout(function () {
          $(document).foundation(
              {
              orbit: {
                  navigation_arrows: false,
                  slide_number: false,
                  bullets: false, // Does the slider have bullets visible?
                  circular: false, // Does the slider should go to the first slide after showing the last?
                  timer: false, // Does the slider have a timer visible?
                  variable_height: true, // Does the slider have variable height content?
                  swipe: true,
                  default_slide: 0
                  //before_slide_change: noop, // Execute a function before the slide changes
                  // after_slide_change: noop // Execute a function after the slide changes
              }
              }
          );

      }, 300);

  });
