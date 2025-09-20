<?php
if ($_POST && isset($_POST["userPhone"]) && $_POST["userPhone"] !== "" && isset($_POST["userName"]) && $_POST["userName"] !== "") {
    $cartData = $_POST["cartData"] ?? "";

    if ($cartData) {
        $cartArray = json_decode($cartData, true);
        if ($cartArray && is_array($cartArray)) {

            $orderDetails = "";
            $totalSum = 0;

            foreach ($cartArray as $item) {
                $name = htmlspecialchars($item["title"] ?? "—");
                $price = floatval($item["pricePerItem"] ?? 0);
                $size = htmlspecialchars($item["size"] ?? "—");
                $quantity = intval($item["quantity"] ?? 1);
                $total = floatval($item["total"] ?? ($price * $quantity));

                $totalSum += $total;

                $orderDetails .= "Товар: <b>$name</b>\n";
                $orderDetails .= "Розмір: <b>$size</b>\n";
                $orderDetails .= "Кількість: <b>$quantity</b>\n";
                $orderDetails .= "Ціна за одиницю: <b>$price грн</b>\n";
                $orderDetails .= "Разом за товар: <b>$total грн</b>\n";
                $orderDetails .= "--------------------\n";
            }

            // Дані користувача
            $userPhone = htmlspecialchars($_POST["userPhone"]);
            $userName = htmlspecialchars($_POST["userName"]);
            $websiteURL = $_SERVER["HTTP_REFERER"] ?? "невідомо";

            // Telegram API
            // $token = "6502486274:AAFqSGBvtvutHB8be-wTlsK3ETbssmLSEWo";
            // $chat_id = "1066741091";
            $token = "7705474183:AAGSKQhfCZMqTiwtribQO79-eEVeJxD1tls";
            $chat_id = "-4890231357";

            // Повідомлення
            $message = "<b>Заявка з сайту: $websiteURL</b>\n\n";
            $message .= "***<b>Форма замовлення</b>***\n\n";
            $message .= "Ім'я замовника: <b>$userName</b>\n";
            $message .= "Телефон: <b>$userPhone</b>\n\n";
            $message .= "===== Дані замовлення =====\n\n";
            $message .= $orderDetails;
            $message .= "\n<b>Загальна сума замовлення: $totalSum грн</b>\n";

            // Кодуємо і відправляємо
            $textEncoded = urlencode($message);
            $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=$textEncoded&parse_mode=HTML";

            file_get_contents($urlQuery);

            // Перенаправлення після успіху
            header("Location: index.html");
            exit();
        }
    }
}
?>
