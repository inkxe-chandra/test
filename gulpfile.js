var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var exec2 = require('child_process').exec;
var exec = require('gulp-exec');
var os = require('os');
const {src,dest,series,task,watch} = require('gulp');
var gulp = require('gulp');
var Prompt = require('prompt-checkbox');
const envsettings = {};
var fs = require('fs');
var gulpCopy = require('gulp-copy');
var filenames = require("gulp-filenames");
var pad = require('pad-number');
var rename = require("gulp-rename");
const Postgrator = require('postgrator');
const directoryExists = require('directory-exists');
var jscrambler = require('gulp-jscrambler');
const del = require('del');
var xetool_package_error='0';

function gulp_init_settings(cb) {
    envsettings.data = JSON.parse(fs.readFileSync('./envsettings.json'));
    cb();
}

function xetool_apis(cb) {
    return src(["api/v1/**", "api/v1/.htaccess"]).pipe(dest(envsettings.data.project_path + "/" + envsettings.data.production_path + "/api/v1/"));
    cb();
}

function copy_xetool_vendor(cb) {
    return src(["vendor/**"]).pipe(dest(envsettings.data.project_path + "/" + envsettings.data.production_path + "/api/v1/vendor/"));
    cb();
}

function copy_xetool_assets(cb) {
    return exec2('(' + envsettings.data.command_prefix + ' [ -d "' + envsettings.data.project_path + '/' + envsettings.data.production_path + '/assets"' + ' ] || mkdir "' + envsettings.data.project_path + '/' + envsettings.data.production_path + '/assets") && cp -a ' + envsettings.data.project_path + '/inkxe10-**/assets/.' + ' ' + envsettings.data.project_path + "/" + envsettings.data.production_path + '/assets/', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        detect_error(stderr)
    });
    cb();
}

