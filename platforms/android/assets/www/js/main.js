"use strict"
//--------------------------------------var app--------------------------------------//
var app = {
  pages: [],
  links: [],
  teams: [],
  scores: [],
  mary: {
           name:[0,0,0,0],
           gp:[0,0,0,0],
           w:[0,0,0,0],
           l:[0,0,0,0],
           t:[0,0,0,0],
        },
    reload: function(){
    location.reload();
  },
  check: function(a){
      var teamName = "";
      for (var i = 0; i < app.teams.length; i++) {
         if (app.teams[i].id == a){
             teamName = app.teams[i].name;
         }
      }
      return teamName;
  },
  teamLogos : function(teams){
    switch(teams) {
                case "Hufflepuff" || "hufflepuff":
                    return "<img src=\"img/pngteamicons/hufflepuff.png\">";
                    break;
                case "Gryffindor" || "gryffindor":
                    return "<img src=\"img/pngteamicons/gryffindor.png\">";
                    break;
                case "Slytherin" || "slytherin":
                    return "<img src=\"img/pngteamicons/slytherin.png\">";
                    break;
                case "Ravenclaw" || "ravenclaw":
                    return "<img src=\"img/pngteamicons/ravenclaw.png\">";
                    break;
                default:
                    return "TeamNotFound";
            }
},    
  hailmary: function(){
      var place = "";
      //will loop 4 times, once for each team
      for (var i = 0; i < app.teams.length; i++){  
      app.mary.name[i] = app.teams[i].id;      
      //will loop 6 times, once for each date
      for (var b = 0; b < app.scores.length; b++) {
//        console.log(app.scores[i].date);  
      //will loop 2 times, once for 2 games
      for (var c = 0; c < 2; c++) {
          
      //current working game in function
      //console.log(app.scores[b].games[c]);

      //if the current team id is currently playing as home and has a higher score than away
      if (app.teams[i].id == app.scores[b].games[c].home && app.scores[b].games[c].home_score > app.scores[b].games[c].away_score) {
      //add 1pt to this teams wins
      app.mary.w[i] += 1
      app.mary.gp[i] += 1
      }else if(app.teams[i].id == app.scores[b].games[c].home && app.scores[b].games[c].home_score == app.scores[b].games[c].away_score){
      //add 1pt to ties   
      app.mary.t[i] += 1 
      app.mary.gp[i] += 1
      }else if(app.teams[i].id == app.scores[b].games[c].home && app.scores[b].games[c].home_score < app.scores[b].games[c].away_score){
      //add 1pt to losses      
      app.mary.l[i] += 1    
      app.mary.gp[i] += 1
      }
      if (app.teams[i].id == app.scores[b].games[c].away && app.scores[b].games[c].away_score > app.scores[b].games[c].home_score) {
      //add 1pt to this teams wins
      app.mary.w[i] += 1  
      app.mary.gp[i] += 1
      }else if(app.teams[i].id == app.scores[b].games[c].away && app.scores[b].games[c].away_score == app.scores[b].games[c].home_score){
      //add 1pt to ties
      app.mary.t[i] += 1    
      app.mary.gp[i] += 1
      }else if(app.teams[i].id == app.scores[b].games[c].away && app.scores[b].games[c].away_score < app.scores[b].games[c].home_score){
      //add 1pt to losses
      app.mary.l[i] += 1 
      app.mary.gp[i] += 1
      }
          
      }//end of 2 loop
      }//end of 6 loop
      }//end of 4 loop
      console.log(app.mary);
  },
  init: function(){
    app.pages = document.querySelectorAll('[data-role="page"]');
    app.links = document.querySelectorAll('[data-role="links"]');
      
    [].forEach.call(app.links, function(item){
      item.addEventListener("click", app.nav);
      console.log(item.href);
    });
    //variables used for the fetch
    let url = "https://griffis.edumedia.ca/mad9014/sports/quidditch.php";
    let req = new Request(url);
    let post = {
        method: 'POST',
        mode: 'cors'
    };
    //-----------start of fetch-----------//
    fetch(req, post).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        app.teams = data.teams;
        app.scores = data.scores;
    //store into localstorage if not done
    if (!localStorage.getItem('data')) {
    console.log("no key exists");
    localStorage.setItem("data", JSON.stringify(data));
    }
    let score = data.scores;
//--------------------(schedule)-----------------------//
    for (var i = 0; i < score.length; i++) {
        //create div
        let newDiv = document.createElement("div");
        let nm = "";
        //Date <p>
        let myDate = document.createElement("p");
        myDate.textContent = score[i].date;
        myDate.className = "date";
        //Game1 <p>
        let myGame1 = document.createElement("p");//
        myGame1.textContent = "Game 1";
        myGame1.className = "games";
        let myTeam = document.createElement("p");
        let myTeamB = document.createElement("p");
        let myTeamScore = document.createElement("p");
        nm = app.check(score[i].games[0].home);
        myTeam.textContent = nm;
        myTeam.textContent += " VS. ";
        nm = app.check(score[i].games[0].away);
        myTeam.textContent += nm;
        myTeam.className = "team";
        //score icon
        let myIcon = document.createElement("div");
        myIcon.innerHTML = app.teamLogos(app.check(score[i].games[0].home));
        myIcon.innerHTML += app.teamLogos(app.check(score[i].games[0].away));
        myIcon.className = "icon";
        //score
        myTeamScore.textContent = score[i].games[0].home_score;
        myTeamScore.textContent += " - ";
        myTeamScore.textContent += score[i].games[0].away_score;
        myTeamScore.className = "score";
        //Game2 <p>
        let myGame2 = document.createElement("p");//
        myGame2.textContent = "Game 2";
        myGame2.className = "games";
        let myTeam2 = document.createElement("p");
        let myTeam2Score = document.createElement("p");
        nm = app.check(score[i].games[1].home);
        myTeam2.textContent = nm;
        myTeam2.textContent += " VS. ";
        nm = app.check(score[i].games[1].away);
        myTeam2.textContent += nm;
        myTeam2.className = "team";
        //score icon
        let myIcon2 = document.createElement("div");
        myIcon2.innerHTML = app.teamLogos(app.check(score[i].games[1].home));
        myIcon2.innerHTML += app.teamLogos(app.check(score[i].games[1].away));
        myIcon2.className = "icon";
        //score
        myTeam2Score.textContent = score[i].games[1].home_score;
        myTeam2Score.textContent += " - ";
        myTeam2Score.textContent += score[i].games[1].away_score;
        myTeam2Score.className = "score";
        //append timetable view
        let addDiv = document.getElementById("schedule").appendChild(newDiv);
        addDiv.appendChild(myDate);
        addDiv.appendChild(myGame1);
        addDiv.appendChild(myTeam);
        addDiv.appendChild(myIcon);
        addDiv.appendChild(myTeamScore);
        addDiv.appendChild(myGame2);
        addDiv.appendChild(myTeam2);
        addDiv.appendChild(myIcon2);
        addDiv.appendChild(myTeam2Score);
    }
//-------------------Fill Table---------------------//
        app.hailmary();
        for (var i = 0; i < data.teams.length; i++) {
        //#
        var L = i + 1;
        let nm = "";
        let SNum = document.createElement("p");//
        SNum.textContent = L;//
        let addSNum = document.getElementById("#"+L).appendChild(SNum);//
        //Team
        let STeam = document.createElement("p");//
        nm = app.check(app.teams[i].id);
        STeam.textContent = nm;
        //icon goes here   
        let STeamIcon = document.createElement("div");
        STeamIcon.innerHTML = app.teamLogos(nm);
        let addSTeam = document.getElementById("Team"+L).appendChild(STeam);//
        let addSTeamIcon = document.getElementById("Team"+L).appendChild(STeamIcon);    
        //GP
        let SGP = document.createElement("p");//
        SGP.textContent = app.mary.gp[i];
        let addSGP = document.getElementById("GP"+L).appendChild(SGP);//
        //W
        let SW = document.createElement("p");//
        SW.textContent = app.mary.w[i];
        let addSW = document.getElementById("W"+L).appendChild(SW);//
        //L
        let SL = document.createElement("p");//
        SL.textContent = app.mary.l[i];
        let addSL = document.getElementById("L"+L).appendChild(SL);//
        //T
        let ST = document.createElement("p");//
        ST.textContent = app.mary.t[i];
        let addST = document.getElementById("T"+L).appendChild(ST);//                                                         
        }
        
//---------------------------------------------------//
    })
    //-----------end of fetch-------------//
    },//init end
    nav: function(ev){
    ev.preventDefault();  //stop link from doing anything
    console.log("clicked"); //test click
    var item = ev.currentTarget;  //anchor tag
    var href = item.href;  //href attribute
    var id = href.split("#")[1];  //just letter right of "#"
    [].forEach.call(app.pages, function(item){
      if( item.id == id){
        item.className = "active";
      }else{
        item.className = "";
      }
    });
    }
}
//--------------------------------------var app--------------------------------------//
document.addEventListener("DOMContentLoaded", app.init);
document.getElementById("select").addEventListener("click", app.reload);
document.getElementById("select2").addEventListener("click", app.reload);
