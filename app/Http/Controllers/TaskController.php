<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function getTaskList()
      {
        try{
          $tasks = Task::where('completed', false)
          ->orderBy('id', 'desc')
          ->withCount(['todolists', 'todolists as todoCompleted' => function ($query) {
            $query->where('completed', true);
          }])
          ->get();
        // dd($tasks[0]);
        return $tasks->toJson();
        }
        catch(Exception $e){
          Log::error($e);
        }
      }

      public function getTaskDetail($id)
    {
        try
        {
            $task = Task::findOrFail($id);
            return response()->json($task);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

      public function storeTask(Request $request)
      {
        $validatedData = $request->validate([
          'desc' => 'required',
        ]);

        $task = Task::create([
          'desc' => $validatedData['desc'],
          'created_at' => Carbon::now(),
        ]);

        return response()->json(["status" => 200]);
      }

      public function updateTask(Request $request)
      {
          $id = $request->get('taskId');
              $desc = $request->get('taskDesc');
  
              Task::where('id', $id)->update([
                  'desc'   =>  $desc
              ]);
  
              return response()->json(["status" => 200]);
        
      }

      public function show($id)
      {
        $task = Task::with(['todolists'])->find($id);

        return $task->toJson();
      }

      public function markAsCompleted(Task $task)
      {
        if ($task->completed == true){
            $task->completed = false;
        } else {
            $task->completed = true;
        }
        
        $task->update();

        return response()->json('Task updated!');
      }


      public function deleteTask(Task $task)
      {
          try
          {
              $task->delete(); 
          }
          catch(Exception $e)
          {
              Log::error($e);
          }
      }

      public function test()
    {
        
        $task = Task::with('todolists')->findOrFail(1);
        dd(response()->json($task));
        return response()->json($task);
        
    }
}
