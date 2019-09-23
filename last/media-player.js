// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() {
    initialiseMediaPlayer();
    setTreeUnitWatchedStatus();//Unit ağacı kaç slide izlendi ayarlanıyor
}, false);


//Browser üzerinde geri oku tıklandoğı anda çalıaşcak
window.onbeforeunload = function (event) {
    event = event || window.event;
    $.ajax({
        url: 'index.php?route=course/course/ajaxOpenCourseEntries',
        type: 'POST',
        data: '',
        async: false,
        success: function (req) {}
    });

    var confirmClose = json_lang_parsed.warning_on_close_course;

    // For IE and Firefox prior to version 4
    if (event) {
        event.returnValue = confirmClose;
    }
    // For Safari
    return confirmClose;
}

// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;
var playPauseBtnAwesome;
var progressBarAwesome;
var mediaTime;
var mediaPlayerContent;
var mediaScreen;
var mainHtml5Player;
var mainHtml5PlayerHeight;
var mediaSubtitles;
var volumeButtonAwesome;
var progressbar;
var subtitleText;
var subtitleTextContent;
var subtitleTextHeight;
var mainHtml5PlayerBack;
var mousemove_timeout;
var mediaVideoControl;
var listLanguage;
var volumeRed;
var volumeLast;
var mediaCenter;
var treeHeight = "";
var mouseOnControlsMenu = false;
var mediaType    = "swf";
var slidePlaying = 0;
var swfObject;
var fullScreenClick = 0;
var _totalFrame = 0;
var _currentFrame = 0;
var _currentBeforeFrame = 0;
var _languageText = "";
var progress = 0;
var s3BucketPath = "";
var s3SwfName    = "";
var autoplay     = 0;
var showExamModel = 0;
var back_seek_click = 0;
var active_unit_class    = "";
var active_subunit_class = "";
var courseProgress       = 0;
var course_type          = 0;
var _prev                = 0;//Bir önceki slide json sırası slides_order içinde
var _current             = 0;//Şuan oynayan slide json sırası slides_order içinde
var _next                = 0;
var _fullScreen          = 0;
var _language            = "";
var _slideFinished       = 0;
var _mediaLoad           = 0;
var _subtitleOpened      = 0;
var _swfSound            = 1;

//Model value popup kısmı
var course_id = 0;
var is_track_mode = 0;
var course_completed =0;
var completed_slide = 0;
var current_slide_number = 0;
var num_of_page = 0;
var is_exam_mode = 0;
var exam_url = "";
var next_slide_name  = "";
var first_slide_name = "";
var current_slide_name = "";
var previous_slide_name = "";
var play_wanted_slide = 0;
var json_user_course_data_parsed = "";
var json_lang_parsed = "";
var play_forward_slide = 0;
var offsetTopArr = [];

