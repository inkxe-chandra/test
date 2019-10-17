var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var exec2 = require('child_process').exec;
var exec = require('gulp-exec');
const { src,dest,series,task,watch,gulp } = require('gulp');

const envsettings={};
var fs = require('fs');
var gulpCopy = require('gulp-copy');

function gulp_init_settings(cb){
    envsettings.data = JSON.parse(fs.readFileSync('./envsettings.json'));
    cb();
    }
function xetool_apis(cb){
 return src(["api/v1/**","api/v1/.htaccess"]).pipe(dest(envsettings.data.project_path+"/"+envsettings.data.production_path+"/api/v1/"));
    cb();
  }
  function copy_xetool_vendor(cb){
   return src(["vendor/**"]).pipe(dest(envsettings.data.project_path+"/"+envsettings.data.production_path+"/api/v1/vendor/"));
      cb();
  }
  function copy_xetool_assets(cb){
    return exec2('('+envsettings.data.command_prefix+'[ -d "'+envsettings.data.project_path+'/'+envsettings.data.production_path+'/assets"'+' ] || mkdir "'+envsettings.data.project_path+'/'+envsettings.data.production_path+'/assets") && cp -a '+envsettings.data.project_path+'/inkxe10-**/assets/.' +' '+envsettings.data.project_path+"/"+envsettings.data.production_path+'/assets/' , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });    
    cb();
  }
  function delete_xetool(cb){
    return exec2(envsettings.data.command_prefix+'[ -d "'+envsettings.data.project_path+'/'+envsettings.data.production_path+'"'+' ] && rm -Rf "'+envsettings.data.project_path+'/'+envsettings.data.production_path+'"' , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });    
    cb();
  }
  function merge_apis(cb){
    return exec2(envsettings.data.command_prefix+' cp -a '+envsettings.data.project_path+'/inkxe10-**/api/v1/app/.' +' '+envsettings.data.project_path+"/"+envsettings.data.production_path+'/api/v1/app/ ' , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });    
    cb();
  }
  function apache_server_down(cb){
    return exec2(envsettings.data.command_prefix+' service apache2 stop' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
      cb();
  }
  function build_docker_package(cb){
    var path =process.cwd();
    console.log(path);
    // console.log('cd /home/riaxe/ducker/inkxe10-docker/ && '+envsettings.data.command_prefix+' docker-compose up');
    return exec2('cd /home/riaxe/ducker/ && '+envsettings.data.command_prefix+' docker-compose build' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
    cb();
  }

  function initiate_docker_server(cb){
    var path =process.cwd();
    console.log(path);
    // console.log('cd /home/riaxe/ducker/inkxe10-docker/ && '+envsettings.data.command_prefix+' docker-compose up');
    return exec2('cd /home/riaxe/ducker/ && '+envsettings.data.command_prefix+' docker-compose up' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
    cb();
  }
  exports.xetool = series(gulp_init_settings,delete_xetool,xetool_apis,copy_xetool_vendor,merge_apis,copy_xetool_assets);
  exports.start_docker = series(gulp_init_settings,build_docker_package,initiate_docker_server);
