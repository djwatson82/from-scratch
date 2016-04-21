EmployeeBenefitsApp.factory('Person', function(EMPLOYEE_BENEFITS_COST, PAY_PERIODS_PER_YEAR, EMPLOYEE_SALARY, LETTER_DISCOUNTS){
	// Person Model
	function Person(data){
		data = data || {};

		this.firstName = data.firstName || null;
		this.lastName = data.lastName || null;
		this.id = data.id || null;
		
		var baseBenefitsCost = data.baseBenefitsCost;
		
		Object.defineProperty(this, "benefitsCost", { get: function () {
			return baseBenefitsCost * (1 - getDiscount(this.firstName));
		}});
	}

	// Get discount for name's first letter.
	function getDiscount(name){
		var discount = 0;
		
		if(name){
			discount = LETTER_DISCOUNTS[name.toLowerCase().substr(0,1)] || 0;	
		}

		return discount;
	}

	return Person;
});