function initialiseMediaPlayer() {
    // Get a handle to the player
    mediaPlayer = document.getElementById('media-video');

    // Get handles to each of the buttons and required elements
    playPauseBtn          = document.getElementById('play-pause-button');
    mainHtml5Player       = document.getElementById('main-html5-player');
    mainHtml5PlayerBack   = document.getElementById('main-html5-player-background');
    playPauseBtnAwesome   = document.getElementById('play-pause-button-awesome');
    mediaTime             = document.getElementById('media-time');
    progressBarAwesome    = document.getElementById('controls-progress-red');
    mediaPlayerContent    = document.getElementById('media-player-content');
    mediaScreen           = document.getElementById('media-screen');
    mediaCenter           = document.getElementById('media-center');
    muteBtn               = document.getElementById('mute-button');
    progressBar           = document.getElementById('progress-bar');
    mediaSubtitles        = document.getElementById('media-subtitles');
    volumeButtonAwesome   = document.getElementById('volume-button-awesome');
    progressbar           = document.getElementById('controls-progress');
    subtitleText          = document.getElementById('subtitle-text');
    subtitleTextContent   = document.getElementById('subtitle-text-content');
    swfObject             = document.getElementById('player');
    mediaType             = document.getElementById("now-play-file").getAttribute("data-type");
    treeHeight            = document.getElementById("now-play-file").getAttribute("tree-height");
    mediaVideoControl     = document.getElementById('media-video-control-content');
    volumeRed             = document.getElementById('volume-red');
    volumeLast            = document.getElementById('volume-last');
    //s3BucketPath          = document.getElementById("now-play-file").getAttribute("data-s3-bucket-path");

    //Model value popup
    var json_user_course_data__ = '{"archive_id":null,"course_id":"1","company_id":null,"category_id":null,"course_code":"EUR RVSM","course_name":"EUROPEAN REDUCED VERTICAL SEPARATION MINIMA - EUR RVSM","course_slides_folder":"000AVILMS\/C101","course_videos_url":"http:\/\/mobile.avilms.com\/000AVILMS\/C101\/","unit_xml_file":"https:\/\/s3.eu-central-1.amazonaws.com\/lmspc\/UnitXML\/C101.xml","description":null,"certification":"selfstudy","is_track_mode":false,"is_expired":false,"is_progress_check_available":false,"is_exam_mode":false,"course_start":null,"course_end":null,"last_login":null,"number_of_entry":"0","elapsed_time":"00:00:00","progress":"0","num_of_page":"78","completed_page":"0","expire_date":"12\/03\/2020 23:59 UTC\/GMT","expire_date_db":null,"number_of_try":"0","max_number_of_try":3,"is_exam_max_reached":false,"is_passed":null,"exam":true,"unit_data_list":[{"unit_id":"2","parent_unit_id":"0","unit_title":"RVSM OVERVIEW - INTRODUCTION","unit_order":"1","slides":[{"slide_id":"2","slide_title":"Slide 2","slide_order":"1","course_slide_order":"1","s3_file_name":"2"},{"slide_id":"3","slide_title":"Slide 3","slide_order":"2","course_slide_order":"2","s3_file_name":"3"},{"slide_id":"4","slide_title":"Slide 4","slide_order":"3","course_slide_order":"3","s3_file_name":"4"},{"slide_id":"5","slide_title":"Slide 5","slide_order":"4","course_slide_order":"4","s3_file_name":"5"}],"sub_units":[{"unit_id":"3","parent_unit_id":"2","unit_title":"Implementation","unit_order":"1","slides":[{"slide_id":"6","slide_title":"Slide 6","slide_order":"1","course_slide_order":"5","s3_file_name":"6"},{"slide_id":"7","slide_title":"Slide 7","slide_order":"2","course_slide_order":"6","s3_file_name":"7"},{"slide_id":"8","slide_title":"Slide 8","slide_order":"3","course_slide_order":"7","s3_file_name":"8"},{"slide_id":"9","slide_title":"Slide 9","slide_order":"4","course_slide_order":"8","s3_file_name":"9"}]},{"unit_id":"4","parent_unit_id":"2","unit_title":"The Benefits of RVSM","unit_order":"2","slides":[{"slide_id":"10","slide_title":"Slide 10","slide_order":"1","course_slide_order":"9","s3_file_name":"10"},{"slide_id":"11","slide_title":"Slide 11","slide_order":"2","course_slide_order":"10","s3_file_name":"11"},{"slide_id":"12","slide_title":"Slide 12","slide_order":"3","course_slide_order":"11","s3_file_name":"12"},{"slide_id":"13","slide_title":"Slide 13","slide_order":"4","course_slide_order":"12","s3_file_name":"13"},{"slide_id":"14","slide_title":"Slide 14","slide_order":"5","course_slide_order":"13","s3_file_name":"14"}]}]},{"unit_id":"1","parent_unit_id":"0","unit_title":"COURSE START","unit_order":"2","slides":[{"slide_id":"1","slide_title":"Slide 1","slide_order":"1","course_slide_order":"14","s3_file_name":"1"}],"sub_units":[]},{"unit_id":"5","parent_unit_id":"0","unit_title":"QUALIFICATIONS AND REQUIREMENTS - CERTIFICATION OF RVSM","unit_order":"3","slides":[{"slide_id":"15","slide_title":"Slide 15","slide_order":"1","course_slide_order":"15","s3_file_name":"15"},{"slide_id":"16","slide_title":"Slide 16","slide_order":"2","course_slide_order":"16","s3_file_name":"16"},{"slide_id":"17","slide_title":"Slide 17","slide_order":"3","course_slide_order":"17","s3_file_name":"17"},{"slide_id":"18","slide_title":"Slide 18","slide_order":"4","course_slide_order":"18","s3_file_name":"18"},{"slide_id":"19","slide_title":"Slide 19","slide_order":"5","course_slide_order":"19","s3_file_name":"19"},{"slide_id":"20","slide_title":"Slide 20","slide_order":"6","course_slide_order":"20","s3_file_name":"20"},{"slide_id":"21","slide_title":"Slide 21","slide_order":"7","course_slide_order":"21","s3_file_name":"21"},{"slide_id":"22","slide_title":"Slide 22","slide_order":"8","course_slide_order":"22","s3_file_name":"22"},{"slide_id":"23","slide_title":"Slide 23","slide_order":"9","course_slide_order":"23","s3_file_name":"23"},{"slide_id":"24","slide_title":"Slide 24","slide_order":"10","course_slide_order":"24","s3_file_name":"24"},{"slide_id":"25","slide_title":"Slide 25","slide_order":"11","course_slide_order":"25","s3_file_name":"25"},{"slide_id":"26","slide_title":"Slide 26","slide_order":"12","course_slide_order":"26","s3_file_name":"26"},{"slide_id":"27","slide_title":"Slide 27","slide_order":"13","course_slide_order":"27","s3_file_name":"27"}],"sub_units":[{"unit_id":"6","parent_unit_id":"5","unit_title":"Maintaining RVSM Qualification","unit_order":"1","slides":[{"slide_id":"28","slide_title":"Slide 28","slide_order":"1","course_slide_order":"28","s3_file_name":"28"},{"slide_id":"29","slide_title":"Slide 29","slide_order":"2","course_slide_order":"29","s3_file_name":"29"},{"slide_id":"30","slide_title":"Slide 30","slide_order":"3","course_slide_order":"30","s3_file_name":"30"}]},{"unit_id":"7","parent_unit_id":"5","unit_title":"If you are not Qualified for RVSM","unit_order":"2","slides":[{"slide_id":"31","slide_title":"Slide 31","slide_order":"1","course_slide_order":"31","s3_file_name":"31"},{"slide_id":"32","slide_title":"Slide 32","slide_order":"2","course_slide_order":"32","s3_file_name":"32"},{"slide_id":"33","slide_title":"Slide 33","slide_order":"3","course_slide_order":"33","s3_file_name":"33"},{"slide_id":"34","slide_title":"Slide 34","slide_order":"4","course_slide_order":"34","s3_file_name":"34"}]}]},{"unit_id":"8","parent_unit_id":"0","unit_title":"AIRCRAFT SYSTEMS - EQUIPMENT REQUIREMENTS","unit_order":"4","slides":[{"slide_id":"35","slide_title":"Slide 35","slide_order":"1","course_slide_order":"35","s3_file_name":"35"},{"slide_id":"36","slide_title":"Slide 36","slide_order":"2","course_slide_order":"36","s3_file_name":"36"},{"slide_id":"37","slide_title":"Slide 37","slide_order":"3","course_slide_order":"37","s3_file_name":"37"},{"slide_id":"38","slide_title":"Slide 38","slide_order":"4","course_slide_order":"38","s3_file_name":"38"},{"slide_id":"39","slide_title":"Slide 39","slide_order":"5","course_slide_order":"39","s3_file_name":"39"}],"sub_units":[{"unit_id":"9","parent_unit_id":"8","unit_title":"Errors and Tolerance","unit_order":"1","slides":[{"slide_id":"40","slide_title":"Slide 40","slide_order":"1","course_slide_order":"40","s3_file_name":"40"},{"slide_id":"41","slide_title":"Slide 41","slide_order":"2","course_slide_order":"41","s3_file_name":"41"},{"slide_id":"42","slide_title":"Slide 42","slide_order":"3","course_slide_order":"42","s3_file_name":"42"},{"slide_id":"43","slide_title":"Slide 43","slide_order":"4","course_slide_order":"43","s3_file_name":"43"},{"slide_id":"44","slide_title":"Slide 44","slide_order":"5","course_slide_order":"44","s3_file_name":"44"}]}]},{"unit_id":"10","parent_unit_id":"0","unit_title":"RVSM OPERATIONS - FLIGHT PLANNING","unit_order":"5","slides":[{"slide_id":"45","slide_title":"Slide 45","slide_order":"1","course_slide_order":"45","s3_file_name":"45"},{"slide_id":"46","slide_title":"Slide 46","slide_order":"2","course_slide_order":"46","s3_file_name":"46"},{"slide_id":"47","slide_title":"Slide 47","slide_order":"3","course_slide_order":"47","s3_file_name":"47"}],"sub_units":[{"unit_id":"11","parent_unit_id":"10","unit_title":"Aircraft Pre-flight Procedures","unit_order":"1","slides":[{"slide_id":"48","slide_title":"Slide 48","slide_order":"1","course_slide_order":"48","s3_file_name":"48"},{"slide_id":"49","slide_title":"Slide 49","slide_order":"2","course_slide_order":"49","s3_file_name":"49"},{"slide_id":"50","slide_title":"Slide 50","slide_order":"3","course_slide_order":"50","s3_file_name":"50"},{"slide_id":"51","slide_title":"Slide 51","slide_order":"4","course_slide_order":"51","s3_file_name":"51"}]},{"unit_id":"12","parent_unit_id":"10","unit_title":"Procedures Prior to RVSM Airspace Entry","unit_order":"2","slides":[{"slide_id":"52","slide_title":"Slide 52","slide_order":"1","course_slide_order":"52","s3_file_name":"52"},{"slide_id":"53","slide_title":"Slide 53","slide_order":"2","course_slide_order":"53","s3_file_name":"53"}]},{"unit_id":"13","parent_unit_id":"10","unit_title":"In-flight Procedures","unit_order":"3","slides":[{"slide_id":"54","slide_title":"Slide 54","slide_order":"1","course_slide_order":"54","s3_file_name":"54"},{"slide_id":"55","slide_title":"Slide 55","slide_order":"2","course_slide_order":"55","s3_file_name":"55"},{"slide_id":"56","slide_title":"Slide 56","slide_order":"3","course_slide_order":"56","s3_file_name":"56"},{"slide_id":"57","slide_title":"Slide 57","slide_order":"4","course_slide_order":"57","s3_file_name":"57"},{"slide_id":"58","slide_title":"Slide 58","slide_order":"5","course_slide_order":"58","s3_file_name":"58"},{"slide_id":"59","slide_title":"Slide 59","slide_order":"6","course_slide_order":"59","s3_file_name":"59"}]},{"unit_id":"14","parent_unit_id":"10","unit_title":"Post Flight Procedures","unit_order":"4","slides":[{"slide_id":"60","slide_title":"Slide 60","slide_order":"1","course_slide_order":"60","s3_file_name":"60"},{"slide_id":"61","slide_title":"Slide 61","slide_order":"2","course_slide_order":"61","s3_file_name":"61"}]},{"unit_id":"15","parent_unit_id":"10","unit_title":"TCAS \/ ACAS and RVSM","unit_order":"5","slides":[{"slide_id":"62","slide_title":"Slide 62","slide_order":"1","course_slide_order":"62","s3_file_name":"62"},{"slide_id":"63","slide_title":"Slide 63","slide_order":"2","course_slide_order":"63","s3_file_name":"63"},{"slide_id":"64","slide_title":"Slide 64","slide_order":"3","course_slide_order":"64","s3_file_name":"64"}]}]},{"unit_id":"16","parent_unit_id":"0","unit_title":"CONTINGENCY PROCEDURES - GENERAL PROCEDURES","unit_order":"6","slides":[{"slide_id":"65","slide_title":"Slide 65","slide_order":"1","course_slide_order":"65","s3_file_name":"65"},{"slide_id":"66","slide_title":"Slide 66","slide_order":"2","course_slide_order":"66","s3_file_name":"66"},{"slide_id":"67","slide_title":"Slide 67","slide_order":"3","course_slide_order":"67","s3_file_name":"67"},{"slide_id":"68","slide_title":"Slide 68","slide_order":"4","course_slide_order":"68","s3_file_name":"68"},{"slide_id":"69","slide_title":"Slide 69","slide_order":"5","course_slide_order":"69","s3_file_name":"69"}],"sub_units":[{"unit_id":"17","parent_unit_id":"16","unit_title":"Standard Phraseology","unit_order":"1","slides":[{"slide_id":"70","slide_title":"Slide 70","slide_order":"1","course_slide_order":"70","s3_file_name":"70"}]}]},{"unit_id":"18","parent_unit_id":"0","unit_title":"SYSTEM PERFORMANCE MONITORING ","unit_order":"7","slides":[{"slide_id":"71","slide_title":"Slide 71","slide_order":"1","course_slide_order":"71","s3_file_name":"71"},{"slide_id":"72","slide_title":"Slide 72","slide_order":"2","course_slide_order":"72","s3_file_name":"72"},{"slide_id":"73","slide_title":"Slide 73","slide_order":"3","course_slide_order":"73","s3_file_name":"73"}],"sub_units":[{"unit_id":"19","parent_unit_id":"18","unit_title":"Height Monitoring Unit (HMU)","unit_order":"1","slides":[{"slide_id":"74","slide_title":"Slide 74","slide_order":"1","course_slide_order":"74","s3_file_name":"74"},{"slide_id":"75","slide_title":"Slide 75","slide_order":"2","course_slide_order":"75","s3_file_name":"75"}]},{"unit_id":"20","parent_unit_id":"18","unit_title":"Special Height Monitoring Flights","unit_order":"2","slides":[{"slide_id":"76","slide_title":"Slide 76","slide_order":"1","course_slide_order":"76","s3_file_name":"76"},{"slide_id":"77","slide_title":"Slide 77","slide_order":"2","course_slide_order":"77","s3_file_name":"77"}]}]},{"unit_id":"21","parent_unit_id":"0","unit_title":"COURSE END","unit_order":"8","slides":[{"slide_id":"78","slide_title":"Slide 78","slide_order":"1","course_slide_order":"78","s3_file_name":"78"}],"sub_units":[]}],"slides_ordered":[{"slide_id":"2","slide_title":"Slide 2","slide_order":"1","course_slide_order":"1","s3_file_name":"2"},{"slide_id":"3","slide_title":"Slide 3","slide_order":"2","course_slide_order":"2","s3_file_name":"3"},{"slide_id":"4","slide_title":"Slide 4","slide_order":"3","course_slide_order":"3","s3_file_name":"4"},{"slide_id":"5","slide_title":"Slide 5","slide_order":"4","course_slide_order":"4","s3_file_name":"5"},{"slide_id":"6","slide_title":"Slide 6","slide_order":"1","course_slide_order":"5","s3_file_name":"6"},{"slide_id":"7","slide_title":"Slide 7","slide_order":"2","course_slide_order":"6","s3_file_name":"7"},{"slide_id":"8","slide_title":"Slide 8","slide_order":"3","course_slide_order":"7","s3_file_name":"8"},{"slide_id":"9","slide_title":"Slide 9","slide_order":"4","course_slide_order":"8","s3_file_name":"9"},{"slide_id":"10","slide_title":"Slide 10","slide_order":"1","course_slide_order":"9","s3_file_name":"10"},{"slide_id":"11","slide_title":"Slide 11","slide_order":"2","course_slide_order":"10","s3_file_name":"11"},{"slide_id":"12","slide_title":"Slide 12","slide_order":"3","course_slide_order":"11","s3_file_name":"12"},{"slide_id":"13","slide_title":"Slide 13","slide_order":"4","course_slide_order":"12","s3_file_name":"13"},{"slide_id":"14","slide_title":"Slide 14","slide_order":"5","course_slide_order":"13","s3_file_name":"14"},{"slide_id":"1","slide_title":"Slide 1","slide_order":"1","course_slide_order":"14","s3_file_name":"1"},{"slide_id":"15","slide_title":"Slide 15","slide_order":"1","course_slide_order":"15","s3_file_name":"15"},{"slide_id":"16","slide_title":"Slide 16","slide_order":"2","course_slide_order":"16","s3_file_name":"16"},{"slide_id":"17","slide_title":"Slide 17","slide_order":"3","course_slide_order":"17","s3_file_name":"17"},{"slide_id":"18","slide_title":"Slide 18","slide_order":"4","course_slide_order":"18","s3_file_name":"18"},{"slide_id":"19","slide_title":"Slide 19","slide_order":"5","course_slide_order":"19","s3_file_name":"19"},{"slide_id":"20","slide_title":"Slide 20","slide_order":"6","course_slide_order":"20","s3_file_name":"20"},{"slide_id":"21","slide_title":"Slide 21","slide_order":"7","course_slide_order":"21","s3_file_name":"21"},{"slide_id":"22","slide_title":"Slide 22","slide_order":"8","course_slide_order":"22","s3_file_name":"22"},{"slide_id":"23","slide_title":"Slide 23","slide_order":"9","course_slide_order":"23","s3_file_name":"23"},{"slide_id":"24","slide_title":"Slide 24","slide_order":"10","course_slide_order":"24","s3_file_name":"24"},{"slide_id":"25","slide_title":"Slide 25","slide_order":"11","course_slide_order":"25","s3_file_name":"25"},{"slide_id":"26","slide_title":"Slide 26","slide_order":"12","course_slide_order":"26","s3_file_name":"26"},{"slide_id":"27","slide_title":"Slide 27","slide_order":"13","course_slide_order":"27","s3_file_name":"27"},{"slide_id":"28","slide_title":"Slide 28","slide_order":"1","course_slide_order":"28","s3_file_name":"28"},{"slide_id":"29","slide_title":"Slide 29","slide_order":"2","course_slide_order":"29","s3_file_name":"29"},{"slide_id":"30","slide_title":"Slide 30","slide_order":"3","course_slide_order":"30","s3_file_name":"30"},{"slide_id":"31","slide_title":"Slide 31","slide_order":"1","course_slide_order":"31","s3_file_name":"31"},{"slide_id":"32","slide_title":"Slide 32","slide_order":"2","course_slide_order":"32","s3_file_name":"32"},{"slide_id":"33","slide_title":"Slide 33","slide_order":"3","course_slide_order":"33","s3_file_name":"33"},{"slide_id":"34","slide_title":"Slide 34","slide_order":"4","course_slide_order":"34","s3_file_name":"34"},{"slide_id":"35","slide_title":"Slide 35","slide_order":"1","course_slide_order":"35","s3_file_name":"35"},{"slide_id":"36","slide_title":"Slide 36","slide_order":"2","course_slide_order":"36","s3_file_name":"36"},{"slide_id":"37","slide_title":"Slide 37","slide_order":"3","course_slide_order":"37","s3_file_name":"37"},{"slide_id":"38","slide_title":"Slide 38","slide_order":"4","course_slide_order":"38","s3_file_name":"38"},{"slide_id":"39","slide_title":"Slide 39","slide_order":"5","course_slide_order":"39","s3_file_name":"39"},{"slide_id":"40","slide_title":"Slide 40","slide_order":"1","course_slide_order":"40","s3_file_name":"40"},{"slide_id":"41","slide_title":"Slide 41","slide_order":"2","course_slide_order":"41","s3_file_name":"41"},{"slide_id":"42","slide_title":"Slide 42","slide_order":"3","course_slide_order":"42","s3_file_name":"42"},{"slide_id":"43","slide_title":"Slide 43","slide_order":"4","course_slide_order":"43","s3_file_name":"43"},{"slide_id":"44","slide_title":"Slide 44","slide_order":"5","course_slide_order":"44","s3_file_name":"44"},{"slide_id":"45","slide_title":"Slide 45","slide_order":"1","course_slide_order":"45","s3_file_name":"45"},{"slide_id":"46","slide_title":"Slide 46","slide_order":"2","course_slide_order":"46","s3_file_name":"46"},{"slide_id":"47","slide_title":"Slide 47","slide_order":"3","course_slide_order":"47","s3_file_name":"47"},{"slide_id":"48","slide_title":"Slide 48","slide_order":"1","course_slide_order":"48","s3_file_name":"48"},{"slide_id":"49","slide_title":"Slide 49","slide_order":"2","course_slide_order":"49","s3_file_name":"49"},{"slide_id":"50","slide_title":"Slide 50","slide_order":"3","course_slide_order":"50","s3_file_name":"50"},{"slide_id":"51","slide_title":"Slide 51","slide_order":"4","course_slide_order":"51","s3_file_name":"51"},{"slide_id":"52","slide_title":"Slide 52","slide_order":"1","course_slide_order":"52","s3_file_name":"52"},{"slide_id":"53","slide_title":"Slide 53","slide_order":"2","course_slide_order":"53","s3_file_name":"53"},{"slide_id":"54","slide_title":"Slide 54","slide_order":"1","course_slide_order":"54","s3_file_name":"54"},{"slide_id":"55","slide_title":"Slide 55","slide_order":"2","course_slide_order":"55","s3_file_name":"55"},{"slide_id":"56","slide_title":"Slide 56","slide_order":"3","course_slide_order":"56","s3_file_name":"56"},{"slide_id":"57","slide_title":"Slide 57","slide_order":"4","course_slide_order":"57","s3_file_name":"57"},{"slide_id":"58","slide_title":"Slide 58","slide_order":"5","course_slide_order":"58","s3_file_name":"58"},{"slide_id":"59","slide_title":"Slide 59","slide_order":"6","course_slide_order":"59","s3_file_name":"59"},{"slide_id":"60","slide_title":"Slide 60","slide_order":"1","course_slide_order":"60","s3_file_name":"60"},{"slide_id":"61","slide_title":"Slide 61","slide_order":"2","course_slide_order":"61","s3_file_name":"61"},{"slide_id":"62","slide_title":"Slide 62","slide_order":"1","course_slide_order":"62","s3_file_name":"62"},{"slide_id":"63","slide_title":"Slide 63","slide_order":"2","course_slide_order":"63","s3_file_name":"63"},{"slide_id":"64","slide_title":"Slide 64","slide_order":"3","course_slide_order":"64","s3_file_name":"64"},{"slide_id":"65","slide_title":"Slide 65","slide_order":"1","course_slide_order":"65","s3_file_name":"65"},{"slide_id":"66","slide_title":"Slide 66","slide_order":"2","course_slide_order":"66","s3_file_name":"66"},{"slide_id":"67","slide_title":"Slide 67","slide_order":"3","course_slide_order":"67","s3_file_name":"67"},{"slide_id":"68","slide_title":"Slide 68","slide_order":"4","course_slide_order":"68","s3_file_name":"68"},{"slide_id":"69","slide_title":"Slide 69","slide_order":"5","course_slide_order":"69","s3_file_name":"69"},{"slide_id":"70","slide_title":"Slide 70","slide_order":"1","course_slide_order":"70","s3_file_name":"70"},{"slide_id":"71","slide_title":"Slide 71","slide_order":"1","course_slide_order":"71","s3_file_name":"71"},{"slide_id":"72","slide_title":"Slide 72","slide_order":"2","course_slide_order":"72","s3_file_name":"72"},{"slide_id":"73","slide_title":"Slide 73","slide_order":"3","course_slide_order":"73","s3_file_name":"73"},{"slide_id":"74","slide_title":"Slide 74","slide_order":"1","course_slide_order":"74","s3_file_name":"74"},{"slide_id":"75","slide_title":"Slide 75","slide_order":"2","course_slide_order":"75","s3_file_name":"75"},{"slide_id":"76","slide_title":"Slide 76","slide_order":"1","course_slide_order":"76","s3_file_name":"76"},{"slide_id":"77","slide_title":"Slide 77","slide_order":"2","course_slide_order":"77","s3_file_name":"77"},{"slide_id":"78","slide_title":"Slide 78","slide_order":"1","course_slide_order":"78","s3_file_name":"78"}],"unit_assigned_slides":[],"video_data_list":[],"document_data_list":[{"course_document_id":"2","course_id":"1","document_title":"FULL COURSE TEXT","document_url":"https:\/\/dpdrq7cj5d2la.cloudfront.net\/PDF\/C101.pdf"}],"schematic_data_list":[],"course_track_start_time":null,"course_track_end_time":null,"exam_number_of_questions":10,"exam_pass_limit":75,"dictionary_url":"http:\/\/www.aviationdictionary.org\/","questionnaire_data":{"questions":[{"question_text":"Content of The Training","question_id":"question1","answers":[{"answer_text":"Very Good","answer_value":"5"},{"answer_text":"Good","answer_value":"4"},{"answer_text":"Sufficient","answer_value":"3"},{"answer_text":"Poor","answer_value":"2"},{"answer_text":"Very Bad","answer_value":"1"}],"given_answer_value":null},{"question_text":"Service level of the training accoridng to your needs.","question_id":"question2","answers":[{"answer_text":"Very Good","answer_value":"5"},{"answer_text":"Good","answer_value":"4"},{"answer_text":"Sufficient","answer_value":"3"},{"answer_text":"Poor","answer_value":"2"},{"answer_text":"Very Bad","answer_value":"1"}],"given_answer_value":null},{"question_text":"Training duration.","question_id":"question3","answers":[{"answer_text":"Very Good","answer_value":"5"},{"answer_text":"Good","answer_value":"4"},{"answer_text":"Sufficient","answer_value":"3"},{"answer_text":"Poor","answer_value":"2"},{"answer_text":"Very Bad","answer_value":"1"}],"given_answer_value":null}]},"version_number":"1.0","version_int":10,"expire_date_offline":"2020-03-12 23:59:00","user_pass_grade":null,"number_of_days_cert":null,"duration":"00:33:00","course_group_id":"0","course_info_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=course\/course\/info&amp;course_id=1","course_detail_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=course\/course\/detail&amp;course_id=1","is_pre_exam_done":false,"course_type_name":"Course","course_type_id":"1","course_type":"course","course_mode":"selfstudy","exam_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=exam\/quiz\/create&&course_id=1&type_id=1","pre_exam_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=exam\/quiz\/create&&course_id=1&type_id=2","study_exam_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=exam\/quiz\/create&&course_id=1&type_id=3","system_exam_url":null,"course_info_data":{"course_id":"1","course_type_id":"1","pre_exam_pass_limit":null,"default_course_id":"1","duration":"00:33:00","category_id":null,"name_of_course":null,"number_of_days_cert":null,"category_name":"GENERAL SUBJECT COURSES","course_code":"EUR RVSM","course_name":"EUROPEAN REDUCED VERTICAL SEPARATION MINIMA - EUR RVSM","exam":null,"user_type_name":null,"company_name":null,"description":"European Reduced Vertical Seperation Minima (EUR RVSM) Online Course starts with an overview of Implementation and the Benefits of RVSM. The course covers Qualifications and Requirements including Certification of RVSM, Maintaining RVSM Qualification and the condition of your not being qualified for RVSM. The course then focuses on Aircraft Systems (Equipment Requirements, Errors &amp; Tolerance) and RVSM Operations detailing Flight Planning, Aircraft Pre-flight procedures, Procedures prior to RVSM Airspace Entry, In-flight &amp; post-flight procedures, TCAS \/ ACAS and RVSM. The Contingency Procedures section of the course addresses General Procedures and Standart Phraseology. Finally, System Performance Monitoring section with Height Monitoring Unit (HMU) and Special Height Monitoring Flights subtitles take place. This course meets all state authority regulations. Courses are constantly monitored and updated when major changes in authority documentation are released.","certification":null,"starting_date":null,"course_slides_folder":null,"subtitle_language":"3,4","subtitle_language_to_display":"tr,en","subtitle_language_player":null,"subtitle_language_list":[{"language_id":"4","name":"T\u00fcrk\u00e7e","code":"tr","locale":"tr_TR,tr-TR,tr","image":"tr.png","directory":"turkish","filename":"turkish","sort_order":"1","status":"1"},{"language_id":"3","name":"English","code":"en","locale":"en_US.UTF-8,en-US,en;q=0.5","image":"gb.png","directory":"english","filename":"english","sort_order":"2","status":"1"}],"unit_xml_file":"https:\/\/s3.eu-central-1.amazonaws.com\/lmspc\/UnitXML\/C101.xml","num_of_page":"78","unit_data_list":[],"video_data_list":[],"unit_data_slide_list":[],"version_number":"1.0","version_int":10,"department_id":0,"department_name":0,"department_info":null},"status":"Self Study","certificate_url":null,"elapsed_time_int":0,"num_of_entry":0,"is_disabled":false,"is_scorm":false,"is_panorama":false,"is_system_exam":false,"scorm_data":null,"scorm_start_url":"https:\/\/dev.avilms.com\/omer\/index.php?route=course\/scorm\/detail&course_id=1","panorama_start_url":null,"is_progress_available":true,"department_id":0,"course_schedule":{"course_id":null,"user_type_id":null,"recurrence_period":1,"certification":180,"num_of_try":3,"exam":true,"exam_pass_limit":75,"num_of_questions":10,"recurrence_date_sql":false},"exam_start_url":null,"alert_exam_text":null,"is_study_exam_enabled":true,"is_scorm_failed":false,"subtitle_language":"3,4","swf_bucket_path":"https:\/\/lmspc.s3.eu-central-1.amazonaws.com\/000AVILMS\/C101\/","mp4_bucket_path":"https:\/\/lmsmobile.s3.eu-central-1.amazonaws.com\/000AVILMS\/C101\/"}';
    json_user_course_data_parsed  = JSON.parse(json_user_course_data);

    //console.log(json_user_course_data_parsed.unit_data_list[0].slides[0].language.en);

    //Dil içerikleri parse ediliyor
    json_lang_parsed = JSON.parse(json_lang);

    course_slide_count    = json_user_course_data_parsed.num_of_page;
    is_track_mode         = json_user_course_data_parsed.is_track_mode; //Self study ya da değil
    completed_slide       = json_user_course_data_parsed.completed_page; //Slide tamam ya da değil
    is_exam_mode          = json_user_course_data_parsed.is_exam_mode; //Exam modu aktif ya da değil
    first_slide_name      = json_user_course_data_parsed.slides_ordered[0].s3_file_name; // İlk slide s3 fil adı alınıyor
    exam_url              = json_user_course_data_parsed.exam_url;//Exam url alınıyor
    num_of_page           = json_user_course_data_parsed.num_of_page;//Course içerdiği slide ders sayısı
    course_id             = json_user_course_data_parsed.course_id;//Kurs id değeri alınıyor
    course_type           = json_user_course_data_parsed.course_type;

    //Video ya da swf slidenin bulunduğu url adresi alınıyor
    //Alınan değer "s3BucketPath" olarak tanımlanıyor js dosyası içerisinde kullanılıyor
    getS3BucketPath();
    //is_track_mode = 0;

    // Course tamamlandı ya da tamamlanmadı
    if(completed_slide==course_slide_count){
        course_completed = 1;
    } else{
        course_completed = 0;
    }


    // List Languages, being done language change data
    listLanguage = document.getElementById("media-subtitle-ul").getElementsByTagName("li");
    var i;

    //Current Prev ve Next video bilgileri ayarlanıyor
    setPrevCurrentNextSlide(parseInt(completed_slide)+1);

    $(".unit-list").css({"max-height":treeHeight,"overflow-y":"scroll"});

    //Eğer selstudy ise self study popup aciliyor
    if(is_track_mode == 0){
        $('#selfStudyModal').modal('show');
    } else{
        //20 saniyede bir istek atılıyor kullanıcı takip ediliyor. Hem ders süresi takip ediliyor hemde session durumu.
        starttimer();
        if (is_exam_mode){//Couse slideler izlendi ve sınav kısmına geçildi ise
            createstartexamoverlay();
        } else {//Ders izleme devam ediyor
            if (!course_completed) { // Eğer kurs tamamlanmadı ise
                if(completed_slide !== 0) { //Eğer oyanayan slide sırası sıfırdan büyük ise
                    createcoursestartoverlay();
                } else{
                    createcoursestartoverlay();
                }
            }else{
                createquestionaireoverlay();
            }
        }
    }


    for (i = 0; i < listLanguage.length; i++) {
        listLanguage[i].addEventListener("click", function() {
            _language = this.getAttribute("language");
            var height_subtitle = 0;
            if(_language){
                //Json içerisinden subtitle alınıyor
                _languageText = json_user_course_data_parsed.slides_ordered[_current].language[_language];
                subtitleText.style.display = "block";
                subtitleTextContent.innerHTML     = "";
                subtitleTextContent.innerHTML     = (_languageText)?_languageText:'<span style="color:red;">no subtitle</span>';//Altyazı ayarlanıyor

                if(_fullScreen == 1){

                    var _fullScreenHeight           = parseInt(window.screen.height);
                    var _mediaCenterHeight          = parseInt(mediaCenter.offsetHeight);
                    var _newMediaHeight             = _fullScreenHeight - _mediaCenterHeight;
                    mediaPlayerContent.style.height = _newMediaHeight	+"px";
                    subtitleText.style.backgroundColor = "rgba(101, 97, 97, 0.8)";

                    /*height_subtitle                   = subtitleText.offsetHeight;
                    var new_media_height              = (parseInt(mediaPlayerContent.offsetHeight) - parseInt(height_subtitle));
                    mediaPlayerContent.style.height   = new_media_height+"px";*/
                }
                _subtitleOpened = 1;
                console.log("Oynayan Slide Number : "+current_slide_number);
            } else{
                _subtitleOpened = 0;
                height_subtitle                   = subtitleText.offsetHeight;
                subtitleText.style.display = "none";
                if(_fullScreen == 1){
                    var _fullScreenHeight           = parseInt(window.screen.height);
                    var _mediaCenterHeight          = parseInt(mediaCenter.offsetHeight);
                    var _newMediaHeight             = _fullScreenHeight - _mediaCenterHeight;
                    mediaPlayerContent.style.height = _newMediaHeight	+"px";

                    /*var new_media_height              = (parseInt(mediaPlayerContent.offsetHeight) + parseInt(height_subtitle));
                    mediaPlayerContent.style.height   = new_media_height+"px";*/
                }
                console.log("Oynayan Slide Number : "+current_slide_number);
            }

            document.querySelector(".active").classList.remove("active");
            this.classList.add("active");
        });
    }

    mainHtml5PlayerHeight = mainHtml5Player.offsetHeight;

    mainHtml5PlayerHeight = parseInt(mainHtml5PlayerHeight)+6;
    subtitleTextHeight    = parseInt(mainHtml5PlayerHeight)+6;

    //Altyazı sçeneklerininlistelendiği sayfanın yeri belirleniyor
    //mediaSubtitles.style.bottom = mainHtml5PlayerHeight+"px";
    subtitleText.style.bottom   = subtitleTextHeight+"px";

    if(mediaType == "mp4"){
        // Hide the browser's default controls
        mediaPlayer.controls = false;

        // video loaded
        mediaPlayer.addEventListener('loadedmetadata',loadVideoSetting,false);

        //Media yüklendi
        mediaPlayer.onloadeddata = function() {
            //alert(mediaPlayer.paused);
            //console.log("Media Yükelendi 2");
            _mediaLoad = 1;
        };

        mediaPlayer.addEventListener("loadeddata", function() {
            //alert(mediaPlayer.paused);
            console.log("Media Yükelendi");
            mediaTime.innerHTML = "0:00 / 0:00";
            _mediaLoad = 1;
        });

        // Add a listener for the timeupdate event so we can update the progress bar
        mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

        // Video fineshed
        mediaPlayer.addEventListener('ended',mediaFinished,false);

    }

    // Time progress on click
    document.getElementById("controls-progress").addEventListener("click", seek);

    // Close subtitle menu
    document.getElementById("close-subtitle").addEventListener("click", closeSubtitle);

    // Close subtitle text
    document.getElementById("close-subtitle-text").addEventListener("click", closeSubtitleText);

    // Close subtitle menu if go out of subtitle menu
    document.getElementById("media-subtitles").addEventListener("mouseleave", closeSubtitle);

    // Media move
    document.getElementById("media-player-content").addEventListener("mousemove", videoMediaOverMove,false);

    // controls menu on
    document.getElementById("main-html5-player").addEventListener("mouseenter", videoMediaBackEnter);

    // controls menu leave
    document.getElementById("main-html5-player").addEventListener("mouseleave", videoMediaBackLeave);

    // Volume setting
    document.getElementById("volume-progress").addEventListener("click", setVolume);

    // Volume setting
    document.getElementById("volume-progress-hidden").addEventListener("mousemove", setMoveVolume);

    //Fukk screenden çıılmak için escape tuşu tıklandı
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    // Open new media on player
    var classname = document.getElementsByClassName("media-play");
    for (var i = 0; i < classname.length; i++) {
        //Unite agaci uzerinden ilgli ders tiklandigi zaman acilmasıni saglayacak fonksiyon cagriliyor
        classname[i].addEventListener('click', openMedia, false);
    }

    // An ünit ağaç koordinatları alınıyor
    var mainUnits = document.getElementsByClassName("unit-main");
    for (var i = 0; i < mainUnits.length; i++) {
        //Unite id değeri alınıyor
        var _key_unit   = mainUnits[i].getAttribute("id");
        var _value_unit = mainUnits[i].offsetTop;
        offsetTopArr["#"+_key_unit] = _value_unit;
    }
}

