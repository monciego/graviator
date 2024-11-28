<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeceasedInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'lot_id',
        'deceased_name',
        'date_of_birth',
        'date_of_death',
        'gender',
    ];

    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }

   public function interments()
    {
        return $this->hasMany(Interment::class);
    }
}
