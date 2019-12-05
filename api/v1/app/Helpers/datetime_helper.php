<?php 

    use Illuminate\Database\Capsule\Manager as DB;
    use Carbon\Carbon as Carbon;
    use App\Components\Component;

    /**
     * @info: Change date formats with the help of Carbon-Eloquent
     * @input: date and format
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: converted Date
     */
    function convertDate($dateTime, $format = "") {
        $getStoreSetting = storeSettings();
        $defaultDateFormat = $getStoreSetting['date_format'];
        $defaultTimeFormat = $getStoreSetting['time_format'];
        if(empty($format)) {
            $format = $defaultDateFormat;
        }
        $carbon = Carbon::createFromFormat($format, $dateTime)->toDateTimeString();

        return $carbon;
       
    }

    /**
     * @info: It will convert a long text into a short text with a elipse dots
     * @input: long string
     * @created: 09 sep 2019
     * @modified: 
     * @author: tanmayap@riaxe.com
     * @return: a short format of string with elipse dots
     */
    function timeElapsed($datetime, $full = false) {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }