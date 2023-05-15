import {
  db,
  parser$1,
  styles
} from "./chunk-OWK6U4YZ.js";
import {
  render
} from "./chunk-K2KLCTR7.js";
import "./chunk-XJ6JMY5K.js";
import "./chunk-KOSEKJY4.js";
import {
  Graph
} from "./chunk-4SW6WUP4.js";
import "./chunk-QOAWL7IZ.js";
import "./chunk-AUPQ4PAP.js";
import "./chunk-UA7A6VCS.js";
import {
  getStylesFromArray,
  interpolateToCurve,
  require_dist,
  utils
} from "./chunk-L3CNDGPF.js";
import {
  setupGraphViewbox
} from "./chunk-UD5A6DAI.js";
import "./chunk-NMR7SKA6.js";
import {
  common,
  getConfig,
  linear_default,
  log,
  require_moment_min,
  select_default
} from "./chunk-VGJ52J2T.js";
import {
  __toESM
} from "./chunk-OZI5HTJH.js";

// node_modules/mermaid/dist/classDiagram-v2-4cc74290.js
var import_moment_mini = __toESM(require_moment_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var sanitizeText = (txt) => common.sanitizeText(txt, getConfig());
var conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10
};
var addClasses = function(classes, g, _id, diagObj) {
  const keys = Object.keys(classes);
  log.info("keys:", keys);
  log.info(classes);
  keys.forEach(function(id) {
    const vertex = classes[id];
    let cssClassStr = "";
    if (vertex.cssClasses.length > 0) {
      cssClassStr = cssClassStr + " " + vertex.cssClasses.join(" ");
    }
    const styles2 = { labelStyle: "" };
    let vertexText = vertex.text !== void 0 ? vertex.text : vertex.id;
    let radious = 0;
    let _shape = "";
    switch (vertex.type) {
      case "class":
        _shape = "class_box";
        break;
      default:
        _shape = "class_box";
    }
    g.setNode(vertex.id, {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: sanitizeText(vertexText),
      classData: vertex,
      rx: radious,
      ry: radious,
      class: cssClassStr,
      style: styles2.style,
      id: vertex.id,
      domId: vertex.domId,
      tooltip: diagObj.db.getTooltip(vertex.id) || "",
      haveCallback: vertex.haveCallback,
      link: vertex.link,
      width: vertex.type === "group" ? 500 : void 0,
      type: vertex.type,
      padding: getConfig().flowchart.padding
    });
    log.info("setNode", {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: vertexText,
      rx: radious,
      ry: radious,
      class: cssClassStr,
      style: styles2.style,
      id: vertex.id,
      width: vertex.type === "group" ? 500 : void 0,
      type: vertex.type,
      padding: getConfig().flowchart.padding
    });
  });
};
var addNotes = function(notes, g, startEdgeId, classes) {
  log.info(notes);
  notes.forEach(function(note, i) {
    const vertex = note;
    let cssNoteStr = "";
    const styles2 = { labelStyle: "", style: "" };
    let vertexText = vertex.text;
    let radious = 0;
    let _shape = "note";
    g.setNode(vertex.id, {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: sanitizeText(vertexText),
      noteData: vertex,
      rx: radious,
      ry: radious,
      class: cssNoteStr,
      style: styles2.style,
      id: vertex.id,
      domId: vertex.id,
      tooltip: "",
      type: "note",
      padding: getConfig().flowchart.padding
    });
    log.info("setNode", {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: vertexText,
      rx: radious,
      ry: radious,
      style: styles2.style,
      id: vertex.id,
      type: "note",
      padding: getConfig().flowchart.padding
    });
    if (!vertex.class || !(vertex.class in classes)) {
      return;
    }
    const edgeId = startEdgeId + i;
    const edgeData = {};
    edgeData.classes = "relation";
    edgeData.pattern = "dotted";
    edgeData.id = `edgeNote${edgeId}`;
    edgeData.arrowhead = "none";
    log.info(`Note edge: ${JSON.stringify(edgeData)}, ${JSON.stringify(vertex)}`);
    edgeData.startLabelRight = "";
    edgeData.endLabelLeft = "";
    edgeData.arrowTypeStart = "none";
    edgeData.arrowTypeEnd = "none";
    let style = "fill:none";
    let labelStyle = "";
    edgeData.style = style;
    edgeData.labelStyle = labelStyle;
    edgeData.curve = interpolateToCurve(conf.curve, linear_default);
    g.setEdge(vertex.id, vertex.class, edgeData, edgeId);
  });
};
var addRelations = function(relations, g) {
  const conf2 = getConfig().flowchart;
  let cnt = 0;
  relations.forEach(function(edge) {
    cnt++;
    const edgeData = {};
    edgeData.classes = "relation";
    edgeData.pattern = edge.relation.lineType == 1 ? "dashed" : "solid";
    edgeData.id = "id" + cnt;
    if (edge.type === "arrow_open") {
      edgeData.arrowhead = "none";
    } else {
      edgeData.arrowhead = "normal";
    }
    log.info(edgeData, edge);
    edgeData.startLabelRight = edge.relationTitle1 === "none" ? "" : edge.relationTitle1;
    edgeData.endLabelLeft = edge.relationTitle2 === "none" ? "" : edge.relationTitle2;
    edgeData.arrowTypeStart = getArrowMarker(edge.relation.type1);
    edgeData.arrowTypeEnd = getArrowMarker(edge.relation.type2);
    let style = "";
    let labelStyle = "";
    if (edge.style !== void 0) {
      const styles2 = getStylesFromArray(edge.style);
      style = styles2.style;
      labelStyle = styles2.labelStyle;
    } else {
      style = "fill:none";
    }
    edgeData.style = style;
    edgeData.labelStyle = labelStyle;
    if (edge.interpolate !== void 0) {
      edgeData.curve = interpolateToCurve(edge.interpolate, linear_default);
    } else if (relations.defaultInterpolate !== void 0) {
      edgeData.curve = interpolateToCurve(relations.defaultInterpolate, linear_default);
    } else {
      edgeData.curve = interpolateToCurve(conf2.curve, linear_default);
    }
    edge.text = edge.title;
    if (edge.text === void 0) {
      if (edge.style !== void 0) {
        edgeData.arrowheadStyle = "fill: #333";
      }
    } else {
      edgeData.arrowheadStyle = "fill: #333";
      edgeData.labelpos = "c";
      if (getConfig().flowchart.htmlLabels) {
        edgeData.labelType = "html";
        edgeData.label = '<span class="edgeLabel">' + edge.text + "</span>";
      } else {
        edgeData.labelType = "text";
        edgeData.label = edge.text.replace(common.lineBreakRegex, "\n");
        if (edge.style === void 0) {
          edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none";
        }
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
      }
    }
    g.setEdge(edge.id1, edge.id2, edgeData, cnt);
  });
};
var setConf = function(cnf) {
  const keys = Object.keys(cnf);
  keys.forEach(function(key) {
    conf[key] = cnf[key];
  });
};
var draw = function(text, id, _version, diagObj) {
  log.info("Drawing class - ", id);
  const conf2 = getConfig().flowchart;
  const securityLevel = getConfig().securityLevel;
  log.info("config:", conf2);
  const nodeSpacing = conf2.nodeSpacing || 50;
  const rankSpacing = conf2.rankSpacing || 50;
  const g = new Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: diagObj.db.getDirection(),
    nodesep: nodeSpacing,
    ranksep: rankSpacing,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  const classes = diagObj.db.getClasses();
  const relations = diagObj.db.getRelations();
  const notes = diagObj.db.getNotes();
  log.info(relations);
  addClasses(classes, g, id, diagObj);
  addRelations(relations, g);
  addNotes(notes, g, relations.length + 1, classes);
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select_default("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
  const svg = root.select(`[id="${id}"]`);
  const element = root.select("#" + id + " g");
  render(
    element,
    g,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    id
  );
  utils.insertTitle(svg, "classTitleText", conf2.titleTopMargin, diagObj.db.getDiagramTitle());
  setupGraphViewbox(g, svg, conf2.diagramPadding, conf2.useMaxWidth);
  if (!conf2.htmlLabels) {
    const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
    const labels = doc.querySelectorAll('[id="' + id + '"] .edgeLabel .label');
    for (const label of labels) {
      const dim = label.getBBox();
      const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("rx", 0);
      rect.setAttribute("ry", 0);
      rect.setAttribute("width", dim.width);
      rect.setAttribute("height", dim.height);
      label.insertBefore(rect, label.firstChild);
    }
  }
};
function getArrowMarker(type) {
  let marker;
  switch (type) {
    case 0:
      marker = "aggregation";
      break;
    case 1:
      marker = "extension";
      break;
    case 2:
      marker = "composition";
      break;
    case 3:
      marker = "dependency";
      break;
    case 4:
      marker = "lollipop";
      break;
    default:
      marker = "none";
  }
  return marker;
}
var renderer = {
  setConf,
  draw
};
var diagram = {
  parser: parser$1,
  db,
  renderer,
  styles,
  init: (cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    db.clear();
  }
};
export {
  diagram
};
//# sourceMappingURL=classDiagram-v2-4cc74290-4APZPV57.js.map
