// Variables Globales 
var ControlMultiPanel=1;
var IdTimer2;

// Funcion que ACTIVA el timer para realizar la secuencia de recepcion del panel indicado en 'PanelEnUso'.
function RecibirPanel () {
	
	ControlMultiPanel=1;
	switch (parseInt(PanelEnUso)) {		
		case 1:
			IdTimer2 = setInterval("RecepcionPanel1()",50);
		break;
		
		case 2:
			IdTimer2 = setInterval("RecepcionPanel2()",50);
		break;
		
		case 3:
			IdTimer2 = setInterval("RecepcionPanel2()",50);
		break;		
		
	}			
}

//Funcion que gestiona la secuencia de recepcion del panel 1.
function RecepcionPanel1() {

		// Se continua con la secuencia solo si esta en modo reposo.
		if (EquipoConexion==0) {
	
			// Las diferentes recepciones que se hacen del Panel 1.
			switch(ControlMultiPanel) {
				case 1:
					BloqueoInterface(1);
					// Se envia la orden de leer estado de Reles y SSRs
					EnvioTrama("id=control&nt=25&cm=13");			
					ControlMultiPanel++;
				break;	
				case 2:
					// Rellena la parte de los Outputs
					RellenaPanel1(1);
					// Se envia la orden de leer el dimmer1
					EnvioTrama("id=control&nt=25&cm=25&vl1=0");			
					ControlMultiPanel++;
				break;
				case 3:
					// Rellena el dimmer1
					RellenaPanel1(2);
				
					// Se envia la orden de leer el dimmer2
					EnvioTrama("id=control&nt=25&cm=25&vl1=1");			
					ControlMultiPanel++;				
				break;
		
				case 4:					
					// Rellena el dimmer2
					RellenaPanel1(3);
			
					clearInterval(IdTimer2);
					ControlMultiPanel=1;
					
					BloqueoInterface(0);					
				break;
			}
		}
		
		// Paramos el timer si ha dado 'Sin conexion' o 'Sin respuesta'.
		if (EquipoConexion==1 || EquipoConexion==2 ) {
					clearInterval(IdTimer2);			
					ControlMultiPanel=1;
					BloqueoInterface(0);	
					EquipoConexion=0;				
		}
		
}

// Quien realmente rellena el Panel 1.
function RellenaPanel1 (valor) {

	var i;
	var i2;

		// Rellena la parte de los estados de Reles y SSRs
		if (valor==1) { 
			for (i=0;i<3;i++) {
				i2 = 1<<i;
				i2 = AjaxDatosArray[4] & i2;
				if ((i2>>i)==1) {
					window ["boton"+i]["CambiaEstado"](1);
				} else {
					window ["boton"+i]["CambiaEstado"](0);				
				}
			}
			for (i=4;i<7;i++) {
				i2 = 1<<i;
				i2 = AjaxDatosArray[4] & i2;
				if ((i2>>i)==1) {
					window ["boton"+i]["CambiaEstado"](1);
				} else {
					window ["boton"+i]["CambiaEstado"](0);				
				}
			}
		}
		

		if (valor==2) {
			i = (parseInt(AjaxDatosArray[3]*256)) + parseInt(AjaxDatosArray[4]);
			i=(100/814)*i; // Se convierte del valor del D/A a %.
			poten1.SetPoten(i);
		}

		if (valor==3) {
			i = (parseInt(AjaxDatosArray[3]*256)) + parseInt(AjaxDatosArray[4]);
			i=(100/814)*i; // Se convierte del valor del D/A a %.
			poten2.SetPoten(i);			
		}
}


// Funcion que ACTIVA el timer para realizar la secuencia de envio del panel indicado en 'PanelEnUso'.
function EnviarPanel() {
    ControlMultiPanel=1;	
	switch (parseInt(PanelEnUso)) {		
		case 1:
			IdTimer2 = setInterval("EnvioPanel1()",50);
		break;
	}	
}
 
// Funcion que gestiona la secuencia de envio del panel 1.
function EnvioPanel1() {
	var ValorOutputs=0;
	var ValorDimmer;

		// Se continua con la secuencia solo si esta en modo reposo.
		if (EquipoConexion==0) {
	
		// Los diferentes envios que se hacen del Panel1.
			switch(ControlMultiPanel) {
				case 1:
					BloqueoInterface(1);				
					// Se envia la orden de leer estado de Reles y SSRs
					ValorOutputs=ValorOutputs | (boton0.LeerEstado()*1);
					ValorOutputs=ValorOutputs | (boton1.LeerEstado()*2);
					ValorOutputs=ValorOutputs | (boton2.LeerEstado()*4);
					ValorOutputs=ValorOutputs | (boton4.LeerEstado()*16);
					ValorOutputs=ValorOutputs | (boton5.LeerEstado()*32);
					ValorOutputs=ValorOutputs | (boton6.LeerEstado()*64);
					
					EnvioTrama("id=control&nt=25&cm=08&vl1="+ValorOutputs+"&vl2=0");			
					ControlMultiPanel++;
				break;	
				case 2:
					// Se envia el valor del primer dimmer;
					ValorDimmer=(814/100)*poten1.LeerValor();
					EnvioTrama("id=control&nt=25&cm=10&vl1=1&vl2="+ValorDimmer);			
					ControlMultiPanel++;
					
				break;
				case 3:
					// Se envia el valor del segundo dimmer;
					ValorDimmer=(814/100)*poten2.LeerValor();
					EnvioTrama("id=control&nt=25&cm=10&vl1=2&vl2="+ValorDimmer);			
					ControlMultiPanel++;
					
					clearInterval(IdTimer2);
					ControlMultiPanel=1;					

					BloqueoInterface(0);
				break;				
			}	
			
		}
		
		// Paramos el timer si ha dado 'Sin conexion' o 'Sin respuesta'.
		if (EquipoConexion==1 || EquipoConexion==2 ) {
					clearInterval(IdTimer2);			
					ControlMultiPanel=1;
					BloqueoInterface(0);	
					EquipoConexion=0;				
		}		

}

