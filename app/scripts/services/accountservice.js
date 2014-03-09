'use strict';

angular.module('TrainerApp')
  .factory('AccountService', function (Azure, Identity, Notifier) {
     // var loggedInUser = Identity.getLoggedInUser();

    return {
        getLocations: function (success, error) {
            Notifier.busy();
            Azure.SiteResource().query({ institutionId: Identity.getLoggedInUser().institutionId },
                function (data) {
                Notifier.done();

                success(data);
            }, error)
      }
    };
  });