//Gonderilen element id degerine uygun olarak o elment datası object olarak donuyor
function getFlashMovieObject(movieName) {
    if (window.document[movieName])
    {
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet") == -1)
    {
        if (document.embeds && document.embeds[movieName])
            return document.embeds[movieName];
    }
    else
    {
        return document.getElementById(movieName);
    }
}

//Eger player yuklendi ilk swf slide yukleniyor
function loadPlayer(data){
    //Javascript loaidng medya player click event ve ayarları yükleniyor.
    //initialiseMediaPlayer();

    var flashMovie = getFlashMovieObject("player");

    //Adı alınan dosyanın uzantısı eklendi swf,mp4
    s3SwfName    = setS3FileName(current_slide_name);
}

//Slide - Swf oynatilmaya baslaniyor
function playslide(slide,s3BucketPath) {
    var flashMovie = getFlashMovieObject("player");
    try {
        //console.log(s3BucketPath+slide);

        if(mediaType == "swf"){
            //Slide yani swf dosyasi yükleniyor
            //console.log(autoplay);
            flashMovie.playSlide(s3BucketPath,slide,autoplay);
            volumeRed.style.width = "100%";
            volumeLast.style.left ="99%";
        } else if(mediaType == "mp4"){
            //mp4 is starting
            mediaPlayer.src = s3BucketPath+slide;
            mediaPlayer.load();

            if(autoplay){
                _mediaLoad = mediaPlayer.play();

                if (_mediaLoad !== undefined) {
                    _mediaLoad.then(_ => {
                        mediaPlayer.play();
                    }).catch(error => {
                        autoplay     = 0;
                        slidePlaying = 0;
                        changeClassName(playPauseBtnAwesome,"fa-play","fa-pause");
                        mediaPlayer.pause();
                    });
                }
            } else{
                mediaPlayer.pause();
            }

        }

        if(subtitleText.style.display == "block"){
            _languageText                     = json_user_course_data_parsed.slides_ordered[_current].language[_language];
            subtitleTextContent.innerHTML     = "";
            subtitleTextContent.innerHTML     = (_languageText)?_languageText:'<span style="color:red;">no subtitle</span>';//Altyazı ayarlanıyor
        }

    } catch (err) {
        console.log(err);
    }

}

//Swf medyasinin icerdigi toplam frame sayisi aliniyor
function getTotalFrame(total){
    //Total frame sayisi aliniyor
    _totalFrame = total;
}

//Swf suan oynayan frame bilgisi aliniyor
function getCurrentFrame(current){
    //Oynayan mevcut frame
    _currentFrame = current;

    if(_currentFrame == 10){
        _currentBeforeFrame = 0
    }

    //Eğer oynayan frame son frame ise player menu play icon pause oluyor
    if(_currentFrame == _totalFrame){
        if(_currentBeforeFrame != _currentFrame){
            togglePlayPause();
        }
    }

    //Progress bar ayarlanıyor
    updateProgressBar();
}

function setSoundVolume() {
    var flashMovie = getFlashMovieObject("player");
    flashMovie.setSoundVolume(1);
}

// Media is changing on player start
function openMedia(event) {
    var current_slide_oldnumber = current_slide_number;
    current_slide_number = this.getAttribute('slide-number');

    //play_wanted_slide değeri ayarlanıyor eğer sıradaki videoyu izlemehakkı varsa izleyebilecek
    getSlideTrackMode();

    //İlgili ders oyantılıyor
    if(play_wanted_slide == 1){
        //Ders oynatılmaya başlanıyor
        autoplay = 1;

        var slide_order      = this.getAttribute('slide-number');
        var s3_swf_name      = this.getAttribute('s3-swf-name');
        var s3_video_name    = this.getAttribute('s3-video-name');
        var checkbox         = this.getAttribute('checkbox');
        var checkmark        = this.getAttribute('checkmark');

        var watched_slide_id   = "#slide-"+slide_order;

        /*var watched_unit_class = this.getAttribute('unit-class');
        $(watched_unit_class).click();*/

        //Tıklannan ders aktif ediliyor
        var elem_div         = document.querySelector(watched_slide_id);
        var elem_checkmark   = document.querySelector(checkmark);
        var elem_checkbox    = document.querySelector(checkbox);

        //Prev next current bilgileri ayalanıyor
        setPrevCurrentNextSlide(current_slide_number);

        //Altyazı açık ise altyazı ayarlanıyor
        if(subtitleText.style.display == "block"){
            _languageText                     = json_user_course_data_parsed.slides_ordered[_current].language[_language];
            subtitleTextContent.innerHTML     = "";
            subtitleTextContent.innerHTML     = (_languageText)?_languageText:'<span style="color:red;">no subtitle</span>';//Altyazı ayarlanıyor
        }

        var media_name    = "";

        if(mediaType == "swf"){
            if(slidePlaying == 0){
                slidePlaying = 1;
                changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
            }
            //Swf is starting to play
            playslide(s3_swf_name,s3BucketPath);
        } else if(mediaType == "mp4"){
            if(slidePlaying == 0){
                slidePlaying = 1;
                changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
            }
            //mp4 is starting
            playslide(s3_video_name,s3BucketPath);
        }

        //elem.style.backgroundColor = '#2196F3';
        //elem.style.borderColor     = '#007791';
        elem_checkmark.classList.add('checkmark_true');
        elem_checkbox.checked  = "true";
        $(".slide").removeClass("unit-slide-active");
        elem_div.classList.add("unit-slide-active");

        var current_slide_id          = "slide-"+current_slide_number;
        active_unit_class    = document.getElementById(current_slide_id).getAttribute("unit-class");
        active_subunit_class = document.getElementById(current_slide_id).getAttribute("sub-unit-class");

    } else{
        showToastMessage(json_lang_parsed.warning_unauthorized_action, 'error');
        current_slide_number = current_slide_oldnumber;
    }

}

// Play or stop media
function togglePlayPause() {
    //Ders başlamak için ayarlanıyor bu sebeple bitmemiş.
    _slideFinished = 0;
    //if swf is playing  on player then :
    if(mediaType=="swf"){
        var flashMovie = getFlashMovieObject("player");
        try {
            flashMovie.swfStopPlay();
            if(slidePlaying == 1){
                slidePlaying = 0;
                changeClassName(playPauseBtnAwesome,"fa-play","fa-pause");
            } else{
                slidePlaying = 1;
                changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
            }

        } catch (err) {
            console.log(err);
        }
    } else{
        // If the mediaPlayer is currently paused or has ended
        if (mediaPlayer.paused || mediaPlayer.ended) {
            slidePlaying = 1;
            // Change the button to be a pause button
            changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");

            // Play the media
            mediaPlayer.play();
        }
        // Otherwise it must currently be playing
        else {
            slidePlaying = 0;
            // Change the button to be a play button
            changeClassName(playPauseBtnAwesome,"fa-play","fa-pause");
            // Pause the media
            mediaPlayer.pause();
        }
    }
}

// First will be worked function when open page
function loadVideoSetting() {

    var durationMinutes = parseInt(mediaPlayer.duration / 60, 10);
    var durationSeconds = mediaPlayer.duration % 60;

    var currentMinutes = 0;
    var currentSeconds = 0;

    var timeText       = currentMinutes + ":" + Math.round(currentSeconds)+ " / " + durationMinutes + ":" + Math.round(durationSeconds);
    //console.log(timeText);

    var _flagCurrent = "";
    if(currentSeconds<9.5){
        _flagCurrent = "0";
    }

    var _flagTotal = "";
    if(durationSeconds<9.5){
        _flagTotal = "0";
    }

    mediaTime.innerHTML = currentMinutes + ":" + _flagCurrent + Math.round(currentSeconds) + " / " + durationMinutes + ":" + _flagTotal + Math.round(durationSeconds);

    //mediaTime.innerHTML = currentMinutes + ":" + Math.round(currentSeconds) + " / " + durationMinutes + ":" + Math.round(durationSeconds);
}

// Toggles the media player's mute and unmute status
function toggleMute() {
    if(mediaType == "swf"){
        var flashMovie = getFlashMovieObject("player");
        if(_swfSound == 1){
            _swfSound = 0;
            changeClassName(volumeButtonAwesome,"fa-volume-off","fa-volume-up");
            flashMovie.setSoundVolume(0);
            volumeRed.style.width = "0%";
            volumeLast.style.left ="0%";
        } else{
            _swfSound = 1;
            changeClassName(volumeButtonAwesome,"fa-volume-up","fa-volume-off");
            flashMovie.setSoundVolume(100);
            volumeRed.style.width = "100%";
            volumeLast.style.left ="99%";
        }
    } else{
        /*if (mediaPlayer.muted) {
            // Unmute the media player
            mediaPlayer.muted = false;
            volumeRed.style.width = "100%";
            volumeLast.style.left = "99%";
            changeClassName(volumeButtonAwesome,"fa-volume-up","fa-volume-off");
        }
        else {console.log(mediaPlayer.volume + "-" + mediaPlayer.muted);
            // Mute the media player
            mediaPlayer.muted = true;
            volumeRed.style.width = "0%";
            volumeLast.style.left = "0%";
            changeClassName(volumeButtonAwesome,"fa-volume-off","fa-volume-up");
        }*/

        if (mediaPlayer.volume>0){
            // Mute the media player
            mediaPlayer.muted = true;
            volumeRed.style.width = "0%";
            volumeLast.style.left = "0%";
            mediaPlayer.volume    = 0;
            changeClassName(volumeButtonAwesome,"fa-volume-off","fa-volume-up");
        }
        else {
            // Unmute the media player
            mediaPlayer.muted = false;
            volumeRed.style.width = "100%";
            volumeLast.style.left = "99%";
            mediaPlayer.volume    = 1;
            changeClassName(volumeButtonAwesome,"fa-volume-up","fa-volume-off");
        }

    }

}

// Replays the media currently loaded in the player
function replayMedia() {
    if(mediaType == "swf"){
        //Slide baştan başlatılıyor
        var flashMovie = getFlashMovieObject("player");
        try {
            //Player menu icon değişiyor
            if(slidePlaying == 0){
                slidePlaying = 1;
                changeClassName(playPauseBtnAwesome,"fa-pause","fa-play",);
            }

            if(_slideFinished == 1 && current_slide_number!=num_of_page){
                //Bir önceki slide oynatılıyor
                //previousSlidePlay();

                //Slide yani swf dosyasi yükleniyor
                flashMovie.goToFrame(1);
            } else{
                //Slide yani swf dosyasi yükleniyor
                flashMovie.goToFrame(1);
            }

        } catch (err) {
            console.log(err);
        }
    } else{
        if(_slideFinished == 1 && current_slide_number!=num_of_page){
            //Bir önceki slide oynatılıyor
            //previousSlidePlay();

            resetPlayer();
            mediaPlayer.play();
        } else{
            resetPlayer();
            mediaPlayer.play();
        }
    }

}

// Update the progress bar
function updateProgressBar() {
    if(mediaType == "swf"){
        //
        //console.log(_currentFrame+":"+_totalFrame);console.log(_currentFrame+":"+_totalFrame);

        //Progress bar width calculate
        var percentage = Math.floor((100 / _totalFrame) * _currentFrame);
        progress       = percentage;
        progressBarAwesome.style.width = percentage+"%";

        var date = new Date(null);
        date.setSeconds(parseInt(_currentFrame/16)); // specify value for SECONDS here
        var _startTime = date.toISOString().substr(14, 5);

        date.setSeconds(parseInt(_totalFrame/16)); // specify value for SECONDS here
        var _endTime = date.toISOString().substr(14, 5);

        //var _startTime  = parseInt(_currentFrame/16);
        //var _endTime    = parseInt(_totalFrame/16);

        //mediaTime.innerHTML = _currentFrame +" / " + _totalFrame;
        mediaTime.innerHTML = _startTime +" / " + _endTime;

        var date = new Date(null);
        date.setSeconds(parseInt(_currentFrame/16)); // specify value for SECONDS here
        var _startTime = date.toISOString().substr(11, 8);

        //Swf dersinin izlenmesi bitti ise
        if(_totalFrame == _currentFrame){
            if(_currentBeforeFrame != _currentFrame){
                //Aynı medyaya iki adet aynı değerden giriş yapmasın diye düzenleme yapılıyor
                _currentBeforeFrame = _currentFrame
                //Swf dosyasının oynatımı tamamlandı
                mediaFinished();
            }
        }

    } else{
        // Work out how much of the media has played via the duration and currentTime parameters
        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);

        var durationMinutes = parseInt(mediaPlayer.duration / 60, 10);
        var durationSeconds = mediaPlayer.duration % 60;

        if(!mediaPlayer.duration){
            durationSeconds = "0";
            durationMinutes = "0";
        }

        var currentMinutes = parseInt(mediaPlayer.currentTime / 60, 10);
        var currentSeconds = mediaPlayer.currentTime % 60;

        var _flagCurrent = "";
        if(currentSeconds<9.5){
            _flagCurrent = "0";
        }

        var _flagTotal = "";
        if(durationSeconds<9.5){
            _flagTotal = "0";
        }

        progressBarAwesome.style.width = percentage+"%";
        mediaTime.innerHTML = currentMinutes + ":" + _flagCurrent + Math.round(currentSeconds) + " / " + durationMinutes + ":" + _flagTotal + Math.round(durationSeconds);
    }

}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeClassName(btn,newCls, oldCls) {
    btn.classList.add(newCls);
    btn.classList.remove(oldCls);
}

