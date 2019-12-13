"use strict";
const { src,dest,series,task,watch } = require('gulp');
const uglify = require('gulp-uglify');
const del = require('del');
const configs=[{ module_default: "product,plainText,productCanvas,design,cart,",build_path: 'xeapp',theme_name: 'default'}];
var os = require('os');
var open = require('gulp-open');
var concat = require('gulp-concat');
var clean = require('gulp-clean'),path = require('path'),connect = require('gulp-connect');
var minify = require('gulp-minifier');
var gulp = require('gulp');
var inject = require('gulp-inject-string');
var less = require('gulp-less');
var template = require('gulp-template-html');
var ngTemplates = require('gulp-ng-templates');
const htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
 var replace = require('gulp-string-replace');
//var replace = require('gulp-replace');
const argv = require('yargs').argv;
var fs = require('fs');
const split = require('split-string');
var search = require('gulp-search');
const fileExists = require('file-exists');
var append = require('gulp-append');
const chmod = require('gulp-chmod');
const Postgrator = require('postgrator');
var chug = require( 'gulp-chug' );
const xetoolsettings = {};const config={};const localSettings={};
var pad = require('pad-number');
var ngAnnotate = require('gulp-ng-annotate');
var pipeline = require('readable-stream').pipeline;
var exec2 = require('child_process').exec;
var exec = require('gulp-exec');
var notify = require("gulp-notify");
var jscrambler = require('gulp-jscrambler');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
const stripCssComments = require('gulp-strip-css-comments');
var cleanCSS = require('gulp-clean-css');
var jsonFormat = require('gulp-json-format');

function gulp_init_settings(cb){
localSettings.data = JSON.parse(fs.readFileSync('./envsettings.json'));
cb();
}
function clean_xelib(cb){
  if(config.build_path == "tool_plugin/"){
    return del(['tool_plugin/xelib/lib/**','!tool_plugin']);
  }else{
    return del(['xelib/lib/**','out/**','public/**']);
  }
  cb();
}
function clean_xetool_files(cb){
 return del(['xetool/**']);
cb();
}
function copy_xetoolfiles(cb){
  return gulp.series(
       copy_xetool_store_installation_files,copy_xetool_install_index_file,xetool_root,xetool_sql_files,xetool_images,xetool_api,xetool_admin,xetool_clientapp,xetool_store_images,xetool_version,xetool_quotation,xetool_zapier
    )();
  cb();
}
function copy_xetool_store_installation_files(cb){
 return src(["xelib/basic_admin_settings/store_details.json","ecommerce/install/"+xetoolsettings.store+"/**","!ecommerce/install/"+xetoolsettings.store+"/store_details.json","!ecommerce/install/"+xetoolsettings.store+"/xeconfig.php","!ecommerce/install/"+xetoolsettings.store+"/xeconfig.xml"]).pipe(dest('xetool/install/'+xetoolsettings.store));
cb();
}
function copy_xetool_sql_files(cb){
 return src(["ecommerce/sql/*"]).pipe(dest('xetool/install/'+xetoolsettings.store+'/sql'));
cb();
}
function copy_xetool_install_index_file(cb){
return src(["ecommerce/install/index.php"]).pipe(dest('xetool/install/')); 
  cb();
}
function xetool_root(cb){
return src(["ecommerce/install/"+xetoolsettings.store+"/xeconfig.php","ecommerce/install/"+xetoolsettings.store+"/xeconfig.xml","ecommerce/index.php","ecommerce/upgrade.php","ecommerce/xetool/.htaccess","clientapp/**","xelib/localsettings.js","xelib/storesettings.json"]).pipe(dest('xetool/')); 
  cb();
}
function xetool_sql_files(cb){
 return src(["ecommerce/sql/**"]).pipe(dest('xetool/install/'+xetoolsettings.store+'/sql/')); 
  cb();
}
function xetool_images(cb){
return src(["ecommerce/xetool/assets/images/**"]).pipe(dest('xetool/assets/'+xetoolsettings.storedir+'/images/'));
 cb();
}
function xetool_api(cb){
return src(["ecommerce/xetool/api/**"]).pipe(dest('xetool/api/'));
  cb();
}
function xetool_admin(cb){
  return src(['xeadminpro/adminapppro/**']).pipe(dest('xetool/admin/'));
  cb();
}
function xetool_clientapp(cb){
  return src(['clientapp/dev_inkxe_com/**','xelib/basic_admin_settings/adminsettings.js']).pipe(dest('xetool/'+xetoolsettings.storedir+'/'));
  cb();
}
function xetool_store_images(cb){
return src(["ecommerce/xetool/assets/images/**"]).pipe(dest('xetool/assets/'+xetoolsettings.storedir+'/images/'));
  cb();
}
function xetool_version(cb){
return src(["clientapp/version/**"]).pipe(dest('xetool/version/'));
  cb();
}
function xetool_quotation(cb){
return src(["quotation/**"]).pipe(dest('xetool/quotation/'));
cb();
}
function xetool_zapier(cb){
return src(["ecommerce/xetool/zapier/**"]).pipe(dest('xetool/zapier/'));
  cb();
}
function xetool_zapier_htaccess(cb){
return src(["ecommerce/xetool/zapier/public/.htaccess"]).pipe(dest('xetool/zapier/public/'));
  cb();
}

