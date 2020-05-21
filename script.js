let activeId;
$(document).ready(function() {


    initJqueryValidation('[name="book_form"]');

    initJqueryValidation('[name="edit_form"]');

    // Add modal opens
    $(document).on('click', '.js-add-new', function() {
        $('.js-add-modal').css('display', 'flex');
    });

    // Edit modal opens
    $(document).on('click', '.js-edit', function() {
        readFields($(this).data('id'));
        $('.js-edit-modal').css('display', 'flex');
        activeId = $(this).data('id');
    });

    // Hide both modals
    $(document).on('click', '.js-close-add', function() {
        $('.js-add-modal').hide();
    });

   $(document).on('click', '.js-close-edit', function() {
        $('.js-edit-modal').hide();
         cleanModalFields();
    });


    // Submission action
    $(document).on('submit', '[name="book_form"]', function(e) {
        e.preventDefault();
        createNewListItem();
        $('.js-add-modal').hide();
    });

    // Edit book
    $(document).on('submit', '[name="edit_form"]', function(e) {
        e.preventDefault();
        editListItem($(this));
        $('.js-edit-modal').hide();
    });

    // Delete book
    $(document).on('click', '.js-delete', function(e) {
        e.preventDefault();
        deleteBook($(this));
        $('.js-edit-modal').hide();
    });

});




// FE functions
function createNewListItem() {
    // clone
    let newCopy = $( '.book-copy' ).clone(true, true).removeClass('book-copy').hide().prependTo( '.js-wrap' ).slideDown("fast");
    // values
    let title = $('[name="book_form"] > [name="title"]').val();
    let author = $('[name="book_form"] > [name="author"]').val();
    let year = defaultToZero($('[name="book_form"] > [name="year"]').val());
    let pages_total = defaultToZero($('[name="book_form"] > [name="pages_total"]').val());
    let pages_finished = defaultToZero($('[name="book_form"] > [name="pages_finished"]').val());
    let rating = defaultToZero($('[name="book_form"] > [name="rating"]').val());
    let date_added = moment().format('DD.MM.YYYY');

    $(newCopy).children('.col__1').text(title);
    $(newCopy).children('.col__2').text(author);
    $(newCopy).children('.col__3').text(pages_total);
    $(newCopy).children('.col__4').text(year);
    $(newCopy).children('.col__6').text(date_added);
    $(newCopy).children('.col__7').text(pages_finished + " / " + pages_total);

    cleanModalFields();
    addNewToFile(title, author, year, pages_total, pages_finished, rating, date_added, $(newCopy));
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

function deleteBook() {
    let url = 'delete.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: { 'id': activeId }
    }).done(function(response) {
        console.log(response);
        let tableObj = $('[data-id="' + activeId + '"]').parent('.table-row');
        $(tableObj).effect("highlight", {color: '#f05d5d'}, 600);
        $(tableObj).slideUp(800, function() { $(tableObj).remove();});
    });
}


// database functions

// ADD
function addNewToFile(title, author, year, pages_total, pages_finished, rating, date_added, bookObject) {
    let fileData = {
        'title': title,
        'author': author, 
        'year': year,
        'pages_total': pages_total,
        'pages_finished': pages_finished,
        'rating': rating,
        'date_added': date_added
    }

    let url = 'create.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: fileData
    }).done(function(response) {
        console.log(response);
        $(bookObject).children('.col__8').attr('data-id', response);
    });
}


// READ
function readFields(taskId) {
    var fileData; 
    $.getJSON('read.php', { 'task_id': taskId, }, function(jsonData) {
        fileData = jsonData;
        if (fileData) {
            $('[name="title"]').val(fileData['title']);
            $('[name="author"]').val(fileData['author']);
            $('[name="year"]').val(fileData['year']);
            $('[name="pages_total"]').val(fileData['pages_total']);
            $('[name="pages_finished"]').val(fileData['pages_finished']);
            $('[name="rating"]').val(fileData['rating']);

        } 
    }); 
}


// UPDATE
function editListItem() {
    let title = $('[name="edit_form"]').find('[name="title"]').val();
    let author = $('[name="edit_form"]').find('[name="author"]').val();
    let year = $('[name="edit_form"]').find('[name="year"]').val();
    let pages_total = defaultToZero($('[name="edit_form"]').find('[name="pages_total"]').val());
    let pages_finished = defaultToZero($('[name="edit_form"]').find('[name="pages_finished"]').val());
    let rating = defaultToZero($('[name="edit_form"]').find('[name="rating"]').val());

    let fileData = {
        'title': title,
        'author': author, 
        'year': year,
        'pages_total': pages_total,
        'pages_finished': pages_finished,
        'rating': rating,
        'id': activeId
    }

    let url = 'update.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: fileData
    }).done(function(response) {
        console.log(response);
        let tableObj = $('[data-id="' + activeId + '"]').parent('.table-row');
        $(tableObj).find('.col__1').text(title);
        $(tableObj).find('.col__2').text(author);
        $(tableObj).find('.col__4').text(year);
        $(tableObj).find('.col__3').text(pages_total);
        $(tableObj).find('.col__7').text(pages_finished + ' / ' + pages_total);
    });



}


// Validation
function initJqueryValidation(formName) {
    $.validator.addMethod("comparison", function (done, element) {
        var total = parseFloat($(element).parents('.dialogBox__form').find('[name="pages_total"]').val());
        return this.optional(element) || parseFloat(done) <= total;
    });

    $(formName).validate({
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
            error.appendTo( $(formName + ' > .error-' + element.attr("name")));
        }
    });
}

