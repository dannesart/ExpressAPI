import { ICurrency } from "@/schema/wallet/currency";

export enum currencyNames {
  eure = "EURe",
  usde = "USDe",
}

export enum currencyAssetSymbol {
  eure = "EUR",
  usde = "USD",
}

export const currencies: ICurrency[] = [
  {
    name: currencyNames.eure,
    value: currencyNames.eure,
    assetSymbol: currencyAssetSymbol.eure,
  },
  {
    name: currencyNames.usde,
    value: currencyNames.usde,
    assetSymbol: currencyAssetSymbol.usde,
  },
];
