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
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`Test`);
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
          course.appendChild(day);q
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
