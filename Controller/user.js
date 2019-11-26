function getUserProfile(id) {

    $.ajax({
        url: "http://localhost:8000/api/user/"+id+"/",
        type: "GET",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
            // let i = 0;
            // alert(( window.localStorage.getItem("token")));
        },
        complete: function () {

        },
        success: function (data) {

            let dt = JSON.stringify(data);
            let response = jQuery.parseJSON(dt);

            res = response;


            $('#photoprof').attr("src","http://localhost:8000/"+res.picture);

            if (res.cover_picture==="")
            {
                $('#coverpic').attr('style','background: url("http://lorempixel.com/850/280/nature/4/")');
            }else
                $('#coverpic').attr('style','background: url("http://localhost:8000/'+res.cover_picture+'")');

            $('#name').html(res.first_name+" "+res.last_name);
            $('#bio').html(res.bio);
            $('#followers').html(res.followers.length+" followers");
            $('#following').html(res.following.length+" following");

            if (res.followers.length>0)
                $('#followers').attr('href','www.google.com');
            if (res.following.length>0)
                $('#following').attr('href','www.google.com');


            if (res.ifollow)
            {
                $('#follow').attr("src","images/unfollow.png");

                // $('#follow').attr('style','"margin-left: 16px"; height="28"; width="38"');
                document.getElementById("follow").onclick =  function() { unfollow(id,res.followers.length); }
            }
            else
            {
                $('#follow').attr("src","images/follow.png");
                document.getElementById("follow").onclick =  function() { follow(id,res.followers.length); }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}




function follow(id,followers) {


    $.ajax({
        url: "http://localhost:8000/api/follow/",
        type: "PUT",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem("token"));
        },
        data: {user_id: id,},
        complete: function () {

        },
        success: function () {

            followers += 1;

            $('#follow').attr("src", "images/unfollow.png");
            // $('#follow').attr('style','"margin-left: 16px"; height="28"; width="38"');

            $('#followers').html(followers+" followers");
            document.getElementById("follow").onclick = function () {
                unfollow(id, followers);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function unfollow(id,followers) {

    $.ajax({
        url: "http://localhost:8000/api/unfollow/",
        type: "PUT",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
        },
        data: {user_id: id,},
        complete: function () {

        },
        success: function () {

            followers-=1;
            $('#follow').attr("src","images/follow.png");
            $('#followers').html(followers+" followers");
            document.getElementById("follow").onclick =  function() { follow(id,followers); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}


