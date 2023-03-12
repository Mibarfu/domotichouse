<?php

	include 'socket.php';
	include 'envio.php';
	include 'gestor_comandos.php';
	
	$retlongitud=0; 
	$retdatos="xxxxx";
	 
	$comman=$_POST['cm'];
	
	$socket=conectar ('83.52.190.105',80);

	if ($socket!="error") {
		$envio=unecomando($_POST['id'],$_POST['nt'],$comman,$_POST['vl1'],$_POST['vl2'],$_POST['vl3'],$_POST['vl4'],$_POST['vl5'],$_POST['vl6'],$_POST['vl7']);
		$ret=enviar ($socket,$envio,&$retlongitud,&$retdatos);
		
		if ($ret==0) {

			echo '0,' . $comman . ',' . $retlongitud . ',';		
			for ($i=0;$i<$retlongitud-1;$i++) {  
				echo ord($retdatos[$i]) . ",";
			}
			echo ord($retdatos[$i]);		

			if ($comman==19) {
				// Es el bloque de datos a grabar que va despues de la orden '19'.
				echo ",n";		
				$ret2=sigueord19($socket,$_POST['vl3']);
				echo ',' . $ret2;
			}

		}else		
		{
			// Aqui el codigo de 'Sin respuesta!'
			echo "2";
		}
		

		desconectar($socket);
	}else
	{
		// Aqui el codigo de 'Sin conexion!'
		echo "1";
	}
	
	echo ",x";

?>