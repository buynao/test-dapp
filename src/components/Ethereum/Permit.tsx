import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';

const msgParams = {
    "types": {
        "Permit": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            },
            {
                "name": "nonce",
                "type": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "EIP712Domain": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "version",
                "type": "string"
            },
            {
                "name": "chainId",
                "type": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address"
            }
        ]
    },
    "domain": {
        "name": "Tokenlon",
        "version": "1",
        "chainId": 5,
        "verifyingContract": "0x6da0e6abd44175f50c563cd8b860dd988a7c3433"
    },
    "primaryType": "Permit",
    "message": {
        "owner": "0x068e866a5b6a968599c353ee359442ec7bbc9b61",
        "spender": "0x235d9b4249e9c9d705fac6e98f7d21e58091220a",
        "value": "100000000000000000000",
        "nonce": "52",
        "deadline": "1690792519"
    }
}

function SignTypeData() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(jsonString(msgParams.message));
  const [domain, setDomain] = React.useState(jsonString(msgParams.domain));
  const [types, setTypes] = React.useState(jsonString(msgParams.types));
  const [type, setType] = React.useState(msgParams.primaryType);
  const { signTypedData, ...data } = useSignTypedData({
    domain: jsonParse(domain),
    primaryType: type,
    types: jsonParse(types),
    message: jsonParse(message),
  });
  const buttons = [
    {
      name: 'permit',
      disabled: !address,
      onClick: () => {
        signTypedData();
      },
    },
    {
      name: 'data reset',
      disabled: !address,
      onClick: () => {
        setMessage(jsonString(msgParams.message));
        setDomain(jsonString(msgParams.domain));
        setTypes(jsonString(msgParams.types));
        setType(msgParams.primaryType);
      },
    },
  ];
  return (
    <React.Fragment>
      <BasicCard
        buttons={buttons}
        list={[
          {
            type: 'title',
            title: 'TokenLon - Permit',
          },
          {
            type: 'textArea',
            title: 'Domain',
            label: 'Domain',
            value: domain,
            rows: 8,
            setValue: setDomain,
          },
          {
            type: 'input',
            label: 'primaryType',
            value: type,
            setValue: setType,
          },
          {
            type: 'textArea',
            title: 'Types',
            label: 'Types',
            value: types,
            setValue: setTypes,
          },
          {
            type: 'textArea',
            title: 'Message',
            label: 'Message',
            value: message,
            setValue: setMessage,
          },
          {
            type: 'content',
            title: 'Result',
            content: getValueByContract(data),
          },
        ]}
      />
    </React.Fragment>
  );
}

export default SignTypeData;
