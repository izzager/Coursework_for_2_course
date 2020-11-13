<?php

require_once '../vendor/autoload.php';

use GraphAware\Neo4j\Client\ClientBuilder;  //подключаем библиотеку для работы с Neo4j

	$client = ClientBuilder::create()
			->addConnection('bolt', 'bolt://neo4j:p4ssw0rd@localhost:7687')
			->build(); //создаем соединение с базой данных
	$query = 'MATCH (n:Artist)-[:SING]->(nalbum:Album) WHERE nalbum.year = ' . $_POST['year'] . ' RETURN id(n) as idArtist, id(nalbum) as idAlbum, n.genre as genre, n.name as artist,nalbum.name as albumName, nalbum.year as year, nalbum.cost as cost, nalbum.songs as songs'; //делаю запрос на языке Cypher
	$result = $client->run($query); //посылаю запрос на базу данных и получаю результат
	//в качестве результата получаем все альбомы с их артистами, у которых год равен году из POST-запроса
	$cnt = 0; //счетчик
	$out = []; //массив, в который собираем результат запроса в рабочий формат
	foreach ($result->getRecords() as $record) {
		$out[$cnt] = [ idArtist => $record->value('idArtist'),
									idAlbum => $record->value('idAlbum'),
									genre => $record->value('genre'), 
									artist => $record->value('artist'), 
									albumName => $record->value('albumName'), 
									year => $record->value('year'),
									cost => $record->value('cost'),
									songs => $record->value('songs')
								];
		$cnt++;
	}
	echo json_encode($out);
