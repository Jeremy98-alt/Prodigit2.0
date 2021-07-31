(function(){

    $(".btn-primary").on("click", function () {
        var email = $("#exampleInputEmail1").val();
        var password = $("#exampleInputPassword1").val();

        var api = "https://u4s9rz700f.execute-api.us-east-1.amazonaws.com/Dev/users"; // inserting the AWS url dev api

        var params = {
            "email": email,
            "password": password
        };

        var xhttp = new XMLHttpRequest(); // open and handle the request to API Gateway
        
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert(xhttp.responseText);
            }
        };

        xhttp.open("POST", api, false);

        var response = xhttp.send(JSON.stringify(params));
        console.log(response);

        window.location.replace("./pages/userPage.html");
    });

    /*$(".btn-primary").on("submit", function(e) {
        e.preventDefault();
        const newLocal = 'insert here the url dev api';
        $.ajax({
            type: 'POST',
            url: newLocal,
            cache: false,
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response)
                $(location).attr('href','./pages/userPage.html')
            },
            error: function (){
                console.log(XMLHttpRequest);
            }
        });    
    });*/

})();