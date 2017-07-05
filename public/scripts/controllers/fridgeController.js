angular.module('FridgeVentory')
	.controller('FridgeController', FridgeController)
	.controller('FridgeShowController', FridgeShowController)
	.config(fridgeRouter);


//*****ROUTES*****

fridgeRouter.$inject = ['$routeProvider', '$locationProvider'];
function fridgeRouter ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/fridge-index.html',
			//controller: 'FlyController'
		})
		.when('/show/:id', {
			templateUrl: '/templates/fridge-show.html',
			//controller: 'FlyShowController'
		});
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
}



//*****CONTROLLERS******
FridgeController.$inject = ['$http'];
function FridgeController ($http) {
	console.log("controller working");
	var vm = this;
	//vm.helloWorld = "initial message";

	vm.all = [];
	vm.fridgeList = [];

	$http
	.get('/fridge')
	.then(function(response) {
		vm.fridgeList = response.data;
		console.log(vm.fridgeList);
	});

	vm.addItem = addItem;
	vm.newItem = {};

	function addItem() {
		vm.all.push(vm.newItem);
		$http
		.post('/fridge', vm.newItem)
		.then(function(response) {
			console.log(response);
			vm.fridgeList.push(response.data);
		});
		vm.newItem = {};
	}

	vm.deleteItem = deleteItem;

	function deleteItem(items) {
		console.log("delete button clicked");
		console.log(items._id);
		$http
		.delete('/fridge/' + items._id)
		.then(function(response) {
			var index = vm.fridgeList.indexOf(items);
			vm.fridgeList.splice(index, 1);
			console.log(index);
		});
	}


}

FridgeShowController.$inject = ['$http', '$routeParams'];
function FridgeShowController ($http, $routeParams) {
	console.log($routeParams.id);
	var vm = this;
	vm.singleItem = {};

		$http
		.get('/fridge/' + $routeParams.id)
		.then(function(response) {
			console.log("response from server is ", response.data._id);
			vm.singleItem = response.data;
		});
	

}


