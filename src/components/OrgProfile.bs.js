// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Cn from "re-classnames/src/Cn.bs.js";
import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Decco from "decco/src/Decco.bs.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Belt_Result from "bs-platform/lib/es6/belt_Result.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Eth$WildCards from "../harberger-lib/Eth.bs.js";
import * as Animal$WildCards from "../harberger-lib/Animal.bs.js";
import * as Styles$WildCards from "../Styles.bs.js";
import * as Globals$WildCards from "../harberger-lib/Globals.bs.js";
import * as QlHooks$WildCards from "../harberger-lib/QlHooks.bs.js";
import * as TokenId$WildCards from "../harberger-lib/TokenId.bs.js";
import ReactPhotoGallery from "react-photo-gallery";
import * as UserProfile$WildCards from "./UserProfile.bs.js";
import ReactResponsiveCarousel from "react-responsive-carousel";
import * as UsdPriceProvider$WildCards from "../harberger-lib/components/UsdPriceProvider.bs.js";
import YoutubeVideoJs from "./StaticContent//YoutubeVideo.js";

function orgDescriptionArray_decode(v) {
  return Decco.arrayFromJson(Decco.stringFromJson, v);
}

var make = YoutubeVideoJs;

var YoutubeVid = {
  make: make
};

function OrgProfile$ComingSoonAnimal(Props) {
  var image = Props.image;
  var onClick = Props.onClick;
  return React.createElement("div", {
              className: Curry._1(Css.style, {
                    hd: Css.width({
                          NAME: "percent",
                          VAL: 32
                        }),
                    tl: /* [] */0
                  })
            }, React.createElement("img", {
                  className: Curry._1(Css.style, {
                        hd: Css.width({
                              NAME: "percent",
                              VAL: 100
                            }),
                        tl: /* [] */0
                      }),
                  src: image,
                  onClick: (function (_e) {
                      return Curry._1(onClick, undefined);
                    })
                }));
}

var ComingSoonAnimal = {
  make: OrgProfile$ComingSoonAnimal
};

function OrgProfile$ImageCarousel(Props) {
  var orgComingSoon = Props.orgComingSoon;
  var selectedIndex = Props.selectedIndex;
  return React.createElement(ReactResponsiveCarousel, {
              children: Belt_Array.mapWithIndex(orgComingSoon, (function (key, animal) {
                      return Belt_Option.mapWithDefault(Belt_Array.get(animal.real_wc_photos, 0), null, (function (photos) {
                                    return React.createElement("img", {
                                                key: String(key),
                                                src: Animal$WildCards.cdnBase + photos.image
                                              });
                                  }));
                    })),
              showArrows: true,
              showStatus: true,
              showIndicators: true,
              infiniteLoop: true,
              showThumbs: false,
              useKeyboardArrows: true,
              autoPlay: true,
              stopOnHover: true,
              swipeable: true,
              dynamicHeight: true,
              emulateTouch: true,
              selectedItem: selectedIndex
            });
}

var ImageCarousel = {
  make: OrgProfile$ImageCarousel
};

