(function(){

    $(document).ready(function(){
        if(sessionStorage.getItem('email')){
            $('.mainMenu > .mb-3').append("Welcome " + sessionStorage.getItem('email'));
        } else {
            $('.mainMenu > .mb-3').append('Should log-in...');
        }
    })

    $(".nav-link").on("click", function(){
        sessionStorage.removeItem('email');

        var url = "https://s3.amazonaws.com/prodigit2.0/index.html";
        $(location).attr('href',url);
    })

})();