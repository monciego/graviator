<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
    use HasFactory;

    protected $fillable = [
        'block_id',
        'lot_no',
        'type_of_lot',
        'latitude',
        'longitude',
        'status',
        'lot_owner',
        'lot_owner_relationship_to_deceased',
        'contact_no',
        'email_address'
    ];

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

    public function deceasedInformation()
    {
        return $this->hasMany(DeceasedInformation::class);
    }
}
