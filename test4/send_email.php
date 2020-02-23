<?php
error_reporting(0);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_REQUEST['action']) && !empty($_REQUEST['action'])){
	switch($_POST['action']) {
		case 'contactForm':
            $email = $_POST['email'];
            if(preg_match("/^([a-zA-Z0-9_.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+/", $email)){
                list($username,$domain)=explode('@',$email);
                if(!checkdnsrr($domain,'MX')) {
                    echo 'error';
                } else {
                    require 'phpmailer/Exception.php';
                    require 'phpmailer/PHPMailer.php';
                    require 'phpmailer/SMTP.php';
                
                    $name=$_POST['name'];
                    $company=$_POST['company'];
                    $message=$_POST['message'];
                    
                    $html='<p style="padding:20px 30px; margin:0 0 30px 0;"><img src="https://wakeup.zone/img/logo-email.png" alt="WakeUp Zone" style="display:block; width:250px;"></p>';
                    $html.='<p><strong>Name:</strong> ';
                    $html.=$name.'</p>';
                    $html.='<p><strong>E-mail:</strong> ';
                    $html.=$email.'</p>';
                    $html.='<p><strong>Company:</strong> ';
                    $html.=$subject.'</p>';
                    $html.='<p><strong>Message:</strong> ';
                    $html.=$message.'</p>';
            
                    $mail = new PHPMailer;
                    $mail->CharSet = 'UTF-8';
                    //$mail->isSMTP();
                    //$mail->SMTPDebug = 0;
                    //$mail->Debugoutput = 'html';
                    
                    /*$mail->Host = "";
                    $mail->Port = 587;
                    $mail->SMTPAuth = true;
                    $mail->Username = "";
                    $mail->Password = "";*/
                    $mail->setFrom('dusan@suntoken.io', 'WakeUp Zone');
                    $mail->addReplyTo($email);
                    $mail->addAddress('dusan@suntoken.io');
                    $mail->addAddress('vladansm@suntoken.io');
                    $mail->Subject = "WebSite message from ".$name;
                    $mail->msgHTML($html);
                    $mail->AltBody = $html;						
                    if (!$mail->send()) {
                        echo "Mailer Error: " . $mail->ErrorInfo;
                    } else {
                        echo 'send';
                    }
                }
             } else {
                 echo 'error';
             }
		break;
	}
}
?>