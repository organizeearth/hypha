<script>
  /* @type obj[] */
  export let collabsWithOrgs;
  export let currentCollab = "none";
  let hideCollab = currentCollab === "Climate Justice Collaborative" ? "none" : currentCollab;

  //$: console.log({ collabsWithOrgs });

  function getIntersection(theCollab) {
    //console.log(theCollab.orgObjects);
    let links = [];

    collabsWithOrgs.forEach(function (collab) {
      if (collab.id === theCollab.id) {
        return;
      }
      collab.orgObjects.forEach(function (org) {
        const otherCollabs = org.collabs?.filter((c) => c.id !== theCollab.id);
        //console.log({otherCollabs});
        if (!otherCollabs?.length) return;

        otherCollabs.forEach(function (otherCollab) {
          const newLink = {
            org: org,
            collab: otherCollab,
          };
          //console.log({ newLink })
          links.push(newLink);
        });
      });
    });

    return links;
  }

  function getIntersection1(theCollab) {
    //console.log(theCollab.orgObjects);
    return theCollab.orgObjects
      .filter((o) => o.collabs.length > 1)
      .map(function (o2) {
        const links = collabsWithOrgs.filter((c) =>
          o2.collabs.filter((c) => c.id !== theCollab.id).includes(c.id)
        );
        return {
          links,
        };
      });
  }

  $: collabLinks = collabsWithOrgs.map(function (c) {
    return {
      ...c,
      links: getIntersection(c),
    };
  });

  //$: console.log({ see: collabLinks[0].links });

  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const links = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 2 },
  ];

  let va = -5;
  let vb = 120;
  let vc = 190;
  let vd = 100;
</script>

<p>Collab Graph</p>

<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
  viewBox="{va} {vb} {vc} {vd}"
  style="height: 250px"
  version="1.1"
  id="svg5"
  inkscape:version="1.1.2 (0a00cf5339, 2022-02-04)"
  sodipodi:docname="diagram-home.svg"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
>
  <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
    <circle
      style="fill:#0f007f;fill-opacity:0.5;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:17.1418;stroke-opacity:1;paint-order:markers stroke fill"
      id="circle1094"
      cx="90.223732"
      cy="180.68591"
      r="10.618354"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
    />
    <circle
      class:hidden="{hideCollab === "Green Faith"}"
      style="fill:#0f007f;fill-opacity:0.5;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:17.1418;stroke-opacity:1;paint-order:markers stroke fill"
      id="path846"
      cx="59.209667"
      cy="138.35254"
      r="10.618354"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
    />
    <circle
    class:hidden="{hideCollab === "Food & Farming"}"
      style="fill:#0f007f;fill-opacity:0.5;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:17.1418;stroke-opacity:1;paint-order:markers stroke fill"
      id="circle1096"
      cx="121.23779"
      cy="138.35254"
      r="10.618354"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
    />
    <path
    class:hidden="{hideCollab === "Green Faith"}"
      style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
      d="m 65.51313,147.22802 18.322073,24.68227"
      id="path1137"
      sodipodi:nodetypes="cc"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
    />
    <path
    class:hidden="{hideCollab === "Food & Farming"}"
      style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
      d="M 115.97375,148.05583 96.874594,172.14184"
      id="path1983"
      sodipodi:nodetypes="cc"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
    />
    <text
      xml:space="preserve"
      transform="matrix(0.26458333,0,0,0.26458333,22.754168,2.1166667)"
      id="text5585"
      style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;line-height:1.25;font-family:'Noto Mono';-inkscape-font-specification:'Noto Mono Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;white-space:pre;shape-inside:url(#rect5587);fill:#000000;fill-opacity:1;stroke:none"
      inkscape:export-filename="/home/oren/Desktop/diagram-home.svg"
      inkscape:export-xdpi="173.84"
      inkscape:export-ydpi="173.84"
      ><tspan x="98.357422" y="675.21047" id="tspan11613"
        ><tspan
          style="font-weight:normal;font-family:'Noto Sans';-inkscape-font-specification:'Noto Sans'"
          id="tspan11611"
          >Climate Justice
        </tspan></tspan
      ><tspan x="98.357422" y="691.96767" id="tspan11617"
        ><tspan
          style="font-weight:normal;font-family:'Noto Sans';-inkscape-font-specification:'Noto Sans'"
          id="tspan11615">Collaborative</tspan
        ></tspan
      ></text
    >
    <text
    class:hidden="{hideCollab === "Green Faith"}"
      xml:space="preserve"
      transform="matrix(0.26458333,0,0,0.26458333,2.1166672,-34.925001)"
      id="text11363"
      style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;line-height:1.25;font-family:'Noto Mono';-inkscape-font-specification:'Noto Mono Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;white-space:pre;shape-inside:url(#rect11365);fill:#000000;fill-opacity:1;stroke:none"
      ><tspan x="98.357422" y="675.21047" id="tspan11621"
        ><tspan
          style="font-weight:normal;font-family:'Noto Sans';-inkscape-font-specification:'Noto Sans'"
          id="tspan11619"
          >Food &amp;
        </tspan></tspan
      ><tspan x="98.357422" y="691.96767" id="tspan11625"
        ><tspan
          style="font-weight:normal;font-family:'Noto Sans';-inkscape-font-specification:'Noto Sans'"
          id="tspan11623">Farming</tspan
        ></tspan
      ></text
    >
    <text
    class:hidden="{hideCollab === "Food & Farming"}"
      xml:space="preserve"
      transform="matrix(0.26458333,0,0,0.26458333,92.075006,-23.283333)"
      id="text11471"
      style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;line-height:1.25;font-family:'Noto Mono';-inkscape-font-specification:'Noto Mono Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;white-space:pre;shape-inside:url(#rect11473);fill:#000000;fill-opacity:1;stroke:none"
      ><tspan x="98.357422" y="675.21047" id="tspan11629"
        ><tspan
          style="font-weight:normal;font-family:'Noto Sans';-inkscape-font-specification:'Noto Sans'"
          id="tspan11627">Green Faith</tspan
        ></tspan
      ></text
    >
  </g>
