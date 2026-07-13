<?php
namespace exemplesComponentes\recurrency\src\domain;

use exemplesComponentes\recurrency\src\Util;

class Domain {

    function __construct($objectArray=[]) {	
		foreach ($this as $key => $value) {

			// quando retornado do banco de dados nomes das colunas vem em snake case
			$objectKey = Util::convertCase($key, "camel", "snake");
			
			$v = isset($objectArray[$objectKey]) 
				? $objectArray[$objectKey] 
				: (isset($objectArray[$key]) ? $objectArray[$key] : null
			);

			if (isset(get_called_class()::properties()[$key]["references"])) {
				$refObject = $v;
				$p = get_called_class()::properties()[$key]["references"] ?? null;

				$classeName = null;
				if (is_object($v)) {
					$classeName = (new \ReflectionClass($v))->getShortName();
				}

				if ($p && $v !== null && $classeName !== $p) {
					// v diferente de tipo Movement
					$classReference = "model\\domain\\" . $p;
					if (is_array($v)) {
						$refObject = new $classReference($v);
					} else {
						$properties = get_called_class()::properties();
						$keyName = null;
						foreach ($properties as $propertie => $definitions) {
							if (array_key_exists("key", $definitions)) {
								$keyName = $propertie;
							}
						}
						$refObject = new $classReference();
						$refObject->$keyName = $v;
					}
				} 
				$this->$key = $refObject;
			} else {

				$this->$key = $v;
			}



			// if (is_array($this->$key)) {
			// 	$this->$key = null;
			// }
		}
    }
	
	function __toString() {
		$str = "";
		foreach ($this as $key => $value) {
			$str .= $value  . " - ";
		}

		return $str;
	}
	
    function toJSON() {
		return json_encode($this, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
    
    function toXML() {
		$classArray = explode("\\", __class__);
		$className = $classArray[count($classArray)-1];
		$xml="<".$className.">";
		foreach ($this as $key => $value) {
			$xml .= "<".$key.">".$value."<".$key.">";
		}
		$xml.="<".$className.">";

		return $xml;
    }
    
    static function props() {
		require $_SERVER["DOCUMENT_ROOT"] . "/properties/" . __class__ . ".php";
		return $params;
	}

	public function  __set ( $name , $value ) {
		$this->$name = $value;
	}

	public function  __get ( $name ) {
		return $this->$name;
	}
	
	static function getKey() {
		$properties = get_called_class()::properties();
		foreach ($properties as $propertie => $definitions) {
			if (array_key_exists("key", $definitions)) {
				return $propertie;
			}
		}
	}

}