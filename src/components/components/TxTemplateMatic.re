open Globals;

[@react.component]
let make =
    (
      ~children: React.element,
      ~txHash: option(string),
      ~closeButtonText: string,
    ) => {
  // Js.log2("printing so they are used...", closeButtonText);
  let etherscanUrl = RootProvider.useEtherscanUrl();
  // let clearNonUrlState = RootProvider.useClearNonUrlState();

  switch (txHash) {
  | None => children
  | Some(txHash) =>
    <React.Fragment>
      <Rimble.Heading>
        closeButtonText->restr
        "Processing Transaction "->restr
        <WildcardsLoader />
      </Rimble.Heading>
      <Rimble.Text>
        <a
          href={j|https://$etherscanUrl/tx/$txHash|j}
          target="_blank"
          rel="noopener noreferrer">
          "View the transaction on etherscan.io"->restr
        </a>
      </Rimble.Text>
      <Rimble.Loader className=Styles.centerItems size="80px" />
    </React.Fragment>
  };
  // switch (txState) {
  // | ContractActions.UnInitialised => children
  // | ContractActions.Created =>
  //   <React.Fragment>
  //     <Rimble.Heading>
  //       "Processing Transaction "->restr
  //       <WildcardsLoader />
  //     </Rimble.Heading>
  //     <Rimble.Text> "Tx Created."->restr </Rimble.Text>
  //     <Rimble.Flex justifyContent="center">
  //       <Rimble.Loader size="80px" />
  //     </Rimble.Flex>
  //   </React.Fragment>
  // // TODO: make it show the link to the tx on etherscan.io!
  // | ContractActions.SignedAndSubmitted(txHash) =>
  //   <React.Fragment>
  //     <Rimble.Heading>
  //       "Processing Transaction "->restr
  //       <WildcardsLoader />
  //     </Rimble.Heading>
  //     <Rimble.Text>
  //       <a
  //         href={j|https://$etherscanUrl/tx/$txHash|j}
  //         target="_blank"
  //         rel="noopener noreferrer">
  //         "View the transaction on etherscan.io"->restr
  //       </a>
  //     </Rimble.Text>
  //     <Rimble.Loader className=Styles.centerItems size="80px" />
  //   </React.Fragment>
  // | ContractActions.Complete(result) =>
  //   let txHash = result.transactionHash;
  //   <React.Fragment>
  //     <Rimble.Heading>
  //       "Transaction Complete "->restr
  //       <WildcardsLoader />
  //     </Rimble.Heading>
  //     <Rimble.Text>
  //       <a
  //         href={j|https://$etherscanUrl/tx/$txHash|j}
  //         target="_blank"
  //         rel="noopener noreferrer">
  //         "View the transaction on etherscan.io"->restr
  //       </a>
  //     </Rimble.Text>
  //     <Rimble.Button onClick={_e => clearNonUrlState()}>
  //       closeButtonText->restr
  //     </Rimble.Button>
  //   </React.Fragment>;
  // | ContractActions.Declined(message) =>
  //   <React.Fragment>
  //     <Rimble.Heading>
  //       "The transaction was declined by signing device, please try again."
  //       ->restr
  //     </Rimble.Heading>
  //     <p> {("Failure reason: " ++ message)->restr} </p>
  //     children
  //   </React.Fragment>
  // | ContractActions.Failed =>
  //   <React.Fragment>
  //     <Rimble.Heading>
  //       "The transaction failed."->restr
  //       <WildcardsLoader />
  //     </Rimble.Heading>
  //     <Rimble.Text>
  //       "It is possible that someone else bought the token before you, or the price changed. If you are unsure please feel free to contact our support."
  //       ->restr
  //     </Rimble.Text>
  //     children
  //   </React.Fragment>
  // };
};
