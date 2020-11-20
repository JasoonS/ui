// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import BnJs from "bn.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Js_option from "bs-platform/lib/es6/js_option.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Helper$WildCards from "../../harberger-lib/Helper.bs.js";
import * as QlHooks$WildCards from "../../harberger-lib/QlHooks.bs.js";
import * as RootProvider$WildCards from "../../harberger-lib/RootProvider.bs.js";
import * as UserProvider$WildCards from "../../harberger-lib/js/user-provider/UserProvider.bs.js";
import * as ApolloHooks$ReasonApolloHooks from "@wildcards/reason-apollo-hooks/src/ApolloHooks.bs.js";

var ppx_printed_query = "query   {\npatrons(first: 20, orderBy: totalTimeHeld, orderDirection: desc, where: {id_not: \"NO_OWNER\"})  {\nid  \ntotalTimeHeld  \ntokens  {\nid  \n}\n\nlastUpdated  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "patrons");
  return {
          patrons: value$2 !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(value$2))).map(function (value) {
                  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                  var value$2 = Js_dict.get(value$1, "id");
                  var tmp;
                  if (value$2 !== undefined) {
                    var value$3 = Caml_option.valFromOption(value$2);
                    var value$4 = Js_json.decodeString(value$3);
                    tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                  } else {
                    tmp = Js_exn.raiseError("graphql_ppx: Field id on type Patron is missing");
                  }
                  var value$5 = Js_dict.get(value$1, "totalTimeHeld");
                  var value$6 = Js_dict.get(value$1, "tokens");
                  var value$7 = Js_dict.get(value$1, "lastUpdated");
                  return {
                          id: tmp,
                          totalTimeHeld: value$5 !== undefined ? QlHooks$WildCards.decodeBN(Caml_option.valFromOption(value$5)) : Js_exn.raiseError("graphql_ppx: Field totalTimeHeld on type Patron is missing"),
                          tokens: value$6 !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(value$6))).map(function (value) {
                                  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                                  var value$2 = Js_dict.get(value$1, "id");
                                  var tmp;
                                  if (value$2 !== undefined) {
                                    var value$3 = Caml_option.valFromOption(value$2);
                                    var value$4 = Js_json.decodeString(value$3);
                                    tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                                  } else {
                                    tmp = Js_exn.raiseError("graphql_ppx: Field id on type Wildcard is missing");
                                  }
                                  return {
                                          id: tmp
                                        };
                                }) : Js_exn.raiseError("graphql_ppx: Field tokens on type Patron is missing"),
                          lastUpdated: value$7 !== undefined ? QlHooks$WildCards.decodeBN(Caml_option.valFromOption(value$7)) : Js_exn.raiseError("graphql_ppx: Field lastUpdated on type Patron is missing")
                        };
                }) : Js_exn.raiseError("graphql_ppx: Field patrons on type query_root is missing")
        };
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeVariables(param) {
  return null;
}

function definition_2(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition = [
  parse,
  ppx_printed_query,
  definition_2
];

function ret_type(f) {
  return {};
}

var MT_Ret = {};

var LoadMostDaysHeld = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

function useLoadMostDaysHeld(param) {
  return ApolloHooks$ReasonApolloHooks.useSubscription(undefined, undefined, undefined, definition);
}

function useLoadMostDaysHeldData(param) {
  var match = useLoadMostDaysHeld(undefined);
  var simple = match[0];
  var currentTimestamp = QlHooks$WildCards.useCurrentTime(undefined);
  if (typeof simple === "number") {
    return ;
  }
  if (simple.TAG) {
    return ;
  }
  var dailyContributions = simple._0.patrons.map(function (patron) {
        var numberOfTokens = String(patron.tokens.length);
        var timeElapsed = new BnJs(currentTimestamp).sub(patron.lastUpdated);
        var totalTimeHeldWei = patron.totalTimeHeld.add(timeElapsed.mul(new BnJs(numberOfTokens)));
        return [
                patron.id,
                totalTimeHeldWei
              ];
      });
  $$Array.sort((function (param, param$1) {
          return param$1[1].cmp(param[1]);
        }), dailyContributions);
  return dailyContributions;
}

var goldTrophyImg = "/img/icons/gold-trophy.png";

var silverTrophyImg = "/img/icons/silver-trophy.png";

var bronzeTrophyImg = "/img/icons/bronze-trophy.png";

var leaderboardTable = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.tableLayout("fixed"),
        tl: {
          hd: Css.overflowWrap("breakWord"),
          tl: /* [] */0
        }
      }
    });

var leaderboardHeader = Curry._1(Css.style, {
      hd: Css.backgroundColor({
            NAME: "hex",
            VAL: "73c7d7ff"
          }),
      tl: /* [] */0
    });

var streakTextLeaderboard = Curry._1(Css.style, {
      hd: Css.position(Css.absolute),
      tl: {
        hd: Css.zIndex(100),
        tl: {
          hd: Css.bottom({
                NAME: "percent",
                VAL: -10
              }),
          tl: {
            hd: Css.right({
                  NAME: "percent",
                  VAL: 50
                }),
            tl: {
              hd: Css.transform(Css.translateX({
                        NAME: "px",
                        VAL: -5
                      })),
              tl: /* [] */0
            }
          }
        }
      }
    });

var flameImgLeaderboard = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.maxWidth(Css.px(50)),
        tl: /* [] */0
      }
    });

