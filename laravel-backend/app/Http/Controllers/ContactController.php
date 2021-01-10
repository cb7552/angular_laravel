<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function mailToGirohosting(Request $request)
    {
        $details = [
            'nom' => $request->nom,
            'nomEmpresa' => $request->nomEmpresa,
            'email' => $request->email,
            'telefon' => $request->telefon,
            'informacio' => $request->informacio
        ];
        
        if($request->departament == "info")
        {
            \Mail::to('info@girohosting.com')->send(new \App\Mail\ContactMail($details));
        }
        else if($request->departament == "marketing")
        {
            \Mail::to('marketing@girohosting.com')->send(new \App\Mail\ContactMail($details));
        }
        else if($request->departament == "suport")
        {
            \Mail::to('support@girohosting.com')->send(new \App\Mail\ContactMail($details));
        }
        else if($request->departament == "comptabilitat")
        {
            \Mail::to('contabilidad@girohosting.com')->send(new \App\Mail\ContactMail($details));
        }
    }

    public function clientWantCall(Request $request)
    {
        $details = [
            'nom' => $request->nom,
            'nomEmpresa' => $request->nomEmpresa,
            'email' => $request->email,
            'telefon' => $request->telefon
        ];

        \Mail::to('info@girohosting.com')->send(new \App\Mail\CallMail($details));
    }
}