</svg>

<!--
{#if collabsWithOrgs.length}
  <ul>
    {#each collabsWithOrgs as collab}
      <li>{collab.name}</li>
    {/each}
  </ul>
{/if}
-->

<!--
//universal width and height let index.htm control svg dimensions when needed
var lastNodeId = nodes.length;
var w = 616,
  h =  400,
  rad = 10;

var svg = d3
  .select("#svg-wrap")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var dragLine = svg
  .append("path")
  .attr("class", "dragLine hidden")
  .attr("d", "M0,0L0,0");

var edges = svg.append("g").selectAll(".edge");

var vertices = svg.append("g").selectAll(".vertex");

var force = d3
  .forceSimulation()
  .force(
    "charge",
    d3
      .forceManyBody()
      .strength(-300)
      .distanceMax(w / 2)
  )
  .force("link", d3.forceLink().distance(60))
  .force("x", d3.forceX(w / 2))
  .force("y", d3.forceY(h / 2))
  .on("tick", tick);

force.nodes(nodes);
force.force("link").links(links);

var colors = d3.schemeCategory10;

var mousedownNode = null;

var clrBtn = d3.select("#clear-graph");
clrBtn.on("click", clearGraph);

//empties the graph
function clearGraph() {
  nodes.splice(0);
  links.splice(0);
  lastNodeId = 0;
  restart();
  showGraphLatex();
}

//update the simulation
function tick() {
  edges
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  vertices
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}

function addNode() {
  var e = d3.event;
  if (e.button == 0) {
    var coords = d3.mouse(e.currentTarget);
    var newNode = { x: coords[0], y: coords[1], id: ++lastNodeId };
    nodes.push(newNode);
    restart();
    showGraphLatex();
  }
}

function removeNode(d, i) {
  //to make ctrl-drag works for mac/osx users
  if (d3.event.ctrlKey) return;
  nodes.splice(nodes.indexOf(d), 1);
  var linksToRemove = links.filter(function(l) {
    return l.source === d || l.target === d;
  });
  linksToRemove.map(function(l) {
    links.splice(links.indexOf(l), 1);
  });
  d3.event.preventDefault();
  restart();
  showGraphLatex();
}

function removeEdge(d, i) {
  links.splice(links.indexOf(d), 1);
  d3.event.preventDefault();
  restart();
  showGraphLatex();
}

function beginDragLine(d) {
  //to prevent call of addNode through svg
  d3.event.stopPropagation();
  //to prevent dragging of svg in firefox
  d3.event.preventDefault();
  if (d3.event.ctrlKey || d3.event.button != 0) return;
  mousedownNode = d;
  dragLine
    .classed("hidden", false)
    .attr(
      "d",
      "M" +
        mousedownNode.x +
        "," +
        mousedownNode.y +
        "L" +
        mousedownNode.x +
        "," +
        mousedownNode.y
    );
}

function updateDragLine() {
  var coords = d3.mouse(d3.event.currentTarget);
  if (!mousedownNode) return;
  dragLine.attr(
    "d",
    "M" +
      mousedownNode.x +
      "," +
      mousedownNode.y +
      "L" +
      coords[0] +
      "," +
      coords[1]
  );
}

function hideDragLine() {
  dragLine.classed("hidden", true);
  mousedownNode = null;
  restart();
}

//no need to call hideDragLine() and restart() in endDragLine
//mouseup on vertices propagates to svg which calls hideDragLine
function endDragLine(d) {
  if (!mousedownNode || mousedownNode === d) return;
  //return if link already exists
  for (let i = 0; i < links.length; i++) {
    var l = links[i];
    if (
      (l.source === mousedownNode && l.target === d) ||
      (l.source === d && l.target === mousedownNode)
    ) {
      return;
    }
  }
  var newLink = { source: mousedownNode, target: d };
  links.push(newLink);
  showGraphLatex();
}

//one response per ctrl keydown
var lastKeyDown = -1;

function keydown() {
  d3.event.preventDefault();
  if (lastKeyDown !== -1) return;
  lastKeyDown = d3.event.key;

  if (lastKeyDown === "Control") {
    vertices.call(
      d3
        .drag()
        .on("start", function dragstarted(d) {
          if (!d3.event.active) force.alphaTarget(1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", function(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on("end", function(d) {
          if (!d3.event.active) force.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );
  }
}

function keyup() {
  lastKeyDown = -1;
  if (d3.event.key === "Control") {
    vertices.on("mousedown.drag", null);
  }
}

//updates the graph by updating links, nodes and binding them with DOM
//interface is defined through several events
function restart() {
  edges = edges.data(links, function(d) {
    return "v" + d.source.id + "-v" + d.target.id;
  });
  edges.exit().remove();

  var ed = edges
    .enter()
    .append("line")
    .attr("class", "edge")
    .on("mousedown", function() {
      d3.event.stopPropagation();
    })
    .on("contextmenu", removeEdge);

  ed.append("title").text(function(d) {
    return "v" + d.source.id + "-v" + d.target.id;
  });

  edges = ed.merge(edges);

  //vertices are known by id
  vertices = vertices.data(nodes, function(d) {
    return d.id;
  });
  vertices.exit().remove();

  var ve = vertices
    .enter()
    .append("circle")
    .attr("r", rad)
    .attr("class", "vertex")
    .style("fill", function(d, i) {
      return colors[d.id % 10];
    })
    .on("mousedown", beginDragLine)
    .on("mouseup", endDragLine)
    .on("contextmenu", removeNode);

  ve.append("title").text(function(d) {
    return "v" + d.id;
  });

  vertices = ve.merge(vertices);

  force.nodes(nodes);
  force.force("link").links(links);
  force.alpha(0.8).restart();
}

//further interface
svg
  .on("mousedown", addNode)
  .on("mousemove", updateDragLine)
  .on("mouseup", hideDragLine)
  .on("contextmenu", function() {
    d3.event.preventDefault();
  })
  .on("mouseleave", hideDragLine);

d3.select(window)
  .on("keydown", keydown)
  .on("keyup", keyup);

restart();
showGraphLatex();

//handling output area
function showGraphLatex() {
  var v = "\\[V=\\{";
  for (let i = 0; i < nodes.length; i++) {
    if (i == 0) v += "v_{" + nodes[i].id + "}";
    else v += "," + "v_{" + nodes[i].id + "}";
    //add line break
    if ((i + 1) % 15 == 0) v += "\\\\";
  }
  v += "\\}\\]";

  var e = "\\[E=\\{";
  for (let i = 0; i < links.length; i++) {
    if (i == links.length - 1)
      e += "v_{" + links[i].source.id + "}" + "v_{" + links[i].target.id + "}";
    else
      e +=
        "v_{" +
        links[i].source.id +
        "}" +
        "v_{" +
        links[i].target.id +
        "}" +
        ",";
    //add line break
    if ((i + 1) % 10 == 0) e += "\\\\";
  }
  e += "\\}\\]";

  document.getElementById("svg-output").textContent = v + e;
  //recall mathjax
}
-->

<style>
  .hidden {
    display: none !important;
  }
</style>
