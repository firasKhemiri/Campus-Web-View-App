function eventMain(id) {
    window.localStorage.setItem("event_id",id);
    window.location.href="event.html";
}

function getAllEvents() {

    $.ajax({
        url: "http://localhost:8000/api/feed/events/",
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
                document.getElementById("prodsec").innerHTML = "";

                val = "<h1> Aucun élément trouvé";
                document.getElementById("prodsec").innerHTML += val;

                $('#prodsec').fadeIn();

            } else {

                let results = response.results;

                let adr = "http://127.0.0.1:8000/";

                for (let i = 0; i < results.length; i++) {
                    post = results[i];

                    if (post.is_liked) {
                        like_val = "<li><a><i id='like" + post.id + "' class=\"fa fa-thumbs-up\" onclick=+unlikeArticle("+post.id+","+post.num_likes+")></i></a></li>\n"
                    } else {
                        like_val = "<li><a><i id='like" + post.id + "' class=\"fa fa-thumbs-down\" onclick=+likeArticle("+post.id+","+post.num_likes+")></i></a></li>\n"
                    }



                    document.getElementById("events").innerHTML +="" +
                        "                    <div class=\"demo-card demo-card--step1\" onclick='+eventMain("+post.id+")'>\n" +
                        "                        <div class=\"head\">\n" +
                        "                            <div class=\"number-box\">\n" +
                        "                                <span>01</span>\n" +
                        "                            </div>\n" +
                        "                            <h3><span class=\"small\">2015</span>"+post.name+"</h3>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"body\">\n" +
                        // "                            <p>"+post.description+"</p>\n" +
                        "                            <img src="+adr+post.picture_url+" alt=\"infinitude\" class=\"img-fluid\">\n" +
                        "                        </div>\n" +
                        "                    </div>"

                }

            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}





function participate(id,participants) {


    $.ajax({
        url: "http://localhost:8000/api/participate/",
        type: "POST",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
        },
        data: {event_id: id,},
        complete: function () {

        },
        success: function () {

            participants+=1;
            document.getElementById("num_like" + id).innerHTML = likes +" Likes";

            document.getElementById("like" + id).className = "fa fa-thumbs-up";
            document.getElementById("like" + id).onclick =  function() { unlikeArticle(id,likes); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}





function unparticpate(id,participants) {

    $.ajax({
        url: "http://localhost:8000/api/unparticipate/",
        type: "PATCH",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
        },

        data: {event_id: id,},

        complete: function () {

        },
        success: function () {


            participants-=1;
            document.getElementById("num_like" + id).innerHTML = likes +" Likes";
            document.getElementById("like" + id).className = "fa fa-thumbs-down";
            document.getElementById("like" + id).onclick =  function() { likeArticle(id,likes); }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });


}



