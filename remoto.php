<?php
	$pdo = new PDO("mysql:host=localhost;dbname=webCafe", "root", "",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );

	$end = $_POST['regsLimit'];
	$page = $_POST['page'];

	$sql = $pdo->prepare("Select numLinha, plano From webcafe_modTelefonia_linhas");
	$sql->execute();
	$total = $sql->rowCount();

	$start = $page - 1;
	$start = $start * $end;

	$limit = $pdo->prepare("Select numLinha, plano From webcafe_modTelefonia_linhas Limit $start, $end");
	$limit->execute();

	$pages = $total/$end;

	$res['actualPage'] = $page;
	$res['maxRegsPage'] = 6;
	$res['totalPages'] = ceil($pages);
	$res['totalRegs'] = $total;
	$res[1] = $limit->fetchAll(PDO::FETCH_OBJ);

	echo json_encode($res);
?>
