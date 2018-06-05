$(document).ready(function () {
    let bckgroundCounter = 2;

    //CHANGES BACKGROUND IMG
    function changeBackground(index) {
        document.getElementById("overlay").style.backgroundImage = `linear-gradient(rgba(26,26,26,0.7), rgba(26,26,26,0.7)), url(img/img${index}.jpg)`;
    }

    //SHOWS AND ENABLES THE SUBMIT BUTTON WHEN FORMS ARE FILLED
    function showSubmit() {
        $('#input-form-two, #input-form-one').on("keyup", function (e) {
            let formOne = document.getElementById('input-form-one').value;
            let formTwo = document.getElementById('input-form-two').value;

            let canSubmit = false;

            //CHECKS IF THE FORM IS FILLED WITH AT LEAST A SINGLE VALUE
            if (formTwo.length >= 1 && formOne.length >= 1) {
                canSubmit = true;
            }

            //CHECKS IF BOTH FORMS ARE FILLED
            if (canSubmit) {
                $('#searchButton').fadeIn(1000);
                $('#searchButton').attr('disabled', false);
            }
            else {
                $('#searchButton').attr('disabled', true);
            }
        })
    }

    //STYLING THAT CHANGES TEXT OF AGAIN BTN WHEN HOVERED
    function searchAgainHover() {
        $('#searchAgainBtn').hover(function (e) {
            document.getElementById('searchAgainBtn').innerText = "YEA!";
        })

        $('#searchAgainBtn').mouseleave(function (e) {
            document.getElementById('searchAgainBtn').innerText = "AGAIN?"
        })
    }

    //WHEN SEARCH AGAIN BTN IS CLICKED, IT WILL HIDE THE RESULTS AREA AND SHOWS THE SEARCH FORMS AGAIN
    function searchAgain() {
        $('#searchAgainBtn').click(function (e) {
            event.preventDefault();
            $('#resultsArea').fadeOut(1000, function(e){
                $('#searchBox').fadeIn(1000);
                $('#logoHeader').fadeIn(1000, function(e){
                    $('#map').fadeIn(1000);
                });    
            });
            $('#meetupFalse').fadeOut(1000);
            $('#areaFalse').fadeOut(1000);
        })
    }

    //FUNCTION CALL THAT CHANGES BACKGROUND EVERY 15 SECONDS
    setInterval(function () {
        changeBackground(bckgroundCounter);
        bckgroundCounter++;
        if (bckgroundCounter === 5) {
            bckgroundCounter = 1;
        }
    }
        , 15000);

    //FUNCTION THAT CALLS ALL OTHER FUNCTIONS
    function init() {
        $(showSubmit);
        $(searchAgainHover);
        $(searchAgain);
    }

    //CALLS INIT
    $(init);
});