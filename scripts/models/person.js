EmployeeBenefitsApp.factory('Person', function(EMPLOYEE_BENEFITS_COST, PAY_PERIODS_PER_YEAR, EMPLOYEE_SALARY, LETTER_DISCOUNTS){
	// Person Model
	function Person(data){
		data = data || {};

		this.firstName = data.firstName || null;
		this.lastName = data.lastName || null;
		this.id = data.id || null;
		this.baseBenefitsCost = data.baseBenefitsCost;
		
		Object.defineProperty(this, "benefitsCost", { get: function () {
			return this.baseBenefitsCost * (1 - getDiscount(this.firstName));
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

	Person.extend = function(caller, data){
		return Person.call(caller, data);
	};

	Person.build = function(data){
		return new Person(data);
	};

	return Person;
});