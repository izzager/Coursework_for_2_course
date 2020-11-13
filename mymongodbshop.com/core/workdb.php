<?php

function init(){
	$conn = new MongoClient(); //connect to db
	$listgoods = $conn->myshop->artists; //choose the collection
	$list = $listgoods->find(); //get elements from colllection
	$out = array(); //array which will contain elements (for json)
	$cnt = 0; //counter for array
	while($document = $list->getNext()) {
		$out[$cnt] = $document;
		$cnt = $cnt + 1;
	}
	echo json_encode($out);
	$conn->close();
}



function initArtists() {
	$conn = new MongoClient(); //connect to db
	$collection = $conn->myshop->artists; //choose the collection
	$listgoods = $collection->find(); //get elements from colllection
	
	$param = array("artist"=>1); //sort (artist field)
	$listgoods->sort($param); 
	
	$out = array();
	$cnt = 0;
	while($document = $listgoods->getNext()) {
		$out[$cnt] = $document;
		$cnt = $cnt + 1;
	}
	echo json_encode($out);
	$conn->close();
	
}



function initYears() {
	$conn = new MongoClient(); //connect to db
	$collection = $conn->myshop->artists; //choose the collection
	$listgoods = $collection->find([], ["albums.year" => 1]);
	
	$out = array();
	$cnt = 0;
	while($document = $listgoods->getNext()) {
		$albs = $document["albums"];           //collect years from collection
		foreach($albs as $alb) {
			$out[$cnt] = $alb["year"];
			$cnt = $cnt + 1;
		} 
	}
	sort($out); //sort ascending
	$out = array_unique($out); //delete same elements
	echo json_encode($out);
	$conn->close();
	
}



function initGenres() {
	$conn = new MongoClient(); //connect to db
	$collection = $conn->myshop->artists; //choose the collection
	$listgoods = $collection->find([], ["genre" => 1]);
	
	$out = array();
	$cnt = 0;
	while($document = $listgoods->getNext()) {
		$out[$cnt] = $document["genre"]; //collect genres from collection
		$cnt = $cnt + 1;
	}
	sort($out); //sort ascending
	$out = array_unique($out); //delete same elements
	echo json_encode($out);
	$conn->close();
	
}