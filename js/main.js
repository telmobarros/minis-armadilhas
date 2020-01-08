// Super Wheel Script
jQuery(document).ready(function($) {
    var backgroundColors = ['#ffb74c', '#fc8000', '#e68c26']
    var options = {};
    const urlParams = new URLSearchParams(window.location.search);
    const optionsParams = urlParams.get('options');
    if (optionsParams) {
        options = JSON.parse(atob(optionsParams))
        localStorage.options = atob(optionsParams)
    } else if (!localStorage.options || localStorage.options == '{}') {
        window.location.href = './options.html';
    } else {
        options = JSON.parse(localStorage.options);
        window.history.pushState(null, '', './index.html?options=' + btoa(JSON.stringify(options)));
    }
    var encoded = btoa(JSON.stringify(options))
    console.log(encoded)
    var decoded = JSON.parse(atob(encoded))
    console.log(decoded)

    var slices = [];
    for (var key in options) {
        for (var i = 5; i >= options[key]; i--) {
            slices.push({
                text: key,
                value: 1,
                message: 'meme'
            })
        }
    }
    console.log(slices);
    slices.sort(() => Math.random() - 0.5);
    console.log(slices);
    for (var i = 0; i < slices.length; i++) {
        slices[i].background = backgroundColors[i % backgroundColors.length];
    }
    console.log(slices);

    $('.wheel-standard').superWheel({
        slices: slices,
        text: {
            color: '#111111',
            /*offset: 10,
            letterSpacing: 3,
            orientation: 'h',
            arc: true*/
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



    var tick = new Audio('./tick.mp3');

    $(document).on('click', '.wheel-standard-spin-button', function(e) {
        $('.wheel-standard').superWheel('start', 'value', 1); //Math.floor(Math.random() * 2));
        $(this).prop('disabled', true);
    });


    $('.wheel-standard').superWheel('onStart', function(results) {

        $('.wheel-standard-spin-button').text('Girando ...');

    });
    $('.wheel-standard').superWheel('onStep', function(results) {

        if (typeof tick.currentTime !== 'undefined')
            tick.currentTime = 0;

        tick.play();

    });


    $('.wheel-standard').superWheel('onComplete', function(results) {
        swal({
            type: 'success',
            title: results.text,
            html: '<b>' + results.text + '</b>'
        });

        /*if (results.value === 1) {
        } else {
            swal("Oops!", results.message, "error");
        }*/


        $('.wheel-standard-spin-button:disabled').prop('disabled', false).text('Gira-me');

    });
});