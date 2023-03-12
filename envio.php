<?PHP
	
//*********************************************************************************************
//**                              Enviar ordenes al aparato                                  **
//*********************************************************************************************             

	function enviar ($socket,$envio,$retlongitud,$retdatos) {	
		
		//Enviamos la cadena al equipo por primera vez.
		@socket_write($socket, $envio, strlen($envio));	
	
		$buf = "";
		$salida="";
		// Iniciamos el timeout.
		$tiempoinicio=time();
		$ret=0;
		$repeticiones=0;
		While ($salida[strlen($salida)-1]!='X') {
			if (false !== ($bytes = @socket_recv($socket, $buf, 2048,MSG_DONTWAIT))) 
			{
				$salida.=$buf;
			} else 
			{
				// Aqui se produce cuando los datos no estan completos y estan entrando.
			
			}
			if (time()>=($tiempoinicio+3.5)) 
			{ 
				//El equipo no contesta y se intenta varias veces.
				$repeticiones++;
				$tiempoinicio=time(); //Se reinicia el timeout.				

				//Vuelve a enviar el mensaje
				@socket_write($socket, $envio, strlen($envio));	

				//Si a la tercera vez no contesta, sale con error.
				if ($repeticiones==3) {
					// El equipo no contesto
					$ret=2;
					break;
				}
			}
		}
		
		// El equipo contesto y cargamos las variables 'retdatos' y 'retlongitud'
		if ($ret==0) {
			$retlongitud=(ord($salida[2])*256) + ord($salida[3])-6;
			$retdatos=substr($salida,5,$retlongitud);
		}
		
		/*
		echo "Respuesta:<br>";
	
		echo "Identificador inicial: " . $salida[0] . "<br>";
		echo "Numero de terminal: " . ord($Salida[1]) . "<br>";
		echo "Longitud de la trama:" ;
		echo (ord($salida[2])*256) + ord($salida[3]) ."<br>";
	
		echo "Datos: ";
		for ($i=5;$i<(strlen($salida)-6)+5;$i++) {  
			echo ord($salida[$i]) . " ";
		}
	
		echo "<br>Identificador final: " . $salida[strlen($salida)-1] . "<br>";
		}
		*/
		
		return $ret;
	}


//*********************************************************************************************
//**                      Enviar bloque de datos a E2prom con la orden '19'                  **
//*********************************************************************************************     

	function sigueord19 ($socket,$bloque) {
		
		$ret=0;

		// Separamos los datos
		$datos=explode(",",$bloque);

		// Enviamos byte a byte los datos hacia el equipo
		for ($i=0;$i<count($datos);$i++) {

			$buf="";

			// Enviamos el byte
			@socket_write($socket, chr($datos[$i]),1);					

			// Iniciamos el timeout.
			$tiempoinicio=time();

			//  Esperamos a que el equipo reponda el mismo dato que nosotros le enviamos.
			while ($buf=="") {
				// Miramos si llego algun dato.
				if (false !== ($bytes = @socket_recv($socket, $buf, 1,MSG_DONTWAIT))) {
					// Comprobamos que el dato que entro es el bueno
					if (ord($buf)!=$datos[$i]) {
						// El dato es diferente salimos con error.
						$ret=1;
						break;
					} else {
						// Es bueno
						//usleep(100000);	
						break;
					}
					
				} else {
				}
				
				// Verificamos el 'timeout'
				if (time()>=($tiempoinicio+3.5)) {
					$ret=2;
					break;
				}

			}
			
			// No ha llegado el dato o ha llegado un dato malo?
			if ($ret==1) {
				break; //Salimos del for.
			}
			
		}	
		
		return $ret;
	}

?>