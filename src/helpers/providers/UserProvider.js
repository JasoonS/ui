import React, { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "../hooks/Hooks.bs"
export const UserInfoContext = createContext("");

export const UserInfoProvider = ({ children }) => {
  const currentUserEthAddress = useCurrentUser()
  const [userProvider, setUserProvider] = useState({ verifications: {} });

  const updateUserProvider = currentUserEthAddress => {
    let currentUserEthAddressLower = currentUserEthAddress.toLowerCase()

    if (userProvider.verifications[currentUserEthAddressLower] === undefined) {
      console.log(userProvider)
      setUserProvider({
        ...userProvider,
        verifications:
        {
          ...userProvider.verifications,
          [currentUserEthAddressLower]: {}
        }
      })
    }

    // TODO: should try to catch any errors here with this request.
    fetch(`http://34.65.206.129:5000/verification/${currentUserEthAddress}`).then(async result => {
      let resultJson = await result.json()

      setUserProvider({
        ...userProvider,
        verifications:
        {
          ...userProvider.verifications,
          [currentUserEthAddress.toLowerCase()]: {
            twitter: resultJson.success ? resultJson.verification.twitterVerification.handle : undefined
          }
        }
      })
    })
  }

  useEffect(() => {
    if (!!currentUserEthAddress && currentUserEthAddress !== "") {
      updateUserProvider(currentUserEthAddress)
    }
    console.log('always print', currentUserEthAddress)
  }, [currentUserEthAddress])

  return (
    <UserInfoContext.Provider
      value={{ ...userProvider, update: updateUserProvider }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => useContext(UserInfoContext);

export default UserInfoProvider;