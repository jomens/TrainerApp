var Get = {
    mock: function (spyName) {
        return jasmine.createSpy( spyName || "mock-service")
    },
    TrainerService: function () {
        return {
            getNonRemoteClients: Get.mock("non-remote"),
            getRemoteClients: Get.mock("remote")
        }
    }
}