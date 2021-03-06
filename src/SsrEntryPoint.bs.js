// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Layout from "./components/Layout.bs.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Client from "@apollo/client";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.bs.js";
import * as WildcardsProvider from "./harberger-lib/components/WildcardsProvider.bs.js";

function SsrEntryPoint$Router(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  var match = url.path;
  if (match) {
    if (match.tl) {
      return React.createElement(Layout.make, {});
    } else {
      return React.createElement("p", undefined, "Unknown page");
    }
  } else {
    return React.createElement(Layout.make, {});
  }
}

var Router = {
  make: SsrEntryPoint$Router
};

function SsrEntryPoint$ApolloProvider(Props) {
  var children = Props.children;
  var client = Props.client;
  return React.createElement(Client.ApolloProvider, {
              client: client,
              children: children
            });
}

var ApolloProvider = {
  make: SsrEntryPoint$ApolloProvider
};

function SsrEntryPoint(Props) {
  return React.createElement(WildcardsProvider.make, {
              getGraphEndpoints: (function (networkId, param) {
                  if (networkId !== 5) {
                    return {
                            mainnet: "https://api.thegraph.com/subgraphs/name/wildcards-world/wildcards",
                            matic: "https://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-polygon-testnet/graphql",
                            db: Belt_Option.getWithDefault(process.env.REACT_APP_MAINNET_BE, "https://api.wildcards.world/v1/graphql")
                          };
                  } else {
                    return {
                            mainnet: "https://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
                            matic: "https://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-polygon-testnet/graphql",
                            db: Belt_Option.getWithDefault(process.env.REACT_APP_GOERLI_BE, "https://goerli.api.wildcards.world/v1/graphq")
                          };
                  }
                }),
              children: React.createElement(SsrEntryPoint$Router, {})
            });
}

var make = SsrEntryPoint;

export {
  Router ,
  ApolloProvider ,
  make ,
  
}
/* react Not a pure module */
