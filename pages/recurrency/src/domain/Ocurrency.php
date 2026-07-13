<?php
namespace exemplesComponentes\recurrency\src\domain;

class Ocurrency extends Domain {

	public int|null $id = null;	
	public \DateTime|null $date = null;
	public mixed $data = null;
	
	public function __toString() {
		return $this->date->format("Y-m-d") . " - " . $this->data;
	}

	static function properties() {
		return [
			"id" => [
				"name"=>"id","increment"=>"yes","visible"=>"no",
				"key"=>"yes","null"=>"no","type"=>"integer"],
            "date" => [
                "acess"=>"public","column"=>"data_inicio","toString"=>"true",
                "null"=>"no","type"=>"date"],
            "data" => [
                "acess"=>"public", "type"=>"string",
                "column"=>"data","label"=>"Dados"],
		];
	}
}
