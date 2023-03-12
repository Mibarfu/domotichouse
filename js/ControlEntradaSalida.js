/*
EstadoConexion=:
       1º Byte: Error (0=ninguno, 1=sin conexion, 2=sin respuesta, 3=en progreso 'este ultimo generado por ajax')
       2º  "  : Comando recibido.
       3º  "  : Longitud de datos a continuacion de este byte.
       4º, 5º, ..... nº : Datos.
       nº+1   : Terminacion de trama ('x' fin de trama, 'n' esperando mas datos).
*/

function ControlEntrada(valor) {
	
	// Aqui habria que completar la funcion verificando si todos los datos y el formato de entrada es ok.

}

function EnvioTrama (valor) {
	AjaxEnvioOrden(valor);
}

