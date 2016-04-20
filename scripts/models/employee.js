EmployeeBenefitsApp.factory('Employee', function(Person, EMPLOYEE_BENEFITS_COST, PAY_PERIODS_PER_YEAR, EMPLOYEE_SALARY, LETTER_DISCOUNTS){
	// Employee Model
	function Employee(data){
		data = data || {};
		data.baseBenefitsCost = data.baseBenefitsCost || EMPLOYEE_BENEFITS_COST;

		Person.extend(this, data);

		this.dependants = data.dependants || [];
		this.salary = data.salary || EMPLOYEE_SALARY;
		
		Object.defineProperty(this, "annualSalary", { get: function () { return this.salary * PAY_PERIODS_PER_YEAR; } });
	}

	Employee.build = function(data){
		return new Employee(data);
	};

	return Employee;
});
