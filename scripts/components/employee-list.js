// Employee List controller
function EmployeeListCtrl($scope, $element, $attrs, Employee){
	'use strict';

	var ctrl = this;

	ctrl.employees = [];

	ctrl.addEmployee = function(){
		ctrl.employees.unshift(Employee.build());
	};

	ctrl.removeEmployee = function(employee){
		_.remove(ctrl.employees, employee);
	};

	$scope.$on('employee.add', ctrl.addEmployee);
}

EmployeeBenefitsApp.component('employeeList', {
	templateUrl: '/html/employee-list.html',
	controller: EmployeeListCtrl,
	bindings: {
		appSettings: '='
	}
});