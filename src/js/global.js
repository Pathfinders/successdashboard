// Load cookie
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Save cookie
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get user data from cookie
export function user() {
    var userdataStr = getCookie('userdata');
    if (!userdataStr) {
        return false;
    }
    var userdataObj = JSON.parse(userdataStr);
    return userdataObj;
}

// Bounce users to login page if logged-in cookie is not set
export function verification() {
    var loggedin = getCookie('loggedin');
    if (loggedin !== "true") {
        window.location = "/";
        return false;
    } else {
        return true;
    }
}

// Helper function to search array of questions
export function getAnswer(arr, val) {
    var count = 0;
    var sum = 0;
    var payload = {
        average: 0,
        data: []
    };
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].quesid === val) {
            sum += parseInt(arr[i].ratingid,10);
            count++;
            payload.data.push(arr[i]);
        }
    }
    payload.average = Math.round(sum / count);
    return payload;
}

// Helper function to search array of projects
export function getProject(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].projectid === val) {
            return arr[i];
        }
    }
}

// Helper function to get current year
export function getYear() {
    var d = new Date();
    var n = d.getFullYear();
    return n;
}

// Helper function to get current month
export function getMonth() {
    var d = new Date();
    var n = d.getMonth();
    return n + 1;
}

// Pathfinders color scheme
export const pfColors = {
    red: "#c64034",
    orange: "#e87800",
    ltgreen: "#b0c182",
    dkgreen: "#708043",
    ltblue: "#c7d5ec",
    grey: "#77777a",
    black: "#231f20",
    white: "#ffffff"
}