function concat_basic(cb){
 return pipeline(
        gulp.src([config.build_path+"xeapp/app_main.js",config.build_path+"xeapp/config.js",config.build_path+"xeapp/licensekey.js",config.build_path+"xeapp/controllers/*.js",config.build_path+"xeapp/directives/**/*.js",config.build_path+"xeapp/events/events.js",config.build_path+"xeapp/filters/*.js",config.build_path+"xeapp/models/*.js",config.build_path+"xeapp/modules/cart/**/*.js",config.build_path+"xeapp/modules/imageFilter/**/*.js",config.build_path+"xeapp/modules/imageMask/**/*.js",config.build_path+"xeapp/modules/layers/**/*.js",config.build_path+"xeapp/modules/product/**/*.js",config.build_path+"xeapp/modules/productCanvas/**/*.js",config.build_path+"xeapp/modules/selectColor/**/*.js",config.build_path+"xeapp/modules/webFonts/**/*.js",config.build_path+"xeapp/services/**/*.js"]),
        concat('libenc.js', {newLine: ';'}),
        replace(';;', ';'),
        gulp.dest(config.build_path+'xelib'));
  cb();
}
function concat_appvendors(cb){
console.log(config.build_path);
  return pipeline(
        gulp.src([config.build_path+'vendors/rgbcolor.js', config.build_path+'vendors/StackBlur.js', config.build_path+'vendors/canvg.js', config.build_path+'vendors/inkxe-extension.js',config.build_path+'vendors/jquery-ui-1.8.17.custom.min.js', config.build_path+'vendors/ngFacebook.js', config.build_path+'vendors/angular-minicolors.js', config.build_path+'vendors/jquery.minicolors.js']),
        concat('app555.js', {newLine: ';'}),
        replace(';;', ';'),
        gulp.dest(config.build_path+'xelib'));
   cb();
}
function concat_apptextlib(cb){
  return pipeline(
        gulp.src([config.build_path+'vendors/circletype.js', config.build_path+'vendors/fittext.js', config.build_path+'vendors/lettering.js', config.build_path+'vendors/csswarp.0.7.js']),
       concat('textlib.js', {newLine: ';'}),
        gulp.dest(config.build_path+'xelib/lib/'));
  cb();
}
function concat_appimglib(cb){
 return pipeline(
        gulp.src([config.build_path+'vendors/rgbquant.js', config.build_path+'vendors/magic-wand-min.js', config.build_path+'vendors/jquery.fb.albumbrowser.js', config.build_path+"vendors/color-thief.js"]),
        concat('imglib.js', {newLine: ';'}),
        gulp.dest(config.build_path+'xelib/lib/'));
  cb();
}
function concat_appsvglib(cb){
 return pipeline(
        gulp.src([config.build_path+'svgeditor/browser.js', config.build_path+'svgeditor/svgtransformlist.js', config.build_path+'svgeditor/math.js', config.build_path+'svgeditor/units.js', config.build_path+'svgeditor/svgutils.js', config.build_path+'svgeditor/sanitize.js', config.build_path+'svgeditor/history.js', config.build_path+'svgeditor/select.js', config.build_path+'svgeditor/draw.js', config.build_path+'svgeditor/pathseg.js', config.build_path+'svgeditor/path.js', config.build_path+'svgeditor/touch.js', config.build_path+'svgeditor/svgcanvas.js', config.build_path+'svgeditor/svgEditor.js', config.build_path+'svgeditor/historyxe.js', config.build_path+'svgeditor/extensions/ext-curvetext.js', config.build_path+'svgeditor/extensions/ext-design.js', config.build_path+'svgeditor/extensions/ext-handDrawing.js', config.build_path+'svgeditor/extensions/ext-imagelib.js', config.build_path+'svgeditor/extensions/ext-multiboundary.js', config.build_path+'svgeditor/extensions/ext-nameNumber.js', config.build_path+'svgeditor/extensions/ext-plaintext.js', config.build_path+'svgeditor/extensions/ext-qrcode.js', config.build_path+'svgeditor/extensions/ext-shape.js', config.build_path+'svgeditor/extensions/ext-textart.js', config.build_path+'svgeditor/extensions/ext-textfx.js', config.build_path+'svgeditor/extensions/ext-textOnPath.js', config.build_path+'svgeditor/extensions/ext-wordcloud.js', config.build_path+'svgeditor/extensions/ext-background.js', config.build_path+'svgeditor/extensions/ext-backgroundPattern.js', config.build_path+'svgeditor/extensions/ext-templateLocking.js', config.build_path+'svgeditor/extensions/ext-bulkOrder.js']),
        concat('svglib.js', {newLine: ';'}),
        gulp.dest(config.build_path+'xelib/'));
  cb();
}
function appmodule_app(cb){
  localSettings.data.modules.forEach(function(module_name) {
  concat_module(module_name);
  ng_template_appmodule(module_name);
   });
 return  src([config.build_path+'xelib/app/views/**.js']).pipe(concat('.js',{newLine: ';'})).pipe(dest(config.build_path+'xelib/app/views/'));
  cb();
}
function concat_module(module_name){
  return src([config.build_path+configs[0].build_path+'/modules/'+module_name+'/models/**/*.js', config.build_path+configs[0].build_path+'/modules/'+module_name+'/directives/**/*.js', config.build_path+configs[0].build_path+'/modules/'+module_name+'/services/**/*.js', config.build_path+configs[0].build_path+'/modules/'+module_name+'/controllers/**/*.js']).pipe(concat(module_name+'.js')).pipe(replace(';;', ';')).pipe(dest(config.build_path+'xelib/app/modules/'));
}
function ng_template_appmodule(module_name){
  var TEMPLATE_HEADER = "GlobaltemplateCache.put";
  var TEMPLATE_BODY = "('modules/"+module_name+"<%= url %>','<%= contents %>');";
  var TEMPLATE_FOOTER = '';
return gulp.src([config.build_path+configs[0].build_path+'/modules/'+module_name+'/'+'**/**.html'])
    .pipe(templateCache({templateHeader:TEMPLATE_HEADER,templateBody:TEMPLATE_BODY,templateFooter:TEMPLATE_FOOTER})).pipe(concat(module_name+'.js')).pipe(gulp.dest(config.build_path+'xelib/app/views/'));
}
function cssmin(cb){
 return  src([config.build_path+configs[0].build_path+'/**/**.css']).pipe(minify({minifyCSS: true})).pipe(concat('all.css')).pipe(dest(config.build_path+'xelib/'));
  cb();
}
function less_development(cb){
 return src([config.build_path+configs[0].build_path+'/styles/less/docs.less',configs[0].build_path+'/assets/**/**.less'], { sourcemaps: true }).pipe(less()).pipe(stripCssComments()).pipe(cleanCSS({compatibility: 'ie8'})).pipe(concat('allless.css')).pipe(dest(config.build_path+'xelib/dev_inkxe_com/'));
  cb();
}
function file_list(cb){
  return  gulp.src([config.build_path+'xeapp/**/**.html','!'+config.build_path+'xeapp/modules/background/**/**','!'+config.build_path+'xeapp/modules/backgroundPattern/**/**','!'+config.build_path+'xeapp/modules/design/**/**','!'+config.build_path+'xeapp/modules/distressEffect/**/**', '!'+config.build_path+'xeapp/modules/handDrawing/**/**','!'+config.build_path+'xeapp/modules/nameNumber/**/**','!'+config.build_path+'xeapp/modules/plainText/**/**', '!'+config.build_path+'xeapp/modules/reduceColor/**/**', '!'+config.build_path+'xeapp/modules/shape/**/**', '!'+config.build_path+'xeapp/modules/template/**/**', '!'+config.build_path+'xeapp/modules/textArt/**/**', '!'+config.build_path+'xeapp/modules/textFX/**/**', '!'+config.build_path+'xeapp/modules/textInShape/**/**', '!'+config.build_path+'xeapp/modules/textOnPath/**/**', '!'+config.build_path+'xeapp/modules/curveText/**/**', '!'+config.build_path+'xeapp/modules/myImage/**/**', '!'+config.build_path+'xeapp/modules/wordCloud/**/**', '!'+config.build_path+'xeapp/modules/templateLocking/**/**', '!'+config.build_path+'xeapp/modules/templateEditForm/**/**', '!'+config.build_path+'xeapp/modules/imageSettings/**/**', '!'+config.build_path+'xeapp/modules/preview3D/**/**','!'+config.build_path+'xeapp/modules/bulkOrder/**/**','!'+config.build_path+'xeapp/modules/vdp/**/**','!'+config.build_path+'xeapp/modules/quoteRequest/**/**','!'+config.build_path+'xeapp/modules/productConfigurator/**/**','!'+config.build_path+'xeapp/modules/quoteRequest/**/**'])
  .pipe(require('gulp-filelist')('filelist.json', { relative: true })).pipe(gulp.dest('./out'));
  cb();
}
async function ngtemplates(cb){
var file_paths = require('./out/filelist.json');
await file_paths.forEach(function(file){
var TEMPLATE_HEADER = "$templateCache.put";
var TEMPLATE_BODY = "('"+file+"','<%= contents %>');";
var TEMPLATE_FOOTER = '';
console.log(file);
return gulp.src([config.build_path+'xeapp/'+file]).pipe(templateCache({templateHeader:TEMPLATE_HEADER,templateBody:TEMPLATE_BODY,templateFooter:TEMPLATE_FOOTER})).pipe(concat(file)).pipe(gulp.dest(config.build_path+'public/'));
  });
  cb();
}
function generate_xeview_js(cb){
  return  src(config.build_path+'public/**/**.html').pipe(concat('xeview.js')).pipe(inject.prepend("angular.module('appMain').run(['$templateCache', function($templateCache) {'use strict';")).pipe(inject.append("}]);")).pipe(dest(config.build_path+'xelib'));
  cb();
}
function clean_clientapp(cb){
 return del('clientapp/**');
  cb();
}
function concat_mergeall(cb){
 return  src([config.build_path+'xelib/xelib.js', config.build_path+'xelib/app555.js', config.build_path+'xelib/svglib.js', config.build_path+'xelib/app777.js', config.build_path+'xelib/libenc.js', config.build_path+'xelib/xeview.js']).pipe(concat('xeapp.js',{newLine: ';'})).pipe(dest(config.build_path+'xelib'));
 cb();
}
function copy_copyextlibonly(cb){
  var data = ['angular.js','angular-csv.js','bootstrap.min.js','d3.js','d3Layout.js','instagram.js','ivank.js','main.js','opentype.js','potrace.js','qrcodegen.js','raphael.js','require.js','kinetic.js','popper.min.js','three.js','OBJLoader.js','download.js','gif.js','TrackballControls.js','OrbitControls.js','jQuery_UI_v1.9.2.js','angular-datepicker.js'];
  var streams = [];
  var count=0;
  data.forEach(function(file){
  count++;
  return  src(config.build_path+'vendors/'+file).pipe(concat('xelib00'+count+'.js',{newLine: ';'})).pipe(dest(config.build_path+'xelib/lib'));
    });
  cb();
}
function copy_main(cb){
  return gulp.series(copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js)();
 cb();
}
function copy_assets(cb){
var cwd=process.cwd();
return src([config.build_path+'xeapp/assets/**', '!'+config.build_path+'xeapp/assets/**/*.js', '!'+config.build_path+'xeapp/assets/**/*.less', '!'+config.build_path+'xeapp/assets/**/*.css']).pipe(dest('clientapp/assets'));
 cb();
}
function copy_html_files(cb){
  return src([config.build_path+'xeapp/*.html']).pipe(dest('clientapp'));
  cb();
}
function copy_extensions(cb){
  return src([config.build_path+'xeapp/extension/**']).pipe(dest('clientapp/extension'));
  cb();
}
function copy_client_app(cb){
   return src([config.build_path+'xelib/**',config.build_path+'xelib/*.js', config.build_path+'xelib/lib/**', '!'+config.build_path+'xelib/xelib.js', '!'+config.build_path+'xelib/app555.js', '!'+config.build_path+'xelib/svglib.js', '!'+config.build_path+'xelib/app777.js', '!'+config.build_path+'xelib/libenc.js', '!'+config.build_path+'xelib/xeview.js', '!'+config.build_path+'xelib/settings.json', '!'+config.build_path+'xelib/basic_admin_settings/**', '!'+config.build_path+'xelib/storesettings.json','!'+config.build_path+'xelib/jscrambler.json','!'+config.build_path+'xelib/imglib.js', '!'+config.build_path+'xelib/textlib.js']).pipe(dest('clientapp'));
  cb();
}
function copy_local_settings(cb){
  return src([config.build_path+'xelib/localsettings.js', config.build_path+'xelib/settings.json']).pipe(dest('clientapp'));
  cb();
}
function copy_languages(cb){
   return src([config.build_path+'languages/**']).pipe(dest('clientapp/languages'));
  cb();
}
function copy_includes(cb){
  return src([config.build_path+'includes/**']).pipe(dest('clientapp/includes'));
   cb();
}
function copy_add_this_js(cb){
 return src([config.build_path+'vendors/addThis.js']).pipe(dest('clientapp'));
  cb();
}
function connect_server(cb){
   var cwd=process.cwd();
   var browser = os.platform() === 'linux' ? 'google-chrome' : (
   os.platform() === 'darwin' ? 'google chrome' : (
   os.platform() === 'win32' ? 'chrome' : 'firefox'));
   var host =(localSettings.data.protocol+'://'+localSettings.data.host+':3333/clientapp/index.html?pid='+localSettings.data.first_product_id+'&pt='+localSettings.data.print_type_id+'&xedev=1&store=0');
   connect.server({
    root:cwd,
    port: 3333,
    host: "dev.inkxe.com",
    path:'/clientapp/index.html',
    livereload: true
    });
 return src('./clientapp/').pipe(open({app:browser,uri:host}));
 cb();
}
function focus_appdev(cb){
  gulp.src('./clientapp/index.html')
    .pipe(connect.reload());
    watch(['xeapp/**','svgeditor/**'], series(clean_xelib,clean_clientapp,file_list,concat_basic,concat_appvendors,concat_apptextlib,concat_appimglib,copy_copyextlibonly, concat_appsvglib,appmodule_app,cssmin,less_development,ngtemplates,concat_mergeall, copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js));   
  cb();
}
function set_store_settings(cb){
var dev_store_root    = localSettings.data.dev_store_root;
var db_password       = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
var curStoreSettings  = JSON.parse(fs.readFileSync('./qaenv/' + path.basename( argv.type) + '/storeenv.json'));
const storeXEDBName   = argv.type.replace('-', '_');
var hostname          = curStoreSettings.store_url.split('/')[2];
var hostnameDir       = hostname.replace(/[.*+?^${}()|[\]\\]/g, '_');
curStoreSettings.host_name_dir = hostnameDir;
if (argv.type.indexOf('wc3')   != -1) {
    curStoreSettings.db_name   = 'wc3_xe';
  } else if (argv.type.indexOf('wc') != -1) {
    curStoreSettings.db_name   = 'wc_xe';
     } else {
    var  dbName = argv.type.replace('-', '_') + '_xe';
    curStoreSettings.db_name = dbName;
    curStoreSettings.store_settings_path = dev_store_root + curStoreSettings.store_settings_path + hostnameDir;
  }
  config['storeXEPath']   = curStoreSettings.client_app_dest
  config['db_password']   = db_password;
  config.curStoreSettings = curStoreSettings;
  fileExists(dev_store_root + curStoreSettings.local_settings_path + '/localsettings.js').then(exists => {
  if(exists===true){
  var curDeploySettings = fs.readFileSync(dev_store_root + curStoreSettings.local_settings_path + '/localsettings.js', "utf8");
  } else{ 
  var curDeploySettings = fs.readFileSync(dev_store_root + curStoreSettings.client_app_dest + '/localsettings.js', "utf8");
  } 
  curDeploySettings = curDeploySettings.replace('var RIAXEAPP = {};', '');
  curDeploySettings = curDeploySettings.replace('var RIAXEAPP ={};', '');
  curDeploySettings = curDeploySettings.replace('RIAXEAPP.localSettings = ', '');
  curDeploySettings = curDeploySettings.replace('"load_variant_as_color_bg": {value:false,sides:4},', '');
  curDeploySettings = curDeploySettings.replace('"load_variant_as_color_bg": {value:true,sides:4},', '');
  curDeploySettings = curDeploySettings.replace('};', '}');
});
    var  newSettings = fs.readFileSync('xelib/localsettings.js', "utf8");
    newSettings = newSettings.replace('var RIAXEAPP = {};', '');
    newSettings = newSettings.replace('RIAXEAPP.localSettings = ', '');
    newSettings = newSettings.replace('};', '}');
    newSettings = newSettings.replace('"load_variant_as_color_bg": {value:false,sides:4},', '');
    var curLocalSettingsObj = JSON.parse(newSettings);
    var newSettingsObj = JSON.parse(newSettings);
    newSettingsObj.base_url = curStoreSettings.store_url;
    newSettingsObj['service_api_url'] = curLocalSettingsObj.service_api_url;
    newSettingsObj['license_key'] = curLocalSettingsObj.license_key;
    newSettingsObj['product_history_app'] = curLocalSettingsObj['product_history_app'];
    var localsettings_js = 'var RIAXEAPP = {};' + 'RIAXEAPP.localSettings = ' + JSON.stringify(newSettingsObj) + ';';
    config['storeSettings']=curStoreSettings;
    gulp.src(dev_store_root + curStoreSettings.local_settings_path + '/localsettings.js').pipe(inject.append(localsettings_js,{json: true}));
    cb();
}
function xetool_set_config(cb){
  var dev_store_root = localSettings.data.dev_store_root;
  var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  config.db_password=db_password;
  var storesettingjson = {};
  var hostsubdomain = argv.type.replace('-', '');
  var isInit = argv.init;
  var plugin = argv.plugin;
  var isInstall = argv.install;
  var isLive = argv.live;  
  xetoolsettings.storelocaldir = argv.type;
  xetoolsettings.store = argv.type.split("-")[0];
  xetoolsettings.xetoolstoreplatform = '"' + xetoolsettings.store + '"';
  xetoolsettings.copyxetoolto = dev_store_root + argv.type + '/xetool/';
  xetoolsettings.storequotationdir = dev_store_root + argv.type + '/quotation/';
  if (xetoolsettings.store == 'oc') {
    xetoolsettings.store = 'opencart';
    xetoolsettings.xetoolstoreplatform = '"opencart"';
  }
  if (xetoolsettings.store == 'magetwo') {
    xetoolsettings.store = 'magento2';
    xetoolsettings.xetoolstoreplatform = '"magento2"';
  }
  if (argv.type.search('prestashop-17') != -1) {
    xetoolsettings.store = 'prestashop17';
    xetoolsettings.xetoolstoreplatform = '"prestashop17"';
  }
  if (xetoolsettings.store == 'wc3') {
    xetoolsettings.store = 'woocommerce3';
    xetoolsettings.copyxetoolto = dev_store_root + 'woocommerce3/xetool/';
    xetoolsettings.storelocaldir = 'woocommerce3';
    xetoolsettings.xetoolstoreplatform = '"woocommerce3"';
  } else if (xetoolsettings.store == 'wc') {
    xetoolsettings.store = 'woocommerce';
    xetoolsettings.copyxetoolto = dev_store_root + 'woocommerce/xetool/';
    xetoolsettings.storelocaldir = 'woocommerce';
    xetoolsettings.xetoolstoreplatform = '"woocommerce"';
  }
  xetoolsettings.xetoolstoredomain = hostsubdomain + '.inkxe.com';
  xetoolsettings.xetoolstoreurl = 'http://' + hostsubdomain + '.inkxe.com/';
  xetoolsettings.installurl = 'http://' + hostsubdomain + '.inkxe.com/xetool/index.php';
  xetoolsettings.storedir = hostsubdomain + '_inkxe_com';
  config.xetoolsettings = xetoolsettings;  
 cb();     
}

