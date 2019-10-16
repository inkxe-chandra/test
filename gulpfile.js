var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var exec2 = require('child_process').exec;
var exec = require('gulp-exec');
const { src,dest,series,task,watch,gulp } = require('gulp');

const localSettings={};
var fs = require('fs');
var gulpCopy = require('gulp-copy');

function gulp_init_settings(cb){
    localSettings.data = JSON.parse(fs.readFileSync('./envsettings.json'));
    cb();
    }
function xetool_apis(cb){
 console.log(localSettings);
 return src("api/**").pipe(dest(localSettings.data.tool_path+"/api/"));
    cb();
  }
  function merge_apis(cb){
    return exec2(localSettings.data.command_prefix+' cp -a '+'/var/www/inkxe10-cliparts/api/v1/app/.' +' '+localSettings.data.tool_path+'/api/v1/app/' , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });    
    cb();
  }
  function apache_server_down(cb){
    return exec2(localSettings.data.command_prefix+' service apache2 stop' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
      cb();
  }
  function build_docker_package(cb){
    var path =process.cwd();
    console.log(path);
    // console.log('cd /home/riaxe/ducker/inkxe10-docker/ && '+localSettings.data.command_prefix+' docker-compose up');
    return exec2('cd /home/riaxe/ducker/ && '+localSettings.data.command_prefix+' docker-compose build' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
    cb();
  }

  function initiate_docker_server(cb){
    var path =process.cwd();
    console.log(path);
    // console.log('cd /home/riaxe/ducker/inkxe10-docker/ && '+localSettings.data.command_prefix+' docker-compose up');
    return exec2('cd /home/riaxe/ducker/ && '+localSettings.data.command_prefix+' docker-compose up' , function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);    
      });   
    cb();
  }
  exports.xetool = series(gulp_init_settings,xetool_apis,merge_apis,apache_server_down);
  exports.start_docker = series(gulp_init_settings,build_docker_package,initiate_docker_server);
