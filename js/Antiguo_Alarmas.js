// Presentar el POPUP de la lista de eventos cuando se presiona el boton de Dias.
function ActivaPopUpDias(e) {
	
	var XPopUp, YPopUp;
	
	BotAlrEv=e.target;
	
	document.getElementById("PopUpDias").style.display="block";
	
	XPopUp=e.clientX-50;  //document.getElementById("BotonAlrEvento").offsetLeft;
	YPopUp=e.clientY-50; // document.getElementById("BotonAlrEvento").offsetTop;	
	
	document.getElementById("PopUpDias").style.left=XPopUp + "px";		
	document.getElementById("PopUpDias").style.top=YPopUp + "px";
	
}
// Presentar el POPUP de la lista de eventos cuando se presiona el boton de EVENTOS.
function ActivaPopUpEventos(e) {
	var XPopUp, YPopUp;
	
	BotAlrEv=e.target;
	
	document.getElementById("PopUpEventos").style.display="block";
	
	XPopUp=e.clientX-50;  //document.getElementById("BotonAlrEvento").offsetLeft;
	YPopUp=e.clientY-50; // document.getElementById("BotonAlrEvento").offsetTop;	
	
	document.getElementById("PopUpEventos").style.left=XPopUp + "px";		
	document.getElementById("PopUpEventos").style.top=YPopUp + "px";
	
}

// Presentar el POPUP de la lista de EJECUCIONES cuando se presiona el boton de EJECUTAR.
function ActivaPopUpEjecuta(e) {
	var XPopUp, YPopUp;
	
	BotAlrEv=e.target;
	
	document.getElementById("PopUpEjecuta").style.display="block";
	
	XPopUp=e.clientX-50;  //document.getElementById("BotonAlrEvento").offsetLeft;
	YPopUp=e.clientY-50; // document.getElementById("BotonAlrEvento").offsetTop;	
	
	document.getElementById("PopUpEjecuta").style.left=XPopUp + "px";		
	document.getElementById("PopUpEjecuta").style.top=YPopUp + "px";
	
}

//Desactivar el POPUP de EVENTOS al sacar el puntero de la ventana.
function DesactivaPopUpEventos(e){
	var IdE;
	
	IdE=e.target;

	if (IdE.id=="PopUpEventos") {
		document.getElementById("PopUpEventos").style.display="none";
	}	
}

//Desactivar el POPUP de EJECUTAR al sacar el puntero de la ventana.
function DesactivaPopUpEjecuta(e){
	var IdE;
	
	IdE=e.target;

	if (IdE.id=="PopUpEjecuta") {
		document.getElementById("PopUpEjecuta").style.display="none";
	}	
}

//Desactivar el POPUP de la Lista al sacar el puntero de la ventana.
function DesactivaPopUpLista(e){
	var IdE;
	
	IdE=e.target;

	if (IdE.id=="PopUpLista") {
		document.getElementById("PopUpLista").style.display="none";
	}	
}

// Se ha seleccionado un Dia
function CambioAlrDias(NEvnt,TEvnt) {

    document.getElementById("PopUpDias").style.display="none";

	document.getElementById("BotonAlrDias").innerHTML=TEvnt;
	
}

// Se ha seleccionado un Evento
function CambioAlrEvento(NEvnt,TEvnt) {

    document.getElementById("PopUpEventos").style.display="none";

	document.getElementById("BotonAlrEvento").innerHTML=TEvnt;
}

// Se ha seleccionado un Ejecutar
function CambioAlrEjecuta(NEvnt,TEvnt) {

    document.getElementById("PopUpEjecuta").style.display="none";

	document.getElementById("BotonAlrEjecuta").innerHTML=TEvnt;
}

