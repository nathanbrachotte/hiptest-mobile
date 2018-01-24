

class ApiResponse{
     async getTestSnapshot(){
         try {
         let response = await fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ',
                'Accept': 'application/vnd.api+json; version=1',
                'Content-Type': 'application/json; charset=utf-8',
                'access-token': 'ftqjCs27iy5gg-yocxO6gg',
                'token-type': 'Bearer',
                'client': '5H0bDQTQm3FB8pEBpZkEyw',
                'expiry': '1542450299',
                'uid': 'sammyloudiyi@gmail.com'}
        });
         let responseJson = await response.json();
        // console.log(responseJson);
            return responseJson;
    }
    catch (error){
         console.error(error);
         }
     }

     async getScenarioDescription(idSnapShot){
         try {
             let response = await fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots/'+idSnapShot+'?include=scenario', {
                 method: 'GET',
                 headers: { 'Authorization': 'Bearer ',
                     'Accept': 'application/vnd.api+json; version=1',
                     'Content-Type': 'application/json; charset=utf-8',
                     'access-token': 'ftqjCs27iy5gg-yocxO6gg',
                     'token-type': 'Bearer',
                     'client': '5H0bDQTQm3FB8pEBpZkEyw',
                     'expiry': '1542450299',
                     'uid': 'sammyloudiyi@gmail.com'}
             });
             let responseJson = await response.json();
             return responseJson;
         }
         catch (error){
             console.error(error);
         }
     }

     async getStepsResult(idSnapShot){
         try {
             let response = await fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots/'+idSnapShot+'?include=last-result', {
                 method: 'GET',
                 headers: { 'Authorization': 'Bearer ',
                     'Accept': 'application/vnd.api+json; version=1',
                     'Content-Type': 'application/json; charset=utf-8',
                     'access-token': 'ftqjCs27iy5gg-yocxO6gg',
                     'token-type': 'Bearer',
                     'client': '5H0bDQTQm3FB8pEBpZkEyw',
                     'expiry': '1542450299',
                     'uid': 'sammyloudiyi@gmail.com'}
             });
             let responseJson = await response.json();
             return responseJson;
         }
         catch (error){
             console.log(error);
         }
     }
}

export default ApiResponse;
