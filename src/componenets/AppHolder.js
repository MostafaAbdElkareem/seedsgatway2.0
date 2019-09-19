import React, { Component } from "react";
import Draggable from "react-draggable";
import "../assets/style/AppHolder.scss";
import close from "../assets/images/close.png";

class AppHolder extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {};
  }
  addClass() {
    this.divRef.current.classList.add("minimized");
  }
  removeClass() {
    this.divRef.current.classList.remove("minimized");
  }

  render() {
    let appInfo = this.props.appInfo;

    const comments = appInfo.comments.map(comment => (
      <div className="sep">
        <i className="fa fa-comment"></i>
        {comment.comment}
      </div>
    ));
    //console.log(comments);
    return (
      <React.Fragment>
        <div
          className="md-modal md-effect-19"
          ref={this.divRef}
          id={`modal-${appInfo.id}`}
        >
          <Draggable
            handle=".handle"
            /* defaultPosition={{ x: 100, y: 100 }} */
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
          >
            <div>
              <div className="handle" title="Drag from here"></div>

              <nav className="react-draggable-controls">
                <div
                  className="maximize"
                  onClick={() => {
                    this.removeClass();
                  }}
                >
                  Click to Maxmize
                </div>

                <div
                  className="minimize"
                  onClick={() => {
                    this.addClass();
                  }}
                ></div>
              </nav>

              <section className="react-draggable-content">
                {" "}
                <div className="app-info">
                  <div className="app-logo">
                    <img
                      src={require(`../assets/images/${appInfo.icon}.svg`)}
                      alt=""
                    />
                  </div>
                  <h4>{appInfo.cardName}</h4>
                  <div>
                    <span className="date">Last visit : {appInfo.date}</span>
                    <span className="owner">Owner : {appInfo.owner}</span>
                    <span className="clear"></span>
                  </div>
                  <div>
                    <h5>Actions on this application</h5>
                    <div className="action-container">
                      <button className="btn orange">Start Workflow</button>
                      <button className="btn green">Check Trial</button>
                      <div className="clear"></div>
                    </div>
                  </div>
                  <span className="desc">{appInfo.description}</span>
                  <h5>Comments ({appInfo.commentCounter})</h5>
                  <div className="comments-container">{comments}</div>
                  <div className="form-container">
                    <div>
                      <input
                        placeholder="Type title here"
                        type="text"
                        className="input"
                      />
                    </div>
                    <div>
                      <textarea
                        rows="5"
                        className="txtarea"
                        placeholder="Type title here"
                      ></textarea>
                    </div>
                    <div>
                      <button className="btn">Add Comment</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Draggable>
          <div className="md-content">
            <iframe
              frameBorder="0"
              src={appInfo.cardURL}
              width="100%"
              height="100%"
              sandbox="allow-scripts"
            ></iframe>
            <button className="md-close">
              <img src={close} alt="" />
            </button>
          </div>
        </div>
        <div className="md-overlay"></div>
      </React.Fragment>
    );
  }
}

export default AppHolder;
