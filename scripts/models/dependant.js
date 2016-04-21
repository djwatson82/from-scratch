EmployeeBenefitsApp.factory('Dependant', function(Person, DEPENDANT_BENEFITS_COST, LETTER_DISCOUNTS){
	// Dependant Model
	function Dependant(data){
		data = data || {};
		data.baseBenefitsCost = data.baseBenefitsCost || DEPENDANT_BENEFITS_COST;

		Person.call(this, data);

		this.relation = data.relation || null;
	}

	// Get discount for name's first letter.
	function getDiscount(name){
		var discount = 0;
		
		if(name){
			discount = LETTER_DISCOUNTS[name.toLowerCase().substr(0,1)] || 0;	
		}

		return discount;
	}

	return Dependant;
});