function OrgProfile$ComingSoonModal(Props) {
  var selectedComingSoonAnimal = Props.selectedComingSoonAnimal;
  var setSelectedComingSoonAnimal = Props.setSelectedComingSoonAnimal;
  var orgComingSoon = Props.orgComingSoon;
  var match = React.useState(function () {
        
      });
  var setOpenImage = match[1];
  var openImage = match[0];
  var tmp;
  if (selectedComingSoonAnimal !== undefined) {
    if (openImage !== undefined) {
      tmp = React.createElement(OrgProfile$ImageCarousel, {
            orgComingSoon: orgComingSoon,
            selectedIndex: openImage
          });
    } else {
      var animal = orgComingSoon[selectedComingSoonAnimal];
      tmp = React.createElement("div", undefined, React.createElement("h3", {
                className: Curry._1(Css.style, {
                      hd: Css.textAlign(Css.center),
                      tl: /* [] */0
                    })
              }, Belt_Option.getWithDefault(animal.name, "Unamed") + Belt_Option.mapWithDefault(animal.commonName, "", (function (commonName) {
                      return " - " + commonName;
                    }))), React.createElement(RimbleUi.Flex, {
                children: null,
                flexWrap: "wrap",
                alignItems: "start",
                alignContent: "space-arround"
              }, React.createElement(RimbleUi.Box, {
                    children: React.createElement("div", {
                          className: Curry._1(Css.style, {
                                hd: Css.maxHeight({
                                      NAME: "em",
                                      VAL: 26
                                    }),
                                tl: {
                                  hd: Css.overflow("scroll"),
                                  tl: /* [] */0
                                }
                              })
                        }, Belt_Array.mapWithIndex(Belt_Result.getWithDefault(QlHooks$WildCards.animalDescription_decode(animal.description), []), (function (i, paragraphText) {
                                return React.createElement("p", {
                                            key: String(i)
                                          }, paragraphText);
                              }))),
                    width: [
                      1,
                      1,
                      0.49
                    ],
                    className: Curry._1(Css.style, {
                          hd: Css.textAlign("center"),
                          tl: {
                            hd: Css.alignSelf(Css.center),
                            tl: {
                              hd: Css.padding(Css.em(0.5)),
                              tl: /* [] */0
                            }
                          }
                        })
                  }), React.createElement(RimbleUi.Box, {
                    children: React.createElement("div", {
                          className: Curry._1(Css.style, {
                                hd: Css.maxHeight({
                                      NAME: "vh",
                                      VAL: 80
                                    }),
                                tl: /* [] */0
                              })
                        }, React.createElement(ReactPhotoGallery, {
                              photos: Belt_Array.map(animal.real_wc_photos, (function (photo) {
                                      return {
                                              src: Animal$WildCards.cdnBase + photo.image,
                                              width: 4,
                                              height: 3
                                            };
                                    })),
                              targetRowHeight: 30,
                              onClick: (function (param, photoData) {
                                  return Curry._1(setOpenImage, (function (param) {
                                                return photoData.index;
                                              }));
                                })
                            })),
                    width: [
                      1,
                      1,
                      0.45
                    ],
                    className: Curry._1(Css.style, {
                          hd: Css.textAlign("center"),
                          tl: {
                            hd: Css.alignSelf(Css.center),
                            tl: {
                              hd: Css.padding(Css.em(2)),
                              tl: /* [] */0
                            }
                          }
                        })
                  })));
    }
  } else {
    tmp = null;
  }
  return React.createElement(RimbleUi.Modal, {
              isOpen: Belt_Option.isSome(selectedComingSoonAnimal),
              children: React.createElement(RimbleUi.Card, {
                    width: {
                      TAG: /* AnyStr */0,
                      _0: "80vw"
                    },
                    p: 0,
                    children: null
                  }, React.createElement(RimbleUi.Button.Text, {
                        onClick: (function (param) {
                            if (openImage !== undefined) {
                              return Curry._1(setOpenImage, (function (param) {
                                            
                                          }));
                            } else {
                              return Curry._1(setSelectedComingSoonAnimal, (function (param) {
                                            
                                          }));
                            }
                          }),
                        icononly: true,
                        icon: "Close",
                        color: "moon-gray",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        m: 1
                      }), React.createElement(RimbleUi.Box, {
                        p: 1,
                        mb: 1,
                        children: tmp
                      }))
            });
}

var ComingSoonModal = {
  make: OrgProfile$ComingSoonModal
};

