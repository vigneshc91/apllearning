export class AppConstants {

    static get AppUrl():string {
        return "http://" + location.host + "/apllearning/";
    }

    public static USER_TYPE = {
        "SuperAdmin": 1,
        "Admin": 2,
        "Teacher": 3,
        "Student": 4
    };

    public static PAGINATION_SIZE = 10;

}