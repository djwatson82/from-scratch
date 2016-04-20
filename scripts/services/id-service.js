// Service for generating simple unqiue IDs for any entities
EmployeeBenefitsApp.factory('IdService', [
	function(){
		'use strict';

		var currentIdCount = 0;

		return {
			getNextId: function(){
				currentIdCount += 1;
				return currentIdCount;
			}
		};
	}
]);