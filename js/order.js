$(document).on('click', '.orderLink', function() {
    $('#orderModal').modal('toggle');
});
$(document).on('click', '.removeLink', function() {
    var domain = $(this).closest('td').prev('td').text();
    console.log(domain);
    $("li[data-domain='" + domain + "']").find(".btn").html("<i class='fas fa-shopping-cart'></i> Tillgänglig");
    $(this).closest("tr").remove();
    $("#orderItems").trigger('update');
});


$(document).on('click', '.available', function() {

    if ($(this).find(".fa-check").length) {
        return false;
    }

    $(this).html("<i class='fas fa-check'></i> Tilllagd")
    var domain = $(this).closest("li").attr("data-domain");
    $('#orderItems').append("<tr><td class='orderItem'>" + domain + "</td><td class='w-25 text-right'><a href='#' class='text-danger removeLink'>Ta bort</a></td></tr>");
    $("#orderItems").trigger('update');
});




$(document).on('submit', '#orderForm', function(event) {

    $(".orderItem").each(function(index) {

        $("#orderForm").append('<input name="products[]" type="hidden" value=' + $(this).text() + '>')

    });


});



$(document).on('update', '#orderItems', function(event) {


    console.log("updated");


    if ($("#orderItems").children().length === 0) {

        $('#orderItems').hide();
        $('#orderForm').slideUp();
        $('#noItems').show();

    } else {


        $('#orderItems').show();
        $('#orderForm').show();
        $('#noItems').hide();

    }


});