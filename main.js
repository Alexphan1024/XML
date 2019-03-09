var fs = require("fs");
data = fs.readFileSync("data/temp.xml");
var csv = require("csv-parse");

var xmldom = require("xmldom");
parser = new xmldom.DOMParser();
xmldoc = parser.parseFromString(data.toString(), "text/xml");
xmldoc_teacher = parser.parseFromString(data.toString(), "text/xml");
rootxml = xmldoc.documentElement;
rootxml_teacher = xmldoc_teacher.documentElement;
var process_argv = process.argv[2];
add_from_csv_student();
add_from_csv_teacher()

var http = require("http");
http
  .createServer(function(req, res) {
    data = fs.readFileSync(`data/201830-${process_argv}.xml`);
    parser = new xmldom.DOMParser();
    xmldoc = parser.parseFromString(data.toString(), "text/xml");
    rootxml = xmldoc.documentElement;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(studentDisplayOrder());

    data2 = fs.readFileSync(`data/201830-${process_argv}-teacher.xml`);
    parser2 = new xmldom.DOMParser();
    xmldoc2 = parser2.parseFromString(data2.toString(), "text/xml");
    rootxml2 = xmldoc2.documentElement;
    res.write(teacherDisplayOrder());
    
    res.end();
  })
  .listen(8080); //the server object listens on port 8080

function studentSaveData() {
  serializer = new xmldom.XMLSerializer();
  tosave = serializer.serializeToString(xmldoc);
  fs.writeFileSync(`data/201830-${process_argv}.xml`, tosave);
}

function teacherSaveData() {
  serializer = new xmldom.XMLSerializer();
  tosave = serializer.serializeToString(xmldoc_teacher);
  fs.writeFileSync(`data/201830-${process_argv}-teacher.xml`, tosave);
}


function add_from_csv_student() {
  csvdata = fs.readFileSync("data/201830-Subject_Course Timetables.csv");
  csv(csvdata, { trim: true, skip_empty_lines: true, from_line: 2 })
    .on("readable", function() {
      let record;
      while ((record = this.read())) {
        if (record[1].includes(process.argv[2].toUpperCase())) {
          if (record[8].includes("*") || record[8] == " ,") {
            continue;
          } else {
            student_xml(record)
          }
        }
      }
    })
    .on("end", function() {
      studentSaveData(); // save our document
    });
}

function add_from_csv_teacher() {
  csvdata = fs.readFileSync("data/201830-Subject_Course Timetables.csv");
  csv(csvdata, { trim: true, skip_empty_lines: true, from_line: 2 })
    .on("readable", function() {
      let record;
      while ((record = this.read())) {
        if (record[1].includes(process.argv[2].toUpperCase())) {
          if (record[8].includes("*") || record[8] == " ,") {
            continue;
          } else {
            teacher_xml(record)
          }
        }
      }
    })
    .on("end", function() {
      teacherSaveData(); // save our document
    });
}

var list = [];
function student_xml(data) {
    if(list.includes(`${data[1].replace(/ /g, "_")}`) == false){
      newItem = xmldoc.createElement( `${data[1].replace(/ /g, "_")}`);
      rootxml.appendChild(newItem)
      list.push(`${data[1].replace(/ /g, "_")}`)

      // block = xmldoc.createElement("block");
      // block.setAttribute("name", `${data[1].replace(/ /g, "_")}`);
      // rootxml.appendChild(block);
    }

      status = xmldoc.createElement("status");
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

      course.setAttribute("name", data[3]);

      status.textContent = data[0]
      crn.textContent = data[2];
      type.textContent = data[4];
      day.textContent = data[5];
      bT.textContent = data[6];
      eT.textContent = data[7];
      instr.textContent = data[8];
      BR.textContent = data[9];
      startDate.textContent = data[10];
      endDate.textContent = data[11];
      max.textContent = data[12];
      act.textContent = data[13];
      hrs.textContent = data[14];

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
    
      rootxml.getElementsByTagName(`${data[1].replace(/ /g, "_")}`)[0].appendChild(course)
}

