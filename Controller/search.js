function userProf(id) {
    window.localStorage.setItem("user_id",id);
    window.location.href="userprof.html";
}

function findUsers() {

    var name = document.getElementById("name").value;




    $.ajax({
        url: "http://localhost:8000/api/users?search="+name,
        type: "GET",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
        },
        complete: function () {

        },
        success: function (data) {


            let val;

            let dt = JSON.stringify(data);
            let response = jQuery.parseJSON(dt);

            let like_val;
            let post;
            if (response.count === 0) {
                document.getElementById("search").innerHTML = "";

                val = "<h1> Aucun élément trouvé";
                document.getElementById("search").innerHTML += val;

                $('#prodsec').fadeIn();

            } else {
                document.getElementById("search").innerHTML = "";


                let results = response.results;

                let adr = "http://127.0.0.1:8000/";

                for (let i = 0; i < results.length; i++) {
                    post = results[i];



                    document.getElementById("search").innerHTML +="" +
                        "<div onclick='+userProf("+post.id+")' class=\"grid-inner\" style=\"padding: 5px 5px 0px 5px;\">\n" +
                        "    <div class=\"media\">\n" +
                        "        <a class=\"mr-3 \" href=\"#\">\n" +
                        "            <img class=\"fa fa-user-circle\" aria-hidden=\"true\" style=\" width:40px; height:40px;position: absolute margin-left: -5px\" src='"+adr+post.picture+"'/>\n" +
                        "        </a>\n" +
                        "        <div style='margin-left:-4px; margin-top: 6px' class=\"media-body\">\n" +
                        "            <h5  class=\"mt-0\">"+post.first_name+" "+post.last_name+"</h5>\n" +
                        "        </div>\n" +
                        "    </div>\n";

                    $('#search').fadeIn();

                }

            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}






