imgUploaded = null;
rawEle = null;;
cenEle = null;

function callbackLoad() {
    console.log('callback after face detection model is loaded!');
}

// callback after prediction
function callbackPredict(err, results) {
    console.log(results);

    // draw output keypoints in the image
    //model.draw(document.getElementById('myCanvas'), document.getElementById('image'), results);
}

async function detectFaces(){
    await stackml.init({'accessKeyId': '15e4d1331af8253eaa30c13b65ba7252'});
    // load face detection model
    const model = await stackml.faceDetection(callbackLoad);

    // make prediction with the image
    console.log(rawEle);
    model.detect(rawEle, callbackPredict);
}

function uploadImage(){
    if (document.getElementById('uploadImage').files && document.getElementById('uploadImage').files[0]) {
        var reader = new FileReader();

        reader.onload = imageIsLoaded;
        reader.readAsDataURL(document.getElementById('uploadImage').files[0]);
        console.log("treached here");
    }else{
        console.log("no files");
    }
    detectFaces();
}
function imageIsLoaded(e) {
    rawEle = document.getElementById('rawImage');
    rawEle.setAttribute('src', e.target.result);
    rawEle.classList.remove("hide");
};