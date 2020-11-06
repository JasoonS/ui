open ReasonApolloHooks;
open Globals;

type owner = {. "address": Js.Json.t};

type price = {. "price": Eth.t};

type wildcard = {
  id: string,
  tokenId: TokenId.t,
  patronageNumerator: Js.Json.t,
  owner,
  price,
};

let tokenIdToAnimal: Js.Json.t => TokenId.t =
  tokenIdJson =>
    tokenIdJson
    ->Js.Json.decodeString
    ->Belt.Option.mapWithDefault("0", a => a)
    ->TokenId.make
    ->Belt.Option.getWithDefault(TokenId.makeFromInt(0));

let decodePrice: Js.Json.t => Eth.t =
  price =>
    price
    ->Js.Json.decodeString
    ->Belt.Option.mapWithDefault("0", a => a)
    ->Eth.makeWithDefault(0);

let decodeMoment: Js.Json.t => MomentRe.Moment.t =
  price =>
    price
    ->Js.Json.decodeString
    ->Belt.Option.mapWithDefault(0, a => a->int_of_string) /*trusting that gql will be reliable here*/
    ->MomentRe.momentWithUnix;

let decodeBN: Js.Json.t => BN.t =
  number =>
    number
    ->Js.Json.decodeString
    ->Belt.Option.mapWithDefault("0", a => a) /*trusting that gql will be reliable here*/
    ->BN.new_;
let decodeOptionBN: option(Js.Json.t) => option(BN.t) =
  optionalNumber => optionalNumber->Option.map(num => decodeBN(num));

let toTokenId: string => TokenId.t = Obj.magic;
let toTokenIdWithDefault = optTokenId =>
  optTokenId->Option.getWithDefault("9999")->toTokenId;

// TODO: make a real address string
let decodeAddress: Js.Json.t => string =
  address =>
    address->Js.Json.decodeString->Belt.Option.mapWithDefault("0x0", a => a);

module InitialLoad = [%graphql
  {|
       query($amount: Int) {
         wildcards(first: $amount) {
           id
           animal: tokenId @bsDecoder(fn: "tokenIdToAnimal")
           owner {
             address
             id
           }
           price {
             price @bsDecoder(fn: "decodePrice")
             id
           }
           totalCollected @bsDecoder(fn: "decodePrice")
           timeCollected @bsDecoder(fn: "decodeBN")
           patronageNumeratorPriceScaled @bsDecoder(fn: "decodeBN")
           # timeCollected @bsDecoder(fn: "decodeMoment")
           timeAcquired @bsDecoder(fn: "decodeMoment")
           auctionStartPrice @bsDecoder(fn: "decodeOptionBN")
           launchTime @bsDecoder(fn: "decodeBN")
         }
         global(id: 1) {
           id
           totalCollectedOrDueAccurate @bsDecoder(fn: "decodeBN")
           timeLastCollected @bsDecoder(fn: "decodeBN")
           totalTokenCostScaledNumeratorAccurate @bsDecoder(fn: "decodeBN")
           defaultAuctionLength @bsDecoder(fn: "decodeBN")
           defaultAuctionEndPrice @bsDecoder(fn: "decodeBN")
           defaultAuctionStartPrice @bsDecoder(fn: "decodeBN")
         }
       }
     |}
];

let createContext: Client.queryContext => ApolloHooksTypes.Context.t = Obj.magic;

let useInitialDataLoad = (~chain) => {
  let (simple, _full) =
    ApolloHooks.useQuery(
      ~notifyOnNetworkStatusChange=true,
      // ~fetchPolicy=ApolloHooksTypes.NoCache,
      ~fetchPolicy=ApolloHooksTypes.CacheFirst,
      // This is a wierd hack for the sake of caching
      ~variables=
        InitialLoad.make(
          ~amount=
            switch (chain) {
            | Client.MaticQuery => 31
            | Client.Neither
            | Client.MainnetQuery => 30
            },
          (),
        )##variables,
      ~context={context: chain}->createContext,
      InitialLoad.definition,
    );

  switch (simple) {
  | Data(data) => Some(data)
  | Loading
  | NoData
  | Error(_) => None
  };
};

