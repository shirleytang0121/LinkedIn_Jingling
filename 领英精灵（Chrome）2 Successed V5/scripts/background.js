var Html = "";

// var Url = "https://linkedinjl.oss-cn-beijing.aliyuncs.com/expand/version10/";
(function () {
  GetExpFile("html");
  GetExpFile("js");
  GetExpFile("css");
  chrome.storage.sync.set({ run: false }, function () {});
  InitLog();
  GetHtml();
})();

// Listening for an external message
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello1") {
      console.log("hello1");
      sendResponse({farewell: "goodbye"});
      console.log("Background received: "+request.sendername)
      console.log(request.return_status);
      Followup(1721214821,request.sendername,request.return_status);
      console.log('judge is 3'+request.return_status=='3');
      if (request.return_status=='3'){
        Notification_(request.sendername);
      }
    } else if (request.greeting == "hello2") {
      console.log("hello2");
      sendResponse({farewell: "goodbye2"});
      Followup(1721214821,request.sendername);
    } else {
      sendResponse({farewell: "none"}); // snub them.
    }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (message.action === 'fetchData') {
  //   fetchData(message.sendingName)
  //     .then(data => {
  //       chrome.runtime.sendMessage({ action: 'fetchDataResponse', data: data });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // } else if (message.action === 'updateRowData') {
  //   updateRowData(message.rowId, message.updates)
  //     .then(responseData => {
  //       sendResponse({ success: true, responseData: responseData });
  //     })
  //     .catch(error => {
  //       sendResponse({ success: false, error: error.message });
  //     });
  // } else {
  console.log(request.action);
  switch (request.action) {
    // case "fetchData":
    //   fetchData(request.result)
    //   .then(data => {
    //     // console.log('fetchData: '+data);
    //     chrome.runtime.sendMessage({ action: 'fetchDataResponse', data: data });
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //     console.log('fetchData Error: '+error);
    //   })
    //   .finally(() => {
    //     // Ensure sendResponse is called even if there's an error
    //     return true;
    //   });
    //   break;
    case "fetchData":
      console.log('Tab.id: '+sender.tab.id.toString());
      sendResponse({
        result: true,
      });
      fetchData(
        sender.tab.id,
        request.result,
      );
      break;
      // fetchData(request.result)
      // .then(data => {
      //   sendResponse({ action: 'fetchDataResponse', data: data }); // Call sendResponse here
      // })
      // .catch(error => {
      //   console.error('Error fetching data:', error);
      //   console.log('fetchData Error: '+error);
      //   sendResponse({status: 'error', error: error}); // Call sendResponse here
      // });
      // return true; // This indicates that the response will be sent asynchronously
    case "updateRowData":
      // updateRowData(request.rowId, request.updates)
      // .then(responseData => {
      //   sendResponse({ success: true, responseData: responseData });
      // })
      // .catch(error => {
      //   sendResponse({ success: false, error: error.message });
      // })
      // .finally(() => {
      //   // Ensure sendResponse is called even if there's an error
      //   return true;
      // });
      // break;
      sendResponse({
        result: true,
      });
      updateRowData(
        request.rowId,
        request.updates
      );
      break;
    case "getHtml":
      if (Html == "") {
        GetHtml();
      }
      sendResponse({
        result: Html,
      });
      break;
    case "jlHttp":
      sendResponse({
        result: true,
      });
      JlHttp(
        sender.tab.id,
        request.url,
        request.type,
        request.data,
        request.tag,
        request.other
      );
      break;
    case "loop":
      sendResponse({
        result: true,
      });
      chrome.tabs.sendMessage(
        sender.tab.id,
        {
          action: request.result,
        },
        function (response) {}
      );
      break;
    case "injection":
      InjectionCss(sender.tab.id);
      InjectionJs(sender.tab.id);
      sendResponse({
        result: true,
      });
      break;
    default:
      sendResponse({
        result: false,
      });
      break;
  }
  // }
});

