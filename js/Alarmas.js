function cambiacontrolevento(evsel) {
 	var value = evsel.options[evsel.selectedIndex].value;
 	var i;
 	
 	for (i=1;i<=6;i++){
 		document.getElementById("CajaEventos"+i).style.display="none"; 		
 	}
 	
 	document.getElementById("CajaEventos"+value).style.display="block"; 
}
