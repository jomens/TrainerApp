'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $interval) {
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
              { quote: "You miss 100 percent of the shots you don't take.", author: "Wayne Gretzky" },
              { quote: "I always felt that my greatest asset was not my physical ability, it was my mental ability.", author: "Bruce Jenner" },
              { quote: "There may be people that have more talent than you, but theres no excuse for anyone to work harder than you do.", author: "Derek Jeter" },
              { quote: "It’s not the will to win that matters—everyone has that. It’s the will to prepare to win that matters.", author: "Paul 'Bear' Bryant" },
              { quote: "Continuous effort — not strength or intelligence — is the key to unlocking our potential.", author: "Liane Cardes" },
              { quote: "Good is not good when better is expected.", author: "Vin Scully" },
              { quote: "The principle is competing against yourself. It’s about self-improvement, about being better than you were the day before.", author: "Steve Young" },
              { quote: "The more difficult the victory, the greater the happiness in winning.", author: "Pele" },
              { quote: "Always make a total effort, even when the odds are against you.", author: "Arnold Palmer" },
              { quote: "To uncover your true potential you must first find your own limits and then you have to have the courage to blow past them.”", author: "Picabo Street" },
              { quote: "Show me a guy who’s afraid to look bad, and I’ll show you a guy you can beat every time.", author: "Lou Brock" },
              { quote: "Your biggest opponent isn’t the other guy. It’s human nature.", author: "Bobby Knight" },
              { quote: "Excellence is the gradual result of always striving to do better.", author: "Pat Riley" },
              { quote: "Just keep going. Everybody gets better if they keep at it.", author: "Ted Williams" },
              { quote: "It is not the size of a man but the size of his heart that matters.", author: "Evander Holyfield" },
              { quote: "You're never a loser until you quit trying", author: "Yogi Berra" },
          ];
          $scope.quote = quotes[Math.floor(Math.random() * quotes.length)];

          $interval(function () {
              $scope.quote = quotes[Math.floor(Math.random() * quotes.length)];

          }, 10000)
         
      }

      $scope.$on('$locationChangeStart', function (event, next, current) {
          angular.element("body").removeClass("show-image");

      });
     
  });
