// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as ApolloClient from "@wildcards/reason-apollo/src/ApolloClient.bs.js";
import * as ApolloConsumer from "@wildcards/reason-apollo/src/ApolloConsumer.bs.js";
import * as QlHooks$WildCards from "./QlHooks.bs.js";
import * as ApolloHooks$ReasonApolloHooks from "@wildcards/reason-apollo-hooks/src/ApolloHooks.bs.js";

var context = React.createContext(false);

var make = context.Provider;

function makeProps(value, children, param) {
  return {
          value: value,
          children: children
        };
}

var RootContext = {
  context: context,
  make: make,
  makeProps: makeProps
};

function useIsInitialized(param) {
  return React.useContext(context);
}

function QlStateManager(Props) {
  var children = Props.children;
  var result = QlHooks$WildCards.useStateChangeSubscriptionData(undefined);
  var initialDataLoad = QlHooks$WildCards.useInitialDataLoad(/* MainnetQuery */2);
  var hasLoadedInitialData = initialDataLoad !== undefined;
  return React.createElement(make, makeProps(hasLoadedInitialData, null, undefined), Belt_Option.mapWithDefault(result, null, (function (result) {
                    return React.createElement(ApolloConsumer.make, {
                                children: (function (client) {
                                    var stateChanges = result.stateChanges[0];
                                    var changedWildcards = stateChanges.wildcardChanges;
                                    var changedPatrons = stateChanges.patronChanges;
                                    Belt_Array.map(changedWildcards, (function (wildcard) {
                                            var query = QlHooks$WildCards.SubWildcardQuery.make(wildcard.id, undefined);
                                            var readQueryOptions = ApolloHooks$ReasonApolloHooks.toQueryObj(query);
                                            ApolloClient.ReadQuery({
                                                  query: QlHooks$WildCards.SubWildcardQuery.query,
                                                  parse: QlHooks$WildCards.SubWildcardQuery.parse
                                                });
                                            var SubWildcardQueryWriteQuery = ApolloClient.WriteQuery({
                                                  query: QlHooks$WildCards.SubWildcardQuery.query,
                                                  parse: QlHooks$WildCards.SubWildcardQuery.parse
                                                });
                                            var cachedResponse;
                                            try {
                                              cachedResponse = client.readQuery(readQueryOptions);
                                            }
                                            catch (exn){
                                              return ;
                                            }
                                            if (cachedResponse == null) {
                                              return ;
                                            }
                                            var setupWildcardForCache = ((wildcardData, cachedWildcard) =>{
                             return {
                               wildcard: {
                                 typename: "Wildcard",
                                 ...wildcardData,
                                 ...cachedWildcard.wildcard
                               }
                             }
                           });
                                            return Curry._4(SubWildcardQueryWriteQuery.make, client, Caml_option.some(query.variables), setupWildcardForCache(wildcard, cachedResponse), undefined);
                                          }));
                                    return Belt_Array.map(changedPatrons, (function (patron) {
                                                  var patronQuery = QlHooks$WildCards.LoadPatron.make(patron.id, undefined);
                                                  var readQueryOptions = ApolloHooks$ReasonApolloHooks.toQueryObj(patronQuery);
                                                  ApolloClient.ReadQuery({
                                                        query: QlHooks$WildCards.LoadPatron.query,
                                                        parse: QlHooks$WildCards.LoadPatron.parse
                                                      });
                                                  var LoadPatronWriteQuery = ApolloClient.WriteQuery({
                                                        query: QlHooks$WildCards.LoadPatron.query,
                                                        parse: QlHooks$WildCards.LoadPatron.parse
                                                      });
                                                  var exit = 0;
                                                  var cachedResponse;
                                                  try {
                                                    cachedResponse = client.readQuery(readQueryOptions);
                                                    exit = 1;
                                                  }
                                                  catch (exn){
                                                    
                                                  }
                                                  if (exit === 1 && !(cachedResponse == null)) {
                                                    var setupPatronForCache = ((patronData, cachedPatron) =>{
                             return {
                               patron: {
                                 typename: "Patron",
                                 ...patronData,
                                 ...cachedPatron.patron
                               }
                             }
                           });
                                                    Curry._4(LoadPatronWriteQuery.make, client, Caml_option.some(patronQuery.variables), setupPatronForCache(patron, cachedResponse), undefined);
                                                  }
                                                  return null;
                                                }));
                                  })
                              });
                  })), children);
}

var make$1 = QlStateManager;

export {
  RootContext ,
  useIsInitialized ,
  make$1 as make,
  
}
/* context Not a pure module */
