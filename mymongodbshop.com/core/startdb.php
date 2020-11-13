<?php
//в зависимости от запроса запускаем функцию

$action = $_POST['action'];

require_once 'workdb.php';

switch ($action) {
    case 'init':
        init(); //показ всех альбомов
        break;
    case 'initArtists':
        initArtists(); //альбомы рассортированы по артистам
        break;
    case 'initYears':
        initYears(); //альбомы рассортированы по годам
        break;
    case 'initGenres':
        initGenres(); //альбомы рассортированы по жанрам
        break;
}