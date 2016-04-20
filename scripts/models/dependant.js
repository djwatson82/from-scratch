EmployeeBenefitsApp.factory('Dependant', function(DEPENDANT_BENEFITS_COST, LETTER_DISCOUNTS){
	// Dependant Model
	function Dependant(data){
		data = data || {};

		this.firstName = data.firstName || null;
		this.lastName = data.lastName || null;
		this.id = data.id || null;
		this.relation = data.relation || null;

		var baseBenefitsCost = data.baseBenefitsCost || DEPENDANT_BENEFITS_COST;
		
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

	Dependant.build = function(data){
		return new Dependant(data);
	};

	return Dependant;
});
