import React, { Component } from "react";

class NotFoundPage extends Component {
  componentDidMount = () => {
    document.title = "Pagina no encontrada | Travel Go";
  };

  render() {
    return (
      <div className="container">
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "900",
            color: "#262626"
          }}
        >
          Pagina no encontrada
        </div>
      </div>
    );
  }
}

export { NotFoundPage as default };
