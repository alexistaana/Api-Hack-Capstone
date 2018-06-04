$(document).ready(function () {
    let bckgroundCounter = 2;

    function changeBackground(index) {
        document.getElementById("overlay").style.backgroundImage = `linear-gradient(rgba(26,26,26,0.7), rgba(26,26,26,0.7)), url(img/img${index}.jpg)`;
    }

    function showSubmit() {
        $('#input-form-two').on("keyup", function (e) {
            let formOne = document.getElementById('input-form-one').value;
            let formTwo = document.getElementById('input-form-two').value;

            let canSubmit = false;

            if (formTwo.length >= 1 && formOne.length >= 1) {
                canSubmit = true;
            }

            if (canSubmit) {
                $('#searchButton').show(1500);
                $('#searchButton').attr('disabled', false);
            }
            else {
                $('#searchButton').attr('disabled', true);
            }
        })
    }

    function searchAgainHover() {
        $('#searchAgainBtn').hover(function (e) {
            document.getElementById('searchAgainBtn').innerText = "YEA!";
        })

        $('#searchAgainBtn').mouseleave(function (e) {
            document.getElementById('searchAgainBtn').innerText = "AGAIN?"
        })
    }

    function searchAgain() {
        $('#searchAgainBtn').click(function (e) {
            $('#resultsArea').hide(3000);
            $('#searchBox').show(1500);
            $('#logoHeader').show(1500);
        })
    }


    setInterval(function () {
        changeBackground(bckgroundCounter);

        bckgroundCounter++;
        if (bckgroundCounter === 5) {
            bckgroundCounter = 1;
        }
    }
        , 15000);


    $('#overlay').on('webkitAnimationEnd', function (e) {
        $(this).addClass('visible');
    });


    function init() {
        $(showSubmit);
        $(searchAgainHover);
        $(searchAgain);
    }

    $(init);


});