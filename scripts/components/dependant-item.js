// Controller for Dependant Item Directive
function DependantItemCtrl($scope, $element, $attrs, IdService, PAY_PERIODS_PER_YEAR){
	'use strict';

	var ctrl = this;

	ctrl.dependant.editing = ctrl.dependant.id === null;

	ctrl.originalData = _.cloneDeep(ctrl.dependant);

	ctrl.saveDependant = function(){
		ctrl.dependant.id = ctrl.dependant.id || IdService.getNextId();
		ctrl.dependant.editing = false;
		
		ctrl.originalData = _.cloneDeep(ctrl.dependant);
	};

	ctrl.cancelDependant = function(){
		if(ctrl.dependant.id){
			ctrl.dependant.editing = false;
			ctrl.dependant = _.cloneDeep(ctrl.originalData);
		} else {
			ctrl.appSettings.editing = false;
			ctrl.onDelete(ctrl.dependant);
		}
	};

	ctrl.editDependant = function(){
		ctrl.dependant.editing = true;
	};

	ctrl.getBenefitsCost = function(){
		return (ctrl.appSettings.displayType === 'annual')? ctrl.dependant.benefitsCost : ctrl.dependant.benefitsCost / PAY_PERIODS_PER_YEAR;
	};

	$scope.$watch(function(){
		return ctrl.dependant.editing;
	}, function(newVal){
		ctrl.appSettings.editing = newVal;
	});
};

EmployeeBenefitsApp.component('dependantItemComponent', {
	templateUrl: '/html/dependant-item.html',
	controller: DependantItemCtrl,
	bindings: {
		onDelete: '&',
		appSettings: '=',
		dependant: '='
	}
});