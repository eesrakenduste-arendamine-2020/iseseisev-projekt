<?php?>
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raamaturiiul</title>

    <script
    src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js" integrity="sha256-sPB0F50YUDK0otDnsfNHawYmA5M0pjjUf4TvRJkGFrI=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>


<!-- HEADER 1 -->
<div class="main-flex header pink">
    <div class="aside"></div>

    <div class="basis-1080">

        <div class="flex-row header-row"> 

            <div class="padding-left-10"><a class="link" href="index.php">Raamatukogu</a></div>
            <div class="padding-left-10 btn-add-book js-add-new">LISA RAAMAT</div>

            <div class="aside"></div>

        </div>

    </div>

    <div class="aside"></div>
</div><!--.header-->

<!-- HEADER 2 -->
<div class="main-flex header white">
    <div class="aside"></div>

    <div class="basis-1080">

        <div class="flex-row header-row"> 

            <div class="padding-left-10">Lugemisprogress</div>

            <div class="aside"></div>

        </div>

    </div>

    <div class="aside"></div>
</div><!--.header-->

<div class="clearfix-50"></div>

<div class="main-flex">
    <div class="aside"></div>


    <div class="basis-1080 flex-row body-row">


        <div class="flex-column basis-760">

               <div class="flex-row table-row table-row-heading">
                    <div class="col__1">Kõik raamatud</div>
                </div>

                <div class="flex-row table-row font-size-12">
                    <div class="col__1">PEALKIRI</div>
                    <div class="col__2">AUTOR</div>
                    <div class="col__3">LEHEKÜLGI</div>
                    <div class="col__4">AASTA</div>
                    <div class="col__5">HIND</div>
                    <div class="col__6">LISATUD</div>
                    <div class="col__7">PROGRESS</div>
                    <div class="col__8"></div>
                </div>

                <div class="flex-row table-row font-size-14">
                    <div class="col__1">Harry potter vms</div>
                    <div class="col__2">J.K Rowling</div>
                    <div class="col__3">900</div>
                    <div class="col__4">1999</div>
                    <div class="col__5">20 €</div>
                    <div class="col__6">20.05.2020</div>
                    <div class="col__7">45 / 900</div>
                    <div class="col__8"><img src="options.png" class="col__8"></div>
                </div>




        </div><!--.flex-row.basis-760-->

        <div class="flex-column basis-360"> 

            <div class="flex-row table-row table-row-heading">
                <div class="col__1">Pooleli</div>
            </div>

            <div class="flex-row table-row font-size-12">
                <div class="col__1">PEALKIRI</div>
                <div class="col__2">VIIMATI LOETUD</div>
                <div class="col__3">PROGRESS</div>
                <div class="col__8"></div>
            </div>

            <div class="flex-row table-row font-size-14">
                <div class="col__1">Harry potter vms</div>
                <div class="col__2">21.05.2020</div>
                <div class="col__3">45 / 900</div>
                <div class="col__8"><img src="options.png" class="col__8"></div>
            </div>

        </div><!--.flex-row-->



    </div><!--.basis-1080-->



    <div class="aside"></div>
</div>

<div class="clearfix-50"></div>



<div class="addNewBookModal">
    <div class="addNewBookModal__content">

        <div class="dialogBox">
            <h1 class="dialogBox__title">Lisa uus raamat</h1>
            <div class="dialogBox__titlePadding"></div>
            <div class="dialogBox__closeIcon">
                <div class="dialogBox__close"></div>
            </div>

            <div class="dialogBox__fields">
                <form name="book_form" action="" method="POST" class="dialogBox__form">

                    <div class="error-title"></div>
                    <div class="inputBox">
                        <input name="title" placeholder="Pealkiri" class="inputBox__input" type="text">
                    </div>

                    <div class="error-author"></div>
                    <div class="inputBox">
                        <input name="author" placeholder="Autor" class="inputBox__input" type="text">
                    </div>

                    <div class="error-year"></div>
                    <div class="inputBox">
                        <input name="year" placeholder="Aasta" class="inputBox__input" type="text">
                    </div>

                    <div class="error-pages_total"></div>
                    <div class="inputBox">
                        <input name="pages_total" placeholder="Lehekülgede arv kokku" class="inputBox__input" type="text">
                    </div>

                    <div class="error-pages_finished"></div>
                    <div class="inputBox">
                        <input name="pages_finished" placeholder="Lehekülgede arv loetud" class="inputBox__input" type="text">
                    </div>


                    <div class="error-rating"></div>
                    <div class="inputBox">
                        <input name="rating" placeholder="Hinnang (1-10)" class="inputBox__input" type="text">
                    </div>



                    <button class="submitBox" type="submit">
                        <div class="submitBox__content">Lisa</div>
                    </button>

                </form><!--.dialogBox__form-->

            </div><!--.dialogBox__fields-->
        </div><!--.dialogBox-->

    </div><!--.addNewBookModal__content-->
</div><!--.addNewBookModal-->




<script src="script.js"></script>
</body>
</html>