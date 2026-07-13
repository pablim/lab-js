<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/exemplesComponentes/recurrency/src/autoLoader.php";

use exemplesComponentes\recurrency\src\RecurrencyController;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = $_POST;

    if (empty($data)) {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
    }
}

$recurrencyController = new RecurrencyController();

$recurrencyController->save($data);
