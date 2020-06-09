module UpdateDepositInput = {
  [@bs.module "./UpdateDepositInput"] [@react.component]
  external make:
    (
      ~depositChange: string,
      ~updateDepositChange: ReactEvent.Form.t => (string, bool),
      ~isAddDeposit: bool,
      ~updateIsAddDeposit: bool => unit,
      ~onSubmitDepositChange: ReactEvent.Form.t => unit
    ) =>
    React.element =
    "default";
};

let getToDisplay = (label, value) =>
  React.string(
    label ++ ": " ++ value->Belt.Option.mapWithDefault("loading", a => a),
  );
module Transaction = {
  [@react.component]
  let make = () => {
    let (depositChange, setDepositChange) = React.useState(() => "");
    let (isAddDeposit, setIsAddDeposit) = React.useState(() => true);

    let (depositFunc, txWithdrawObject) = AnimalActions.useUpdateDeposit();
    let (withdrawFunc, txDepositObject) = AnimalActions.useWithdrawDeposit();

    // let _availableDeposit =
    //   useDepositAbleToWithdrawWeiNew(currentUser)
    //   ->mapWithDefault("0", price => price);

    let onSubmitDepositChange = event => {
      ReactEvent.Form.preventDefault(event);
      let depositChangeWei = Web3Utils.toWei(depositChange, "ether");

      if (isAddDeposit) {
        depositFunc(depositChangeWei);
      } else {
        withdrawFunc(depositChangeWei);
      };
    };

    let updateDepositChange = event => {
      ReactEvent.Form.preventDefault(event);
      InputHelp.onlyUpdateIfPositiveFloat(
        depositChange,
        setDepositChange,
        event,
      );
    };
    let updateIsAddDeposit = isDeposit => {
      setIsAddDeposit(_ => isDeposit);
    };
    <TxTemplate txState=txDepositObject>
      <TxTemplate txState=txWithdrawObject>
        <UpdateDepositInput
          depositChange
          updateDepositChange
          isAddDeposit
          updateIsAddDeposit
          onSubmitDepositChange
        />
      </TxTemplate>
    </TxTemplate>;
  };
};

[@react.component]
let make = () => {
  // TODO: if the token is foreclosed handle that logic... (say something like -- "add deposit quick! to keep your token")
  let goToDepositUpdate = RootProvider.useGoToDepositUpdate();

  <React.Fragment>
    <Rimble.Button onClick={_e => goToDepositUpdate()}>
      "Deposit"->React.string
    </Rimble.Button>
  </React.Fragment>;
};