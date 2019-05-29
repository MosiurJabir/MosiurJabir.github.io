

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDTxNWcAyyZSccM_ARl3GMXlzYVu7YWL9I",
    authDomain: "mosfinalproket.firebaseapp.com",
    databaseURL: "https://mosfinalproket.firebaseio.com",
    projectId: "mosfinalproket",
    storageBucket: "mosfinalproket.appspot.com",
    messagingSenderId: "198655604231",
    appId: "1:198655604231:web:9f201668108732de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


let database = firebase.database()
let x
let y
let x2
let y2
let x3
let y3
let x4
let y4
let direction_aß
let direction_b
let direction_c
let direction_d
let direction_1
let direction_2
let score
let level
let radius
let time
let hi2 = document.getElementById("hi")
let sup2 = document.getElementById("sup")
let scoreboard = {   }


function setup() {
  createCanvas(windowWidth, windowHeight);
  s= width/1080
  x=[200,70,100,89]
  y=[200,90,89,70]
  x2=600;
  y2=210;
  x3=100;
  y3=600;
  x4=700;
  y4=300;
  x5=400;
  y5=300;
  direction_a=[1,1,1,1]
  direction_b=[1,1,1,1]
  score=0;
  direction_c=1
  direction_d=1
  direction_1=1
  direction_2=1
  level = 1
  radius = 100 
  time = 1000
}

function draw() {
  if (time > 0) {
  
  background(200);
  text("score: " +score,10,20);
  text("time: " +time,10,40);
  textSize(20);
  fill(255,0,80);
  circle(x3,y3,100*s);
  circle(x2,y2,100*s);
  fill(200,100,100);
  circle(x4,y4,50*s);
  circle(x5,y5,100*s);
  if(keyIsDown(LEFT_ARROW)) {
    x2 = x2 - 10
  }
  if(keyIsDown(UP_ARROW)) {
    y2 = y2 - 10
  }
  if(keyIsDown(DOWN_ARROW)) {
    y2 = y2 + 10
  }
  if(keyIsDown(RIGHT_ARROW)) {
    x2 = x2 + 10
  }
  
  
  for (i=0; i<4; i=i+1) {
    if(y[i]>height || y[i] <0) {
        direction_b[i]=direction_b[i] * -1

    }
     if(x[i]>width || x[i] <0) {
        direction_a[i]=direction_a[i] * -1

    }
    fill(300,0,10);
    circle(x[i],y[i],radius*s);
    x[i] = x[i] + 10*direction_a[i]
    y[i] = y[i] + 10*direction_b[i]
    
  if(dist(x[i],y[i],x2,y2)<radius*s+100 ) {
       score=score-1
     }
  }
  

  if(dist(x2,y2,x3,y3)<100*s+100 ) {
       score=score+10
     }
  if(dist(x2,y2,x4,y4)<100*s+100 ) {
       score=score-10
     }
  
  if(x4>height || x4 <0) {
        direction_c=direction_c * -1

    }
  if(y4>width || y4 <0) {
        direction_d=direction_d * -1

    }
  x4 = x4 + 20*direction_c
  y4 = y4 + 20*direction_d
  
  if(x5>height || x5 <0) {
        direction_1=direction_1 * -1

    }
  if(y5>width || y5 <0) {
        direction_2=direction_2 * -1

    }
  x5 = x5 + 20*direction_1
  y5 = y5 + 20*direction_2
  
  
  
  
  if (score > 1000 && level == 1) {
    x = [200 ,45 ,223 , 200 ]
    level = 2
  }
  if (score > 2000 && level == 2) {
    radius = radius + 75
    level = 3
  }
  
  time = time-1
  

  
  
  
  }
  else {
    hi2.innerHTML = "Name? <input id='sup'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
    noLoop()
    
    
    
    
  }
  
    
}
function restart() {
  name = sup.value
  if (name!="") {
        scoreboard[name] = score
  }
	database.ref(name).set(score)
  alert("Scoreboard: " + JSON.stringify(scoreboard,null,1))
  time = 1000
  score = 0
  loop()
  hi2.innerHTML = ""
  generate_leaderboard()
}



function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}


function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()


