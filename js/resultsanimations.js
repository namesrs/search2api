function hideResultsanimation() {

    if ($('.loadingIndicator').hasClass('zoomOut')) {
        $('.loadingIndicator').removeClass('animated zoomOut');
    }
    if ($('.searchResults').hasClass('animated')) {
        $('#domainList').addClass('animated fadeOut');
        setTimeout(function() {

            $('#domainList').html("");

        }, 1100);
        $('.searchResults').removeClass('animated fadeIn');
        $('.searchResults').addClass('animated fadeOut').css('visibility', 'hidden');

    }

}

function showResultsanimation() {

    if ($('.searchResults').hasClass('fadeOut')) {
        $('.searchResults').removeClass('animated fadeOut');
        $('#domainList').removeClass('animated fadeOut');
    }

    $('.loadingIndicator').addClass('animated zoomOut');
    $('.loadingIndicator').css("visibility", "hidden");
    $('.searchResults').css('visibility', 'visible').addClass('animated fadeIn');
    clearInterval(checkIfStartedLoading);

}