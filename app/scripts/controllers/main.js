'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $timeout) {
      init();
      
      function init() {

          angular.element("body").addClass("show-image");

          setupQuote();
        
               
      }
      
      function setupQuote() {
          var quotes = [
              { quote: "What counts is not the number of hours you put in but how much you put into those hours.", author: "anonymous" },
              { quote: "The quest for excellence is a lifelong process.", author: "anonymous" },
              { quote: "Never settle for less than your best.", author: "anonymous" },
              { quote: "Be positive; the only place for doubt is in the dictionary.", author: "anonymous" },
              { quote: "If at first you don't succeed, you are like most people.", author: "anonymous" },
              { quote: "Winning takes more backbone than wishbone.", author: "anonymous" },
              { quote: "Nobody ever became a ball player by walking after the ball.", author: "anonymous" },
              { quote: "He who never makes a mistake is he who never ventures.", author: "" },
              { quote: "Timid athletes wait for opportunities; aggressive athletes make them.", author: "anonymous" },
              { quote: "Tough times don't last; tough people do.", author: "anonymous" },
              { quote: "Age is no barrier. It's a limitation you put on your mind", author: "Jackie Joyner-Kersee" },
              { quote: "Persistence can change failure into extraordinary achievement.", author: "Marv Levy" },
              { quote: "Most people never run far enough on their first wind to find out they've got a second.", author: "William James" },
              { quote: "Champions keep playing until they get it right.", author: "Billie Jean King" },
              { quote: "Nobody who ever gave his best regretted it.", author: "George Halas" },
              { quote: "You win some, you lose some, and some get rained out, but you gotta suit up for them all.", author: "J. Askenberg" },
              { quote: "If you can believe it, the mind can achieve it", author: "Ronnie Lott" },
              { quote: "Make each day your masterpiece.", author: "John Wooden" },
              { quote: "Win If You Can, Lose If You Must, But NEVER QUIT!", author: "Cameron Trammell" },
              { quote: "You miss 100 percent of the shots you don't take.", author: "Wayne Gretzky" }
          ];
          $scope.quote = quotes[Math.floor(Math.random() * quotes.length)];
         
      }

      $scope.$on('$locationChangeStart', function (event, next, current) {
          angular.element("body").removeClass("show-image");

      });
     
  });
