//Whois Function
$(document).on('click', '.unavailable', function() {
    var domain = $(this).parent().attr('data-domain');
    getwhois(domain);
});

function getwhois(domain) {

    var url = "api.php?action=whois&domain=" + domain;
    $("#whoisTitle").html("Whois - <span class='text-primary'>" + domain + "</span>");
    $(".whoisData").html('Loading...');
    $('#myModal').modal('toggle');
    $.get(url, function(data) {
        data = JSON.parse(data);
        $(".whoisData").html(data);
    });


}