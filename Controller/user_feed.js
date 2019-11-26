function getAllArticles(link) {

    $.ajax({
        url: "http://localhost:8000/api/"+link,
        type: "GET",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer sFkGRPt5mI1zz5vUnU5w5w56yNGoPS');
            // let i = 0;
            // alert(( window.localStorage.getItem("token")));
        },
        complete: function () {

        },
        success: function (data) {


            let val;

            let dt = JSON.stringify(data);
            let response = jQuery.parseJSON(dt);

            // alert(response.count);

            let like_val;
            let post;
            if (response.count === 0) {
                document.getElementById("prodsec").innerHTML = "";

                val = "<h1> Aucun élément trouvé";
                document.getElementById("prodsec").innerHTML += val;

                $('#prodsec').fadeIn();

            } else {
                document.getElementById("prodsec").innerHTML = "";


                let results = response.results;

                let adr = "http://127.0.0.1:8000/";

                for (let i = 0; i < results.length; i++) {
                    post = results[i];

                    if (post.is_liked) {
                        like_val = "<li><a><i id='like" + post.id + "' class=\"fa fa-thumbs-up\" onclick=+unlikeArticle("+post.id+","+post.num_likes+")></i></a></li>\n"
                    } else {
                        like_val = "<li><a><i id='like" + post.id + "' class=\"fa fa-thumbs-down\" onclick=+likeArticle("+post.id+","+post.num_likes+")></i></a></li>\n"
                    }


                    if (post.is_picture)
                    {
                        pict_val = "<img class=\"img-fluid\" style='margin-bottom: 7px' src=\"" + adr + post.picture_url + " \" alt=\"Image\">\n"
                    }

                    else
                        pict_val = "";


                    document.getElementById("prodsec").innerHTML +=

                        "<section class=\"hero\">\n" +
                        "\t\t<div class=\"container\">\n" +
                        "\t\t\t<div class=\"row\">\n" +
                        "\n" +
                        "\t\t\t\t<div class=\"col-lg-6 offset-lg-3\">\n" +
                        "\n" +
                        "\t\t\t\t\t<div class=\"cardbox shadow-lg bg-white\">\n" +
                        "\n" +
                        "\t\t\t\t\t\t<div class=\"cardbox-heading\">\n" +
                        "\t\t\t\t\t\t\t<!-- START dropdown-->\n" +
                        "\t\t\t\t\t\t\t<div class=\"dropdown float-right\">\n" +
                        "\t\t\t\t\t\t\t\t<button class=\"btn btn-flat btn-flat-icon\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
                        "\t\t\t\t\t\t\t\t\t<em class=\"fa fa-ellipsis-h\"></em>\n" +
                        "\t\t\t\t\t\t\t\t</button>\n" +
                        "\t\t\t\t\t\t\t\t<div class=\"dropdown-menu dropdown-scale dropdown-menu-right\" role=\"menu\" style=\"position: absolute; transform: translate3d(-136px, 28px, 0px); top: 0px; left: 0px; will-change: transform;\">\n" +
                        "\t\t\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">Hide post</a>\n" +
                        "\t\t\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">Stop following</a>\n" +
                        "\t\t\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">Report</a>\n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t</div><!--/ dropdown -->\n" +
                        "\t\t\t\t\t\t\t<div class=\"media m-0\">\n" +
                        "\t\t\t\t\t\t\t\t<div class=\"d-flex mr-3\">\n" +
                        "\t\t\t\t\t\t\t\t\t<a href=\"\"><img class=\"img-fluid rounded-circle\" src=\"" + adr + post.owner.picture + " \" alt=\"USER\">\n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t\t<div class=\"media-body\">\n" +
                        "\t\t\t\t\t\t\t\t\t<p class=\"m-0\">" + post.owner.first_name + " " + post.owner.last_name + "</p>\n" +
                        "\t\t\t\t\t\t\t\t\t<small><span><i class=\"icon ion-md-time\"></i> 10 hours ago</span></small>\n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t</div><!--/ media -->\n" +
                        "\t\t\t\t\t\t</div><!--/ cardbox-heading -->\n" +
                        "\n" +
                        "\t\t\t\t\t\t<div class=\"cardbox-item\">\n" +
                        "\t\t\t\t\t\t\t"+pict_val+
                        "\t\t\t\t\t\t</div><!--/ cardbox-item -->\n" +
                        "\t\t\t\t\t\t<div class=\"cardbox-item\">\n" +
                        "\t\t\t\t\t\t\t <p style='margin-left: 4% ; margin-right: 4%'>"+post.name+"</p> "+
                        "\t\t\t\t\t\t</div><!--/ cardbox-item -->\n" +
                        "\t\t\t\t\t\t<div class=\"cardbox-base\" style='margin-top: -30px'>\n" +
                        "\t\t\t\t\t\t\t<ul class=\"float-right\">\n" +
                        "\t\t\t\t\t\t\t\t<li><a><i class=\"fa fa-comments\"></i></a></li>\n" +
                        "\t\t\t\t\t\t\t\t<li><a><em class=\"mr-5\">" + post.num_comments + "</em></a></li>\n" +
                        "\t\t\t\t\t\t\t</ul>\n" +
                        "\t\t\t\t\t\t\t<ul>\n" +
                        "\t\t\t\t\t\t\t\t " + like_val +
                        "\t\t\t\t\t\t\t\t<li><a><span id='num_like" + post.id + "'>" + post.num_likes + " Likes</span></a></li>\n" +
                        "\t\t\t\t\t\t\t</ul>\n" +
                        "\t\t\t\t\t\t</div><!--/ cardbox-base -->\n" +
                        "\n" +
                        "\t\t\t\t\t</div><!--/ cardbox -->\n" +
                        "\n" +
                        "\t\t\t\t\t<!--</div>&lt;!&ndash;/ col-lg-6 &ndash;&gt;-->\n" +
                        "\t\t\t\t\t<!--<div class=\"col-lg-3\">-->\n" +
                        "\t\t\t\t\t<!--<div class=\"shadow-lg p-4 mb-2 bg-white author\">-->\n" +
                        "\t\t\t\t\t<!--<a href=\"http://www.themashabrand.com/\">Get more from themashabrand.com</a>-->\n" +
                        "\t\t\t\t\t<!--<p>Bootstrap 4.1.0</p>-->\n" +
                        "\t\t\t\t\t<!--</div>-->\n" +
                        "\t\t\t\t\t<!--</div>&lt;!&ndash;/ col-lg-3 &ndash;&gt;-->\n" +
                        "\n" +
                        "\t\t\t\t</div><!--/ row -->\n" +
                        "\t\t\t</div><!--/ container -->\n" +
                        "\t\t</div>\n" +
                        "\t</section>";

                    $('#prodsec').fadeIn();

                }

            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}











function likeArticle(id,likes) {


    $.ajax({
        url: "http://localhost:8000/api/like/",
        type: "POST",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer sFkGRPt5mI1zz5vUnU5w5w56yNGoPS');
        },
        data: {post_id: id,},
        complete: function () {

        },
        success: function () {

            likes+=1;
            document.getElementById("num_like" + id).innerHTML = likes +" Likes";

            document.getElementById("like" + id).className = "fa fa-thumbs-up";
            document.getElementById("like" + id).onclick =  function() { unlikeArticle(id,likes); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}





function unlikeArticle(id,likes) {

    $.ajax({
        url: "http://localhost:8000/api/unlike/",
        type: "PATCH",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer sFkGRPt5mI1zz5vUnU5w5w56yNGoPS');

        },

        data: {post_id: id,},

        complete: function () {

        },
        success: function () {


            likes-=1;
            document.getElementById("num_like" + id).innerHTML = likes +" Likes";
            document.getElementById("like" + id).className = "fa fa-thumbs-down";
            document.getElementById("like" + id).onclick =  function() { likeArticle(id,likes); }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}



