export class AppConstants {

    static get AppUrl():string {
        return "http://" + location.host + "/apllearning/";
    }

    static get MaterialUrl():string {
        return "http://" + location.host + "/apllearning/storage/app/public/";
    }

    public static USER_TYPE = {
        "SuperAdmin": 1,
        "Admin": 2,
        "Teacher": 3,
        "Student": 4
    };

    public static PAGINATION_SIZE = 10
    public static MAX_NUMBER = 500;
    public static GRADE_RANGE = Array(12).fill('').map((x,i)=>i+1);
    public static SECTION_RANGE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    

}