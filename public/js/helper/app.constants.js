"use strict";
var AppConstants = (function () {
    function AppConstants() {
    }
    Object.defineProperty(AppConstants, "AppUrl", {
        get: function () {
            return "http://" + location.host + "/apllearning/";
        },
        enumerable: true,
        configurable: true
    });
    AppConstants.USER_TYPE = {
        "SuperAdmin": 1,
        "Admin": 2,
        "Teacher": 3,
        "Student": 4
    };
    AppConstants.PAGINATION_SIZE = 10;
    return AppConstants;
}());
exports.AppConstants = AppConstants;
//# sourceMappingURL=app.constants.js.map