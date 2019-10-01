import React, { Component } from "react";
import Card from "./componenets/Card";
import AppHolder from "./componenets/AppHolder";
import Header from "./componenets/Header";
import cardsData from "./data/cardData.json";
import "./App.scss";
import "../src/assets/style/themes.scss";

export default class DraggableCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      appCards: cardsData
    };
  }
  updateSearch(event) {
    console.log(event.target.value);
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
    let status = this.state.appCards.filter(st => {
      if (st.id == id) {
        st.category = cat;
      }
      return st;
    });
    this.setState({
      ...this.state.appCards,
      status
    });
    console.log(this.state.appCards);
  };
  ChangeCat(id) {
    if (this.state.appCards[id].category == "complete") {
      this.setState(state => ((state.appCards[id].category = "wip"), state));
    } else {
      this.setState(
        state => ((state.appCards[id].category = "complete"), state)
      );
    }
  }
  render() {
    var status = {
      wip: [],
      complete: []
    };
    // console.log(this.state);
    /* app holder  */
    const Apps = this.state.appCards.map(appInfo => (
      <AppHolder appInfo={appInfo}></AppHolder>
    ));
    /*  */
    let searchedCards = this.state.appCards.filter(_card => {
      //console.log(this.state.search);
      //console.log(cardsData);
      return (
        _card.cardName.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.description.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.appCategory.toLowerCase().indexOf(this.state.search) !== -1
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
              <Card
                cardinfo={card}
                category={() => this.ChangeCat(card.id)}
              ></Card>
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
                      name="focus"
                      required
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
            <h3 className="page-title">
              My Shortcuts{" "}
              <span class="note">
                | Start adding shortcuts to your homepage by clicking the plus
                (+) icon on the top right
              </span>
              <div className="filter">
                <select
                  className="filter-dropDown"
                  onChange={this.updateSearch.bind(this)}
                >
                  <option value="">Filter By Category</option>
                  <option value="cat-01">Cat-01</option>
                  <option value="cat-02">Cat-02</option>
                  <option value="cat-03">Cat-03</option>
                  <option value="cat-04">Cat-04</option>
                </select>
              </div>
            </h3>
            <div className="grid">{status.complete}</div>
          </div>
        </div>{" "}
      </main>
    );
  }
}
