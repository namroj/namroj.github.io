var lang = {
    "html": "95%",
    "css": "95%",
    "javascript": "95%",
    "php": "90%",
    "mysql": "85%",
    "symfony": "85%",
    "wordpress": "85%",
};

var multiply = 4;

$.each( lang, function( language, pourcent) {
    var delay = 700;

    setTimeout(function() {
        $('#'+language+'-pourcent').html(pourcent);
    }, delay*multiply);

    multiply++;
});