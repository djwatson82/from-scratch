// App controller
function ApplicationCtrl($scope, $element, $attrs){
	'use strict';

	var ctrl = this;

	ctrl.appSettings = {
		editing: false,
		displayTypes: {annual: 'Annual', payPeriod: 'Pay Period'},
		displayType: 'annual'
	};

	ctrl.onAddEmployee = function(){
		$scope.$broadcast('employee.add');
	};
}

EmployeeBenefitsApp.component('application', {
	templateUrl: '/html/application.html',
	controller: ApplicationCtrl,
	bindings: {}
});