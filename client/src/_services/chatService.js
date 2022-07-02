export const chatService = {
  getChatRooms,
  getMessagesForRoom,
  sendMessage,
  sendImage,
  readMessages,
  call,
  answer
};
const urlapi = "http://localhost:5000/socialtravelapp-e6988/us-central1/app";

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getChatRooms() {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    }
  };

  return fetch(urlapi+"/api/chat/getChatRooms/", requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log(res)
      return res;
    });
}

function readMessages(params) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...params
    })
  };

  return fetch(urlapi+"/api/chat/readMessages/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getMessagesForRoom(room) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...room
    })
  };

  return fetch(urlapi+"/api/chat/getMessagesForRoom/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function sendMessage(params) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...params
    })
  };

  return fetch(urlapi+"/api/chat/sendMessage/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function sendImage(data) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: data
  };

  return fetch(urlapi+"/api/chat/sendImage/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function call(data) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...data
    })
  };

  return fetch(urlapi+"/api/chat/call/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function answer(data) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...data
    })
  };

  return fetch(urlapi+"/api/chat/answer/", requestOptions)
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
