require("./bootstrap");
require("./markdown-show");
require("./markdown-edit");
require("./create-tag.js");
require("./create-like.js");
require("./flashmessage.js");
require("./input-submit.js");

window.Vue = require("vue");

const app = new Vue({
    el: "#app"
});
