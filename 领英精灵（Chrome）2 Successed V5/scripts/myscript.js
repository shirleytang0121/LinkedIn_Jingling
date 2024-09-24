const urlsToMonitor = [
  "https://www.linkedin.com/voyager/api/relationships/myNetworkNotifications",
  "https://www.linkedin.com/voyager/api/voyagerMessagingGraphQL/graphql?queryId=messengerMessages*",
  "https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessageDeliveryAcknowledgements?action=sendDeliveryAcknowledgement",
  // Add more URLs as needed
];

// Function to log request headers and payload
function logRequestDetails(details) {
  console.log('Request URL:', details.url);
  console.log('Request Payload:', details.requestBody ? decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))) : null);
}

// Function to log response details
function logResponseDetails(details) {
  console.log('Response URL:', details.url);
  console.log('Response Headers:', details.responseHeaders);

  // Check if the response has content
  if (details.response && details.response.content) {
    // Find the content-type header to identify the response format
    const contentTypeHeader = details.response.headers.find(header => header.name.toLowerCase() === 'content-type');
    if (contentTypeHeader && contentTypeHeader.value.startsWith('application/vnd.linkedin.normalized+json+2.1')) {
      // Check if the response is gzipped
      const contentEncodingHeader = details.response.headers.find(header => header.name.toLowerCase() === 'content-encoding');
      if (contentEncodingHeader && contentEncodingHeader.value.toLowerCase() === 'gzip') {
        // Decode the gzipped response
        const encodedData = details.response.content.text;
        const decodedResponse = atob(encodedData);
        
        // Parse the response text
        const responseText = JSON.parse(decodedResponse);
        
        // Log the parsed response text
        console.log('Parsed Response Text:', responseText);
      } else {
        // If not gzipped, parse the response text directly
        const responseText = JSON.parse(details.response.content.text);
        console.log('Parsed Response Text:', responseText);
      }
    } else {
      console.log('Response Body: [No application/json response body available]');
    }
  } else {
    console.log('Response Body: [No content available]');
  }
}

// Event listener for monitoring network requests
chrome.webRequest.onBeforeRequest.addListener(
  logRequestDetails,
  { urls: urlsToMonitor },
  ["requestBody"]
);
// Event listener for monitoring network responses
chrome.webRequest.onCompleted.addListener(
  logResponseDetails,
  { urls: urlsToMonitor },
  ["responseHeaders"]
);

// Function to get LinkedIn cookies
function getLinkedInCookies(cookies) {
  let li_at = '';
  let JSESSIONID = '';
  for (let cookie of cookies) {
      if (cookie.domain.includes('.www.linkedin.com')) {
          if (cookie.name === 'li_at') {
              li_at = cookie.value;
              console.log('li_at: '+li_at);
          } else if (cookie.name === 'JSESSIONID') {
              JSESSIONID = cookie.value.substring(1, cookie.value.length - 1);
              console.log('JSESSIONID: '+JSESSIONID);
          }
      }
  }
  return { li_at, JSESSIONID };
}

function getCookie(b) {
  var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
  if (a = document.cookie.match(c)) {
      return unescape(a[2])
  } else {
      return null
  }
}

function updateRowData(rowId, updates) {
  const url = `http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo/${rowId}`;
  const headers = new Headers({            
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yLHN1cGVyIiwidG9rZW5fdmVyc2lvbiI6ImE0ZDM3NjA4ODc0ZTc1M2JhZDgyNzRhNzllZjVhMTE3MDRhNTE3NTRiMzQwNzYxZGU2MWQ2MDEwNTNiZTk0YzYwMjY4ZTEyMWNlYzU5Yjc2IiwiaWF0IjoxNzEyNjI4ODgzLCJleHAiOjE3MTU3ODI0ODN9.byyaje7Uioeg_2zvvHlTq2KhEXDyyD9LljO096sVdnI',
    'Content-Type': 'application/json' // specify content type
  });
  return fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updates) // convert updates object to JSON string
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  });
}

// Usage
const rowId = 3; // assuming the row ID to update is 3
const updates = {
  "Status": "Sent"
};

function fetchData(sendingName) {
  const url = 'http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo';
  const params = { offset: '0', limit: '1', where: `(Sending Name,eq,${sendingName})~and(Status,not,Sent)` };
  const headers = new Headers({
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6Im9yZy1sZXZlbC1jcmVhdG9yLHN1cGVyIiwidG9rZW5fdmVyc2lvbiI6ImE0ZDM3NjA4ODc0ZTc1M2JhZDgyNzRhNzllZjVhMTE3MDRhNTE3NTRiMzQwNzYxZGU2MWQ2MDEwNTNiZTk0YzYwMjY4ZTEyMWNlYzU5Yjc2IiwiaWF0IjoxNzEyNjI4ODgzLCJleHAiOjE3MTU3ODI0ODN9.byyaje7Uioeg_2zvvHlTq2KhEXDyyD9LljO096sVdnI'
  });

  const queryString = new URLSearchParams(params).toString();
  const requestUrl = `${url}?${queryString}`;

  return fetch(requestUrl, {
    method: 'GET',
    headers: headers
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(responseData => {
    const { list } = responseData;
    if (list.length === 0) {
      throw new Error('No data found for the provided Sending Name');
    }
    const { id, Template, 'Connection Id': connectionId } = list[0];
    return { id, Template, connectionId };
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  });
}

// Function to fetch value from page element
function fetchNameValue() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function() {
          // Define the CSS selector to select the image element with specific classes
          const selector = '.global-nav__primary-link.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view img';
          const element = document.querySelector(selector);
          return element ? element.alt : null; // Return the alt attribute value if the element is found
        }
      }, function(result) {
        const value = result[0].result;
        resolve(value); // Resolve the Promise with the fetched value
      });
    });
  });
}

