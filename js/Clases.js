//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//---                            Clase del Boton tipo 1                           
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:
// 			NombreBotonTipo1: El nombre del ID que lleva el DIV.
// Propiedades:
// 			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			Inicializar() : Activa los eventos asociados a los elemntos HTML de esta clase.
//			CambiaEstado() : Cambia el estado del boton


// El constructor de la clase.

function CBotonTipo1 (InNombreBotonTipo1) {


	var IdBoton;

	var Esthis = this;
	
	// *****************************************************************************
	// *** Propiedades
	// *****************************************************************************
	
	this.NombreID = InNombreBotonTipo1;
	this.Estado;

	// *****************************************************************************
	// *** Metodos (ninguno)
	// *****************************************************************************


	//Inicializamos los eventos del boton.

	this.Inicializar = function () {

		this.Estado=0;
		IdBoton=document.getElementById(this.NombreID);
		IdBoton.addEventListener('click',CambiaEstadoEvent,false);

	};


	//Llama a la funcion de cambio de estado del boton cuando se pide desde fuera del objeto.

	this.CambiarEstado = function(valor) {

		if (valor==0) {
			IdBoton.className='boton1';
			this.Estado=0;
		} else {
			IdBoton.className='boton2';
			this.Estado=1;			
		}

	}; 

	// Cambia el texto de control

	this.CambiarTexto = function (valor) {

		document.getElementById("N"+IdBoton.id).innerHTML =valor;

	};	

	// Leer el texto de control

	this.LeerTexto = function () {

		return document.getElementById("N"+IdBoton.id).innerHTML;

	};



	//Se produce al hacer 'click' en el objeto. Closures!!!

	function CambiaEstadoEvent (e) {

		if (Esthis.Estado==1) {
			IdBoton.className='boton1';
			Esthis.Estado=0;
		} else {
			IdBoton.className='boton2';
			Esthis.Estado=1;
		}

	}


}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------









//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                             Clase 'POTENCIOMETRO'                               
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:

// 			InNombrePotenciometro: El nombre del ID que lleva el DIV.

// Propiedades:

// 			NombreID: El nombre del ID que lleva el DIV.

// Metodos:

//			Inicializar() : Activa los eventos asociados a los elemntos HTML de esta clase.
//			CambiarValor() : Estableze el nuevo valor del potenciometro.
//			LeerValor() : Lee el valor actual de potenciometro.
//			CambiarTexto():
//			LeerTexto():

// El constructor de la clase.

