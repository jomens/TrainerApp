'use strict';

angular.module('TrainerApp')
.service("Notifier", function () {

    this._progressBar = angular.element(".progress-bar");
    this._buttons = angular.element("button[type=submit], .btn, .button");

    this.busy = function (disableSubmit) {
        this._progressBar.addClass("show");

        if (disableSubmit) {
            this._disableButtons();
        }
    }

    this.done = function (msg, enableSubmit) {
        this._progressBar.removeClass("show");

        if (msg) {
            toastr.success(msg);
        }

       // if (enableSubmit) {
            this._enableButtons();
        //}
    }

    this.error = function (msg, enableSubmit) {
        this._progressBar.removeClass("show");

        if (msg) {
            toastr.error(msg);
        }

        //if (enableSubmit) {
            this._enableButtons();
       // }
    }

    this.errorHandler = function (err) {
        toastr.error("Cloud operation failed");
        console.log(err);
    }

    this._disableButtons = function () {
        this._buttons.attr("disabled", "true");
    }

    this._enableButtons = function () {
        this._buttons.removeAttr("disabled");
    }



})
