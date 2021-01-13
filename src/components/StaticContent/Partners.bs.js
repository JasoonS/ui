// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as CssJs from "bs-css-emotion/src/CssJs.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Styles from "../../Styles.bs.js";
import * as CONSTANTS from "../../CONSTANTS.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as RootProvider from "../../harberger-lib/RootProvider.bs.js";
import * as Css_Legacy_Core from "bs-css/src/Css_Legacy_Core.bs.js";
import * as ApolloClient__React_Hooks_UseQuery from "reason-apollo-client/src/@apollo/client/react/hooks/ApolloClient__React_Hooks_UseQuery.bs.js";

var ubisoftLogo = "/img/logos/Ubisoft.png";

var ethCapeTownLogo = "/img/logos/EthCapeTown.png";

var cvLabsLogo = "/img/logos/cvlabszug.jpg";

var kernelLogo = "/img/logos/kernel.gif";

var Raw = {};

var query = (require("@apollo/client").gql`
  query ActivePartners  {
    organisations(where: {onboarding_status: {_in: [live, signed, listed]}})  {
      __typename
      logo
      id
      name
    }
  }
`);

function parse(value) {
  var value$1 = value.organisations;
  return {
          organisations: value$1.map(function (value) {
                return {
                        __typename: value.__typename,
                        logo: value.logo,
                        id: value.id,
                        name: value.name
                      };
              })
        };
}

function serialize(value) {
  var value$1 = value.organisations;
  var organisations = value$1.map(function (value) {
        var value$1 = value.name;
        var value$2 = value.id;
        var value$3 = value.logo;
        var value$4 = value.__typename;
        return {
                __typename: value$4,
                logo: value$3,
                id: value$2,
                name: value$1
              };
      });
  return {
          organisations: organisations
        };
}

function serializeVariables(param) {
  
}

function makeVariables(param) {
  
}

function makeDefaultVariables(param) {
  
}

var LoadPatronNoDecode_inner = {
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables
};

var include = ApolloClient__React_Hooks_UseQuery.Extend({
      query: query,
      Raw: Raw,
      parse: parse,
      serialize: serialize,
      serializeVariables: serializeVariables
    });

var use = include.use;

var LoadPatronNoDecode_refetchQueryDescription = include.refetchQueryDescription;

var LoadPatronNoDecode_useLazy = include.useLazy;

var LoadPatronNoDecode_useLazyWithVariables = include.useLazyWithVariables;

var LoadPatronNoDecode = {
  LoadPatronNoDecode_inner: LoadPatronNoDecode_inner,
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables,
  refetchQueryDescription: LoadPatronNoDecode_refetchQueryDescription,
  use: use,
  useLazy: LoadPatronNoDecode_useLazy,
  useLazyWithVariables: LoadPatronNoDecode_useLazyWithVariables
};

function usePartners(param) {
  var match = Curry.app(use, [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]);
  var match$1 = match.data;
  if (match.loading || match.error !== undefined || match$1 === undefined) {
    return ;
  } else {
    return Belt_Array.map(match$1.organisations, (function (org) {
                  return {
                          logo: org.logo,
                          id: org.id,
                          name: org.name
                        };
                }));
  }
}

var blueBackground = CssJs.style([CssJs.backgroundColor({
            NAME: "hex",
            VAL: "73C8D7"
          })]);

var cardStyle = CssJs.style([
      CssJs.height({
            NAME: "percent",
            VAL: 100
          }),
      CssJs.display("flex"),
      CssJs.important(CssJs.padding({
                NAME: "percent",
                VAL: 0
              }))
    ]);

var logoStyle = CssJs.style([
      CssJs.margin({
            NAME: "percent",
            VAL: 10
          }),
      CssJs.width({
            NAME: "percent",
            VAL: 80
          })
    ]);

