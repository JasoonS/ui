[%bs.raw {|require("react-tabs/style/react-tabs.css")|}];

open Globals;

module Router = {
  [@react.component]
  let make = () => {
    let url = ReasonReactRouter.useUrl();
    switch (url.path) {
    | ["gsn-test"] => <GSNTest />
    | [_] => <p> {React.string("Unknown page")} </p>
    // | _ => <GSNTest />
    | _ => <ReactTranslate> <Layout /> </ReactTranslate>
    };
  };
};

[@bs.val]
external mainnetApi: option(string) = "process.env.REACT_APP_MAINNET_BE";
[@bs.val]
external goerliApi: option(string) = "process.env.REACT_APP_GOERLI_BE";
[@bs.val]
external maticTestnetApi: option(string) =
  "process.env.REACT_APP_MATIC_TESTNET";
[@bs.val]
external maticApi: option(string) = "process.env.REACT_APP_MATIC_BE";
// [@bs.val]
// external rinkebyApi: option(string) = "process.env.REACT_APP_RINKEBY_BE";

ReactDOMRe.renderToElementWithId(
  <WildcardsProvider
    getGraphEndpoints={(networkId, ()) => {
      open Client;

      let endpoints =
        switch (networkId) {
        | 5 => {
            mainnet:
              goerliApi |||| "https://goerli.api.wildcards.world/v1/graphq",
            matic:
              maticTestnetApi
              |||| "https://api.mumbai-graph.matic.today/subgraphs/name/wildcards-world/wildcards-mumbai",
            ws: "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
          }
        // | 4 => (
        //     rinkebyApi |||| "https://rinkeby.api.wildcards.world/v1/graphq",
        //     "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
        //   )
        // | _ => (
        //     goerliApi |||| "https://goerli.api.wildcards.world/v1/graphq",
        //     "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
        //   )
        | _ => {
            mainnet:
              goerliApi |||| "https://goerli.api.wildcards.world/v1/graphq",
            matic:
              maticTestnetApi
              |||| "https://api.mumbai-graph.matic.today/subgraphs/name/wildcards-world/wildcards-mumbai",
            ws: "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
          }
        //   goerliApi |||| "https://goerli.api.wildcards.world/v1/graphq",
        //   "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
        // )
        // | _ => {
        //     mainnet: mainnetApi |||| "https://api.wildcards.world/v1/graphql",
        //     matic: maticApi |||| "https://api.mumbai-graph.matic.today/subgraphs/name/wildcards-world/wildcards-mumbai/graphql",
        //     ws: "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards",
        //   }
        };
      endpoints;
    }}>
    <UsdPriceProvider> <Router /> </UsdPriceProvider>
    <DiscordChat />
  </WildcardsProvider>,
  "root",
);