function CPotenciometro (InNombrePotenciometro) {

	var Poten_InicioX;  // La posicion X de raton en el momento que pulsamos el mando para deslizarlo.
	var Poten_MinX;     // El minimo al que podemos llevar el mando hacia la derecha.
	var Poten_MaxX;     // El maximo al que podemos llevar el mando a la izquierda.
	var Poten_PadreId;
	var Poten_HijoId;   // Objetos de la base del potenciometro y del mando de deslizamiento respectivamente.
	var StrHijo;        // Aqui se guarda el ID de mando para sacar el ID del Padre y el numero de potenciometro que estamos usando.
	
	
	var Elthis = this;
	
	//************************************************************************************
	// Propiedades.
	//************************************************************************************

	this.NombreID = InNombrePotenciometro;
	this.Valor;
	
		
	//************************************************************************************
	//Metodos.
	//************************************************************************************
	
	// Funcion llamada desde el 'window.onload' para preparar el evento 'mousedown' al mando deslizante 
	// solo despues de que la pagina haya cargado completamente.

	this.Inicializar = function () {

		Poten_HijoId = document.getElementById('Child'+InNombrePotenciometro);
		Poten_HijoId.style.left="0px"; // Esto hay que ponerlo para que luego podamos leer de 'style.left'.
		Poten_HijoId.addEventListener('mousedown',PulsaPoten,false);
		this.Valor=0;
		Poten_MinX = 0;
		Poten_MaxX = parseInt(document.getElementById(InNombrePotenciometro).style.width)-16;//.clientWidth-16; //Calculamos el maximo.
	};


	// Cambia el texto de control

	this.CambiarTexto = function (valor) {

		document.getElementById("N"+InNombrePotenciometro).innerHTML=valor;

	};	

	// Leer el texto de control

	this.LeerTexto = function () {

		return document.getElementById("N"+InNombrePotenciometro).innerHTML;

	};

	// Setea la posicion de mando desde el metodo Objete.SetPoten.

	this.CambiarValor = function (valor) {

		this.Valor=valor;
		PorPoten(valor); //Pinta el valor de %.		
		valor= (Poten_MaxX/100)*valor; // Se convierte de % a posicion X del mando.		
		Poten_HijoId.style.left = valor + "px"

	};	

	
	//***********************************************************************************
	//Funciones privadas de la clase
	//***********************************************************************************

	// Funcion que se dispara al pulsar el 'mousedown'.

	function PulsaPoten(e) {

		Poten_HijoId=e.target; //Aqui detectamos cual es el mando que hemos pulsado.
		StrHijo=Poten_HijoId.id;
		Poten_PadreId=document.getElementById(StrHijo.substring(5)); // Aqui, a partir del nombre del mando, sacamos
								     								 // el objeto de la base.
		Poten_InicioX=e.clientX-parseInt(Poten_HijoId.style.left);  // Cargamos el punto de inicio para poder referenciar
																    // al mover el mando.
		Poten_PadreId.addEventListener('mousemove',MuevePoten,false);	
		document.addEventListener('mouseup',SueltaPoten,false); // Aqui preparamos el evento para que al desclicar

								// no so vuelva a mover el mando.		
	} 

	// Funcion que se dispara al mover el mando.

	function MuevePoten(e) {

		var PosXRaton;
		var ValorX;
		var ValorXPor; // Lo mismo que ValorX pero en %.

		PosXRaton =e.clientX; // Posicion X del raton mientras movemos el mando.

		ValorX = PosXRaton-Poten_InicioX; // Calculo de la posicion X de mando. (el X del mando parte de 0 con refe-

										  // rencia a su contenedo, la posicion del raton va en relacion a la ven-

					  					  // tana del browser)


		Elthis.Valor = parseInt((100/Poten_MaxX)*ValorX);//Guardar el valor del poten en 'Valor'en %.

		if (Elthis.Valor>=0 && Elthis.Valor<=100) {

			Poten_HijoId.style.left = ValorX + "px"; // Se posiciona el mando con px.
			PorPoten(Elthis.Valor); // Pinta el valor del %.

		}

	}



	// Funcion para poner el % en el potenciometro.

	function PorPoten(valor) {

		document.getElementById('Valor'+InNombrePotenciometro).innerHTML=parseInt(valor)+"%";

	}



	// Funcion disparada al soltar el pulsador del raton.

	function SueltaPoten(e) {

		var NumeroPoten;
		NumeroPoten=parseInt(StrHijo.substring(10));
		Poten_PadreId.removeEventListener("mousemove",MuevePoten,false); //Se desactiva el evento 'mousemove'

	}



}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------










//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                   Clase CEstado1                              
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:
// 			NombreEstado1: El nombre del ID que lleva el DIV.
// Pruepiedades:
//			NombreID: El nombre del ID que lleva el DIV.
// Eventos:
//			Inicializar(): Activa los eventos asociados a los elemntos HTML de esta clase.
//			CambiaEstado(): 
//			CambiarTexto():
//			LeerTexto();



// El constructor de la clase.

function CEstado1 (NombreEstado1) {

	var IdEstado;

	//****************************************************************************
	//*** Propiedades
	//****************************************************************************	

	this.NombreId = NombreEstado1;
	this.Estado;

	//****************************************************************************
	//*** Metodos
	//****************************************************************************	
	
	
	//Inicializamos CEstado1.

	this.Inicializar = function () {

		this.Estado=0;
		IdEstado=document.getElementById(NombreEstado1);

	};


	//Llama a la funcion de cambio de estado del boton cuando se pide desde fuera del objeto.

	this.CambiarEstado = function(valor) {

		if (valor==0) {
			IdEstado.className='Estado1Off';
		} else {
			IdEstado.className='Estado1On';				
		}
		this.Estado=valor;
	
	};



	// Cambia el texto de control

	this.CambiarTexto = function (valor) {

		document.getElementById("N"+IdEstado.id).innerHTML =valor;

	};	

	// Leer el texto de control

	this.LeerTexto = function () {

		return document.getElementById("N"+IdEstado.id).innerHTML;

	};



}



