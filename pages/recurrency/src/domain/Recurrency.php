<?php
namespace exemplesComponentes\recurrency\src\domain;

class Recurrency extends Domain {

	public int|null $id = null;
	public string|null $rule = null;
	public \DateTime|null $initialDate = null;
	public \DateTime|null $finalDate = null;
	public array|null $periods = null;
    public array|null $excludeDates = null;

	public $periodicity;
    public $frequency;
    public $mode;
    public $monthdays;
    public $weekdays;
    public $workingDays = false;
    public $end;

	public static $temporality = [
        "d" => "days", 
        "w" => "weeks", 
        "m" => "months", 
        "y" => "years"
    ];
    public static $modeEnum = [
        "c" => "current", 
        "u" => "util", 
        "w" => "weekdays"
    ];
    public static $recurrencyObject = [
        "periodicity" => "p", 
        "frequency" => "f", 
        "mode" => "m", 
        "monthdays" => "o", 
        "weekdays" => "w"
    ];

	public function __construct(array $recurrencyArr) {
		parent::__construct($recurrencyArr);

        $this->mode = "current";

		$recurrencyRules = json_decode($recurrencyArr["rule"], true);

        if (array_key_exists("p", $recurrencyRules)) {
            $this->periodicity = static::$temporality[$recurrencyRules["p"]];
        }

        if (array_key_exists("f", $recurrencyRules)) {
            $this->frequency = $recurrencyRules["f"];
        }

        if (array_key_exists("d", $recurrencyRules)) {
            $d = substr($recurrencyRules["d"], 0, -1);
            $m = substr($recurrencyRules["d"], -1);
            $this->monthdays = $d;
            if ($m == "u") {
                $this->mode = "util";
                $this->workingDays = true;
            }
        }

        if (array_key_exists("w", $recurrencyRules)) {
            $this->weekdays = explode(";", $recurrencyRules["w"]);
        }

        if (array_key_exists("end", $recurrencyRules)) {
            $this->end = $recurrencyRules["end"];
        }
    }

	public function __toString() {
		return $this->rule;
	}

	static function properties() {
		return [
			"id" => [
				"name"=>"id","increment"=>"yes","visible"=>"no",
				"key"=>"yes","null"=>"no","type"=>"integer"],
			"rule" => [
				"acess"=>"public","null"=>"no","type"=>"string",
				"column"=>"recorrencia","label"=>"Recorrencia",
				"size"=>"30"],
			"initialDate" => [
				"acess"=>"public","column"=>"data_inicio","toString"=>"true",
				"null"=>"no","type"=>"date"],
			"finalDate" => [
				"acess"=>"public","column"=>"data_fim","toString"=>"true",
				"null"=>"no","type"=>"date"],
			"periods" => [
				"acess"=>"public","null"=>"no","type"=>"array"
			]
		];
	}
}