//Funcion que gestiona la secuencia de recepcion del panel 2.
function RecepcionPanel2() {

		// Se continua con la secuencia solo si esta en modo reposo.
		if (EquipoConexion==0) {
	
			// Las diferentes recepciones que se hacen del Panel 1.
			switch(ControlMultiPanel) {
				case 1:
					BloqueoInterface(1);
					// Se envia la orden de leer la temperatura en el equipo.
					EnvioTrama("id=control&nt=25&cm=5");			
					ControlMultiPanel++;
				break;	

				case 2:

					// Rellena el campo de temperatura interna.
					RellenaPanel2(1);

					// Se envia la orden de leer las entradas AC.
					EnvioTrama("id=control&nt=25&cm=9");			
					ControlMultiPanel++;
				break;	

				case 3:

					// Rellena el Entradas AC.
					RellenaPanel2(2);

					// Se envia la orden de leer las entradas DC.
					EnvioTrama("id=control&nt=25&cm=12");			
					ControlMultiPanel++;
				break;
				
				case 4:
					// Rellena el campo de entradas DC
					RellenaPanel2(3);
					
					// Se envia la orden de recibir el valor de sensor de 4-20ma 1
					EnvioTrama("id=control&nt=25&cm=6&vl1=0");
					ControlMultiPanel++;					
				break;

				case 5:
					//Pone el nivel del sensor 1
					RellenaPanel2(4);
					
					// Se envia la orden de recibir el valor de sensor de 4-20ma 2
					EnvioTrama("id=control&nt=25&cm=6&vl1=1");
					ControlMultiPanel++;					
				break;

				case 6:
					//Pone el nivel del sensor 2
					RellenaPanel2(5);
					
					// Se envia la orden de recibir el valor de sensor de 4-20ma 3
					EnvioTrama("id=control&nt=25&cm=6&vl1=2");
					ControlMultiPanel++;					
				break;

				case 7:
					//Pone el nivel del sensor 3					
					RellenaPanel2(6);
					
					// Se envia la orden de recibir el valor de sensor de 4-20ma 4
					EnvioTrama("id=control&nt=25&cm=6&vl1=3");
					ControlMultiPanel++;					
				break;

				case 8:
					//Pone el nivel del sensor 4					
					RellenaPanel2(7);
					
					// Se envia la orden de recibir el valor de sensor de RED 1
					EnvioTrama("id=control&nt=25&cm=7&vl1=0");
					ControlMultiPanel++;					
				break;
																							
				case 9:
					//Pone el nivel del sensor 5					
					RellenaPanel2(8);
					
					// Se envia la orden de recibir el valor de sensor de RED 2
					EnvioTrama("id=control&nt=25&cm=7&vl1=1");
					ControlMultiPanel++;					
				break;
																											
				case 10:					
					//Pone el nivel del sensor 6
					RellenaPanel2(9);
					
										
					clearInterval(IdTimer2);
					ControlMultiPanel=1;
					
					BloqueoInterface(0);					
				break;
			}
		}
		
		// Paramos el timer si ha dado 'Sin conexion' o 'Sin respuesta'.
		if (EquipoConexion==1 || EquipoConexion==2 ) {
					clearInterval(IdTimer2);			
					ControlMultiPanel=1;
					BloqueoInterface(0);	
					EquipoConexion=0;				
		}
		
}

// Quien realmente rellena el Panel 2.
function RellenaPanel2 (valor) {

	var i;
	var i2;

		// Rellena el valor de temperatura
		if (valor==1) { 
			tempe1.CambiarTexto(parseInt(AjaxDatosArray[4])*0.5 + " Grados");
		}

		// Rellena los estado de entradas AC
		if (valor==2) { 
			for (i=0;i<=3;i++) {
				i2 = 1<<i;
				i2 = AjaxDatosArray[4] & i2;
				if ((i2>>i)==1) {
					window ["estado"+(i+1)]["CambiaEstado"](1);
				} else {
					window ["estado"+(i+1)]["CambiaEstado"](0);				
				}
			}
		}

		// Rellena los estado de entradas DC
		if (valor==3) { 
			i=parseInt(AjaxDatosArray[4]);
			
			for (i=4;i<=7;i++) {
				i2 = 1<<i;
				i2 = ((~parseInt(AjaxDatosArray[4]))&255) & i2;
				if ((i2>>i)==1) {
					window ["estado"+(i+1)]["CambiaEstado"](1);
				} else {
					window ["estado"+(i+1)]["CambiaEstado"](0);				
				}
			}		
		}
		
		// Pone el el valor del sensor 1-4
		if (valor>=4 && valor<=7) {
			i=parseInt(AjaxDatosArray[3])*256;
			i=i+parseInt(AjaxDatosArray[4]);
			i=(100/1024) * i;
			if (i<0) i=0;
			window ["sensor"+(valor-3)] ["CambiaValor"](i);
		}

		// Pone el el valor del sensor 5 y 6.
		if (valor==8 || valor==9) {
			i=parseInt(AjaxDatosArray[3])*256;
			i=i+parseInt(AjaxDatosArray[4]);
			i=i-524;
			i=(100/500) * i;
			if (i<0) i=0;			
			window ["sensor"+(valor-3)] ["CambiaValor"](i);
		}

}

