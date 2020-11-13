<?php
	$conn = new MongoClient(); //connect to db
	$listgoods = $conn->myshop->artists; //choose the collection
	$genre = $_POST['genre'];
	$list = $listgoods->find(['genre' => "{$genre}"]); //get elements from colllection
	$out = array(); //array which will contain elements (for json)
	$cnt = 0; //counter for array
	while ($document = $list->getNext()) {               
		//if ($document["genre"] == $_POST['genre']) { //find artists with genre from request
			$out[$cnt] = $document;
			$cnt = $cnt + 1;
		//}
	}
	
	echo json_encode($out);
	$conn->close();
