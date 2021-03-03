<?php
header('Content-type: application/json; charset=utf-8');

// JSONデータを受け取る
$rawPaylaod = file_get_contents('php://input');

try {
  $payload = json_decode($rawPaylaod, true);
} catch (Exception $e) {
  http_response_code (404);
  die(json_encode(['error' => 'Payload problem.']));
}

// JSONファイルへ出力
try {
  $directoryPath = 'static/data'; 
  $filePath = $directoryPath . '/output.json';

  if (!file_exists($directoryPath)) {
    mkdir($directoryPath, 0777);
  }
  if (!file_exists($filePath)) {
    touch($filePath);
  }
  file_put_contents($filePath, json_encode($payload['data'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
} catch (Exception $e) {
  http_response_code (404);
  die(json_encode(['error' => 'File output problem.']));
}

// 出力結果を返す
echo json_encode([
  'status' => 'success',
  'data' => $payload,
]);