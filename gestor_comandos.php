<?PHP

	function unecomando ($id,$nt,$cm,$vl1,$vl2,$vl3,$vl4,$vl5,$vl6,$vl7) {
	
		if ($id=="control" && $nt<>0) {
			switch ($cm) {
				case 1:
					return 'D' . chr($nt) . chr(6) . chr(1) . chr($vl1) . 'X';
					break;
				case 2:
					return 'D' . chr($nt) . chr(5) . chr(2) . 'X';				
					break;
				case 3:
					return 'D' . chr($nt) . chr(5) . chr(3) . 'X';				
					break;
				case 4:
					return 'D' . chr($nt) . chr(6) . chr(4) . chr($vl1) . 'X';
					break;
				case 5:
					return 'D' . chr($nt) . chr(5) . chr(5) . 'X';
					break;
				case 6:
					return 'D' . chr($nt) . chr(6) . chr(6) . chr($vl1) . 'X';
					break;
				case 7:
					return 'D' . chr($nt) . chr(6) . chr(7) . chr($vl1) . 'X';
					break;
				case 8:
					return 'D' . chr($nt) . chr(8) . chr(8) . chr($vl1) . chr($vl2>>8) . chr($vl2&255) . 'X';
					break;
				case 9:
					return 'D' . chr($nt) . chr(5) . chr(9) . 'X';
					break;
				case 10:
					return 'D' . chr($nt) . chr(8) . chr(10) . chr($vl1) . chr($vl2>>8) . chr($vl2&255) . 'X';					
					break;
				case 11:
					return 'D' . chr($nt) . chr(7) . chr(11) . chr($vl1>>8) . chr($vl1&255) . 'X';				
					break;
				case 12:
					return 'D' . chr($nt) . chr(5) . chr(12) . 'X';
					break;
				case 13:
					return 'D' . chr($nt) . chr(5) . chr(13) . 'X';
					break;
				case 14:
					return 'D' . chr($nt) . chr(6) . chr(14) . chr($vl1) . 'X';
					break;
				case 15:
					return 'D' . chr($nt) . chr(5) . chr(15) . 'X';
					break;
				case 16:
					return 'D' . chr($nt) . chr(9) . chr(16) . chr($vl1) . chr($vl2) . chr($vl3) . chr($vl4) .'X';
					break;
				case 17:
					return 'D' . chr($nt) . chr(6) . chr(17) . chr($vl1) . 'X';
					break;
				case 18:
					return 'D' . chr($nt) . chr(8) . chr(18) . chr($vl1>>8) . chr($vl1&255) . chr($vl2) .  'X';
					break;
				case 19:
					return 'D' . chr($nt) . chr(9) . chr(19) . chr($vl1 >> 8) . chr($vl1 & 255) . chr($vl2 >> 8) . chr($vl2 & 255) . 'X';
					break;
				case 20:
					return 'D' . chr($nt) . chr(9) . chr(20) . chr($vl1>>8) . chr($vl1 & 255) . chr($vl2 >> 8) . chr($vl2 & 255) . 'X';
					break;
				case 21:
					return 'D' . chr($nt) . chr(7) . chr(21) . chr($vl1>>8) . chr($vl1&255) .  'X';
					break;
				case 22:
					return 'D' . chr($nt) . chr(12) . chr(22) . chr($vl1) .  chr($vl2) . chr($vl3) . chr($vl4) . chr($vl5) . chr($vl6) . chr($vl7) . 'X';
					break;
				case 23:
					return 'D' . chr($nt) . chr(5) . chr(23) . 'X';
					break;
				case 24:
					return 'D' . chr($nt) . chr(5) . chr(24) . 'X';
					break;
				case 25:
					return 'D' . chr($nt) . chr(6) . chr(25) . chr($vl1). 'X';
					break;
			}
		
		}
			
	}
	
?>