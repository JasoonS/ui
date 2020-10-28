// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Moment from "moment";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Animal$WildCards from "../harberger-lib/Animal.bs.js";
import * as Globals$WildCards from "../harberger-lib/Globals.bs.js";
import * as QlHooks$WildCards from "../harberger-lib/QlHooks.bs.js";
import * as TokenId$WildCards from "../harberger-lib/TokenId.bs.js";
import * as CountDown$WildCards from "../harberger-lib/CountDown.bs.js";

function AnimalAnnouncement(Props) {
  var nextReleasedAnimals = Props.nextReleasedAnimals;
  var announcementBannerColor = Props.announcementBannerColor;
  var announcement = function (displayVal) {
    return Curry._1(Css.style, /* :: */[
                Css.display(displayVal),
                /* :: */[
                  Css.position(Css.relative),
                  /* :: */[
                    Css.padding2(Css.rem(0.4), Css.rem(1)),
                    /* :: */[
                      Css.color(Css.white),
                      /* :: */[
                        Css.backgroundColor(Css.hex(announcementBannerColor)),
                        /* :: */[
                          Css.textAlign(/* center */98248149),
                          /* :: */[
                            Css.zIndex(2),
                            /* :: */[
                              Css.fontSize(Css.px(18)),
                              /* :: */[
                                Css.textTransform(Css.uppercase),
                                /* :: */[
                                  Css.letterSpacing(Css.px(2)),
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]);
  };
  var linkToAnimal = Curry._1(Css.style, /* :: */[
        Css.color(Css.white),
        /* :: */[
          Css.textDecoration(Css.underline),
          /* :: */[
            Css.selector(":visited", /* :: */[
                  Css.color(Css.hex("ffffff")),
                  /* [] */0
                ]),
            /* :: */[
              Css.selector(":hover", /* :: */[
                    Css.important(Css.color(Css.hex("6CAD3D"))),
                    /* [] */0
                  ]),
              /* [] */0
            ]
          ]
        ]
      ]);
  var isLaunched = Animal$WildCards.nextLaunchDate.diff(Moment(), "seconds") < 0;
  var closeButton = Curry._1(Css.style, /* :: */[
        Css.position(Css.absolute),
        /* :: */[
          Css.right(Css.px(10)),
          /* [] */0
        ]
      ]);
  var match = React.useState((function () {
          return /* block */888960333;
        }));
  var setShowAnnouncement = match[1];
  var numberOfAnimalsToLaunch = nextReleasedAnimals.length;
  var isPlural = numberOfAnimalsToLaunch > 1;
  return React.createElement("div", {
              className: announcement(match[0])
            }, Globals$WildCards.restr("New Wildcard" + ((
                    isPlural ? "s" : ""
                  ) + " ")), Belt_Array.mapWithIndex(nextReleasedAnimals, (function (index, animal) {
                    var name = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.useWildcardName(animal), "Loading");
                    return React.createElement("span", {
                                key: TokenId$WildCards.toString(animal)
                              }, React.createElement("a", {
                                    className: linkToAnimal,
                                    href: "/#details/" + TokenId$WildCards.toString(animal)
                                  }, Globals$WildCards.restr(name)), Globals$WildCards.restr(index === (numberOfAnimalsToLaunch - 1 | 0) ? " " : (
                                      index === (numberOfAnimalsToLaunch - 2 | 0) ? " and " : ", "
                                    )));
                  })), isLaunched ? Globals$WildCards.restr((
                    isPlural ? "have" : "has"
                  ) + " just been launched!") : React.createElement(React.Fragment, undefined, Globals$WildCards.restr("coming in "), React.createElement(CountDown$WildCards.make, {
                        endDateMoment: Animal$WildCards.nextLaunchDate,
                        displayUnits: true
                      }), Globals$WildCards.restr("!")), React.createElement("span", {
                  className: closeButton,
                  onClick: (function (param) {
                      return Curry._1(setShowAnnouncement, (function (param) {
                                    return /* none */-922086728;
                                  }));
                    })
                }, Globals$WildCards.restr("×")));
}

var make = AnimalAnnouncement;

export {
  make ,
  
}
/* Css Not a pure module */