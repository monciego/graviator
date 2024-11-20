<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeceasedList extends Model
{
    protected $fillable = [
        "deceased_name",
        "deceased_date_of_birth",
        "deceased_gender",
        "type_of_lot",
        "block_no",
        "lot_no",
        "owner_name",
        "relationship_to_deceased",
        "contact_no",
        "email_address",
    ];
}
