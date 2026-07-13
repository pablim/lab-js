<?php

namespace exemplesComponentes\recurrency\src;

use model\dao\CalendarioDAO;
use utils\Recurrency;
use exemplesComponentes\recurrency\src\DateUtil;
use exemplesComponentes\recurrency\src\domain\Ocurrency;

class RecurrencyService {

    function __construct() {}

    function isUtilDate2(\DateTime $date, array $nonWorkingDates){
        if ($date->format("N") == 6) return false;
        if ($date->format("N") == 7) return false;

        foreach ($nonWorkingDates as $nonWorkingDate) {
            if ($date == new \DateTime($nonWorkingDate->data))
                return false;
        }

        return true;
    }

    /**
     * verifica qual é o ordinal desse dia da semana dentro do mês. Ex: a 
     * terceira segunda-feira do mês
     */
    function ordinalWeekdayOnMonth($date) {
        $startDate = new \DateTime($date->format("Y-m"));
        $weekDay = $date->format("w");
        $ordinal = 0;

        if ($startDate->format("w") != $weekDay) {
            $startDate->modify("next " . DateUtil::week[$weekDay]);
            $increaseDate = new \DateTime($startDate->format("Y-m-d"));
            $ordinal++;
        } else {
            $increaseDate = new \DateTime($startDate->format("Y-m-d"));
            $ordinal++;
        }

        while ($increaseDate != $date) {
            $increaseDate->modify("1 week");
            $ordinal++;
        }

        return [
            "weekDay" => $weekDay,
            "ordinal" => $ordinal, 
            "firstDate" => $startDate, 
        ];
    }

    function utilDateOnMonth($number, $date) {
        $nonWorkingDates = (new CalendarioDAO())->findAll();
        $startDate = new \DateTime($date->format("Y-m"));
        $utilQtde = 0;

        while ($utilQtde < $number) {
            if (self::isUtilDate2($startDate, $nonWorkingDates)) 
                $utilQtde++;

            if ($utilQtde == $number) break;

            $startDate->modify("1 day");
        }

        return $startDate;
    }

