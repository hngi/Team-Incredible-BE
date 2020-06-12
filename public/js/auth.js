
class CreateApi{
        //save the information
        async Saveapi(userdata){
       const url="https://hngi7-team-avengers.herokuapp.com/api/v1/register"
        let savedata = await axios.post(url,
        //  mode: "same-origin",
        //  credentials: "same-origin",
        userdata,
         {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            },{
                timeout:1000
            }
        )
return savedata
}
//login method will follow

}