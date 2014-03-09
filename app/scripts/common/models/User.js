var DigitalFio = DigitalFio || {};

(function () {
    function getImage() {

        var baseUrl = "http://api.randomuser.me/0.2/portraits/";
        var gender = ["men", "women"];

        return baseUrl + gender[Math.floor(Math.random() * 2)] + "/" + Math.ceil(Math.random() * 20) + ".jpg";
    }

    DigitalFio.User = function () { //this holds both trainers and users...but will have a
        this.auth_userId = "";
        this.firstName = "";
        this.lastName = "";
        this.auth_userId = "";
        this.email = "";
        this.pin = "";//0000
        this.phone = "";
        this.userType = "user"
        this.trainerId = "";
        this.siteId = "";//deprecate
       // this.institutionId = ""; //deprecate
        this.siteId = "";
        this.institutionId = "";
        this.isAdmin = false;
        this.isRemote = false;
        this.imageUrl = getImage();

    }

})();