<?php
    header("Access-Control-Allow-Origin: *");

    // Получите целевой URL из запроса
    $target_url = $_GET['target_url'];

    // Создайте контекст потока с отключенной проверкой SSL
    // Не рекомендуется для продакшена
    $context = stream_context_create([
        "ssl" => [
            "verify_peer" => false,
            "verify_peer_name" => false,
        ],
    ]);

    // Получите содержимое целевого URL
    $content = file_get_contents($target_url, false, $context);

    // Установите заголовок CORS
    header("Access-Control-Allow-Origin: *");

    // Выведите содержимое
    echo $content;
?>