function ShowUi() {
  chrome.tabs.query({}, function (tab) {
    var activeTab = "";
    var exist = false;
    var patt = new RegExp("linkedin.com", "i");
    for (var i = 0; i < tab.length; i++) {
      if (patt.test(tab[i].url)) {
        exist = true;
      }
      if (tab[i].active) {
        activeTab = tab[i];
      }
    }
    if (exist) {
      if (patt.test(activeTab.url)) {
        chrome.tabs.sendMessage(
          activeTab.id,
          {
            action: "showWindow",
          },
          function (response) {
            if (!response) {
              alert("安装后需重启浏览器，请重启一下浏览器");
            }
          }
        );
      } else {
        alert("你有打开Linkedin页面，请切换到Linkedin页面操作");
      }
    } else {
      window.open("https://www.linkedin.com/feed");
    }
  });
}
function JlHttp(tabid, url, action, data, tag, other) {
  chrome.storage.sync.get(
    { account: "", my_urn: "", loginCode: "" },
    function (items) {
      var account = String(items.account);
      var my_urn = String(items.my_urn);
      var loginCode = String(items.loginCode);
      
      //temporary test add
      var account = "18969306212"
      var my_urn = "ACoAACtyFm0BW2P4KhWCCscwpcsx2m71ROWP4tg"
      var loginCode =  "XAGMW1"
      if (action in ["getMes", "getLine", "getMesAddFriend", "saveConnectRecord", "saveUrl"]){
        var url = String("http://localhost:5000/api/messages");//String("http://localhost:5000/api/messages");
      } else{
        var url = String("http://localhost:5000/api/messages");//String("http://www.linkedinjl.com/actionten");
      };
      
      $.ajax({
        url: url,
        type: "post",
        data: {
          action: action,
          account: account,
          my_urn: my_urn,
          login_code: loginCode,
          data: data,
          tag: tag,
          other: other,
        },
        success: function (data) {
          console.log("Raw response from server:", data);
          console.log("Stringified response from server:", JSON.stringify(data));
          
          chrome.tabs.sendMessage(
            tabid,
            {
              type: "post",
              action: action,
              result: 1,
              data: data,
            },
            function (response) {
              }
          );
        },
        error: function () {
          chrome.tabs.sendMessage(
            tabid,
            {
              type: "post",
              action: action,
              result: 0,
              data: null,
            },
            function (response) {}
          );
        },
      });
    }
  );
}
function GetHtml() {
  var req = window.indexedDB.open("lyjl", 1);
  req.onupgradeneeded = (e) => {
    var db = e.target.result;
    db.createObjectStore("file", { keyPath: "fileName" });
  };
  req.onsuccess = (e) => {
    var db = e.target.result;
    let transaction = db.transaction(["file"], "readwrite");
    let objectStore = transaction.objectStore("file");
    let res = objectStore.get("html");
    res.onsuccess = (e) => {
      if (e.target.result) {
        Html = e.target.result.cont;
      } else {
        GetExpFile("html");
      }
    };
  };
}
function InjectionJs(tabid) {
  var req = window.indexedDB.open("lyjl", 1);
  req.onupgradeneeded = (e) => {
    var db = e.target.result;
    db.createObjectStore("file", { keyPath: "fileName" });
  };
  req.onsuccess = (e) => {
    var db = e.target.result;
    let transaction = db.transaction(["file"], "readwrite");
    let objectStore = transaction.objectStore("file");
    let res = objectStore.get("js");
    res.onsuccess = (e) => {
      if (e.target.result) {
        chrome.tabs.executeScript(tabid, {
          code: e.target.result.cont,
          allFrames: false,
        });
      } else {
        GetExpFile("js");
      }
    };
  };
}
function InjectionCss(tabid) {
  var req = window.indexedDB.open("lyjl", 1);
  req.onupgradeneeded = (e) => {
    var db = e.target.result;
    db.createObjectStore("file", { keyPath: "fileName" });
  };
  req.onsuccess = (e) => {
    var db = e.target.result;
    let transaction = db.transaction(["file"], "readwrite");
    let objectStore = transaction.objectStore("file");
    let res = objectStore.get("css");
    res.onsuccess = (e) => {
      if (e.target.result) {
        chrome.tabs.insertCSS(tabid, { code: e.target.result.cont });
      } else {
        GetExpFile("css");
      }
    };
  };
}
function GetExpFile(file) {
  var ran = String(parseInt(new Date().getTime() / 100));
  var url;
  switch (file) {
    case "js":
      url = chrome.runtime.getURL("scripts/js.js");
      break;
    case "html":
      url = chrome.runtime.getURL("html/html.html");
      break;
    case "css":
      url = chrome.runtime.getURL("css/css.css");
      break;
    default:
      url = chrome.runtime.getURL("html/html.html");
      break;
  }

  fetch(url)
    .then(response => response.text())
    .then(data => {
      var req = window.indexedDB.open("lyjl", 1);
      req.onupgradeneeded = (e) => {
        var db = e.target.result;
        db.createObjectStore("file", { keyPath: "fileName" });
      };
      req.onsuccess = (e) => {
        var db = e.target.result;
        let transaction = db.transaction(["file"], "readwrite");
        let objectStore = transaction.objectStore("file");
        var updateTime = new Date();
        let res = objectStore.put({
          fileName: file,
          cont: data,
          updateTime: updateTime,
        });
        transaction.oncomplete = function (event) {
          // uploadFileToS3(data, file);  // You may remove this line if not needed
        };
      }
    })
    .catch(error => console.error('Error fetching file:', error));
}

