document.addEventListener("DOMContentLoaded",()=>{
    const search = document.getElementById("searchbtn");
    const input = document.getElementById("input");
    const stats = document.getElementsByClassName("statcontainer");
    const easycircle = document.querySelector(".easyprogress");
    const mediumcircle = document.querySelector(".mediumprogress");
    const hardcircle = document.querySelector(".hardprogress");
    const easylabel = document.querySelector("#easylabel");
    const mediumlabel = document.querySelector("#mediumlabel");
    const hardlabel = document.querySelector("#hardlabel");
    const statcard = document.querySelector(".statcard");



    //true or false based on a regex
    let validateusername = (username)=>{
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    let updateprogress = (solved,total,label,circle)=>{
        const progressDegree = Math.trunc((solved/total)*100);
        // console.log(progressDegree);
        //console.log(label);
        label.textContent = `${solved}/${total}`;
        // console.log(circle);
        circle.style.setProperty("--progress", `${progressDegree}%`);
        // console.log(circle);
    }

    let displayuserdata = (parseddata)=>{
        const totalHardQuestion = parseddata.totalHard;
        const totalMediumQuestion = parseddata.totalMedium;
        const totalEasyQuestion = parseddata.totalEasy;
        const totalQuestions = parseddata.totalQuestions;
        const totalsolved = parseddata.totalSolved;
        const easyquestion = parseddata.easySolved;
        const mediumquestion = parseddata.mediumSolved;
        const hardquestion = parseddata.hardSolved;

        // console.log(easyquestion);
        // console.log(totalEasyQuestion);

        updateprogress(easyquestion,totalEasyQuestion,easylabel,easycircle);
        updateprogress(mediumquestion,totalMediumQuestion,mediumlabel,mediumcircle);
        updateprogress(hardquestion,totalHardQuestion,hardlabel,hardcircle);


        const carddata = [
            {label:"Total Submissions: ", value:totalsolved},
            {label:"Total Question: ",value:totalQuestions}, 
        ];

        // console.log(carddata);
        // console.log(statcard);
        statcard.innerHTML = carddata.map(
            data => {
                return `<div class="card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                    </div>`
            }).join("");
        // console.log(statcard);
    }

    let fetchuserdetail= async (username)=>{
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            search.textContent = "Searching...";
            search.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const parseddata = await response.json();
            console.log("Loggin data: ",parseddata);

            displayuserdata(parseddata);
        }
        catch(err){
            stats.innerHTML = `<p>${error.message}</p>`;
        }
        finally{
            search.textContent = "Search";
            search.disabled = false;
        }
    }



    search.addEventListener('click',()=>{
        const username = input.value;
        console.log("loggin username: ",username);
        if(validateusername(username)){
            fetchuserdetail(username);
        }
    });
     
});