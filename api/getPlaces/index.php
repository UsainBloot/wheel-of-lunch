<?PHP

class PlacesAPI {
	
	private $baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	private $apiKey = "AIzaSyCGjVkAtfdNT6aWKb_cheGZDFMWid4g0Pw";
	
	public function getPlaces($latitude, $longitude, $radius, $types, $maxPlaces) {
		
		$curl = curl_init();
		
		
		$url = $this->baseURL . "?" .
				"location=" . $latitude . "," . $longitude . "&" .
				"radius=" . $radius . "&" .
				"types=" . $types . "&" . 
				"minprice=" . "0" . "&" . 
				"maxprice=" . "2" . "&" . 
				"key=" . $this->apiKey;
				
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_BINARYTRANSFER, true);
		
		$json = json_decode(curl_exec($curl), true);
		curl_close($curl);
		$results = $json['results'];
		
		$places = array();
		
		$i = 0;
		while($i < $maxPlaces) {
			array_push($places, $results[$i]['name']);
			$i++;
		}
		
		echo json_encode($places);
	}
	
}

$api = new PlacesAPI;
$api -> getPlaces($_GET['latitude'],$_GET['longitude'], $_GET['radius'], "restaurant", $_GET['maxplaces']);

?>