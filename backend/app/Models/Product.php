<?php

namespace App\Models;

use App\Models\ProductCOGS;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model implements Auditable
{
    use HasFactory, AuditableTrait;
    protected $guarded = [''];
    protected static $auditEvents = ['created', 'updated', 'deleted', 'restored'];
    protected static $auditInclude = ['name', 'harga_jual', 'harga_modal','stock']; // opsional

  
}
