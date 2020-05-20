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
                 required: true,
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
            year: {
                 required: "Palun sisesta aasta",
                 number: "Palun sisesta numbriline väärtus"
            },
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


    // Submission action
    $(document).on('submit', '.dialogBox__form', function(e) {
        e.preventDefault();
        createNewListItem();
        $('.addNewBookModal').hide();
    });

});




// FE functions
function createNewListItem() {
    // clone
    let newCopy = $( '.book-copy' ).clone(true, true).removeClass('book-copy').hide().prependTo( '.js-wrap' ).slideDown("fast");
    // values
    let title = $('[name="title"]').val();
    let author = $('[name="author"]').val();
    let year = defaultToZero($('[name="year"]').val());
    let pages_total = defaultToZero($('[name="pages_total"]').val());
    let pages_finished = defaultToZero($('[name="pages_finished"]').val());
    let rating = defaultToZero($('[name="rating"]').val());

    $(newCopy).children('.col__1').text(title);
    $(newCopy).children('.col__2').text(author);
    $(newCopy).children('.col__3').text(pages_total);
    $(newCopy).children('.col__4').text(year);
    $(newCopy).children('.col__6').text(moment().format('DD.MM.YYYY'));
    $(newCopy).children('.col__7').text(pages_finished + " / " + pages_total);

    cleanModalFields();
    addNewToFile(title, author, year, pages_total, pages_finished, rating, $(newCopy));
}

function defaultToZero(value) {
    if (!value) {
        return 0;
    }
    return parseFloat(value);
}



function cleanModalFields(){
    $('.inputBox > input').val('');

}


// database functions
function addNewToFile(title, author, year, pages_total, pages_finished, rating, bookObject) {
        let fileData = {
        'title': title,
        'author': author, 
        'year': year,
        'pages_total': pages_total,
        'pages_finished': pages_finished,
        'rating': rating
    }

    let url = 'add.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: fileData
    }).done(function(response) {
        $(bookObject).children('.col__8').attr('data-id', response);
    });
}