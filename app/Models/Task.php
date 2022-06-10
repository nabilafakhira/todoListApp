<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = "tasks";
    protected $guarded = ['id'];
    public $timestamps = false;
    
    public function todolists()
    {
        return $this->hasMany(TodoList::class);
    }
}
