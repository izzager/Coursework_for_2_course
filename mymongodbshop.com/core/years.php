<?php
	$conn = new MongoClient(); //подлючаемся к базе данных
	$listgoods = $conn->myshop->artists; //выбираем коллекцию 
	$list = $listgoods->find();
	$out = array(); //array which will contain elements (for json)
	$cnt = 0; //counter for array
	while($document = $list->getNext()) {
		$albs = $document["albums"];
		foreach($albs as $alb) {                     //find albums with year from request
			if ($alb["year"] == $_POST['year']) {
				$tmp = array();                      //mongodb trouble
				$tmp[0] = $document["_id"];
				$tmp[1] = $document["artist"];
				$tmp[2] = $alb;
				$out[$cnt] = $tmp;
				$cnt = $cnt + 1;
			}
		} 
	}
	echo json_encode($out);
	$conn->close();
