// Controller for Dependants List
function DependantListCtrl($scope, $element, $attrs, Dependant){
	'use strict';

	var ctrl = this;

	ctrl.addDependant = function(){
		ctrl.dependants.unshift(new Dependant());
	};

	ctrl.removeDependant = function(dependant){
		_.remove(ctrl.dependants, dependant);
	};
}

EmployeeBenefitsApp.component('dependantList', {
	templateUrl: '/html/dependant-list.html',
	controller: DependantListCtrl,
	bindings: {
		dependants: '=',
		appSettings: '=',
		salaryDisplay: '&'
	}
});