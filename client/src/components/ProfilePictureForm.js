import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile,
} from "../reusable/ReusableUtils";
import { Button } from "semantic-ui-react";
import { postActions } from "../actions/postActions";
import { connect } from "react-redux";
import { alertActions } from "../actions/alertActions";
const AWS = require('aws-sdk');
const uuid = require('uuid')

const imageMaxSize = 10000000; // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});

const initialState = {
  description: "",
  imgSrc: null,
  imgSrcExt: null,
  imageUploadEndpoint: "",
  crop: {
    aspect: 1,
  },
};







const ID = 'AKIARMNPZ3AYQATX3XOI';
const SECRET = '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';

const BUCKET_NAME = 'redsocialviajes';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = async (fileName, uuidName) => {
  console.log(fileName);
  const params = {
      Bucket: BUCKET_NAME,
      Key: uuidName,
      ACL: "public-read",
      Body: fileName,
      ContentType: 'image/png',
  };
  
  try{
    await s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      //console.log(data)
     // console.log(data.key + ' successfully uploaded to' + data.Location);
      return data
    }
  });
  }catch(err){
    console.log(err)
    return "Error"
  }
};


class ProfilePictureForm extends PureComponent {
  imagePreviewCanvasRef = React.createRef();
  fileInputRef = React.createRef();
  state = initialState;

  handleChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleOnCropChange = (crop) => {
    console.log(this.state)
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc2 } = this.state;
    console.log(this.state)
    image64toCanvasRef(canvasRef, imgSrc2, pixelCrop);
    this.setState({ cropped: true });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const myFilename = "previewFile." + imgSrcExt;
      // file to be uploaded
      /*const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      const fd = new FormData();
      fd.append("photo", myNewCroppedFile, myNewCroppedFile.name);*/

      //fd.append("description", this.state.description);
      const { dispatch } = this.props;
      console.log(imgSrc)
      dispatch(postActions.addProfiePicture(imgSrc));
      this.setState(initialState);
    }
  };

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      const { dispatch } = this.props;
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        dispatch(
          alertActions.error(
            "This file is not allowed. Only images are allowed."
          )
        );

        return false;
      }

      if (currentFileSize > imageMaxSize) {
        dispatch(
          alertActions.error(
            "This file is not allowed. " +
              currentFileSize +
              " bytes is too large"
          )
        );
        return false;
      }
      return true;
    }
  };

  handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
       // console.log(currentFile)
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            const uuidName = "perfil"+uuid()+".png";
            uploadFile(currentFile,uuidName);
            // console.log(myFileItemReader.result)
            //console.log(
            const urlImg = "https://redsocialviajes.s3.amazonaws.com/"+uuidName;
            console.log(urlImg)
            const myResult = myFileItemReader.result;
            this.setState({
             imgSrc: urlImg,
             imgSrc2: myResult
             // imgSrcExt: extractImageFileExtensionFromBase64(myResult),
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  render() {
    const { imgSrc,imgSrc2, cropped } = this.state;
    console.log(this.state)
    return (
      <div>
        {imgSrc !== null ? (
          <div>
            <div style={{ marginBottom: "1%" }}>
              <label className="ui icon button fluid">
                <i className="file icon " />
                Cambiar imagen
                <input
                  style={{ display: "none" }}
                  ref={this.fileInputRef}
                  type="file"
                  accept={acceptedFileTypes}
                  multiple={false}
                  onChange={this.handleFileSelect}
                />
              </label>
            </div>

            <ReactCrop
              src={imgSrc2}
              crop={this.state.crop}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
            />
            {imgSrc !== null ? (
              <Button primary fluid onClick={this.handleUpload}>
                Subir imagen
              </Button>
            ) : null}

            <canvas
              style={{ display: "none" }}
              ref={this.imagePreviewCanvasRef}
            />
          </div>
        ) : (
          <div>
            <label className="ui icon button fluid">
              <i className="file icon" />
              Seleccionar imagen
              <input
                style={{ display: "none" }}
                ref={this.fileInputRef}
                type="file"
                accept={acceptedFileTypes}
                multiple={false}
                onChange={this.handleFileSelect}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(ProfilePictureForm);
