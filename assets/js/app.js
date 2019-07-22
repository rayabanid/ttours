import '../css/app.css';

import $ from 'jquery';
import Tour from './models/Tour.js';
import User from './models/User.js';
import Validator from './helper/Validator.js';
import Mapbox from './helper/Mapbox.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import bootbox from 'bootbox';
import isValidCoordinates from 'is-valid-coordinates';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import routes from './js_routes.json';
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
Routing.setRoutingData(routes);

$(function() {
	$('#tour_startDate').flatpickr();

	// Tours
	$(document).on('submit', '.tour-form', saveTour);
	$(document).on('click', '.delete-tour', deleteTour);

	// Users
	$(document).on('submit', '.form--login', login);
	$(document).on('submit', '.form--signup', signUp);
	$(document).on('submit', '.form-user-data', saveAccount);
	$(document).on('submit', '.user-form', saveUser);
	$(document).on('click', '.delete-user', deleteUser);

	const $mapBox = $('#map');
	if ($mapBox.length > 0) {
		let location = $mapBox.data('location');
		const mapBox = new Mapbox(location);
		mapBox.init();
	}

	$(document).on('click','#book-tour', () => {
		bootbox.alert({
			message:'<h1>Coming soon</h1>',
			backdrop: true,
			buttons: {
				ok: {
					label: 'Ok',
					className: 'btn--green'
				}
			}
		});
	});
});

/**
 * Add/Edit tour
 */
const saveTour = (e) => {
	e.preventDefault();
	const $form = $(e.target);
	const formId = $form.attr('id');
	
	// custom error message
	$.validator.addMethod('isValidLatitude', (lat) => {
		lat = parseInt(lat);
		return isValidCoordinates.latitude(lat);
	});

	$.validator.addMethod('isValidLongitude', (lon) => {
		lon = parseInt(lon);
		return isValidCoordinates.longitude(lon);
	});

	let rules = {
		'tour[name]': 'required',
		'tour[duration]': 'required',
		'tour[maxGroupSize]': 'required',
		'tour[ratings]': 'required',
		'tour[price]': 'required',
		'tour[location]': 'required',
		'tour[latitude]': {
			required: true,
			isValidLatitude: true
		},
		'tour[longitude]': {
			required: true,
			isValidLongitude: true
		},
		'tour[startDate]': 'required',
	};
	let messages = {
		'tour[name]': 'Name is required.',
		'tour[duration]': 'Duration is required.',
		'tour[maxGroupSize]': 'Max Group Size is required.',
		'tour[ratings]': 'Ratings is required.',
		'tour[price]': 'Price is required.',
		'tour[location]': 'Location is required.',
		'tour[latitude]': {
			required: 'Latitude is required.',
			isValidLatitude: 'Latitude is invalid.'
		},
		'tour[longitude]': {
			required: 'Longitude is required.',
			isValidLongitude: 'Longitude is invalid'
		},
		'tour[startDate]': 'Start Date is required.'
	}

	const validator = new Validator($form, rules, messages);
	let formValidator = validator.init();

	$('.notification').html('');
	if (formValidator.form()) {
		const tourId = $form.find('#tour_id').val();
		const ajaxURL = (formId === 'create-tour') ? Routing.generate('tour_new') : Routing.generate('tour_edit', {id: tourId});
		let name = $form.find('#tour_name').val();
		let duration = $form.find('#tour_duration').val();
		let maxGroupSize = $form.find('#tour_maxGroupSize').val();
		let difficulty = $form.find('#tour_difficulty').val();
		let ratings = $form.find('#tour_ratings').val();
		let price = $form.find('#tour_price').val();
		let summary = $form.find('#tour_summary').val();
		let description = $form.find('#tour_description').val();
		let $imageCover = $form.find('#tour_imageCover');
		let imageCover = ($imageCover.val() != "" && $imageCover.val().length > 0) ? $imageCover[0].files[0] : '';
		let location = $form.find('#tour_location').val();
		let latitude = $form.find('#tour_latitude').val();
		let longitude = $form.find('#tour_longitude').val();
		let startDate = $form.find('#tour_startDate').val();
		const btnSave = $form.find('#btn-save');

		const formData = new FormData();
		formData.append('name', name);
		formData.append('duration', duration);
		formData.append('maxGroupSize', maxGroupSize);
		formData.append('difficulty', difficulty);
		formData.append('ratings', ratings);
		formData.append('price', price);
		formData.append('summary', summary);
		formData.append('description', description);
		formData.append('imageCover', imageCover);
		formData.append('location', location);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);
		formData.append('startDate', startDate);

		const tour = new Tour();
		let extraParameters = { btnSave: btnSave };
		tour.save(ajaxURL, formData, extraParameters);
	}
}

/**
 * Delete tour
 */
const deleteTour = (e) => {
	const id = e.target.id;
	const tourId = e.target.dataset.tourId;
	const ajaxURL = Routing.generate('tour_delete', { id: tourId });

	bootbox.confirm({
		message: '<h1 class="h1 ml-2">Are you sure you want to delete this tour?</h1>',
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn--green'
			},
			cancel: {
				label: 'No'
			}
		},
		callback: result => {
			if (result) {
				const tour = new Tour();
				let extraParameters = { tourId: tourId };
				tour.delete(ajaxURL, null, extraParameters);
			}
		}
	});
}

