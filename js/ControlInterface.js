	var IdMenuSel;
 	var IdTimer1="";
	var PosPanelInicial, BackPosPanelInicial;
	var DireccSelecc;
	var PanelAnterior=1;
	var PanelEnUso=1;
	var TTransicionPanel;
 	
 	// Cuando se selecciona alguno de los menus de la izquierda llamamos a la correspondiente
 	// funcion de efecto de cambio con rebote.
 	function pulsamenu(valor) {

		TTransicionPanel=0;
		PosPanelInicial=0;
		BackPosPanelInicial=PosPanelInicial;		

		if (IdTimer1=="") {
			DireccSelecc=0;
			IdMenuSel=valor.id;
			PanelEnUso=IdMenuSel.substr (7, 1);
			if (PanelEnUso > PanelAnterior) {
				IdTimer1 = setInterval("animselmenudown()",10);
			} else {
				IdTimer1 = setInterval("animselmenuup()",10);
			}
		}

	}
	
	// Efecto del cambio de menu hacia abajo con efecto rebote.
	function animselmenudown (){
 		var t;
 		var YMenuSel = document.getElementById(IdMenuSel).offsetTop;
 		
 		    
 		    // Movimiento del fondo rojo en la seleccion del menu
  			if (DireccSelecc==0) {
	 			if (document.getElementById("menuseleccion").offsetTop<(YMenuSel+10)) {
					t=document.getElementById("menuseleccion").offsetTop;
					document.getElementById("menuseleccion").style.top=t+4+"px";
				}else {DireccSelecc=1};
			}
 			if (DireccSelecc==1) {	
				if (document.getElementById("menuseleccion").offsetTop>(YMenuSel-7)){
					t=document.getElementById("menuseleccion").offsetTop;
					document.getElementById("menuseleccion").style.top=t-2+"px";
				} else {
					clearInterval(IdTimer1);
					document.getElementById('Panel'+PanelEnUso).style.opacity = 0;
					document.getElementById('Panel'+PanelEnUso).style.display = '';					

					//Llamada a la funcion del cambio de panel
					IdTimer1 = setInterval("TransicionPanel()",10);
				}
			}
			

	}
	
	// Efecto del cambio de menu hacia arriba con efecto rebote.	
	function animselmenuup (){
 		var t;
 		var YMenuSel = document.getElementById(IdMenuSel).offsetTop;
 		
  			if (DireccSelecc==0) {
	 			if (document.getElementById("menuseleccion").offsetTop>(YMenuSel-25)) {
					t=document.getElementById("menuseleccion").offsetTop;
					document.getElementById("menuseleccion").style.top=t-4+"px";
				}else {DireccSelecc=1};
			}
 			if (DireccSelecc==1) {	
				if (document.getElementById("menuseleccion").offsetTop<(YMenuSel-7)){
					t=document.getElementById("menuseleccion").offsetTop;
					document.getElementById("menuseleccion").style.top=t+2+"px";
				} else {
					clearInterval(IdTimer1);
					document.getElementById('Panel'+PanelEnUso).style.opacity = 0;
					document.getElementById('Panel'+PanelEnUso).style.display = '';					
					
					//Llamada a la funcion del cambio de panel
					IdTimer1 = setInterval("TransicionPanel()",10);
				}
			
			
			}
	
	}
	
	// Al cambiar de panel, esta es la funcion que hace la transicion de uno a otro.
	function TransicionPanel () {

			// Transicion del cambio de panel

			if (TTransicionPanel<30) {

				TTransicionPanel+=1;
				document.getElementById('Panel'+PanelAnterior).style.left = PosPanelInicial + TTransicionPanel + "px";
				document.getElementById('Panel'+PanelAnterior).style.opacity = 1-((1/30)*TTransicionPanel);				

				document.getElementById('Panel'+PanelEnUso).style.left = ((PosPanelInicial + 30) -TTransicionPanel) + "px";
				document.getElementById('Panel'+PanelEnUso).style.opacity = (1/30) * TTransicionPanel;				

			}else { 
				
				clearInterval(IdTimer1);
				document.getElementById('Panel'+PanelAnterior).style.left = BackPosPanelInicial ;
				document.getElementById('Panel'+PanelAnterior).style.display = 'none';
				PosPanelInicial=BackPosPanelInicial;					
				PanelAnterior=PanelEnUso;	
				IdTimer1="";	
			}
						

	}
	
	// Los Popup que salen de informacion 
	function PopupInforma (evento, cadena) {
		evento = evento || window.event;

		document.getElementById("Popup1").innerHTML = cadena;	
		document.getElementById("Popup1").style.display = "";	

		document.getElementById("Popup1").style.left=evento.clientX + "px";		
		document.getElementById("Popup1").style.top=evento.clienty + "px";

			
		
	}
	// La que se encarga de guardar el Pupup
	function PopupInformaOut () {
		document.getElementById("Popup1").style.display = "none";					
	}
	
	// Se encarga de indicar como ha contestado el equipo 'Bien, Sin conxion o sin Respuesta'
	// y pintar el resultado.
	function TipoRespuesta (valor){
		
		// La operacion de conexion y respuesta a sido satisfactoria.
		if (valor==0) {
			EquipoConexion=0; // En reposo		
			document.getElementById("EstadoConexion").innerHTML="Completado";
			document.getElementById("EstadoConexion").style.color="green";	
    		document.getElementById("EstadoConexion").style.backgroundImage="url('images/Conectado.gif')";					
		}

		// No se logró conectar con el equipo.
		if (valor==1) {
			EquipoConexion=1;				
			document.getElementById("EstadoConexion").innerHTML="Sin conexion";
			document.getElementById("EstadoConexion").style.color="red";						
	    	document.getElementById("EstadoConexion").style.backgroundImage="none";
		}

		// Se conecto pero el equipo no contesto.
		if (valor==2) {
			EquipoConexion=2;				
			document.getElementById("EstadoConexion").innerHTML="Sin respuesta";
			document.getElementById("EstadoConexion").style.color="orange";						
    		document.getElementById("EstadoConexion").style.backgroundImage="url('images/Conectado.gif')";					
		}

		if (valor==3) {
			EquipoConexion=3;				
		}

	}	
	
	
 //Pone la capa delantera de 'En proceso.." bloqueando el resto.
  	function BloqueoInterface(valor) {
	    if (valor==1) {
			document.getElementById("EstadoConexion").style.display="none";	    	
	    	document.getElementById("bloqueo").style.display="";
	    	document.getElementById("BloqueoProgreso").style.backgroundImage="url('images/wait.gif')";
    		document.getElementById("BloqueoProgreso").innerHTML='En progreso..';    		
			document.getElementById("BloqueoProgreso").style.color="white";
		}else{
	    	document.getElementById("bloqueo").style.display="none";
			document.getElementById("EstadoConexion").style.display="";	    	
	    }		
 	}
