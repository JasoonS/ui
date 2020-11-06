// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Ethers from "ethers";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as DaiJson from "./abi/dai.json";
import * as BiconomyExec from "./biconomy-exec";
import * as Erc712$WildCards from "./Erc712.bs.js";
import * as ContractUtil$WildCards from "./ContractUtil.bs.js";

function getDaiContract(daiAddress, stewardAbi, library, account) {
  return new Ethers.Contract(daiAddress, stewardAbi, ContractUtil$WildCards.getProviderOrSigner(library, account, false));
}

var daiAbi = DaiJson.dai;

function getNonce(daiContractAddress, library, account) {
  var daiContract = getDaiContract(daiContractAddress, daiAbi, library, account);
  var callDai = (async (daiContract) => {
      try {
        let result = await daiContract.getNonce("0xd3Cbce59318B2E570883719c8165F9390A12BdD6");
        console.log("the result", result)
      } catch (e) {
        console.log("the error:", e);
      }
    });
  callDai(daiContract);
  return daiContract.getNonce(Belt_Option.getWithDefault(account, "0x0"));
}

function createPermitSig(provider, verifyingContract, nonce, chainId, holder, spender, from) {
  var domain_salt = "0x" + chainId.toString(16).padStart(64, "0");
  var domain = {
    name: "(PoS) Dai Stablecoin",
    version: "1",
    verifyingContract: verifyingContract,
    salt: domain_salt
  };
  var message = {
    holder: holder,
    spender: spender,
    nonce: nonce,
    expiry: 0,
    allowed: true
  };
  var data = {
    types: {
      EIP712Domain: Erc712$WildCards.eip712Domain,
      Permit: Erc712$WildCards.permit
    },
    domain: domain,
    primaryType: "Permit",
    message: message
  };
  var dataString = Belt_Option.getWithDefault(JSON.stringify(data), "");
  var exampleRpcDefinition_params = [
    from,
    dataString
  ];
  var exampleRpcDefinition = {
    method: "eth_signTypedData_v3",
    params: exampleRpcDefinition_params,
    from: from
  };
  return new Promise((function (resolve, reject) {
                provider.sendAsync(exampleRpcDefinition, (function (err, result) {
                        if (err == null) {
                          var sigString = result.result;
                          return resolve(ContractUtil$WildCards.getEthSig(sigString));
                        }
                        console.log("There was an error", err);
                        return reject(err);
                      }));
                
              }));
}

var buyWithPermit = BiconomyExec.buyWithPermit;

var buyAuctionWithPermit = BiconomyExec.buyAuctionWithPermit;

export {
  getDaiContract ,
  daiAbi ,
  getNonce ,
  createPermitSig ,
  buyWithPermit ,
  buyAuctionWithPermit ,
  
}
/* daiAbi Not a pure module */
