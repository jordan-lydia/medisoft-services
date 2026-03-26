<?php
header('Content-Type: application/json');

// Configuration des emails de destination
$recipientEmails = ['medisoftservice01@gmail.com', 'medisoftservices01@gmail.com'];

// Fonction pour envoyer l'email
function sendEmail($data, $file, $requestType) {
    global $recipientEmails;
    
    $typeLabel = $requestType === 'partnership' ? 'Demande de Partenariat' : 'Demande de Contrat';
    $typeDetail = $requestType === 'partnership' ? $data['partnership_type'] : $data['contract_type'];
    
    // Sujet de l'email
    $subject = $typeLabel . ' - ' . $data['fullname'];
    
    // Construction du message HTML
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0a192f, #1a3a5f); color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
            .info-row { margin-bottom: 15px; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #00bcd4; }
            .label { font-weight: bold; color: #0a192f; display: inline-block; width: 140px; }
            .description { background: white; padding: 15px; border-radius: 10px; margin-top: 15px; }
            .attachment-info { background: #eef2ff; padding: 12px; border-radius: 10px; margin-top: 15px; }
            .badge { display: inline-block; background: #00bcd4; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 15px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>📋 {$typeLabel}</h2>
                <p>Nouvelle soumission reçue via le site Medisoft Services</p>
            </div>
            <div class='content'>
                <div class='badge'>📅 " . date('d/m/Y H:i:s') . "</div>
                <div class='info-row'><span class='label'>👤 Nom :</span> " . htmlspecialchars($data['fullname']) . "</div>
                <div class='info-row'><span class='label'>🏢 Entreprise :</span> " . htmlspecialchars($data['company']) . "</div>
                <div class='info-row'><span class='label'>📧 Email :</span> " . htmlspecialchars($data['email']) . "</div>
                <div class='info-row'><span class='label'>📞 Téléphone :</span> " . htmlspecialchars($data['phone']) . "</div>
                <div class='info-row'><span class='label'>📌 Type :</span> " . htmlspecialchars($typeDetail) . "</div>
                <div class='description'>
                    <strong>📝 Description :</strong><br>
                    " . nl2br(htmlspecialchars($data['description'])) . "
                </div>
                <div class='attachment-info'>
                    <strong>📎 Document joint :</strong> " . htmlspecialchars($file['name']) . "
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Lire le contenu du fichier PDF
    $pdfContent = file_get_contents($file['tmp_name']);
    $pdfContentEncoded = chunk_split(base64_encode($pdfContent));
    
    // Créer une boundary unique
    $boundary = md5(time());
    
    // Headers pour l'email avec pièce jointe
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: Medisoft Services <noreply@medisoft-services.com>\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    // Corps de l'email avec pièce jointe
    $emailBody = "--$boundary\r\n";
    $emailBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $emailBody .= $message . "\r\n\r\n";
    $emailBody .= "--$boundary\r\n";
    $emailBody .= "Content-Type: application/pdf; name=\"" . $file['name'] . "\"\r\n";
    $emailBody .= "Content-Transfer-Encoding: base64\r\n";
    $emailBody .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n";
    $emailBody .= $pdfContentEncoded . "\r\n\r\n";
    $emailBody .= "--$boundary--";
    
    // Envoyer l'email à tous les destinataires
    $success = true;
    foreach ($recipientEmails as $recipient) {
        if (!mail($recipient, $subject, $emailBody, $headers)) {
            $success = false;
        }
    }
    
    return $success;
}

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Récupérer les données du formulaire
        $requestType = $_POST['request_type'];
        
        $data = [
            'fullname' => $_POST['fullname'] ?? '',
            'company' => $_POST['company'] ?? '',
            'email' => $_POST['email'] ?? '',
            'phone' => $_POST['phone'] ?? '',
            'description' => $_POST['description'] ?? ''
        ];
        
        if ($requestType === 'partnership') {
            $data['partnership_type'] = $_POST['partnership_type'] ?? '';
        } else {
            $data['contract_type'] = $_POST['contract_type'] ?? '';
        }
        
        // Vérifier si un fichier a été uploadé
        if (!isset($_FILES['document']) || $_FILES['document']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('Aucun fichier PDF n\'a été joint ou le fichier est trop volumineux.');
        }
        
        $file = $_FILES['document'];
        
        // Vérifier que c'est bien un PDF
        if ($file['type'] !== 'application/pdf') {
            throw new Exception('Le fichier doit être au format PDF.');
        }
        
        // Vérifier la taille (max 10MB)
        if ($file['size'] > 10 * 1024 * 1024) {
            throw new Exception('Le fichier ne doit pas dépasser 10 Mo.');
        }
        
        // Envoyer l'email
        $emailSent = sendEmail($data, $file, $requestType);
        
        if ($emailSent) {
            echo json_encode([
                'success' => true,
                'message' => '✅ Votre demande a été envoyée avec succès ! Réponse sous 24h.'
            ]);
        } else {
            throw new Exception('Erreur lors de l\'envoi de l\'email.');
        }
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => '❌ ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => '❌ Méthode non autorisée.'
    ]);
}
?>
