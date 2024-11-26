<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeceasedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'block_no' => 'required|exists:blocks,block_no',
            'lot_no' => 'required|exists:lots,lot_no',
            'lot_owner' => 'nullable|string|max:255',
            'type_of_lot' => 'nullable|string|max:255',
            'lot_owner_relationship_to_deceased' => 'nullable|string|max:255',
            'contact_no' => 'nullable|string|max:15',
            'email_address' => 'nullable|email|max:255',
            'deceased_information' => 'required|array',
            'deceased_information.*.deceased_name' => 'required|string|max:255',
            'deceased_information.*.date_of_birth' => 'required|date',
            'deceased_information.*.date_of_death' => 'required|date|after_or_equal:deceased_information.*.date_of_birth',
            'deceased_information.*.gender' => 'required|in:male,female',
        ];
    }
}
