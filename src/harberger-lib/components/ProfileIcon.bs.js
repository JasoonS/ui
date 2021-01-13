// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Blockie from "../bindings/ethereum-blockies-base64/Blockie.bs.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as CONSTANTS from "../../CONSTANTS.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as RootProvider from "../RootProvider.bs.js";
import * as UserProvider from "../js/user-provider/UserProvider.bs.js";

function ProfileIcon(Props) {
  var clickActionOpt = Props.clickAction;
  var isMobileOpt = Props.isMobile;
  var clickAction = clickActionOpt !== undefined ? clickActionOpt : (function (param) {
        
      });
  var isMobile = isMobileOpt !== undefined ? isMobileOpt : false;
  var currentUser = RootProvider.useCurrentUser(undefined);
  var networkIdOpt = RootProvider.useNetworkId(undefined);
  var displayName = UserProvider.useDisplayName(Belt_Option.mapWithDefault(currentUser, "loading", (function (a) {
              return a;
            })));
  var displayNameStr = UserProvider.displayNameToString(displayName);
  var userAddressLowerCase = currentUser !== undefined ? currentUser.toLowerCase() : CONSTANTS.nullEthAddress;
  var optThreeBoxData = UserProvider.use3BoxUserData(userAddressLowerCase);
  var optProfile = Belt_Option.flatMap(optThreeBoxData, (function (a) {
          return a.profile;
        }));
  var profileImage = Belt_Option.mapWithDefault(Belt_Option.flatMap(Belt_Option.map(Belt_Option.flatMap(Belt_Option.flatMap(optProfile, (function (a) {
                          return a.image;
                        })), (function (img) {
                      return Belt_Array.get(img, 0);
                    })), (function (a) {
                  return a.contentUrl;
                })), (function (content) {
              return Js_dict.get(content, "/");
            })), Blockie.makeBlockie(userAddressLowerCase), (function (hash) {
          return "https://ipfs.infura.io/ipfs/" + hash;
        }));
  var message = networkIdOpt !== undefined ? (
      currentUser !== undefined ? displayNameStr : "Loading user"
    ) : "Connect to network";
  var profileIcon = React.createElement("img", {
        className: Curry._1(Css.style, {
              hd: Css.borderRadius({
                    NAME: "percent",
                    VAL: 50
                  }),
              tl: {
                hd: Css.width({
                      NAME: "px",
                      VAL: 40
                    }),
                tl: {
                  hd: Css.height({
                        NAME: "px",
                        VAL: 40
                      }),
                  tl: {
                    hd: Css.marginLeft({
                          NAME: "px",
                          VAL: 10
                        }),
                    tl: /* [] */0
                  }
                }
              }
            }),
        src: profileImage
      });
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  if (networkIdOpt !== undefined) {
    if (isMobile) {
      return React.createElement("div", {
                  className: Curry._1(Css.style, {
                        hd: Css.display("flex"),
                        tl: {
                          hd: Css.flexDirection("row"),
                          tl: /* [] */0
                        }
                      }),
                  onClick: (function (param) {
                      Curry._1(clickAction, undefined);
                      return Curry._1(clearAndPush, "#user/" + userAddressLowerCase);
                    })
                }, React.createElement("div", undefined, React.createElement("p", undefined, React.createElement("strong", undefined, "View Your Profile:")), React.createElement("p", undefined, message)), profileIcon);
    } else {
      return React.createElement(RimbleUi.Tooltip, {
                  message: message,
                  placement: "bottom",
                  children: React.createElement("div", {
                        onClick: (function (param) {
                            Curry._1(clickAction, undefined);
                            return Curry._1(clearAndPush, "#user/" + userAddressLowerCase);
                          })
                      }, profileIcon)
                });
    }
  } else {
    return null;
  }
}

var make = ProfileIcon;

export {
  make ,
  
}
/* Css Not a pure module */