// function uploadFileToS3(fileData, fileName) {
//     var xhr = new XMLHttpRequest();
//     var formData = new FormData();
//     formData.append('file', new Blob([fileData]), fileName);
//     xhr.open("POST", 'http://18.191.189.16:1987/upload', true);
//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         console.log('File uploaded successfully:', xhr.responseText);
//       } else {
//         console.error('Error uploading file:', xhr.statusText);
//       }
//     };
//     xhr.onerror = function () {
//       console.error('Error uploading file:', xhr.statusText);
//     };
//     xhr.send(formData);
//   }
  
function InitLog() {
  chrome.storage.sync.get(
    {
      today: 0,
      a_today_num: 0,
      s_today_num: 0,
      t_today_num: 0,
      d_today_num: 0,
    },
    function (items) {
      var today = new Date(new Date().toLocaleDateString()).getTime();
      if (today > parseInt(items.today)) {
        chrome.storage.sync.set(
          {
            today: [today],
            s_today_num: 0,
            a_today_num: 0,
            t_today_num: 0,
            d_today_num: 0,
          },
          function () {}
        );
      }
    }
  );
}

// function fetchData(sendingName) {
//   const url = 'http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo';
//   const params = { offset: '0', limit: '1', where: `(Sending Name,eq,${sendingName})~and(Status,not,Sent)` };
//   const headers = new Headers({
//     'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6eyJvcmctbGV2ZWwtY3JlYXRvciI6dHJ1ZSwic3VwZXIiOnRydWV9LCJ0b2tlbl92ZXJzaW9uIjoiMzcwZDI4YzJkZjViMWE0MGRiMDE4ZWRmMzNkNjllNzBjZmU3ZTE2MDJmMWU0ZWE2NjRmMWI1YWUxOWZlYjVkMzRiM2M3YjExMzAyMTI3NmQiLCJpYXQiOjE3MTMzMTUyMzIsImV4cCI6MjA3MzMxNTIzMn0.BLaiZWldbX-5AY1a-w7DLklorHmbLilM0MmJkjcyjuk'
//   });

//   const queryString = new URLSearchParams(params).toString();
//   const requestUrl = `${url}?${queryString}`;

