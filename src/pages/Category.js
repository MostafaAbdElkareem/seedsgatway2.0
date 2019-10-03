import React, { Component } from "react";
import Card from "../componenets/Card";
import AppHolder from "../componenets/AppHolder";
import cardsData from "../data/cardData.json";
import SimpleStorage from "react-simple-storage";
import OpenedApps from "../componenets/OpenedApps";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      appCards: cardsData
    };
  }

  render() {
    var status = {
      wip: [],
      complete: []
    };

    const Apps = this.state.appCards.map(appInfo => (
      <AppHolder appInfo={appInfo}></AppHolder>
    ));
    /*  */
    let searchedCards = this.state.appCards.filter(_card => {
      return (
        _card.cardName.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.description.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.appCategory.toLowerCase().indexOf(this.state.search) !== -1
      );
    });
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };

    const cardsByCategory = groupBy(searchedCards, "appCategory");

    Object.keys(cardsByCategory).map(function(catKey) {
      let groupTitle = (
        <div className="group-title">
          <h2>{catKey}</h2>
        </div>
      );
      status["complete"].push(groupTitle);
      cardsByCategory[catKey].forEach(card => {
        if ((card.appCategory = catKey)) {
          status[card.category].push(
            <React.Fragment>
              <div className="grid__item">
                <div key={card.id}>
                  <Card cardinfo={card}></Card>
                </div>
              </div>
            </React.Fragment>
          );
        }
      });
    });
    return (
      <main>
        <SimpleStorage parent={this} />
        {Apps}
        <div className="container-drag color-change-2x">
          <nav role="navigation"></nav>

          <div className="droppable by-category">
            <h3 className="page-title">Apps Grouped by Category</h3>
            <div className="grid">{status.complete}</div>
          </div>
        </div>{" "}
        <OpenedApps></OpenedApps>
      </main>
    );
  }
}
