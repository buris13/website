import { ApiPromise, WsProvider } from 'https://cdn.jsdelivr.net/npm/@polkadot/api@12.3.1/+esm';
// // ----- POLKADOT ----- //

async function getValidatorsByAddr(elementStatus, wsUrl, addressFilter) {
  const statusElements = document.querySelectorAll(elementStatus);
  const provider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider });

  const validators = await api.query.session.validators();
  const validatorAddresses = validators.toArray();

  const filteredValidators = validatorAddresses.filter((address) =>
    address.toString() === addressFilter
  );

  const identities = await Promise.all(
    filteredValidators.map((address) => api.derive.accounts.info(address))
  );

  statusElements.forEach((element) => {
    // Default status is offline
    element.style.backgroundColor = 'red';
    element.innerHTML = `<b class='textStatus'>Offline</b>`;
  });

  identities.forEach(({ accountId }) => {
    const valPolkadot = `${accountId}`;
    console.log(`atas: ${valPolkadot}`);
    console.log(valPolkadot === addressFilter);

    if (valPolkadot === addressFilter) {
      // Ubah status menjadi online untuk elemen yang cocok
      statusElements.forEach((element) => {
        element.style.backgroundColor = '#4dbd37';
        element.innerHTML = `<b class='textStatus'>Online</b>`;
      });
    }
  });
}

  // ----- END OF POLKADOT ----- //

//Register
getValidatorsByAddr('#tangle .status','wss://rpc.tangle.tools', 'tgD2LhGfoQEaCWTqgu3vJA6buVCuPiXGqVq1KUzQP5UcrcKgC').catch(console.error); 

