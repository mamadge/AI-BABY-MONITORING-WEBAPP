ad="";
status1="";
objects = [];

function preload()
{
    ad = loadSound('mixkit-classic-alarm-995.wav');
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function draw()
{
    image(video, 0, 0, 380, 380);
    if(status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        /*objectDetector.detect(video, gotresults)*/
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML="status: detecting objects";
            document.getElementById("found").innerHTML  = "Person found" + objects.length;
            ad.play();
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    else{
        document.getElementById("found").innerHTML  = "Person is lost" + objects.length;
        ad.pause();
    }
}
function modelloaded()
{
    console.log("modelloaded");
    status1=true;
    od.detect(video, gotresults);
    document.getElementById("status").innerHTML="status: detecting objects";
    console.log(od);
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function start()
{
    od = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function play(){

}