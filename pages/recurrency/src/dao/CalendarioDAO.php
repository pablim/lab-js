<?php

namespace model\dao;

use model\domain\Calendario;

class CalendarioDAO extends DAO
{

	function __construct()
	{
		parent::__construct(Calendario::class);
	}
}
