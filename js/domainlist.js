//Domain List Functions



//Get search input and show loading indicator
function startSearch() {

    var searchString = $("#searchInput").val();




    if (searchString.length < 3) {
        alert('Enter a domain with atleast three characters.');
        return;
    }
    $('.loadingIndicator').css('visibility', 'visible').addClass('animated fadeIn');

    setTimeout(function() {
        getDomainList(searchString);
    }, 1100);
}


//Get domain list
function getDomainList(searchstring) {
    var url = "api.php?action=domainlist&search=" + encodeURIComponent(searchstring);
    $.get(url, function(data) {
        data = JSON.parse(data);
        appendDomainList(data);
        var i, j, temparray, chunk = 20;
        for (i = 0, j = data.length; i < j; i += chunk) {
            temparray = data.slice(i, i + chunk);
            getDomainData(temparray);
        }
    });
}


//Append Domain List to HTML DOM
function appendDomainList(data) {



    for (i = 0; i < data.length; i++) {
        var html = "";
        html += "<li id='" + i + "' class='list-group-item p-0 border-top-0 border-right-0 border-left-0 checkDomain d-flex align-items-center' data-domain='" + data[i] + "'>";
        html += "<h6 class='mr-auto domain-text'>" + data[i] + "</h6>";
        html += "<button type='button' class='btn ml-auto rounded-0 w-5 border-bottom-0'><i class='fas fa-circle-notch fa-spin'></i> Laddar</button></li>";
        html += "<br>";
        $("#domainList").append(html);
    }
    EnableCSVIfLoadFinished = setInterval(finishedLoading, 1100);
}


//Check domain status

function getDomainData(data) {

    $.ajax({
        url: "api.php?action=bulksearch",
        type: "POST",
        data: {
            domainlist: data
        },
        cache: false,
        beforeSend: function(jqXHR, settings) {
            requestArray.push(jqXHR);
        },
        success: function(result) {
if (result == null) {
     return false;
}
            var result = JSON.parse(result);
	    if (typeof result.Error !== 'undefined') {
  console.log(result.Error);
var dataLength = data.length

for (i = 0; i < dataLength; i++) {
  console.log(data[i]);


                var domain = data[i];
                var tld = '';
                var status = 'invalid';
                updateDomainList(status, tld, domain);


}
  return false;
	    }	
else {

            for (var key in result.parameters) {
                var domain = key;
                var tld = result.parameters[key]['tld'];
                var status = result.parameters[key]['status'];
                updateDomainList(status, tld, domain);
            }

}
        }
    });



}



//Update Domain List with new data

function updateDomainList(status, tld, domain) {
    var elem = $("li[data-domain='" + domain + "']");
    var id = '#' + elem.attr('id');
    $(id).attr("data-tld", tld);
    $(id).attr("data-status", status);
    $(id).removeClass("checkDomain");

    if (status.indexOf("unav") !== -1) {
        $(id).find('.btn').removeClass("border-bottom-0").css("opacity", "0.3");
        $(id).find('.btn').addClass("btn-outline-dark unavailable");
        $(id).find('.btn').html("<i class='fas fa-eye'></i> Upptagen");
    } else if (status.indexOf('invalid') !== -1) {
        $(id).find('.btn').addClass("btn-danger invalid");
        $(id).find('.btn').html("<i class='fas fa-times'></i> Ogiltig");
    } else {

        if (config['enableOrder']) {

            $(id).find('.btn').addClass("btn-primary available");
            $(id).find('.btn').html("<i class='fas fa-shopping-cart'></i> Tillgänglig");

        } else {

            $(id).find('.btn').addClass("btn-primary");
            $(id).find('.btn').html("<i class='fas fa-check'></i> Tillgänglig");

        }
    }
}