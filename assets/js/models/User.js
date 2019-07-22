import $ from 'jquery';

class User {

	/**
	 * Add/Edit
	 */
	save(ajaxURL, data, extraParameters) {
		$.ajax({
			url: ajaxURL,
			contentType: false,
			processData: false,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			beforeSend: () => {
				extraParameters.btnSave.prepend('<div class="spinner-border align-middle mr-2" role="status"><span class="sr-only">Loading...</span></div>')
					.prop('disabled', true);
			},
			success: response => {
				// console.log(response);
				if (response.status === "success") {
					$('.notification').html(`<div class="alert alert--success">${response.message}</div>`);

					setTimeout(()=> {
						window.location.href = response.url;
					}, 2000);
				}
			},
			complete: () => {
				if ( $('.spinner-border').length > 0 ) {
					$('.spinner-border').remove();
				}
				$('.notification .alert').fadeOut(3000);
				extraParameters.btnSave.prop('disabled', false);
			},
			error: () => {
				$('.notification').html('<div class="alert alert--error">Something went wrong. Please try again.</div>');
			}
		});
	}

	/**
	 * Delete
	 */
	delete(ajaxURL, data, extraParameters) {
		const userId = extraParameters.userId;

		$.ajax({
			url: ajaxURL,
			dataType: 'JSON',
			success: response => {
				if (response.status === "success") {
					$('.notification').html(`<div class="alert alert--success">${response.message}</div>`);
					$(`a[data-user-id="${userId}"`).parents('tr').fadeOut(3000);
				}
			},
			complete: () => {
				$('.notification .alert').fadeOut(3000);
			},
			error: () => {
				$('.notification').html('<div class="alert alert--error">Something went wrong. Please try again.</div>');
			}
		});
	}

	/**
	 * Register
	 */
	register(ajaxURL, data, extraParameters) {
		$.ajax({
			url: ajaxURL,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			beforeSend: () => {
				extraParameters.btnSignUp.prepend('<div class="spinner-border align-middle mr-2" role="status"><span class="sr-only">Loading...</span></div>')
					.prop('disabled', true);
			},
			success: response => {
				if (response.status === "success") {
					$('.notification').html(`<div class="alert alert--success">${response.message}</div>`);
					extraParameters.form.trigger('reset');
					//extraParameters.form.find(':input').blur();
				}
			},
			complete: () => {
				if ( $('.spinner-border').length > 0 ) {
					$('.spinner-border').remove();
				}
				$('.notification .alert').fadeOut(3000);
				extraParameters.btnSignUp.prop('disabled', false);
			},
			error: () => {
				$('.notification').html('<div class="alert alert--error">Something went wrong. Please try again.</div>');
			}
		});
	}
}

export default User;