function randomString(b) {
  b = b || 22;
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+0123456789";
  var a = c.length;
  var e = "";
  for (var d = 0; d < b; d++) {
      e += c.charAt(Math.floor(Math.random() * a))
  }
  return e
}

// function getCookie(b) {
//   var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
//   if (a = document.cookie.match(c)) {
//       return unescape(a[2])
//   } else {
//       return null
//   }
// }

function getCookie(cookieName) {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ name: cookieName }, (cookies) => {
      if (cookies && cookies.length > 0) {
        resolve(cookies[0].value);
      } else {
        resolve(null); // Cookie not found
      }
    });
  });
}

// Function to send LinkedIn connection request using jQuery AJAX
function sendingConnection(template, profileId, JSESSIONID) {
  // Generate tracking ID
  var trackingId = randomString(22) + "==";
  var connectionLink = 'https://www.linkedin.com/voyager/api/growth/normInvitations';

  var payload = {
      "emberEntityName": "growth/invitation/norm-invitation",
      "invitee": {
          "com.linkedin.voyager.growth.invitation.InviteeProfile": {
              "profileId": profileId
          }
      },
      "message": template,
      "trackingId": trackingId
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', connectionLink, true);
  xhr.setRequestHeader('Accept', 'application/vnd.linkedin.normalized+json+2.1');
  xhr.setRequestHeader('csrf-token', JSESSIONID.replace(/"/g, ""));
  xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('x-restli-protocol-version', '2.0.0');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 201) {
              console.log('Success:' + profileId);
          } else {
              console.error('Error:', xhr.statusText);
          }
      }
  };
  xhr.send(JSON.stringify(payload));
}

function getDetails(kind){
  let domain =document.getElementById('id_domain').value;
  let path = document.getElementById('id_path').value;
  let name = document.getElementById('id_name').value;
  let value = document.getElementById('id_value').value;
  let details = {};

  switch(kind){
  case 'getAll':
    if (domain != ''){
      details['domain'] = domain;
    }
    if (name != ''){
      details['name'] = name;
    }
    break;
  case 'set':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    details['value'] = value;
    break;
  case 'remove':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    break;
  }
  return details;
}


// Set up event listeners for buttons
document.getElementById('id_button_getAll').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), (cookies) => {
      let text = 'Number of cookies=' + cookies.length + '\n';
      for (let cookie of cookies) {
          text += 'domain=' + cookie.domain + ',path=' + cookie.path + ',name=' + cookie.name + ',value=' + cookie.value + '\n';
      }
      document.getElementById('id_text').value = text;
  });
};

document.getElementById('id_button_set').onclick = () => {
  chrome.cookies.set(getDetails('set'));
};

document.getElementById('id_button_remove').onclick = () => {
  chrome.cookies.remove(getDetails('remove'));
};



// Function to handle sending connection request and updating row
function handleSend() {
  // Fetch data using fetchNameValue()
  fetchNameValue()
    .then(name => {
      // Use the fetched name to fetch data
      return fetchData(name);
    })
    .then(data => {
      // Use the fetched data to update row
      const rowId = data.id;
      const template = data.Template;
      const connectionId = data.connectionId;
      // Send LinkedIn connection request
      var JSESSIONID = getCookie("JSESSIONID");
      if (JSESSIONID) {
        JSESSIONID = JSESSIONID.replace(/"/g, "");
      } else {
        PointOut("请确保领英账号已正常登录，请尝试刷新领英页面。");
        return false;
      }
      console.log(JSESSIONID);
      sendingConnection(template, connectionId, JSESSIONID)
      // return new Promise((resolve, reject) => {
      //   chrome.cookies.getAll(getDetails('getAll'), (cookies) => {
      //     var { li_at, JSESSIONID } = getLinkedInCookies(cookies);
      //     // const JSESSIONID = getCookie("JSESSIONID");
      //     console.log(JSESSIONID)
      //     sendingConnection(template, connectionId, JSESSIONID);
      //     resolve();
      //   });
      // })
      .then(() => {
        // Update the row status to "Sent" if LinkedIn connection request succeeds
        return updateRowData(rowId, {"Status": "Sent"});
      })
      .catch(error => {
        // Log or display appropriate error message
        console.error('Error sending connection request:', error);
        // Update the row status to "Fail" with error message
        return updateRowData(rowId, {"Status": "Fail: "+error.message});
      });
    })
    .catch(error => {
      // Log or display appropriate error message
      console.error('Error fetching data:', error);
    });
}

// Set up event listener for send button
document.getElementById('id_button_send').addEventListener('click', handleSend);
