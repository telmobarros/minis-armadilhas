// Super Wheel Script
jQuery(document).ready(function($) {
    /*if (!localStorage.options || localStorage.options == {}) {
        window.location.href = './options.html';
    }*/




    $('.wheel-standard').superWheel({
        slices: [{
                text: "Shot Moscatel",
                value: 1,
                message: "Mama o shot!",
                background: "#ffb74c",

            },
            {
                text: "Nada",
                value: 0,
                message: "Nada",
                background: "#fc8000",

            },
            {
                text: "Shot Whisky",
                value: 1,
                message: "Mama o shot!",
                background: "#ffb74c",

            },
            {
                text: "Picante",
                value: 0,
                message: "Pica pica ai ai!",
                background: "#fc8000",

            },
            {
                text: "Shot Whisky Cola",
                value: 1,
                message: "Mama o shot!",
                background: "#ffb74c",

            },
            {
                text: "Roleta",
                value: 0,
                message: "Roleta eheh",
                background: "#fc8000",

            }
        ],
        text: {
            color: '#111111',
        },
        line: {
            width: 10,
            color: "#78909C"
        },
        outer: {
            width: 14,
            color: "#455a64"
        },
        inner: {
            width: 15,
            color: "#60747d"
        },
        marker: {
            background: "#97590c",
            animate: 1
        },

        selector: "value",

    });



    var tick = new Audio('../../dist/tick.mp3');

    $(document).on('click', '.wheel-standard-spin-button', function(e) {

        $('.wheel-standard').superWheel('start', 'value', Math.floor(Math.random() * 2));
        $(this).prop('disabled', true);
    });


    $('.wheel-standard').superWheel('onStart', function(results) {


        $('.wheel-standard-spin-button').text('Spinning...');

    });
    $('.wheel-standard').superWheel('onStep', function(results) {

        if (typeof tick.currentTime !== 'undefined')
            tick.currentTime = 0;

        tick.play();

    });


    $('.wheel-standard').superWheel('onComplete', function(results) {
        //console.log(results.value);
        if (results.value === 1) {

            swal({
                type: 'success',
                title: "Congratulations!",
                html: results.message + ' <br><br><b>[ ' + results.text + ' ]</b>'
            });

        } else {
            swal("Oops!", results.message, "error");
        }


        $('.wheel-standard-spin-button:disabled').prop('disabled', false).text('Spin');

    });





});