
// Controller for Employee Item Directive
function EmployeeCtrl($scope, $element, $attrs, IdService, PAY_PERIODS_PER_YEAR){
	'use strict';

	var ctrl = this;

	ctrl.employee.editing = ctrl.employee.id === null;

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
			ctrl.appSettings.editing = false;
			ctrl.onDelete(ctrl.employee);
		}
	};

	ctrl.getSalaryDisplay = function(){
		return (ctrl.appSettings.displayType === 'annual')? ctrl.employee.annualSalary : ctrl.employee.salary;
	};

	ctrl.getBenefitsCost = function(){
		return (ctrl.appSettings.displayType === 'annual')? ctrl.employee.benefitsCost : ctrl.employee.benefitsCost / PAY_PERIODS_PER_YEAR;
	};

	ctrl.getDepedantsBenefitsCost = function(){
		var total = 0;

		for(var t = 0; t < ctrl.employee.dependants.length; t++){
			if(ctrl.employee.dependants[t].id !== null){
				total += ctrl.employee.dependants[t].benefitsCost;
			}
		}

		return (ctrl.appSettings.displayType === 'annual')? total : total / PAY_PERIODS_PER_YEAR;
	};

	ctrl.getTotalBenefitsCost = function(){
		return ctrl.getBenefitsCost() + ctrl.getDepedantsBenefitsCost();
	};

	$scope.$watch(function(){
		return ctrl.employee.editing;
	}, function(newVal){
		ctrl.appSettings.editing = newVal;
	});
}

// Component for Employee Items
EmployeeBenefitsApp.component('employeeItem', {
	templateUrl: '/html/employee-item.html',
	controller: EmployeeCtrl,
	bindings: {
		employee: '=',
		appSettings: '=',
		onDelete: '&'
	}
});