<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    protected $table = "todolists";
    protected $guarded = ['id'];
    public $timestamps = false;

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
