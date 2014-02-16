'use strict';

var amplify = {};
describe('Service: Models', function () {

  beforeEach(module('TrainerApp'));

  var Models,
      trainer,
      user;

  beforeEach(inject(function (_Models_) {
    Models = _Models_;
  }));

  describe("When creating a new user model", function () {

      beforeEach(function () {
          user = Models.User();
      });

      it("should have a right properties set", function () {
          expect(user.firstName).toBe("");
          expect(user.lastName).toBe("");
          expect(user.email).toBe("");
          expect(user.phone).toBe("");
          expect(user.userType).toBe("");
          expect(user.trainerId).toBe("");
          expect(user.fitnessOrgId).toBe("");
          expect(user.fitnessCenterId).toBe("");
      });

      describe("and the user is a trainer", function () {

          beforeEach(function () {
              trainer = Models.Trainer();
          });

          it("should have userType trainer", function () {
              expect(trainer.userType).toBe("trainer");
          });
      });

      //describe("and the user is a fitness Org Admin", function () {

      //    beforeEach(function () {
      //        user = Models.FitnessOrgAdmin();
      //    });

      //    it("should have role fitnessorgadmin", function () {
      //        expect(user.role).toBe("fitnessorgadmin");
      //    });
      //});

      //describe("and the user is a fitness center admin", function () {

      //    beforeEach(function () {
      //        user = Models.FitnessCenterAdmin();
      //    });

      //    it("should have role fitnesscenteradmin", function () {
      //        expect(user.role).toBe("fitnesscenteradmin");
      //    });
      //});

  });

});
