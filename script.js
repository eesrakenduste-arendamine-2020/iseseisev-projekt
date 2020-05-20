$(document).ready(function() {


    // Modal js
    $(document).on('click', '.js-add-new', function() {
        $('.addNewBookModal').css('display', 'flex');
    });

    $(document).on('click', '.dialogBox__closeIcon', function() {
        $('.addNewBookModal').hide();
    });



});