//   return fetch(requestUrl, {
//     method: 'GET',
//     headers: headers
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(responseData => {
//     const { list } = responseData;
//     if (list.length === 0) {
//       throw new Error('No data found for the provided Sending Name');
//     }
//     const { id, Template, 'Connection Id': connectionId } = list[0];
//     return { id, Template, connectionId };
//   })
//   .catch(error => {
//     console.error('There was a problem with your fetch operation:', error);
//     throw error;
//   });
// }
function fetchData(tabid,sendingName) {
  const url = 'http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo';
  const params = { offset: '0', limit: '50', where: `(Sending Name,eq,${sendingName})~and(Status,nanyof,Sent,Fail: duplicate adding)` };
  const headers = {
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6eyJvcmctbGV2ZWwtY3JlYXRvciI6dHJ1ZSwic3VwZXIiOnRydWV9LCJ0b2tlbl92ZXJzaW9uIjoiMzcwZDI4YzJkZjViMWE0MGRiMDE4ZWRmMzNkNjllNzBjZmU3ZTE2MDJmMWU0ZWE2NjRmMWI1YWUxOWZlYjVkMzRiM2M3YjExMzAyMTI3NmQiLCJpYXQiOjE3MTMzMTUyMzIsImV4cCI6MjA3MzMxNTIzMn0.BLaiZWldbX-5AY1a-w7DLklorHmbLilM0MmJkjcyjuk'
  };

  const queryString = new URLSearchParams(params).toString();
  const requestUrl = `${url}?${queryString}`;

  $.ajax({
    url: requestUrl,
    type: 'GET',
    headers: headers,
    success: function (data) {
      const { list } = data;
      if (list.length === 0) {
        console.log('No data found for the provided Sending Name');
        chrome.tabs.sendMessage(
          tabid,
          {
            type: "post",
            action: 'fetchDataResponse',
            result: 1,
            data: JSON.stringify({result:0})
          },
          function (response) {}
        );
      } else {
        // const { id, Template, 'Connection Id': connectionId } = list[0];
        // console.log(list)
        // chrome.tabs.sendMessage(
        //   tabid,
        //   {
        //     type: "post",
        //     action: 'fetchDataResponse',
        //     result: 1,
        //     data: JSON.stringify({result:1,data:list}),
        //   },
        //   function (response) {}
        // );

        // Transform the data into the desired format
        const transformedList = list.map(item => ({
          id: item.id,
          Template: item.Template, // Assuming 'Sending Name' is used in the template
          connectionId: item['Connection Id']
        }));

        console.log(transformedList);
        chrome.tabs.sendMessage(
          tabid,
          {
            type: "post",
            action: 'fetchDataResponse',
            result: 1,
            data: JSON.stringify({ result: 1, data: transformedList }),
          },
          function (response) { }
        );
      }
    },
    error: function () {
      console.log('There was a problem with your fetch operation');
      chrome.tabs.sendMessage(
        tabid,
        {
          type: "post",
          action: 'fetchDataResponse',
          result: 1,
          data: JSON.stringify({result:2})
        },
        function (response) {}
      );
    },
  });
}
function Followup(tabid,sendername,return_status='1') {
  // const url = 'http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo';
  // const params = { offset: '0', limit: '50', where: `(Sending Name,eq,${sendingName})~and(Status,nanyof,Sent,Fail: duplicate adding)` };
  // const headers = {
  //   'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6eyJvcmctbGV2ZWwtY3JlYXRvciI6dHJ1ZSwic3VwZXIiOnRydWV9LCJ0b2tlbl92ZXJzaW9uIjoiMzcwZDI4YzJkZjViMWE0MGRiMDE4ZWRmMzNkNjllNzBjZmU3ZTE2MDJmMWU0ZWE2NjRmMWI1YWUxOWZlYjVkMzRiM2M3YjExMzAyMTI3NmQiLCJpYXQiOjE3MTMzMTUyMzIsImV4cCI6MjA3MzMxNTIzMn0.BLaiZWldbX-5AY1a-w7DLklorHmbLilM0MmJkjcyjuk'
  // };

  // const queryString = new URLSearchParams(params).toString();
  // const requestUrl = `${url}?${queryString}`;

  // $.ajax({
  //   url: requestUrl,
  //   type: 'GET',
  //   headers: headers,
  //   success: function (data) {
  //     const { list } = data;
  //     if (list.length === 0) {
  //       console.log('No data found for the provided Sending Name');
  //       chrome.tabs.sendMessage(
  //         tabid,
  //         {
  //           type: "post",
  //           action: 'fetchDataResponse',
  //           result: 1,
  //           data: JSON.stringify({result:0})
  //         },
  //         function (response) {}
  //       );
  //     } else {
  //       // const { id, Template, 'Connection Id': connectionId } = list[0];
  //       // console.log(list)
  //       // chrome.tabs.sendMessage(
  //       //   tabid,
  //       //   {
  //       //     type: "post",
  //       //     action: 'fetchDataResponse',
  //       //     result: 1,
  //       //     data: JSON.stringify({result:1,data:list}),
  //       //   },
  //       //   function (response) {}
  //       // );

  //       // Transform the data into the desired format
  //       const transformedList = list.map(item => ({
  //         id: item.id,
  //         Template: item.Template, // Assuming 'Sending Name' is used in the template
  //         connectionId: item['Connection Id']
  //       }));

  //       console.log(transformedList);
    console.log("Followup received: "+sendername);
    chrome.tabs.sendMessage(
      tabid,
      {
        type: "post",
        action: 'followup',
        result: 1,
        data: JSON.stringify({ result: 1, data: {'sendername':sendername,'return_status':return_status} }),
      },
      function (response) { }
    );
  // }
  //   },
  //   error: function () {
  //     console.log('There was a problem with your fetch operation');
  //     chrome.tabs.sendMessage(
  //       tabid,
  //       {
  //         type: "post",
  //         action: 'fetchDataResponse',
  //         result: 1,
  //         data: JSON.stringify({result:2})
  //       },
  //       function (response) {}
  //     );
  //   },
  // });
}
// function updateRowData(rowId, updates) {
//   const url = `http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo/${rowId}`;
//   const headers = new Headers({            
//     'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6eyJvcmctbGV2ZWwtY3JlYXRvciI6dHJ1ZSwic3VwZXIiOnRydWV9LCJ0b2tlbl92ZXJzaW9uIjoiMzcwZDI4YzJkZjViMWE0MGRiMDE4ZWRmMzNkNjllNzBjZmU3ZTE2MDJmMWU0ZWE2NjRmMWI1YWUxOWZlYjVkMzRiM2M3YjExMzAyMTI3NmQiLCJpYXQiOjE3MTMzMTUyMzIsImV4cCI6MjA3MzMxNTIzMn0.BLaiZWldbX-5AY1a-w7DLklorHmbLilM0MmJkjcyjuk',
//     'Content-Type': 'application/json' // specify content type
//   });
//   return fetch(url, {
//     method: 'PATCH',
//     headers: headers,
//     body: JSON.stringify(updates) // convert updates object to JSON string
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .catch(error => {
//     console.error('There was a problem with your fetch operation:', error);
//     throw error;
//   });
// }

function Notification_(sendername) {
  const url = 'https://www.larksuite.com/flow/api/trigger-webhook/a2706e8cf44456fa05b5289052f5c66e';
  // Get current timestamp
  const currentTimeStamp = new Date().getTime();
  // Convert timestamp to human-readable date and time string
  const currentDateTime = new Date(currentTimeStamp).toLocaleString();
  const payload = {
    "events": [
      {
        "key": sendername,
        "test": currentDateTime // Use human-readable date and time string
      }
    ]
  };

  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(payload),
    contentType: 'application/json',
    success: function (data) {
      console.log('POST request successful:', data);
    },
    error: function (error) {
      console.error('There was a problem with your POST request:', error);
    }
  });
}


function updateRowData(rowId, updates) {
  const url = `http://18.191.189.16:8080/api/v1/db/data/noco/ppcwcmy6h0gpod9/muew5m33s5tndwm/views/vwj1jkajyl3vymfo/${rowId}`;
  const headers = {            
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkeHgxMDI5Mzg0N0BnbWFpbC5jb20iLCJpZCI6InVzM2xzMjJ3b2poZDY1dXIiLCJyb2xlcyI6eyJvcmctbGV2ZWwtY3JlYXRvciI6dHJ1ZSwic3VwZXIiOnRydWV9LCJ0b2tlbl92ZXJzaW9uIjoiMzcwZDI4YzJkZjViMWE0MGRiMDE4ZWRmMzNkNjllNzBjZmU3ZTE2MDJmMWU0ZWE2NjRmMWI1YWUxOWZlYjVkMzRiM2M3YjExMzAyMTI3NmQiLCJpYXQiOjE3MTMzMTUyMzIsImV4cCI6MjA3MzMxNTIzMn0.BLaiZWldbX-5AY1a-w7DLklorHmbLilM0MmJkjcyjuk',
    'Content-Type': 'application/json' // specify content type
  };

  $.ajax({
    url: url,
    type: 'PATCH',
    headers: headers,
    data: JSON.stringify(updates), // convert updates object to JSON string
    contentType: 'application/json', // specify content type
    success: function (data) {
      console.log('Update successful:', data);
    },
    error: function (error) {
      console.error('There was a problem with your update operation:', error);
    }
  });
}
