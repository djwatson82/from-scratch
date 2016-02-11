var EmployeeBenefitsApp = angular.module('EmployeeBenefitsApp', []);

function Employee(){
	this.firstName = null;
	this.lastName = null;
	this.id = null;
	this.editing = true;
	this.dependants = [];
	this.salary = 2000;
};

function Dependant(){
	this.firstName = null;
	this.lastName = null;
	this.id = null;
	this.editing = true;
	this.relation = null;
};

EmployeeBenefitsApp.controller('EmployeeListCtrl', ['$scope',
	function($scope){
		'use strict'

		$scope.appSettings = {
			editing:false
		};

		$scope.employeeCollection = [];

		$scope.addEmployee = function(){
			$scope.employeeCollection.unshift(new Employee);
		};
	}
]);

EmployeeBenefitsApp.controller('EmployerCostsCtrl', ['$scope',
	function($scope){
		'use strict'

		$scope.getSalaryCost = function(){
			var total = 0;
			var paychecksPerYear = 26;

			for(var i = 0; i < $scope.employeeCollection.length; i++){
				if($scope.employeeCollection[i].id !== null){
					total += $scope.employeeCollection[i].salary * paychecksPerYear;
				}
			}

			return total;
		}

		$scope.getBenefitsCost = function(){
			var total = 0;
			var employeeCost = 1000;
			var dependantCost = 500;
			var discountForAName = 0.1;

			for(var i = 0; i < $scope.employeeCollection.length; i++){
				var employee = $scope.employeeCollection[i];

				if(employee.id !== null){
					total += (employee.firstName.toLowerCase().substr(0,1) === 'a')? employeeCost * (1 - discountForAName) : employeeCost;
				}

				console.log(employee.dependants);

				for(var t = 0; t < employee.dependants.length; t++){
					if(employee.dependants[t].id !== null){
						total += (employee.dependants[t].firstName.toLowerCase().substr(0,1) === 'a')? dependantCost * (1 - discountForAName) : dependantCost;
					}
				}
			}

			return total;
		}

		$scope.getTotalCost = function(){
			return $scope.getSalaryCost() + $scope.getBenefitsCost();
		};	
	}
]);

EmployeeBenefitsApp.controller('EmployeeCtrl', ['$scope', 'IdService',
	function($scope, IdService){
		'use strict'

		$scope.saveEmployee = function(){
			$scope.employee.id = $scope.employee.id || IdService.getNextId();
			$scope.employee.editing = false;
		};

		$scope.editEmployee = function(){
			$scope.employee.editing = true;
		};

		$scope.deleteEmployee = function(){
			$scope.employeeCollection.splice($scope.employeeCollection.indexOf($scope.employee), 1);
		};

		$scope.$watch('employee.editing', function(newVal){
			$scope.appSettings.editing = newVal;
		});
	}
]);

EmployeeBenefitsApp.controller('DependantListCtrl', ['$scope',
	function($scope){
		'use strict'

		$scope.addDependant = function(){
			$scope.employee.dependants.unshift(new Dependant);
		};
	}
]);

EmployeeBenefitsApp.controller('DependantCtrl', ['$scope', 'IdService',
	function($scope, IdService){
		'use strict'

		$scope.saveDependant = function(){
			$scope.dependant.id = $scope.dependant.id || IdService.getNextId();
			$scope.dependant.editing = false;
		};

		$scope.editDependant = function(){
			$scope.dependant.editing = true;
		};

		$scope.deleteDependant = function(){
			$scope.employee.dependants.splice($scope.employee.dependants.indexOf($scope.dependant), 1);
		};

		$scope.$watch('dependant.editing', function(newVal){
			$scope.appSettings.editing = newVal;
		});
	}
]);

EmployeeBenefitsApp.factory('IdService', [
	function(){
		'use strict'

		var currentIdCount = 0;

		return {
			getNextId: function(){
				currentIdCount += 1;
				return currentIdCount;
			}
		};
	}
]);