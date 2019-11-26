function getEvent(id) {

    $.ajax({
        url: "http://localhost:8000/api/event/"+id+"/",
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

            res = response;


            if (res.picture_url==="")
            {
                $('#image').attr('src',"http://lorempixel.com/850/280/nature/4/");
            }else
                $('#image').attr('src',"http://localhost:8000/"+res.picture_url+"/");

            $('#name').html(res.name);
            $('#desc').html(res.description);
            $('#location').html(res.location);
            $('#particpants').html(res.particip_count+" participants");


            if (res.is_participated)
            {
                $('#is_particip').attr("class","btn-danger");
                $('#is_particip').attr("value","Unparticipate");
                // $('#follow').attr('style','"margin-left: 16px"; height="28"; width="38"');
                document.getElementById("is_particip").onclick =  function() { unparticip(id,res.particip_count); }
            }
            else
            {
                $('#is_particip').attr("class","btn-info");
                $('#is_particip').attr("value","Participate");
                document.getElementById("is_particip").onclick =  function() { particip(id,res.particip_count); }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}



function particip(id,particips) {


    $.ajax({
        url: "http://localhost:8000/api/participate/",
        type: "POST",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem("token"));
        },
        data: {event_id: id,},
        complete: function () {

        },
        success: function () {

            particips += 1;
            $('#is_particip').attr("class","btn-danger");
            $('#is_particip').attr("value","Unarticipate");
            $('#particpants').html(particips+" participants");
            document.getElementById("is_particip").onclick = function () {
                unparticip(id, followers);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function unparticip(id,particips) {

    $.ajax({
        url: "http://localhost:8000/api/unparticipate/",
        type: "POST",
        dataType: 'json',

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+window.localStorage.getItem("token"));
        },
        data: {event_id: id,},
        complete: function () {

        },
        success: function () {

            particips-=1;
            $('#is_particip').attr("class","btn-info");
            $('#is_particip').attr("value","Participate");
            $('#particpants').html(particips+" participants");
            document.getElementById("is_particip").onclick =  function() { particip(id,particips); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}
