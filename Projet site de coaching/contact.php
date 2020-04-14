<?php

if(!empty($_POST)){
$bdd=new PDO("mysql:host=localhost;dbname=Comment;charset=utf8;","root","troiswa");
$idnom = htmlspecialchars($_POST["nom"],ENT_QUOTES);
$mail = htmlspecialchars($_POST["emailad"],ENT_QUOTES);
$idcontent = htmlspecialchars($_POST["contactme"],ENT_QUOTES);
$result = $bdd -> query("INSERT INTO Comment VALUES ('".$idnom."',NOW(),'".$idcontent."',$id)");
  header('Location: acceuil.html');
  exit();
}

include "template/contact.phtml";

















 ?>
