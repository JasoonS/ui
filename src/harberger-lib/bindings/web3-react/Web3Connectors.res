type injectedType = {isAuthorized: unit => Promise.promise<bool>}

@module("./connectors") external injected: injectedType = "injected"

module Custom = {
  @dead("Custom.+make") @module("./web3CustomRoot") @react.component
  external make: (
    ~id: string,
    ~getLibrary: Web3.rawProvider => Web3.web3Library,
    ~children: React.element,
  ) => React.element = "default"
}
