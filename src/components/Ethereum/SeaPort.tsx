import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';

const msgParams = {
  types: {
    OrderComponents: [
      {
        name: 'offerer',
        type: 'address',
      },
      {
        name: 'zone',
        type: 'address',
      },
      {
        name: 'offer',
        type: 'OfferItem[]',
      },
      {
        name: 'consideration',
        type: 'ConsiderationItem[]',
      },
      {
        name: 'orderType',
        type: 'uint8',
      },
      {
        name: 'startTime',
        type: 'uint256',
      },
      {
        name: 'endTime',
        type: 'uint256',
      },
      {
        name: 'zoneHash',
        type: 'bytes32',
      },
      {
        name: 'salt',
        type: 'uint256',
      },
      {
        name: 'conduitKey',
        type: 'bytes32',
      },
      {
        name: 'counter',
        type: 'uint256',
      },
    ],
    OfferItem: [
      {
        name: 'itemType',
        type: 'uint8',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'identifierOrCriteria',
        type: 'uint256',
      },
      {
        name: 'startAmount',
        type: 'uint256',
      },
      {
        name: 'endAmount',
        type: 'uint256',
      },
    ],
    ConsiderationItem: [
      {
        name: 'itemType',
        type: 'uint8',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'identifierOrCriteria',
        type: 'uint256',
      },
      {
        name: 'startAmount',
        type: 'uint256',
      },
      {
        name: 'endAmount',
        type: 'uint256',
      },
      {
        name: 'recipient',
        type: 'address',
      },
    ],
    EIP712Domain: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'version',
        type: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'address',
      },
    ],
  },
  domain: {
    name: 'Seaport',
    version: '1.1',
    chainId: 5,
    verifyingContract: '0x00000000006c3852cbef3e08e8df289169ede581',
  },
  primaryType: 'OrderComponents',
  message: {
    offerer: '0x6532c00c3a573c8cce0a55870faa9d95015f9317',
    zone: '0x004c00500000ad104d7dbd00e3ae0a5c00560c00',
    offer: [
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '118',
        startAmount: '1',
        endAmount: '1',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '227',
        startAmount: '1',
        endAmount: '1',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '1596',
        startAmount: '1',
        endAmount: '1',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '2255',
        startAmount: '1',
        endAmount: '1',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '2647',
        startAmount: '1',
        endAmount: '1',
      },
    ],
    consideration: [
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '118',
        startAmount: '1',
        endAmount: '1',
        recipient: '0xa2682acab74e02200e8fa1da28b8b9524aba8884',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '227',
        startAmount: '1',
        endAmount: '1',
        recipient: '0xa2682acab74e02200e8fa1da28b8b9524aba8884',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '1596',
        startAmount: '1',
        endAmount: '1',
        recipient: '0xa2682acab74e02200e8fa1da28b8b9524aba8884',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '2255',
        startAmount: '1',
        endAmount: '1',
        recipient: '0xa2682acab74e02200e8fa1da28b8b9524aba8884',
      },
      {
        itemType: '2',
        token: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
        identifierOrCriteria: '2647',
        startAmount: '1',
        endAmount: '1',
        recipient: '0xa2682acab74e02200e8fa1da28b8b9524aba8884',
      },
    ],
    orderType: '0',
    startTime: '1671197665',
    endTime: '1678848855',
    zoneHash:
      '0x3000000000000000000000000000000000000000000000000000000000000000',
    salt: '184900918146050926665155656250385666469',
    conduitKey:
      '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
    counter: '0',
  },
};

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
      name: 'SeaPort',
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
            title: 'OpenSea - SeaPort',
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
