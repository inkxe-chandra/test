<?php
/**
 * 
 * @category   Category
 * @package    Eloquent
 * @author     Original Author <tanmayap@riaxe.com>
 * @author     Another Author <>
 * @copyright  2019-2020 Riaxe Systems
 * @license    http://www.php.net/license/3_0.txt  PHP License 3.0
 * @version    Release: @package_version@1.0
 */

namespace App\Components\Models;

use Illuminate\Database\Capsule\Manager as DB;

class Category extends \Illuminate\Database\Eloquent\Model {
    protected $primaryKey = 'xe_id';
    protected $table = 'categories';
    protected $guarded = ['xe_id'];
}