//Player bar control
function videoMediaOverMove(evt){

    document.getElementById("main-html5-player-background").style.display = "block";
    setDivBottom();
    clearTimeout(mousemove_timeout);
    mousemove_timeout = window.setTimeout(function() {
        //
        if(mouseOnControlsMenu)
        {
            videoMediaOverMove(evt);
            //console.log("üstüne");
        }
        else
        {
            //Control menu kayboluyor
            //document.getElementById("main-html5-player-background").style.display = "none";
            //subtitleText.style.bottom   = "5px";
        }
    }, 1000);


}

// Mouse leaved from media controls menu
function videoMediaBackEnter(evt){
    mouseOnControlsMenu=true;
    //console.log("Media control back enter");
}

// Mouse on media controls menu
function videoMediaBackLeave(evt){
    mouseOnControlsMenu=false;
}

// Setting bottom for subttile menu and subtitle text
function setDivBottom() {
    mainHtml5PlayerHeight = mainHtml5Player.offsetHeight;

    mainHtml5PlayerHeight = parseInt(mainHtml5PlayerHeight)+6;
    subtitleTextHeight    = parseInt(mainHtml5PlayerHeight)+6;

    //Altyazı sçeneklerininlistelendiği sayfanın yeri belirleniyor
    //mediaSubtitles.style.bottom = mainHtml5PlayerHeight+"px";
    subtitleText.style.bottom   = subtitleTextHeight+"px";

}

