window.onload = function () {
	
	var i;

	//*******************   Creamos los objetos  *********************************
	
	boton0 = new CBotonTipo1("InReleSSR0");
	boton1 = new CBotonTipo1("InReleSSR1");	
	boton2 = new CBotonTipo1("InReleSSR2");	
	boton4 = new CBotonTipo1("InReleSSR4");
	boton5 = new CBotonTipo1("InReleSSR5");	
	boton6 = new CBotonTipo1("InReleSSR6");	

	poten1 = new CPotenciometro("Poten1");
	poten2 = new CPotenciometro("Poten2");
	poten3 = new CPotenciometro("Poten3");
	poten4 = new CPotenciometro("Poten4");			

	tempe1 = new CEstado1("Estado1");
	estado1 = new CEstado1("Estado2");
	estado2 = new CEstado1("Estado3");
	estado3 = new CEstado1("Estado4");
	estado4 = new CEstado1("Estado5");
	estado5 = new CEstado1("Estado6");
	estado6 = new CEstado1("Estado7");
	estado7 = new CEstado1("Estado8");
	estado8 = new CEstado1("Estado9");

	sensor1 = new CSensor("Sensor1");
	sensor2 = new CSensor("Sensor2");
	sensor3 = new CSensor("Sensor3");
	sensor4 = new CSensor("Sensor4");
	sensor5 = new CSensor("Sensor5");
	sensor6 = new CSensor("Sensor6");
	
	contador1 = new CContador("contador1disp");
	contador2 = new CContador("contador2disp");	

	boton7 = new CBotonTipo2("EstAlar1");
	boton8 = new CBotonTipo2("EstAlar2");	
	boton9 = new CBotonTipo2("EstAlar3");	
	
	lista1 = new CListas("Lista1");
	lista2 = new CListas("Lista2");
	lista3 = new CListas("Lista3");
	lista8 = new CListas("Lista8");	
	
	check1 = new CCheck("Check1");
	check2 = new CCheck("Check2");
	check3 = new CCheck("Check3");
	check4 = new CCheck("Check4");			

//  **************************  Inizializamos los objetos  ************************************

	for (i=0;i<=2;i++) {
		window ["boton"+i]["Inicializar"](); 
	}

	for (i=4;i<=6;i++) {
		window ["boton"+i]["Inicializar"](); 
	}

	poten1.Inicializar();
	poten2.Inicializar();
	poten3.Inicializar();
	poten4.Inicializar();		

	tempe1.Inicializar();

	for (i=1;i<=8;i++) {
		window ["estado"+i]["Inicializar"](); 
	}

	for (i=1;i<=6;i++) {
		window ["sensor"+i]["Inicializar"](); 
	}

	boton7.Inicializar();
	boton8.Inicializar();
	boton9.Inicializar();
	
	for (i=1;i<=4;i++) {
		window ["check"+i]["Inicializar"](); 
	}


	lista1.Inicializar();
	lista2.Inicializar();
	lista3.Inicializar();
	lista8.Inicializar();	
			
}