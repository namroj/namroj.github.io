var app = angular.module('formApp', []);

app.controller('MainCtrl', function ($scope) {
    $scope.formData = {};
    
    $scope.submitForm = function (formData) {
        alert('Form submitted with' + JSON.stringify(formData));
    };
});