function custom_store_schema_update(cb){
  var dbName = 'xe_install_db';
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  if(argv.type=='shopify'){
    var schemaname='alter-commands-for-shopify.sql';
  }else if(argv.type=='threedcart'){
    var schemaname='threedcart_cartdata_webhook.sql';
  }else if(argv.type=='bigcommerce'){
    var schemaname='bigcommerce-cartdata-webhook-commands.sql';
  }
 return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+'  -u '+localSettings.data.db_user+' '+db_password+' xe_install_db < ' + process.cwd() + '/schema/'+schemaname, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });

  cb();
}
function schema_update(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: __dirname + '/schema',
   validateChecksums: false, // Set to false to skip validation
  // newline: 'CRLF', // Force using 'CRLF' (windows) or 'LF' (unix/mac)
  // or a glob pattern to files
  // migrationPattern: __dirname + '/*',
  // Driver: must be pg, mysql, or mssql
  driver: 'mysql',
  // Database connection config
  host: localSettings.data.db_host,
  port: 3306,
  database: 'xe_install_db',
  username: localSettings.data.db_user,
  password: localSettings.data.db_password,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schema_version_xe'
}) 
  return postgrator
  .migrate()
  .then(appliedMigrations => console.log(appliedMigrations))
  .catch(error => console.log(error)); 
   cb();
 }
 function store_schema_update(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  var  dbName = argv.type.replace('-', '_') + '_xe';
  const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: __dirname + '/schema',
    validateChecksums: false, // Set to false to skip validation
  // newline: 'CRLF', // Force using 'CRLF' (windows) or 'LF' (unix/mac)
  // or a glob pattern to files
  // migrationPattern: __dirname + '/*',
  // Driver: must be pg, mysql, or mssql
  driver: 'mysql',
  // Database connection config
  host: localSettings.data.db_host,
  port: 3306,
  database: dbName,
  username: localSettings.data.db_user,
  password: localSettings.data.db_password,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schema_version_xe'
}) 
  return postgrator
  .migrate().then(appliedMigrations => console.log(appliedMigrations)).catch(error => console.log(error)); 
   cb();
 }
