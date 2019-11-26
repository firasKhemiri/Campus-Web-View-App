
function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === '') {
        alert("username field cannot be blank");
        return;
    }
    if (password === '') {
        alert("password field cannot be blank");
        return;
    }

    // alert(username+" "+password)

    var http =	 new XMLHttpRequest();

    var url = 'http://localhost:8000/auth/token';
    /*var params = new FormData();
    params.append('client_id', 'zq4VSjDQRM6rSu8jTbDtItuUxfbPKOq9OihFdqqG');
    params.append('client_secret', 'XBtUrDliBozzoSMjxJUwxa5yL5cm9TCNSjY6tKVw6m6yoR0cp5zeIHk1g6ukdv2nDt7f7jH70rA42soWtRkSgwRhToKJvw2suvFq0KNtQOkKoXr9wbociX83CJTJRqW7');
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);*/
    

    var params = 'client_id=zq4VSjDQRM6rSu8jTbDtItuUxfbPKOq9OihFdqqG&client_secret=XBtUrDliBozzoSMjxJUwxa5yL5cm9TCNSjY6tKVw6m6yoR0cp5zeIHk1g6ukdv2nDt7f7jH70rA42soWtRkSgwRhToKJvw2suvFq0KNtQOkKoXr9wbociX83CJTJRqW7&grant_type=password&username='+username+'&password='+password;
    
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);


            	window.localStorage.setItem("token", '' +data.access_token);

            	// alert(window.localStorage.getItem("token"));
            	window.location.href = "profile.html";

            	return false;
            } else {
                // alert("invalid username or password \n try again");

        }
    };
    
    http.send(params);
}