let useAnimalList = (~chain) => {
  let allData = useInitialDataLoad(~chain);
  React.useMemo2(
    () => {
      allData->oMap(data => data##wildcards->Array.map(wc => wc##animal))
      |||| [||]
    },
    (allData, chain),
  );
};

module SubWildcardQuery = [%graphql
  {|
       query ($tokenId: String!) {
         wildcard(id: $tokenId) {
           id
           animal: tokenId @bsDecoder(fn: "tokenIdToAnimal")
           timeAcquired @bsDecoder(fn: "decodeMoment")
           totalCollected @bsDecoder(fn: "decodePrice")
           patronageNumerator @bsDecoder(fn: "decodeBN")
           patronageNumeratorPriceScaled @bsDecoder(fn: "decodeBN")
           timeCollected @bsDecoder(fn: "decodeBN")
           # timeCollected @bsDecoder(fn: "decodeMoment")
           price {
             id
             price @bsDecoder(fn: "decodePrice")
           }
           owner {
             address @bsDecoder(fn: "decodeAddress")
             id
           }
           auctionStartPrice @bsDecoder(fn: "decodeOptionBN")
           launchTime @bsDecoder(fn: "decodeBN")
         }
       }
     |}
];

module WildcardDataQuery = [%graphql
  {|
    query ($tokenId: String!) {
      launchedWildcards_by_pk(id: $tokenId) {
        wildcard {
          id
          name
          description
          organisationId
          image
          real_wc_photos {
            image
            photographer
          }
        }
      }
    }
  |}
];

module MaticStateQuery = [%graphql
  {|
    query ($address: String!, $network: String!) {
      maticState(address: $address, network: $network) {
        balance
        daiNonce
        error
        stewardNonce
      }
    }
  |}
];
module HomeAnimalsQuery = [%graphql
  {|
    query {
      homeAnimals {
        id
        next
        prev
        wildcardData {
          description
          id
          name
          organisationId
        }
      }
    }
  |}
];
// NOTE: If multiple transactions happen in the same block they may get missed, maybe one day that will be a problem for us ;)
module SubStateChangeEvents = [%graphql
  {|
       subscription {
         stateChanges(first: 1, orderBy: timestamp, orderDirection: desc) {
           id
           timestamp
           wildcardChanges {
             id
             tokenId
             timeAcquired
             totalCollected
             patronageNumeratorPriceScaled
             timeCollected
             price {
               id
               price
             }
             owner {
               address
               id
             }
           }
           patronChanges {
             id
             address
             lastUpdated
             # lastUpdated @bsDecoder(fn: "decodeMoment")
             previouslyOwnedTokens {
               id
             }
             tokens {
               id
             }
             availableDeposit
             patronTokenCostScaledNumerator
             foreclosureTime
           }
         }
       }
     |}
];

module LoadPatron = [%graphql
  {|
       query ($patronId: String!) {
         patron(id: $patronId) {
           id
           address @bsDecoder(fn: "decodeAddress")
           lastUpdated @bsDecoder(fn: "decodeBN")
           # lastUpdated @bsDecoder(fn: "decodeMoment")
           previouslyOwnedTokens {
             id
           }
           tokens {
             id
           }
           availableDeposit  @bsDecoder(fn: "decodePrice")
           patronTokenCostScaledNumerator  @bsDecoder(fn: "decodeBN")
           foreclosureTime  @bsDecoder(fn: "decodeBN")
           id
           address @bsDecoder(fn: "decodeAddress")
           lastUpdated @bsDecoder(fn: "decodeBN")
           totalLoyaltyTokens @bsDecoder(fn: "decodeBN")
           totalLoyaltyTokensIncludingUnRedeemed @bsDecoder(fn: "decodeBN")
         }
       }
     |}
];

module LoadTokenDataArray = [%graphql
  {|
        query ($orgArray: [String!]!) {
          wildcards (where: {id_in: $orgArray}) {
            # totalCollected
            # patronageNumeratorPriceScaled
            # timeCollected
            id
            totalCollected @bsDecoder(fn: "decodePrice")
            patronageNumeratorPriceScaled @bsDecoder(fn: "decodeBN")
            timeCollected @bsDecoder(fn: "decodeBN")
          }
        }
     |}
];
module LoadOrganisationData = [%graphql
  {|
      query ($orgId: String!) {
        organisations_by_pk(id: $orgId) {
          description
          name
          website
          wildcard (where: {id: {_is_null: false}}) {
            id @bsDecoder(fn: "toTokenIdWithDefault")
          }
          unlaunched: wildcard(where: {id: {_is_null: true}, real_wc_photos: {image: {_is_null: false}}}) {
            key
            real_wc_photos {
              image
              photographer
            }
            name
            commonName
            description
          }
          logo
          logo_badge
          youtube_vid
        }
      }
     |}
];

module LoadTopContributors = [%graphql
  {|
      query ($numberOfLeaders: Int!) {
        patrons(first: $numberOfLeaders, orderBy: patronTokenCostScaledNumerator, orderDirection: desc, where: {id_not: "NO_OWNER"}) {
          id
          patronTokenCostScaledNumerator  @bsDecoder(fn: "decodeBN")
        }
      }
  |}
];

module SubTotalRaisedOrDueQuery = [%graphql
  {|
       query {
         global(id: 1) {
           id
           totalCollectedOrDueAccurate @bsDecoder(fn: "decodeBN")
           timeLastCollected @bsDecoder(fn: "decodeBN")
           totalTokenCostScaledNumeratorAccurate @bsDecoder(fn: "decodeBN")
         }
       }
     |}
];

type graphqlDataLoad('a) =
  | Loading
  | Error(ReasonApolloHooks.ApolloHooksTypes.apolloError)
  | NoData
  | Data('a);

let getQueryPrefix = (chain: Client.context) =>
  switch (chain) {
  | MainnetQuery
  | Neither => ""
  | MaticQuery => "matic"
  };

let subscriptionResultOptionMap = (result, mapping) =>
  switch (result) {
  | ApolloHooks.Subscription.Data(response) => response->mapping->Some
  | ApolloHooks.Subscription.Error(_)
  | ApolloHooks.Subscription.Loading
  | ApolloHooks.Subscription.NoData => None
  };
let subscriptionResultToOption = result =>
  subscriptionResultOptionMap(result, a => a);

let queryResultOptionMap = (result, mapping) =>
  switch (result) {
  | ApolloHooks.Query.Data(response) => response->mapping->Some
  | ApolloHooks.Query.Error(_)
  | ApolloHooks.Query.Loading
  | ApolloHooks.Query.NoData => None
  };
let queryResultOptionFlatMap = (result, mapping) =>
  switch (result) {
  | ApolloHooks.Query.Data(response) => response->mapping
  | ApolloHooks.Query.Error(_)
  | ApolloHooks.Query.Loading
  | ApolloHooks.Query.NoData => None
  };
let queryResultToOption = result => queryResultOptionMap(result, a => a);

type data = {tokenId: string};

let useWildcardQuery = (~chain, tokenId) =>
  ApolloHooks.useQuery(
    ~context={context: chain}->createContext,
    ~variables=
      SubWildcardQuery.make(
        ~tokenId=chain->getQueryPrefix ++ tokenId->TokenId.toString,
        (),
      )##variables,
    SubWildcardQuery.definition,
  );

let useLoadTokenDataArrayQuery = tokenIdArray =>
  ApolloHooks.useQuery(
    ~variables=
      LoadTokenDataArray.make(
        ~orgArray=tokenIdArray->Array.map(id => id->TokenId.toString),
        (),
      )##variables,
    LoadTokenDataArray.definition,
  );

let useWildcardDataQuery = tokenId =>
  ApolloHooks.useQuery(
    ~variables=
      WildcardDataQuery.make(~tokenId=tokenId->TokenId.toString, ())##variables,
    WildcardDataQuery.definition,
    ~context=Client.MainnetQuery->Obj.magic,
  );
let useHomeAnimalsQuery = () =>
  ApolloHooks.useQuery(HomeAnimalsQuery.definition);
// let useBuySubscription = () =>
//   ApolloHooks.useSubscription(
//     ~variables=SubBuyEvents.make()##variables,
//     SubBuyEvents.definition,
//   );
let useStateChangeSubscription = () =>
  ApolloHooks.useSubscription(
    ~variables=SubStateChangeEvents.make()##variables,
    SubStateChangeEvents.definition,
  );

let useLoadOrganisationQuery = orgId =>
  ApolloHooks.useQuery(
    ~variables=LoadOrganisationData.make(~orgId, ())##variables,
    LoadOrganisationData.definition,
  );
// let useBuySubscriptionData = () => {
//   let (simple, _) = useBuySubscription();
//   switch (simple) {
//   | Data(response) => Some(response)
//   | _ => None
//   };
// };
let useStateChangeSubscriptionData = () => {
  let (simple, _) = useStateChangeSubscription();
  subscriptionResultToOption(simple);
};
let useLoadOrganisationData = orgId => {
  let (simple, _) = useLoadOrganisationQuery(orgId);
  queryResultToOption(simple);
};
let useLoadOrganisationLogo = orgId => {
  let result = useLoadOrganisationData(orgId);
  result
  ->Option.flatMap(org => org##organisations_by_pk)
  ->Option.map(org => org##logo);
};
let useLoadOrganisationLogoBadge = orgId => {
  let result = useLoadOrganisationData(orgId);
  result
  ->Option.flatMap(org => org##organisations_by_pk)
  ->Option.map(org => org##logo_badge |||| org##logo);
};
let useHomePageAnimalsData = () => {
  let (simple, _) = useHomeAnimalsQuery();
  queryResultToOption(simple);
};
// type wildcardData = {
//   description: string,
//   id: string,
//   name: string,
//   organisationId: string,
// };
type homePageAnimal = {
  id: TokenId.t,
  prev: TokenId.t,
  next: TokenId.t,
  // wildcardData,
};
let useHomePageAnimalArrayOpt = () => {
  useHomePageAnimalsData()
  ->oMap(homeAnimals =>
      homeAnimals##homeAnimals
      ->Array.map(animal =>
          {
            id: TokenId.fromStringUnsafe(animal##id),
            prev: TokenId.fromStringUnsafe(animal##prev),
            next: TokenId.fromStringUnsafe(animal##next),
          }
        )
    );
};
let useHomePageAnimalArray = () => {
  useHomePageAnimalArrayOpt() |||| [||];
};
let useDetailsPageNextPrevious = (currentToken: TokenId.t) => {
  let homepageAnimalData = useHomePageAnimalArray();
  let defaultValue = {
    id: TokenId.fromStringUnsafe("2"),
    next: TokenId.fromStringUnsafe("1"),
    prev: TokenId.fromStringUnsafe("0"),
  };
  let forwardNextLookup =
    React.useMemo1(
      () =>
        homepageAnimalData->Array.reduce(
          Js.Dict.empty(),
          (dict, item) => {
            dict->Js.Dict.set(item.id->TokenId.toString, item);
            dict;
          },
        ),
      [|homepageAnimalData|],
    );

  forwardNextLookup->Js.Dict.get(currentToken->TokenId.toString)
  |||| defaultValue;
};

[@decco.decode]
type animalDescription = array(string);
let useWildcardDescription = tokenId => {
  let (simple, _) = useWildcardDataQuery(tokenId);
  queryResultOptionMap(simple, a =>
    a##launchedWildcards_by_pk
    ->oMap(b =>
        b##wildcard##description
        ->animalDescription_decode
        ->Belt.Result.getWithDefault([||])
      )
    |||| [||]
  );
};

let useWildcardName = tokenId => {
  let (simple, _) = useWildcardDataQuery(tokenId);
  queryResultOptionFlatMap(simple, a =>
    a##launchedWildcards_by_pk->Option.flatMap(b => b##wildcard##name)
  );
};
let useWildcardAvatar = tokenId => {
  let (simple, _) = useWildcardDataQuery(tokenId);
  queryResultOptionFlatMap(simple, a =>
    a##launchedWildcards_by_pk->Option.flatMap(b => b##wildcard##image)
  );
};
let useRealImages = tokenId => {
  let (simple, _) = useWildcardDataQuery(tokenId);
  queryResultOptionFlatMap(simple, a =>
    a##launchedWildcards_by_pk->Option.map(b => b##wildcard##real_wc_photos)
  );
};
let useWildcardOrgId = tokenId => {
  let (simple, _) = useWildcardDataQuery(tokenId);
  queryResultOptionFlatMap(simple, a =>
    a##launchedWildcards_by_pk
    ->Option.flatMap(b => b##wildcard##organisationId)
  );
};
let useLoadTopContributors = numberOfLeaders =>
  ApolloHooks.useSubscription(
    ~variables=LoadTopContributors.make(~numberOfLeaders, ())##variables,
    LoadTopContributors.definition,
  );
let useLoadTopContributorsData = numberOfLeaders => {
  let (simple, _) = useLoadTopContributors(numberOfLeaders);

  let getLargestContributors = largestContributors => {
    let monthlyContributions =
      largestContributors##patrons
      |> Js.Array.map(patron => {
           let monthlyContribution =
             patron##patronTokenCostScaledNumerator
             ->BN.mul(BN.new_("2592000")) // A month with 30 days has 2592000 seconds
             ->BN.div(
                 // BN.new_("1000000000000")->BN.mul( BN.new_("31536000")),
                 BN.new_("31536000000000000000"),
               )
             ->Web3Utils.fromWeiBNToEthPrecision(~digits=4);
           (patron##id, monthlyContribution);
         });
    monthlyContributions;
  };

  simple->subscriptionResultOptionMap(getLargestContributors);
};
let usePatron: (~chain: Client.context, TokenId.t) => option(string) =
  (~chain, animal) => {
    let (simple, _) = useWildcardQuery(~chain, animal);
    let getAddress = response =>
      response##wildcard
      ->Belt.Option.flatMap(wildcard => Some(wildcard##owner##address));

    simple->queryResultOptionFlatMap(getAddress);
  };

let useIsAnimalOwened = (~chain, ownedAnimal) => {
  let currentAccount =
    RootProvider.useCurrentUser()
    ->Belt.Option.mapWithDefault("loading", a => a);

  let currentPatron =
    usePatron(~chain, ownedAnimal)
    ->Belt.Option.mapWithDefault("no-patron-defined", a => a);

  currentAccount->Js.String.toLowerCase
  == currentPatron->Js.String.toLocaleLowerCase;
};

let useTimeAcquired:
  (~chain: Client.context, TokenId.t) => option(MomentRe.Moment.t) =
  (~chain, animal) => {
    let (simple, _) = useWildcardQuery(~chain, animal);
    let getTimeAquired = response =>
      response##wildcard
      ->Belt.Option.mapWithDefault(MomentRe.momentNow(), wildcard
          // wildcard
          => wildcard##timeAcquired);

    simple->queryResultOptionMap(getTimeAquired);
  };

let useQueryPatron = (~chain, patron) =>
  ApolloHooks.useQuery(
    ~context={context: chain}->createContext,
    ~variables=
      LoadPatron.make(~patronId=chain->getQueryPrefix ++ patron, ())##variables,
    LoadPatron.definition,
  );

let useQueryPatronNew = patron =>
  ApolloHooks.useQuery(
    ~variables=LoadPatron.make(~patronId=patron, ())##variables,
    LoadPatron.definition,
  );

let useForeclosureTimeBn = (~chain, patron) => {
  let (simple, _) = useQueryPatron(~chain, patron);
  let getForclosureTime = response =>
    response##patron->Belt.Option.map(patron => patron##foreclosureTime);

  simple->queryResultOptionFlatMap(getForclosureTime);
};

let useForeclosureTime = (~chain, patron) => {
  useForeclosureTimeBn(~chain, patron)->Option.map(Helper.bnToMoment);
};

let usePatronQuery = (~chain, patron) => {
  let (simple, _) = useQueryPatron(~chain, patron);

  simple->queryResultToOption;
};
let useTimeAcquiredWithDefault = (~chain, animal, default: MomentRe.Moment.t) =>
  useTimeAcquired(~chain, animal) |||| default;
let useDaysHeld = (~chain, tokenId) =>
  useTimeAcquired(~chain, tokenId)
  ->oMap(moment =>
      (MomentRe.diff(MomentRe.momentNow(), moment, `days), moment)
    );
let useTotalCollectedOrDue: unit => option((BN.t, BN.t, BN.t)) =
  () => {
    let (simple, _) =
      ApolloHooks.useQuery(SubTotalRaisedOrDueQuery.definition);
    let getTotalCollected = response =>
      response##global
      ->oMap(global =>
          (
            global##totalCollectedOrDueAccurate,
            global##timeLastCollected,
            global##totalTokenCostScaledNumeratorAccurate,
          )
        );

    simple->queryResultOptionFlatMap(getTotalCollected);
  };

let getCurrentTimestamp = () =>
  string_of_int(Js.Math.floor(Js.Date.now() /. 1000.));

let useCurrentTime = () => {
  let (currentTime, setTimeLeft) =
    React.useState(() => getCurrentTimestamp());

  React.useEffect1(
    () => {
      let interval =
        Js.Global.setInterval(
          () => {setTimeLeft(_ => {getCurrentTimestamp()})},
          2000,
        );
      Some(() => Js.Global.clearInterval(interval));
    },
    [|setTimeLeft|],
  );
  currentTime;
};
let useCurrentTimestampBn = () => {
  useCurrentTime()->BN.new_;
};
let useAmountRaised = () => {
  let currentTimestamp = useCurrentTime();

  useTotalCollectedOrDue()
  ->oMap(
      (
        (
          amountCollectedOrDue,
          timeCalculated,
          totalTokenCostScaledNumeratorAccurate,
        ),
      ) => {
      let timeElapsed = BN.new_(currentTimestamp)->BN.sub(timeCalculated);

      let amountRaisedSinceLastCollection =
        totalTokenCostScaledNumeratorAccurate
        ->BN.mul(timeElapsed)
        ->BN.div(
            // BN.new_("1000000000000")->BN.mul( BN.new_("31536000")),
            BN.new_("31536000000000000000"),
          );
      amountCollectedOrDue->BN.add(amountRaisedSinceLastCollection);
    });
};

let useTotalCollectedToken:
  (~chain: Client.context, TokenId.t) => option((Eth.t, BN.t, BN.t)) =
  (~chain, animal) => {
    let (simple, _) = useWildcardQuery(~chain, animal);
    let getTotalCollectedData = response =>
      response##wildcard
      ->oMap(wc =>
          (
            wc##totalCollected,
            wc##timeCollected,
            wc##patronageNumeratorPriceScaled,
          )
        );

    simple->queryResultOptionFlatMap(getTotalCollectedData);
  };

let useTotalCollectedTokenArray = animalArray => {
  let (simple, _) = useLoadTokenDataArrayQuery(animalArray);
  simple->queryResultToOption;
};

let usePatronageNumerator = (~chain, tokenId: TokenId.t) => {
  let (simple, _) = useWildcardQuery(~chain, tokenId);
  let patronageNumerator = response =>
    response##wildcard
    ->Belt.Option.map(wildcard => wildcard##patronageNumerator);

  simple->queryResultOptionFlatMap(patronageNumerator);
};

// TODO: fix this, this is a hardcoded pledgerate. It should be fetched from the graph!
let usePledgeRate = (~chain, tokenId) => {
  let optPatronageNumerator = usePatronageNumerator(~chain, tokenId);
  React.useMemo1(
    () => {
      switch (optPatronageNumerator) {
      | Some(patronageNumerator) =>
        let result = patronageNumerator |/| BN.new_("12000000000");
        result->BN.toNumberFloat /. 1000.;
      | None => 0.
      }
    },
    [|optPatronageNumerator|],
  );
};

let usePledgeRateDetailed = (~chain, tokenId) => {
  let pledgeRate = usePledgeRate(~chain, tokenId);
  let inversePledgeRate = 1. /. pledgeRate;
  let numeratorOverYear = (pledgeRate *. 1200.)->Float.toInt->string_of_int;
  (numeratorOverYear, "100", pledgeRate, inversePledgeRate);
};

type patronLoyaltyTokenDetails = {
  currentLoyaltyTokens: Eth.t,
  currentLoyaltyTokensIncludingUnredeemed: Eth.t,
  lastCollected: BN.t,
  numberOfAnimalsOwned: BN.t,
};
let usePatronLoyaltyTokenDetails = (~chain, address) => {
  // NOTE: we are using both 'new patron' and 'patron' because the work on the graph is incomplete.
  let (response, _) = useQueryPatron(~chain, address);

  [@ocaml.warning "-4"]
  (
    switch (response) {
    | Data(dataPatron) =>
      switch (dataPatron##patron) {
      | Some(patron) =>
        Some({
          currentLoyaltyTokens: patron##totalLoyaltyTokens,
          currentLoyaltyTokensIncludingUnredeemed:
            patron##totalLoyaltyTokensIncludingUnRedeemed,
          lastCollected: patron##lastUpdated,
          numberOfAnimalsOwned:
            BN.new_(patron##tokens->Obj.magic->Array.length->string_of_int),
        })
      | _ => None
      }
    // | Loading
    // | Error(_error)
    // | NoData => None
    | _ => None
    }
  );
};

// TODO:: Take min of total deposit and amount raised
let useAmountRaisedToken: (~chain: Client.context, TokenId.t) => option(Eth.t) =
  (~chain, animal) => {
    let currentTimestamp = useCurrentTime();

    switch (useTotalCollectedToken(~chain, animal)) {
    | Some((
        amountCollectedOrDue,
        timeCalculated,
        patronageNumeratorPriceScaled,
      )) =>
      let timeElapsed = BN.new_(currentTimestamp)->BN.sub(timeCalculated);

      let amountRaisedSinceLastCollection =
        patronageNumeratorPriceScaled
        ->BN.mul(timeElapsed)
        ->BN.div(
            // BN.new_("1000000000000")->BN.mul( BN.new_("31536000")),
            BN.new_("31536000000000000000"),
          );

      Some(amountCollectedOrDue->BN.add(amountRaisedSinceLastCollection));
    | None => None
    };
  };
let calculateTotalRaised =
    (
      currentTimestamp,
      (amountCollectedOrDue, timeCalculated, patronageNumeratorPriceScaled),
    ) => {
  let timeElapsed = BN.new_(currentTimestamp)->BN.sub(timeCalculated);

  let amountRaisedSinceLastCollection =
    patronageNumeratorPriceScaled
    ->BN.mul(timeElapsed)
    ->BN.div(
        // BN.new_("1000000000000")->BN.mul( BN.new_("31536000")),
        BN.new_("31536000000000000000"),
      );

  amountCollectedOrDue->BN.add(amountRaisedSinceLastCollection);
};
let useTotalRaisedAnimalGroup: array(TokenId.t) => option(Eth.t) =
  animals => {
    let currentTimestamp = useCurrentTime();

    let details = useTotalCollectedTokenArray(animals);
    // let detailsArray = details##wildcards;
    switch (details) {
    | Some(detailsArray) =>
      Some(
        detailsArray##wildcards
        ->Array.reduce(BN.new_("0"), (acc, animalDetails) =>
            calculateTotalRaised(
              currentTimestamp,
              (
                animalDetails##totalCollected,
                animalDetails##timeCollected,
                animalDetails##patronageNumeratorPriceScaled,
              ),
            )
            |+| acc
          ),
      )
    | None => None
    };
  };

let useTimeSinceTokenWasLastSettled:
  (~chain: Client.context, TokenId.t) => option(BN.t) =
  (~chain, animal) => {
    let currentTimestamp = useCurrentTime();

    switch (useTotalCollectedToken(~chain, animal)) {
    | Some((_, timeCalculated, _)) =>
      let timeElapsed = BN.new_(currentTimestamp)->BN.sub(timeCalculated);

      Some(timeElapsed);
    | None => None
    };
  };

let useUnredeemedLoyaltyTokenDueFromWildcard:
  (~chain: Client.context, TokenId.t) => option(Eth.t) =
  (~chain, animal) => {
    switch (useTimeSinceTokenWasLastSettled(~chain, animal)) {
    | Some(timeSinceTokenWasLastSettled) =>
      let totalLoyaltyTokensPerSecondPerAnimal = BN.new_("11574074074074");
      let totalLoyaltyTokensForAllAnimals =
        timeSinceTokenWasLastSettled |*| totalLoyaltyTokensPerSecondPerAnimal;
      Some(totalLoyaltyTokensForAllAnimals);
    | None => None
    };
  };
let useTotalLoyaltyToken:
  (~chain: Client.context, Web3.ethAddress) => option((Eth.t, Eth.t)) =
  (~chain, patron) => {
    let currentTimestamp = useCurrentTime();

    switch (usePatronLoyaltyTokenDetails(~chain, patron)) {
    | Some({
        currentLoyaltyTokens,
        currentLoyaltyTokensIncludingUnredeemed,
        lastCollected,
        numberOfAnimalsOwned,
      }) =>
      let timeElapsed = BN.new_(currentTimestamp) |-| lastCollected;
      // Reference: https://github.com/wild-cards/contracts-private/blob/v2testing/migrations/7_receipt_tokens.js#L6
      let totalLoyaltyTokensPerSecondPerAnimal = BN.new_("11574074074074");
      let totalLoyaltyTokensFor1Animal =
        totalLoyaltyTokensPerSecondPerAnimal |*| timeElapsed;
      let totalLoyaltyTokensForAllAnimals =
        numberOfAnimalsOwned |*| totalLoyaltyTokensFor1Animal;
      let totalLoyaltyTokensForUser =
        currentLoyaltyTokensIncludingUnredeemed
        |+| totalLoyaltyTokensForAllAnimals;
      Some((totalLoyaltyTokensForUser, currentLoyaltyTokens));
    | None => None
    };
  };

let useRemainingDeposit:
  (~chain: Client.context, string) => option((Eth.t, BN.t, BN.t)) =
  (~chain, patron) => {
    let (simple, _) = useQueryPatron(~chain, patron);

    let getRemainingDepositData = response =>
      response##patron
      ->oMap(wc =>
          (
            wc##availableDeposit,
            wc##lastUpdated,
            wc##patronTokenCostScaledNumerator,
          )
        );

    simple->queryResultOptionFlatMap(getRemainingDepositData);
  };

// TODO:: Take min of total deposit and amount raised
let useRemainingDepositEth: (~chain: Client.context, string) => option(Eth.t) =
  (~chain, patron) => {
    let currentTimestamp = useCurrentTime();

    switch (useRemainingDeposit(~chain, patron)) {
    | Some((availableDeposit, lastUpdated, patronTokenCostScaledNumerator)) =>
      let timeElapsed = BN.new_(currentTimestamp)->BN.sub(lastUpdated);

      let amountRaisedSinceLastCollection =
        patronTokenCostScaledNumerator
        ->BN.mul(timeElapsed)
        ->BN.div(
            // BN.new_("1000000000000")->BN.mul( BN.new_("31536000")),
            BN.new_("31536000000000000000"),
          );
      Some(availableDeposit->BN.sub(amountRaisedSinceLastCollection));
    | None => None
    };
  };

type animalPrice =
  | Foreclosed(BN.t)
  | Price(Eth.t)
  | Loading;

let usePrice: (~chain: Client.context, TokenId.t) => animalPrice =
  (~chain, animal) => {
    let (simple, _) = useWildcardQuery(~chain, animal);
    let optCurrentPatron = usePatron(~chain, animal);
    let currentPatron =
      optCurrentPatron->Belt.Option.mapWithDefault("no-patron-defined", a =>
        a
      );
    let foreclosureTime = useForeclosureTimeBn(~chain, currentPatron);

    let currentTime = useCurrentTime();

    switch (simple) {
    | Data(response) =>
      let priceValue =
        response##wildcard
        ->Belt.Option.mapWithDefault(Eth.makeFromInt(0), wildcard =>
            wildcard##price##price
          );

      switch (optCurrentPatron, foreclosureTime) {
      | (Some(_currentPatron), Some(foreclosureTime)) =>
        if (foreclosureTime->BN.lt(currentTime->BN.new_)) {
          Foreclosed(foreclosureTime);
        } else {
          Price(priceValue);
        }
      | (Some(_), None) => Price(priceValue)
      | _ => Loading
      };
    | Error(_)
    | Loading
    | NoData => Loading
    };
  };

let useIsForeclosed = (~chain, currentPatron) => {
  let optAvailableDeposit = useRemainingDepositEth(~chain, currentPatron);

  optAvailableDeposit->Option.mapWithDefault(true, availableDeposit => {
    !availableDeposit->BN.gt(BN.new_("0"))
  });
};

let useAuctionStartPrice = (_tokenId: TokenId.t) => {
  BN.new_(
    "1000000000000000000" // auction starts at 1 eth
  );
};
let useAuctionEndPrice = (_tokenId: TokenId.t) => {
  BN.new_(
    "20000000000000000" // auction ends at 0.02 eth
  );
};
let useAuctioLength = (_tokenId: TokenId.t) => {
  BN.new_(
    "604800" // 1 week
  );
};
let useLaunchTimeBN = (~chain, tokenId: TokenId.t) => {
  let (simple, _) = useWildcardQuery(~chain, tokenId);

  switch (simple) {
  | Data(response) =>
    response##wildcard->Belt.Option.map(wildcard => wildcard##launchTime)
  | Error(_)
  | Loading
  | NoData => None
  };
};

let useMaticStateQuery = (~forceRefetch, address, network) =>
  ApolloHooks.useQuery(
    ~variables=MaticStateQuery.make(~address, ~network, ())##variables,
    ~fetchPolicy=
      forceRefetch
        ? ReasonApolloHooks.ApolloHooksTypes.CacheAndNetwork
        : ReasonApolloHooks.ApolloHooksTypes.CacheFirst,
    ~context=Client.MainnetQuery->Obj.magic,
    MaticStateQuery.definition,
  );
let useMaticState = (~forceRefetch, address, network) => {
  let (simple, _) = useMaticStateQuery(~forceRefetch, address, network);
  Js.log2("Matic state", simple);
  switch (simple) {
  | Data(response) => Some(response##maticState)
  | Error(_)
  | Loading
  | NoData => None
  };
};