var rankText = Curry._1(Css.style, {
      hd: Css.position(Css.absolute),
      tl: {
        hd: Css.zIndex(100),
        tl: {
          hd: Css.bottom({
                NAME: "percent",
                VAL: -10
              }),
          tl: {
            hd: Css.right({
                  NAME: "percent",
                  VAL: 50
                }),
            tl: {
              hd: Css.transform(Css.translate({
                        NAME: "px",
                        VAL: -4
                      }, {
                        NAME: "px",
                        VAL: -15
                      })),
              tl: /* [] */0
            }
          }
        }
      }
    });

var trophyImg = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.width(Css.px(50)),
        tl: {
          hd: Css.height(Css.px(50)),
          tl: /* [] */0
        }
      }
    });

var centerFlame = Curry._1(Css.style, {
      hd: Css.display(Css.block),
      tl: {
        hd: Css.margin(Css.auto),
        tl: {
          hd: Css.width({
                NAME: "px",
                VAL: 70
              }),
          tl: {
            hd: Css.position(Css.relative),
            tl: /* [] */0
          }
        }
      }
    });

var rankMetric = Curry._1(Css.style, {
      hd: Css.fontSize({
            NAME: "px",
            VAL: 16
          }),
      tl: /* [] */0
    });

function rankingColor(index) {
  return Curry._1(Css.style, {
              hd: Css.backgroundColor({
                    NAME: "hex",
                    VAL: index % 2 === 1 ? "b5b5bd22" : "ffffffff"
                  }),
              tl: /* [] */0
            });
}

function TotalDaysHeld$ContributorsRow(Props) {
  var contributor = Props.contributor;
  var amount = Props.amount;
  var index = Props.index;
  Curry._2(UserProvider$WildCards.useUserInfoContext(undefined).update, contributor, false);
  var optThreeBoxData = UserProvider$WildCards.use3BoxUserData(contributor);
  var optUserName = Belt_Option.flatMap(Belt_Option.flatMap(optThreeBoxData, (function (threeBoxData) {
              return threeBoxData.profile;
            })), (function (threeBoxData) {
          return threeBoxData.name;
        }));
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  return React.createElement("tr", {
              key: contributor,
              className: rankingColor(index)
            }, React.createElement("td", undefined, React.createElement("span", {
                      className: centerFlame
                    }, index === 0 ? React.createElement("img", {
                            className: trophyImg,
                            src: goldTrophyImg
                          }) : (
                        index === 1 ? React.createElement("img", {
                                className: trophyImg,
                                src: silverTrophyImg
                              }) : (
                            index === 2 ? React.createElement("img", {
                                    className: trophyImg,
                                    src: bronzeTrophyImg
                                  }) : React.createElement("div", {
                                    className: trophyImg
                                  })
                          )
                      ), React.createElement("p", {
                          className: rankText
                        }, React.createElement("strong", undefined, "#", String(index + 1 | 0))))), React.createElement("td", undefined, React.createElement("a", {
                      onClick: (function (e) {
                          e.preventDefault();
                          return Curry._1(clearAndPush, "/#user/" + contributor);
                        })
                    }, optUserName !== undefined ? React.createElement("span", undefined, optUserName) : React.createElement("span", undefined, Helper$WildCards.elipsify(contributor, 20)))), React.createElement("td", {
                  className: rankMetric
                }, amount + " Days"));
}

var ContributorsRow = {
  make: TotalDaysHeld$ContributorsRow
};

function TotalDaysHeld$MostDaysHeld(Props) {
  var mostDaysHeld = Props.mostDaysHeld;
  return $$Array.mapi((function (index, param) {
                return React.createElement(TotalDaysHeld$ContributorsRow, {
                            contributor: param[0],
                            amount: param[1].div(new BnJs("86400")).toString(),
                            index: index
                          });
              }), mostDaysHeld);
}

var MostDaysHeld = {
  make: TotalDaysHeld$MostDaysHeld
};

function TotalDaysHeld(Props) {
  var numberOfLeaders = Props.numberOfLeaders;
  var mostDaysHeldOpt = useLoadMostDaysHeldData(undefined);
  var tmp;
  if (mostDaysHeldOpt !== undefined) {
    var mostDaysHeld = Belt_Array.slice(mostDaysHeldOpt, 0, numberOfLeaders);
    tmp = React.createElement(TotalDaysHeld$MostDaysHeld, {
          mostDaysHeld: mostDaysHeld
        });
  } else {
    tmp = null;
  }
  return React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
                  children: "Wildcards Accumulative Days Held Leaderboard"
                }), React.createElement("br", undefined), React.createElement(RimbleUi.Table, {
                  children: null,
                  className: leaderboardTable
                }, React.createElement("thead", {
                      className: leaderboardHeader
                    }, React.createElement("tr", undefined, React.createElement("th", undefined, "Rank"), React.createElement("th", undefined, "Guardian"), React.createElement("th", undefined, "Accumulative Days Held"))), React.createElement("tbody", undefined, tmp)));
}

var flameImg = "/img/streak-flame.png";

var make$1 = TotalDaysHeld;

export {
  LoadMostDaysHeld ,
  useLoadMostDaysHeld ,
  useLoadMostDaysHeldData ,
  flameImg ,
  goldTrophyImg ,
  silverTrophyImg ,
  bronzeTrophyImg ,
  leaderboardTable ,
  leaderboardHeader ,
  streakTextLeaderboard ,
  flameImgLeaderboard ,
  rankText ,
  trophyImg ,
  centerFlame ,
  rankMetric ,
  rankingColor ,
  ContributorsRow ,
  MostDaysHeld ,
  make$1 as make,
  
}
/* leaderboardTable Not a pure module */
