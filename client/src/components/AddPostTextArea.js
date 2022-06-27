import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { postActions } from "../actions/postActions";
import { base64StringtoFile } from "../reusable/ReusableUtils";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import { debounce } from "throttle-debounce";

function searchUser(q) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ q })
  };

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/user/searchByUsername", requestOptions).then((response) => response.json())
  .catch(
    error => {
      console.log("error")
     // console.error('Error:', error)
     return JSON.parse(JSON.stringify({
      estado: "Error",
      message: "Error de conexión" }));
    }
  ).then((res) => {
    console.log(res)
    return res;
  });
}

class AddPostTextArea extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      part: "",
      suggestions: []
    };

    this.debouncedRequestOptions = debounce(500, this.handleRequestOptions);
  }

  handleChange = value => {
    this.setState({ value });
  };

  handleSubmit = () => {
    const { dispatch, imgSrcExt, cropImgSrc, location, divs } = this.props;
    const imageData64 = cropImgSrc;
    const myFilename = "image." + imgSrcExt;
    const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
    const fd = new FormData();
    //console.log(this.state.value)
    //console.log(myNewCroppedFile)
    //console.log(JSON.stringify(divs))
    console.log(myNewCroppedFile)
    console.log(myNewCroppedFile.name)
    fd.append("photo", myNewCroppedFile);
    fd.append("description", this.state.value);
    fd.append("tags", JSON.stringify(divs));


    Object.keys(location).forEach(key => fd.append(key, location[key]));

    const fd2 = new FormData();
    fd2.append("image", myNewCroppedFile, myNewCroppedFile.name);
    //const valorfd = JSON.parse(JSON.stringify(fd))
    //console.log(JSON.stringify(fd));
    /*for (let obj of fd) {
      console.log(obj);
    }*/
    console.log(fd.get("photo"))
    //console.log(fd.get("description"))
  
    dispatch(postActions.addPost(fd));

  };

  // text in input is "I want @ap"
  handleRequestOptions = part => {
    this.setState({ part });
    // console.log(part); // -> "ap", which is part after trigger "@"
    if (part !== "") {
      searchUser(part).then(response => {
        if (part === this.state.part) {
          response.json().then(results => {
            this.setState({
              isLoading: false,
              suggestions: results.users.map(user => user.username)
            });
          });
        } else {
          // Ignore suggestions if input value changed
          this.setState({
            isLoading: false
          });
        }
      });
    }
  };

  render() {
    const { value, suggestions } = this.state;
    return (
      <Fragment>
        <Form size="big" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Describa el viaje, lugar y actividades</label>
            <TextInput
              maxOptions={8}
              offsetY={20}
              minChars={1}
              value={value}
              onRequestOptions={this.debouncedRequestOptions}
              options={suggestions}
              onChange={this.handleChange}
              placeholder="Descripcion"
              type="textarea"
              name="description"
              style={{ minHeight: 100, maxHeight: 100 }}
            />
          </Form.Field>

          <Button primary fluid size="big">
            Subir
          </Button>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { imgSrcExt, cropImgSrc, location, divs } = state.postUpload;
  return {
    imgSrcExt,
    cropImgSrc,
    location,
    divs
  };
};

const connectedAddPostTextArea = connect(mapStateToProps)(AddPostTextArea);
export { connectedAddPostTextArea as AddPostTextArea };
