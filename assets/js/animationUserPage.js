(function(){

    function sessionNameUser(){ /* Return the Session Name User*/
        if(sessionStorage.getItem('email')){
            $('.mainMenu > .mb-3').append("Welcome " + sessionStorage.getItem('email'));
        } else {
            $('.mainMenu > .mb-3').append('Should log-in...');
        }
    }

    function updateAvailableReservations(){ /* Updating the reservation menu for userPage */
        $.ajax({
            type: "GET",
            url : "https://4qzffwg640.execute-api.us-east-1.amazonaws.com/Dev/users",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",

            success: function (e) {
                // clear form and show a success message
                var responseParsed = $.parseJSON(e);
                
                for(var i = 0; i < responseParsed.length; ++i){
                    var row = "<tr>" + 
                                "<th scope='row'>" + responseParsed[i].course + "</th>" +
                                "<td>" + responseParsed[i].building + "</td>" +
                                "<td>" + responseParsed[i].room + "</td>" +
                                "<td>" + responseParsed[i].typeReservation + "</td>" +
                                "<td>" + responseParsed[i].seatsAvailable + "</td>" +
                              "</tr>"; 

                    $(".mainMenu > .table > tbody").append(row);  
                }
                
            },
            
            error: function () {
                // show an error message
                alert("UnSuccessfull Loading Reservations");
        }});
    }

    function showReservationsBooked(){ /* Show all reservations by a particular user */
        $.ajax({
            type: "GET",
            url : "https://4qzffwg640.execute-api.us-east-1.amazonaws.com/Dev/users",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",

            success: function (e) {
                // clear form and show a success message
                var responseParsed = $.parseJSON(e);
                
                for(var i = 0; i < responseParsed.length; ++i){
                    var row = "<tr>" + 
                                "<th scope='row'>" + responseParsed[i].course + "</th>" +
                                "<td>" + responseParsed[i].building + "</td>" +
                                "<td>" + responseParsed[i].room + "</td>" +
                                "<td>" + responseParsed[i].typeReservation + "</td>" +
                                "<td>" + responseParsed[i].seatsAvailable + "</td>" +
                              "</tr>"; 

                    $(".mainMenu > .table > tbody").append(row);  
                }
                
            },
            
            error: function () {
                // show an error message
                alert("UnSuccessfull Loading Reservation Booked");
        }});
    }

    $(document).ready(function(){
        sessionNameUser(); /* adjust the welcome step */
        updateAvailableReservations(); /* Updating the reservation menu for userPage */
        showReservationsBooked(); /* Show all reservations by a particular user */
    });

    // log-out functionality
    $(".nav-link").on("click", function(){
        sessionStorage.removeItem('email');

        var url = "https://s3.amazonaws.com/prodigit2.0/index.html";
        $(location).attr('href',url);
    });

    $(".btn-outline-secondary").on("click", function(){
        // get item values to insert in DynamoDB proper table
        var inTime = $(".inTime").children("option:selected").val();
        var outTime = $(".inTime").children("option:selected").val();
        var course = $(".form-control").val();

        var data = {
            'inTime': inTime,
            'outTime': outTime,
            'course': course
        };

        $.ajax({
            type: "POST",
            url : "https://4qzffwg640.execute-api.us-east-1.amazonaws.com/Dev/users",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),

            success: function () {
                // clear form and show a success message
                alert("Reserved a seat");
                $(location).reload();
            },
            
            error: function () {
                // show an error message
                alert("UnSuccessfull Reservation");
        }});
    }); 

})();