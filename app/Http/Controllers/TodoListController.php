<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Task;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodoListController extends Controller
{
    
  public function getTodoList($id)
      {
        try{
          $todo = TodoList::where('task_id', $id)
          ->orderBy('id', 'asc')
          ->get();
        // dd($todo[0]);
        return response()->json($todo);
        }
        catch(Exception $e){
          Log::error($e);
        }
      }  

  public function getTodoDetail($id)
      {
          try
          {
              $todo = TodoList::findOrFail($id);
              return response()->json($todo);
          }
          catch(Exception $e)
          {
              Log::error($e);
          }
      }
  public function storeTodo(Request $request)
      {
        $validatedData = $request->validate(['todoDesc' => 'required']);

        $todo = TodoList::create([
          'desc' => $validatedData['todoDesc'],
          'task_id' => $request->get('taskId'),
        ]);

        return response()->json(["status" => 200]);
      }

  public function updateTodo(Request $request)
      {
          try
          {
              $id = $request->get('todoId');
              $desc = $request->get('todoDesc');
  
              TodoList::where('id', $id)->update([
                  'desc'   =>  $desc
              ]);
  
              return response()->json(["status" => 200]);
          
          }
          catch(Exception $e)
          {
              Log::error($e);
          }
      }

      public function checkCompleteTask($id){
        $result = null;
        $task = Task::where('id', $id)
        ->withCount(['todolists', 'todolists as todoCompleted' => function ($query) {
          $query->where('completed', true);
        }])
        ->first();

        if($task->todolists_count == $task->todoCompleted){
          $task->completed = true;
          $task->update();
          $result = "Completed";
        }

        return $result;
      }

      public function markAsCompleted(TodoList $todo)
      {

        if ($todo->completed == true){
            $todo->completed = false;
        } else {
            $todo->completed = true;
        }
        $check = $this->checkCompleteTask($todo->task_id);
        $todo->update();

        return response()->json($check);
      }

      public function deleteTodo (TodoList $todo)
      {
          try
          {
              $todo->delete(); 
          }
          catch(Exception $e)
          {
              Log::error($e);
          }
      }
}
