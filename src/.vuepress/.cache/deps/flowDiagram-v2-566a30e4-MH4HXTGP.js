import {
  flowRendererV2,
  flowStyles
} from "./chunk-7TH2ZCHA.js";
import "./chunk-K2KLCTR7.js";
import {
  flowDb,
  parser$1
} from "./chunk-F7MJ3WWU.js";
import "./chunk-XJ6JMY5K.js";
import "./chunk-KOSEKJY4.js";
import "./chunk-4SW6WUP4.js";
import "./chunk-QOAWL7IZ.js";
import "./chunk-AUPQ4PAP.js";
import "./chunk-UA7A6VCS.js";
import {
  require_dist
} from "./chunk-L3CNDGPF.js";
import "./chunk-UD5A6DAI.js";
import "./chunk-NMR7SKA6.js";
import {
  require_moment_min,
  setConfig
} from "./chunk-VGJ52J2T.js";
import {
  __toESM
} from "./chunk-OZI5HTJH.js";

// node_modules/mermaid/dist/flowDiagram-v2-566a30e4.js
var import_sanitize_url = __toESM(require_dist(), 1);
var import_moment_mini = __toESM(require_moment_min(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-566a30e4-MH4HXTGP.js.map
