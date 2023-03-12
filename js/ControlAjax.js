var AjaxConexion;
var AjaxDatosRecibidos;
var AjaxDatosArray;
var EquipoConexion=0; // 0 = En reposo, conexion y respuesta ok.
					  // 1 = Sin conexion.
					  // 2 = Sin respuesta
					  // 3 = En progreso...	
	
function AjaxEnvioOrden(orden){
	
 		TipoRespuesta(3);  		
    					
		AjaxConexion = new XMLHttpRequest();
		
		AjaxConexion.open("POST","control.php",true);
		AjaxConexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			
		AjaxConexion.onreadystatechange=AjaxEstadoEnvio;

		AjaxConexion.send(orden);

}

function AjaxEstadoEnvio() {
			
			// Ajax ha terminado de recibir los datos del servidor.
     		if (AjaxConexion.readyState==4) {
    			AjaxDatosRecibidos= AjaxConexion.responseText;
    			AjaxDatosArray= AjaxDatosRecibidos.split(",");
				TipoRespuesta (AjaxDatosArray[0]);
				ControlEntrada(AjaxDatosArray);
    		} else {
    		
    		}
   		
}