function delete_xetool(cb) {
    return exec2(envsettings.data.command_prefix + ' [ -d "' + envsettings.data.project_path + '/' + envsettings.data.production_path + '" ] && rm -Rf "' + envsettings.data.project_path + '/' + envsettings.data.production_path + '" || echo "Message: Directory ' + envsettings.data.project_path + '/' + envsettings.data.production_path + ' does not exists."', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function merge_apis(cb) {
    return exec2(envsettings.data.command_prefix + ' cp -a ' + envsettings.data.project_path + '/inkxe10-**/api/v1/app/.' + ' ' + envsettings.data.project_path + "/" + envsettings.data.production_path + '/api/v1/app/ ', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        detect_error(stderr)
    });
    cb();
}

function apache_server_down(cb) {
    return exec2(envsettings.data.command_prefix + ' service apache2 stop', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function build_docker_package(cb) {

    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ && ' + envsettings.data.command_prefix + ' docker-compose build', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}


function initiate_docker_server(cb) {
    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ && ' + envsettings.data.command_prefix + ' docker-compose up', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function pull_dockerfiles(cb) {
    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ && ' + envsettings.data.command_prefix + ' docker-compose pull', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function stopxedocker(cb) {
    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ && ' + envsettings.data.command_prefix + ' docker-compose down && ' + envsettings.data.command_prefix + ' docker-compose stop', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function restartxedocker(cb) {
    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ && ' + envsettings.data.command_prefix + ' docker-compose restart', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function pullxeprojects(cb) {
    return exec2('cd ' + envsettings.data.project_path + 'inkxe10-env/docker/ &&' + envsettings.data.command_prefix + ' docker exec -d php72 cp -a /var/www/html/xeprojects/. /var/xeprojects', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function list_all_schema(cb) {
    directoryExists('../schema', (error, result) => {
        if (result === true) {
            return exec2(envsettings.data.command_prefix + ' rm -rf ../schema/*.sql && ' + envsettings.data.command_prefix + ' cp -rf ../inkxe10-*/schema/*.sql ../schema/', function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        } else {
            return exec2(envsettings.data.command_prefix + ' mkdir ../schema/ && ' + envsettings.data.command_prefix + ' rm -rf ../schema/*.sql && ' + envsettings.data.command_prefix + ' cp -rf ../inkxe10-*/schema/*.sql ../schema/', function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }
    });
    cb();

}

function rename_sql_files(cb) {
    return src(['../schema/**'])
        .pipe(require('gulp-filelist')('filelist.json', {
            relative: true
        })).pipe(dest('../out'));
    cb();
}

function sql_files_naming(cb) {
    var file_paths = require('../out/filelist.json');
    var count = 0;
    file_paths.forEach(function(file) {
        count++;
        var pad_number = pad(count, 3);
        var data = file.split(".");
        return src("../schema/" + file)
            .pipe(rename(pad_number + ".do." + data[2] + ".sql"))
            .pipe(dest("../out/"));
    });
    cb()
}

function remove_unwanted_sql(cb) {
    var file_paths = require('../out/filelist.json');
    file_paths.forEach(function(file) {
        exec2('sudo rm -rf ../schema/' + file, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    })
    cb();
}

function schema_update(cb) {
    const postgrator = new Postgrator({
        // Directory containing migration files
        migrationDirectory: '../out',
        validateChecksums: false, // Set to false to skip validation
        // newline: 'CRLF', // Force using 'CRLF' (windows) or 'LF' (unix/mac)
        // or a glob pattern to files
        // migrationPattern: __dirname + '/*',
        // Driver: must be pg, mysql, or mssql
        driver: 'mysql',
        // Database connection config
        host: envsettings.data.db_host,
        port: 3306,
        database: 'xe_install_db_inkxe_10',
        username: envsettings.data.db_user,
        password: envsettings.data.db_password,
        // Schema table name. Optional. Default is schemaversion
        // If using Postgres, schema may be specified using . separator
        // For example, { schemaTable: 'schema_name.table_name' }
        schemaTable: 'schema_version_xe'
    })
    return postgrator
        .migrate()
        .then(appliedMigrations => console.log(appliedMigrations))
        .catch(error =>detect_error(error));
    cb();
}
function detect_error(data){
    if(data){
        console.log(data);
        xetool_package_error=1;
    }else{
        xetool_package_error=0;
    }
}

function create_basic_sql(cb) {
    var db_password = (envsettings.data.db_password == '') ? '' : '-p' + envsettings.data.db_password;
    return exec2(envsettings.data.command_prefix +' '+envsettings.data.mysql_path+'mysqldump -h ' + envsettings.data.db_host + ' -u ' + envsettings.data.db_user + ' ' + db_password + '  xe_install_db_inkxe_10 > ../xetool/basic_database.sql', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function inkxe_admin(cb) {
    directoryExists(envsettings.data.project_path + '/inkxe10-designer-admin', (error, result) => {
        if (result === true) {
            return exec2('cd ' + envsettings.data.project_path + '/inkxe10-designer-admin && ' + envsettings.data.command_prefix + ' ng build --baseHref=./ --crossOrigin=anonymous --deleteOutputPath=true --deployUrl=./ --extractLicenses=false --lazyModules --optimization=true --outputHashing=all --prod=true --outputPath=../xetool/admin --resourcesOutputPath=./assets/fonts/', function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                console.log(err);
                if(stderr){
                    console.log("InkxeX_Designer_admin_build_failed");
                }else{
                    console.log("InkxeX_Designer_admin_build_successful");                    
                }
                
            });
        } else {
            console.log("Inkxe-X Designer Admin Is Not Present.");
        }
    });
    cb();
}

function copy_inkxe_to_package(cb) {
    return exec2(envsettings.data.command_prefix + ' cp -a ' + envsettings.data.project_path + '/inkxe10-designer-admin/dist/inkxe10-designer-admin/.' + ' ' + envsettings.data.project_path + "/" + envsettings.data.production_path + '/', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function scramble_code(cb) {
    var jscrambler_data = JSON.parse(fs.readFileSync('jscrambler.json'));
    return gulp
        .src([envsettings.data.project_path + '/xetool/admin/*.js','!'+envsettings.data.project_path + '/xetool/admin/polyfills-*.js','!'+envsettings.data.project_path + '/xetool/admin/runtime-*.js','!'+envsettings.data.project_path + '/xetool/admin/common-*.js','!'+envsettings.data.project_path +'/xetool/admin/main-*.js'])
        .pipe(jscrambler(jscrambler_data))
        .pipe(gulp.dest(envsettings.data.project_path + '/xetool/scrambled/'));
    cb();
}

function move_scrambled_codes_to_main(cb) {
    return exec2(envsettings.data.command_prefix + ' cp -rf ' + envsettings.data.project_path + '/xetool/xetool/admin/** ' + envsettings.data.project_path + '/xetool/admin/', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function resetenv(cb) {
    var platform = os.platform() === 'linux' ? 'ubuntu' : (
        os.platform() === 'darwin' ? 'mac' : (
            os.platform() === 'win32' ? 'win' : 'win'));
    console.log(platform);
    return gulp.src('localsettings_' + platform + '.json').pipe(concat('envsettings.json')).pipe(gulp.dest('./'));
    cb();
}

function exec_drop_basic_db(cb) {
    var db_password = (envsettings.data.db_password == '') ? '' : '-p' + envsettings.data.db_password;
    console.log(envsettings.data.command_prefix +' '+envsettings.data.mysql_path+'mysql -h ' + envsettings.data.db_host + ' -u ' + envsettings.data.db_user + ' ' + db_password + '  -e "DROP DATABASE IF EXISTS xe_install_db_inkxe_10";');
    return exec2(envsettings.data.command_prefix +' '+envsettings.data.mysql_path+'mysql -h ' + envsettings.data.db_host + ' -u ' + envsettings.data.db_user + ' ' + db_password + '  -e "DROP DATABASE IF EXISTS xe_install_db_inkxe_10";',
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    cb();
}

function exec_create_basic_db(cb) {
    var db_password = (envsettings.data.db_password == '') ? '' : '-p' + envsettings.data.db_password;
    return exec2(envsettings.data.command_prefix +' '+envsettings.data.mysql_path+'mysql -h ' + envsettings.data.db_host + ' -u ' + envsettings.data.db_user + ' ' + db_password + '  -e "CREATE DATABASE IF NOT EXISTS xe_install_db_inkxe_10";',
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    cb();
}

function update_build_modules(cb) {
    return exec2(envsettings.data.command_prefix + ' rm -rf  modules_list.txt && ' + envsettings.data.command_prefix + '  echo ' + envsettings.data.modules + ' >> modules_list.txt',
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    cb();
}

function clean_sql_directories(cb) {
    return exec2(envsettings.data.command_prefix + ' rm -rf ../out/* ../schema/*',
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    cb();
}
function update_angular_strict_mode(cb){
  directoryExists(envsettings.data.project_path + '/inkxe10-designer-admin', (error, result) => {
        if (result === true) {
            var config= JSON.parse(fs.readFileSync(envsettings.data.project_path + '/inkxe10-designer-admin/tsconfig.json'));
            config.compilerOptions.strict=false;         
            fs.writeFileSync(envsettings.data.project_path + '/inkxe10-designer-admin/tsconfig.json', JSON.stringify(config));
            // return exec2('cd ' + envsettings.data.project_path + '/inkxe10-designer-admin && ' + envsettings.data.command_prefix + ' ng build --baseHref=./ --crossOrigin=anonymous --deleteOutputPath=true --deployUrl=./ --extractLicenses=false --lazyModules --optimization=true --outputHashing=none --prod=true --outputPath=../xetool/admin --resourcesOutputPath=./assets/fonts/', function(err, stdout, stderr) {
            //     console.log(stdout);
            //     console.log(stderr);
            // });
        } else {
            console.log("Inkxe-X Designer Admin Is Not Present.");
        }
    });
    cb();
}
function inkxeX_xetool_build_successful(cb){
    console.log(xetool_package_error);
    if(xetool_package_error==1){
        console.log("inkxeX_xetool_package_created_unsuccessful.");
    }else{
    console.log("inkxeX_xetool_package_created_successfully.");
    }
    cb();
    }
exports.xetool = series(gulp_init_settings, clean_sql_directories, delete_xetool, list_all_schema, xetool_apis, copy_xetool_vendor, rename_sql_files, sql_files_naming, merge_apis, copy_xetool_assets, exec_drop_basic_db, exec_create_basic_db, schema_update, create_basic_sql,inkxeX_xetool_build_successful);
exports.start_docker = series(gulp_init_settings, build_docker_package, initiate_docker_server);
exports.pullxedocker = series(gulp_init_settings, pull_dockerfiles);
exports.stopxedocker = series(gulp_init_settings, stopxedocker);
exports.restartxedocker = series(gulp_init_settings, restartxedocker);
exports.pullxeprojects = series(gulp_init_settings, pullxeprojects);
exports.createbasicsql = series(gulp_init_settings, list_all_schema, rename_sql_files, sql_files_naming, exec_drop_basic_db, exec_create_basic_db, schema_update, create_basic_sql);
exports.scramblefiles = series(gulp_init_settings, scramble_code, move_scrambled_codes_to_main);
exports.resetenv = series(resetenv);
exports.update_build_modules = series(gulp_init_settings, update_build_modules);
exports.test = series(gulp_init_settings, clean_sql_directories, list_all_schema, rename_sql_files);
exports.inkxeadmin=series(gulp_init_settings,inkxe_admin);
exports.disable_angular_build_strict_mode=series(gulp_init_settings,update_angular_strict_mode);
