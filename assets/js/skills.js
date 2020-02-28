var lang = {
    "html": "95%",
    "css": "95%",
    "javascript": "85%",
    "php": "85%",
    "angular": "80%"
};

var multiply = 4;

$.each( lang, function( language, pourcent) {
    var delay = 700;

    setTimeout(function() {
        $('#'+language+'-pourcent').html(pourcent);
    }, delay*multiply);

    multiply++;
});