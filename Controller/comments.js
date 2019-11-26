function userProf(id) {
    window.localStorage.setItem("user_id",id);
    window.location.href="userprof.html";
}

function getPostComments(id) {

    $.ajax({
        url: "http://localhost:8000/api/post/"+id+"/comments",
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
            let comment;
            if (response.count === 0) {
                document.getElementById("comments").innerHTML = "";

                val = "<h1> Aucun élément trouvé";
                document.getElementById("comments").innerHTML += val;

                $('#comments').fadeIn();

            } else {
                document.getElementById("comments").innerHTML = "";


                let results = response.results;

                let adr = "http://127.0.0.1:8000/";

                for (let i = 0; i < results.length; i++) {
                    comment = results[i];


                    document.getElementById("comments").innerHTML += "" +
                        "<div class=\"grid-inner\" style=\"padding: 5px 5px 0px 45px;\">\n" +
                        "        <div class=\"media\">\n" +
                        "            <a class=\"mr-3\" href=\"#\">\n" +
                        "                <img class=\"avatar\" style=\"margin-left: -35px\" src='"+adr+comment.owner.picture+"'/>" +
                        "            </a>\n" +
                        "            <div class=\"media-body\" style='margin-left: -10px;margin-top: 3px'>\n" +
                        "                <h5 class=\"mt-0\">"+comment.owner.first_name+" "+comment.owner.last_name+"</h5>\n" +
                        "                <p style=\"margin-top: -12px ; margin-bottom: 0px\">"+comment.comment+"</p>\n" +
                        "\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "\n" +
                        "\n" +
                        "    </div>"

                    $('#comments').fadeIn();

                }

            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });


}