//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------











//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                Clase CSensor                                  
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:
// 			NombreSensor: El nombre del ID que lleva el DIV.
// Propiedades:
//			Valor: Valor que tiene el sensor despues del ultimo CambioValor().
//			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			CambiaValor() : Cambia el valor del la barra del nivel
//			CambiarTexto():
//			LeerTexto()

// El constructor de la clase.


function CSensor (NombreSensor) {

	var IdEstado;
	
	//*******************************************************************************
	//*** Propiedades
	//*******************************************************************************

	this.Valor; 
	this.NombreID = NombreSensor;

	//*******************************************************************************
	//*** Metodos
	//*******************************************************************************

	//Inicializamos CSensor.

	this.Inicializar = function () {

		Estado=0;
		IdEstado=document.getElementById(NombreSensor);
		this.CambiarValor(0); // Iniciamos con el valor en cero.

	};

	// Cambia el texto de control

	this.CambiarTexto = function (valor) {

		document.getElementById("N"+IdEstado.id).innerHTML=valor;

	};	

	// Leer el texto de control

	this.LeerTexto = function () {

		return document.getElementById("N"+IdEstado.id).innerHTML;

	};

	//Llama a la funcion de cambio de estado del boton cuando se pide desde fuera del objeto.

	this.CambiarValor = function(valor) {

		this.Valor=valor;
		
		valor = (205/100) * valor;

		document.getElementById("SensorNivel"+NombreSensor.substring(6)).style.width=valor+"px";

	};


}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------











//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                Clase del Contador                              
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------


// Argumentos de entrada:
// 			NombreContador: El nombre del ID que lleva el DIV.
// Propiedades:
//			Valor: Valor del contador actual.
//			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			Reset() 
//			Incrementar()
//			Decrementar()


// El constructor de la clase.

function CContador (InNombreDisp) {

	var IdDisp;
	IdDisp=document.getElementById(InNombreDisp);

	//******************************************************************************
	//*** Propiedades
	//******************************************************************************
	this.Valor=0;
	this.NombreID = InNombreDisp;

	//******************************************************************************
	//*** Metodos
	//******************************************************************************
	
	// Pone a cero el valor de contador
	this.Reset = function (Valor) {
		this.Valor=0;
		IdDisp.innerHTML=this.Valor;		
	};	

	// Incrementa el valor de contador
	this.Incrementar = function () {
		this.Valor=this.Valor+1;
		IdDisp.innerHTML=this.Valor;
	};

	// Decrementa el valor de contador
	this.Decrementar = function () {
		this.Valor=this.Valor-1;
		IdDisp.innerHTML=this.Valor;		
	};


}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------











//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                               Clase del Boton tipo 2                           
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:
// 			NombreBotonTipo2: El nombre del ID que lleva el DIV.
// Propiedades:
// 			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			Inicializar() : Activa los eventos asociados a los elementos HTML de esta clase.
//			CambiarEstado() : Cambia el estado del boton


// El constructor de la clase.

function CBotonTipo2 (InNombreBotonTipo2) {

	var IdBoton;

	var Esthis = this;	

	//Propiedades

	this.NombreID = InNombreBotonTipo2;
	this.Estado;	

	//Metodos (ninguno)


	//Inicializamos los eventos del boton.

	this.Inicializar = function () {
		this.Estado=0;
		IdBoton=document.getElementById(InNombreBotonTipo2);
		IdBoton.addEventListener('click',CambiaEstadoEvent,false);
	};

	// Cambia el texto de control

	this.CambiarTexto = function (valor) {
		document.getElementById(IdBoton.id).innerHTML=valor;
	};	

	// Leer el texto de control

	this.LeerTexto = function () {
		return document.getElementById(IdBoton.id).innerHTML;
	};


	//Llama a la funcion de cambio de estado del boton cuando se pide desde fuera del objeto.

	this.CambiarEstado = function(valor) {
		if (valor==0) {
			IdBoton.className='boton3';
			Esthis.Estado=0;
		} else {
			IdBoton.className='boton4';
			Esthis.Estado=1;			
		}



	}; 



	//Llama a la funcion de cambio de estado del boton cuando llega se genera el evento 'click'.

	function CambiaEstadoEvent (e) {
		if (Esthis.Estado==1) {
			IdBoton.className='boton3';
			Esthis.Estado=0;
		} else {
			IdBoton.className='boton4';
			Esthis.Estado=1;
		}
	}


}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------










