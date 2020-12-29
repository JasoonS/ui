// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Cn from "re-classnames/src/Cn.bs.js";
import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Styles from "../Styles.bs.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as RootProvider from "../harberger-lib/RootProvider.bs.js";
import * as WildcardsLogo from "../img/logos/WildcardsLogo.bs.js";

var hambergerMenu = Curry._1(Css.style, {
      hd: Css.display("none"),
      tl: {
        hd: Css.textAlign("center"),
        tl: {
          hd: Css.media("(max-width: 1126px)", {
                hd: Css.display("block"),
                tl: /* [] */0
              }),
          tl: /* [] */0
        }
      }
    });

var fullScreenMenu = Curry._1(Css.style, {
      hd: Css.display("block"),
      tl: {
        hd: Css.textAlign("center"),
        tl: {
          hd: Css.media("(max-width: 1126px)", {
                hd: Css.display("none"),
                tl: /* [] */0
              }),
          tl: /* [] */0
        }
      }
    });

var headerNav = Curry._1(Css.style, {
      hd: Css.textDecoration(Css.none),
      tl: {
        hd: Css.marginRight(Css.em(2)),
        tl: /* [] */0
      }
    });

var navItemStyles = Curry._1(Css.style, {
      hd: Css.display("inlineBlock"),
      tl: {
        hd: Css.margin2(Css.px(0), Css.rem(0.8)),
        tl: {
          hd: Css.borderBottom(Css.px(1), "solid", "transparent"),
          tl: {
            hd: Css.selector(":hover", {
                  hd: Css.borderBottom(Css.px(1), "solid", Styles.wildCardGreen),
                  tl: /* [] */0
                }),
            tl: {
              hd: Css.selector("a", {
                    hd: Css.fontStyle("italic"),
                    tl: {
                      hd: Css.fontSize(Css.rem(1.4)),
                      tl: {
                        hd: Css.color(Styles.wildCardGreen),
                        tl: {
                          hd: Css.fontWeight({
                                NAME: "num",
                                VAL: 200
                              }),
                          tl: {
                            hd: Css.selector(":hover", {
                                  hd: Css.borderBottom(Css.px(1), "solid", "transparent"),
                                  tl: /* [] */0
                                }),
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
    });

function floatingMenu(shouldDisplay) {
  return Curry._1(Css.style, {
              hd: Css.position("fixed"),
              tl: {
                hd: Css.top(Css.px(0)),
                tl: {
                  hd: Css.left(Css.px(0)),
                  tl: {
                    hd: Css.width({
                          NAME: "percent",
                          VAL: 100
                        }),
                    tl: {
                      hd: Css.height(Css.vh(100)),
                      tl: {
                        hd: Css.visibility(shouldDisplay ? "visible" : "hidden"),
                        tl: {
                          hd: Css.backgroundColor(Css.rgba(255, 255, 255, shouldDisplay ? 0.5 : 0)),
                          tl: {
                            hd: Css.display("flex"),
                            tl: {
                              hd: Css.alignItems("center"),
                              tl: {
                                hd: Css.justifyContent("center"),
                                tl: {
                                  hd: Css.overflow("hidden"),
                                  tl: {
                                    hd: Css.zIndex(1000),
                                    tl: {
                                      hd: Css.transition(600, 0, Css.ease, "all"),
                                      tl: {
                                        hd: Css.selector(".zoom-in-effect", {
                                              hd: Css.background(Css.rgba(107, 173, 62, 0.3)),
                                              tl: {
                                                hd: Css.width(Css.vw(100)),
                                                tl: {
                                                  hd: Css.height(Css.vh(100)),
                                                  tl: {
                                                    hd: Css.borderRadius({
                                                          NAME: "percent",
                                                          VAL: 50
                                                        }),
                                                    tl: {
                                                      hd: Css.border(Css.px(1), "solid", Styles.wildCardGreen),
                                                      tl: {
                                                        hd: Css.display("flex"),
                                                        tl: {
                                                          hd: Css.flex("none"),
                                                          tl: {
                                                            hd: Css.alignItems("center"),
                                                            tl: {
                                                              hd: Css.justifyContent("center"),
                                                              tl: {
                                                                hd: Css.transform(shouldDisplay ? Css.scale(1, 1) : Css.scale(0, 0)),
                                                                tl: {
                                                                  hd: Css.transition(300, 0, Css.ease, "all"),
                                                                  tl: /* [] */0
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
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
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            });
}

function hamburgerSvg(param) {
  return React.createElement("svg", {
              className: Curry._1(Css.style, {
                    hd: Css.zIndex(1001),
                    tl: {
                      hd: Css.transition(500, 0, Css.ease, "transform"),
                      tl: {
                        hd: Css.selector(":hover", {
                              hd: Css.transform(Css.rotate(Css.deg(180))),
                              tl: /* [] */0
                            }),
                        tl: /* [] */0
                      }
                    }
                  }),
              id: "Layer_1",
              height: "32px",
              width: "32px",
              fill: "#555555",
              version: "1.1"
            }, React.createElement("path", {
                  d: "M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
                }));
}

function closeSvg(param) {
  return React.createElement("svg", {
              className: Curry._1(Css.style, {
                    hd: Css.zIndex(1002),
                    tl: {
                      hd: Css.transition(500, 0, Css.ease, "transform"),
                      tl: {
                        hd: Css.selector(":hover", {
                              hd: Css.transform(Css.rotate(Css.deg(180))),
                              tl: /* [] */0
                            }),
                        tl: /* [] */0
                      }
                    }
                  }),
              height: "32px",
              width: "32px",
              fill: "#222222",
              viewBox: "0 0 512 512"
            }, React.createElement("path", {
                  d: "M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
                }));
}

function Header(Props) {
  var navItems = Props.navItems;
  var match = React.useState(function () {
        return false;
      });
  var setIsOpen = match[1];
  var isOpen = match[0];
  var menuItems = function (isMobile) {
    return React.createElement("ul", {
                className: isMobile ? Curry._1(Css.style, {
                        hd: Css.display("flex"),
                        tl: {
                          hd: Css.flexDirection("column"),
                          tl: {
                            hd: Css.alignItems("center"),
                            tl: {
                              hd: Css.padding(Css.px(0)),
                              tl: {
                                hd: Css.margin(Css.px(0)),
                                tl: /* [] */0
                              }
                            }
                          }
                        }
                      }) : Styles.navList
              }, Belt_Array.mapWithIndex(navItems, (function (index, param) {
                      if (param.shouldDisplay && !isMobile || param.shouldDisplayMobile && isMobile) {
                        return React.createElement("li", {
                                    key: String(index),
                                    className: Cn.make({
                                          hd: Cn.ifTrue(navItemStyles, isMobile),
                                          tl: {
                                            hd: Cn.ifTrue(Curry._1(Css.style, {
                                                      hd: Css.backgroundColor(Css.white),
                                                      tl: {
                                                        hd: Css.borderBottom(Css.px(1), "solid", Styles.wildCardGreen),
                                                        tl: {
                                                          hd: Css.display("block"),
                                                          tl: {
                                                            hd: Css.width({
                                                                  NAME: "percent",
                                                                  VAL: 100
                                                                }),
                                                            tl: {
                                                              hd: Css.selector(":hover", {
                                                                    hd: Css.backgroundColor(Styles.wildCardBlue),
                                                                    tl: /* [] */0
                                                                  }),
                                                              tl: {
                                                                hd: Css.selector(":focus", {
                                                                      hd: Css.backgroundColor(Styles.wildCardBlue),
                                                                      tl: /* [] */0
                                                                    }),
                                                                tl: {
                                                                  hd: Css.selector(":active", {
                                                                        hd: Css.backgroundColor(Styles.wildCardGreen),
                                                                        tl: {
                                                                          hd: Css.selector("a", {
                                                                                hd: Css.color(Css.white),
                                                                                tl: /* [] */0
                                                                              }),
                                                                          tl: /* [] */0
                                                                        }
                                                                      }),
                                                                  tl: {
                                                                    hd: Css.selector(" > *", {
                                                                          hd: Css.display("block"),
                                                                          tl: {
                                                                            hd: Css.width("auto"),
                                                                            tl: {
                                                                              hd: Css.padding(Css.em(2)),
                                                                              tl: /* [] */0
                                                                            }
                                                                          }
                                                                        }),
                                                                    tl: /* [] */0
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }), isMobile),
                                            tl: /* [] */0
                                          }
                                        })
                                  }, Curry._2(param.component, (function (param) {
                                          return Curry._1(setIsOpen, (function (param) {
                                                        return false;
                                                      }));
                                        }), isMobile));
                      } else {
                        return null;
                      }
                    })));
  };
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  return React.createElement("header", {
              className: Styles.header
            }, React.createElement("div", {
                  className: Styles.navBox
                }, React.createElement("a", {
                      className: Cn.make({
                            hd: Styles.clickableLink,
                            tl: {
                              hd: Curry._1(Css.style, {
                                    hd: Css.marginLeft({
                                          NAME: "px",
                                          VAL: 80
                                        }),
                                    tl: {
                                      hd: Css.zIndex(1001),
                                      tl: /* [] */0
                                    }
                                  }),
                              tl: /* [] */0
                            }
                          }),
                      onClick: (function ($$event) {
                          $$event.preventDefault();
                          return Curry._1(clearAndPush, "#");
                        })
                    }, React.createElement("div", {
                          className: Styles.headerLogo
                        }, React.createElement(WildcardsLogo.make, {
                              maxWidth: "258px"
                            }))), React.createElement("nav", {
                      className: Cn.make({
                            hd: headerNav,
                            tl: {
                              hd: fullScreenMenu,
                              tl: /* [] */0
                            }
                          })
                    }, menuItems(false)), React.createElement("nav", {
                      className: Cn.make({
                            hd: headerNav,
                            tl: {
                              hd: hambergerMenu,
                              tl: /* [] */0
                            }
                          })
                    }, React.createElement("div", {
                          className: Curry._1(Css.style, {
                                hd: Css.zIndex(1010),
                                tl: {
                                  hd: Css.position("absolute"),
                                  tl: {
                                    hd: Css.top(Css.px(0)),
                                    tl: {
                                      hd: Css.right(Css.px(0)),
                                      tl: {
                                        hd: Css.padding(Css.px(30)),
                                        tl: /* [] */0
                                      }
                                    }
                                  }
                                }
                              }),
                          onClick: (function (param) {
                              return Curry._1(setIsOpen, (function (isOpen) {
                                            return !isOpen;
                                          }));
                            })
                        }, isOpen ? React.createElement(React.Fragment, undefined, closeSvg(undefined)) : hamburgerSvg(undefined)), React.createElement("div", {
                          className: floatingMenu(isOpen)
                        }, React.createElement("div", {
                              className: "zoom-in-effect"
                            }, menuItems(true))))));
}

var make = Header;

export {
  hambergerMenu ,
  fullScreenMenu ,
  headerNav ,
  navItemStyles ,
  floatingMenu ,
  hamburgerSvg ,
  closeSvg ,
  make ,
  
}
/* hambergerMenu Not a pure module */
