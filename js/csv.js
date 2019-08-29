//CSV Functions
$(document).on('click', '.advancedSettings', function() {
    $('#advancedSettings').modal('toggle');
});
$(document).on('click', '.csv-button', function() {
    downloadCSV();
});
//Enable Download CSV Button when all data has been received
function finishedLoading() {

    if ($('button > .fa-spin').length) {

    } else {
        $('.csv-button').removeAttr("disabled");
        console.log("Färdigladdad");
        clearInterval(EnableCSVIfLoadFinished);
    }



}



//Function to create and download CSV

function downloadCSV() {
    var csvstring = '';
    csvstring = csvstring.concat('Domain;TLD;Status\r\n');
    $("#domainList > li").each(function(index) {

        csvstring = csvstring.concat($(this).attr('data-domain') + ';');
        csvstring = csvstring.concat($(this).attr('data-tld') + ';');
        csvstring = csvstring.concat($(this).attr('data-status') + '\r\n');


    });


    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvstring);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'results.csv';
    hiddenElement.click();


}