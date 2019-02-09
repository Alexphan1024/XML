var fs = require("fs");
data = fs.readFileSync("data/temp.xml");
var csv = require("csv-parse");

var xmldom = require("xmldom");
parser = new xmldom.DOMParser();
xmldoc = parser.parseFromString(data.toString(), "text/xml");
rootxml = xmldoc.documentElement;
add_from_csv();

var http = require("http");
http
  .createServer(function(req, res) {
    data = fs.readFileSync('./data/201830-acit.xml');
    parser = new xmldom.DOMParser();
    xmldoc = parser.parseFromString(data.toString(), 'text/xml');
    rootxml = xmldoc.documentElement;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(displayOrder());
    res.end();
  })
  .listen(8080); //the server object listens on port 8080

function saveData() {
  serializer = new xmldom.XMLSerializer();
  tosave = serializer.serializeToString(xmldoc);
  fs.writeFileSync("data/201830-acit.xml", tosave);
}

function add_from_csv() {
  csvdata = fs.readFileSync("data/201830-Subject_Course Timetables.csv");
  csv(csvdata, { trim: true, skip_empty_lines: true, from_line: 2 })
    .on("readable", function() {
      let record;
      let course = xmldoc.createElement("course");
      while ((record = this.read())) {
        if (record[3].includes(process.argv[2].toUpperCase())) {
          course = xmldoc.createElement("course");
          crn = xmldoc.createElement("crn");
          type = xmldoc.createElement("type");
          day = xmldoc.createElement("day");
          bT = xmldoc.createElement("beginTime");
          eT = xmldoc.createElement("endTime");
          instr = xmldoc.createElement("instructor");
          BR = xmldoc.createElement("BldgRoom");
          startDate = xmldoc.createElement("startDate");
          endDate = xmldoc.createElement("endDate");
          max = xmldoc.createElement("max");
          act = xmldoc.createElement("act");
          hrs = xmldoc.createElement("hrs");

          course.setAttribute("type", record[3]);

          crn.textContent = record[2];
          type.textContent = record[4];
          day.textContent = record[5];
          bT.textContent = record[6];
          eT.textContent = record[7];
          instr.textContent = record[8];
          BR.textContent = record[9];
          startDate.textContent = record[10];
          endDate.textContent = record[11];
          max.textContent = record[12];
          act.textContent = record[13];
          hrs.textContent = record[14];

          course.appendChild(crn);
          course.appendChild(type);
          course.appendChild(day);
          course.appendChild(bT);
          course.appendChild(eT);
          course.appendChild(instr);
          course.appendChild(BR);
          course.appendChild(startDate);
          course.appendChild(endDate);
          course.appendChild(max);
          course.appendChild(act);
          course.appendChild(hrs);

          rootxml.appendChild(course);
        } 
      }
    })
    .on("end", function() {
      saveData(); // save our document
    });
}

function displayOrder() {
  let resultmenu = '';
  let x = rootxml.childNodes;
  for (i = 0; i < x.length; i++) {
      if (x[i].nodeName == 'course') {
        resultmenu += "<h3>CRN: " + x[i].getAttribute('type') + "</h3>";
        resultmenu += showCourse(x[i]);
      }
  }  
  return resultmenu;
}

function showCourse(dat) {
  result = '';
  choices = dat.childNodes;
  for (y = 0; y < choices.length; y++) {
    if (choices[y].nodeName == 'crn') {
      result += "<p>CRN: " + choices[y].textContent + "</p>";
    }
    else if (choices[y].nodeName == 'type') {
      result += "<p>Type: " + choices[y].textContent + "</p>";
    }
    else if (choices[y].nodeName == 'day') {
      result += "<p>Day: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'beginTime') {
      result += "<p>Begin Time: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'endTime') {
      result += "<p>End Time: " + choices[y].textContent + "</p>";
    }
    else if (choices[y].nodeName == 'instructor') {
      result += "<p>Instructor: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'BldgRoom') {
      result += "<p>Building Room: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'startDate') {
      result += "<p>Start Date: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'endDate') {
      result += "<p>End Date: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'max') {
      result += "<p>Max: " + choices[y].textContent + "</p>";
    }
    else if (choices[y].nodeName == 'act') {
      result += "<p>Act: " + choices[y].textContent + "</p>";
    } 
    else if (choices[y].nodeName == 'hrs') {
      result += "<p>Hours: " + choices[y].textContent + "</p>";
    }  
  }  
  return result
}