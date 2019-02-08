var fs = require("fs");
data = fs.readFileSync("201830-Subject_Course Timetables - ttbl0010.csv");
var csv = require("csv-parse");

var xmldom = require("xmldom");
parser = new xmldom.DOMParser();
xmldoc = parser.parseFromString(data.toString(), "text/xml");
rootxml = xmldoc.documentElement;

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
  fs.writeFileSync("data/newmenu.xml", tosave);
}

function add_from_csv() {
  csvdata = fs.readFileSync("data/kids menu.csv");
  csv(csvdata, { trim: true, skip_empty_lines: true, from_line: 2 })
    .on("readable", function() {
      let record;
      let category = xmldoc.createElement("category");
      let cat_list = [];
      while ((record = this.read())) {
        
        fooditem = xmldoc.createElement("fooditem");
        price = xmldoc.createElement("price");
        pcs = xmldoc.createElement("pcs");
        foodtype = xmldoc.createElement("foodtype");

        category.setAttribute("type", record[0]);
        fooditem.setAttribute("name", record[1]);

        price.textContent = record[4];
        pcs.textContent = record[2];

        if (record[3] == "y") {
          foodtype.textContent = "V";
        } else {
          foodtype.textContent = record[3];
        }

        fooditem.appendChild(price);
        fooditem.appendChild(pcs);
        fooditem.appendChild(foodtype);
        category.appendChild(fooditem);

        rootxml.appendChild(category);
      }
    })
    .on("end", function() {
      saveData(); // save our document
    });
}
