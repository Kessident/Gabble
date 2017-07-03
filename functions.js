const crypto = require('crypto');
function hash(string){
  return crypto.createHash('md5').update(string).digest('hex');
}

function monthName(month){
  switch (month){
    case 1:
    month = "January";
    break;
    case 2:
    month = "February";
    break;
    case 3:
    month = "March";
    break;
    case 4:
    month = "April";
    break;
    case 5:
    month = "May";
    break;
    case 6:
    month = "June";
    break;
    case 7:
    month = "July";
    break;
    case 8:
    month = "August";
    break;
    case 9:
    month = "September";
    break;
    case 10:
    month = "October";
    break;
    case 11:
    month = "November";
    break;
    case 12:
    month = "December";
    break;
  }
  return month;
}

function formatTime(gabs){
  let gabList = [];
  gabs.forEach(function (gab) {
    let date = new Date(gab.createdBy.createdAt),
    month = date.getMonth(),
    day = date.getDate(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes();

    month = monthName(month);

    if (hours < 10)
    {hours = "0" + hours;}
    if (minutes < 10)
    {minutes = "0" + minutes;}
    let time = hours + ":" + minutes;

    let newGab = {
      month: month,
      day: day,
      year: year,
      time: time,
      username: gab.createdBy.username,
      id:gab.id,
      body:gab.body,
      likes:gab.likedBy.length
    };
    gabList.push(newGab);
  });
  return gabList;
}

module.exports = {
  hash:hash,
  formatTime:formatTime,
  monthname:monthName
};
