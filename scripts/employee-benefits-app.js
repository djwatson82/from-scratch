var EmployeeBenefitsApp = angular.module('EmployeeBenefitsApp', []);

var employeeBenefitsCost = 1000;
var dependantBenefitsCost = 500;
var payPeriodsPerYear = 26;
var letterDiscounts = {
	a: 0.10
};

// Get discount for name's first letter.
function getDiscount(name){
	var discount = 0;
	
	if(name){
		discount = letterDiscounts[name.toLowerCase().substr(0,1)] || 0;	
	}

	return discount;
}

// Employee Model
function Employee(settings){
	settings = settings || {};

	this.firstName = settings.firstName || null;
	this.lastName = settings.lastName || null;
	this.id = settings.id || null;
	this.editing = this.id === null;
	this.dependants = settings.dependants || [];
	this.salary = settings.salary || 2000;

	var baseBenefitsCost = settings.baseBenefitsCost || employeeBenefitsCost;
	
	Object.defineProperty(this, "annualSalary", { get: function () { return this.salary * payPeriodsPerYear; } });
	Object.defineProperty(this, "benefitsCost", { get: function () {
		return baseBenefitsCost * (1 - getDiscount(this.firstName));
	}});
};

// Dependant Model
function Dependant(settings){
	settings = settings || {};

	this.firstName = settings.firstName || null;
	this.lastName = settings.lastName || null;
	this.id = settings.id || null;
	this.editing = this.id === null;
	this.relation = settings.relation || null;

	var baseBenefitsCost = settings.baseBenefitsCost || dependantBenefitsCost;
	
	Object.defineProperty(this, "benefitsCost", { get: function () {
		return baseBenefitsCost * (1 - getDiscount(this.firstName));
	}});
};

// Employee List / App controller
EmployeeBenefitsApp.controller('EmployeeListCtrl', ['$scope',
	function($scope){
		'use strict'

		$scope.appSettings = {
			editing:false,
			displayTypes: {annual: 'Annual', payPeriod: 'Pay Period'},
			displayType: 'annual'
		};

		$scope.employeeCollection = [];

		$scope.addEmployee = function(){
			$scope.employeeCollection.unshift(new Employee);
		};

		$scope.removeEmployee = function(employee){
			_.remove($scope.employeeCollection, employee);
		};
	}
]);

// Controller for Employee Item Directive
EmployeeBenefitsApp.controller('EmployeeCtrl', ['$scope', 'IdService',
	function($scope, IdService){
		'use strict'

		var ctrl = this;

		ctrl.originalData = _.cloneDeep(ctrl.employee);

		ctrl.saveEmployee = function(){
			ctrl.employee.id = ctrl.employee.id || IdService.getNextId();
			ctrl.employee.editing = false;
			ctrl.originalData = _.cloneDeep(ctrl.employee);
		};

		ctrl.editEmployee = function(){
			ctrl.employee.editing = true;
		};

		ctrl.cancelEmployee = function(){
			if(ctrl.employee.id){
				ctrl.employee = _.cloneDeep(ctrl.originalData);
				ctrl.employee.editing = false;
			} else {
				$scope.$parent.removeEmployee(ctrl.employee);
				ctrl.appSettings.editing = false;
			}
		};

		ctrl.deleteEmployee = function(){
			$scope.$parent.removeEmployee(ctrl.employee);
		};

		ctrl.getSalaryDisplay = function(){
			return (ctrl.appSettings.displayType === 'annual')? ctrl.employee.annualSalary : ctrl.employee.salary;
		};

		ctrl.getBenefitsCost = function(){
			return (ctrl.appSettings.displayType === 'annual')? ctrl.employee.benefitsCost : ctrl.employee.benefitsCost / payPeriodsPerYear;
		};

		ctrl.getDepedantsBenefitsCost = function(){
			var total = 0;

			for(var t = 0; t < ctrl.employee.dependants.length; t++){
				if(ctrl.employee.dependants[t].id !== null){
					total += ctrl.employee.dependants[t].benefitsCost;
				}
			}

			return (ctrl.appSettings.displayType === 'annual')? total : total / payPeriodsPerYear;
		};

		ctrl.getTotalBenefitsCost = function(){
			return ctrl.getBenefitsCost() + ctrl.getDepedantsBenefitsCost();
		};

		$scope.$watch('ctrl.employee.editing', function(newVal){
			ctrl.appSettings.editing = newVal;
		});
	}
]);

// Controller for Dependants List
EmployeeBenefitsApp.controller('DependantListCtrl', ['$scope',
	function($scope){
		'use strict'

		$scope.addDependant = function(){
			$scope.ctrl.employee.dependants.unshift(new Dependant);
		};

		$scope.removeDependant = function(dependant){
			_.remove($scope.ctrl.employee.dependants, dependant);
		};
	}
]);

// Controller for Dependant Item Directive
EmployeeBenefitsApp.controller('DependantCtrl', ['$scope', 'IdService',
	function($scope, IdService){
		'use strict'

		var ctrl = this;

		ctrl.originalData = _.cloneDeep(ctrl.dependant);

		ctrl.saveDependant = function(){
			ctrl.dependant.id = ctrl.dependant.id || IdService.getNextId();
			ctrl.dependant.editing = false;
			
			ctrl.originalData = _.cloneDeep(ctrl.dependant);
		};

		ctrl.cancelDependant = function(){
			if(ctrl.dependant.id){
				ctrl.dependant = _.cloneDeep(ctrl.originalData);
				ctrl.dependant.editing = false;
			} else {
				$scope.$parent.removeDependant(ctrl.dependant);
				ctrl.appSettings.editing = false;
			}
		};

		ctrl.editDependant = function(){
			ctrl.dependant.editing = true;
		};

		ctrl.deleteDependant = function(){
			$scope.$parent.removeDependant(ctrl.dependant);
		};

		ctrl.getBenefitsCost = function(){
			return (ctrl.appSettings.displayType === 'annual')? ctrl.dependant.benefitsCost : ctrl.dependant.benefitsCost / payPeriodsPerYear;
		};

		$scope.$watch('ctrl.dependant.editing', function(newVal){
			ctrl.appSettings.editing = newVal;
		});
	}
]);

// Directive for Employee Items
EmployeeBenefitsApp.directive('employeeItem', function() {
	return {
		restrict: 'A',
		templateUrl: '/html/employee-item.html',
		controller: 'EmployeeCtrl as ctrl',
		scope: {
			employee: '=employeeItem',
			employeeCollection: '=employeeParent',
			appSettings: '='
		},
		bindToController: true
	};
});

// Directive for Dependant Items
EmployeeBenefitsApp.directive('dependantItem', function() {
	return {
		restrict: 'A',
		templateUrl: '/html/dependant-item.html',
		controller: 'DependantCtrl as ctrl',
		scope: {
			dependant: '=dependantItem',
			dependantCollection: '=dependantParent',
			appSettings: '='
		},
		bindToController: true
	};
});

// Service for generating simple unqiue IDs for any entities
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