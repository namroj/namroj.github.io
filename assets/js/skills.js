let lang = {
  html: '95%',
  css: '95%',
  javascript: '95%',
  php: '90%',
  java: '90%',
  mysql: '90%',
  symfony: '85%',
  wordpress: '85%'
}

let multiply = 4

$.each(lang, function (language, pourcent) {
  let delay = 300

  setTimeout(function () {
    $('#' + language + '-pourcent').html(pourcent)
  }, delay * multiply)

  multiply++
})
