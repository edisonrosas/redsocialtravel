const fs = require('fs');
const AWS = require('aws-sdk');
const uuid = require('uuid')
export const postService = {
  fetchPosts,
  getPostsByHashtag,
  getPostsByLocation,
  addPost,
  addProfiePicture,
  deletePost,
  likePost,
  getPostLikes,
  getPost,
  logout
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function fetchPosts(queryParams) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ ...queryParams })
  };

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/post/getPosts", requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log(response.data);
      return response.data;
    });
}

function getPostLikes(postId) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ postId })
  };

  return fetch("/api/post/getPostLikes/", requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function getPostsByHashtag(hashtag, queryParams) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ hashtag, ...queryParams })
  };

  return fetch("/api/post/getPostsByHashtag/", requestOptions)
    .then(handleResponse)
    .then(response => {
      return response.data;
    });
}

function getPostsByLocation(coordinates, queryParams) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ coordinates, ...queryParams })
  };

  return fetch("/api/post/getPostsByLocation/", requestOptions)
    .then(handleResponse)
    .then(response => {
      return response.data;
    });
}

function deletePost(postId) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ postId })
  };

  return fetch("/api/post/delete/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function addPost(postData) {
/*
  const datapost = {
    description: postData.get("description"),
    tags: postData.get("tags"),
    coordinates: postData.get("coordinates"),
    locationName: postData.get("locationName"),
  };*/
 // const fd = new FormData();
  //console.log(this.state.value)
  //console.log(myNewCroppedFile)
  //console.log(JSON.stringify(divs))
  

/*
  fd.append("image", postData.get("photo"));

  const requestOptions1 = {
    mode: "cors",
    method: "POST",
    body: fd
  };

  fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/uploadfile", fd)*/


 /* console.log( JSON.stringify( postData))
  console.log( JSON.stringify({ postData }))

  console.log(postData.get("photo"))
  console.log(postData.get("description"))*/
  //console.log(postData.get("photo"))
  const uuidName = "post"+uuid()+".png";
  const data = uploadFile(postData.get("photo"),uuidName);
  //console.log(data)

  const jsondata = JSON.stringify({
    "photo": "https://redsocialviajes.s3.amazonaws.com/"+uuidName,
    "description": postData.get("description"),
    "tags": postData.get("tags"),
    "coordinates": postData.get("coordinates"),
    "locationName": postData.get("locationName"),
  });

  //datapost.photo = postData.get("photo");
  //console.log(JSON.stringify(datapost));
  
 // console.log(JSON.parse(postData))
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      "Content-Type": "application/json",
    },
    body: jsondata
  };

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/post/addPost/", requestOptions)
  .then((response) => response.json())
    .catch(
      error => {
        //console.log("error")
       // console.error('Error:', error)
       return JSON.parse(JSON.stringify({
        estado: "Error",
        message: "Error de conexión" }));
      }
    ).then((res) => {
      //console.log(res)
      return res.post;
    });

 /* .then(handleResponse)
    .then(response => {
      console.log(response.post);
      return response.post;
    });*/
}



const ID = 'AKIARMNPZ3AYQATX3XOI';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'redsocialviajes';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});/*
const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "redsocialviajes",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});*/

const uploadFile = async (fileName, uuidName) => {
  // Read content from the file
  console.log(fileName);
  //console.log(fileName.buffer);
  //console.log(fileName.mimetype);

 // console.log(filename.fileName);
  //console.log(filename.fileType);
 // console.log(filename.folder);
  //const fileContent = fs.readFileSync(fileName);

  const params = {
      Bucket: BUCKET_NAME,
      Key: uuidName,
      ACL: "public-read",
      Body: fileName,
      ContentType: 'image/png',
  };
  
  // Uploading files to the bucket
  try{
    await s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      //showModal('Failed to upload', 'Network Error. Please contact admin.');
    } else {
      console.log(data.key + ' successfully uploaded to' + data.Location);
      return data
      //showModal('Upload Success!', data.key + ' successfully uploaded!');
    }
  });
    
/*
  const {location} = data
  console.log(location)*/
  }catch(err){
    console.log(err)
    return "Error"
  }
};

function addProfiePicture(postData) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: postData
  };

  return fetch("/api/user/addProfiePicture/", requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

function likePost(postId, authorId) {
  const requestOptions = {
    mode : "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ postId, authorId })
  };

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/post/likePost/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getPost(postId) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({ postId })
  };

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/post/getPost/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log(response);
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
