<?php

namespace exemplesComponentes\recurrency\src;

use DateTime;
use \ReflectionException;

class DateUtil {

    const MONTHS_DEFAULT = [
        "jan"=> "jan",
        "fev"=> "feb",
        "mar"=> "mar",
        "abr"=> "apr",
        "mai"=> "may",
        "jun"=> "jun",
        "jul"=> "jul",
        "ago"=> "aug",
        "set"=> "sep",
        "out"=> "oct",
        "nov"=> "nov",
        "dez"=> "dec",
        "janeiro"=> "january",
        "fevereiro"=> "february",
        "março"=> "march",
        "marco"=> "march",
        "abril"=> "april",
        "maio"=> "may",
        "junho"=> "june",
        "julho"=> "july",
        "agosto"=> "august",
        "setembro"=> "september",
        "outubro"=> "october",
        "novembro"=> "november",
        "dezembro"=> "december",
    ];

    const MONTHS = [
        "janeiro" => 1,
        "jan" => 1,
        "fevereiro" => 2,
        "fev" => 2,
        "março" => 3,
        "marco" => 3,
        "mar" => 3,
        "abril" => 4,
        "abr" => 4,
        "maio" => 5,
        "mai" => 5,
        "junho" => 6,
        "jun" => 6,
        "julho" => 7,
        "jul" => 7,
        "agosto" => 8,
        "ago" => 8,
        "setembro" => 9,
        "set" => 9,
        "outubro" => 10,
        "out" => 10,
        "novembro" => 11,
        "nov" => 11,
        "dezembro" => 12,
        "dez" => 12,
    ];

    const week = [
        0 => "sun",
        1 => "mon",
        2 => "tue",
        3 => "wed",
        4 => "thu",
        5 => "fri",
        6 => "sat",
    ];

    /**
     * Retorna a data de início e fim do mês em um array
     */
    static function startEndMonth($month, $year)
    {
        $dias_mes = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $inicio = date('Y-m-d', mktime(0, 0, 0, $month, 1, $year));
        $fim = date('Y-m-d', mktime(0, 0, 0, $month, $dias_mes, $year));

        return [
            "start" => $inicio,
            "end" => $fim
        ];
    }

    static function format(string $date, string $format)
    {
        return (new DateTime($date))->format($format);
    }

    static function getOrdinal(string $date)
    {
        $day = (new DateTime($date))->format("d") / 7;

        return ceil($day);
    }

    static function getMonth($str)
    {
        $months = self::MONTHS;

        foreach ($months as $key => $index) {
            if (strstr(strtolower($str), $key)) {
                return $index;
            }
        }

        return null;
    }
}
