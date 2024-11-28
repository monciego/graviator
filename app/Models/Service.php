<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'deceased_information_id',
        'type',
        'amount',
        'category',
        'date',
        'time',
    ];

    public function deceasedInformation()
    {
        return $this->belongsTo(DeceasedInformation::class);
    }
}