    //function recorrencia($despesa, $mes, $ano) {
    function recorrencia(
        object $recurrency, 
        int $selectedYear,
        int $selectedMonth 
    ) {

        $gaps = $recurrency->periods;

        // Para incrementar o vencimento
        $dataInicio = $recurrency->initialDate;
        $dataRecorrente = $recurrency->initialDate;

        // Início do mês referente a data de início
        $beginningMonthDate = new \DateTime(
            $dataInicio->format("Y") . '-' . $dataInicio->format("n")
        );

        // mês/ano selecionado
        $beginSelectedMonth = new \DateTime($selectedYear . "-" . $selectedMonth);
        $endSelectedMonth = new \DateTime($beginSelectedMonth->format("Y-m-t"));

        if ($dataInicio > $beginSelectedMonth) {
            $startDate = $recurrency->initialDate;
        } else $startDate = new \DateTime($beginSelectedMonth->format("Y-m-d"));

        // verifica se a data selecionada é anterior a data de início 
        if ($beginSelectedMonth < $beginningMonthDate) return;

        $daysFromBeginDate = $startDate->diff($dataInicio);

        // end
        $end = clone $endSelectedMonth;
        if ($recurrency->end) {
            $endDate = clone $dataInicio;
            $end = $endDate->modify(($recurrency->end * $recurrency->frequency) - 1 . $recurrency->periodicity);
        }

        if ($recurrency->periodicity == "days") {
            $mult = ceil($daysFromBeginDate->days / $recurrency->frequency);
            $mult = $mult * $recurrency->frequency;

            $dataRecorrente = clone $dataInicio;
            $dataRecorrente = $dataRecorrente->modify("$mult days");
        }

        if ($recurrency->periodicity == "weeks") {
            $dataRecorrente = clone $startDate;

            $initialWeekday = $startDate->format("w");
            $recurrencyInitialWeekday =  $recurrency->weekdays ? $recurrency->weekdays[0] : $dataInicio->format("w");

            if ($initialWeekday < $recurrencyInitialWeekday) {
                $dataRecorrente->modify("next " . DateUtil::week[$recurrencyInitialWeekday]);
            }

            if ($initialWeekday > $recurrencyInitialWeekday) {
                //verificar se existe outro dia da semana no array
                if ($recurrency->weekdays && count($recurrency->weekdays) > 1 ) {

                    foreach ($recurrency->weekdays as $weekday) {
                        if ($initialWeekday == $weekday || 
                                $initialWeekday < $weekday) {

                            if ($initialWeekday < $weekday)
                                $dataRecorrente->modify("next " . DateUtil::week[$weekday]);

                            break;
                        }
                    }
                } else {
                    $dataRecorrente->modify("next " . DateUtil::week[$recurrencyInitialWeekday]);
                }  
            } 
        }

        if ($recurrency->periodicity == "months") {
            if ($recurrency->weekdays) {
                $increase = 0;
                $startDateInfo = self::ordinalWeekdayOnMonth($startDate);

                if ($startDateInfo["weekDay"] != $recurrency->weekdays[0]) {
                    $startDate->modify("next " . DateUtil::week[$recurrency->weekdays[0]]);   
                }

                if ($startDateInfo["ordinal"] < $recurrency->monthdays) {
                    $increase = $recurrency->monthdays - $startDateInfo["ordinal"];
                    $startDate->modify("+ {$increase} week");
                }
            } else if ($recurrency->monthdays && !$recurrency->weekdays) {
                if ($recurrency->mode == "util") {
                    $d = self::utilDateOnMonth($recurrency->monthdays, $beginSelectedMonth);
                    $startDate = new \DateTime($d->format("Y-m-d"));
                } 
            } else {
                if ($startDate == $dataInicio)
                    $startDate = clone $dataInicio;
                else {
                    $startDate = clone $dataInicio;
                    
                    $monthDiff = $beginSelectedMonth->format("m") - $dataInicio->format("m");

                    if ($monthDiff <= 0) $monthDiff += 12;

                    if ($monthDiff % $recurrency->frequency == 0) {
                        $monthsSteps =  $monthDiff / $recurrency->frequency;
                        $monthsUpdate = $monthsSteps * $recurrency->frequency;
                        $startDate->modify(($daysFromBeginDate->y * 12) + $monthsUpdate . " months");
                    }
                } 
            }

            $dataRecorrente = new \DateTime($startDate->format("Y-m-d"));
        }

        if ($recurrency->periodicity == "years") {
            
            if ($recurrency->monthdays) {
                $daysNumber = $recurrency->monthdays;
                if ($startDate->format("W") < $daysNumber && 
                        $startDate->format("m") == $beginSelectedMonth->format("m") &&
                        $recurrency->mode != "util") {
                    
                    $dataRecorrente = clone $startDate;
    
                    while ($dataRecorrente->format("W") < $daysNumber) {
                        $dataRecorrente->modify('1 week');
                    }
    
                    if ($recurrency->weekdays) {
                        $weekday = $recurrency->weekdays[0];
    
                        if ($weekday != $dataRecorrente->format("w")) {
                            $dataRecorrente->modify('next ' . DateUtil::week[$weekday]);
                        }
                    }
                } else {
    
                    // pegar o primeiro dia do ano e verificar qual o dia da semana
                    $firstDayOfYear = new \DateTime($startDate->format("Y-01"));
    
                    $dataRecorrente = clone $firstDayOfYear;
    
                    $d = self::utilDateOnMonth($recurrency->monthdays, $dataRecorrente);
                    $dataRecorrente = new \DateTime($d->format("Y-m-d"));
                }
            } else {
                if ($startDate == $dataInicio)
                    $startDate = clone $dataInicio;
                else {
                    $startDate = clone $dataInicio;
                    
                    $yearDiff = $beginSelectedMonth->format("y") - $dataInicio->format("y");

                    if ($yearDiff % $recurrency->frequency == 0) {
                        $yearsSteps =  $yearDiff / $recurrency->frequency;
                        $yearsUpdate = $yearsSteps * $recurrency->frequency;
                        $startDate->modify( $yearsUpdate . " year");
                    }
                } 

                $dataRecorrente = clone $startDate;
            }   
        }
        
        $dataLimiteIntervalo = $recurrency->initialDate;

        $ocurrences = [];
        foreach ($gaps as $gap) {

            if ($dataRecorrente >= $endSelectedMonth) break;

            // Quantidade de parcelas do range de parcelas em questão
            $parcelasPorIntervalo = $gap->finalInstallment != -1 ?
                ($gap->finalInstallment - $gap->initialInstallment) + 1 :
                $gap->finalInstallment;

            if ($parcelasPorIntervalo != -1)
                $dataLimiteIntervalo->modify(
                    "+" .
                        (($parcelasPorIntervalo * $recurrency->frequency) - $recurrency->frequency) .
                        $recurrency->periodicity
                );
            else
                $dataLimiteIntervalo = $recurrency->finalDate ?
                    new \DateTime($recurrency->finalDate) :
                    new \DateTime($endSelectedMonth->format("Y-m-d"));

            $ocurrences = [];

            while (
                // Caso a dataRecorrente seja maior que a data limite do intervalo
                !($dataRecorrente > $dataLimiteIntervalo) &&
                ($dataRecorrente >= $beginSelectedMonth &&
                    $dataRecorrente <= $endSelectedMonth) && 
                    $dataRecorrente <= $end
            ) {

                // Se não for uma data excluída
                if (!in_array($dataRecorrente, $recurrency->excludeDates)){
                    
                    $ocurrency = new Ocurrency([
                        "id" => $recurrency->id,
                        "date" => clone $dataRecorrente,
                        "data" => $gap->data
                    ]);
    
                    $ocurrences[] = $ocurrency;
                } 


                if ($recurrency->weekdays && count($recurrency->weekdays) > 1) {
                    $w = $dataRecorrente->format("w");
                    for ($i = $w; $i < 7; $i++) {
                        $dataRecorrente->modify("1 day");

                        if ($dataRecorrente > $endSelectedMonth) break;
                        
                        $weekDayToday = $dataRecorrente->format("w");
                        if (in_array($weekDayToday, $recurrency->weekdays)) {
                            $ocurrency = new Ocurrency([
                                "id" => $recurrency->id,
                                "date" => clone $dataRecorrente,
                                "data" => $gap->data
                            ]);
                            
                            $ocurrences[] = $ocurrency;
                        }
                    }

                    $dataRecorrente->modify('next ' . DateUtil::week[$recurrency->weekdays[0]]);
                    continue;
                }

                $dataRecorrente->modify('+' . $recurrency->frequency . $recurrency->periodicity);
            }

            $dataLimiteIntervalo->modify('+' . $recurrency->frequency . $recurrency->periodicity);
        }

        return $ocurrences;
    }
}
