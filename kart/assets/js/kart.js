var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
   $routeProvider.when('/',{
       templateUrl: '/dir/kart/register.html',
       controller: 'appController'
   }).when('/shopping',{
       templateUrl: '/dir/kart/shopping.html',
       controller: 'shoppingController'
   }).when('/payment',{
       templateUrl: '/dir/kart/payment.html',
       controller: 'paymentController'
   }).otherwise({
       redirectTo: '/'
   });
});
app.controller('appController',function($scope){
    $scope.firstname = 'Bhaargavi';
    $scope.lastname = 'Agrawal';
    $scope.myEmailid = 'bhaargavi@gmail.com';
     $scope.fullName = function() {
        return $scope.firstname + " " + $scope.lastname;
    };
});
app.controller('shoppingController',function($scope){
   $scope.options = ['Books in the Store', 'Gadgets in the Store' , 'Clothings in the Store'];
    $scope.products = {
        "books" : [
            {"name":"Murder on the Orient Express", "company":"Agatha Christie","price":150, "genre": 'Crime/Mystery', "quantity": 0},
            {"name":"Me Before You", "company":"Jojo Moyes","price":190, "genre": 'Romantic',"quantity": 0},
            {"name":"The Time Machine", "company":"HG Wells","price":120, "genre": 'Crime/Mystery',"quantity": 0},
            {"name":"The Girl From the Well", "company":"Rin Chupico", "genre": 'Horror',"price":190, "quantity": 0},
            {"name":"Death on the Nile", "company":"Agatha Christie", "price":150, "genre": 'Crime/Mystery', "quantity": 0},
            {"name":"Rebecca", "genre": 'Crime/Mystery', "company":"Daphne Du Maurier","price":110, "quantity": 0}
        ],
        "gadgets" :[
            {"name":"HP 15-AY115TX Intel Core i7", "company":"HP" ,"price":48300,"type":"Laptop", "quantity": 0},
            {"name":"HP Stream 7 32 GB Windows", "company":"HP ","price": 23900, "type":"Tablet", "quantity": 0},
            {"name":"Samsung Galaxy J7 Max", "company":"Samsung","price": 17800, "type":"Smart Phone", "quantity": 0},
            {"name":"Plantronic Back Beat Pro", "company":"Plantronic" ,"price":11490, "type":"Headphone", "quantity": 0},
            {"name":"Dell Inspiron 15 3567 i5", "company":"Dell","price": 42500, "type":"Laptop", "quantity": 0},
            {"name":"Vivo V5S", "company":"Vivo", "type":"Smart Phone", "price":17000, "quantity": 0}
        ],
        "clothes":[
            {"name":"One Piece Dress", "company":"Carrell" ,"price":15000, "quantity": 0},
            {"name":"Men's Coat", "company":"Souland","price":1900, "quantity": 0},
            {"name":"Woman Solid Parka Jacket", "company":"Fort Collins","price":1599, "quantity": 0},
            {"name":"Shirt for Men", "company":"HighLander" ,"price":700, "quantity": 0},
            {"name":"Woman Kurtis", "company":"Kaushalik","price":650, "quantity": 0},
            {"name":"Pair of Jeans for Men", "company":"Levis","price":1600, "quantity": 0}
        ]
    };
      $scope.arr = [];
      $scope.obj = {};
    
    $scope.addItem = function(id_click){
        var id = event.srcElement.id; // since we don't need to {{}} for this element so we do not use scope instead use normally var. 
        // For Books 
        if(id < 7){ 
            $scope.obj = $scope.products.books[id - 1];
            if($scope.products.books[id-1].quantity == 0){
                $scope.arr.push($scope.obj);
                $scope.products.books[id-1].quantity++;
            }
            else{
                $scope.index_book = $scope.arr.indexOf($scope.obj); 
/* first id = 1 is clicked then id = 2 is clicked 
Now again id = 1 is clicked. So here the indexof book is of the id = 2 so this has to be repeated so as to increase the quantity and price for the correct book*/
                var q = ++$scope.arr[$scope.index_book].quantity ;
                $scope.price_tot = ($scope.arr[$scope.index_book].price)/(q-1) * q;
    /* This is bcoz each time else is executed the value is updated for the price */
                $scope.arr[$scope.index_book].price = $scope.price_tot;
            }
        }
        if(id > 6 && id < 13){
            $scope.obj = $scope.products.gadgets[id - 7];
            if($scope.products.gadgets[id-7].quantity == 0){
                $scope.arr.push($scope.obj);
                $scope.products.gadgets[id-7].quantity++;
            }
            else{
                $scope.index_gadget = $scope.arr.indexOf($scope.obj);
                var q = ++$scope.arr[$scope.index_gadget].quantity ;
                $scope.price_tot = ($scope.arr[$scope.index_gadget].price)/(q-1) * q;
                $scope.arr[$scope.index_gadget].price = $scope.price_tot;
            }
        }
        if(id >12){
             $scope.obj = $scope.products.clothes[id - 13];
            if($scope.products.clothes[id-13].quantity == 0){
                $scope.arr.push($scope.obj);
                $scope.products.clothes[id-13].quantity++;
            }
            else{
                $scope.index_clothes = $scope.arr.indexOf($scope.obj);
                var q = ++$scope.arr[$scope.index_clothes].quantity ;
                $scope.price_tot = ($scope.arr[$scope.index_clothes].price)/(q-1) * q;
                $scope.arr[$scope.index_clothes].price = $scope.price_tot;
            }
        }
     }
     $scope.removeItem = function(index){
         if($scope.arr[index].quantity == 1){ 
             $scope.arr.splice(index,1);
         }
         else{
             var q = --$scope.arr[index].quantity;
             $scope.arr[index].price -= $scope.arr[index].price / (q+1);
         }
     }
     
     $scope.price_cal = function(){
         $scope.price_total = 0;
         for(var i=0;i<$scope.arr.length;i++){
             $scope.price_total += $scope.arr[i].price;
         }
         if($scope.price_total == 0)
             document.getElementById('payment').style.display = 'none';
         else
             document.getElementById('payment').style.display = 'block';
         return $scope.price_total;
         
     }
});
