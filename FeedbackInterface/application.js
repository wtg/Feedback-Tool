/**
 * @preserve © Kenley Cheung 2011
 *
 */

function debug_log(string)
{
	"use strict";
	if (debug_mode == true)
	{
		console.log(string);
		return true;
	}
	return null;
}

function init(stage1)
{
	"use strict";
	$('body').removeClass('no-js');
	$('#more_contacts').hide();
	$('#more_contacts span.help-inline').hide();
	$('#area2').children().attr('disabled', 'disabled');
	registerEventHandlers();
	$('#topbar').dropdown();
}

function registerEventHandlers()
{
	"use strict";
	$('#area1').change(areaSelectHandler);
	$('#area2').change(areaSelectHandler);
	$('#category').change(feedbackSelectHandler);
	$('#email').focusout(emailValidatorHandler);
}

function feedbackSelectHandler(e)
{
	"use strict";
	var feedback = $(this.options[this.selectedIndex]).html();
	$('#help-block-category').html(feedback);
}

function areaSelectHandler(e)
{
	"use strict";
	var topic;
	if (this.id == "area1")
	{
		if (this.options[this.selectedIndex].value == 'SE')
		{
			$('#more_contacts').show('slow');
			$('#area2').children().attr('disabled', 'disabled'); // Disable any other elements
			$('#og-SE').removeAttr('disabled');
		}
		else if (this.options[this.selectedIndex].value == 'StuGov')
		{
			$('#more_contacts').show('slow');
			$('#area2').children().attr('disabled', 'disabled'); // Disable any other elements
			$('#og-StuGov').removeAttr('disabled');
		}
		else
		{
			if ($('#more_contacts').is(":visible"))
			{
				$('#more_contacts').hide('slow');
				$('#area2').val('null')
				$('#area2').children().attr('disabled', 'disabled');
			}
		}
		topic = $(this.options[this.selectedIndex]).html();
	}
	else if (this.id == "area2")
	{
		topic = $(this.options[this.selectedIndex]).html();
	}
	
	generateContacts($(this.options[this.selectedIndex]).attr("value"));
	debug_log("AoR changed to " + topic + ".");
	$('#help-block-topic').html(topic);
}

function emailValidatorHandler(e)
{
	"use strict";
	/**
	 * Regular expression for email.
	 * @const
	 * @type {RegExp}
	 */
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (!filter.test(this.value) && !this.value=='' ) // Email is not valid.
	{
		$('#email').parent().children('span.help-inline').text('Please enter a valid email address');
		$('#email').parent().parent().addClass('error');
	}
	else
	{
		$('#email').parent().children('span.help-inline').text('');
		$('#email').parent().parent().removeClass('error');
	}
}

function generateContacts(area)
{
	"use strict";
	debug_log("Generating contacts for " + area);
	$('.generated_contact').remove();
	if (area == "DOSO")
	{
		$('ul#contact-list').prepend(addContact("Student Life Committee", "Student Senate", "slc@union.rpi.edu", 3));
		$('ul#contact-list').prepend(addContact("", "Dean of Students", "doso@rpi.edu", 2));
		$('ul#contact-list').prepend(addContact("Mark Smith", "Dean of Students", "smith@rpi.edu", 1));
	}
}

function addContact(name, department, email, contact_id)
{
	"use strict";
	// Create checkbox
	var checkbox = $(document.createElement('input'));
	$(checkbox).attr('type', 'checkbox');
	$(checkbox).attr('name', 'optionsCheckboxes');
	$(checkbox).attr('value', contact_id);
	
	// Create hCard with a <span>
	var hCard_org = $(document.createElement('strong'));
	$(hCard_org).addClass('org');
	$(hCard_org).html(department);
	
	var hCard_name = $(document.createElement('span'));
	$(hCard_name).addClass('fn');
	$(hCard_name).html(name);
	
	var hCard_email = $(document.createElement('a'));
	$(hCard_email).addClass('email');
	$(hCard_email).attr("href", "mailto:" + email);
	$(hCard_email).html(email);	
	
	var hCard = $(document.createElement('span'));
	$(hCard).addClass('vcard');
	$(hCard).append(hCard_org);
	$(hCard).append(hCard_name);
	$(hCard).append(hCard_email);
	
	var label = $(document.createElement('label'));
	$(label).append(checkbox);
	$(label).append(hCard);
	
	var contact = $(document.createElement('li'));
	$(contact).addClass('generated_contact');
	$(contact).append(label);
	
	return contact;
}