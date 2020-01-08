var options = {};
var counter = 1;
if (localStorage.options && localStorage.options != '{}') {
    try {
        initOptions(JSON.parse(localStorage.options));
    } catch (e) {
        console.log(e);
    }
}

//add all rows for the saved options in the local storage
function initOptions(options) {
    $('#option-1').remove()
    $('#rb-1').remove()
    for (var key in options) {
        addRow(key, counter, options[key]);
        counter++;
    }
    counter--;
}

//add options row
function addRow(text, n, selected) {
    $('#options-box').append('<input type="text" id="option-' + n + '" maxlength="10" placeholder="Opção ' + n + '" value="' + text + '">');
    $('#options-box').append('<div id="rb-' + n + '" class="rb"></div>');
    for (var i = 1; i <= 5; i++) {
        $('#rb-' + n).append('<div class="rb-tab" data-value="' + i + '"><div class="rb-spot"><span class="rb-txt">' + i + '</span></div></div>');
    }
    $('#rb-' + n + ' div[data-value="' + selected + '"').addClass('rb-tab-active');

}

$(".rb-tab").click(function() {
    $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
    $(this).addClass("rb-tab-active");
});

$("#add").click(function() {
    counter++;
    addRow('', counter, 3);
});

$("#remove").click(function() {
    if (counter > 1) {
        $('#option-' + counter).remove();
        $('#rb-' + counter).remove();
        counter--;
    }
});

//Save data:
$(".trigger").click(function() {
    options = {};
    var allFilled = true;
    for (i = 1; i <= $(".rb").length; i++) {
        var rbValue = parseInt($("#rb-" + i).find(".rb-tab-active").attr("data-value"));
        var optionText = $("#option-" + i).val();
        options[optionText] = rbValue;
        if (optionText == '') {
            allFilled = false;
        }
    };
    //save localStorage
    if (allFilled) {
        localStorage.options = JSON.stringify(options)
        window.location.href = './index.html';
    } else {
        alert('Faltam preencher opções.')
    }

});