var list2 = [];
function teacher_xml(data) {
  if(list2.includes(`${data[8].replace(/ /g, "_").replace(/,/g, '_').replace(/'/g, '_')}`) == false){
    newItem = xmldoc_teacher .createElement( `${data[8].replace(/ /g, "_").replace(/,/g, '_').replace(/'/g, '_')}`);
    rootxml_teacher.appendChild(newItem)
    list2.push(`${data[8].replace(/ /g, "_").replace(/,/g, '_').replace(/'/g, '_')}`)

    // block = xmldoc_teacher _teacher .createElement("block");
    // block.setAttribute("name", `${data[1].replace(/ /g, "_")}`);
    // rootxml.appendChild(block);
  }

    status = xmldoc_teacher .createElement("status");
    course = xmldoc_teacher .createElement("course");
    crn = xmldoc_teacher .createElement("crn");
    type = xmldoc_teacher .createElement("type");
    day = xmldoc_teacher .createElement("day");
    bT = xmldoc_teacher .createElement("beginTime");
    eT = xmldoc_teacher .createElement("endTime");
    block = xmldoc_teacher .createElement("block");
    BR = xmldoc_teacher .createElement("BldgRoom");
    startDate = xmldoc_teacher .createElement("startDate");
    endDate = xmldoc_teacher .createElement("endDate");
    max = xmldoc_teacher .createElement("max");
    act = xmldoc_teacher .createElement("act");
    hrs = xmldoc_teacher .createElement("hrs");

    course.setAttribute("name", data[3]);

    status.textContent = data[0];
    block.textContent = data[1];
    crn.textContent = data[2];
    type.textContent = data[4];
    day.textContent = data[5];
    bT.textContent = data[6];
    eT.textContent = data[7];
    BR.textContent = data[9];
    startDate.textContent = data[10];
    endDate.textContent = data[11];
    max.textContent = data[12];
    act.textContent = data[13];
    hrs.textContent = data[14];
    

    course.appendChild(crn);
    course.appendChild(type);
    course.appendChild(day);
    course.appendChild(bT);
    course.appendChild(eT);
    course.appendChild(block);
    course.appendChild(BR);
    course.appendChild(startDate);
    course.appendChild(endDate);
    course.appendChild(max);
    course.appendChild(act);
    course.appendChild(hrs);
  
    rootxml_teacher.getElementsByTagName(`${data[8].replace(/ /g, "_").replace(/,/g, '_').replace(/'/g, '_')}`)[0].appendChild(course)
}

function studentDisplayOrder() {
  let resultmenu = "<h1>STUDENT TIMETABLE:</h1>";
  let x = rootxml.childNodes;
  for (i = 1; i < x.length; i++) {
    resultmenu += "<h3>Block: " + x[i].nodeName + "</h3>";
    resultmenu += studentShowCourse(x[i]);
  }
  return resultmenu;
}

function studentShowCourse(dat) {
  result = "";
  choices = dat.childNodes;
  for (y = 0; y < choices.length; y++) {
      result += "<p>Course: " + choices[y].getAttribute("name") + " - " + choices[y].childNodes[5].textContent +"</p>";
    // if (choices[y].nodeName == "crn") {
    //   result += "<p>CRN: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "type") {
    //   result += "<p>Type: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "day") {
    //   result += "<p>Day: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "beginTime") {
    //   result += "<p>Begin Time: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "endTime") {
    //   result += "<p>End Time: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "instructor") {
    //   result += "<p>Instructor: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "BldgRoom") {
    //   result += "<p>Building Room: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "startDate") {
    //   result += "<p>Start Date: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "endDate") {
    //   result += "<p>End Date: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "max") {
    //   result += "<p>Max Student: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "act") {
    //   result += "<p>Active Students: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "hrs") {
    //   result += "<p>Hours: " + choices[y].textContent + "</p>";
    // }
  }
  return result;
}

function teacherDisplayOrder() {
  let resultmenu = "<h1>TEACHER TIMETABLE:</h1>";
  let x = rootxml2.childNodes;
  for (i = 1; i < x.length; i++) {
    resultmenu += "<h3>Instrutor: " + x[i].nodeName + "</h3>";
    resultmenu += studentShowCourse(x[i]);
  }
  return resultmenu;
}

function teacherShowCourse(dat) {
  result = "";
  choices = dat.childNodes;
  for (y = 0; y < choices.length; y++) {
      result += "<p>Course: " + choices[y].getAttribute("name") + " - " + choices[y].childNodes[5].textContent +"</p>";
    // if (choices[y].nodeName == "crn") {
    //   result += "<p>CRN: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "type") {
    //   result += "<p>Type: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "day") {
    //   result += "<p>Day: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "beginTime") {
    //   result += "<p>Begin Time: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "endTime") {
    //   result += "<p>End Time: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "instructor") {
    //   result += "<p>Instructor: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "BldgRoom") {
    //   result += "<p>Building Room: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "startDate") {
    //   result += "<p>Start Date: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "endDate") {
    //   result += "<p>End Date: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "max") {
    //   result += "<p>Max Student: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "act") {
    //   result += "<p>Active Students: " + choices[y].textContent + "</p>";
    // } else if (choices[y].nodeName == "hrs") {
    //   result += "<p>Hours: " + choices[y].textContent + "</p>";
    // }
  }
  return result;
}

