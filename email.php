<?php
// email.php - Contact Form Email Handler for Hostinger
// Place this file at: https://cloud.brinis.pro/tools/email.php

// Set CORS headers to allow requests from your domain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Sanitize input data
$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$company = isset($data['company']) ? htmlspecialchars(trim($data['company'])) : '';
$message = htmlspecialchars(trim($data['message']));
$to_email = 'sales@gwings.tech'; // Your Email

// Validate email addresses
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid sender email address']);
    exit();
}

if (!filter_var($to_email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid recipient email address']);
    exit();
}

// Email configuration for notification to you
$subject = "🔔 NEW CONTACT FORM SUBMISSION - " . $name;
$from_email = "noreply@gwings.tech"; // Use your domain email

// Create email headers for notification
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
);

// Create HTML email body for notification to you
$email_body = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0B4BB9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0B4BB9; }
        .value { margin-left: 10px; }
        .message-box { background: white; padding: 20px; border-left: 4px solid #0B4BB9; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .action-box { background: #0B4BB9; color: white; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚨 NEW CONTACT FORM SUBMISSION 🚨</h2>
            <p>Someone is interested in your services!</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Name:</span>
                <span class="value">' . $name . '</span>
            </div>
            <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:' . $email . '" style="color: #0B4BB9; text-decoration: none;">' . $email . '</a></span>
            </div>';

if (!empty($phone)) {
    $email_body .= '
            <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:' . $phone . '" style="color: #0B4BB9; text-decoration: none;">' . $phone . '</a></span>
            </div>';
}

if (!empty($company)) {
    $email_body .= '
            <div class="field">
                <span class="label">Company:</span>
                <span class="value">' . $company . '</span>
            </div>';
}

$email_body .= '
            <div class="message-box">
                <div class="label">Message:</div>
                <div style="margin-top: 10px;">' . nl2br($message) . '</div>
            </div>
            <div class="action-box">
                <p><strong>📞 ACTION REQUIRED:</strong> Reply to this potential client within 24 hours for best conversion rates!</p>
                <p><strong>Quick Reply:</strong> <a href="mailto:' . $email . '?subject=Re: Your inquiry about Wings services" style="color: #93D127; text-decoration: none; font-weight: bold; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 4px; display: inline-block; margin-top: 10px;">📧 Click here to reply directly</a></p>
            </div>
            <div class="footer">
                <p><strong>📧 Sent from Wings Landing Page Contact Form</strong></p>
                <p><strong>⏰ Time:</strong> ' . date('Y-m-d H:i:s T') . '</p>
                <p><strong>🌐 IP Address:</strong> ' . $_SERVER['REMOTE_ADDR'] . '</p>
            </div>
        </div>
    </div>
</body>
</html>';

// Initialize variables for response
$notification_sent = false;
$auto_reply_sent = false;
$errors = [];

// Attempt to send notification email to you
try {
    $notification_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));
    
    if ($notification_sent) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: $name ($email)\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    } else {
        $errors[] = 'Failed to send notification email';
    }
} catch (Exception $e) {
    $errors[] = 'Notification email error: ' . $e->getMessage();
}

// Send auto-reply to the user
if ($notification_sent) {
    try {
        $auto_reply_subject = "✅ Thank you for contacting Wings - We'll be in touch soon!";
        $auto_reply_body = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0B4BB9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .cta { background: #0B4BB9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
                .highlight-box { background: #93D127; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🎉 Thank You for Your Message!</h2>
                    <p>We appreciate you reaching out to Wings</p>
                </div>
                <div class="content">
                    <p>Hi ' . $name . ',</p>
                    <p>Thank you for reaching out to Wings! We have successfully received your message and are excited to learn about your project.</p>
                    
                    <div class="highlight-box">
                        <h3>⚡ What happens next?</h3>
                        <p>Our team will review your message and get back to you within <strong>24 hours</strong> with a detailed response.</p>
                    </div>
                    
                    <p>In the meantime, feel free to:</p>
                    <ul>
                        <li>📱 Explore our portfolio and case studies</li>
                        <li>🎯 Learn more about our development process</li>
                        <li>💡 Think about any additional details for your project</li>
                    </ul>
                    
                    <p>We build <strong>Efficiency</strong> and <strong>Trust</strong> - and we can\'t wait to help bring your ideas to life!</p>
                    
                    <p>Best regards,<br><strong>The Wings Team</strong><br>🚀 Building the future, one project at a time</p>
                    
                    <div style="text-align: center;">
                        <a href="https://gwings.netlify.app" style="background: #0B4BB9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; font-weight: bold;">🔗 Visit Our Website</a>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: #f0f8ff; border-radius: 5px; font-size: 12px; color: #666;">
                        <p><strong>Need immediate assistance?</strong> Feel free to reply to this email directly.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>';
        
        $auto_reply_headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: Wings Team <' . $from_email . '>',
            'Reply-To: ' . $to_email,
            'X-Mailer: PHP/' . phpversion()
        );
        
        $auto_reply_sent = mail($email, $auto_reply_subject, $auto_reply_body, implode("\r\n", $auto_reply_headers));
        
        if (!$auto_reply_sent) {
            $errors[] = 'Failed to send auto-reply email';
        }
    } catch (Exception $e) {
        $errors[] = 'Auto-reply error: ' . $e->getMessage();
    }
}

// Log any errors
if (!empty($errors)) {
    $error_log = date('Y-m-d H:i:s') . " - Errors: " . implode(', ', $errors) . "\n";
    file_put_contents('contact_errors.txt', $error_log, FILE_APPEND | LOCK_EX);
}

// Send response
if ($notification_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Email sent successfully',
        'notification_sent' => $notification_sent,
        'auto_reply_sent' => $auto_reply_sent
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again later.',
        'errors' => $errors
    ]);
}
?>