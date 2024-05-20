import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import {
  CertificateClient,
  WellKnownIssuer,
} from "@azure/keyvault-certificates";

const getSecret = async (secretName, keyVaultName) => {
  if (!secretName || !keyVaultName) {
    throw Error("getSecret: Required params missing");
  }

  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    throw Error("KeyVault can't use DefaultAzureCredential");
  }

  const credential = new DefaultAzureCredential();

  // Build the URL to reach your key vault
  const url = `https://${keyVaultName}.vault.azure.net`;

  try {
    // Create client to connect to service
    const client = new SecretClient(url, credential);

    // Get secret Obj
    const latestSecret = await client.getSecret(secretName);
    const rValue = latestSecret.value;
    // Return value
    return rValue;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const importCert = async (keyVaultName, pfx) => {
  const credential = new DefaultAzureCredential();

  // Build the URL to reach your key vault
  const url = `https://${keyVaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);
  try {
    const importedCertificate = await client.importCertificate(
      `bankid-test-cer`,
      Buffer.from(pfx, "base64"),
      {
        policy: {
          contentType: "application/x-pkcs12",
          issuerName:
            "C=SE, O=Testbank A AB (publ), SERIALNUMBER=111111111111, CN=Testbank A RP CA v1 for BankID Test",
          subject:
            "C=SE, O=Testbank A AB (publ), SERIALNUMBER=5566304928, CN=FP Testcert 3",
        },
      }
    );

    return importedCertificate;
  } catch (error) {
    throw error;
  }
};

const getAllCerts = async (keyVaultName) => {
  const credential = new DefaultAzureCredential();

  // Build the URL to reach your key vault
  const url = `https://${keyVaultName}.vault.azure.net`;
  const client = new CertificateClient(url, credential);
  for await (const certificateProperties of client.listPropertiesOfCertificates()) {
    const cert = await getSecret(certificateProperties.name, keyVaultName);
    const buffer = Buffer.from(cert, "base64");
    const bufferRegular = Buffer.from(cert);
  }
};

const getCert = async (certificateName, keyVaultName) => {
  const credential = new DefaultAzureCredential();

  // Build the URL to reach your key vault
  const url = `https://${keyVaultName}.vault.azure.net`;

  try {
    // Lastly, create our certificates client and connect to the service
    // const secretClient = new SecretClient(url, credential);
    // const cert = await secretClient.getSecret(certificateName);
    const client = new CertificateClient(url, credential);
    const cert = await client.getCertificate(certificateName);
    return cert.cer;
  } catch (error) {
    throw error;
  }
};

export { getSecret, getCert, importCert, getAllCerts };
