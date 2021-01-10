<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIROHOSTING S.L.</title>
</head>
<body>
    <h1>S'ha registrat un nou client a la web</h1>
    <h3>Dades del client en qüestió:</h3>
    <ul>
        <li>Nom fiscal: {{$details['nomClient']}}</li>
        <li>Nom comercial: {{$details['nomComercialClient']}}</li>
        <li>Correu electrònic: {{$details['emailClient']}}</li>
        <li>Telèfon: {{$details['telClient']}}</li>
        <li>Població: {{$details['poblacioClient']}}</li>
        <li>Codi postal: {{$details['cpClient']}}</li>
    </ul>
    <p>Que tinguis un bon día.</p>
</body>
</html>