//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                               Clase de las Listas                              
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// Argumentos de entrada:
// 			NombreLista: El nombre del ID que lleva el DIV.
// Propiedades:
// 			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			LeerValor():
//			CambiarValor():


// El constructor de la clase.

function CListas (InNombreLista) {

	var IDLista;
	var Esthis = this;
	
	//******************************************************************************
	//*** Propiedades
	//******************************************************************************
	
	this.NombreID = InNombreLista;
	this.Valor=1;

	
	//******************************************************************************
	//*** Metodos
	//******************************************************************************

	this.Inicializar = function () {
		IDLista=document.getElementById(InNombreLista);
		IDLista.addEventListener('click',CambiaValorEvent,false);
	};
	
	// Cambia el Valor
    /// ***** !!! Al cambiar lo deja permanente !!!! *****
	this.CambiarValor = function (valor) {
		document.getElementById(InNombreLista).selectedIndex=valor;
		this.Valor = valor;
	};	

	// Cambia el texto del control
	this.CambiarTexto = function (valor1,valor2) {
		IDLista.options[valor1].text=valor2 ;
	};	

	// Leer el texto del control
	this.LeerTexto = function (valor1) {
		return IDLista.options[valor1].text;
	};	

	//************************
	//***Funciones privadas***
	//************************
	
	function CambiaValorEvent(e) {
		Esthis.Valor=document.getElementById(InNombreLista).selectedIndex;
	}
}


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------










//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                Clase del Check                           
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// Argumentos de entrada:
// 			NombreCheck: El nombre del ID que lleva el DIV.
// Propiedades:
// 			NombreID: El nombre del ID que lleva el DIV.
// Metodos:
//			Inicializar() : Activa los eventos asociados a los elemntos HTML de esta clase.
//			CambiarEstado() : Cambia el estado del Check
//			LeerEstado(): Nos devuelve el estado del Check.


// El constructor de la clase.

function CCheck (InNombreCheck) {

	var IdCheck;
	var Esthis = this;

	//*******************************************************************************
	//*** Propiedades
	//*******************************************************************************
	
	this.NombreID = InNombreCheck;
	this.Estado = 0;

	//*******************************************************************************
	//*** Metodos 
	//*******************************************************************************
	
	//Inicializamos los eventos del Check.

	this.Inicializar = function () {
		Estado=0;
		IdCheck=document.getElementById(InNombreCheck);
		IdCheck.addEventListener('click',CambiaEstadoEvent,false);
	};

	// Cambia el texto de control

	this.CambiarTexto = function (valor) {
		document.getElementById(IdCheck.id).innerHTML=valor;
	};	

	// Leer el texto de control

	this.LeerTexto = function () {
		return document.getElementById(IdCheck.id).innerHTML;
	};


	//Llama a la funcion de cambio de estado del Check cuando se pide desde fuera del objeto.

	this.CambiarEstado = function(valor) {
		if (valor==0) {
			IdCheck.className='CheckOFF';
			this.Estado=0;
		} else {
			IdCheck.className='CheckON';
			this.Estado=1;			
		}
	}; 


	//Llama a la funcion de cambio de estado del Check cuando llega se genera el evento 'click'.

	function CambiaEstadoEvent (e) {
		if (Esthis.Estado==1) {
			IdCheck.className='CheckOFF';
			Esthis.Estado=0;
		} else {
			IdCheck.className='CheckON';
			Esthis.Estado=1;
		}
	}

}



//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------




