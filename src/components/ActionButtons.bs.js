// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as QlHooks$WildCards from "../harberger-lib/QlHooks.bs.js";
import * as TokenId$WildCards from "../harberger-lib/TokenId.bs.js";
import * as InputHelp$WildCards from "../harberger-lib/InputHelp.bs.js";
import * as RootProvider$WildCards from "../harberger-lib/RootProvider.bs.js";

function ActionButtons$Buy(Props) {
  var chain = Props.chain;
  var animal = Props.animal;
  var isExplorerOpt = Props.isExplorer;
  var isExplorer = isExplorerOpt !== undefined ? isExplorerOpt : false;
  var currentPriceWei = QlHooks$WildCards.usePrice(chain, animal);
  var goToBuy = RootProvider$WildCards.useGoToBuy(undefined);
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  var buttonText;
  buttonText = typeof currentPriceWei === "number" ? "loading" : (
      currentPriceWei.TAG ? "Buy" : "Adopt"
    );
  return React.createElement(React.Fragment, {
              children: React.createElement(RimbleUi.Button, {
                    children: buttonText,
                    onClick: (function (_e) {
                        Curry._1(clearAndPush, "#" + (InputHelp$WildCards.getPagePrefix(isExplorer) + ("details/" + TokenId$WildCards.toString(animal))));
                        return Curry._1(goToBuy, animal);
                      })
                  })
            });
}

var Buy = {
  make: ActionButtons$Buy
};

function ActionButtons$Auction(Props) {
  var animal = Props.animal;
  var isExplorerOpt = Props.isExplorer;
  var isExplorer = isExplorerOpt !== undefined ? isExplorerOpt : false;
  var goToBuy = RootProvider$WildCards.useGoToBuy(undefined);
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  return React.createElement(React.Fragment, {
              children: React.createElement(RimbleUi.Button, {
                    children: "Auction",
                    onClick: (function (_e) {
                        Curry._1(clearAndPush, "#" + (InputHelp$WildCards.getPagePrefix(isExplorer) + ("details/" + TokenId$WildCards.toString(animal))));
                        return Curry._1(goToBuy, animal);
                      })
                  })
            });
}

var Auction = {
  make: ActionButtons$Auction
};

function ActionButtons$UpdateDeposit(Props) {
  var goToDepositUpdate = RootProvider$WildCards.useGoToDepositUpdate(undefined);
  return React.createElement(React.Fragment, {
              children: React.createElement(RimbleUi.Button, {
                    children: "Deposit",
                    onClick: (function (_e) {
                        return Curry._1(goToDepositUpdate, undefined);
                      })
                  })
            });
}

var UpdateDeposit = {
  make: ActionButtons$UpdateDeposit
};

function ActionButtons$UpdatePrice(Props) {
  var animal = Props.animal;
  var goToPriceUpdate = RootProvider$WildCards.useGoToPriceUpdate(undefined);
  return React.createElement(React.Fragment, {
              children: React.createElement(RimbleUi.Box, {
                    p: 1,
                    children: React.createElement(RimbleUi.Button, {
                          children: "Price",
                          onClick: (function (_e) {
                              return Curry._1(goToPriceUpdate, animal);
                            })
                        })
                  })
            });
}

var UpdatePrice = {
  make: ActionButtons$UpdatePrice
};

export {
  Buy ,
  Auction ,
  UpdateDeposit ,
  UpdatePrice ,
  
}
/* react Not a pure module */
