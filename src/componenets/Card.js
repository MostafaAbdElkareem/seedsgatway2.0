import React, { Component } from "react";
import classie from "../assets/scripts/classie";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var overlay = document.querySelector(".md-overlay");

    [].slice
      .call(document.querySelectorAll(".md-trigger"))
      .forEach(function(el, i) {
        var modal = document.querySelector("#" + el.getAttribute("data-modal")),
          close = modal.querySelector(".md-close");

        function removeModal(hasPerspective) {
          classie.remove(modal, "md-show");

          if (hasPerspective) {
            classie.remove(document.documentElement, "md-perspective");
          }
        }

        function removeModalHandler() {
          removeModal(classie.has(el, "md-setperspective"));
        }

        el.addEventListener("click", function(ev) {
          classie.add(modal, "md-show");
          overlay.removeEventListener("click", removeModalHandler);
          overlay.addEventListener("click", removeModalHandler);

          if (classie.has(el, "md-setperspective")) {
            setTimeout(function() {
              classie.add(document.documentElement, "md-perspective");
            }, 25);
          }
        });

        close.addEventListener("click", function(ev) {
          ev.stopPropagation();
          removeModalHandler();
        });
      });
  }
  categoryChange(id) {
    this.props.category(id);
  }
  render() {
    let thisCard = this.props.cardinfo;

    return (
      <div className={`cardStyle ${thisCard.appCategory} card`}>
        <div className="wrapper">
          <img
            src={require(`../assets/images/${thisCard.icon}.svg`)}
            alt=""
            className="app-img"
          />
          <div className="date">
            <span className="day">last visit :{thisCard.date}</span>
          </div>
          <div className="data">
            <div className="content">
              <h1 className="title">
                <a>{thisCard.cardName}</a>
              </h1>{" "}
              <span className="author">{thisCard.appCategory}</span>
            </div>

            <ul className="menu-content container">
              <li>
                <a
                  className="fa fa-link md-trigger"
                  data-modal={`modal-${thisCard.id}`}
                ></a>
              </li>
              <li>
                {" "}
                <a
                  className="fa fa-plus to-panel"
                  onClick={() => this.categoryChange(thisCard.id)}
                ></a>
                <a
                  className="fa fa-trash to-page"
                  onClick={() => this.categoryChange(thisCard.id)}
                ></a>
                <a className="fa fa-info to-category"></a>
              </li>
              <li>
                <a className="fa fa-comment">
                  <span>{thisCard.commentCounter}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
