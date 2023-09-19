<?php

$query_reset_validate_for_all_to_zero = $PDO -> prepare("UPDATE exercice_detail
                                                        SET validate = 0
                                                        WHERE validate = 1");
$query_reset_validate_for_all_to_zero->execute();