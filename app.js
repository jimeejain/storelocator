angular.module("ccdApp", [])


.service("myservice", function ($http) {
    return {
        getData: function () {
            return $http({
                method: 'GET',
                url:'./data.json'
            })
        }
    }
        
})

.filter("myfilter", function () {
    var queryHelper = function (query, u) {
        query = query.toLowerCase();
        return (
           query == undefined || 
           query == ""  ||
            ~u.name.toLowerCase().indexOf(query) ||
            ~u.address1.toLowerCase().indexOf(query) ||
            ~u.city_area.toLowerCase().indexOf(query) ||
            ~u.city.toLowerCase().indexOf(query) ||
            ~u.state.toLowerCase().indexOf(query) ||
            ~u.pincode.toLowerCase().indexOf(query)
            )
    }
    return function (arr, query) {
        return arr.filter(function (u) {
            return queryHelper(query, u);
        })
    }
})


.controller("mainController", function ($scope, myservice) {
    $scope.stores = [];
    $scope.query = "";
    myservice.getData().then(function (response) {
        $scope.stores = response.data.stores;
        console.log(response.data);
        //Hide the pre-loaders
        document.getElementById("preloader").style.display = 'none';
    }, function (error) {
        console.log(error);
    })

})