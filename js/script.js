imgUploaded = null;
result = null;
rawEle = null;
cenEle = null;
imgSrc = null;

function callbackLoad() {
    console.log('callback after face detection model is loaded!');
}

// callback after prediction
function callbackPredict(err, results) {
    result = results;
    cenEle = document.getElementById('censoredImage');
    if(result['outputs'][0].score > 0.8){
        cenEle.setAttribute('src', imgSrc);
        cenEle.classList.remove("hide");
        x = result["outputs"][0].box.x;
        y = result["outputs"][0].box.y;
        h = result["outputs"][0].box.height;
        w = result["outputs"][0].box.width;
        overlay = document.getElementById('overlay');
        overlay.style.transform="translate("+x+"px,"+y+"px)";
        overlay.classList.remove("hide");
        overlay.style.height = h+'px';
        overlay.style.width = w+'px';
    }else{
        console.log('score not greater than 0.8');
    }
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
    uploadedImage = document.getElementById('uploadImage');
    if (uploadedImage.files && uploadedImage.files[0]) {
        var reader = new FileReader();

        reader.onload = imageIsLoaded;
        reader.readAsDataURL(uploadedImage.files[0]);
        console.log("treached here");
    }else{
        console.log("no files");
    }
    detectFaces();
}
function imageIsLoaded(e) {
    rawEle = document.getElementById('rawImage');
    imgSrc = e.target.result;
    rawEle.setAttribute('src', imgSrc);
    rawEle.classList.remove("hide");
};