function OrgProfile$OrgPage(Props) {
  var orgData = Props.orgData;
  var orgId = Props.orgId;
  var orgName = orgData.name;
  var v = orgData.description;
  var orgDescription = Decco.arrayFromJson(Decco.stringFromJson, v);
  var orgAnimals = orgData.wildcard;
  var orgComingSoon = orgData.unlaunched;
  var match = React.useState(function () {
        
      });
  var setSelectedComingSoonAnimal = match[1];
  var orgAnimalsArray = Belt_Array.map(orgAnimals, (function (animal) {
          return animal.id;
        }));
  var currentUsdEthPrice = UsdPriceProvider$WildCards.useUsdPrice(undefined);
  var totalCollected = QlHooks$WildCards.useTotalRaisedAnimalGroup(orgAnimalsArray);
  var match$1 = Globals$WildCards.mapd(totalCollected, [
        "Loading",
        "Loading"
      ], (function (a) {
          return [
                  Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Globals$WildCards.$pipe$pipe$pipe$pipe(Belt_Float.fromString(Eth$WildCards.get(a, {
                                    TAG: /* Eth */0,
                                    _0: "ether"
                                  })), 0.0), 9),
                  Globals$WildCards.mapd(currentUsdEthPrice, "Loading", (function (usdEthRate) {
                          return Eth$WildCards.get(a, {
                                      TAG: /* Usd */1,
                                      _0: usdEthRate,
                                      _1: 2
                                    });
                        }))
                ];
        }));
  var orgWebsite = orgData.website;
  var optOrgYoutubeVid = orgData.youtube_vid;
  var orgImage = Animal$WildCards.useGetOrgImage(orgId);
  var tmp;
  tmp = orgDescription.TAG ? React.createElement("p", undefined, Globals$WildCards.restr("error loading description")) : Belt_Array.mapWithIndex(orgDescription._0, (function (i, paragraphText) {
            return React.createElement("p", {
                        key: String(i)
                      }, paragraphText);
          }));
  return React.createElement("div", undefined, React.createElement(OrgProfile$ComingSoonModal, {
                  selectedComingSoonAnimal: match[0],
                  setSelectedComingSoonAnimal: setSelectedComingSoonAnimal,
                  orgComingSoon: orgComingSoon
                }), React.createElement("div", {
                  className: Curry._1(Css.style, {
                        hd: Css.width({
                              NAME: "percent",
                              VAL: 100
                            }),
                        tl: /* [] */0
                      })
                }, React.createElement(RimbleUi.Flex, {
                      children: null,
                      flexWrap: "wrap",
                      alignItems: "start",
                      alignContent: "space-arround"
                    }, React.createElement(RimbleUi.Box, {
                          children: null,
                          width: [
                            1,
                            1,
                            0.3333
                          ],
                          className: Curry._1(Css.style, {
                                hd: Css.textAlign("center"),
                                tl: {
                                  hd: Css.alignSelf(Css.center),
                                  tl: {
                                    hd: Css.padding(Css.em(2)),
                                    tl: /* [] */0
                                  }
                                }
                              })
                        }, React.createElement("a", {
                              className: Cn.make({
                                    hd: Styles$WildCards.navListText,
                                    tl: {
                                      hd: Curry._1(Css.style, {
                                            hd: Css.fontSize(Css.em(3)),
                                            tl: /* [] */0
                                          }),
                                      tl: /* [] */0
                                    }
                                  }),
                              href: orgWebsite,
                              rel: "noopener noreferrer",
                              target: "_blank"
                            }, React.createElement("img", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.width({
                                              NAME: "vh",
                                              VAL: 25
                                            }),
                                        tl: {
                                          hd: Css.height({
                                                NAME: "vh",
                                                VAL: 25
                                              }),
                                          tl: {
                                            hd: Css.objectFit("contain"),
                                            tl: /* [] */0
                                          }
                                        }
                                      }),
                                  src: orgImage
                                })), React.createElement("br", undefined), React.createElement("a", {
                              className: Cn.make({
                                    hd: Styles$WildCards.navListText,
                                    tl: {
                                      hd: Curry._1(Css.style, {
                                            hd: Css.fontSize(Css.em(3)),
                                            tl: /* [] */0
                                          }),
                                      tl: /* [] */0
                                    }
                                  }),
                              href: orgWebsite,
                              rel: "noopener noreferrer",
                              target: "_blank"
                            }, Globals$WildCards.restr(orgName)), React.createElement("br", undefined), React.createElement("div", {
                              className: Curry._1(Css.style, {
                                    hd: Css.maxHeight({
                                          NAME: "em",
                                          VAL: 15
                                        }),
                                    tl: {
                                      hd: Css.overflow("scroll"),
                                      tl: /* [] */0
                                    }
                                  })
                            }, tmp), React.createElement("br", undefined)), React.createElement(RimbleUi.Box, {
                          children: null,
                          width: [
                            1,
                            1,
                            0.3333
                          ],
                          className: Curry._1(Css.style, {
                                hd: Css.alignSelf(Css.center),
                                tl: {
                                  hd: Css.padding(Css.em(2)),
                                  tl: /* [] */0
                                }
                              })
                        }, optOrgYoutubeVid !== undefined ? React.createElement(make, {
                                videoCode: optOrgYoutubeVid
                              }) : null, React.createElement("h2", undefined, Globals$WildCards.restr("Total Raised")), Globals$WildCards.restr(match$1[0] + "ETH"), React.createElement("br", undefined), React.createElement("small", undefined, Globals$WildCards.restr(match$1[1] + "USD"))), React.createElement(RimbleUi.Box, {
                          children: null,
                          width: [
                            1,
                            1,
                            0.3333
                          ],
                          className: Curry._1(Css.style, {
                                hd: Css.alignSelf(Css.center),
                                tl: {
                                  hd: Css.padding(Css.em(2)),
                                  tl: /* [] */0
                                }
                              })
                        }, orgAnimals.length !== 0 ? React.createElement(React.Fragment, {
                                children: null
                              }, React.createElement(RimbleUi.Heading, {
                                    children: "Organisations animals"
                                  }), React.createElement(RimbleUi.Flex, {
                                    children: Belt_Array.map(orgAnimals, (function (animal) {
                                            return React.createElement(UserProfile$WildCards.Token.make, {
                                                        tokenId: animal.id,
                                                        key: TokenId$WildCards.toString(animal.id)
                                                      });
                                          })),
                                    flexWrap: "wrap",
                                    className: UserProfile$WildCards.centreAlignOnMobile
                                  })) : React.createElement("p", undefined, "This organisation doesn't have any wildcards yet"), orgComingSoon.length !== 0 ? React.createElement(React.Fragment, {
                                children: null
                              }, React.createElement(RimbleUi.Heading, {
                                    children: "Coming soon"
                                  }), React.createElement(RimbleUi.Flex, {
                                    children: null,
                                    flexWrap: "wrap",
                                    className: UserProfile$WildCards.centreAlignOnMobile
                                  }, null, Belt_Array.mapWithIndex(orgComingSoon, (function (key, animal) {
                                          return Belt_Option.mapWithDefault(Belt_Array.get(animal.real_wc_photos, 0), null, (function (photos) {
                                                        return React.createElement(OrgProfile$ComingSoonAnimal, {
                                                                    image: Animal$WildCards.cdnBase + photos.image,
                                                                    onClick: (function (param) {
                                                                        return Curry._1(setSelectedComingSoonAnimal, (function (param) {
                                                                                      return key;
                                                                                    }));
                                                                      }),
                                                                    key: String(key)
                                                                  });
                                                      }));
                                        })))) : null))));
}

var OrgPage = {
  make: OrgProfile$OrgPage
};

function OrgProfile(Props) {
  var orgId = Props.orgId;
  var orgData = QlHooks$WildCards.useLoadOrganisationData(orgId);
  var tmp;
  if (orgData !== undefined) {
    var orgData$1 = Caml_option.valFromOption(orgData).organisations_by_pk;
    tmp = orgData$1 !== undefined ? React.createElement(OrgProfile$OrgPage, {
            orgData: Caml_option.valFromOption(orgData$1),
            orgId: orgId
          }) : React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
                children: "Could not find an organisation with that ID."
              }));
  } else {
    tmp = React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
              children: "Loading Organisation Profile"
            }), React.createElement(RimbleUi.Loader, {}));
  }
  return React.createElement(RimbleUi.Flex, {
              children: tmp,
              flexWrap: "wrap",
              alignItems: "center",
              className: Styles$WildCards.topBody
            });
}

var make$1 = OrgProfile;

export {
  orgDescriptionArray_decode ,
  YoutubeVid ,
  ComingSoonAnimal ,
  ImageCarousel ,
  ComingSoonModal ,
  OrgPage ,
  make$1 as make,
  
}
/* make Not a pure module */
