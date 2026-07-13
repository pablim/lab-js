<?php
namespace exemplesComponentes\recurrency\src\domain;

class RecurrencyPeriod extends Domain {

	public int|null $id = null;
	public object|array|null $data = null;
	public int|null $initialInstallment = null;
	public int|null $finalInstallment = null;
	public int|null $recurrency = null;

	function __toString() {
		return $this->id;
	}

	static function properties() {
		return [
			"id" => [
				"name"=>"id","increment"=>"yes","visible"=>"no",
				"key"=>"yes","null"=>"no","type"=>"integer"],
			"data" => [
				"acess"=>"public","name"=>"data","toString"=>"true",
				"null"=>"no","type"=>"date","size"=>"40","label"=>"Data"],
			"initialInstallment" => [
				"acess"=>"public","null"=>"yes","type"=>"integer",
				"column"=>"parcela_inicio","label"=>"Parcela início",
				"size"=>"60"],
			"finalInstallment" => [
				"acess"=>"public", "column"=>"parcela_fim",
				"label"=>"Parcela fim","type"=>"integer"],
			"recurrency" => [
				"acess"=>"public","referenceId"=>"id","name"=>"recurrency",
				"references"=>"Despesa","null"=>"no","type"=>"integer"]
		];
	}
}
