<?php
  $pageHeaderHTML = "<!DOCTYPE html> \n";
  $pageHeaderHTML .= '<html lang="et">'. "\n";
  $pageHeaderHTML .= "<head> \n";
  $pageHeaderHTML .= "\t" .'<meta charset="utf-8">' ."\n \t<title> Urmas Kirsipuu - KUIKB-2 Iseseisev töö KULDVILLAK</title> \n";
  $pageHeaderHTML .= "\t" ."<style> \n";
  $pageHeaderHTML .= "\t }";
  $pageHeaderHTML .= "</style> \n";
  if(isset($toScript)){$pageHeaderHTML .=$toScript;
  } 
  $pageHeaderHTML .= "</head> \n";
  echo $pageHeaderHTML;
