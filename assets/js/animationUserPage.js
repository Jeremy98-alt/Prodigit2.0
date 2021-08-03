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
            url : "https://euwujov5gc.execute-api.us-east-1.amazonaws.com/Dev/bookingseats",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",

            success: function (e) {
                // clear form and show a success message
                for(var key in e){
                    var row = "<tr>" + 
                                "<th scope='row'>" + e[key].course + "</th>" +
                                "<td>" + e[key].building + "</td>" +
                                "<td>" + e[key].room + "</td>" +
                                "<td>" + e[key].typeReservation + "</td>" +
                                "<td>" + e[key].seatsAvailable + "</td>" +
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
        var data = {
            email: sessionStorage.getItem('email')
        }
        
        $.ajax({
            type: "POST",
            url : "https://euwujov5gc.execute-api.us-east-1.amazonaws.com/Dev/reservations",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),

            success: function (e) {
                // clear form and show a success message                
                if(e != "user doesn't book anything"){
                    for(var key in e){
                        var row = "<tr>" + 
                                    "<th scope='row'>" + e[key].email + "</th>" +
                                    "<td>" + e[key].course + "</td>" +
                                    "<td>" + e[key].room + "</td>" +
                                    "<td>" + e[key].building + "</td>" +
                                    "<td>" + e[key].date + "</td>" +
                                    "<td>" + e[key].time + "</td>" +
                                    "<td><a href='removeSeat'>Dismiss</a></td>" +
                                  "</tr>"; 
    
                        $(".Booked > .table > tbody").append(row);  
                    }
                } else {
                    var row = "<tr>" + 
                                "<th scope='row' colspan='7' style='text-align:center'>No Booked Seat</th>" +
                              "</tr>"; 

                    $(".Booked > .table > tbody").append(row);  
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
        var outTime = $(".outTime").children("option:selected").val();
        var course = $(".form-control").val();

        var data = {
            'email': sessionStorage.getItem('email'),
            'inTime': inTime,
            'outTime': outTime,
            'course': course
        };

        $.ajax({
            type: "POST",
            url : "https://euwujov5gc.execute-api.us-east-1.amazonaws.com/Dev/reservations",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),

            success: function () {
                // clear form and show a success message
                alert("Reserved a seat");
                location.reload();
            },
            
            error: function () {
                // show an error message
                alert("UnSuccessfull Reservation");
        }});
    }); 

})();