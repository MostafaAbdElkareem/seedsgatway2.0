import React, { Component } from "react";
import Card from "./componenets/Card";
import AppHolder from "./componenets/AppHolder";
import Header from "./componenets/Header";
import cardsData from "./data/cardData.json";
import "./App.scss";

export default class DraggableCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let status = cardsData.filter(st => {
      if (st.id == id) {
        st.category = cat;
      }
      return st;
    });
    this.setState({
      ...cardsData,
      status
    });
  };

  render() {
    var status = {
      wip: [],
      complete: []
    };
    /* app holder  */
    const Apps = cardsData.map(appInfo => (
      <AppHolder appInfo={appInfo}></AppHolder>
    ));
    /*  */
    let searchedCards = cardsData.filter(_card => {
      console.log(this.state.search);
      console.log(cardsData);
      return (
        _card.cardName.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.description.toLowerCase().indexOf(this.state.search) !== -1
      );
    });
    /*  */
    searchedCards.forEach(card => {
      status[card.category].push(
        <React.Fragment>
          <div className="grid__item">
            <div
              key={card.id}
              onDragStart={e => this.onDragStart(e, card.id)}
              draggable
              className="draggable "
            >
              <Card cardinfo={card}></Card>
            </div>
          </div>
        </React.Fragment>
      );
    });

    return (
      <main>
        <Header></Header>
        {Apps}
        <div className="container-drag color-change-2x">
          <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <span class="fa fa-plus frame-link "></span>

              <ul id="menu">
                <div className="search-wrapper active">
                  <div className="input-holder">
                    <input
                      type="text"
                      value={(this, this.state.search)}
                      className="search-input"
                      placeholder="Type to search Apps"
                      onChange={this.updateSearch.bind(this)}
                    />
                  </div>
                </div>
                <div
                  className="wip grid"
                  onDragOver={e => this.onDragOver(e)}
                  onDrop={e => {
                    this.onDrop(e, "wip");
                  }}
                >
                  {status.wip}
                </div>
              </ul>
            </div>
          </nav>

          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "complete")}
          >
            <h3 className="page-title">My Bookmarks</h3>
            <div className="grid">{status.complete}</div>
          </div>
        </div>{" "}
      </main>
    );
  }
}
