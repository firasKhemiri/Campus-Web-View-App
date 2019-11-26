function getProfile() {

    $.ajax({
        url: "http://localhost:8000/api/profile/",
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


            let val;

            let dt = JSON.stringify(data);
            let response = jQuery.parseJSON(dt);

            res = response[0];


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

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}
