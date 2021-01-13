// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Animal from "../harberger-lib/Animal.bs.js";
import * as Moment from "moment";
import * as QlHooks from "../harberger-lib/QlHooks.bs.js";
import * as TokenId from "../harberger-lib/TokenId.bs.js";
import * as CountDown from "../harberger-lib/CountDown.bs.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Announcement from "./Announcement.bs.js";

var linkToAnimal = Curry._1(Css.style, {
      hd: Css.color(Css.white),
      tl: {
        hd: Css.textDecoration(Css.underline),
        tl: {
          hd: Css.selector(":visited", {
                hd: Css.color(Css.hex("ffffff")),
                tl: /* [] */0
              }),
          tl: {
            hd: Css.selector(":hover", {
                  hd: Css.important(Css.color(Css.hex("6CAD3D"))),
                  tl: /* [] */0
                }),
            tl: /* [] */0
          }
        }
      }
    });

function AnimalAnnouncement(Props) {
  var nextReleasedAnimals = Props.nextReleasedAnimals;
  var announcementBannerColor = Props.announcementBannerColor;
  var isLaunched = Animal.nextLaunchDate.diff(Moment(), "seconds") < 0;
  var closeButton = Curry._1(Css.style, {
        hd: Css.position(Css.absolute),
        tl: {
          hd: Css.right(Css.px(10)),
          tl: /* [] */0
        }
      });
  var match = React.useState(function () {
        return "block";
      });
  var setShowAnnouncement = match[1];
  var numberOfAnimalsToLaunch = nextReleasedAnimals.length;
  var isPlural = numberOfAnimalsToLaunch > 1;
  return React.createElement("div", {
              className: Announcement.announcementStyle(match[0], announcementBannerColor)
            }, "New Wildcard" + ((
                isPlural ? "s" : ""
              ) + " "), Belt_Array.mapWithIndex(nextReleasedAnimals, (function (index, animal) {
                    var name = Belt_Option.getWithDefault(QlHooks.useWildcardName(animal), "Loading");
                    return React.createElement("span", {
                                key: TokenId.toString(animal)
                              }, React.createElement("a", {
                                    className: linkToAnimal,
                                    href: "/#details/" + TokenId.toString(animal)
                                  }, name), index === (numberOfAnimalsToLaunch - 1 | 0) ? " " : (
                                  index === (numberOfAnimalsToLaunch - 2 | 0) ? " and " : ", "
                                ));
                  })), isLaunched ? (
                isPlural ? "have" : "has"
              ) + " just been launched!" : React.createElement(React.Fragment, undefined, "coming in ", React.createElement(CountDown.make, {
                        endDateMoment: Animal.nextLaunchDate,
                        displayUnits: true
                      }), "!"), React.createElement("span", {
                  className: closeButton,
                  onClick: (function (param) {
                      return Curry._1(setShowAnnouncement, (function (param) {
                                    return "none";
                                  }));
                    })
                }, "×"));
}

var make = AnimalAnnouncement;

export {
  linkToAnimal ,
  make ,
  
}
/* linkToAnimal Not a pure module */
