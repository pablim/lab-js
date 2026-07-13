<?php

namespace model\domain;

use Utils\Util;

// imports

class Calendario extends Domain
{

    public $codigo;
    public $data;
    public $descricao;
    public $tipo;
    public $local;

    static function properties()
    {
        return [
            "codigo" => [
                "name" => "codigo", "increment" => "yes", "visible" => "no",
                "key" => "yes", "null" => "no", "type" => "integer"
            ],
            "data" => [
                "acess" => "public", "name" => "data", "toString" => "true",
                "null" => "no", "type" => "string", "size" => "40"
            ],
            "descricao" => [
                "acess" => "public", "null" => "yes", "type" => "string",
                "column" => "descricao", "size" => "100"
            ],
            "tipo" => [
                "acess" => "public", "name" => "tipo", "toString" => "true",
                "null" => "yes", "type" => "integer"
            ],
            "local" => [
                "acess" => "public", "toString" => "true", "null" => "yes",
                "type" => "integer"
            ],
        ];
    }
}
