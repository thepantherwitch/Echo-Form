/**
 * Serves HTML of the form to the client.
 * @param {object} e - Event parameter that can contain information about any URL parameters.
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Form').setTitle('Echo-Form');
}

/**
 * Processes the form submission and sends out emails based on the form data.
 * @param {object} formObject - The object containing the submitted form data.
 */
function processForm(formObject) {
  try {
    // Placeholder emails should be replaced with actual email addresses before use
    var submitterEmail = formObject.email || "PLACEHOLDER_SUBMITTER_EMAIL";
    var echoEmail = "PLACEHOLDER_ECHO_EMAIL";

    // Generate today's date in a readable format
    var today = new Date();
    var dateString = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear(); // Formats the date as MM/DD/YYYY

    // Email subject line
    var submitterSubject = "Your Experience Log and Support Guide - " + dateString;

    // Impact scale suggestions - these are detailed suggestions based on the impact level selected
    var impactScaleSuggestions = {
      // Add or update impact scale suggestions as needed
      // This example includes suggestions for 'Personal Impact'
      '3 - Moderate': "Your guidance for a Moderate impact...",
      // Continue with other impact levels...
    };

    // Fetching and using suggestions based on form input
    var impactLevel = formObject.impactLevel; // This should match one of the keys in `impactScaleSuggestions`
    var impactGuidance = impactScaleSuggestions[impactLevel] || "Not provided";

    // Email body for the submitter
    var emailBody = "Your customized email body here...";

    // Email body for the echo form administrator
    var echoBodyHTML = "A new experience log has been submitted...";

    // Send email to the form submitter
    MailApp.sendEmail(submitterEmail, submitterSubject, '', {
      htmlBody: emailBody,
      name: 'Echo-Form'
    });

    // Send email to the echo form administrator
    MailApp.sendEmail(echoEmail, "Echo Form Submission Notification - " + dateString, '', {
      htmlBody: echoBodyHTML,
      name: 'Echo-Form'
    });

    return HtmlService.createHtmlOutput("Form submitted successfully. Thank you!");
  } catch (error) {
    console.error("Error processing form submission: " + error.toString());
    return HtmlService.createHtmlOutput("An error occurred while processing your form submission. Please try again later.");
  }
}