var corporatePartnerTextStyle = CssJs.style([
      CssJs.textAlign("center"),
      CssJs.marginBottom({
            NAME: "percent",
            VAL: 10
          })
    ]);

function Partners$OrgDetails(Props) {
  var conservation = Props.conservation;
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  var id = conservation.id;
  return React.createElement(RimbleUi.Card, {
              className: cardStyle,
              children: React.createElement("a", {
                    className: Curry._1(Css.style, {
                          hd: Css.display("flex"),
                          tl: {
                            hd: Css.width({
                                  NAME: "percent",
                                  VAL: 100
                                }),
                            tl: {
                              hd: Css.height({
                                    NAME: "percent",
                                    VAL: 100
                                  }),
                              tl: /* [] */0
                            }
                          }
                        }),
                    onClick: (function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return Curry._1(clearAndPush, "#org/" + id);
                      })
                  }, React.createElement("img", {
                        className: Curry._1(Css.style, {
                              hd: Css.margin({
                                    NAME: "percent",
                                    VAL: 1
                                  }),
                              tl: {
                                hd: Css.objectFit("contain"),
                                tl: {
                                  hd: Css.width({
                                        NAME: "percent",
                                        VAL: 98
                                      }),
                                  tl: {
                                    hd: Css.justifyContent("center"),
                                    tl: {
                                      hd: Css.alignItems("center"),
                                      tl: {
                                        hd: Css.hover({
                                              hd: Css.filter({
                                                    hd: {
                                                      NAME: "saturate",
                                                      VAL: 150
                                                    },
                                                    tl: {
                                                      hd: {
                                                        NAME: "brightness",
                                                        VAL: 110
                                                      },
                                                      tl: /* [] */0
                                                    }
                                                  }),
                                              tl: {
                                                hd: Css.overflow(Css.visible),
                                                tl: {
                                                  hd: Css.boxShadow(Css_Legacy_Core.Shadow.box(undefined, undefined, Css.px(20), Css.px(20), undefined, Css.rgba(121, 181, 80, {
                                                                NAME: "num",
                                                                VAL: 0.5
                                                              }))),
                                                  tl: {
                                                    hd: Css.transform(Css.scale(1.01, 1.01)),
                                                    tl: {
                                                      hd: Css.transition(100, 0, Css.ease, "all"),
                                                      tl: /* [] */0
                                                    }
                                                  }
                                                }
                                              }
                                            }),
                                        tl: /* [] */0
                                      }
                                    }
                                  }
                                }
                              }
                            }),
                        alt: conservation.name,
                        src: CONSTANTS.cdnBase + conservation.logo
                      }))
            });
}

var OrgDetails = {
  make: Partners$OrgDetails
};

