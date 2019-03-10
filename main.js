var fs = require("fs");
var csv = require("csv-parse");
var validator = require('xsd-schema-validator');
var xmldom = require("xmldom");

parser = new xmldom.DOMParser();
xmldoc = parser.parseFromString(`<program xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="class.xsd"></program>`, "text/xml");
xmldoc_teacher = parser.parseFromString(`<program xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="teacher.xsd"></program>`, "text/xml");
rootxml = xmldoc.documentElement;
rootxml_teacher = xmldoc_teacher.documentElement;
var process_argv = process.argv[2];
add_from_csv_student();
add_from_csv_teacher()

var http = require("http");
http
  .createServer(function(req, res) {
    data = fs.readFileSync(`data/201830-${process_argv}.xml`);

    validator.validateXML(data, 'data/class.xsd', function (err, result) {
        if (err) {
          console.log(result);
        }

        result.valid; // true
    });

    parser = new xmldom.DOMParser();
    xmldoc = parser.parseFromString(data.toString(), "text/xml");
    rootxml = xmldoc.documentElement;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(studentDisplayOrder());

    data2 = fs.readFileSync(`data/201830-${process_argv}-teacher.xml`);

    validator.validateXML(data2, 'data/teacher.xsd', function (err, result) {
        if (err) {
          console.log(result);
        }

        result.valid; // true
    });

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
  tosave =`<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE program SYSTEM "${__dirname}\\data\\class.dtd">${tosave}`;
  fs.writeFileSync(`data/201830-${process_argv}.xml`, tosave);
}

function teacherSaveData() {
  serializer = new xmldom.XMLSerializer();
  tosave = serializer.serializeToString(xmldoc_teacher);
  tosave =`<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE program SYSTEM "${__dirname}\\data\\teacher.dtd">${tosave}`;
  fs.writeFileSync(`data/201830-${process_argv}-teacher.xml`, tosave);
}


function add_from_csv_student() {
  csvdata = fs.readFileSync("data/201830-Subject_Course Timetables.csv");
  csv(csvdata, { trim: true, skip_empty_lines: true, from_line: 2 })
    .on("readable", function() {
      let record;
      while ((record = this.read())) {
        if (record[1].includes(process.argv[2].toUpperCase())) {
          if (record[8].includes("*") || record[8] == " ," || record[0] == "Inactive") {
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
    if(list.includes(data[1].replace(/\*/g, '').trim()) == false){
      list.push(data[1].replace(/\*/g, '').trim())

      block = xmldoc.createElement("block");
      block.setAttribute("name", data[1].replace(/\*/g, '').trim());
      rootxml.appendChild(block);
    }

      status = xmldoc.createElement("status");
      course = xmldoc.createElement("course");
      crn = xmldoc.createElement("crn");
      type = xmldoc.createElement("type");
      day = xmldoc.createElement("day");
      bT = xmldoc.createElement("beginTime");
      eT = xmldoc.createElement("endTime");
      block = xmldoc.createElement("block");
      instr = xmldoc.createElement("instructor");
      BR = xmldoc.createElement("BldgRoom");
      startDate = xmldoc.createElement("startDate");
      endDate = xmldoc.createElement("endDate");
      max = xmldoc.createElement("max");
      act = xmldoc.createElement("act");
      hrs = xmldoc.createElement("hrs");

      course.setAttribute("name", data[3]);

      status.textContent = data[0].replace(/\*/g, '').trim();
      block.textContent = data[1].replace(/\*/g, '').trim();
      crn.textContent = data[2].replace(/\*/g, '').trim();
      type.textContent = data[4].replace(/\*/g, '').trim();
      day.textContent = data[5].replace(/\*/g, '').trim();
      bT.textContent = data[6].replace(/\*/g, '').trim();
      eT.textContent = data[7].replace(/\*/g, '').trim();
      instr.textContent = data[8].replace(/\*/g, '').trim();
      BR.textContent = data[9].replace(/\*/g, '').trim();
      startDate.textContent = data[10].replace(/\*/g, '').trim();
      endDate.textContent = data[11].replace(/\*/g, '').trim();
      max.textContent = data[12].replace(/\*/g, '').trim();
      act.textContent = data[13].replace(/\*/g, '').trim();
      hrs.textContent = data[14].replace(/\*/g, '').trim();

      course.appendChild(block);
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

      for (i = 0; i < rootxml.childNodes.length; i++) {
        if (rootxml.childNodes[i].getAttribute("name") == course.childNodes[0].textContent){
            course.removeChild(course.childNodes[0])
            rootxml.childNodes[i].appendChild(course)
        }
      }
}

var list2 = [];
function teacher_xml(data) {
  if(list2.includes(data[8].replace(/\*/g, '').trim()) == false){
    list2.push(data[8].replace(/\*/g, '').trim())

    block = xmldoc_teacher.createElement("instructor");
    block.setAttribute("name", data[8].replace(/\*/g, '').trim());
    rootxml_teacher.appendChild(block);
  }

    status = xmldoc_teacher.createElement("status");
    course = xmldoc_teacher.createElement("course");
    crn = xmldoc_teacher.createElement("crn");
    type = xmldoc_teacher.createElement("type");
    instr = xmldoc_teacher.createElement("instructor");
    day = xmldoc_teacher.createElement("day");
    bT = xmldoc_teacher.createElement("beginTime");
    eT = xmldoc_teacher.createElement("endTime");
    block = xmldoc_teacher.createElement("block");
    BR = xmldoc_teacher.createElement("BldgRoom");
    startDate = xmldoc_teacher.createElement("startDate");
    endDate = xmldoc_teacher.createElement("endDate");
    max = xmldoc_teacher.createElement("max");
    act = xmldoc_teacher.createElement("act");
    hrs = xmldoc_teacher.createElement("hrs");

    course.setAttribute("name", data[3]);

    instr.textContent = data[8].replace(/\*/g, '').trim();
    status.textContent = data[0].replace(/\*/g, '').trim();
    block.textContent = data[1].replace(/\*/g, '').trim();
    crn.textContent = data[2].replace(/\*/g, '').trim();
    type.textContent = data[4].replace(/\*/g, '').trim();
    day.textContent = data[5].replace(/\*/g, '').trim();
    bT.textContent = data[6].replace(/\*/g, '').trim();
    eT.textContent = data[7].replace(/\*/g, '').trim();
    BR.textContent = data[9].replace(/\*/g, '').trim();
    startDate.textContent = data[10].replace(/\*/g, '').trim();
    endDate.textContent = data[11].replace(/\*/g, '').trim();
    max.textContent = data[12].replace(/\*/g, '').trim();
    act.textContent = data[13].replace(/\*/g, '').trim();
    hrs.textContent = data[14].replace(/\*/g, '').trim();
    
    course.appendChild(instr);
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
  
    for (i = 0; i < rootxml_teacher.childNodes.length; i++) {
      if (rootxml_teacher.childNodes[i].getAttribute("name") == course.childNodes[0].textContent){
          course.removeChild(course.childNodes[0])
          rootxml_teacher.childNodes[i].appendChild(course)
      }
    }
}

function studentDisplayOrder() {
  let resultmenu = "<h1>STUDENT TIMETABLE:</h1>";
  let x = rootxml.childNodes;
  for (i = 0; i < x.length; i++) {
    resultmenu += "<h3>Block: " + x[i].getAttribute("name") + "</h3>";
    resultmenu += studentShowCourse(x[i]);
  }
  return resultmenu;
}

function studentShowCourse(dat) {
  result = "";
  choices = dat.childNodes;
  for (y = 0; y < choices.length; y++) {
      result += "<p>Course: " + choices[y].getAttribute("name") + " - " + choices[y].childNodes[5].textContent +"</p>";
  }
  return result;
}

function teacherDisplayOrder() {
  let resultmenu = "<h1>INSTRUCTOR TIMETABLE:</h1>";
  let x = rootxml2.childNodes;
  for (i = 0; i < x.length; i++) {
    resultmenu += "<h3>Instructor: " + x[i].getAttribute("name") + "</h3>";
    resultmenu += teacherShowCourse(x[i]);
  }
  return resultmenu;
}

function teacherShowCourse(dat) {
  result = "";
  choices = dat.childNodes;
  for (y = 0; y < choices.length; y++) {
      result += "<p>Course: " + choices[y].getAttribute("name") + " - " + choices[y].childNodes[5].textContent +"</p>";
  }
  return result;
}

