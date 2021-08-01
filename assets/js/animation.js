(function(){

    $(".btn-primary").on("click", function () {
        
        if($('.btn-primary').text() == "Submit") { // check if it means to register or log-in in the userPage
            var email = $("#exampleInputEmail1").val();
            var password = $("#exampleInputPassword1").val();
        } else {
            var email = $("#exampleInputEmail2").val();
            var password = $("#exampleInputPassword2").val();
        }

        var data = {
            email : email,
            password : password
        };
  
        $.ajax({
            type: "POST",
            url : "https://07jol9qqrc.execute-api.us-east-1.amazonaws.com/Dev/users",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),

            success: function (e) {
                // clear form and show a success message
                alert(e);
                document.getElementById("resizedForm").reset();
                location.reload();
            },
            
            error: function () {
                // show an error message
                alert("UnSuccessfull");
        }});
        
/* 
        var api = "https://hfdu6t80jj.execute-api.us-east-1.amazonaws.com/Dev/users"; // inserting the AWS url dev api

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
        console.log(response); */
    });

    $("#addUser").on("click", function () {
        var form_present_or_not = $("#toremove");
        if(!form_present_or_not.length) // if it is not present add the register form
        {
            var addRegistered_form =  "<div id ='toremove'>" + "<br>" + "<div class='mb-3'>" + 
                                        "<label for='exampleInputEmail2' class='form-label'>Register your email address</label>" +
                                        "<input type='email' class='form-control' id='exampleInputEmail2' aria-describedby='emailHelp'>" +
                                      "</div>" +

                                      "<div class='mb-3'>" +
                                        "<label for='exampleInputPassword2' class='form-label'>Insert your password</label>" +
                                        "<input type='password' class='form-control' id='exampleInputPassword2'>" +
                                      "</div>" + "</div>"
        
            $(addRegistered_form).insertAfter(this);

            $(".btn-primary").html("Register");
        } else {
            $("#toremove").remove();
            $(".btn-primary").html("Submit");
        }
    });

})();