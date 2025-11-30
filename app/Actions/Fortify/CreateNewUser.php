<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'no_telepon' => ['required', 'string', 'min:10', 'max:15'],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'nama_lengkap' => $input['name'],
            'email' => $input['email'],
            'no_telepon' => $input['no_telepon'],
            'password' => $input['password'],
            'role' => 'user',
        ]);
    }
}
