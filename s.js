var revealer = (function() {
  "use strict";
  var t = function(t) {
      var n = document.querySelector(t);
      if (!n)
        throw new Error(
          "Element with selector " + t + " have not been founded"
        );
      var e = function(t, n) {
          return (n - t) / 2;
        },
        r = n.getBoundingClientRect(),
        i = r.x,
        o = r.y,
        u = r.bottom,
        c = r.right,
        l = r.left,
        a = r.top;
      return { x: l + e(i, c) + "px", y: a + e(o, u) + "px" };
    },
    n = function(n, e, r) {
      return "string" == typeof e
        ? t(e)
        : "string" == typeof (null == r ? void 0 : r.x) &&
          "string" == typeof (null == r ? void 0 : r.y)
        ? r
        : t(n);
    };
  return function(t) {
    var e = t.revealElementSelector,
      r = t.options,
      i = document.querySelector(e),
      o = !1,
      u = null,
      c = 0,
      l = c,
      a = n(
        e,
        null == r ? void 0 : r.anchorSelector,
        null == r ? void 0 : r.position
      ),
      f = function() {
        i.style.clipPath = "circle(" + l + "px at " + a.x + " " + a.y + ")";
      },
      v = function() {
        l += 0.08 * (c - l);
      },
      d = function() {
        cancelAnimationFrame(u), (u = null);
      },
      h = function() {
        (l = c), f(), d();
      },
      s = function() {
        v();
        var t = l - c > -2;
        o || d(), t ? h() : (f(), (u = requestAnimationFrame(s)));
      },
      p = function() {
        v();
        var t = Math.abs(l - c) < 2;
        o && d(), t ? h() : (f(), (u = requestAnimationFrame(p)));
      };
    return (
      f(),
      i.setAttribute("data-active", "true"),
      {
        isRevealed: function() {
          return o;
        },
        reveal: function() {
          o ||
            ((a = n(
              e,
              null == r ? void 0 : r.anchorSelector,
              null == r ? void 0 : r.position
            )),
            (c = (function(t) {
              var n = window.innerHeight,
                e = window.innerWidth;
              if ("string" == typeof t) {
                var r = document.querySelector(t).getBoundingClientRect(),
                  i = r.width;
                (n = r.height), (e = i);
              }
              return Math.sqrt(Math.pow(n, 2) + Math.pow(e, 2));
            })(e)),
            s(),
            (o = !0));
        },
        hide: function() {
          o && ((c = 0), p(), (o = !1));
        }
      }
    );
  };
})();
