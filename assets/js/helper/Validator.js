import $ from 'jquery';
import 'jquery-validation';

class Validator {
	constructor(formObj, rules, messages) {
		this.formObj = formObj;
		this.rules = rules;
		this.messages = messages;
	}

	init() {
		return this.formObj.validate({
			rules: this.rules,
			messages: this.messages,
			errorElement: 'div',
			errorClass: 'text-left invalid-feedback',
			errorPlacement: function(error, element) {
				error.insertAfter(element);
			},
			highlight: function(element) {
	            $(element).addClass('is-invalid');
	        },
	        unhighlight: function(element) {
	        	$(element).removeClass('is-invalid');
	        }
		});
	}

	onSubmit() {
		return this.formObj.validate({
			rules: this.rules,
			messages: this.messages,
			errorElement: 'div',
			errorClass: 'text-left invalid-feedback',
			errorPlacement: function(error, element) {
				error.insertAfter(element);
			},
			highlight: function(element) {
	            $(element).addClass('is-invalid');
	        },
	        unhighlight: function(element) {
	        	$(element).removeClass('is-invalid');
	        },
	        submitHandler: function(form) {
	        	form.submit();
	        }
		});
	}
}

export default Validator;