<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use App\Propal;
use App\Contrat;
use App\Fact;
use App\User;
use App\Client;

class PropalController extends Controller
{
    public function getclient(){
        $client = Client::where('client',3)->get();
        
        return response()->json($client);
    }


    public function getworker(){
        $worker = Client::where('client',2)->get();
        
        // foreach($workers as $worker){
        //     $workerdetail[] = Client::where('rowid',$worker->idClient)->get();
        // }
        return response()->json($worker);
    }

    public function getPropals(Request $request)
    {
        $ss = $request->id;
        if($ss=='1'){
            $pressupostos = Propal::all();
        }else{
            $pressupostos = Propal::where('fk_soc', $ss)->get();
        }
        return response()->json($pressupostos);
        // return response()->json(["message" =>$ss." File Uploaded Succesfully"]);
    }
    public function getContrat(Request $request)
    {
        $contratos = Contrat::where('fk_soc', $request->id)->get();
        return response()->json($contratos);
        echo "gg";
    }
    public function getFact(Request $request)
    {
        $facturas = Fact::where('fk_soc', $request->id)->get();
        return response()->json($facturas);
        echo "gg";
    }

    public function logoUpload(Request $request) {
        $id=request('row_id');
        if ($request->hasFile('file'))
        {
            $file      = $request->file('file');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $document   = date('His').'-'.$filename;
            $file->move(public_path('logos'), $document);
            DB::table('llxdt_societe')
                ->where('rowid', $id)
                ->update(['logo' => $document]);
            return response()->json(["http://localhost:8000/logos/".$document]);
        }
         else
        {
            return response()->json(["message" => "Select file first."]);
        }
    }

    public function getlogo(Request $request){
        $userdata = DB::table('llxdt_societe')->where('rowid', $request->id)->first();
        $logo = $userdata->logo;
        if($logo==null){
            return response()->json([null]);
        }
        else{
            return response()->json(["http://localhost:8000/logos/".$logo]);
        }
        
    }


    public function contactUpload(Request $request) {

        $id=request('row_id');
        
        // DB::update('update llxdt_propal set fk_projet = 1 where rowid = $id');
        // $budgets = Propal::where('rowid',$id)->first();
        // $budgets->fk_projet = 1;
        // $budgets->save();

        if ($request->hasFile('file'))
        {
            $file      = $request->file('file');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $document   = date('His').'-'.$filename;
            $file->move(public_path('contrat'), $document);
            DB::table('llxdt_contrat')
                ->where('rowid', $id)
                ->update(['fk_projet' => 1]);
            
            // foreach($budgets as $budget){
            // }

            return response()->json(["message" =>" File Uploaded Succesfully"]);
        }
         else
        {
            return response()->json(["message" => "Select file first."]);
        }

        
        //dd($request->all());
    }

    public function delete(Request $request){
        $id = $request->id;
        // echo($id);
        // DB::table('llxdt_societe')
        // ->where('rowid', $request)
        // ->delete();
        Client::where('rowid', $id)->delete();
        User::where('idClient', $id)->delete();
        // DB::delete('delete from llxdt_societe where rowid = ?',[$id]);
        return response()->json(["message" => $request."delete file/backend"]);
    }
}