//Media fullscreen or normal screen
function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    fullScreenClick++;
    //var docElm = mediaPlayerContent;
    var docElm = mediaVideoControl;
    if (!isInFullScreen) {
        _fullScreen = 1;
        changeClassName(mediaScreen,"fa-compress","fa-expand");
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }

        //mediaPlayerContent.style.height = "93%";
        //subtitleText.style.display = "none";


    } else {
        _fullScreen = 0;
        changeClassName(mediaScreen,"fa-expand","fa-compress");
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

//Esc tuşu ile çıkılıyorsa
function exitHandler() {
    fullScreenClick++;
    //changeClassName(mediaScreen,"fa-expand","fa-compress");
    if(fullScreenClick>1){
        fullScreenClick = 0;
        if(_fullScreen==0){
            mediaPlayerContent.style.height = "470px";
            subtitleText.style.backgroundColor = "rgba(28,28,28,0.8)";
        } else{
            var _fullScreenHeight           = parseInt(window.screen.height);
            var _mediaCenterHeight          = parseInt(mediaCenter.offsetHeight);
            var _newMediaHeight             = _fullScreenHeight - _mediaCenterHeight;
            mediaPlayerContent.style.height = _newMediaHeight	+"px";
            subtitleText.style.backgroundColor = "rgba(101, 97, 97, 0.8)";
        }
    } else{
        changeClassName(mediaScreen,"fa-expand","fa-compress");
        mediaPlayerContent.style.height = "470px";
        subtitleText.style.backgroundColor = "rgba(28,28,28,0.8)";
        _fullScreen = 0;
    }
}

// Open subtitle menu
function openSubtitle() {
    var displayValue = mediaSubtitles.style.display;

    //console.log(displayValue);
    if(displayValue == "block"){
        mediaSubtitles.style.display = "none";
    } else{
        mediaSubtitles.style.display = "block";
    }
}

// Close subtitle menu
function closeSubtitle() {
    mediaSubtitles.style.display = "none";
}

// Close subtitle text
function closeSubtitleText() {
    var  height_subtitle        = subtitleText.offsetHeight;
    subtitleText.style.display = "none";
    document.querySelector(".media-subtitle-ul .active").classList.remove("active");
    document.getElementById("no-subtitle").classList.add("active");
    _subtitleOpened = 0;
    if(_fullScreen == 1){
        var new_media_height              = (parseInt(mediaPlayerContent.offsetHeight) + parseInt(height_subtitle));
        mediaPlayerContent.style.height   = new_media_height+"px";
    }
}

// be worked when click time progress bar
function seek(evt) {
    //play_wanted_slide değeri ayarlanıyor eğer sıradaki videoyu izlemehakkı varsa izleyebilecek
    //play_forward_slide değeri ayarlanıyor eğer sıradaki ders ileri alanabiliyorsa ilerletilebilecek
    getSlideTrackMode();

    if(mediaType == "swf"){
        var flashMovie = getFlashMovieObject("player");

        var percent     = evt.offsetX / this.offsetWidth;
        var percentage  = Math.floor(percent * 100);
        var goToFrame   = Math.floor((_totalFrame/100)*percentage);
        //var goToFrame   = percentage;

        // Looks where click forward time or back time
        if(percentage>progress){//forward time
            //console.log("Click Forward Time");
            back_seek_click = 0;
        } else{
            //console.log("Click Back Time");
            back_seek_click = 1;
        }

        //Eğer ders ilerletmek için izin varsa
        if((play_forward_slide && play_wanted_slide) || back_seek_click == 1){
            if(slidePlaying == 0){
                slidePlaying = 1;
            }

            changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
            //Slide yani swf dosyasi yükleniyor
            flashMovie.goToFrame(goToFrame);
        } else{
            showToastMessage(json_lang_parsed.warning_unauthorized_forward_slide, 'error');
            if(_fullScreen==1){
                console.log("Full Screen");
                //alert("Full Screen");
            }
        }

    } else{

        var percent = evt.offsetX / this.offsetWidth;

        var getClickCurrentTime      = percent * mediaPlayer.duration;
        var getRealCurrentTime       = mediaPlayer.currentTime;

        // Looks where click forward time or back time
        if(getClickCurrentTime>getRealCurrentTime){//forward time
            //console.log("Click Forward Time");
            back_seek_click = 0;
        } else{
            //console.log("Click Back Time");
            back_seek_click = 1;
        }

        //Eğer ders ilerletmek için izin varsa
        if((play_forward_slide && play_wanted_slide) || back_seek_click == 1){
            mediaPlayer.currentTime = percent * mediaPlayer.duration;
            percentage = percent * 100;

            progressBarAwesome.style.width = percentage+"%";
        } else{
            showToastMessage(json_lang_parsed.warning_unauthorized_forward_slide, 'error');
        }
    }
}

//Ses yüksekliği ayarlanıyor
function setVolume(evt) {
    var percent     = evt.offsetX / this.offsetWidth;
    var percentage  = Math.floor(percent * 100);
    volumeLast.style.left =(parseInt(percentage)-1)+"%";


    if(mediaType == "swf"){
        _swfSound = 1;
        var flashMovie = getFlashMovieObject("player");
        flashMovie.setSoundVolume(percentage);
    } else if(mediaType == "mp4"){
        mediaPlayer.volume = percent;
    }

    changeClassName(volumeButtonAwesome,"fa-volume-up","fa-volume-off");
    volumeRed.style.width = percentage+"%";
}

//
function setMoveVolume(evt) {
    //console.log(this.id+"-"+evt.offsetX );
    var percent     = evt.offsetX / this.offsetWidth;
    var percentage  = Math.floor(percent * 100);
    volumeLast.style.left =(parseInt(percentage)-1)+"%";


    if(mediaType == "swf"){
        _swfSound = 1;
        var flashMovie = getFlashMovieObject("player");
        flashMovie.setSoundVolume(percentage);
    } else if(mediaType == "mp4"){
        if(parseInt(percent)>-1){
            mediaPlayer.volume = percent;
        }

    }

    if(evt.offsetX==0){
        changeClassName(volumeButtonAwesome,"fa-volume-off","fa-volume-up");
        if(mediaType == "swf") {
            _swfSound = 0;
        }
    } else{
        changeClassName(volumeButtonAwesome,"fa-volume-up","fa-volume-off");
        if(mediaType == "swf") {
            _swfSound = 1;
        }
    }
    volumeRed.style.width = percentage+"%";
}

//Pass to next slide
function nextSlidePlay(){
    current_slide_oldnumber = current_slide_number;
    current_slide_number    = current_slide_number+1;
    //play_wanted_slide değeri ayarlanıyor eğer sıradaki videoyu izlemehakkı varsa izleyebilecek
    getSlideTrackMode();

    if(play_wanted_slide){
        //Ders autoplay olarak oynasın
        autoplay = 1;
        //Ders şuan oynuyor
        slidePlaying = 1;
        //Video autoplay çalışacağı için mediaplayer menu icon play durumuna getiriliyor
        changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
        //Sıradaki dersin ismi alınıyor
        setS3FileName(next_slide_name);
        //Slide oynatiliyor
        playslide(s3SwfName,s3BucketPath);
        //Yeni prew / current / next
        setPrevCurrentNextSlide(current_slide_number);
        //Gidilen slide sağ ağaç üzerinde işaretleniyor
        $(".slide").removeClass("unit-slide-active");
        $("#"+current_slide_number).addClass("unit-slide-active");

        //Sağ unite ağazı ayarlanıyor
        setTreeActive();
        //feedback üzerinde bulunan slide_number güncelleniyor
        setFeedbackSlideNumber();
        //Eğer altyazı açıksa uygun altyazı getiriliyor
        if(subtitleText.style.display == "block"){
            _languageText                     = json_user_course_data_parsed.slides_ordered[_current].language[_language];
            subtitleTextContent.innerHTML     = "";
            subtitleTextContent.innerHTML     = (_languageText)?_languageText:'<span style="color:red;">no subtitle</span>';//Altyazı ayarlanıyor
        }
    } else{
        current_slide_number = current_slide_oldnumber;
        showToastMessage(json_lang_parsed.warning_unauthorized_forward_slide, 'error');
    }
}

//Pass to previous slide
function previousSlidePlay(){
    //Ders autoplay olarak oynasın
    autoplay = 1;
    //Ders şuan oynuyor
    slidePlaying = 1;
    //Video autoplay çalışacağı için mediaplayer menu icon play durumuna getiriliyor
    changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
    //Bir önceki dersin ismi alınıyor
    setS3FileName(previous_slide_name);
    //Slide oynatiliyor
    playslide(s3SwfName,s3BucketPath);

    //Eğer ilk slide izlenirken previous tıklanırsa
    if(current_slide_number==1){
        current_slide_number = 2;
    }

    //Yeni prew / current / next
    setPrevCurrentNextSlide(current_slide_number-1);

    $(".slide").removeClass("unit-slide-active");
    $("#"+current_slide_number).addClass("unit-slide-active");

    //Sağ unite ağazı ayarlanıyor
    setTreePrevActive();
    //feedback üzerinde bulunan slide_number güncelleniyor
    setFeedbackSlideNumber();

    //Eğer altyazı açıksa uygun altyazı getiriliyor
    if(subtitleText.style.display == "block"){
        _languageText                     = json_user_course_data_parsed.slides_ordered[_current].language[_language];
        subtitleTextContent.innerHTML     = "";
        subtitleTextContent.innerHTML     = (_languageText)?_languageText:'<span style="color:red;">no subtitle</span>';//Altyazı ayarlanıyor
    }
}

//Oynayan derse uygun olarak prev/next slide bilgileri ayarlanıyor
function setPrevCurrentNextSlide(slide){
    if(!slide || slide==0){
        slide = 0;
        next_slide_name               = json_user_course_data_parsed.slides_ordered[slide+1].s3_file_name;//Sıradaki slide s3 adu alınıyor
        current_slide_name            = json_user_course_data_parsed.slides_ordered[slide].s3_file_name;//Şimdi oynayan
        previous_slide_name           = json_user_course_data_parsed.slides_ordered[slide].s3_file_name;//Bir önceki slide bilgisi
        current_slide_number          = parseInt(slide);
        _current                      = current_slide_number;
    } else if((parseInt(slide)-1)==num_of_page){
        next_slide_name               = json_user_course_data_parsed.slides_ordered[slide-2].s3_file_name;//Sıradaki slide s3 adu alınıyor
        current_slide_name            = json_user_course_data_parsed.slides_ordered[slide-2].s3_file_name;//Şimdi oynayan
        previous_slide_name           = json_user_course_data_parsed.slides_ordered[slide-3].s3_file_name;//Bir önceki
        current_slide_number          = parseInt(slide-1);
        _current                      = slide-2;

    } else {

        if(slide > 1){
            _prev    = slide-2;
            _current = slide-1;
        } else{
            _current = 0;
        }

        //Eğer son silde ise next slide yok
        if(slide == num_of_page){
            next_slide_name               = json_user_course_data_parsed.slides_ordered[_current].s3_file_name;//Sıradaki slide s3 adu alınıyor
        } else{
            next_slide_name               = json_user_course_data_parsed.slides_ordered[slide].s3_file_name;//Sıradaki slide s3 adu alınıyor
        }

        current_slide_name            = json_user_course_data_parsed.slides_ordered[_current].s3_file_name;//Şimdi oynayan
        previous_slide_name           = json_user_course_data_parsed.slides_ordered[_prev].s3_file_name;//Bir önceki
        current_slide_number          = parseInt(slide);
    }
    //Ders başlamak için ayarlanıyor bu sebeple bitmemiş.
    _slideFinished = 0;

}

//İlgili slide oynatmaya izin var ya da yok
function getSlideTrackMode(){
    //Eğer ders otomotik oynatılmasına izin verilmiyorsa
    if(is_track_mode){
        //Eğer tamamlanan slide numarası oynatılmasını istediğimiz slide numarasından büyük ise ilgili slide açılablir çünkü daha önce izlenmiş
        if(parseInt(completed_slide)+1>=current_slide_number){
            play_wanted_slide  = 1;//Ders oynatılablir
            if(parseInt(completed_slide)+1==current_slide_number){
                play_forward_slide = 0;//Ders ileri alınabilir.
            } else{
                play_forward_slide = 1;//Ders ileri alınabilir.
            }
        } else{
            play_wanted_slide  = 0;
            play_forward_slide = 0;//Ders ileri alınamaztamamı izlenmeli
        }
    } else{ //Ders self study ve istenilen ders oynatılabiliyor
        play_wanted_slide  = 1;
        play_forward_slide = 1;
    }
}


//Viedo durumuna göre unite ağacı düzenleniyor.
function setTreeActive(){

    var current_slide_id          = "slide-"+current_slide_number;
    var unit_click_ok             = 1;
    var subunit_click_ok          = 1;
    var no_unit_scrool            = 1;

    if(document.getElementById(current_slide_id).getAttribute("unit-class") == active_unit_class){
        unit_click_ok = 0;
    }

    if(document.getElementById(current_slide_id).getAttribute("sub-unit-class") == active_subunit_class){
        subunit_click_ok = 0;
    }

    //Unite ağacı uygun şekilde açılıyor
    active_unit_class    = document.getElementById(current_slide_id).getAttribute("unit-class");
    active_subunit_class = document.getElementById(current_slide_id).getAttribute("sub-unit-class");
    active_unit_id       = document.getElementById(current_slide_id).getAttribute("id");

    $(".slide").removeClass("unit-slide-active");
    $("#"+current_slide_id).addClass("unit-slide-active");

    if(active_subunit_class && subunit_click_ok==1){
        //Bakılıyor bu sub kategori daha önce açılmış mı
        if($(active_subunit_class).attr("opened")!="opened"){
            $(active_subunit_class).click();
        }

        $('.unit-list').animate({
            //scrollTop: $(active_unit_class).offset().top
            scrollTop: '+=62px'
        }, 500);
    } else {
        if(active_unit_class && unit_click_ok==1){
            $("li ul").css("display","none");
            $(".choice-unit").attr("opened","closed");
            $(".choice-unit i").removeClass("fa-chevron-up");
            $(".choice-unit i").addClass("fa-chevron-down");

            //Bakılıyor bu sub kategori daha önce açılmış mı
            if($(active_unit_class).attr("opened")!="opened"){
                $(active_unit_class).click();
            }

            var _scrool_move = parseInt(offsetTopArr[active_unit_class])-($(".unit-list").offset().top);
            $('.unit-list').animate({
                //scrollTop: ($(active_unit_class).offset().top)-($(".unit-list").offset().top)
                scrollTop: _scrool_move
            }, 500);
            no_unit_scrool = 0;
        }
    }

    if(no_unit_scrool == 1){
        $('.unit-list').animate({
            scrollTop: '+=52px'
        }, 500);
    }

}


//Ders prev yapılınca ders ayarlanıyor
function setTreePrevActive(){

    var current_slide_id          = "slide-"+current_slide_number;
    var unit_click_ok             = 1;
    var subunit_click_ok          = 1;
    var no_unit_scrool            = 1;

    if(document.getElementById(current_slide_id).getAttribute("unit-class") == active_unit_class){
        unit_click_ok = 0;
    }

    if(document.getElementById(current_slide_id).getAttribute("sub-unit-class") == active_subunit_class){
        subunit_click_ok = 0;
    }

    //Unite ağacı uygun şekilde açılıyor
    active_unit_class    = document.getElementById(current_slide_id).getAttribute("unit-class");
    active_subunit_class = document.getElementById(current_slide_id).getAttribute("sub-unit-class");
    active_unit_id       = document.getElementById(current_slide_id).getAttribute("id");

    $(".slide").removeClass("unit-slide-active");
    $("#"+current_slide_id).addClass("unit-slide-active");

    if(active_unit_class){
        if(unit_click_ok == 1){
            $("li ul").css("display","none");
            $(".choice-unit").attr("opened","closed");
            $(".choice-unit i").removeClass("fa-chevron-up");
            $(".choice-unit i").addClass("fa-chevron-down");

            $(active_unit_class).click();
        }
        no_unit_scrool = 0;
    }

    if(active_subunit_class){
        if(subunit_click_ok == 1){
            $(active_subunit_class).click();
        }

    }

    $('.unit-list').scrollTo("#"+active_unit_id)
}

// will work when video finished
// swf ya da video dersi bittiği zaman çalışır
function mediaFinished() {
    //İlgli ders izlemesi tamamlandı. Gerekli işlemler yapılıyor
    completedSlide();

    //Eğer Kursun tamamı izlendi ise
    if(current_slide_number == num_of_page){
        //Course tamamlama işlemlerinin yapılacağı fonksiyon çağrılıyor
        courseComplated();
    }

    if(mediaType == "mp4"){
        changeClassName(playPauseBtnAwesome,"fa-play","fa-pause");
    }
}

// Loads a video item into the media player
function loadVideo() {
    for (var i = 0; i < arguments.length; i++) {
        var file = arguments[i].split('.');
        var ext = file[file.length - 1];
        // Check if this media can be played
        if (canPlayVideo(ext)) {
            // Reset the player, change the source file and load it
            resetPlayer();
            mediaPlayer.src = arguments[i];
            mediaPlayer.load();
            break;
        }
    }
}

// Checks if the browser can play this particular type of file or not
function canPlayVideo(ext) {
    var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
    if (ableToPlay == '') return false;
    else return true;
}

// Resets the media player
function resetPlayer() {

    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = 0;

    var durationMinutes = parseInt(mediaPlayer.duration / 60, 10);
    var durationSeconds = mediaPlayer.duration % 60;

    var currentMinutes = 0;
    var currentSeconds = 0;

    // Move the media back to the start
    mediaPlayer.currentTime = 0;

    progressBarAwesome.style.width = percentage+"%";
    mediaTime.innerHTML = currentMinutes + ":" + Math.round(currentSeconds) + " / " + durationMinutes + ":" + Math.round(durationSeconds);

    changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");

}

//Adı gönderilen dosya uzantısı belirleniyor
function setS3FileName(file_name){
    if(mediaType == "swf"){
        //Slide yani swf dosyasi yükleniyor
        s3SwfName    = file_name+".swf";
    } else if(mediaType == "mp4"){
        //Slide yani swf dosyasi yükleniyor
        s3SwfName    = file_name+".mp4";

    }

    return s3SwfName;

}

//Bucket adresi alınıyor
function getS3BucketPath(){
    if(mediaType == "swf"){
        s3BucketPath = json_user_course_data_parsed.swf_bucket_path;
    } else if(mediaType == "mp4"){
        s3BucketPath = json_user_course_data_parsed.mp4_bucket_path;
    }
}

//Alert mesaj veriliyor.
function alertMessage(message,type){
    if(type==1){
        toastr.error(message);
    }
}

//########## Aşağıdaki fonksiyonlara Media player ile alakalı değildir #################

//Self study model - popup açılıyor eğer is_track_mod= 0 / false / ""
function createselfstudyoverlay() {
    $('#selfStudyModal').modal('show');
}


//Course start popup açılıyor dersi baştan mı yoksa kaldığı yerden mi izleyecek belirliyoruz.
function createcoursestartoverlay() {
    $('#courseStartModal').modal('show');
}

//Eğer kullanıcı ders izlemiyi bitirdi ve sınav kısmına geçti ise
function createstartexamoverlay() {
    opencourseentries();
    createexamoverlay();
}

//Login session pasif ediliyor
function opencourseentries() {

    $.ajax({
        url: 'index.php?route=course/course/ajaxOpenCourseEntries',
        type: 'POST',
        data: '',
        async: false,
        success: function (req) {
        }
    });
}

//Exam kısmı açılıyor
function createexamoverlay() {
    $('#examStartModal').modal('show');
}

//Eğer kurs tamamlandı ise
function courseComplated(){

    //Eğer ders self study durumunda değilse
    //Kurs tamamlanınca question modal açılıyor ve
    if(is_track_mode){
        opencourseentries();
        clearTimeout(timer);
        //Değerlendirme popup açıldıktan hemen sonra eğer exam popup açılsın istiyorsam değeri 1 olarak ayarlıyorum
        showExamModel = 1;
        createquestionaireoverlay();
        //createexamoverlay();
    }
}

//Tamamlanmış kursa girilince soru popup açılıyor
function createquestionaireoverlay() {

    //opencourseentries();
    $('#questionaireModal').modal('show');
}

//20 saniyede 1 kez istek atıyoruz.
function starttimer(){
    timer = setInterval(function () {
        updateelapsedtime();
    }, 1000 * 20);
}

//Elepsed time güncelleniyor.
function updateelapsedtime() {
    $.ajax({
        url: 'index.php?route=course/course/ajaxUpdateElapsedTime',
        type: 'POST',
        data: 'courseid=' + course_id,
        success: function (req) {
            if (req.indexOf("successfully_updated_elapsed_time") != -1) {

            } else {
                alertsessiontimeout();
            }
        },
        error: function () {
            alert(json_lang_parsed.warning_check_connection);
        }
    });
}

//Oturumdan çıkılmış
function alertsessiontimeout() {
    alert(json_lang_parsed.error_session_end);
    window.location  = json_user_course_data_parsed.base_path;
}

//Eğer ders izleme tamamlandı ise
function completedSlide(){

    if(current_slide_number>completed_slide && is_track_mode){
        $.ajax({
            url: 'index.php?route=course/course/ajaxCompletedSlide',
            type: 'POST',
            data: 'courseid=' + course_id + '&slide=' + (current_slide_number>0?current_slide_number:1),
            success: function (req) {
                if (req.indexOf("successfully_updated_completed_slide") != -1) {
                    //Siteme izlemiş olduğumuz dersin tamamlandığını bildiriyoruz.
                    completed_slide = current_slide_number;
                    //Course forward progress
                    courseProgress = ((100*parseInt(current_slide_number))/parseInt(num_of_page)).toFixed(0);
                    $(".course-progress-now").css("width",courseProgress+"%");
                    $(".course-progress-now").html(courseProgress+"%");
                    //Eğer self study değilse ve ilk kez izlenmiş ise ağaç üzerinde izleme sayısı değiştiriliyor
                    setTreeWachedNewValue();
                    //Sıradaki ders için ders numarası current numarası blirleniyor
                    current_slide_number++;
                    //Prev next current bilgileri ayalanıyor
                    setPrevCurrentNextSlide(current_slide_number);
                    //Video otomotik oynasın ya da oynamasın
                    autoplay = 0;
                    //Oynatılcak dersin adı alınıyor
                    setS3FileName(current_slide_name);
                    //Ders şuan oynuyor
                    slidePlaying = 0;
                    //Sağ unite ağazı ayarlanıyor
                    setTreeActive();
                    //Ağaç kısmında izlene ders işaretleniyor
                    $("#checbox-"+completed_slide).attr('checked', 'checked');
                    $("#checkmark-"+completed_slide).addClass("checkmark_true");
                    //feedback üzerinde bulunan slide_number güncelleniyor
                    setFeedbackSlideNumber();
                    //Bir sonraki ders oynatılıyor
                    playslide(s3SwfName,s3BucketPath);
                }
                else {
                    alertsessiontimeout();
                }
            },
            error: function () {
                alert(json_lang_parsed.warning_check_connection);
            }
        });
    } else{
        //Sıradaki ders için ders numarası current numarası blirleniyor
        current_slide_number++;
        //Prev next current bilgileri ayalanıyor
        setPrevCurrentNextSlide(current_slide_number);//console.log(current_slide_number+"->"+completed_slide);
        //Video otomotik oynasın ya da oynamasın
        autoplay = 0;
        //Oynatılcak dersin adı alınıyor
        setS3FileName(current_slide_name);
        //Ders şuan oynuyor
        slidePlaying = 0;
        //Menu play icon düzenleniyor
        //changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");console.log("omer");
        //Sağ unite ağazı ayarlanıyor
        setTreeActive();
        //Bir sonraki ders oynatılıyor
        playslide(s3SwfName,s3BucketPath);
    }
    //Ders başarılı bir şekilde bitti.
    _slideFinished = 1;

}

//Ağaç yapısı üzerinde ünitelere ait yeni izleme değerleri düzenleniyor.
function setTreeWachedNewValue(){
    var _watchedValue  = $(active_unit_class +" .slide-information").html().split("/");
    var _watchedStatus = parseInt(_watchedValue[0].trim()) + 1;
    var _watchedRest   = _watchedValue[1];
    //Eğer self study değilse ve ilk kez izlenmiş ise ağaç üzerinde izleme sayısı değiştiriliyor
    //var _watchedStatus = parseInt($(active_unit_class +" .slide-information").html().substring(0, 2).trim()) + 1;
    //var _watchedRest   = $(active_unit_class +" .slide-information").html().substring(2, 10);
    $(active_unit_class +" .slide-information").html(_watchedStatus+" /"+_watchedRest);

    if(active_subunit_class){
        _watchedValue  = $(active_subunit_class +" .slide-information-sub").html().split("/");
        _watchedStatus = parseInt(_watchedValue[0].trim()) + 1;
        _watchedRest   = _watchedValue[1];
        //_watchedStatus = parseInt($(active_subunit_class +" .slide-information-sub").html().substring(0, 2).trim()) + 1;
        //_watchedRest   = $(active_subunit_class +" .slide-information-sub").html().substring(2, 10);
        $(active_subunit_class +" .slide-information-sub").html(_watchedStatus+" /"+_watchedRest);
    }
}

//Soru pop up üzerinde verilen cevaplar database üzerine aktarılıyıor
//Kullanıcı değerlendiriyor
function sendquestionarrie(question1, question2, question3) {
    $.ajax({
        url: 'index.php?route=course/course/ajaxCourseQuestionairre',
        type: 'POST',
        data: 'course_id=' + course_id + '&question1=' + question1 + '&question2=' + question2 + '&question3=' + question3,
        success: function (req) {

            if (exam) {
                createexamoverlay();
            }
            else {
                window.location = "index.php?route=course/course/info&course_id=" + course_id;
            }
        }
    });
}

//Feedback üzerinde slide number değeri güncelleniyor.
function setFeedbackSlideNumber(){
    $('#slide_number').val(current_slide_number);
}

//Pdf açılıyor
function opencoursedocument(document_url) {
    window.open(document_url, 'document', 'width=840,height=630');
}

//Video açılıyor
function opencoursevideo(video_url) {
    window.open(video_url, 'video', 'width=600,height=450');
}

//feedback yazılıyor database üzerine
function sendBugReport (){

    var text = $('#report_text').val();
    var sliderNumber = $('#slide_number').val();

    //Eski ccsleri sil
    $('#sendreport-info').removeClass();

    if(!text || !sliderNumber){
        $('#sendreport-info').addClass('alert alert-warning');
        $('#sendreport-info').html(json_lang_parsed.feeadback_empty_field_message);
    } else{
        $.ajax({
            url: 'index.php?route=course/course/ajaxSendBugReport',
            type: 'POST',
            data: 'courseid=' + course_id + '&slide=' + sliderNumber +'&text='+ text+'&mode='+course_type,
            success: function (req) {

                if (req.indexOf("Success:") != -1){

                    $('#sendreport-info').addClass('alert alert-success');
                    $('#report_text').val('');
                    $('#sendreport-info').html(json_lang_parsed.feeadback_succesfully_message);

                }else
                {
                    $('#sendreport-info').addClass('alert alert-danger');
                    $('#sendreport-info').html(json_lang_parsed.feeadback_error_message);
                }

            }
        });
    }
}

//Model yani popup ekranları kapatılıp ders oynamaya başlayınca  tree durumu açılıyor.
function setTreeAfterModel(value){//value Oynatılacak dersin course_slide_order değerini temsil eder
    //Unite ağacı uygun şekilde açılıyor
    active_unit_class    = $(".unit-slide-active").attr("unit-class");
    active_subunit_class = $(".unit-slide-active").attr("sub-unit-class");
    active_unit_id       = $(".unit-slide-active").attr("id");

    if(active_subunit_class){
        $(active_subunit_class).click();
    }

    $(active_unit_class).click();
    if(value == 1){
        $('.unit-list').animate({
            scrollTop: 0
        }, 500);
    } else{
        $('.unit-list').scrollTo("#"+active_unit_id);
    }

}

//Ağaç yapısı üzerinde ünitelere ait kaç slide izlendi bilgisi ayarlanıyor
function setTreeUnitWatchedStatus(){
    //Sıra ile ünitelere ait  izlenme verileri yazılıyor
    $(".watched-slide-count").each(function() {
        var data_watched      = $(this).attr("data");
        var span_class_name   = $(this).attr("id");

        if(is_track_mode){
            $(span_class_name).html(data_watched);
        } else{
            $(span_class_name).html(data_watched.substring(3, 10)+" Slide");
        }

    });
}

$(document).ready(function() {
    //Açılan model popuplar üzerinden * (close) kaldırıldı
    $(".modal-dialog .close").hide();

    //Browser scroll en üste alınıyor
    $('html, body').animate({
        scrollTop: 0
    }, 1000);

    //Unite Ağacı islemleri
    $(document).on("click",".choice-unit",function() {
        var open           = $(this).attr("opened");
        var sub_list_class = $(this).attr("sub-list-class");
        var i_class        = $(this).attr("i");
        var cover_li_class = $(this).attr("cover-li-class");

        if(open=="opened"){
            $(this).attr("opened","closed");
            $(i_class).removeClass("fa-chevron-up");
            $(i_class).addClass("fa-chevron-down");
            $(sub_list_class).css("display","none");
            $(sub_list_class + " ul").css("display","none");
            $(sub_list_class + " i").removeClass("fa-chevron-up");
            $(sub_list_class + " i").addClass("fa-chevron-down");
        } else{
            //console.log(sub_list_class + " li");
            $(this).attr("opened","opened");
            $(i_class).removeClass("fa-chevron-down");
            $(i_class).addClass("fa-chevron-up");
            $(sub_list_class).css("display","block");

            if($(sub_list_class).attr("layer") >1){
                $(".unit-list-second-ul li").css("background-color","#ffffff");
                $(sub_list_class + " li").css("background-color","#e6f2f5");
            } else{
                $(cover_li_class).css("background-color","#ffffff");
            }
        }
    });

    //Ders tab menu kısmı
    $(document).on("click",".unit-information-title li",function() {
        var index          = $(this).index();
        //console.log(index);

        $(".unit-information-title li").removeClass("unit-information-title-active");
        $(this).addClass("unit-information-title-active");

        $(".unit-information-content li").removeClass("unit-information-content-active");
        $(".unit-information-content li").eq(index).addClass("unit-information-content-active");

        $('html, body').animate({
            scrollTop: $(".media-bottom").offset().top
        }, 400);
    });

    //Model - Poppup işlmleri
    //Serf stady popup üzerinde tıklama yapıldı ise çalışır
    $(document).on("click","#selfStudyModalButtons button",function() {

        //Açılan popup tıklandı 1.tıklandı ise ders oynatılmaya başlanacak 2. tıklandı ise bir önceki sayfaya gidecek
        var clicked = $(this).index();

        if(clicked){
            window.history.back();
        }
        else{
            //Ders autoplay olarak oynasın
            autoplay = 1;
            //Oynatılcak dersin adı alınıyor
            setS3FileName(current_slide_name);
            //Ders şuan oynuyor
            slidePlaying = 1;
            //Video autoplay çalışacağı için mediaplayer menu icon play durumuna getiriliyor
            changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");
            //Ilk slide yükleniyor eğer file tipi swf ise
            if(mediaType == "swf"){
                document.getElementById("player").addEventListener("load", playslide(s3SwfName,s3BucketPath));
            } else{
                //İlk slide yükleniyor eğer video ise
                playslide(s3SwfName,s3BucketPath);
            }

            //Sağ ders kısmı ayarlanıyor
            setTreeAfterModel(current_slide_name);
        }
    });

    //Derslere kalındığı yerden mi yoksa baştan mı devam edecek belirliyoruz.
    $(document).on("click","#courseStartModalButtons button",function() {
        var flashMovie = getFlashMovieObject("player");

        //Açılan popup tıklandı 1.tıklandı ise sıradaki slide dersine geçilecek 2 tıklanırsa 1. dersten başlayacak
        var clicked = $(this).index();

        //Ders autoplay olarak oynasın
        autoplay = 1;
        //Ders şuan oynuyor
        slidePlaying = 1;
        //Video autoplay çalışacağı için mediaplayer menu icon play durumuna getiriliyor
        changeClassName(playPauseBtnAwesome,"fa-pause","fa-play");

        if(clicked){
            //İlk dersin dersin dosya ismi alınıyor
            setS3FileName(first_slide_name);
            //Current Prev ve Next video bilgileri ayarlanıyor
            setPrevCurrentNextSlide(1);
            //feedback üzerinde bulunan slide_number güncelleniyor
            setFeedbackSlideNumber();
            //Ders oynatılmaya başlanıyor
            playslide(s3SwfName,s3BucketPath);

            //İlk slide active ediliyor
            $(".slide").removeClass("unit-slide-active");
            $("#slide-1").addClass("unit-slide-active");

            //Sağ ders kısmı ayarlanıyor
            setTreeAfterModel(1); //1 demek ilk ders slide açılıyor slide numarasını temsil ediyor

        }
        else{
            //Sıradaki dersin dosya ismi alınıyor
            setS3FileName(current_slide_name);
            //Current Prev ve Next video bilgileri ayarlanıyor
            setPrevCurrentNextSlide(current_slide_number);
            //Ders oynatılmaya başlanıyor
            playslide(s3SwfName,s3BucketPath);
            //Sağ ders kısmı ayarlanıyor
            setTreeAfterModel(current_slide_name);

        }
    });

    //Exam kısmına geçecek miyiz geçmeyecek miyiz belirliyoruz.
    $(document).on("click","#examStartModalButtons button",function() {
        var flashMovie = getFlashMovieObject("player");

        //Açılan popup tıklandı 1.tıklandı ise sıradaki tiklama ile exam sayfasına gider 2 tıklanırsa bir önceki sayfaya
        var clicked = $(this).index();

        if(clicked){
            window.history.back();
        } else{
            window.location = exam_url;
        }
    });

    //Course tamamlayan kullanıcı kurs deneyimlerini puanlandırıyor
    $(document).on("click","#questionaireModalButtons button",function() {
        //Açılan popup tıklandı 1.tıklandı ise sıradaki slide dersine geçilecek 2 tıklanırsa 1. dersten başlayacak
        var clicked = $(this).index();
        if(!clicked){

            var question1 = $('input:radio[name=question1]:checked').val();
            var question2 = $('input:radio[name=question2]:checked').val();
            var question3 = $('input:radio[name=question3]:checked').val();
            if (!question1 || !question2 || !question3) {
                alert(json_lang_parsed.warning_questionaire_answer_all);
            }
            else {
                //Cevaplar kayıt ediliyor
                sendquestionarrie(question1, question2, question3);
                //Eğer ders self study durumunda değilse
                //Kurs tamamlanınca question modal açılıyor ve
                if(is_track_mode){
                    //Değerlendirmenin hemen ardından eğer exam popup açılmak isteniyorsa
                    if(showExamModel){
                        createexamoverlay();
                    }
                }
            }
        } else{
            $('#questionaireModal').modal('hide');
        }
    });

});

