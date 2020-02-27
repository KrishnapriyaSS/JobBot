 // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues







'use strict';
const functions = require('firebase-functions');
var dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
var requests = require('request');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const translate = require('google-translate-api');
 
function WebhookProcessing(req, res) {
  const agent = new WebhookClient({request: req, response: res});
  console.log('\n\n\nDialogflow Request body: ' + JSON.stringify(req.body));
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function first(agent) {
    agent.add(`Hi....am a Job Search Bot....We love having you with us....I can help you find the job you're looking for...`);
    agent.add(new Suggestion("Search for Jobs"));
    agent.add(new Suggestion("Search jobs related to skills "));
    agent.add(new Suggestion("retrieve all Jobs"));

  }

   function begin(agent) {
    //agent.add(`Hi....am a Job Search Bot....am here to help you to find jobs for u...`);
    agent.add(new Suggestion("Search for Jobs"));
    agent.add(new Suggestion("Search jobs related to skills "));
    agent.add(new Suggestion("retrieve all Jobs"));

  }

  function categ(agent) {
  	agent.add(`Enter a category(Eg : Software/Hardware)`);
  }

  function skills(agent) {
  	agent.add(`Enter a skill`);

  }

  function ways(agent) {
  	global.skillname=req.body.queryResult.queryText;
    agent.add(new Suggestion("Begins with"));
    agent.add(new Suggestion("Contains"));
    agent.add(new Suggestion("Ends with"));
    agent.add(new Suggestion("Main Menu"));

  }

  
  function jobsearch(vari)
  {  
    return new Promise((resolve, reject) => {      
    //var requests = require('request');
     const options = {
       method: 'GET',
       url: 'http://api.dataatwork.org/v1/jobs/autocomplete?begins_with='+vari,
       followAllRedirects: true,
       json: true,
       form: {}
     }
     requests(options, function (err, res, body) {
       if (err) {
         console.log('error while getting api response of createUser');
         console.log(err);
         reject(err);
       } else {
         const json = body;
         console.log(json);
         resolve(json);
       }
     })
   })
  }

  function jobskill(vari1)
  {  
    return new Promise((resolve, reject) => {      
    //var requests = require('request');
     const options = {
       method: 'GET',
       
       url: 'http://api.dataatwork.org/v1/skills/autocomplete?begins_with='+vari1,
       followAllRedirects: true,
       json: true,
       form: {}
     }
     requests(options, function (err, res, body) {
       if (err) {
         console.log('error while getting api response of createUser');
         console.log(err);
         reject(err);
       } else {
         const json = body;
         console.log(json);
         resolve(json);
       }
     })
   })
  }

  function jobskill1(vari2)
  {  
    return new Promise((resolve, reject) => {      
    //var requests = require('request');
     const options = {
       method: 'GET',
       
       url: 'http://api.dataatwork.org/v1/skills/autocomplete?contains='+vari2,
       followAllRedirects: true,
       json: true,
       form: {}
     }
     requests(options, function (err, res, body) {
       if (err) {
         console.log('error while getting api response of createUser');
         console.log(err);
         reject(err);
       } else {
         const json = body;
         console.log(json);
         resolve(json);
       }
     })
   })
  }

  function jobskill2(vari3)
  {  
    return new Promise((resolve, reject) => {      
    //var requests = require('request');
     const options = {
       method: 'GET',
       
       url: 'http://api.dataatwork.org/v1/skills/autocomplete?ends_with='+vari3,
      // url: 'http://api.dataatwork.org/v1/jobs/autocomplete?begins_with="manager',
       followAllRedirects: true,
       json: true,
       form: {}
     }
     requests(options, function (err, res, body) {
       if (err) {
         console.log('error while getting api response of createUser');
         console.log(err);
         reject(err);
       } else {
         const json = body;
         console.log(json);
         resolve(json);
       }
     })
   })
  }

  function alljobsearch(agent)
  {  
    return new Promise((resolve, reject) => {      
    //var requests = require('request');
     const options = {
       method: 'GET',
       url: 'http://api.dataatwork.org/v1/jobs',
       followAllRedirects: true,
       json: true,
       form: {}
     }
     requests(options, function (err, res, body) {
       if (err) {
         console.log('error while getting api response of createUser');
         console.log(err);
         reject(err);
       } else {
         const json = body;
         console.log(json);
         resolve(json);
       }
     })
   })
  }

  async function jobsforu(agent){
  	var z =req.body.queryResult.queryText;
    var b =await jobsearch(z);
    var title=[]
    //var image=[]
    var data=[]
    var a=[]
    agent.add("Job list for you....")
    for(var i=0;i<=5;i++){
      const card = new Card(" ");
      card.setImage('https://miro.medium.com/max/2560/1*OPPoRebZ7sjocSYtScBdQQ.jpeg');
      card.setTitle(b[i].suggestion);
      card.setText(b[i].normalized_job_title);
     // card.setButton({ text: 'Read More', url: b.articles[i].url});  
      a.push(card)
    }
    agent.add(a)
    agent.add(new Suggestion("Main Menu"));

   
}

async function skillsforu(agent){
    var c =await jobskill(global.skillname);
    var title=[]
    //var image=[]
    var data=[]
    var d=[]
    var l=c.length;
    agent.add("Job list for you....")
    for(var i=0;i<l;i++){ 
      const card = new Card(" ");
      card.setImage('https://img.business.com/rc/300x200/aHR0cHM6Ly93d3cuYnVzaW5lc3MuY29tL2ltYWdlcy9jb250ZW50LzVjYS8zZDA5MDVhMjE1ZThhNDU4YjZiMTUvMC04MDAt')
      card.setTitle(c[i].suggestion);
      card.setText(c[i].normalized_skill_name);
      d.push(card)

    }
    agent.add(d)
    agent.add(new Suggestion("Main Menu"));

}

async function skillsforu1(agent){
    var e =await jobskill1(global.skillname);

    var title=[]
    var data=[]
    var d=[]
    agent.add("Job list for you....")

    //var l=e.length;
    for(var i=0;i<8;i++){
      const card = new Card(" ");
      card.setImage('https://s3.amazonaws.com/media.eremedia.com/wp-content/uploads/sites/4/2019/02/24111926/resume-job-search-screening-700x467.jpg');
      card.setTitle(e[i].suggestion);
      card.setText(e[i].normalized_skill_name);
      d.push(card)
    }
    agent.add(d)
    agent.add(new Suggestion("Main Menu"));

}

async function skillsforu2(agent){
  
    var f =await jobskill2(global.skillname);
    var title=[]
    //var image=[]
    var data=[]
    var d=[]
    agent.add("Job list for you....")
    var l=f.length;
    for(var i=0;i<l;i++){
      const card = new Card(" ");
      card.setImage('https://www.educationalappstore.com/blog/wp-content/uploads/2018/07/job-search-apps.jpg');
      card.setTitle(f[i].suggestion);
      card.setText(f[i].normalized_skill_name);
     // card.setButton({ text: 'Read More', url: b.articles[i].url});  
      d.push(card)
    }
    agent.add(d)
    agent.add(new Suggestion("Main Menu"));
   
}

async function alljobsforu(agent){
  	var z =req.body.queryResult.queryText;
    var b =await alljobsearch(z);
    var title=[]
    //var image=[]
    var data=[]
    var a=[]
    agent.add("Job list for you....")
    for(var i=0;i<7;i++){
      const card = new Card(" ");
      card.setImage('https://www.jagranimages.com/images/03_07_2018-job-search-apps_18152944.jpg');
      card.setTitle(b[i].title);
      card.setText(b[i].normalized_job_title);
     // card.setButton({ text: 'Read More', url: b.articles[i].url});  
      a.push(card)
    }
    agent.add(a)
    agent.add(new Suggestion("Main Menu"));
   
}

  let intentMap = new Map();
  intentMap.set('welcome', first);
  intentMap.set('back', begin);
  intentMap.set('jobs', categ);
  intentMap.set('skill', skills);
  intentMap.set('skilltype', ways);
  intentMap.set('Default Fallback Intent', fallback); 
  intentMap.set('list', jobsforu);
  intentMap.set('skills1', skillsforu);
  intentMap.set('skills2', skillsforu1);
  intentMap.set('skills3', skillsforu2);
  intentMap.set('aljob', alljobsforu);


  agent.handleRequest(intentMap);
}

app.post('/webhook', function (req, res) {
    WebhookProcessing(req, res);
});

app.listen(process.env.PORT, function () {
    console.info(`Webhook listening on port ${process.env.PORT}`)
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'test_token') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});
