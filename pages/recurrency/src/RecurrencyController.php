<?php 
namespace exemplesComponentes\recurrency\src;

use exemplesComponentes\recurrency\src\domain\Recurrency;
use exemplesComponentes\recurrency\src\domain\RecurrencyPeriod;
use exemplesComponentes\recurrency\src\RecurrencyService;

use utils\DespesaUtils;

class RecurrencyController {

	function __construct() {}
    
	function save(array $data) {
		$jsonText = "";
		$allOcurrences = [];
		
		foreach ($data["recurrences"] as $key => $recurrency) {
			
			$endOption = isset($recurrency["endOption"]);
			$endValue = $endOption ? $recurrency[$endOption] : null;
			if ($recurrency["option"] == "custom") {
				$frequency = $recurrency["frequency"];
				$periodicity = $recurrency["periodicity"];

				$endAttr = $endValue ? ", \"end\": $endValue" : "";

				$recurrencyRule = "{\"p\":\"$periodicity\", \"f\": $frequency $endAttr}";
			} else {
				$recurrencyRule = $recurrency["option"];
			}

			$recurrencyPeriod = new RecurrencyPeriod([
				"initialInstallment" => 1, 
				"finalInstallment" => -1,
				"data" => $recurrency["data"] ?? null
			]);

			$excludeDates = [];
			if (isset($recurrency["excludeDates"])) {
				$excludeDates = array_map(
					fn($dateString) => new \DateTime($dateString), 
					explode("," , $recurrency["excludeDates"])
				);
			} else $excludeDates = [];

			$recurrencyObj = new Recurrency([
				"id" => $key,
				"rule"=> $recurrencyRule, 
				"initialDate" => new \DateTime($recurrency["initialDate"]),
				"finalDate" => $endOption == "endDate" ? new \DateTime($endValue) : null,
				"periods" => [$recurrencyPeriod],
				"excludeDates" => $excludeDates
			]);
			
			$recurrencyService = new RecurrencyService();
			$ocurrences = $recurrencyService->recorrencia(
				$recurrencyObj, 
				$data["year"], 
				$data["month"]
			);


			$allOcurrences = array_merge($allOcurrences, $ocurrences ?? []);
		}

		$jsonText .= json_encode($allOcurrences);
		echo $jsonText;
	}
}
