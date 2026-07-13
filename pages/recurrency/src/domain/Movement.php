<?php

namespace model\domain;

use model\dao\RecorrenciaDAO;
use model\dao\FormaPagamentoDAO;
use model\dao\DespesaCartaoDAO;
use model\dao\CartaoDAO;
use model\dao\PessoaDAO;
use model\dao\ParcelaDAO;
use model\domain\Parcela;
use model\domain\Recorrencia;
use model\dao\CategoriaDAO;
use utils\Util;

// imports

class Movement extends Domain {

	public $codigo;
	public $nome;
	public $descricao;
	public $formaPagamento;
	public $dataCompra;
	public $produtos;
	public $estabelecimento;
	public $categoria;
	public $tags;
	public $pessoa;
	public ?Recorrencia $recorrencia = null;

	/** @var Parcela[] */
	public array $parcelas;
	
	public $type;
	// properties

	const TYPE = [
		"expense" => 1,
		"income" => 2
	];

	function __toString() {
		return $this->nome;
	}

	static function properties() {
		return [
			"nome" => [
				"acess" => "public", "name" => "nome", "toString" => "true",
				"null" => "no", "type" => "string", "size" => "40", "label" => "Nome"
			],
			"estabelecimento" => [
				"acess" => "public", "null" => "yes", "type" => "string",
				"name" => "estabelecimento", "size" => "60"
			],
			"formaPagamento" => [
				"acess" => "public", "referenceId" => "codigo",
				"column" => "forma_pagamento", "label" => "Forma de Pagamento",
				"references" => "FormaPagamento", "type" => "integer"
			],
			"pessoa" => [
				"acess" => "public", "referenceId" => "codigo", "name" => "pessoa",
				"references" => "Pessoa", "null" => "no", "type" => "integer"
			],
			"codigo" => [
				"name" => "codigo", "increment" => "yes", "visible" => "no",
				"key" => "yes", "null" => "no", "type" => "integer"
			],
			"descricao" => [
				"acess" => "public", "name" => "descricao", "toString" => "true",
				"null" => "no", "type" => "string", "size" => "40", "label" => "Descrição"
			],
			"dataCompra" => [
				"acess" => "public", "column" => "data_compra", "toString" => "true",
				"null" => "no", "type" => "string", "size" => "40"
			],
			"produtos" => [
				"acess" => "public", "name" => "descricao", "toString" => "true",
				"null" => "no", "type" => "string", "size" => "40"
			],
			"tags" => [
				"acess" => "public", "name" => "tags", "toString" => "true",
				"null" => "yes", "type" => "string", "size" => "300"
			],
			"categoria" => [
				"acess" => "public", "name" => "descricao", "toString" => "true",
				"null" => "no", "type" => "string", "size" => "40"
			],
			"recorrencia" => [
				"acess" => "public", "name" => "recorrencia", "toString" => "false",
				"null" => "no", "type" => "string", "size" => "255",
				"references" => "Recorrencia"
			],
			"parcelas" => [
				"acess" => "public", "name" => "parcelas", "toString" => "false",
				"null" => "no", "type" => "array", 
				"isAssociation" => "true"
			],
			"type" => [
				"acess" => "public", "name" => "type", "toString" => "false",
				"null" => "no", "type" => "integer"
			]
		];
	}

	function getFormaPagamento()
	{
		$forma_pagamentoDAO = new FormaPagamentoDAO();
		$forma_pagamento = $forma_pagamentoDAO->find($this->formaPagamento->codigo);
		return $forma_pagamento;
	}

	function getFormaPagamentoExtenso()
	{
		$formaPagamentoDespesa = $this->getFormaPagamento();

		if ($formaPagamentoDespesa->codigo == 1) {
			$despesaCartaoDAO = new DespesaCartaoDAO();
			$despesaCartao = $despesaCartaoDAO->findBy([
				"despesa" => $this->codigo
			]);
			if (count($despesaCartao) > 0) {
				$cartao = $despesaCartao[0]->getCartao();
				return $cartao->nome . " " . Util::lastCardNumbers($cartao->numero);
			}
		} else {
			return $formaPagamentoDespesa;
		}
	}

	function getLastCardNumbers() {
		$formaPagamentoDespesa = $this->getFormaPagamento();

		if ($formaPagamentoDespesa->codigo == 1) {
			$despesaCartaoDAO = new DespesaCartaoDAO();
			$despesaCartao = $despesaCartaoDAO->findBy([
				"despesa" => $this->codigo
			]);
			if (count($despesaCartao) > 0) {
				$cartao = $despesaCartao[0]->getCartao();
				return Util::lastCardNumbers($cartao->numero);
			}
		} else {
			return $formaPagamentoDespesa;
		}
	}

	function getPessoa()
	{
		$pessoaDAO = new PessoaDAO();
		$pessoa = $pessoaDAO->find($this->pessoa);
		return $pessoa;
	}

	function getParcelas()
	{
		$parcelaDAO = new ParcelaDAO();
		$parcelas = $parcelaDAO->findBy(["despesa" => $this->codigo]);
		return $parcelas;
	}

	function getCategoria()
	{
		$categoriaDAO = new CategoriaDAO();
		$categoria = $categoriaDAO->findBy(["codigo" => $this->categoria]);
		return $categoria;
	}

	function getRecorrencia()
	{
		if (is_int($this->recorrencia)) {
			$recorrenciaDAO = new RecorrenciaDAO();
			$recorrencia = $recorrenciaDAO->findBy(["codigo" => $this->recorrencia]);

			// Caso o objeto já tenha sido setado
		} else if (is_object($this->recorrencia)) {
			$recorrencia = $this->recorrencia;
		}

		return $recorrencia;
	}

	function getCartao()
	{
		if ($this->formaPagamento->codigo == 1) {
			$despesaCartaoDAO = new DespesaCartaoDAO();
			$despesaCartao = $despesaCartaoDAO->findBy(["despesa" => $this->codigo]);
			if (count($despesaCartao) > 0)
				return $despesaCartao[0]->getCartao();
		}
		return null;
	}

	// getters e setters
}
