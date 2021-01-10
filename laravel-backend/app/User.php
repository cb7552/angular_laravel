<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

// use App\Client;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'idClient'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @inheritDoc
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @inheritDoc
     */
    public function getJWTCustomClaims()
    {
        // $userData = Client::where('email', $this->email)->first();

        // 'id' => $this->id,
        // 'nom' => $userData->nom,
        // 'name_alias' => $userData->name_alias,
        // 'email' => $userData->email,
        // 'phone' => $userData->phone,
        // 'address' => $userData->address,
        // 'town' => $userData->town,
        // 'fk_pays' => $userData->fk_pays,
        // 'fk_departement' => $userData->fk_departement,
        // 'zip' => $userData->zip,
        // 'siren' => $userData->siren,
        // 'password' => $this->password

        return [];
    }
}


