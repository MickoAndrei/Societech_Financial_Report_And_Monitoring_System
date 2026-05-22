<?php

namespace App\Models;

use CodeIgniter\Model;

abstract class BaseSocietechModel extends Model
{
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $useSoftDeletes = false;
    protected $protectFields = true;
}
