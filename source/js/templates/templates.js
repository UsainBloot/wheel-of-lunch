module.exports = (function() {
    var Hogan = require('hogan');
    var templates = {};
    templates['result'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"panel panel-default result\">");t.b("\n" + i);t.b("  <div class=\"panel-body\">");t.b("\n" + i);t.b("    <h2>");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("    <p class=\"vicinity\">");t.b(t.v(t.f("vicinity",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("    <p class=\"rating\">");t.b(t.v(t.f("rating",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("    <p>");t.b("\n" + i);t.b("      <a class=\"map\" target=\"_blank\" href=\"");t.b(t.v(t.f("href",c,p,0)));t.b("\">View on map</a>");t.b("\n" + i);t.b("    </p>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    return templates;
})();