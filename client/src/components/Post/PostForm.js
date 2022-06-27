import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { commentActions } from "../../actions/commentActions";
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

  return fetch("http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/user/searchByUsername", requestOptions).then(res => {
    return res;
  });
}

class PostForm extends Component {
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

  handleRequestOptions = part => {
    this.setState({ part });

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

  handlePostCommentSubmit = () => {
    const {
      dispatch,
      post: { postId, authorId }
    } = this.props;
    const { value } = this.state;
    if (value !== "") {
      dispatch(commentActions.addComment({ value, postId, authorId }));
      this.setState({ value: "" });
    }
  };

  render() {
    const { value, suggestions } = this.state;
    return (
      <Form reply onSubmit={this.handlePostCommentSubmit}>
        <TextInput
          maxOptions={8}
          offsetY={20}
          minChars={1}
          value={value}
          onRequestOptions={this.debouncedRequestOptions}
          options={suggestions}
          onChange={this.handleChange}
          type="textarea"
          name="commentText"
          style={{ minHeight: 70, maxHeight: 70, marginBottom: "1%" }}
        />
        <Button
          content="Añadir comentario"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}

export default connect(null)(PostForm);
