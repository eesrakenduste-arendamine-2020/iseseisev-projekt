$(document).ready(function() {

    // Modal js
    $(document).on('click', '.js-add-new', function() {
        $('.addNewBookModal').css('display', 'flex');
    });

    $(document).on('click', '.dialogBox__closeIcon', function() {
        $('.addNewBookModal').hide();
    });

    $.validator.addMethod("comparison", function (done, element) {
        var total = parseFloat($('[name="pages_total"]').val());
        return this.optional(element) || parseFloat(done) <= total;
    });

    // Jquery validation
    $('[name="book_form"]').validate({
        rules: {
            title: {
                required: true,
            },
            author: {
                required: true
            },
            year: {
                 number: true
            },
            pages_total: {
                required: true,
                number: true
            },
            pages_finished: {
                number: true,
                comparison: true
            },
            rating: {
                number: true,
                range: [1, 10]
            },



        },
        messages: {
            title: "Palun sisesta pealkiri",
            author: "Palun sisesta autor",
            year: "Palun sisesta numbriline väärtus",
            pages_total: {
                required: "Palun sisesta lehekülgede number",
                number: "Palun sisesta numbriline väärtus"
            },
            pages_finished: {
                number: "Palun sisesta numbriline väärtus",
                comparison: "Loetud arv ei saa olla suurem koguarvust"
            },
            rating: {
                number: "Palun sisesta numbriline väärtus",
                range: "Palun sisesta number vahemikus 1 kuni 10"
            },

        },
        errorPlacement: function(error, element) {
            // If input name is "title", then error is appended to a class named "error-title"
            // This system applies to all input elements stated in rules
            error.appendTo( $('.error-' + element.attr("name")));
        }
    });


});