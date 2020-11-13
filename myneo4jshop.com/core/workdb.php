<?php

require_once '../vendor/autoload.php';

use GraphAware\Neo4j\Client\ClientBuilder; //подключаем библиотеку для работы с Neo4j

function init(){
	$client = ClientBuilder::create()
			->addConnection('bolt', 'bolt://neo4j:p4ssw0rd@localhost:7687')
			->build(); //создаем соединение с базой данных
	$query = 'MATCH (n:Artist)-[:SING]->(nalbum) RETURN id(n) as idArtist, id(nalbum) as idAlbum, n.genre as genre, n.name as artist,nalbum.name as albumName, nalbum.year as year, nalbum.cost as cost, nalbum.songs as songs'; //делаю запрос на языке Cypher
	//в кач-ве рез-та приходят все альбомы с их исполнителями
	$result = $client->run($query); //посылаю запрос на базу данных и получаю результат
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
	array_reverse($out);
	echo json_encode($out);
}



function initArtists() {
	$client = ClientBuilder::create()
	    ->addConnection('bolt', 'bolt://neo4j:p4ssw0rd@localhost:7687')
	    ->build();
	$query = 'MATCH (n:Artist)-[:SING]->(nalbum) RETURN id(n) as idArtist, id(nalbum) as idAlbum, n.genre as genre, n.name as artist,nalbum.name as albumName, nalbum.year as year, nalbum.cost as cost, nalbum.songs as songs ORDER BY n.name';
	$result = $client->run($query);
	//в кач-ве рез-та приходят все альбомы с их исполнителями, при этом отсортированные по имени исполнителя
	$cnt = 0;
	$listgoods = [];
	foreach ($result->getRecords() as $record) {
	  $listgoods[$cnt] = [ idArtist => $record->value('idArtist'),
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

	//нужно из полученных данных сделать новый массив, в котором альбомы будут объединены
	//если у них будут одинаковые артисты
	$out = []; 
	$cnt = 0; //счетчик альбомов каждого исполнителя
	$i = 0; //счетчик исполнителей
	$tmpArtist = ''; //значение предыдущего артиста
	foreach ($listgoods as $good) {
		if ($tmpArtist != '' && $tmpArtist != $good[artist]) { //если текущей артист отличается от предыдущего 
			$i++;                                                //артисты отсортированы по алфавиту
			$cnt = 0;
		}
		$out[$i][$cnt] = $good; //собираем все альбомы i-того артиста в элемент $out[$i]
		$cnt++; //увеличиваем счетчик альбомов i-того артиста
		$tmpArtist = $good[artist]; //сохраняем имя артиста
	}

	echo json_encode($out);
}



function initYears() {
	$client = ClientBuilder::create()
	    ->addConnection('bolt', 'bolt://neo4j:p4ssw0rd@localhost:7687')
	    ->build();
	$query = 'MATCH (nalbum:Album) RETURN nalbum.year as year ORDER BY nalbum.year';
	$result = $client->run($query);
	//в качестве результата возвращается отсортированный в порядке возрастания массив всех годов
	//которые только есть в базе данных в поле "year" альбома
	$cnt = 0;
	$years = [];
	foreach ($result->getRecords() as $record) {
	  $years[$cnt] = $record->value('year');
	  $cnt++;
	}
	$years = array_unique($years); //удаляем повторяющиеся элементы
	echo json_encode($years);
}



function initGenres() {
	$client = ClientBuilder::create()
	    ->addConnection('bolt', 'bolt://neo4j:p4ssw0rd@localhost:7687')
	    ->build();
	$query = 'MATCH (n:Artist) RETURN n.genre as genre ORDER BY n.genre';
	$result = $client->run($query);
	//в качестве результата возвращается отсортированный в порядке возрастания массив всех жанров
	//которые только есть в базе данных в поле "genre" артиста
	$cnt = 0;
	$jenres = [];
	foreach ($result->getRecords() as $record) {
	  $jenres[$cnt] = $record->value('genre');
	  $cnt++;
	}
	$jenres = array_unique($jenres); //удаляем повторяющиеся элементы

	echo json_encode($jenres);
}