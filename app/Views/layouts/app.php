<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= esc($title ?? 'Societech Financial and Monitoring') ?></title>
  <link rel="stylesheet" href="<?= base_url('legacy/assets/css/main.css') ?>">
  <link rel="stylesheet" href="<?= base_url('legacy/assets/css/background.css') ?>">
</head>
<body>
  <?= $this->renderSection('content') ?>
</body>
</html>