/**
 * Login
 */
const login = (e) => {
	e.preventDefault();
	const $form = $(e.target);

	let rules = {
		'email': {
			required: true,
			email: true,
		},
		'password': 'required',
	};
	let messages = {
		'email': {
			required: 'Email is required.',
			email: 'Email is invalid'
		},
		'password': 'Password is required.',
	}

	const validator = new Validator($form, rules, messages);
	let formValidator = validator.onSubmit();
	if (formValidator.form()) {
		$form.submit();
	}
}

/**
 * Sign up
 */
const signUp = (e) => {
	e.preventDefault();
	const $form = $(e.target);

	let rules = {
		'registration_form[email]': {
			required: true,
			email: true,
		},
		'registration_form[password][first]': 'required',
		'registration_form[password][second]': 'required'
	};
	let messages = {
		'registration_form[email]': {
			required: 'Email is required.',
			email: 'Email is invalid'
		},
		'registration_form[password][first]': 'Password is required.',
		'registration_form[password][second]': 'Confirm Password is required.'
	}

	const validator = new Validator($form, rules, messages);
	let formValidator = validator.init();

	$('.notification').html('');
	if (formValidator.form()) {
		const ajaxURL = Routing.generate('register');
		let email = $form.find('#registration_form_email').val();
		let password = $form.find('#registration_form_password_first').val();
		let confirmPassword = $form.find('#registration_form_password_second').val();
		const btnSignUp = $form.find('#btn-sign-up');

		if (password == confirmPassword) {
			const user = new User();
			const data = { email: email, password: password }
			let extraParameters = {
				form: $form,
				btnSignUp: btnSignUp
			};
			user.register(ajaxURL, data, extraParameters);
		} else {
			$('.notification').html('<div class="alert alert--error">The password fields must match.</div>');
			$form.find(':input').blur();
		}
	}
}


const saveAccount = (e) => {
	e.preventDefault();
	const $form = $(e.target);
	const formId = $form.attr('id');

	let rules = {
		'user[email]': 'required',
	};
	let messages = {
		'user[email]': 'Email is required.',
	}

	const validator = new Validator($form, rules, messages);
	let formValidator = validator.init();

	$('.notification').html('');
	if (formValidator.form()) {
		const userId = $form.find('#user_id').val();
		const ajaxURL = Routing.generate('user_account');
		let firstName = $form.find('#user_firstName').val();
		let lastName = $form.find('#user_lastName').val();
		let email = $form.find('#user_email').val();
		let password = $form.find('#user_password').val();
		let $profileImage = $form.find('input[name="user[profileImage]"]');
		let profileImage = ($profileImage.val() != "" && $profileImage.val().length > 0) ? $profileImage[0].files[0] : '';
		const btnSave = $form.find('#btn-save');

		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profileImage', profileImage);

		const user = new User();
		let extraParameters = { btnSave: btnSave };
		user.save(ajaxURL, formData, extraParameters);
	}
}

/**
 * Add/Edit user
 */
const saveUser = (e) => {
	e.preventDefault();
	const $form = $(e.target);
	const formId = $form.attr('id');

	let rules = {
		'user[email]': 'required',
		'user[password]': 'required'
	};
	let messages = {
		'user[email]': 'Email is required.',
		'user[password]': 'Password is required.'
	}

	const validator = new Validator($form, rules, messages);
	let formValidator = validator.init();

	$('.notification').html('');
	if (formValidator.form()) {
		const userId = $form.find('#user_id').val();
		const ajaxURL = (formId === 'create-user') ? Routing.generate('user_new') : Routing.generate('user_edit', {id: userId});
		let firstName = $form.find('#user_firstName').val();
		let lastName = $form.find('#user_lastName').val();
		let email = $form.find('#user_email').val();
		let password = $form.find('#user_password').val();
		let $profileImage = $form.find('input[name="user[profileImage]"]');
		let profileImage = ($profileImage.val() != "" && $profileImage.val().length > 0) ? $profileImage[0].files[0] : '';
		const btnSave = $form.find('#btn-save');

		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profileImage', profileImage);

		const user = new User();
		let extraParameters = { btnSave: btnSave };
		user.save(ajaxURL, formData, extraParameters);
	}
}

/**
 * Delete user
 */
const deleteUser = (e) => {
	const id = e.target.id;
	const userId = e.target.dataset.userId;
	const ajaxURL = Routing.generate('user_delete', { id: userId });

	bootbox.confirm({
		message: '<h1 class="h1 ml-2">Are you sure you want to delete this user?</h1>',
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn--green'
			},
			cancel: {
				label: 'No'
			}
		},
		callback: result => {
			if (result) {
				const user = new User();
				let extraParameters = { userId: userId };
				user.delete(ajaxURL, null, extraParameters);
			}
		}
	});
}