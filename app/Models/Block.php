<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
   use HasFactory;

    protected $fillable = ['block_no'];

    public function lots()
    {
        return $this->hasMany(Lot::class);
    }
}