function appcodeonly(cb){
 return gulp.series(
        concat_basic,concat_appvendors,concat_apptextlib,concat_appimglib,concat_appsvglib,cssmin,less_development,ngtemplates,concat_mergeall,copy_copyextlibonly
    )();
 cb();
}
function admincodeonly(cb){
  return gulp.src( './xeadminpro/gulpfile.js' )
        .pipe( chug( {
            nodeCmd: 'node',
            tasks:  [ 'admincodeonly' ],
            args:   []
        } ) );
  cb();
}
function copy_copyToolAPI(cb){
  config_apis(cb);
  xetool_apis(cb);
  store_settings_json(cb);                 
  cb();
}
function config_apis(cb){
  return exec2(localSettings.data.command_prefix+' cp -rf '+config.storeSettings.tool_api_src+'/**'+' '+localSettings.data.dev_store_root+config.storeSettings.tool_api_dest , function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function xetool_apis(cb){
  return exec2(localSettings.data.command_prefix+' cp -rf '+'ecommerce/xetool/api/**' +' '+localSettings.data.dev_store_root+config.storeSettings.tool_api_dest , function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function store_settings_json(cb){
  return src(config.build_path+'xelib/storesettings.json').pipe(dest(localSettings.data.dev_store_root+config.storeSettings.tool_api_dest));
  cb();
}
function copy_copyAdminAppStore(cb){
  return src(config.storeSettings.admin_app_src+'/**').pipe(dest(localSettings.data.dev_store_root+config.storeSettings.admin_app_dest));
  cb();
}
function copy_copyClientAppStore(cb){
  return src([config.storeSettings.client_app_src+'/**','!'+config.storeSettings.client_app_src+'/localsettings.js']).pipe(dest(localSettings.data.dev_store_root+config.storeSettings.client_app_dest));
  cb();
}
function copy_copyClientAppCSS(cb){
  return src([config.storeSettings.client_app_src+'/dev_inkxe_com/**','!'+config.storeSettings.client_app_src+'/**/adminsettings.js','!'+config.storeSettings.client_app_src+'/**/style.css']).pipe(dest(localSettings.data.dev_store_root+config.storeSettings.client_app_dest+"/"+config.storeSettings.host_name_dir));
  cb();
}
function appquotation(cb){
  copy_copyxequote(cb);
  concat_quotationscript(cb);
  concat_quotationvendor(cb);
  exec_set_permission(cb);
  cb();
}
function copy_copyxequote(cb){
  return src(['xequote/**','!xequote/js/**']).pipe(dest('./quotation/'));
}
function concat_quotationscript(cb){
 return gulp.src(['xequote/js/script/app.js', 'xequote/js/script/form.js', 'xequote/js/script/service.js', 'xequote/js/script/quotationModel.js', 'xequote/js/script/directive/num_directive.js', 'xequote/js/script/directive/angular-file-upload.js', 'xequote/js/script/directive/valid_dimension.js']).pipe(concat('xequote.js',{newLine: ';'})).pipe(gulp.dest('./quotation/'));
}
function concat_quotationvendor(cb){
 return gulp.src(['xequote/js/vendor/jquery.min.js', 'xequote/js/vendor/bootstrap.min.js', 'xequote/js/vendor/angular.js']).pipe(concat('lib.js',{newLine: ';'})).pipe(gulp.dest('./quotation/'));
  cb();
}
function exec_set_permission(cb){
   return gulp.src('quotation').pipe(chmod(0o755));
   cb();
}
function copy_copyzapier_store(cb){
  return gulp.src(['ecommerce/xetool/zapier/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeXEPath+"/zapier"));
   cb();
}
function copy_copyzapier_store_htaccess(cb){
 return gulp.src(['ecommerce/xetool/zapier/public/.htaccess']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeXEPath+"/zapier/public"));
  cb();
}
function copy_copyOCStoreAPI(cb){
  return gulp.series(
        copy_OC_store_api,copy_store_oc_xml
    )();
  cb();
}
function copy_OC_store_api(cb){
 return gulp.src([config.storeSettings.store_api_src+'/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeSettings.store_api_dest));
cb();
}
function copy_store_oc_xml(cb){
 return gulp.src([config.storeSettings.store_oc_xml_src+'/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeSettings.store_oc_xml_dest));
 cb(); 
}
function copy_copyWCStoreAPI(cb){
 return gulp.src([config.storeSettings.store_api_src+'/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeSettings.store_api_dest));
  cb();
}
function copy_copyPrestashopStoreAPI(cb){
  return gulp.src([config.storeSettings.store_api_src+'/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeSettings.store_api_dest));
 cb();
}
function setupstoreplugin(cb){
  var plugin_name = argv.plugin;
  if (plugin_name && plugin_name != '' ){
fileExists('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json').then(exists => {
  if(exists===true){
    var pluginsettings = JSON.parse(fs.readFileSync('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json'));
     if(pluginsettings.type.indexOf('store') != -1 || pluginsettings.type.indexOf('install') != -1){
        var storeAPIPath = config.storeSettings.store_api_src;
        var custStoreAPIPath = storeAPIPath.replace('ecommerce', 'xeplugin/' + plugin_name);
        config.custom_store_api_path= custStoreAPIPath;
        copyCustomStoreAPI(cb);
    }if(pluginsettings.type.indexOf('sql') != -1){
      exec_run_custom_sql(cb);
      }
  } 
});
}
cb();
}
function copyCustomStoreAPI(cb){  
return gulp.src([configs.custom_store_api_path]).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeSettings.store_api_dest));
cb();
}
function exec_run_custom_sql(cb){
  var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  var storeXEDBName   = argv.type.replace('-', '_');
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
   return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+'  -u '+localSettings.data.db_user+' '+db_password+'  -h '+localSettings.data.db_host+'  '+storeXEDBName+' < ' + process.cwd() + '/xeplugin/'+argv.plugin+'/sql/plugin_script.sql', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
cb();
}
function setupapiplugin(cb){
 var plugin_name = argv.plugin;
 if (plugin_name && plugin_name != '' ){
  fileExists('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json').then(exists => {
    if(exists===true){
      var pluginsettings = JSON.parse(fs.readFileSync('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json'));
      if(pluginsettings.type.indexOf('api') != -1){
        var toolAPIPath = config.storeSettings.tool_api_src;
        var custToolAPIPath = toolAPIPath.replace('ecommerce', 'xeplugin/' + argv.plugin);
        config.custom_tool_api_path= custToolAPIPath;
        copy_copyCustomToolAPI();
        }
      } 
    });
   } 
  cb();
}
function copy_copyCustomToolAPI(cb){
return src(config.custom_tool_api_path).pipe(dest(localSettings.data.dev_store_root+config.storeSettings.tool_api_dest));
cb();
}
function open_store(cb){
  console.log(localSettings.data.dev_store_root+config.storeXEPath);
return gulp.src("").pipe(open({app: 'google-chrome',uri: config.storeSettings.store_url}));
  cb();
}
function copy_copyMageStoreAPI(cb){
  console.log(localSettings.data.command_prefix+' cp -rf '+config.storeSettings.store_api_src+'/**' +' '+localSettings.data.dev_store_root+config.storeSettings.store_api_dest+'/');
return exec2(localSettings.data.command_prefix+' cp -rf '+config.storeSettings.store_api_src+'/**' +' '+localSettings.data.dev_store_root+config.storeSettings.store_api_dest+'/' , function (err, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);    
});
 cb();
}
function copyPrestashopStoreTheme1750(cb){
  return exec2(localSettings.data.command_prefix+' cp -rf '+config.storeSettings.store_api_src+'/theme1750/**' +' '+localSettings.data.dev_store_root+config.storeSettings.store_api_dest+'/themes/' , function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  
  cb();
}
function copyPrestashopStoreTheme1740(cb){
  return exec2(localSettings.data.command_prefix+' cp -rf '+config.storeSettings.store_api_src+'/theme1740/**' +' '+localSettings.data.dev_store_root+config.storeSettings.store_api_dest+'/themes/' , function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function setupadminplugin(cb){
  var plugin_name =argv.plugin;
  if(plugin_name){
    config.plugin_name=argv.plugin;
    if (plugin_name && plugin_name != '' && fileExists('./xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json')) {
      var pluginsettings=JSON.parse(fs.readFileSync('./xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json','utf8'));
      if(pluginsettings.type.indexOf('admin') != -1){
        config.admin_build_path='admin_plugin';
        clean_xeadmintemp(cb);
        copy_copyxeAdminTemp(cb);
        copy_copyxeAdminPlugin(cb);
      }
    }
  }
  cb();
}
function clean_xeadmintemp(cb){
  if(config.admin_build_path == "admin_plugin"){
    return del(['./xeadminpro/admin_plugin/**']);
  }
  cb();
}
function copy_copyxeAdminTemp(cb){
  if(config.admin_build_path == "admin_plugin"){
    return src(['./xeadminpro/xeadminlib/**','./xeadminpro/vendors/**','./xeadminpro/xeadminapp/**','./xeadminpro/languages/**'], { base: '.' }).pipe(dest('./xeadminpro/admin_plugin/'));
  }
  cb();
}
function  copy_copyxeAdminPlugin(cb){
  if(config.admin_build_path == "admin_plugin"){
    return src('./xeplugin/'+config.plugin_name+'/admin/**').pipe(dest('./xeadminpro/admin_plugin/'));
  }
  cb();
}
function store_init_functions(cb){
  if (argv.init || argv.plugin) {
    if(argv.plugin){
      config.plugin_name=argv.plugin;
      setupadminplugin(cb);
      setuptoolplugin(cb);
    }   
  }     
  cb();
}
function copy_store_api(cb){
 if(argv.type.indexOf('magento')==0){
  copy_copyMageStoreAPI(cb);
 }
 if(argv.type.indexOf('magetwo')==0){
  copy_copyMageStoreAPI(cb);
 }if(argv.type.indexOf('oc')==0){
  copy_copyMageStoreAPI(cb);
 }if(argv.type.indexOf('wc')==0){
  copy_copyMageStoreAPI(cb);
 }if(argv.type.indexOf('prestashop')==0){
  var prestashop_version= argv.type.split('-');
  var version= prestashop_version[1];
  if(version > 1744){
    copyPrestashopStoreTheme1750(cb);
    }else if(version >= 1734 ){
    copyPrestashopStoreTheme1740(cb);
  }
  copy_copyMageStoreAPI(cb);
 }if (argv.plugin && argv.plugin != '') {
  setupstoreplugin(cb);
  setupapiplugin(cb);
  }
  cb();
}
function exec_drop_db(cb){
 var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password; 
   var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "exec_drop_db" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return  exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  -e "DROP DATABASE IF EXISTS '+config.dbName+'";', 
    function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function exec_create_db(cb){
  var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password; 
   var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "exec_create_db" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  -e "CREATE DATABASE IF NOT EXISTS '+config.dbName+'";', 
    function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function clean_xetoolstore(cb){
  return del([config.storefilepath+'/xetool/**', config.storefilepath+'/xetool/**', config.storefilepath+'/app/**/*xeconfig*.xml']);  
  cb();
}
function copy_xetoolpackage(cb){
return gulp.src(['xetool/**','xetool/.htaccess']).pipe(gulp.dest(xetoolsettings.copyxetoolto+'/'));
  cb();
}
function copy_copyquotation_store(cb){
   return gulp.src(['quotation/**']).pipe(gulp.dest(localSettings.data.dev_store_root+config.storeXEPath+"/quotation"));
 cb();
}
function open_installxetoolurl(cb){
return gulp.src(config.storefilepath).pipe(open({uri: config.xetoolsettings.installurl}));
  cb();
}
function xetool_isInstall(cb){
  if (argv.install) {
    fileExists('qaenv/' + argv.type + '/storeenv.json').then(exists => {
  if(exists===true){
    var dbName = argv.type.replace('-', '_') + '_xe';
    var storerootpath = localSettings.data.dev_store_root + xetoolsettings.storelocaldir;
    config.dbName = dbName;
    config.storefilepath=storerootpath;
    return gulp.series(
       copy_xetool_package,copy_xetool_package_htaccess,exec_create_db,open_installxetoolurl
    )();
  }})
   }
  cb();
}
function clean_xetool_store(cb){
var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "Clean Xetool Store" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return exec2(localSettings.data.command_prefix+' rm -rf '+config.storefilepath+'/xetool/', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function copy_xetool_package(cb){
 return gulp.src(['xetool/**','xetool/.htaccess']).pipe(gulp.dest(xetoolsettings.copyxetoolto));
  cb();
}
function copy_xetool_package_htaccess(cb){
 return gulp.src(['xetool/zapier/public/.htaccess']).pipe(gulp.dest(xetoolsettings.copyxetoolto+"/zapier/public"));
  cb();
}
function setuptoolplugin(cb){
if(argv.plugin){
  config.plugin_name=argv.plugin;
  var plugin_name = argv.plugin;
   if (plugin_name && plugin_name != '' && fileExists('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json')) {
     var pluginsettings=JSON.parse(fs.readFileSync('xeplugin/' + plugin_name + '/plugin_data/meta_plugin.json','utf8'));
      if(pluginsettings.type.indexOf('tool') != -1){
        config.build_path='tool_plugin/';
        //clean_xeapptemp(cb);
        //copy_copyxeTemp(cb);
        //copy_copyxeToolPlugin(cb);
         // return (gulp.series(clean_xeapptemp,copy_copyxeTemp,copy_copyxeToolPlugin))();
      }
  }
}else{
  config.build_path='./';
}
cb();
}
function clean_xeapptemp(cb){
  if(config.build_path == "tool_plugin/"){
    return del(['tool_plugin/**','!tool_plugin']);
  }
  cb();
}
function copy_copyxeTemp(cb){
  if(config.build_path == "tool_plugin/"){
    return gulp.src(['./xelib/**','./xeapp/**','./svgeditor/**','./languages/**','./vendors/**'], { base: '.' }).pipe(gulp.dest('tool_plugin/')); 
  }
  cb();
}
function copy_copyxeToolPlugin(cb){
  if(config.build_path == "tool_plugin/"){
    return exec2(localSettings.data.command_prefix+' cp -rf '+'xeplugin/'+config.plugin_name+'/tool/**' +' '+'tool_plugin/' , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });
   }
  cb();
}
function ngAnnotate_appannotate(cb){
return gulp.src(config.build_path+'xelib/libenc.js').pipe(ngAnnotate()).pipe(gulp.dest(config.build_path+'xelib/'));
cb();
}
function uglify_library_files(cb){
  return pipeline(gulp.src([config.build_path+'xelib/app333.js',config.build_path+'xelib/app777.js',config.build_path+'xelib/app555.js',config.build_path+'xelib/xeview.js']),uglify(),gulp.dest(config.build_path+'xelib'));
  cb();
}
function uglify_lib_files(cb){
  return pipeline(
    gulp.src([config.build_path+'xelib/lib/textlib.js',config.build_path+'xelib/lib/imglib.js',config.build_path+'xelib/lib/xelib001.js',config.build_path+'xelib/lib/xelib002.js',config.build_path+'xelib/lib/xelib006.js',config.build_path+'xelib/lib/xelib008.js',config.build_path+'xelib/lib/xelib009.js',config.build_path+'xelib/lib/xelib0010.js',config.build_path+'xelib/lib/xelib0011.js',config.build_path+'xelib/lib/xelib0014.js',config.build_path+'xelib/lib/xelib0016.js',config.build_path+'xelib/lib/xelib0017.js',config.build_path+'xelib/lib/xelib0018.js',config.build_path+'xelib/lib/xelib0019.js',config.build_path+'xelib/lib/xelib0020.js',config.build_path+'xelib/lib/xelib0021.js']),
    uglify(),
    gulp.dest(config.build_path+'xelib/lib/'));
  cb();
}
function uglify_xe_files(cb){
return pipeline(gulp.src([config.build_path+'xelib/libenc.js',config.build_path+'xelib/svglib.js']),uglify(),gulp.dest(config.build_path+'xelib/'));
  cb();
}
function exec_git_version(cb){
var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "Git version Execution" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return exec2(localSettings.data.command_prefix+' git log -n 1 --pretty=format:"%H" > clientapp/version/code_ver.txt &&  git log --pretty=format:"%h" -n 1 > clientapp/version/code_hash.txt && git describe --abbrev=0 --tags > clientapp/version/version.txt && git log -1 --format=%cd --date=local > clientapp/version/build_time.txt', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function replace_settingsLive(cb){
  var cwd=process.cwd();
  return gulp.src([config.build_path+'xelib/localsettings.js'])
    .pipe(replace('"dev"','"live"'))
    .pipe(replace('"magento"',config.xetoolsettings.xetoolstoreplatform+''))
    .pipe(gulp.dest(cwd));
  cb();
}
function notify_complete(cb){
 return gulp.src("/").pipe(notify('Compiled Successfully!! Refresh your browser'));
  cb();
}
function  watch_cssjs(cb){
  watch([config.build_path+configs[0].build_path+'/**/*.js', config.build_path+configs[0].build_path+'/**/*.css', config.build_path+configs[0].build_path+'/**/*.less', config.build_path+configs[0].build_path+'/**/*.html'], series(concat_appvendors,concat_apptextlib,concat_appimglib, cssmin, less_development, copy_main, notify_complete));   
  cb();
}
function xetool(cb){
  if (argv.init || argv.install || argv.plugin) {
    if (argv.plugin) {
      config.configs.plugin_name= argv.plugin;
      setuptoolplugin(cb);
      setupadminplugin(cb);
    }
  }
  cb();
}
function scramble_code(cb){
var jscrambler_data  = JSON.parse(fs.readFileSync('./xelib/jscrambler.json'));
 return gulp
    .src([config.build_path+'xelib/libenc.js',config.build_path+'xelib/svglib.js',config.build_path+'xeadminpro/adminapppro/adminlibenc.js',config.build_path+'quotation/xequote.js',config.build_path+'xelib/app/modules/*',config.build_path+'xelib/templateOnLoad/templateOnLoad.js'])
    .pipe(jscrambler(jscrambler_data))
    .pipe(gulp.dest('scrambled/'));
cb();
}
function appmodule_prelive(cb){
localSettings.data.modules.forEach(function(module_name) {
  uglify_modules(module_name);
  uglify_views(module_name);
});
  cb();
}
function ngAnnotate_appmodule(cb){
  localSettings.data.modules.forEach(function(module_name) {
  fileExists(config.build_path+'xelib/app/modules/'+module_name+'.js').then(exists => {
  if(exists===true){
    return gulp.src(config.build_path+'xelib/app/modules/'+module_name+'.js').pipe(strip()).pipe(ngAnnotate()).pipe(gulp.dest(config.build_path+'xelib/app/modules/'));
      } 
    });
  });  
cb();
}
function uglify_modules(module_name){
  fileExists(config.build_path+'xelib/app/modules/'+module_name+'.js').then(exists => {
  if(exists===true){
    return pipeline(gulp.src(config.build_path+'xelib/app/modules/'+module_name+'.js'),uglify(),gulp.dest(config.build_path+'xelib/app/modules/'));
    } 
  });
}
function uglify_views(module_name){
   fileExists(config.build_path+'xelib/app/views/'+module_name+'.js').then(exists => {
  if(exists===true){
    return gulp.src(config.build_path+'xelib/app/views/'+module_name+'.js').pipe(uglify()).pipe(gulp.dest(config.build_path+'xelib/app/views/'));
    } 
  });
}
function cssmin_quotation_css(cb){
return  src('quotation/assets/css/style.css').pipe(minify({minifyCSS: true})).pipe(concat('style.css')).pipe(dest('quotation/assets/css/'));
  cb();
}
function quotation_xequote(cb){
  return pipeline(gulp.src(["quotation/xequote.js"]),uglify(),gulp.dest('quotation'));
  cb();
}
function quotation_lib(cb){
  return pipeline(gulp.src(["quotation/lib.js"]),uglify(),gulp.dest('quotation'));
  cb();
}
function move_scrambled_codes_to_main(cb){
  var cwd=process.cwd();
return gulp.src('scrambled/**/**').pipe(gulp.dest(cwd));
cb();
}
function clean_xetool(cb){
   if (argv.install) {
    fileExists('qaenv/' + argv.type + '/storeenv.json').then(exists => {
    if(exists===true){
      var dbName = argv.type.replace('-', '_') + '_xe';
      var storerootpath = localSettings.data.dev_store_root + xetoolsettings.storelocaldir;
      config.dbName = dbName;
      config.storefilepath=storerootpath;
      return gulp.series(exec_drop_db,clean_xetool_store)();
    }
   })
  }
  cb();
}
function create_basic_db(cb){
  var isInit = argv.init;
  var curStoreSettings = {};
  curStoreSettings.db_name = 'xe_install_db';
  config.storeSettings=curStoreSettings;    
  cb();
}
function exec_drop_basic_db(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
 
 return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  -e "DROP DATABASE IF EXISTS xe_install_db";', 
    function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function exec_create_basic_db(cb){
  var curStoreSettings = {};
  curStoreSettings.db_name = 'xe_install_db';
  config.storeSettings=curStoreSettings;
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  -e "CREATE DATABASE IF NOT EXISTS xe_install_db";', 
    function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function exec_update_version(cb){
 return exec2('git describe --abbrev=0 --tags && git log -1 --format=%ci --date=local && git log -1 --pretty=format:"%h %s"', 
    function (err, stdout, stderr) {
    stdout    = (stdout).trim();
    stdout    = stdout.split("\n");
    stdout[1] = stdout[1].split(" ");
    stdout[1] = stdout[1][0];
    config.xeVersion     = stdout[0];
    config.xeReleaseDate = stdout[1];
    config.xeReleaseDesc = stdout[2];    
  });
  cb();
}
function exec_create_basic_sql(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysqldump -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  xe_install_db > ' + process.cwd() + '/xetool/install/'+xetoolsettings.store+'/sql/basic_database.sql', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function exec_sql_default_data(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+' xe_install_db < ' + process.cwd() + '/schema/default-data.sql', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function export_custom_sql(cb){
  if(argv.type=='shopify'){
    var dir_name='shopify';
  }else if(argv.type=='threedcart'){
    var dir_name='3dcart';
  }else if(argv.type=='bigcommerce'){
    var dir_name='bigcommerce';
  }
   var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
   return exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysqldump -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  xe_install_db > ' + process.cwd() + '/xetool/install/'+dir_name+'/sql/basic_database.sql', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
cb();
}
function exec_version_into_sql(cb){
  var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  const postgrator = new Postgrator({
  // Directory containing migration files
   validateChecksums: false, // Set to false to skip validation
  // newline: 'CRLF', // Force using 'CRLF' (windows) or 'LF' (unix/mac)
  // or a glob pattern to files
  // migrationPattern: __dirname + '/*',
  // Driver: must be pg, mysql, or mssql
  driver: 'mysql',
  // Database connection config
  host: localSettings.data.db_host,
  port: 3306,
  database: 'xe_install_db',
  username: localSettings.data.db_user,
  password: localSettings.data.db_password,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schema_version_xe'
}) 
console.log(config);
 return postgrator
  .runQuery("UPDATE version_manage SET `current_version`=\'"+config.xeVersion+"\', `installed_on`=\'"+config.xeReleaseDate+"\', `updated_on`=\'"+config.xeReleaseDate+"\', `version_description`=\""+config.xeReleaseDesc+"\" WHERE 1=1; UPDATE version_manage a, schema_version b SET a.schema_version = b.version WHERE 1=1;")
  .then(results => console.log(results))
  .catch(error => console.log(error));

 cb();
}
function get_store_details(cb){
  var storesettingjson=JSON.parse(fs.readFileSync('ecommerce/install/' + path.basename(xetoolsettings.store) + '/store_details.json'));
  storesettingjson.domain_url[0] = xetoolsettings.xetoolstoredomain;
  storesettingjson.folder_name[0] = xetoolsettings.storedir;
  return gulp.src('ecommerce/install/' + path.basename(xetoolsettings.store) + '/store_details.json').pipe(replace(storesettingjson.domain_url[0], xetoolsettings.xetoolstoredomain)).pipe(replace(storesettingjson.folder_name[0], xetoolsettings.storedir)).pipe(gulp.dest('xelib/basic_admin_settings/'));
  cb();
}
function resetadmin(cb){
return gulp.src('xeadminpro/buildsettingreset.json').pipe(concat('buildsetting.json')).pipe(gulp.dest('xeadminpro/'));
cb();
}
function resetenv(cb){
  var platform = os.platform() === 'linux' ? 'ubuntu' : (
   os.platform() === 'darwin' ? 'mac' : (
   os.platform() === 'win32' ? 'win' : 'win'));
   console.log(platform);
   return gulp.src('localsettings_'+ platform + '.json').pipe(concat('envsettings.json')).pipe(gulp.dest('./'));
cb(); 
}
function get_languages_filelist(cb){
return  gulp.src(['./languages/*.json','!languages/locale-en.json']).pipe(require('gulp-filelist')('languages_file_list.json', { relative: true })).pipe(gulp.dest('./out'));
  cb();
}
function update_language(cb){
var en_lang  = require('./languages/locale-en.json');
var all_lang  =require('./out/languages_file_list.json');
all_lang.forEach(function(language_file){
  var individual_lang  = require('./languages/'+language_file);
for (var en_key in en_lang) {
  if(!individual_lang.hasOwnProperty(en_key)){
  individual_lang[en_key]=en_lang[en_key];
  }
} fs.writeFileSync('./languages/'+language_file, JSON.stringify(individual_lang));
  return gulp.src('./languages/'+language_file).pipe(jsonFormat(4)).pipe(gulp.dest('./languages/'));
 });
  cb();
}
function get_admin_language_filelist(cb){
return  gulp.src(['./xeadminpro/languages/*.json','!xeadminpro/languages/locale-en.json']).pipe(require('gulp-filelist')('admin_languages_file_list.json', { relative: true })).pipe(gulp.dest('./out'));
  cb();
}
function update_language_admin(cb){
var en_lang  = require('./xeadminpro/languages/locale-en.json');
var all_lang = require('./out/admin_languages_file_list.json');
all_lang.forEach(function(language_file){
  var individual_lang  = require('./xeadminpro/languages/'+language_file);
for (var en_key in en_lang) {
  if(!individual_lang.hasOwnProperty(en_key)){
  individual_lang[en_key]=en_lang[en_key];
  }
}
fs.writeFileSync('./xeadminpro/languages/'+language_file, JSON.stringify(individual_lang));
  return gulp.src('./xeadminpro/languages/'+language_file)
    .pipe(jsonFormat(4))
    .pipe(gulp.dest('./xeadminpro/languages/'));
 });
cb();
}
function db_update(cb){
 var db_password = (localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password;
  const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: __dirname + '/schema',
   validateChecksums: false, // Set to false to skip validation
  // newline: 'CRLF', // Force using 'CRLF' (windows) or 'LF' (unix/mac)
  // or a glob pattern to files
  // migrationPattern: __dirname + '/*',
  // Driver: must be pg, mysql, or mssql
  driver: 'mysql',
  // Database connection config
  host: localSettings.data.db_host,
  port: 3306,
  database: argv.db,
  username: localSettings.data.db_user,
  password: localSettings.data.db_password,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schema_version_xe'
}) 
  return postgrator
  .migrate()
  .then(appliedMigrations => console.log(appliedMigrations))
  .catch(error => console.log(error));
cb();
}
function apicall(cb){
  const options = {
    url: 'http://beta.inkxe.io/xetool/api/index.php?reqmethod=getAllAdminSettings&apikey=XTZw8y3aC1hD1cUU',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ 'foo': 'bar' }),
  }
 
  request(options, function (error, response, body) {
    console.log(response.body);
    fs.writeFile('post.json', response.body, (err) => {
        if (err) throw err;
        console.log('Done.');
        cb();
      });
    // if (!error && response.statusCode == 200) {
    //   
    // }
  });
cb();
}
function update_revision(cb){
  var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password; 
  var  dbName = argv.type.replace('-', '_') + '_xe';
   return  exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+' -e " use "'+dbName+'"; SELECT revision_id From revision order by pk_id DESC LIMIT 1";', 
     function (err, stdout, stderr) {
     stdout    = (stdout).trim();
     stdout    = stdout.split("\n");
     stdout[1] = stdout[1].split(" ");
     stdout[1] = stdout[1][0];
     var revised_variable=stdout[1];
     gulp.src(["clientapp/index.html"]).pipe(replace('vn=1567586395', 'vn='+revised_variable)).pipe(gulp.dest('./clientapp'));
   });    
cb();
}
function last_schema_delete(cb){
  var db_password =(localSettings.data.db_password == '') ? '' : '-p' + localSettings.data.db_password; 
  var  dbName = argv.type.replace('-', '_') + '_xe';
    var options = {
     continueOnError: false, // default = false, true means don't emit error event
     pipeStdout: false, // default = false, true means stdout is written to file.contents
     customTemplatingThing: "exec_drop_db" // content passed to lodash.template()
   };
   var reportOptions = {
     err: true, // default = true, false means don't write err
     stderr: true, // default = true, false means don't write stderr
     stdout: true // default = true, false means don't write stdout
   };
 
   return  exec2(localSettings.data.command_prefix+' '+localSettings.data.mysql_path+'mysql -h '+localSettings.data.db_host+' -u '+localSettings.data.db_user+' '+db_password+'  -e  "use '+dbName+'; DELETE from schema_version_xe order by version desc limit 1";', 
     function (err, stdout, stderr) {
     console.log(stdout);
     console.log(stderr);    
   });
   cb();
 }


 function getPlugintemplates_directory(cb){
  console.log(argv.name);
    return exec2(localSettings.data.command_prefix+' mkdir -p xeplugin/'+argv.name , function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);    
    });
   
  cb();
}
function getPlugintemplates(cb){
  return exec2(localSettings.data.command_prefix+' cp -rf '+'xeplugin/plugin_tmpl/**' +' '+'xeplugin/'+argv.name+'/' , function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);    
  });
  cb();
}
function update_plugin_details(cb){
  var currentPlugindetails  = JSON.parse(fs.readFileSync('./xeplugin/' + path.basename( argv.name) + '/plugin_data/meta_plugin.json'));
  
  currentPlugindetails.plugin_name=argv.name;
  currentPlugindetails.create_date=new Date().toLocaleDateString();
  currentPlugindetails.client_id=argv.name;
  fs.writeFileSync('./xeplugin/'+argv.name+'/plugin_data/meta_plugin.json', JSON.stringify(currentPlugindetails));
  console.log('New plugin has been created. You can add more details in svg_product_designer/xeplugin/'+argv.name+'/plugin_data/meta_plugin.json');
  return gulp.src('./xeplugin/'+argv.name+'/plugin_data/meta_plugin.json')
    .pipe(jsonFormat(4))
    .pipe(gulp.dest('./xeplugin/'+argv.name+'/plugin_data'));

  cb();
}
function gulp_help_task(cb){
  var curStoreSettings  = fs.readFileSync('./help.txt',"utf8");
  console.log(curStoreSettings);
  cb();
}

exports.app              = series(gulp_init_settings,setuptoolplugin,clean_xeapptemp,copy_copyxeTemp,copy_copyxeToolPlugin,clean_xelib,clean_clientapp,file_list,ngtemplates,concat_basic,concat_appvendors,concat_apptextlib,concat_appimglib,copy_copyextlibonly, concat_appsvglib,appmodule_app,cssmin,less_development,generate_xeview_js,concat_mergeall,copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js,connect_server,focus_appdev);
exports.store            = series(gulp_init_settings,exec_update_version,store_init_functions,clean_xelib,clean_clientapp,set_store_settings,last_schema_delete,store_schema_update,file_list,ngtemplates,concat_basic,concat_appvendors,copy_copyextlibonly,concat_apptextlib,concat_appimglib,concat_appsvglib,appmodule_app,cssmin,less_development,generate_xeview_js,concat_mergeall,copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js,appquotation,admincodeonly,update_revision,copy_copyToolAPI,copy_copyAdminAppStore,copy_copyClientAppStore,copy_copyClientAppCSS,copy_copyquotation_store,copy_copyzapier_store,copy_copyzapier_store_htaccess,copy_store_api,open_store);
exports.xetool           = series(gulp_init_settings,exec_update_version,exec_drop_basic_db,exec_create_basic_db,schema_update,xetool_set_config,clean_xetool,clean_clientapp,clean_xetool_files,exec_update_version,exec_version_into_sql,exec_sql_default_data,get_store_details,file_list,ngtemplates,concat_basic,concat_appvendors,copy_copyextlibonly,concat_apptextlib,concat_appimglib,concat_appsvglib,cssmin,less_development,generate_xeview_js,concat_mergeall,copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js, appquotation,admincodeonly,copy_xetool_store_installation_files,copy_xetool_sql_files,copy_xetool_install_index_file,xetool_root,xetool_images,xetool_api,exec_create_basic_sql,xetool_clientapp,xetool_quotation,xetool_zapier,xetool_zapier_htaccess, xetool_admin,xetool_isInstall);
exports.xetool_live      = series(gulp_init_settings,exec_update_version,xetool_set_config,clean_xetool_files,clean_clientapp,exec_version_into_sql,exec_sql_default_data,get_store_details,file_list,ngtemplates,concat_appvendors,copy_copyextlibonly,concat_apptextlib,concat_appimglib,cssmin,less_development, generate_xeview_js,uglify_library_files,concat_mergeall,uglify_lib_files,copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js,exec_git_version,replace_settingsLive,copy_xetool_store_installation_files,copy_xetool_sql_files,copy_xetool_install_index_file,xetool_root,xetool_images,xetool_api,exec_create_basic_sql,xetool_clientapp,xetool_quotation,xetool_zapier,xetool_admin);
exports.applive          = series(gulp_init_settings,setuptoolplugin,file_list,ngtemplates,concat_appvendors,copy_copyextlibonly,concat_apptextlib,concat_appimglib,cssmin,less_development,generate_xeview_js,uglify_library_files,concat_mergeall,uglify_lib_files,copy_assets,copy_html_files,copy_extensions,copy_client_app,copy_local_settings,copy_languages,copy_includes,copy_add_this_js ,exec_git_version, connect_server, watch_cssjs);
exports.prelive          = series(gulp_init_settings,setuptoolplugin,appmodule_app,concat_basic,concat_appsvglib,ngAnnotate_appannotate,ngAnnotate_appmodule,uglify_xe_files,appmodule_prelive);
exports.scramble         = series(gulp_init_settings,scramble_code,move_scrambled_codes_to_main);
exports.appquotation     = series(gulp_init_settings,copy_copyxequote,concat_quotationscript,concat_quotationvendor,exec_set_permission);
exports.applivequotation = series(gulp_init_settings,copy_copyxequote,concat_quotationscript,concat_quotationvendor,exec_set_permission,cssmin_quotation_css,quotation_xequote,quotation_lib);
exports.xetool_db        = series(gulp_init_settings,exec_drop_basic_db,exec_create_basic_db,schema_update);
exports.resetadmin       = series(resetadmin);
exports.resetenv         = series(resetenv);
exports.update_language  = series(gulp_init_settings,get_languages_filelist,get_admin_language_filelist,update_language,update_language_admin);
exports.db_update        = series(gulp_init_settings,db_update);
exports.custom_sql_update= series(gulp_init_settings,exec_update_version,exec_drop_basic_db,exec_create_basic_db,schema_update,custom_store_schema_update,exec_version_into_sql,exec_sql_default_data,export_custom_sql);
exports.createplugin    = series(getPlugintemplates_directory,getPlugintemplates,update_plugin_details);
exports.gulp_help       = series(gulp_help_task);
