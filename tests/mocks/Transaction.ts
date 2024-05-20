import {
  ITransaction,
  TransactionStatus,
} from "@/services/wallet/dfns/schemas";

const mockTransaction: ITransaction = {
  amount: 20,
  assetAccountId: "aa-river-monkey-1ee693d237",
  assetSymbol: "EUR",
  dateCreated: "2022-10-31T11:19:11.864Z",
  externalId: "test",
  id: "pa-ack-orange-foxtrot-6a2218500e",
  initiator: {
    piKeyId: "api-cola-grey-78eec37d8f",
    kind: "ApiKey",
    orgId: "or-freddie-violet-3d4783b6394c",
  },
  narrative: "test",
  note: "test tx",
  orgId: "or-freddie-violet-3d4783b6394c",
  receiver: {
    kind: "DfnsAssetAccount",
    id: "aa-bacon-ten-6790648375",
  },
  receiverAddress: "0x091ce0F2dB37bB9B9D8E23197875B121f0aaCcBa",
  status: TransactionStatus.executed,
  txHash: "0x3b820d25c7a71c3770ec555830c6af0ed1dd39164b28863373e511b9e4fef2df",
};

export { mockTransaction };
