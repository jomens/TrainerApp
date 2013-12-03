'use strict';

angular.module('TrainerApp')
.factory("Models", ["Environment", function (Environment) {


    function getDummyData(obj) {
        var x = Math.floor((Math.random() * 50) + 1);
        for (var key in obj) {
            if (key == "id" || key == "status" || key == "pin" || key.toLowerCase().indexOf("usertype") != -1 || key.toLowerCase().indexOf("id") != -1) {
                continue;
            }
            else if (key.toLowerCase().indexOf("email") != -1) {
                obj[key] = "email" + x + "@email.com";
            }
            else if (key.toLowerCase().indexOf("state") != -1) {
                obj[key] = "WA";
            }
            else if (key.toLowerCase().indexOf("city") != -1) {
                obj[key] = "Seattle";
            }
            else if (key.toLowerCase().indexOf("zip") != -1) {
                obj[key] = "58585";
            }
            else if (key.toLowerCase().indexOf("phone") != -1) {
                obj[key] = "555555555";
            }
            else if (key.toLowerCase().indexOf("firstname") != -1) {
                obj[key] = "John" + x;
            }
            else if (key.toLowerCase().indexOf("lastname") != -1) {
                obj[key] = "Doe" + x;
            }
            else if (key.toLowerCase().indexOf("name") != -1) {
                obj[key] = "Company" + x;
            }
            else {
                obj[key] = "Lorem" + x;
            }

            //x++;
        }

        return obj;
    }

    var AccountType = {
        business: "business",
        individual: "individual"
    };

    var Account = function () {
        this.name = "";
        this.accountType = "";
        // this.addressId = "";
        //this.mainContactId = "";
    }

    //var Address = function () {
    //    this.address = "";
    //    this.address2 = "";
    //    this.city = "";
    //    this.state = "";
    //    this.zip = "";
    //    this.phone = "";
    //    this.accountId = "";

    //}

    var User = function () {
        this.firstName = "";
        this.lastName = "";
        this.pin = "0000";
        this.email = "";
        this.phone = "";
        this.trainerId = -1;

    }

    var Trainer = function () {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
    }

    

    function getModel(model) {

        if (Environment == "PROD") {
            switch (model) {
                 case "trainer": return new Trainer();
                // case "user": return new User();
                //case "account": return new Account();
               // case "individual": return { firstName: "", lastName: "" };
            }

        }
        else {
            switch (model) {
                 case "trainer": return getDummyData(new Trainer());
                 case "user": return getDummyData(new User());
                // case "account": return getDummyData(new Account());
               // case "punch": return new Punch();
                //case "job": return getDummyData(new Job());
              //  case "individual": return getDummyData({ firstName: "", lastName: "" });

            }
        }
    }

    return {
         Trainer: function () { return getModel("trainer"); },
         User: function () { return getModel("user"); },
        //Account: function () { return getModel("account"); },
        //AccountType: AccountType,
        //Individual: function () { return getModel("individual"); },

    }

}])