function Partners(Props) {
  var newConservationPartners = usePartners(undefined);
  var orgBox = function (content, key) {
    return React.createElement(RimbleUi.Box, {
                mb: 20,
                mt: 20,
                children: content,
                width: [
                  0.45,
                  0.45,
                  0.18
                ],
                color: "black",
                key: key
              });
  };
  return React.createElement("div", {
              width: "100%"
            }, React.createElement(RimbleUi.Flex, {
                  children: React.createElement("h1", undefined, "Conservation Partners"),
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pt: 50,
                  className: blueBackground
                }), React.createElement(RimbleUi.Flex, {
                  children: newConservationPartners !== undefined ? React.createElement(React.Fragment, undefined, Belt_Array.map(newConservationPartners, (function (conservation) {
                                return orgBox(React.createElement(Partners$OrgDetails, {
                                                conservation: conservation
                                              }), conservation.id);
                              })), orgBox(null, "a"), orgBox(null, "b"), orgBox(null, "c"), orgBox(null, "d")) : null,
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pb: 50,
                  className: blueBackground
                }), React.createElement("div", {
                  className: Styles.infoBackground
                }, React.createElement(RimbleUi.Flex, {
                      children: React.createElement("h1", {
                            className: CssJs.style([CssJs.unsafe("text-shadow", "0.25em 0.25em 0.5em #FFFFFF, -0.25em -0.25em 0.5em #FFFFFF, -0.25em 0.25em 0.5em #FFFFFF, 0.25em -0.25em 0.5em #FFFFFF;")])
                          }, "Corporate partners"),
                      flexWrap: "wrap",
                      alignItems: "stretch",
                      justifyContent: "space-around",
                      px: 50,
                      pt: 50
                    }), React.createElement(RimbleUi.Flex, {
                      children: null,
                      flexWrap: "wrap",
                      alignItems: "stretch",
                      justifyContent: "space-around",
                      px: 50
                    }, React.createElement(RimbleUi.Box, {
                          mb: 70,
                          mt: 70,
                          children: React.createElement(RimbleUi.Card, {
                                className: cardStyle,
                                children: React.createElement("a", {
                                      href: "https://www.ubisoft.com/en-us/company/start-ups/station-f.aspx"
                                    }, React.createElement("img", {
                                          className: logoStyle,
                                          alt: "ubisoft",
                                          src: ubisoftLogo
                                        }), React.createElement(RimbleUi.Text, {
                                          children: "Ubisoft's Entrepreneurs Lab, Season 4, participants",
                                          className: corporatePartnerTextStyle
                                        }))
                              }),
                          width: [
                            1,
                            1,
                            0.2
                          ],
                          color: "black"
                        }), React.createElement(RimbleUi.Box, {
                          mb: 70,
                          mt: 70,
                          children: React.createElement(RimbleUi.Card, {
                                className: cardStyle,
                                children: React.createElement("a", {
                                      href: "https://ethcapetown.com/"
                                    }, React.createElement("img", {
                                          className: logoStyle,
                                          alt: "eth-cape-town",
                                          src: ethCapeTownLogo
                                        }), React.createElement(RimbleUi.Text, {
                                          children: "Overall winners of EthCapeTown hackathon",
                                          className: corporatePartnerTextStyle
                                        }))
                              }),
                          width: [
                            1,
                            1,
                            0.2
                          ],
                          color: "black"
                        }), React.createElement(RimbleUi.Box, {
                          mb: 70,
                          mt: 70,
                          children: React.createElement(RimbleUi.Card, {
                                className: cardStyle,
                                children: React.createElement("a", {
                                      href: "https://cvvc.com/index.php"
                                    }, React.createElement("img", {
                                          className: logoStyle,
                                          alt: "cv-labs",
                                          src: cvLabsLogo
                                        }), React.createElement(RimbleUi.Text, {
                                          children: "CV Labs Incubator Program, Batch 2",
                                          className: corporatePartnerTextStyle
                                        }))
                              }),
                          width: [
                            1,
                            1,
                            0.2
                          ],
                          color: "black"
                        }), React.createElement(RimbleUi.Box, {
                          mb: 70,
                          mt: 70,
                          children: React.createElement(RimbleUi.Card, {
                                className: cardStyle,
                                children: React.createElement("a", {
                                      href: "https://kernel.community/"
                                    }, React.createElement("img", {
                                          className: logoStyle,
                                          alt: "Kernel Gitcoin",
                                          src: kernelLogo
                                        }), React.createElement(RimbleUi.Text, {
                                          children: "Gitcoin Kernel genesis block participants",
                                          className: corporatePartnerTextStyle
                                        }))
                              }),
                          width: [
                            1,
                            1,
                            0.2
                          ],
                          color: "black"
                        }))));
}

var make = Partners;

export {
  ubisoftLogo ,
  ethCapeTownLogo ,
  cvLabsLogo ,
  kernelLogo ,
  LoadPatronNoDecode ,
  usePartners ,
  blueBackground ,
  cardStyle ,
  logoStyle ,
  corporatePartnerTextStyle ,
  OrgDetails ,
  make ,
  
}
/* query Not a pure module */
