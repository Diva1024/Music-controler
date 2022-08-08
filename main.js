var song1="";
var song2="";
var leftwristX=0;
var leftwristY=0;
var rightwristX=0;
var rightwristY=0;
var song1_status="";
var song2_status="";
var score_rightwrist=0;
var score_leftwrist=0;
function preload(){
song1=loadSound("ATTENTION.mp3");
song2=loadSound("L2R.mp3");

}

function setup(){
    canvas=createCanvas(500,500);
    canvas.position(530,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotPoses);
    }
    function draw(){
    image(video,0,0,500,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#4247db");
    stroke("#05050a");
    if(score_rightwrist>0.2){
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
        }
    }
    if(score_leftwrist>0.2){
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
        }
    }
    }
    function play(){
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
    
    }
    function stop(){
        song1.stop();
    }
    function modelloaded(){
        console.log("poseNet is initialized" );
    
    }
    function gotPoses(results){
    if (results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwrist x = "+ leftwristX);
        console.log("leftwrist y = "+ leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwrist x = "+ rightwristX);
        console.log("rightwrist y = "+ rightwristY);
        score_rightwrist=results[0].pose.keypoints[10].score;
        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_rightwrist = "+ score_rightwrist+ "score_leftwrist = "+ score_leftwrist);
    }
    }