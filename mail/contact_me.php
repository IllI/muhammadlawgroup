<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = !empty($_POST['phone']) ? strip_tags(htmlspecialchars($_POST['phone'])) : 'Not provided';
$message = strip_tags(htmlspecialchars($_POST['message']));
$consent_messages = isset($_POST['consentMessages']) ? strip_tags(htmlspecialchars($_POST['consentMessages'])) : 'No';
$consent_policies = isset($_POST['consentPolicies']) ? strip_tags(htmlspecialchars($_POST['consentPolicies'])) : 'No';
   
// Create the email and send the message
$to = 'info@muhammadlawgroup.com, attorneyfuelgbp@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n".
"Here are the details:\n\n".
"Name: $name\n".
"Email: $email_address\n".
"Phone: $phone\n".
"Agreed to receive messages: $consent_messages\n".
"Agreed to policies: $consent_policies\n\n".
"Message:\n$message";
$headers = "From: info@muhammadlawgroup.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: info@muhammadlawgroup.com";
//mail($to,$email_subject,$email_body,$headers);
if(@mail($to,$email_subject,$email_body,$headers))
{
  echo 'Mail Sent Successfully';
}else{
  echo 'Mail Not Sent';
}
return true;         
?>
