/* Tab div */
function opentab(event, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }

  document.getElementById(tabName).style.display = "flex";
  event.currentTarget.className += " active";
}
document.getElementById("Testnetbtn").click();

// Div Order
document.addEventListener("DOMContentLoaded", sortDivs);

function sortDivs() {
  let mainDiv = document.getElementById("Testnet"),
      divs = mainDiv.children,
      divsArray = [...divs];
  
  // Sort divs by id
  let idList = divsArray.map(div => div.id).sort();

  idList.forEach(id => {
    divsArray.forEach(div => {
      if (div.id == id) {
        mainDiv.appendChild(div);
      }
    });
  });
}

// /* Function Status online cosmos/ibc */
async function getValidatorStatus(elementStatus, apiUrl, validatorAddress) {
  const statusElement = document.querySelectorAll(elementStatus);
  try {
      const response = await axios.get(apiUrl + validatorAddress);
      const validator = response.data.validator;

      if (validator.jailed) {
        statusElement.forEach((statusElement) => {
          statusElement.style.backgroundColor = '#647182';
          statusElement.innerHTML = `<b class='textStatus'>Jailed</b>`;
        });
        return 'jailed';
      } else if (validator.status === 'BOND_STATUS_BONDED') {
        statusElement.forEach((statusElement) => {
          statusElement.style.backgroundColor = '#4dbd37';
          statusElement.innerHTML = `<b class='textStatus'>Online</b>`;
        });
        return 'online';
      } else if (validator.jailed === false && validator.status === 'BOND_STATUS_UNBONDING') {
          statusElement.forEach((statusElement) => {
            statusElement.style.backgroundColor = '#4891f0';
            statusElement.innerHTML = `<b class='textStatus'>Inactive</b>`;
          });
        return 'validator inactive';
      } else {
        return 'unexpected';
      }
  } catch (error) {
      console.error('Error fetching validator data:', error);
      statusElement.forEach((statusElement) => {
        statusElement.style.backgroundColor = 'red';
        statusElement.innerHTML = `<b class='textStatus'>Offline</b>`;
      });
    return 'ofline';  }
}

// ----- COSMOS ------//

// Emperia
const empeElement = '#empe .status';
const empeUrl = 'https://lcd-testnet.empe.io/cosmos/staking/v1beta1/validators/';
const empeValoper = 'empevaloper1z46frsm6qhfjjjyg8sswt5tzst50um7sz0n8ax'; 
getValidatorStatus(empeElement, empeUrl, empeValoper).then(status => {
    console.log(`Validator is currently ${status}`);
});

//Symphony
const symphonyElement = '#symphony .status';
const symphonyUrl = 'https://symphony-api.kleomedes.network/cosmos/staking/v1beta1/validators/';
const symphonyValoper = 'symphonyvaloper1znzcuu2k795pr3ahhn2nptnvt6trfwec7kt2gx'
getValidatorStatus(symphonyElement, symphonyUrl, symphonyValoper).then(status => {
  console.log(`Validator is currently ${status}`);
});

// Entangle
const entangleElement = '#entangle .status';
const entangleUrl = 'https://api-t.entangle.nodestake.top/cosmos/staking/v1beta1/validators/';
const entangleValoper = 'entvaloper1znzcuu2k795pr3ahhn2nptnvt6trfwec7kt2gx'
getValidatorStatus(entangleElement, entangleUrl, entangleValoper).then(status => {
  console.log(`Validator is currently ${status}`);
});

// Selfchain
getValidatorStatus('#selfchain .status', 'https://api-devnet.selfchain.xyz', 'selfvaloper1znzcuu2k795pr3ahhn2nptnvt6trfwec7kt2gx')

//


// ----- End of Cosmos -----//

// ----- ario ----- //
async function getGatewayStatus(elementStatus) {
  const statusElement = document.querySelectorAll(elementStatus);
  try {
    const gatewayLink = 'https://dasamuka.cloud/ar-io/info';
    const response = await axios.get(gatewayLink);
    const responseStatus = response.status;
    console.log(response.status);
    if (responseStatus === 200) {
      statusElement.forEach((statusElement) => {
        statusElement.style.backgroundColor = '#4dbd37';
        statusElement.innerHTML = `<b class='textStatus'>Online</b>`;
      });
    } else {
      statusElement.forEach((statusElement) => {
        statusElement.style.backgroundColor = 'red';
        statusElement.innerHTML = `<b class='textStatus'>Offline</b>`;
      });
    }
  }catch (error) {
    console.error ("failed:", error);
  }
}
const arioElement = '#ario .status';
getGatewayStatus(arioElement)

// ----- End of Ario ---- //

