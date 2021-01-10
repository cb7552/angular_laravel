<?php

namespace App\Http\Controllers;

use App\User;
use App\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['enregistrarClient']]);
    // }

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function updateClient(Request $request){
        $id = $request->id;

        DB::table('llxdt_societe')
            ->where('rowid', $id)
            ->update([
                'nom' => $request->nom, 
                'name_alias' => $request->name_alias,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'town' => $request->town,
                'fk_pays' => $request->fk_pays,
                'fk_departement'=> $request->fk_departement,
                'zip' => $request->zip,
                'siren' => $request->siren,
                ]);

    }

    public function test(Request $request){
        $allemail = DB::table('llxdt_societe')
            ->where('email', $request->email)->first();
            return response()->json([$allemail]); 

    }

    public function enregistrarClient(Request $request)
    {
        $validatedData = Validator::make($request->all(),
        [
            'nom' => 'required|string|max:128',
            'name_alias' => 'required|string|max:128',
            'email' => 'required|string|email|max:128|unique:llxdt_societe',
            'phone' => 'required|integer|regex:/^[6789]{1}[0-9]{8}$/',
            'password' => 'required|string|min:6',
            'address' => 'required|string|max:255',
            'town' => 'required|string|max:50',
            'fk_pays' => 'required|integer|digits_between:1,11',
            'fk_departement' => 'required|integer|digits_between:1,11',
            'zip' => 'required|integer|regex:/\d{5}/',
            'siren' => 'required|string|max:128',
        ]);

        if($validatedData->fails())
        {
            return response()->json($validatedData->errors()->toJson(), 400); 
        }

        $allemail = DB::table('llxdt_societe')
            ->where('email', $request->email)->first();

        if($allemail==null){
            try
            {
                // $allemail = DB::table('llxdt_societe')
                //     ->where('email', $$request->email)->first();
                //Creem el client
                $client = new Client();
                $client->nom = $request->nom;
                $client->name_alias = $request->name_alias;
                $client->email = $request->email;
                $client->phone = $request->phone;
                $client->address = $request->address;
                $client->town = $request->town;
                $client->fk_pays = $request->fk_pays;
                $client->fk_departement = $request->fk_departement;
                $client->zip = $request->zip;
                $client->siren = $request->siren;
                $client->client = $request->id;

                $client->save();

                //Guardem el id del client que acabem de crear
                $id = $client->id;
                // echo($id);

                //Creem l'usuari d'aquest client
                $usuari = new User();
                $usuari->email = $request->email;
                $usuari->password = Hash::make($request->password); 
                $usuari->idClient = $id;
                // $usuari->type = 1;

                $usuari->save();

                $details = [
                    'emailClient' => $request->email,
                    'nomClient' => $request->nom,
                    'nomComercialClient' => $request->name_alias,
                    'telClient' => $request->phone,
                    'cpClient' => $request->zip,
                    'poblacioClient' => $request->town
                ];

                //Enviem el correu notificant que s'ha registrat correctament l'usuari.
                //\Mail::to($details['emailClient'])->send(new \App\Mail\RegisterMail($details));

                //Enviem un correu a Girohosting amb les dades les clients.
                //\Mail::to('info@girohosting.com')->send(new \App\Mail\RegisterMailInternal($details));

                return response()->json(['success' => 'usuari registrat correctament, hem enviat un correu al compte'], 201); 
                
            }
            catch(Exception $e)
            {
                return response()->json(['error' => 'fail_to_create_user'], 400);   
            } 
        }
        else{
            return response()->json(['error'=>'you used same email']);
        }
    }

    public function logoUpload(Request $request){
        $id=$request->row_id;
        if ($request->hasFile('file'))
        {
            $file      = $request->file('file');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $document   = date('His').'-'.$filename;
            $file->move(public_path('logos'), $document);
            DB::table('llxdt_societe')
                ->where('rowid', $id)
                ->update(['logo' => $document.$filename.$extension]);
            return response()->json(["message" =>" File Uploaded Succesfully"]);
        }
         else
        {
            return response()->json(["message" => "Select file first."]);
        }

    }

    public function getUser(Request $request)
    {
        $userData = Client::where('email', $request->email)->first();

        return response()->json($userData);
    }

    public function getprofile(Request $request)
    {
        $userData = Client::where('rowid', $request->id)->first();
        // $userData = DB::table('llxdt_societe')->where('rowid', $request->id)->first();

        return response()->json($userData);
    }
    
    //get adminstrator's customer
    public function getmycustomer(Request $request)
    {
        $provider = $request->id;
        // $client = Client::where('fournisseur', $provider)->first();
        $client = DB::table('llxdt_societe')->where('fk_stcomm', $request->id)->get();
        
        // return response()->json("white night");
        return response()->json($client);
    }

    public function getrole(Request $request)
    {
        $userData = Client::where('rowid', $request->id)->first();
        // $userData = DB::table('llxdt_societe')->where('rowid', $request->id)->first();
        $userrole = $userData->client;
        return response()->json($userrole);
        // return response()->json('white night');
    }

    public function updateUserProfile(Request $request)
    {
        try
        {
            //Separem els ids de la request
            $userId = $request->id;
            $clientId = $request->rowid;

            //Actualitzem les dades de la taula users
            User::where('id', $userId)->update(array('email' => $request->email));
            $user = User::where('id', $userId)->first();
            $user->touch();
            
            //Actualitzem les dades de la taula clients (societe)
            Client::where('rowid', $clientId)->update($request->except(['id', 'rowid']));

            //Retornem que tot ok
            return response()->json(['msg' => 'Usuari actualitzat correctament a les dues taules'], 200);
        }
        catch(Exception $e)
        {
            return response()->json($e);
        }
         

    }
    public function download(){
        $file = './dolibarrdata/propale/PR2010-0057';
        $name = basename($file);
        return response()->download($file.'/'.$name.'.pdf');
        // return response()->json(['msg' => 'here is download function']);
    }

}
