EmployeeBenefitsApp.factory('Employee', function(EMPLOYEE_BENEFITS_COST, PAY_PERIODS_PER_YEAR, EMPLOYEE_SALARY, LETTER_DISCOUNTS){
	// Employee Model
	function Employee(data){
		data = data || {};

		this.firstName = data.firstName || null;
		this.lastName = data.lastName || null;
		this.id = data.id || null;
		this.dependants = data.dependants || [];
		this.salary = data.salary || EMPLOYEE_SALARY;

		var baseBenefitsCost = data.baseBenefitsCost || EMPLOYEE_BENEFITS_COST;
		
		Object.defineProperty(this, "annualSalary", { get: function () { return this.salary * PAY_PERIODS_PER_YEAR; } });
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

	Employee.build = function(data){
		return new Employee(data);
	};

	return Employee;
});
