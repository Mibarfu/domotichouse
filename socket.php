<?php

//*********************************************************************************************
//**                                 Conectarse al aparato                                   **
//*********************************************************************************************             
	
	function conectar ($ip,$puerto) {
		
		//  !! Aqui no se puede poner un 'echo', porque si no puede conectar el 'echo' no saldra. !!
		$socket = @socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
		if ($socket == false) {
			$ret = "error";
		}
		socket_set_option($socket, SOL_SOCKET, SO_SNDTIMEO, array('sec' => 5, 'usec' => 0));

		$result = @socket_connect($socket, $ip, $puerto);
		if ($result == false) {
			$ret = "error";
		}
		else
		{
	   		$ret = $socket; 
		}
		
		return $ret;
	}
	
//*********************************************************************************************
//**                                       Cerrar el Socket                                  **
//*********************************************************************************************             

	function desconectar ($socket) {
		socket_close($socket);
	}
	
?>