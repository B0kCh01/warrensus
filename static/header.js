var mainBundle = (function () {
  "use strict";
  function t(t) {
    var n = this.constructor;
    return this.then(
      function (e) {
        return n.resolve(t()).then(function () {
          return e;
        });
      },
      function (e) {
        return n.resolve(t()).then(function () {
          return n.reject(e);
        });
      }
    );
  }
  function n(t) {
    return Boolean(t && "undefined" != typeof t.length);
  }
  function e() {}
  function r(t, n) {
    return function () {
      t.apply(n, arguments);
    };
  }
  function a(t) {
    if (!(this instanceof a))
      throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof t) throw new TypeError("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = void 0),
      (this._deferreds = []),
      u(t, this);
  }
  function i(t, n) {
    for (; 3 === t._state; ) t = t._value;
    return 0 === t._state
      ? void t._deferreds.push(n)
      : ((t._handled = !0),
        void a._immediateFn(function () {
          var e = 1 === t._state ? n.onFulfilled : n.onRejected;
          if (null === e)
            return void (1 === t._state ? o : l)(n.promise, t._value);
          var r;
          try {
            r = e(t._value);
          } catch (a) {
            return void l(n.promise, a);
          }
          o(n.promise, r);
        }));
  }
  function o(t, n) {
    try {
      if (n === t)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (n && ("object" == typeof n || "function" == typeof n)) {
        var e = n.then;
        if (n instanceof a) return (t._state = 3), (t._value = n), void s(t);
        if ("function" == typeof e) return void u(r(e, n), t);
      }
      (t._state = 1), (t._value = n), s(t);
    } catch (i) {
      l(t, i);
    }
  }
  function l(t, n) {
    (t._state = 2), (t._value = n), s(t);
  }
  function s(t) {
    2 === t._state &&
      0 === t._deferreds.length &&
      a._immediateFn(function () {
        t._handled || a._unhandledRejectionFn(t._value);
      });
    for (var n = 0, e = t._deferreds.length; n < e; n++) i(t, t._deferreds[n]);
    t._deferreds = null;
  }
  function c(t, n, e) {
    (this.onFulfilled = "function" == typeof t ? t : null),
      (this.onRejected = "function" == typeof n ? n : null),
      (this.promise = e);
  }
  function u(t, n) {
    var e = !1;
    try {
      t(
        function (t) {
          e || ((e = !0), o(n, t));
        },
        function (t) {
          e || ((e = !0), l(n, t));
        }
      );
    } catch (r) {
      if (e) return;
      (e = !0), l(n, r);
    }
  }
  function p(t) {
    return t && DataView.prototype.isPrototypeOf(t);
  }
  function b(t) {
    if (
      ("string" != typeof t && (t = String(t)),
      /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))
    )
      throw new TypeError("Invalid character in header field name");
    return t.toLowerCase();
  }
  function d(t) {
    return "string" != typeof t && (t = String(t)), t;
  }
  function f(t) {
    var n = {
      next: function () {
        var n = t.shift();
        return { done: void 0 === n, value: n };
      },
    };
    return (
      bn.iterable &&
        (n[Symbol.iterator] = function () {
          return n;
        }),
      n
    );
  }
  function h(t) {
    (this.map = {}),
      t instanceof h
        ? t.forEach(function (t, n) {
            this.append(n, t);
          }, this)
        : Array.isArray(t)
        ? t.forEach(function (t) {
            this.append(t[0], t[1]);
          }, this)
        : t &&
          Object.getOwnPropertyNames(t).forEach(function (n) {
            this.append(n, t[n]);
          }, this);
  }
  function m(t) {
    return t.bodyUsed
      ? Promise.reject(new TypeError("Already read"))
      : void (t.bodyUsed = !0);
  }
  function g(t) {
    return new Promise(function (n, e) {
      (t.onload = function () {
        n(t.result);
      }),
        (t.onerror = function () {
          e(t.error);
        });
    });
  }
  function v(t) {
    var n = new FileReader(),
      e = g(n);
    return n.readAsArrayBuffer(t), e;
  }
  function w(t) {
    var n = new FileReader(),
      e = g(n);
    return n.readAsText(t), e;
  }
  function y(t) {
    for (
      var n = new Uint8Array(t), e = new Array(n.length), r = 0;
      r < n.length;
      r++
    )
      e[r] = String.fromCharCode(n[r]);
    return e.join("");
  }
  function k(t) {
    if (t.slice) return t.slice(0);
    var n = new Uint8Array(t.byteLength);
    return n.set(new Uint8Array(t)), n.buffer;
  }
  function x() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (t) {
        (this._bodyInit = t),
          t
            ? "string" == typeof t
              ? (this._bodyText = t)
              : bn.blob && Blob.prototype.isPrototypeOf(t)
              ? (this._bodyBlob = t)
              : bn.formData && FormData.prototype.isPrototypeOf(t)
              ? (this._bodyFormData = t)
              : bn.searchParams && URLSearchParams.prototype.isPrototypeOf(t)
              ? (this._bodyText = t.toString())
              : bn.arrayBuffer && bn.blob && p(t)
              ? ((this._bodyArrayBuffer = k(t.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : bn.arrayBuffer &&
                (ArrayBuffer.prototype.isPrototypeOf(t) || fn(t))
              ? (this._bodyArrayBuffer = k(t))
              : (this._bodyText = t = Object.prototype.toString.call(t))
            : (this._bodyText = ""),
          this.headers.get("content-type") ||
            ("string" == typeof t
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set("content-type", this._bodyBlob.type)
              : bn.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(t) &&
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8"
                ));
      }),
      bn.blob &&
        ((this.blob = function () {
          var t = m(this);
          if (t) return t;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          return this._bodyArrayBuffer
            ? m(this) || Promise.resolve(this._bodyArrayBuffer)
            : this.blob().then(v);
        })),
      (this.text = function () {
        var t = m(this);
        if (t) return t;
        if (this._bodyBlob) return w(this._bodyBlob);
        if (this._bodyArrayBuffer)
          return Promise.resolve(y(this._bodyArrayBuffer));
        if (this._bodyFormData)
          throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText);
      }),
      bn.formData &&
        (this.formData = function () {
          return this.text().then(S);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  function _(t) {
    var n = t.toUpperCase();
    return hn.indexOf(n) > -1 ? n : t;
  }
  function C(t, n) {
    n = n || {};
    var e = n.body;
    if (t instanceof C) {
      if (t.bodyUsed) throw new TypeError("Already read");
      (this.url = t.url),
        (this.credentials = t.credentials),
        n.headers || (this.headers = new h(t.headers)),
        (this.method = t.method),
        (this.mode = t.mode),
        (this.signal = t.signal),
        e || null == t._bodyInit || ((e = t._bodyInit), (t.bodyUsed = !0));
    } else this.url = String(t);
    if (
      ((this.credentials = n.credentials || this.credentials || "same-origin"),
      (!n.headers && this.headers) || (this.headers = new h(n.headers)),
      (this.method = _(n.method || this.method || "GET")),
      (this.mode = n.mode || this.mode || null),
      (this.signal = n.signal || this.signal),
      (this.referrer = null),
      ("GET" === this.method || "HEAD" === this.method) && e)
    )
      throw new TypeError("Body not allowed for GET or HEAD requests");
    this._initBody(e);
  }
  function S(t) {
    var n = new FormData();
    return (
      t
        .trim()
        .split("&")
        .forEach(function (t) {
          if (t) {
            var e = t.split("="),
              r = e.shift().replace(/\+/g, " "),
              a = e.join("=").replace(/\+/g, " ");
            n.append(decodeURIComponent(r), decodeURIComponent(a));
          }
        }),
      n
    );
  }
  function R(t) {
    var n = new h(),
      e = t.replace(/\r?\n[\t ]+/g, " ");
    return (
      e.split(/\r?\n/).forEach(function (t) {
        var e = t.split(":"),
          r = e.shift().trim();
        if (r) {
          var a = e.join(":").trim();
          n.append(r, a);
        }
      }),
      n
    );
  }
  function L(t, n) {
    n || (n = {}),
      (this.type = "default"),
      (this.status = void 0 === n.status ? 200 : n.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = "statusText" in n ? n.statusText : "OK"),
      (this.headers = new h(n.headers)),
      (this.url = n.url || ""),
      this._initBody(t);
  }
  function F(t, n) {
    return new Promise(function (e, r) {
      function a() {
        o.abort();
      }
      var i = new C(t, n);
      if (i.signal && i.signal.aborted)
        return r(new gn("Aborted", "AbortError"));
      var o = new XMLHttpRequest();
      (o.onload = function () {
        var t = {
          status: o.status,
          statusText: o.statusText,
          headers: R(o.getAllResponseHeaders() || ""),
        };
        t.url =
          "responseURL" in o ? o.responseURL : t.headers.get("X-Request-URL");
        var n = "response" in o ? o.response : o.responseText;
        e(new L(n, t));
      }),
        (o.onerror = function () {
          r(new TypeError("Network request failed"));
        }),
        (o.ontimeout = function () {
          r(new TypeError("Network request failed"));
        }),
        (o.onabort = function () {
          r(new gn("Aborted", "AbortError"));
        }),
        o.open(i.method, i.url, !0),
        "include" === i.credentials
          ? (o.withCredentials = !0)
          : "omit" === i.credentials && (o.withCredentials = !1),
        "responseType" in o && bn.blob && (o.responseType = "blob"),
        i.headers.forEach(function (t, n) {
          o.setRequestHeader(n, t);
        }),
        i.signal &&
          (i.signal.addEventListener("abort", a),
          (o.onreadystatechange = function () {
            4 === o.readyState && i.signal.removeEventListener("abort", a);
          })),
        o.send("undefined" == typeof i._bodyInit ? null : i._bodyInit);
    });
  }
  function N(t) {
    return (N =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function E(t) {
    this.wrapped = t;
  }
  function M(t) {
    function n(t, n) {
      return new Promise(function (r, o) {
        var l = { key: t, arg: n, resolve: r, reject: o, next: null };
        i ? (i = i.next = l) : ((a = i = l), e(t, n));
      });
    }
    function e(n, a) {
      try {
        var i = t[n](a),
          o = i.value,
          l = o instanceof E;
        Promise.resolve(l ? o.wrapped : o).then(
          function (t) {
            return l
              ? void e("next", t)
              : void r(i.done ? "return" : "normal", t);
          },
          function (t) {
            e("throw", t);
          }
        );
      } catch (s) {
        r("throw", s);
      }
    }
    function r(t, n) {
      switch (t) {
        case "return":
          a.resolve({ value: n, done: !0 });
          break;
        case "throw":
          a.reject(n);
          break;
        default:
          a.resolve({ value: n, done: !1 });
      }
      (a = a.next), a ? e(a.key, a.arg) : (i = null);
    }
    var a, i;
    (this._invoke = n),
      "function" != typeof t["return"] && (this["return"] = void 0);
  }
  function T(t, n) {
    if (!(t instanceof n))
      throw new TypeError("Cannot call a class as a function");
  }
  function A(t, n) {
    for (var e = 0; e < n.length; e++) {
      var r = n[e];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function B(t, n, e) {
    return n && A(t.prototype, n), e && A(t, e), t;
  }
  function P(t, n, e) {
    return (
      n in t
        ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[n] = e),
      t
    );
  }
  function I(t, n) {
    var e = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      n &&
        (r = r.filter(function (n) {
          return Object.getOwnPropertyDescriptor(t, n).enumerable;
        })),
        e.push.apply(e, r);
    }
    return e;
  }
  function O(t) {
    for (var n = 1; n < arguments.length; n++) {
      var e = null != arguments[n] ? arguments[n] : {};
      n % 2
        ? I(e, !0).forEach(function (n) {
            P(t, n, e[n]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
        : I(e).forEach(function (n) {
            Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
          });
    }
    return t;
  }
  function D(t, n) {
    if ("function" != typeof n && null !== n)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(n && n.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      n && z(t, n);
  }
  function j(t) {
    return (j = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function z(t, n) {
    return (z =
      Object.setPrototypeOf ||
      function (t, n) {
        return (t.__proto__ = n), t;
      })(t, n);
  }
  function U(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function H(t, n) {
    return !n || ("object" != typeof n && "function" != typeof n) ? U(t) : n;
  }
  function W(t, n) {
    return Z(t) || X(t, n) || $();
  }
  function V(t) {
    return G(t) || q(t) || Y();
  }
  function G(t) {
    if (Array.isArray(t)) {
      for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];
      return e;
    }
  }
  function Z(t) {
    if (Array.isArray(t)) return t;
  }
  function q(t) {
    if (
      Symbol.iterator in Object(t) ||
      "[object Arguments]" === Object.prototype.toString.call(t)
    )
      return Array.from(t);
  }
  function X(t, n) {
    var e = [],
      r = !0,
      a = !1,
      i = void 0;
    try {
      for (
        var o, l = t[Symbol.iterator]();
        !(r = (o = l.next()).done) && (e.push(o.value), !n || e.length !== n);
        r = !0
      );
    } catch (s) {
      (a = !0), (i = s);
    } finally {
      try {
        r || null == l["return"] || l["return"]();
      } finally {
        if (a) throw i;
      }
    }
    return e;
  }
  function Y() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  function $() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  function J(t, n) {
    return (n = { exports: {} }), t(n, n.exports), n.exports;
  }
  function K(t) {
    return (t && t["default"]) || t;
  }
  function Q(t, n) {
    for (var e in n) t[e] = n[e];
    return t;
  }
  function tt(t) {
    var n = t.parentNode;
    n && n.removeChild(t);
  }
  function nt(t, n, e) {
    var r,
      a = arguments,
      i = {};
    for (r in n) "key" !== r && "ref" !== r && (i[r] = n[r]);
    if (arguments.length > 3)
      for (e = [e], r = 3; r < arguments.length; r++) e.push(a[r]);
    if (
      (null != e && (i.children = e),
      "function" == typeof t && null != t.defaultProps)
    )
      for (r in t.defaultProps) void 0 === i[r] && (i[r] = t.defaultProps[r]);
    return et(t, i, n && n.key, n && n.ref);
  }
  function et(t, n, e, r) {
    var a = {
      type: t,
      props: n,
      key: e,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: null,
      __c: null,
      constructor: void 0,
    };
    return wn.vnode && wn.vnode(a), a;
  }
  function rt() {
    return {};
  }
  function at(t) {
    return t.children;
  }
  function it(t, n) {
    (this.props = t), (this.context = n);
  }
  function ot(t, n) {
    if (null == n) return t.__ ? ot(t.__, t.__.__k.indexOf(t) + 1) : null;
    for (var e; n < t.__k.length; n++)
      if (null != (e = t.__k[n]) && null != e.__e) return e.__e;
    return "function" == typeof t.type ? ot(t) : null;
  }
  function lt(t) {
    var n, e;
    if (null != (t = t.__) && null != t.__c) {
      for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++)
        if (null != (e = t.__k[n]) && null != e.__e) {
          t.__e = t.__c.base = e.__e;
          break;
        }
      return lt(t);
    }
  }
  function st(t) {
    ((!t.__d && (t.__d = !0) && 1 === kn.push(t)) ||
      _n !== wn.debounceRendering) &&
      ((_n = wn.debounceRendering) || xn)(ct);
  }
  function ct() {
    var t, n, e, r, a, i, o;
    for (
      kn.sort(function (t, n) {
        return n.__v.__b - t.__v.__b;
      });
      (t = kn.pop());

    )
      t.__d &&
        ((e = void 0),
        (r = void 0),
        (i = (a = (n = t).__v).__e),
        (o = n.__P) &&
          ((e = []),
          (r = mt(
            o,
            a,
            Q({}, a),
            n.__n,
            void 0 !== o.ownerSVGElement,
            null,
            e,
            null == i ? ot(a) : i
          )),
          gt(e, a),
          r != i && lt(a)));
  }
  function ut(t, n, e, r, a, i, o, l, s) {
    var c,
      u,
      p,
      b,
      d,
      f,
      h,
      m = (e && e.__k) || Mn,
      g = m.length;
    if (
      (l == En && (l = null != i ? i[0] : g ? ot(e, 0) : null),
      (c = 0),
      (n.__k = pt(n.__k, function (e) {
        if (null != e) {
          if (
            ((e.__ = n),
            (e.__b = n.__b + 1),
            null === (p = m[c]) || (p && e.key == p.key && e.type === p.type))
          )
            m[c] = void 0;
          else
            for (u = 0; u < g; u++) {
              if ((p = m[u]) && e.key == p.key && e.type === p.type) {
                m[u] = void 0;
                break;
              }
              p = null;
            }
          if (
            ((b = mt(t, e, (p = p || En), r, a, i, o, l, s)),
            (u = e.ref) &&
              p.ref != u &&
              (h || (h = []),
              p.ref && h.push(p.ref, null, e),
              h.push(u, e.__c || b, e)),
            null != b)
          ) {
            if ((null == f && (f = b), null != e.__d))
              (b = e.__d), (e.__d = null);
            else if (i == p || b != l || null == b.parentNode) {
              t: if (null == l || l.parentNode !== t) t.appendChild(b);
              else {
                for (d = l, u = 0; (d = d.nextSibling) && u < g; u += 2)
                  if (d == b) break t;
                t.insertBefore(b, l);
              }
              "option" == n.type && (t.value = "");
            }
            (l = b.nextSibling), "function" == typeof n.type && (n.__d = b);
          }
        }
        return c++, e;
      })),
      (n.__e = f),
      null != i && "function" != typeof n.type)
    )
      for (c = i.length; c--; ) null != i[c] && tt(i[c]);
    for (c = g; c--; ) null != m[c] && yt(m[c], m[c]);
    if (h) for (c = 0; c < h.length; c++) wt(h[c], h[++c], h[++c]);
  }
  function pt(t, n, e) {
    if ((null == e && (e = []), null == t || "boolean" == typeof t))
      n && e.push(n(null));
    else if (Array.isArray(t))
      for (var r = 0; r < t.length; r++) pt(t[r], n, e);
    else
      e.push(
        n
          ? n(
              "string" == typeof t || "number" == typeof t
                ? et(null, t, null, null)
                : null != t.__e || null != t.__c
                ? et(t.type, t.props, t.key, null)
                : t
            )
          : t
      );
    return e;
  }
  function bt(t, n, e, r, a) {
    var i;
    for (i in e) i in n || ft(t, i, null, e[i], r);
    for (i in n)
      (a && "function" != typeof n[i]) ||
        "value" === i ||
        "checked" === i ||
        e[i] === n[i] ||
        ft(t, i, n[i], e[i], r);
  }
  function dt(t, n, e) {
    "-" === n[0]
      ? t.setProperty(n, e)
      : (t[n] =
          "number" == typeof e && !1 === Tn.test(n)
            ? e + "px"
            : null == e
            ? ""
            : e);
  }
  function ft(t, n, e, r, a) {
    var i, o, l, s, c;
    if (
      (a
        ? "className" === n && (n = "class")
        : "class" === n && (n = "className"),
      "key" === n || "children" === n)
    );
    else if ("style" === n)
      if (((i = t.style), "string" == typeof e)) i.cssText = e;
      else {
        if (("string" == typeof r && ((i.cssText = ""), (r = null)), r))
          for (o in r) (e && o in e) || dt(i, o, "");
        if (e) for (l in e) (r && e[l] === r[l]) || dt(i, l, e[l]);
      }
    else
      "o" === n[0] && "n" === n[1]
        ? ((s = n !== (n = n.replace(/Capture$/, ""))),
          (c = n.toLowerCase()),
          (n = (c in t ? c : n).slice(2)),
          e
            ? (r || t.addEventListener(n, ht, s), ((t.l || (t.l = {}))[n] = e))
            : t.removeEventListener(n, ht, s))
        : "list" !== n &&
          "tagName" !== n &&
          "form" !== n &&
          "type" !== n &&
          !a &&
          n in t
        ? (t[n] = null == e ? "" : e)
        : "function" != typeof e &&
          "dangerouslySetInnerHTML" !== n &&
          (n !== (n = n.replace(/^xlink:?/, ""))
            ? null == e || !1 === e
              ? t.removeAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  n.toLowerCase()
                )
              : t.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  n.toLowerCase(),
                  e
                )
            : null == e || !1 === e
            ? t.removeAttribute(n)
            : t.setAttribute(n, e));
  }
  function ht(t) {
    this.l[t.type](wn.event ? wn.event(t) : t);
  }
  function mt(t, n, e, r, a, i, o, l, s) {
    var c,
      u,
      p,
      b,
      d,
      f,
      h,
      m,
      g,
      v,
      w = n.type;
    if (void 0 !== n.constructor) return null;
    (c = wn.__b) && c(n);
    try {
      t: if ("function" == typeof w) {
        if (
          ((m = n.props),
          (g = (c = w.contextType) && r[c.__c]),
          (v = c ? (g ? g.props.value : c.__) : r),
          e.__c
            ? (h = (u = n.__c = e.__c).__ = u.__E)
            : ("prototype" in w && w.prototype.render
                ? (n.__c = u = new w(m, v))
                : ((n.__c = u = new it(m, v)),
                  (u.constructor = w),
                  (u.render = kt)),
              g && g.sub(u),
              (u.props = m),
              u.state || (u.state = {}),
              (u.context = v),
              (u.__n = r),
              (p = u.__d = !0),
              (u.__h = [])),
          null == u.__s && (u.__s = u.state),
          null != w.getDerivedStateFromProps &&
            (u.__s == u.state && (u.__s = Q({}, u.__s)),
            Q(u.__s, w.getDerivedStateFromProps(m, u.__s))),
          (b = u.props),
          (d = u.state),
          p)
        )
          null == w.getDerivedStateFromProps &&
            null != u.componentWillMount &&
            u.componentWillMount(),
            null != u.componentDidMount && u.__h.push(u.componentDidMount);
        else {
          if (
            (null == w.getDerivedStateFromProps &&
              m !== b &&
              null != u.componentWillReceiveProps &&
              u.componentWillReceiveProps(m, v),
            !u.__e &&
              null != u.shouldComponentUpdate &&
              !1 === u.shouldComponentUpdate(m, u.__s, v))
          ) {
            for (
              u.props = m,
                u.state = u.__s,
                u.__d = !1,
                u.__v = n,
                n.__e = e.__e,
                n.__k = e.__k,
                u.__h.length && o.push(u),
                c = 0;
              c < n.__k.length;
              c++
            )
              n.__k[c] && (n.__k[c].__ = n);
            break t;
          }
          null != u.componentWillUpdate && u.componentWillUpdate(m, u.__s, v),
            null != u.componentDidUpdate &&
              u.__h.push(function () {
                u.componentDidUpdate(b, d, f);
              });
        }
        (u.context = v),
          (u.props = m),
          (u.state = u.__s),
          (c = wn.__r) && c(n),
          (u.__d = !1),
          (u.__v = n),
          (u.__P = t),
          (c = u.render(u.props, u.state, u.context)),
          (n.__k = pt(
            null != c && c.type == at && null == c.key ? c.props.children : c
          )),
          null != u.getChildContext && (r = Q(Q({}, r), u.getChildContext())),
          p ||
            null == u.getSnapshotBeforeUpdate ||
            (f = u.getSnapshotBeforeUpdate(b, d)),
          ut(t, n, e, r, a, i, o, l, s),
          (u.base = n.__e),
          u.__h.length && o.push(u),
          h && (u.__E = u.__ = null),
          (u.__e = null);
      } else n.__e = vt(e.__e, n, e, r, a, i, o, s);
      (c = wn.diffed) && c(n);
    } catch (t) {
      wn.__e(t, n, e);
    }
    return n.__e;
  }
  function gt(t, n) {
    wn.__c && wn.__c(n, t),
      t.some(function (t) {
        try {
          (n = t.__h),
            (t.__h = []),
            n.some(function (n) {
              n.call(t);
            });
        } catch (n) {
          wn.__e(n, t.__v);
        }
      });
  }
  function vt(t, n, e, r, a, i, o, l) {
    var s,
      c,
      u,
      p,
      b,
      d = e.props,
      f = n.props;
    if (((a = "svg" === n.type || a), null == t && null != i))
      for (s = 0; s < i.length; s++)
        if (
          null != (c = i[s]) &&
          (null === n.type ? 3 === c.nodeType : c.localName === n.type)
        ) {
          (t = c), (i[s] = null);
          break;
        }
    if (null == t) {
      if (null === n.type) return document.createTextNode(f);
      (t = a
        ? document.createElementNS("http://www.w3.org/2000/svg", n.type)
        : document.createElement(n.type)),
        (i = null);
    }
    if (null === n.type)
      null != i && (i[i.indexOf(t)] = null),
        d !== f && t.data != f && (t.data = f);
    else if (n !== e) {
      if (
        (null != i && (i = Mn.slice.call(t.childNodes)),
        (u = (d = e.props || En).dangerouslySetInnerHTML),
        (p = f.dangerouslySetInnerHTML),
        !l)
      ) {
        if (d === En)
          for (d = {}, b = 0; b < t.attributes.length; b++)
            d[t.attributes[b].name] = t.attributes[b].value;
        (p || u) &&
          ((p && u && p.__html == u.__html) ||
            (t.innerHTML = (p && p.__html) || ""));
      }
      bt(t, f, d, a, l),
        (n.__k = n.props.children),
        p || ut(t, n, e, r, "foreignObject" !== n.type && a, i, o, En, l),
        l ||
          ("value" in f &&
            void 0 !== f.value &&
            f.value !== t.value &&
            (t.value = null == f.value ? "" : f.value),
          "checked" in f &&
            void 0 !== f.checked &&
            f.checked !== t.checked &&
            (t.checked = f.checked));
    }
    return t;
  }
  function wt(t, n, e) {
    try {
      "function" == typeof t ? t(n) : (t.current = n);
    } catch (t) {
      wn.__e(t, e);
    }
  }
  function yt(t, n, e) {
    var r, a, i;
    if (
      (wn.unmount && wn.unmount(t),
      (r = t.ref) && ((r.current && r.current !== t.__e) || wt(r, null, n)),
      e || "function" == typeof t.type || (e = null != (a = t.__e)),
      (t.__e = t.__d = null),
      null != (r = t.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (t) {
          wn.__e(t, n);
        }
      r.base = r.__P = null;
    }
    if ((r = t.__k)) for (i = 0; i < r.length; i++) r[i] && yt(r[i], n, e);
    null != a && tt(a);
  }
  function kt(t, n, e) {
    return this.constructor(t, e);
  }
  function xt(t, n, e) {
    var r, a, i;
    wn.__ && wn.__(t, n),
      (a = (r = e === Cn) ? null : (e && e.__k) || n.__k),
      (t = nt(at, null, [t])),
      (i = []),
      mt(
        n,
        ((r ? n : e || n).__k = t),
        a || En,
        En,
        void 0 !== n.ownerSVGElement,
        e && !r ? [e] : a ? null : Mn.slice.call(n.childNodes),
        i,
        e || En,
        r
      ),
      gt(i, t);
  }
  function _t(t, n) {
    xt(t, n, Cn);
  }
  function Ct(t) {
    var n = {},
      e = {
        __c: "__cC" + Sn++,
        __: t,
        Consumer: function (t, n) {
          return t.children(n);
        },
        Provider: function (t) {
          var r,
            a = this;
          return (
            this.getChildContext ||
              ((r = []),
              (this.getChildContext = function () {
                return (n[e.__c] = a), n;
              }),
              (this.shouldComponentUpdate = function (n) {
                t.value !== n.value &&
                  r.some(function (t) {
                    (t.context = n.value), st(t);
                  });
              }),
              (this.sub = function (t) {
                r.push(t);
                var n = t.componentWillUnmount;
                t.componentWillUnmount = function () {
                  r.splice(r.indexOf(t), 1), n && n.call(t);
                };
              })),
            t.children
          );
        },
      };
    return (e.Consumer.contextType = e), e;
  }
  function St(t, n) {
    var e,
      r,
      a,
      i,
      o = "html" === n ? "text/html" : "application/xml";
    "html" === n
      ? ((i = "body"),
        (a = "<!DOCTYPE html>\n<html><body>" + t + "</body></html>"))
      : ((i = "xml"),
        (a = '<?xml version="1.0" encoding="UTF-8"?>\n<xml>' + t + "</xml>"));
    try {
      e = new DOMParser().parseFromString(a, o);
    } catch (l) {
      r = l;
    }
    if (
      (e ||
        "html" !== n ||
        ((e = An || (An = Rt())), e.open(), e.write(a), e.close()),
      e)
    ) {
      var s = e.getElementsByTagName(i)[0],
        c = s.firstChild;
      return (
        t && !c && (s.error = "Document parse failed."),
        c &&
          "parsererror" === String(c.nodeName).toLowerCase() &&
          (c.removeChild(c.firstChild),
          c.removeChild(c.lastChild),
          (s.error = c.textContent || c.nodeValue || r || "Unknown error"),
          s.removeChild(c)),
        s
      );
    }
  }
  function Rt() {
    if (document.implementation && document.implementation.createHTMLDocument)
      return document.implementation.createHTMLDocument("");
    var t = document.createElement("iframe");
    return (
      (t.style.cssText =
        "position:absolute; left:0; top:-999em; width:1px; height:1px; overflow:hidden;"),
      t.setAttribute("sandbox", "allow-forms"),
      document.body.appendChild(t),
      t.contentWindow.document
    );
  }
  function Lt(t, n, e, r) {
    return (Ft.visitor = n), (Ft.h = e), (Ft.options = r || Un), Ft(t);
  }
  function Ft(t, n, e) {
    if (3 === t.nodeType) {
      var r = "textContent" in t ? t.textContent : t.nodeValue || "";
      if (Ft.options.trim !== !1) {
        var a = 0 === n || n === e.length - 1;
        if (
          ((r =
            r.match(/^[\s\n]+$/g) && "all" !== Ft.options.trim
              ? " "
              : r.replace(
                  /(^[\s\n]+|[\s\n]+$)/g,
                  "all" === Ft.options.trim || a ? "" : " "
                )),
          (!r || " " === r) && e.length > 1 && a)
        )
          return null;
      }
      return r;
    }
    if (1 !== t.nodeType) return null;
    var i = String(t.nodeName).toLowerCase();
    if ("script" === i && !Ft.options.allowScripts) return null;
    var o = Ft.h(i, Nt(t.attributes), Et(t.childNodes));
    return Ft.visitor && Ft.visitor(o), o;
  }
  function Nt(t) {
    var n = t && t.length;
    if (!n) return null;
    for (var e = {}, r = 0; r < n; r++) {
      var a = t[r],
        i = a.name,
        o = a.value;
      "" === o && (o = !0),
        "on" === i.substring(0, 2) &&
          Ft.options.allowEvents &&
          (o = new Function(o)),
        (e[i] = o);
    }
    return e;
  }
  function Et(t) {
    var n = t && Array.prototype.map.call(t, Ft).filter(Hn);
    return n && n.length ? n : null;
  }
  function Mt(t, n, e, r, a) {
    var i = St(t, n);
    if (i && i.error) throw new Error(i.error);
    var o = (i && i.body) || i;
    At.map = r || Wn;
    var l = o && Lt(o, At, e, a);
    return (At.map = null), (l && l.props && l.props.children) || null;
  }
  function Tt(t) {
    return t.replace(/-(.)/g, function (t, n) {
      return n.toUpperCase();
    });
  }
  function At(t) {
    var n = (t.type || "").toLowerCase(),
      e = At.map;
    e && e.hasOwnProperty(n)
      ? ((t.type = e[n]),
        (t.props = Object.keys(t.props || {}).reduce(function (n, e) {
          return (n[Tt(e)] = t.props[e]), n;
        }, {})))
      : (t.type = n.replace(/[^a-z0-9-]/i, ""));
  }
  function Bt(t) {
    wn.__h && wn.__h(Pn);
    var n = Pn.__H || (Pn.__H = { t: [], u: [] });
    return t >= n.t.length && n.t.push({}), n.t[t];
  }
  function Pt(t) {
    return It(qt, t);
  }
  function It(t, n, e) {
    var r = Bt(Bn++);
    return (
      r.__c ||
        ((r.__c = Pn),
        (r.i = [
          e ? e(n) : qt(void 0, n),
          function (n) {
            var e = t(r.i[0], n);
            r.i[0] !== e && ((r.i[0] = e), r.__c.setState({}));
          },
        ])),
      r.i
    );
  }
  function Ot(t, n) {
    var e = Bt(Bn++);
    Zt(e.o, n) && ((e.i = t), (e.o = n), Pn.__H.u.push(e));
  }
  function Dt(t, n) {
    var e = Bt(Bn++);
    Zt(e.o, n) && ((e.i = t), (e.o = n), Pn.__h.push(e));
  }
  function jt(t) {
    return zt(function () {
      return { current: t };
    }, []);
  }
  function zt(t, n) {
    var e = Bt(Bn++);
    return Zt(e.o, n) ? ((e.o = n), (e.v = t), (e.i = t())) : e.i;
  }
  function Ut(t, n) {
    return zt(function () {
      return t;
    }, n);
  }
  function Ht(t) {
    var n = Pn.context[t.__c];
    if (!n) return t.__;
    var e = Bt(Bn++);
    return null == e.i && ((e.i = !0), n.sub(Pn)), n.props.value;
  }
  function Wt() {
    $n.some(function (t) {
      t.__P && (t.__H.u.forEach(Vt), t.__H.u.forEach(Gt), (t.__H.u = []));
    }),
      ($n = []);
  }
  function Vt(t) {
    t.m && t.m();
  }
  function Gt(t) {
    var n = t.i();
    "function" == typeof n && (t.m = n);
  }
  function Zt(t, n) {
    return (
      !t ||
      n.some(function (n, e) {
        return n !== t[e];
      })
    );
  }
  function qt(t, n) {
    return "function" == typeof n ? n(t) : n;
  }
  function Xt(t, n) {
    for (var e in n) t[e] = n[e];
    return t;
  }
  function Yt(t, n) {
    for (var e in t) if ("__source" !== e && !(e in n)) return !0;
    for (var r in n) if ("__source" !== r && t[r] !== n[r]) return !0;
    return !1;
  }
  function $t(t) {
    return (
      t && (((t = Xt({}, t)).__c = null), (t.__k = t.__k && t.__k.map($t))), t
    );
  }
  function Jt(t) {
    (this.__u = 0), (this.__b = null);
  }
  function Kt(t) {
    var n = t.__.__c;
    return n && n.o && n.o(t);
  }
  function Qt() {
    (this.u = null), (this.i = null);
  }
  function tn(t) {
    var n = this,
      e = t.container,
      r = nt(ae, { context: n.context }, t.vnode);
    return (
      n.s &&
        n.s !== e &&
        (n.h.parentNode && n.s.removeChild(n.h), yt(n.v), (n.p = !1)),
      t.vnode
        ? n.p
          ? ((e.__k = n.__k), xt(r, e), (n.__k = e.__k))
          : ((n.h = document.createTextNode("")),
            _t("", e),
            e.appendChild(n.h),
            (n.p = !0),
            (n.s = e),
            xt(r, e, n.h),
            (n.__k = this.h.__k))
        : n.p && (n.h.parentNode && n.s.removeChild(n.h), yt(n.v)),
      (n.v = r),
      (n.componentWillUnmount = function () {
        n.h.parentNode && n.s.removeChild(n.h), yt(n.v);
      }),
      null
    );
  }
  function nn(t, n) {
    return nt(tn, { vnode: t, container: n });
  }
  function en(t, n) {
    t["UNSAFE_" + n] &&
      !t[n] &&
      Object.defineProperty(t, n, {
        configurable: !1,
        get: function () {
          return this["UNSAFE_" + n];
        },
        set: function (t) {
          this["UNSAFE_" + n] = t;
        },
      });
  }
  function rn(t) {
    switch ((t = t.toLowerCase())) {
      case "mobile":
        return "platform_phone";
      case "mac":
        return "platform_macintosh";
      default:
        return "platform_" + t;
    }
  }
  function an(t) {
    var n = t.accountHandler,
      e = Pt(!1),
      r = W(e, 2),
      a = r[0],
      i = r[1],
      o = Ht(wr),
      l = RiotBar.data.account.authenticatedLinks || [],
      s = Ut(
        function (t) {
          window.innerWidth > 1024 ||
            (i(!a), On.toggleClass(t.currentTarget.parentElement, "active", a));
        },
        [i, a]
      ),
      c = o.name || "My Account";
    return nt(
      at,
      null,
      nt(
        "div",
        { id: "riotbar-account-bar", onClick: s, className: a ? "active" : "" },
        nt(
          "div",
          { className: "riotbar-summoner-info" },
          nt(
            "div",
            { className: "riotbar-summoner-name" },
            c,
            nt(je, { color: Xn.getAccentColor() })
          )
        )
      ),
      nt(
        "div",
        { id: "riotbar-account-dropdown" },
        nt(
          "div",
          { className: "riotbar-account-info" },
          nt("div", { id: "riotbar-account-dropdown-plugins" }),
          nt(
            "div",
            { className: "riotbar-summoner-info" },
            nt("div", { className: "riotbar-summoner-name" }, c)
          )
        ),
        nt(
          "div",
          { id: "riotbar-account-dropdown-links" },
          nt(vr, { accountHandler: n, authenticatedLinks: l })
        )
      )
    );
  }
  function on() {
    var t = RiotBar.data.account;
    if (!t.enabled) return null;
    var n = Ht(wr),
      e = function (t) {
        var n = t.target,
          e = n.getAttribute("data-riotbar-account-action");
        if (e) {
          t.preventDefault();
          try {
            RiotBar.account[e]();
          } catch (r) {
            On.logError(r);
          }
        }
      };
    return nt(
      "div",
      { id: "riotbar-account" },
      n && n.isAuthenticated
        ? nt(an, { accountHandler: e })
        : nt(yr, { accountHandler: e })
    );
  }
  function ln(t) {
    var n = t.children,
      e = Pt(
        RiotBar.data.account.initializeAuthState
          ? window.RiotBar.account.initializeAuthState()
          : window.RiotBar.account.getAuthState()
      ),
      r = W(e, 2),
      a = r[0],
      i = r[1];
    return (
      Ot(
        function () {
          return (
            document.addEventListener(kr.type, function () {
              var t = Object.create(RiotBar.account.getAuthState());
              i(t);
            }),
            function () {
              document.removeEventListener(kr.type);
            }
          );
        },
        [i]
      ),
      nt(wr.Provider, { value: a }, n)
    );
  }
  function sn(t) {
    try {
      if (t.background_asset_desktop && t.theme) {
        var n =
          "\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme {\n          "
            .concat(
              t.background_asset_desktop
                ? "background-image: url(".concat(
                    t.background_asset_desktop.url,
                    ");"
                  )
                : "",
              "\n          background-repeat: no-repeat;\n          background-position: 50% 50%;\n          background-size: cover;\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-inner {\n          max-width: 99vw;\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme  {\n          "
            )
            .concat(
              t.theme && t.theme.tagline_font_color
                ? "color: ".concat(t.theme.tagline_font_color, ";")
                : "",
              "\n\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-content {\n          "
            )
            .concat(
              t.theme && t.theme.font_family
                ? "font-family: ".concat(lr(t.theme.font_family), ";")
                : "",
              "\n          "
            )
            .concat(
              t.theme && t.theme.tagline_font_size
                ? "font-size: ".concat(t.theme.tagline_font_size, ";")
                : "",
              "\n          flex-basis: 66%;\n\n        }\n\n        .riotbar-alert-content-inner {\n          text-align: center;\n        }\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-body {\n          text-align: center;\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-logo {\n          margin: 0 auto;\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme  .riotbar-alert-buttons-container .riotbar-alert-button {\n          background-color: "
            )
            .concat(t.theme.button_background_color, ";\n          color: ")
            .concat(
              t.theme.button_font_color,
              ";\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme  .riotbar-alert-buttons-container .riotbar-alert-button:hover {\n          background-color: "
            )
            .concat(
              t.theme.button_background_hover_color,
              ";\n          color: "
            )
            .concat(
              t.theme.button_font_hover_color,
              ";\n        }\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-close-container svg rect {\n          fill: #DBDBDB;\n          fill-opacity: 0.7;\n        }\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-close-container svg path {\n          fill: #141414;\n        }\n\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-custom-filler {\n          flex-basis: 25%;\n        }\n        #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-ctas-container {\n          flex-basis: 25%;\n        }\n\n        @media screen and (max-width: 1024px) {\n          #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme {\n            "
            )
            .concat(
              t.background_asset_mobile
                ? "background-image: url(".concat(
                    t.background_asset_mobile.url,
                    ");"
                  )
                : "",
              "\n          }\n          #riotbar-alerts-container .riotbar-alert.riotbar-alert-custom-theme .riotbar-alert-inner {\n            padding: 10px;\n          }\n        }\n      "
            );
        br("riotbar-custom-alert", n);
      }
    } catch (e) {
      Dn(e);
    }
  }
  function cn(t, n, e, r) {
    function a(t) {
      return i[t] || t;
    }
    (r =
      r ||
      function (t, n, e, r, a) {
        var i = n.split("\n"),
          o = Math.max(r - 3, 0),
          l = Math.min(i.length, r + 3),
          s = a(e),
          c = i
            .slice(o, l)
            .map(function (t, n) {
              var e = n + o + 1;
              return (e == r ? " >> " : "    ") + e + "| " + t;
            })
            .join("\n");
        throw (
          ((t.path = s),
          (t.message = (s || "ejs") + ":" + r + "\n" + c + "\n\n" + t.message),
          t)
        );
      }),
      (n =
        n ||
        function (t) {
          return void 0 == t ? "" : String(t).replace(o, a);
        });
    var i = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&#34;",
        "'": "&#39;",
      },
      o = /[&<>'"]/g,
      l = 1,
      s =
        '<!-- <div class="cookie-link expanding light corner-button bottom-right"> -->\n    <div class="icon link-text">\n        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 64 77">\n            <path d="M63.6,13.1c0-1-0.7-1.9-1.8-2c-4.7-0.6-9.4-1.8-13.9-3.4c-4.5-1.7-9.6-4-15-7.1\n                c-0.7-0.4-1.3-0.4-2,0c-5.4,3.1-10.4,5.4-15,7.1C11.4,9.2,6.7,10.4,2,11c-1,0.1-1.7,1-1.8,2C-0.3,32.3,4,48,12.8,60.3\n                c4.8,6.7,10.8,12.1,18.1,16.2c0.6,0.4,1.4,0.4,2.1,0c7.2-4.2,13.2-9.6,18-16.2C59.9,48,64.1,32.3,63.6,13.1L63.6,13.1z M47.7,57.9\n                c-4.2,5.8-9.4,10.6-15.8,14.4c-6.3-3.9-11.6-8.7-15.8-14.4c-8-11.2-12-25.5-11.8-43c4.4-0.7,8.8-1.9,13.2-3.5\n                c4.4-1.6,9.2-3.8,14.4-6.6c5.2,2.8,9.9,5,14.3,6.6c4.4,1.6,8.8,2.8,13.2,3.5C59.6,32.5,55.7,46.8,47.7,57.9L47.7,57.9z M47.7,57.9\n                "/>\n            <path d="M45.9,30.9l-0.2-0.1L45,29.2l0.1-0.2c2.1-4.9,2-5,1.6-5.3l-2.9-2.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.6,0-4.9,1.9\n                l-0.2,0.1L36.6,22l-0.1-0.2c-2-4.9-2.2-4.9-2.7-4.9h-4c-0.5,0-0.7,0-2.6,4.9L27.2,22l-1.7,0.7l-0.2-0.1c-2.9-1.2-4.5-1.8-4.9-1.8\n                c-0.2,0-0.4,0.1-0.5,0.2L17,23.8c-0.4,0.4-0.5,0.5,1.7,5.3l0.1,0.2l-0.7,1.7L17.9,31c-5,1.9-5,2.1-5,2.6v3.9c0,0.5,0,0.7,5,2.5\n                l0.2,0.1l0.7,1.7L18.8,42c-2.1,4.9-2,5-1.6,5.3l2.9,2.8c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.6,0,4.9-1.9l0.2-0.1l1.7,0.7l0.1,0.2\n                c2,4.9,2.2,4.9,2.7,4.9h4c0.5,0,0.7,0,2.6-4.9l0.1-0.2l1.7-0.7l0.2,0.1c2.8,1.2,4.5,1.8,4.9,1.8c0.2,0,0.4-0.1,0.5-0.2l2.9-2.8\n                c0.4-0.4,0.5-0.5-1.7-5.3L45,41.8l0.7-1.7l0.2-0.1c5-2,5-2.1,5-2.6v-3.9C50.9,32.9,50.9,32.7,45.9,30.9L45.9,30.9z M31.9,41.9\n                c-3.6,0-6.5-2.9-6.5-6.4c0-3.5,2.9-6.4,6.5-6.4c3.6,0,6.5,2.9,6.5,6.4C38.4,39,35.5,41.9,31.9,41.9L31.9,41.9z M31.9,41.9"/>\n            </svg>\n    </div>\n    <div class="label link-text"><span id=<%= data.id %>></span></div>\n<!-- </div> -->\n',
      c = void 0;
    try {
      var u = [],
        p = u.push.bind(u);
      return (
        p(
          '<!-- <div class="cookie-link expanding light corner-button bottom-right"> -->\n    <div class="icon link-text">\n        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 64 77">\n            <path d="M63.6,13.1c0-1-0.7-1.9-1.8-2c-4.7-0.6-9.4-1.8-13.9-3.4c-4.5-1.7-9.6-4-15-7.1\n                c-0.7-0.4-1.3-0.4-2,0c-5.4,3.1-10.4,5.4-15,7.1C11.4,9.2,6.7,10.4,2,11c-1,0.1-1.7,1-1.8,2C-0.3,32.3,4,48,12.8,60.3\n                c4.8,6.7,10.8,12.1,18.1,16.2c0.6,0.4,1.4,0.4,2.1,0c7.2-4.2,13.2-9.6,18-16.2C59.9,48,64.1,32.3,63.6,13.1L63.6,13.1z M47.7,57.9\n                c-4.2,5.8-9.4,10.6-15.8,14.4c-6.3-3.9-11.6-8.7-15.8-14.4c-8-11.2-12-25.5-11.8-43c4.4-0.7,8.8-1.9,13.2-3.5\n                c4.4-1.6,9.2-3.8,14.4-6.6c5.2,2.8,9.9,5,14.3,6.6c4.4,1.6,8.8,2.8,13.2,3.5C59.6,32.5,55.7,46.8,47.7,57.9L47.7,57.9z M47.7,57.9\n                "/>\n            <path d="M45.9,30.9l-0.2-0.1L45,29.2l0.1-0.2c2.1-4.9,2-5,1.6-5.3l-2.9-2.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.6,0-4.9,1.9\n                l-0.2,0.1L36.6,22l-0.1-0.2c-2-4.9-2.2-4.9-2.7-4.9h-4c-0.5,0-0.7,0-2.6,4.9L27.2,22l-1.7,0.7l-0.2-0.1c-2.9-1.2-4.5-1.8-4.9-1.8\n                c-0.2,0-0.4,0.1-0.5,0.2L17,23.8c-0.4,0.4-0.5,0.5,1.7,5.3l0.1,0.2l-0.7,1.7L17.9,31c-5,1.9-5,2.1-5,2.6v3.9c0,0.5,0,0.7,5,2.5\n                l0.2,0.1l0.7,1.7L18.8,42c-2.1,4.9-2,5-1.6,5.3l2.9,2.8c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.6,0,4.9-1.9l0.2-0.1l1.7,0.7l0.1,0.2\n                c2,4.9,2.2,4.9,2.7,4.9h4c0.5,0,0.7,0,2.6-4.9l0.1-0.2l1.7-0.7l0.2,0.1c2.8,1.2,4.5,1.8,4.9,1.8c0.2,0,0.4-0.1,0.5-0.2l2.9-2.8\n                c0.4-0.4,0.5-0.5-1.7-5.3L45,41.8l0.7-1.7l0.2-0.1c5-2,5-2.1,5-2.6v-3.9C50.9,32.9,50.9,32.7,45.9,30.9L45.9,30.9z M31.9,41.9\n                c-3.6,0-6.5-2.9-6.5-6.4c0-3.5,2.9-6.4,6.5-6.4c3.6,0,6.5,2.9,6.5,6.4C38.4,39,35.5,41.9,31.9,41.9L31.9,41.9z M31.9,41.9"/>\n            </svg>\n    </div>\n    <div class="label link-text"><span id='
        ),
        (l = 20),
        p(n(t.id)),
        p("></span></div>\n<!-- </div> -->\n"),
        (l = 22),
        u.join("")
      );
    } catch (b) {
      r(b, s, c, l, n);
    }
  }
  function un(t, n) {
    for (var e = t.split("&"), r = !1, a = 0; a < e.length; a++)
      0 === e[a].indexOf(n) && (r = e[a].substr(n.length + 1));
    return r;
  }
  var pn = setTimeout;
  (a.prototype["catch"] = function (t) {
    return this.then(null, t);
  }),
    (a.prototype.then = function (t, n) {
      var r = new this.constructor(e);
      return i(this, new c(t, n, r)), r;
    }),
    (a.prototype["finally"] = t),
    (a.all = function (t) {
      return new a(function (e, r) {
        function a(t, n) {
          try {
            if (n && ("object" == typeof n || "function" == typeof n)) {
              var l = n.then;
              if ("function" == typeof l)
                return void l.call(
                  n,
                  function (n) {
                    a(t, n);
                  },
                  r
                );
            }
            (i[t] = n), 0 === --o && e(i);
          } catch (s) {
            r(s);
          }
        }
        if (!n(t)) return r(new TypeError("Promise.all accepts an array"));
        var i = Array.prototype.slice.call(t);
        if (0 === i.length) return e([]);
        for (var o = i.length, l = 0; l < i.length; l++) a(l, i[l]);
      });
    }),
    (a.resolve = function (t) {
      return t && "object" == typeof t && t.constructor === a
        ? t
        : new a(function (n) {
            n(t);
          });
    }),
    (a.reject = function (t) {
      return new a(function (n, e) {
        e(t);
      });
    }),
    (a.race = function (t) {
      return new a(function (e, r) {
        if (!n(t)) return r(new TypeError("Promise.race accepts an array"));
        for (var i = 0, o = t.length; i < o; i++) a.resolve(t[i]).then(e, r);
      });
    }),
    (a._immediateFn =
      ("function" == typeof setImmediate &&
        function (t) {
          setImmediate(t);
        }) ||
      function (t) {
        pn(t, 0);
      }),
    (a._unhandledRejectionFn = function (t) {
      "undefined" != typeof console && console;
    });
  var bn = {
    searchParams: "URLSearchParams" in self,
    iterable: "Symbol" in self && "iterator" in Symbol,
    blob:
      "FileReader" in self &&
      "Blob" in self &&
      (function () {
        try {
          return new Blob(), !0;
        } catch (t) {
          return !1;
        }
      })(),
    formData: "FormData" in self,
    arrayBuffer: "ArrayBuffer" in self,
  };
  if (bn.arrayBuffer)
    var dn = [
        "[object Int8Array]",
        "[object Uint8Array]",
        "[object Uint8ClampedArray]",
        "[object Int16Array]",
        "[object Uint16Array]",
        "[object Int32Array]",
        "[object Uint32Array]",
        "[object Float32Array]",
        "[object Float64Array]",
      ],
      fn =
        ArrayBuffer.isView ||
        function (t) {
          return t && dn.indexOf(Object.prototype.toString.call(t)) > -1;
        };
  (h.prototype.append = function (t, n) {
    (t = b(t)), (n = d(n));
    var e = this.map[t];
    this.map[t] = e ? e + ", " + n : n;
  }),
    (h.prototype["delete"] = function (t) {
      delete this.map[b(t)];
    }),
    (h.prototype.get = function (t) {
      return (t = b(t)), this.has(t) ? this.map[t] : null;
    }),
    (h.prototype.has = function (t) {
      return this.map.hasOwnProperty(b(t));
    }),
    (h.prototype.set = function (t, n) {
      this.map[b(t)] = d(n);
    }),
    (h.prototype.forEach = function (t, n) {
      for (var e in this.map)
        this.map.hasOwnProperty(e) && t.call(n, this.map[e], e, this);
    }),
    (h.prototype.keys = function () {
      var t = [];
      return (
        this.forEach(function (n, e) {
          t.push(e);
        }),
        f(t)
      );
    }),
    (h.prototype.values = function () {
      var t = [];
      return (
        this.forEach(function (n) {
          t.push(n);
        }),
        f(t)
      );
    }),
    (h.prototype.entries = function () {
      var t = [];
      return (
        this.forEach(function (n, e) {
          t.push([e, n]);
        }),
        f(t)
      );
    }),
    bn.iterable && (h.prototype[Symbol.iterator] = h.prototype.entries);
  var hn = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
  (C.prototype.clone = function () {
    return new C(this, { body: this._bodyInit });
  }),
    x.call(C.prototype),
    x.call(L.prototype),
    (L.prototype.clone = function () {
      return new L(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new h(this.headers),
        url: this.url,
      });
    }),
    (L.error = function () {
      var t = new L(null, { status: 0, statusText: "" });
      return (t.type = "error"), t;
    });
  var mn = [301, 302, 303, 307, 308];
  L.redirect = function (t, n) {
    if (mn.indexOf(n) === -1) throw new RangeError("Invalid status code");
    return new L(null, { status: n, headers: { location: t } });
  };
  var gn = self.DOMException;
  try {
    new gn();
  } catch (vn) {
    (gn = function (t, n) {
      (this.message = t), (this.name = n);
      var e = Error(t);
      this.stack = e.stack;
    }),
      (gn.prototype = Object.create(Error.prototype)),
      (gn.prototype.constructor = gn);
  }
  (F.polyfill = !0),
    self.fetch ||
      ((self.fetch = F),
      (self.Headers = h),
      (self.Request = C),
      (self.Response = L));
  "function" == typeof Symbol &&
    Symbol.asyncIterator &&
    (M.prototype[Symbol.asyncIterator] = function () {
      return this;
    }),
    (M.prototype.next = function (t) {
      return this._invoke("next", t);
    }),
    (M.prototype["throw"] = function (t) {
      return this._invoke("throw", t);
    }),
    (M.prototype["return"] = function (t) {
      return this._invoke("return", t);
    });
  !(function (t) {
    function n(n) {
      return (
        !!n &&
        (("Symbol" in t &&
          "iterator" in t.Symbol &&
          "function" == typeof n[Symbol.iterator]) ||
          !!Array.isArray(n))
      );
    }
    function e(t) {
      return "from" in Array ? Array.from(t) : Array.prototype.slice.call(t);
    }
    !(function () {
      function r(t) {
        var n = "",
          e = !0;
        return (
          t.forEach(function (t) {
            var r = encodeURIComponent(t.name),
              a = encodeURIComponent(t.value);
            e || (n += "&"), (n += r + "=" + a), (e = !1);
          }),
          n.replace(/%20/g, "+")
        );
      }
      function a(t, n) {
        var e = t.split("&");
        n && e[0].indexOf("=") === -1 && (e[0] = "=" + e[0]);
        var r = [];
        e.forEach(function (t) {
          if (0 !== t.length) {
            var n = t.indexOf("=");
            if (n !== -1)
              var e = t.substring(0, n),
                a = t.substring(n + 1);
            else (e = t), (a = "");
            (e = e.replace(/\+/g, " ")),
              (a = a.replace(/\+/g, " ")),
              r.push({ name: e, value: a });
          }
        });
        var a = [];
        return (
          r.forEach(function (t) {
            a.push({
              name: decodeURIComponent(t.name),
              value: decodeURIComponent(t.value),
            });
          }),
          a
        );
      }
      function i(t) {
        if (c) return new u(t);
        var n = document.createElement("a");
        return (n.href = t), n;
      }
      function o(t) {
        var i = this;
        (this._list = []),
          void 0 === t ||
            null === t ||
            (t instanceof o
              ? (this._list = a(String(t)))
              : "object" === N(t) && n(t)
              ? e(t).forEach(function (t) {
                  if (!n(t)) throw TypeError();
                  var r = e(t);
                  if (2 !== r.length) throw TypeError();
                  i._list.push({ name: String(r[0]), value: String(r[1]) });
                })
              : "object" === N(t) && t
              ? Object.keys(t).forEach(function (n) {
                  i._list.push({ name: String(n), value: String(t[n]) });
                })
              : ((t = String(t)),
                "?" === t.substring(0, 1) && (t = t.substring(1)),
                (this._list = a(t)))),
          (this._url_object = null),
          (this._setList = function (t) {
            l || (i._list = t);
          });
        var l = !1;
        this._update_steps = function () {
          l ||
            ((l = !0),
            i._url_object &&
              ("about:" === i._url_object.protocol &&
                i._url_object.pathname.indexOf("?") !== -1 &&
                (i._url_object.pathname = i._url_object.pathname.split("?")[0]),
              (i._url_object.search = r(i._list)),
              (l = !1)));
        };
      }
      function l(t, n) {
        var e = 0;
        this.next = function () {
          if (e >= t.length) return { done: !0, value: void 0 };
          var r = t[e++];
          return {
            done: !1,
            value:
              "key" === n
                ? r.name
                : "value" === n
                ? r.value
                : [r.name, r.value],
          };
        };
      }
      function s(n, e) {
        function r() {
          var t = s.href.replace(/#$|\?$|\?(?=#)/g, "");
          s.href !== t && (s.href = t);
        }
        function l() {
          d._setList(s.search ? a(s.search.substring(1)) : []),
            d._update_steps();
        }
        if (!(this instanceof t.URL))
          throw new TypeError(
            "Failed to construct 'URL': Please use the 'new' operator."
          );
        e &&
          (n = (function () {
            if (c) return new u(n, e).href;
            var t;
            try {
              var r;
              if (
                ("[object OperaMini]" ===
                Object.prototype.toString.call(window.operamini)
                  ? ((t = document.createElement("iframe")),
                    (t.style.display = "none"),
                    document.documentElement.appendChild(t),
                    (r = t.contentWindow.document))
                  : document.implementation &&
                    document.implementation.createHTMLDocument
                  ? (r = document.implementation.createHTMLDocument(""))
                  : document.implementation &&
                    document.implementation.createDocument
                  ? ((r = document.implementation.createDocument(
                      "http://www.w3.org/1999/xhtml",
                      "html",
                      null
                    )),
                    r.documentElement.appendChild(r.createElement("head")),
                    r.documentElement.appendChild(r.createElement("body")))
                  : window.ActiveXObject &&
                    ((r = new window.ActiveXObject("htmlfile")),
                    r.write("<head></head><body></body>"),
                    r.close()),
                !r)
              )
                throw Error("base not supported");
              var a = r.createElement("base");
              (a.href = e), r.getElementsByTagName("head")[0].appendChild(a);
              var i = r.createElement("a");
              return (i.href = n), i.href;
            } finally {
              t && t.parentNode.removeChild(t);
            }
          })());
        var s = i(n || ""),
          p = (function () {
            if (!("defineProperties" in Object)) return !1;
            try {
              var t = {};
              return (
                Object.defineProperties(t, {
                  prop: {
                    get: function () {
                      return !0;
                    },
                  },
                }),
                t.prop
              );
            } catch (n) {
              return !1;
            }
          })(),
          b = p ? this : document.createElement("a"),
          d = new o(s.search ? s.search.substring(1) : null);
        return (
          (d._url_object = b),
          Object.defineProperties(b, {
            href: {
              get: function () {
                return s.href;
              },
              set: function (t) {
                (s.href = t), r(), l();
              },
              enumerable: !0,
              configurable: !0,
            },
            origin: {
              get: function () {
                return "origin" in s
                  ? s.origin
                  : this.protocol + "//" + this.host;
              },
              enumerable: !0,
              configurable: !0,
            },
            protocol: {
              get: function () {
                return s.protocol;
              },
              set: function (t) {
                s.protocol = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            username: {
              get: function () {
                return s.username;
              },
              set: function (t) {
                s.username = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            password: {
              get: function () {
                return s.password;
              },
              set: function (t) {
                s.password = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            host: {
              get: function () {
                var t = { "http:": /:80$/, "https:": /:443$/, "ftp:": /:21$/ }[
                  s.protocol
                ];
                return t ? s.host.replace(t, "") : s.host;
              },
              set: function (t) {
                s.host = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            hostname: {
              get: function () {
                return s.hostname;
              },
              set: function (t) {
                s.hostname = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            port: {
              get: function () {
                return s.port;
              },
              set: function (t) {
                s.port = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            pathname: {
              get: function () {
                return "/" !== s.pathname.charAt(0)
                  ? "/" + s.pathname
                  : s.pathname;
              },
              set: function (t) {
                s.pathname = t;
              },
              enumerable: !0,
              configurable: !0,
            },
            search: {
              get: function () {
                return s.search;
              },
              set: function (t) {
                s.search !== t && ((s.search = t), r(), l());
              },
              enumerable: !0,
              configurable: !0,
            },
            searchParams: {
              get: function () {
                return d;
              },
              enumerable: !0,
              configurable: !0,
            },
            hash: {
              get: function () {
                return s.hash;
              },
              set: function (t) {
                (s.hash = t), r();
              },
              enumerable: !0,
              configurable: !0,
            },
            toString: {
              value: function () {
                return s.toString();
              },
              enumerable: !1,
              configurable: !0,
            },
            valueOf: {
              value: function () {
                return s.valueOf();
              },
              enumerable: !1,
              configurable: !0,
            },
          }),
          b
        );
      }
      var c,
        u = t.URL;
      try {
        if (u) {
          if (((c = new t.URL("http://example.com")), "searchParams" in c)) {
            var p = new s("http://example.com");
            if (
              ((p.search = "a=1&b=2"),
              "http://example.com/?a=1&b=2" === p.href &&
                ((p.search = ""), "http://example.com/" === p.href))
            )
              return;
          }
          "href" in c || (c = void 0), (c = void 0);
        }
      } catch (b) {}
      if (
        (Object.defineProperties(o.prototype, {
          append: {
            value: function (t, n) {
              this._list.push({ name: t, value: n }), this._update_steps();
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          delete: {
            value: function (t) {
              for (var n = 0; n < this._list.length; )
                this._list[n].name === t ? this._list.splice(n, 1) : ++n;
              this._update_steps();
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          get: {
            value: function (t) {
              for (var n = 0; n < this._list.length; ++n)
                if (this._list[n].name === t) return this._list[n].value;
              return null;
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          getAll: {
            value: function (t) {
              for (var n = [], e = 0; e < this._list.length; ++e)
                this._list[e].name === t && n.push(this._list[e].value);
              return n;
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          has: {
            value: function (t) {
              for (var n = 0; n < this._list.length; ++n)
                if (this._list[n].name === t) return !0;
              return !1;
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          set: {
            value: function (t, n) {
              for (var e = !1, r = 0; r < this._list.length; )
                this._list[r].name === t
                  ? e
                    ? this._list.splice(r, 1)
                    : ((this._list[r].value = n), (e = !0), ++r)
                  : ++r;
              e || this._list.push({ name: t, value: n }), this._update_steps();
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          entries: {
            value: function () {
              return new l(this._list, "key+value");
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          keys: {
            value: function () {
              return new l(this._list, "key");
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          values: {
            value: function () {
              return new l(this._list, "value");
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          forEach: {
            value: function (t) {
              var n = arguments.length > 1 ? arguments[1] : void 0;
              this._list.forEach(function (e) {
                t.call(n, e.value, e.name);
              });
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          },
          toString: {
            value: function () {
              return r(this._list);
            },
            writable: !0,
            enumerable: !1,
            configurable: !0,
          },
        }),
        "Symbol" in t &&
          "iterator" in t.Symbol &&
          (Object.defineProperty(o.prototype, t.Symbol.iterator, {
            value: o.prototype.entries,
            writable: !0,
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(l.prototype, t.Symbol.iterator, {
            value: function () {
              return this;
            },
            writable: !0,
            enumerable: !0,
            configurable: !0,
          })),
        u)
      )
        for (var d in u)
          Object.prototype.hasOwnProperty.call(u, d) &&
            "function" == typeof u[d] &&
            (s[d] = u[d]);
      (t.URL = s), (t.URLSearchParams = o);
    })(),
      (function () {
        if (
          "1" !== new t.URLSearchParams([["a", 1]]).get("a") ||
          "1" !== new t.URLSearchParams({ a: 1 }).get("a")
        ) {
          var r = t.URLSearchParams;
          t.URLSearchParams = function (t) {
            if (t && "object" === N(t) && n(t)) {
              var a = new r();
              return (
                e(t).forEach(function (t) {
                  if (!n(t)) throw TypeError();
                  var r = e(t);
                  if (2 !== r.length) throw TypeError();
                  a.append(r[0], r[1]);
                }),
                a
              );
            }
            return t && "object" === N(t)
              ? ((a = new r()),
                Object.keys(t).forEach(function (n) {
                  a.set(n, t[n]);
                }),
                a)
              : new r(t);
          };
        }
      })();
  })(self),
    window && !window.Promise && (window.Promise = a),
    String.prototype.includes ||
      (String.prototype.includes = function () {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
      }),
    Array.prototype.includes ||
      (Array.prototype.includes = function (t) {
        return !!~this.indexOf(t);
      }),
    (function (t) {
      t.forEach(function (t) {
        t.hasOwnProperty("prepend") ||
          Object.defineProperty(t, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
              var t = Array.prototype.slice.call(arguments),
                n = document.createDocumentFragment();
              t.forEach(function (t) {
                var e = t instanceof Node;
                n.appendChild(e ? t : document.createTextNode(String(t)));
              }),
                this.insertBefore(n, this.firstChild);
            },
          });
      });
    })([Element.prototype, Document.prototype, DocumentFragment.prototype]),
    Array.prototype.find ||
      Object.defineProperty(Array.prototype, "find", {
        value: function (t) {
          if (null == this) throw TypeError('"this" is null or not defined');
          var n = Object(this),
            e = n.length >>> 0;
          if ("function" != typeof t)
            throw TypeError("predicate must be a function");
          for (var r = arguments[1], a = 0; a < e; ) {
            var i = n[a];
            if (t.call(r, i, a, n)) return i;
            a++;
          }
        },
        configurable: !0,
        writable: !0,
      }),
    "function" != typeof Object.assign &&
      !(function () {
        Object.assign = function (t) {
          if (void 0 === t || null === t)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var n = Object(t), e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            if (void 0 !== r && null !== r)
              for (var a in r) r.hasOwnProperty(a) && (n[a] = r[a]);
          }
          return n;
        };
      })();
  var wn,
    yn,
    kn,
    xn,
    _n,
    Cn,
    Sn,
    Rn =
      (Object.freeze({}),
      '@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/8a533745-7bc5-4dcd-8552-d9952208de6f.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/8a533745-7bc5-4dcd-8552-d9952208de6f.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/ffbb4591-1a9c-443b-9b6e-6ceb6a3ca76b.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/e44c8656-a389-4ecb-838c-3c135565d6b3.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/fcdcba61-8d4e-41db-9c06-24a5238587f1.ttf") format("truetype");\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/54af9b67-908f-49ac-8aa0-d3959c0e28dc.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/54af9b67-908f-49ac-8aa0-d3959c0e28dc.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b821b539-3f6c-4ee1-8d8d-c331fb7aedce.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/7368a75b-895f-4b33-ac15-1364f4ff3f9f.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/9cd874e4-d629-4f8a-8760-b877ec0e5d9e.ttf") format("truetype");\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/0f774eeb-e868-4bd6-9055-79542afd5208.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/0f774eeb-e868-4bd6-9055-79542afd5208.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/cdb13a7a-2f13-4f7c-b7a3-01b4ccef574d.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/40a8594b-08b2-4a38-97d9-958c95360b20.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/bcc8880e-b967-43ce-a210-d1404cbdc736.ttf") format("truetype");\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/653875a7-77e2-4995-97f2-4c9de734eb69.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/653875a7-77e2-4995-97f2-4c9de734eb69.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/445f40df-cbad-41e8-92eb-b4438eb872fc.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/ed8af8bb-2ddb-4128-a83b-837173705425.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/7401384a-83d5-4f49-a886-089029ce641c.ttf") format("truetype");\n  font-weight: 500;\n  font-style: italic;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/5cd9741a-b33e-4cd7-a197-e850a6e920b2.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/5cd9741a-b33e-4cd7-a197-e850a6e920b2.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/601fdeac-544b-4132-8e0d-f24e0a72e489.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/680a604b-6cec-4a82-8d1c-3a77fb66cee5.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/ef6af46e-3064-450c-9902-48bb726bd026.ttf") format("truetype");\n  font-weight: 800;\n  font-style: normal;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/96eee7b7-99e1-4bc6-9099-86d14aa4b25a.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/96eee7b7-99e1-4bc6-9099-86d14aa4b25a.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/ec5c34fc-3ad0-4147-9b77-e978a00b7653.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/e2a9f569-6858-48b4-b5c0-30c014123cd1.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/fb00b17a-2053-49b7-9d53-68cf5c842ba1.ttf") format("truetype");\n  font-weight: 800;\n  font-style: italic;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/69d25c38-dbab-4326-9230-923d3c18889b.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/69d25c38-dbab-4326-9230-923d3c18889b.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/7bc581c3-bb28-4f5d-a9c5-3018fcfbfbd9.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/4e811424-cd97-4afb-bf5a-965c3b39905d.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/124573c7-0c5e-4c89-8a3a-4ee9aee5d3a9.ttf") format("truetype");\n  font-weight: 900;\n  font-style: normal;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b3dc84d3-a366-4d54-85cd-a4a909be2322.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b3dc84d3-a366-4d54-85cd-a4a909be2322.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/e5071d6e-c3d6-4c88-8042-a4c33b65387f.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/53426c00-fe27-497e-bafe-d62c9c2f02b5.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/1d0866b5-0d7c-4fde-988c-c45899a3503f.ttf") format("truetype");\n  font-weight: 900;\n  font-style: italic;\n}\n@font-face {\n  font-family: "FF Mark W05";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b9275bbe-5494-4561-8869-49b8b4213b0e.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b9275bbe-5494-4561-8869-49b8b4213b0e.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/e6f5bc67-2b84-4b0a-b32a-0ec6c2b8634e.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/b428d7d4-bc34-4bdf-a27b-13bf549f613c.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/ffmark/2864b8c0-7389-464a-845c-23d708d5665c.ttf") format("truetype");\n  font-weight: 950;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Cairo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Regular.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Regular.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Regular.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Regular.ttf") format("truetype"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Regular.svg#") format("svg");\n  font-weight: 1 699;\n}\n@font-face {\n  font-family: "Cairo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Bold.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Bold.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Bold.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Bold.ttf") format("truetype"), url("https://lolstatic-a.akamaihd.net/awesomefonts/1.0.0/Fonts/Cairo-Bold.svg#") format("svg");\n  font-weight: 700 999;\n}\n@font-face {\n  font-family: "Neue Frutiger World W05_n4";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/2b60fc6c-fa8d-43f1-a9b8-6c5c77815ab6.eot?#iefix") format("eot");\n}\n@font-face {\n  font-family: "Neue Frutiger World W05";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/2b60fc6c-fa8d-43f1-a9b8-6c5c77815ab6.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/2b60fc6c-fa8d-43f1-a9b8-6c5c77815ab6.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/8bdf6867-c434-4e1e-b0cd-8653db148cd9.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/75ffdee7-26c9-43d8-9fcd-6383663c6891.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/f455f05f-2737-4d93-b58a-f15fc8dbd9ec.ttf") format("truetype");\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Neue Frutiger World W05_i4";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/43d95c29-a881-4e0b-92d0-4d82b49bb518.eot?#iefix") format("eot");\n}\n@font-face {\n  font-family: "Neue Frutiger World W05";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/43d95c29-a881-4e0b-92d0-4d82b49bb518.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/43d95c29-a881-4e0b-92d0-4d82b49bb518.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/37724264-30a8-41d0-922a-c16f9941551e.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/62af9f13-d1bd-4e6e-bab1-57fc299d990c.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/93db667a-1eb8-41e9-8552-260c3665e7a5.ttf") format("truetype");\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: "Neue Frutiger World W05_n7";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/39e3636b-a1e0-405f-b107-b8c085dbcab4.eot?#iefix") format("eot");\n}\n@font-face {\n  font-family: "Neue Frutiger World W05";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/39e3636b-a1e0-405f-b107-b8c085dbcab4.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/39e3636b-a1e0-405f-b107-b8c085dbcab4.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/cfbc054a-704d-4ef8-bdff-935a38de18ed.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/829467b2-67b5-4c02-b47c-25da7513a62f.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/8a7d27b5-8d29-46fe-84c5-2f6e0b345b83.ttf") format("truetype");\n  font-weight: 700;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Neue Frutiger World";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Medium.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Medium.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Medium.ttf") format("truetype");\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Neue Frutiger World";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Bold.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Bold.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Bold.ttf") format("truetype");\n  font-weight: 700;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Neue Frutiger World";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Heavy.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Heavy.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-Heavy.ttf") format("truetype");\n  font-weight: 800;\n  font-style: normal;\n}\n@font-face {\n  font-family: "Neue Frutiger World";\n  src: url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-XBlack.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-XBlack.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/webfonts/live/fonts/neuefruitegerworld/NeueFrutigerWorld-XBlack.ttf") format("truetype");\n  font-weight: 900;\n  font-style: normal;\n}\n@font-face {\n  font-family: "RixSGo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.eot?#iefix") format("eot");\n}\n@font-face {\n  font-family: "RixSGo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.ttf") format("truetype");\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: "RixSGo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoM.ttf") format("truetype");\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: "RixSGo";\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoB.eot?#iefix");\n  src: url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoB.eot?#iefix") format("eot"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoB.woff2") format("woff2"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoB.woff") format("woff"), url("https://lolstatic-a.akamaihd.net/awesomefonts/Fonts/rixsg/RixSGoB.ttf") format("truetype");\n  font-weight: 700;\n  font-style: normal;\n}'),
    Ln = Object.freeze({ default: Rn }),
    Fn =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    Nn = J(function (t) {
      !(function (n, e) {
        t.exports ? (t.exports = e()) : (n.svg4everybody = e());
      })(Fn, function () {
        function t(t, n, e) {
          if (e) {
            var r = document.createDocumentFragment(),
              a = !n.hasAttribute("viewBox") && e.getAttribute("viewBox");
            a && n.setAttribute("viewBox", a);
            for (var i = e.cloneNode(!0); i.childNodes.length; )
              r.appendChild(i.firstChild);
            t.appendChild(r);
          }
        }
        function n(n) {
          (n.onreadystatechange = function () {
            if (4 === n.readyState) {
              var e = n._cachedDocument;
              e ||
                ((e = n._cachedDocument =
                  document.implementation.createHTMLDocument("")),
                (e.body.innerHTML = n.responseText),
                (n._cachedTarget = {})),
                n._embeds.splice(0).map(function (r) {
                  var a = n._cachedTarget[r.id];
                  a || (a = n._cachedTarget[r.id] = e.getElementById(r.id)),
                    t(r.parent, r.svg, a);
                });
            }
          }),
            n.onreadystatechange();
        }
        function e(e) {
          function a() {
            for (var e = 0; e < f.length; ) {
              var l = f[e],
                s = l.parentNode,
                c = r(s),
                u =
                  l.getAttribute("data-href") ||
                  l.getAttribute("xlink:href") ||
                  l.getAttribute("href");
              if (
                (!u && o.attributeName && (u = l.getAttribute(o.attributeName)),
                c && u)
              ) {
                if (i)
                  if (!o.validate || o.validate(u, c, l)) {
                    s.removeChild(l);
                    var p = u.split("#"),
                      m = p.shift(),
                      g = p.join("#");
                    if (m.length) {
                      var v = b[m];
                      v ||
                        ((v = b[m] = new XMLHttpRequest()),
                        v.open("GET", m),
                        v.send(),
                        (v._embeds = [])),
                        v._embeds.push({ parent: s, svg: c, id: g }),
                        n(v);
                    } else t(s, c, document.getElementById(g));
                  } else ++e, ++h;
              } else ++e;
            }
            (!f.length || f.length - h > 0) && d(a, 67);
          }
          var i,
            o = Object(e),
            l = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
            s = /\bAppleWebKit\/(\d+)\b/,
            c = /\bEdge\/12\.(\d+)\b/,
            u = /\bEdge\/.(\d+)\b/,
            p = window.top !== window.self;
          i =
            "polyfill" in o
              ? o.polyfill
              : l.test(navigator.userAgent) ||
                (navigator.userAgent.match(c) || [])[1] < 10547 ||
                (navigator.userAgent.match(s) || [])[1] < 537 ||
                (u.test(navigator.userAgent) && p);
          var b = {},
            d = window.requestAnimationFrame || setTimeout,
            f = document.getElementsByTagName("use"),
            h = 0;
          i && a();
        }
        function r(t) {
          for (
            var n = t;
            "svg" !== n.nodeName.toLowerCase() && (n = n.parentNode);

          );
          return n;
        }
        return e;
      });
    }),
    En = {},
    Mn = [],
    Tn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
  (wn = {
    __e: function (t, n) {
      for (var e, r; (n = n.__); )
        if ((e = n.__c) && !e.__)
          try {
            if (
              (e.constructor &&
                null != e.constructor.getDerivedStateFromError &&
                ((r = !0),
                e.setState(e.constructor.getDerivedStateFromError(t))),
              null != e.componentDidCatch && ((r = !0), e.componentDidCatch(t)),
              r)
            )
              return st((e.__E = e));
          } catch (n) {
            t = n;
          }
      throw t;
    },
  }),
    (yn = function (t) {
      return null != t && void 0 === t.constructor;
    }),
    (it.prototype.setState = function (t, n) {
      var e;
      (e = this.__s !== this.state ? this.__s : (this.__s = Q({}, this.state))),
        "function" == typeof t && (t = t(e, this.props)),
        t && Q(e, t),
        null != t &&
          this.__v &&
          ((this.__e = !1), n && this.__h.push(n), st(this));
    }),
    (it.prototype.forceUpdate = function (t) {
      this.__v && ((this.__e = !0), t && this.__h.push(t), st(this));
    }),
    (it.prototype.render = at),
    (kn = []),
    (xn =
      "function" == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout),
    (Cn = En),
    (Sn = 0);
  var An,
    Bn,
    Pn,
    In,
    On = {
      window: window,
      deepOverride: function (t, n, e) {
        var r = {};
        void 0 === e && (e = 1 / 0);
        for (var a in t)
          if (t.hasOwnProperty(a)) {
            var i = null !== t[a],
              o = "object" === N(t[a]);
            (o = o && !this.isArray(t[a])),
              void 0 === n
                ? (r[a] = t[a])
                : e > 0 && i && o
                ? (r[a] = this.deepOverride(t[a], n[a], e - 1))
                : n.hasOwnProperty(a)
                ? void 0 !== n[a] && (r[a] = n[a])
                : (r[a] = t[a]);
          }
        return r;
      },
      isArray: function (t) {
        return Array.isArray
          ? Array.isArray(t)
          : "[object Array]" === Object.prototype.toString.call(t);
      },
      isEmptyObject: function (t) {
        var n;
        for (n in t) if (t.hasOwnProperty(n)) return !1;
        return null !== t;
      },
      map: function (t, n) {
        if (null !== t) {
          var e = [];
          if (Object.keys)
            for (var r = Object.keys(t), a = r.length, i = 0; i < a; i++) {
              var o = r[i];
              e.push(n(o, t[o]));
            }
          else for (var l in t) t.hasOwnProperty(l) && e.push(n(l, t[l]));
          return e;
        }
      },
      filter: function (t, n) {
        if (null !== t && this.isArray(t)) {
          for (var e = [], r = 0; r < t.length; r++) n(t[r]) && e.push(t[r]);
          return e;
        }
      },
      nextTick: function (t) {
        setTimeout(t, 0);
      },
      appendStyles: function (t) {
        var n = document.head || document.getElementsByTagName("head")[0],
          e = document.createElement("style");
        if (((e.type = "text/css"), n.appendChild(e), e.styleSheet)) {
          e.styleSheet.cssText = t;
          try {
            e.innerHTML = t;
          } catch (r) {}
        } else e.appendChild(document.createTextNode(t));
      },
      appendScript: function (t) {
        var n = document.head || document.getElementsByTagName("head")[0],
          e = document.createElement("script");
        (e.type = "text/javascript"), (e.src = t), n.appendChild(e);
      },
      ensureScript: function (t, n) {
        var e = n.interval ? n.interval : 10,
          r = !1,
          a = !1,
          i = this,
          o = function l() {
            for (
              var o = !0, s = t.split("."), c = window, u = 0;
              o && u < s.length;
              u++
            )
              (o = c.hasOwnProperty ? c.hasOwnProperty(s[u]) : !!c[s[u]]),
                (c = c[s[u]]);
            o
              ? ((r = !0), a && a.call())
              : (n.url && (i.appendScript(n.url), delete n.url),
                setTimeout(l, e));
          };
        return (
          o(),
          {
            then: function (t) {
              r ? t.call() : (a = t);
            },
          }
        );
      },
      hasClass: function (t, n) {
        var e = " " + t.className + " ",
          r = " " + n + " ";
        return e.indexOf(r) > -1;
      },
      toggleClass: function (t, n, e) {
        if (t) {
          var r = "boolean" == typeof e ? !e : this.hasClass(t, n);
          r ? this.removeClass(t, n) : this.addClass(t, n);
        }
      },
      addClass: function (t, n) {
        if (t) {
          var e = t.className.split(/\s+/);
          e.indexOf(n) === -1 &&
            (e.splice(e.length, 0, n), (t.className = e.join(" ")));
        }
      },
      removeClass: function (t, n) {
        if (t)
          for (var e = t.className.split(/\s+/), r = e.length; r >= 0; r--)
            e[r] === n && (e.splice(r, 1), (t.className = e.join(" ")));
      },
      getCurrentDomain: function (t) {
        var n = this.window.location.hostname,
          e = /([a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?)$/i,
          r = n.match(e);
        return null !== r ? r[1] : t;
      },
      createCORSRequest: function (t, n) {
        var e = new XMLHttpRequest();
        return (
          "withCredentials" in e
            ? e.open(t, n, !0)
            : "undefined" != typeof XDomainRequest
            ? ((e = new XDomainRequest()), e.open(t, n))
            : (e = null),
          e
        );
      },
      addEvent: function (t, n, e) {
        t &&
          (t.attachEvent
            ? ((t["e" + n + e] = e),
              (t[n + e] = function () {
                t["e" + n + e](this.window.event);
              }),
              t.attachEvent("on" + n, t[n + e]))
            : t.addEventListener(n, e, !1));
      },
      removeEvent: function (t, n, e) {
        t &&
          (t.detachEvent
            ? (t.detachEvent("on" + n, t[n + e]), (t[n + e] = null))
            : t.removeEventListener(n, e, !1));
      },
      setCookie: function (t, n, e) {
        (t = encodeURIComponent(t)), (n = encodeURIComponent(n));
        var r = t + "=" + n + ";";
        (e = e || {}),
          e.expires && (r = r + "expires=" + e.expires + ";"),
          e.path && (r = r + "path=" + e.path + ";"),
          e.domain &&
            "localhost" != e.domain &&
            (r = r + "domain=" + e.domain + ";"),
          e.secure && (r += "secure;"),
          (document.cookie = r);
      },
      getCookie: function (t) {
        t = encodeURIComponent(t);
        var n = new RegExp(t + "=([^;]*)"),
          e = n.exec(document.cookie);
        return !!e && decodeURIComponent(e[1]);
      },
      delCookie: function (t) {
        this.setCookie(t, "", { expires: "Thu, 01 Jan 1970 00:00:01 GMT" });
      },
      createElementFromHTML: function (t) {
        var n = document.createElement("div");
        return (n.innerHTML = t.trim()), n.firstChild;
      },
      isDescendantOfId: function (t, n) {
        do {
          if (!t) return !1;
          if (t.id === n) return !0;
        } while ((t = t.parentElement));
        return !1;
      },
      isDescendantOfClass: function (t, n) {
        do {
          if (!t) return !1;
          if (this.hasClass(t, n)) return !0;
        } while ((t = t.parentElement));
        return !1;
      },
      isDescendantOfEl: function (t, n) {
        if (!n) return !1;
        do {
          if (!t) return !1;
          if (t === n) return !0;
        } while ((t = t.parentElement));
        return !1;
      },
      determineRenderIntoElement: function (t) {
        var n = !1;
        return (
          "string" == typeof t && null !== document.getElementById(t)
            ? (n = document.getElementById(t))
            : t instanceof Object && (n = t),
          n
        );
      },
      determineDeferredFilePrefix: function () {
        var t = "playvalorantfinal";
        return "riotbar.product_identifier" !== t ? (t += ".") : (t = ""), t;
      },
      checkLinkMatch: function (t) {
        if (!t) return !1;
        if (
          ("string" == typeof t && (t = new RegExp(t)),
          !window || !window.location)
        )
          return !1;
        var n = this.getCurrentURLPath();
        return t.test(n);
      },
      getCurrentURLPath: function () {
        return window.location.pathname;
      },
      logError: function (t) {
        console && console.error, void 0;
      },
    },
    Dn =
      (On.window,
      On.deepOverride,
      On.isArray,
      On.isEmptyObject,
      On.map,
      On.filter,
      On.nextTick,
      On.appendStyles,
      On.appendScript,
      On.ensureScript,
      On.hasClass,
      On.toggleClass,
      On.addClass,
      On.removeClass,
      On.getCurrentDomain,
      On.createCORSRequest,
      On.addEvent,
      On.removeEvent,
      On.setCookie,
      On.getCookie,
      On.delCookie,
      On.createElementFromHTML,
      On.isDescendantOfId,
      On.isDescendantOfClass,
      On.isDescendantOfEl,
      On.determineRenderIntoElement,
      On.determineDeferredFilePrefix,
      On.checkLinkMatch,
      On.getCurrentURLPath,
      On.logError),
    jn =
      '/* Breakpoints */\n/* Common Mixins */\n/*\n * SVG styles and reset.\n * Pointer events are set to none due to an IE event.\n * Wrap all SVGs in a container and bind events to that container\n */\n#riotbar-bar svg, #riotbar-subbar .riotbar-footer svg, #riotbar-application-switcher svg {\n  pointer-events: none;\n}\n#riotbar-bar svg.hide, #riotbar-subbar .riotbar-footer svg.hide, #riotbar-application-switcher svg.hide {\n  display: none;\n}\n#riotbar-bar svg.block, #riotbar-subbar .riotbar-footer svg.block, #riotbar-application-switcher svg.block {\n  display: block;\n}\n#riotbar-bar svg.inline-block, #riotbar-subbar .riotbar-footer svg.inline-block, #riotbar-application-switcher svg.inline-block {\n  display: inline-block;\n}\n#riotbar-bar svg.float-left, #riotbar-subbar .riotbar-footer svg.float-left, #riotbar-application-switcher svg.float-left {\n  float: left;\n}\n#riotbar-bar svg.float-right, #riotbar-subbar .riotbar-footer svg.float-right, #riotbar-application-switcher svg.float-right {\n  float: right;\n}\n#riotbar-bar svg use, #riotbar-subbar .riotbar-footer svg use, #riotbar-application-switcher svg use {\n  pointer-events: none;\n}\n\n.riotbar-root {\n  position: static;\n}\n\nbody.riotbar-present {\n  margin: 0px;\n  overflow-x: hidden;\n  padding: 0px;\n  position: static;\n}\n\n.riotbar-clearfix {\n  zoom: 1;\n  /* ie 6/7 */\n}\n.riotbar-clearfix:before, .riotbar-clearfix:after {\n  content: "";\n  display: table;\n}\n.riotbar-clearfix:after {\n  clear: both;\n}\n\n.riotbar-base-element {\n  /* RiotBar Reset\n     based on Eric Meyer\'s CSS Reset, but targeted within .riotbar\n        - http://meyerweb.com/eric/tools/css/reset/\n     Note\n       - removed html & body selectors, which don\'t apply for .riotbar\n       - To optimize the generated css, we have commented out some unused selectors\n  */\n  /* HTML5 display-role reset for older browsers */\n  /*\n    @TODO: do we want to size some things to the size of the content?\n    - the locale switcher would be a good example of something where this would apply.\n\n    We can creat a new class like this which can be applied to elements like the `riotbar-subbar` ...\n       ... which perhaps should be renamed the `riotbar-document-bar`\n\n    .riotbar-docwidth {\n      width: 1000px;\n      width: 100%;\n      margin: 0 auto;\n      padding: 0 10px;\n    }\n\n    This width attribute of this css would then become a configuration option,\n    which apps could override.  We would use js to set the width property of the class.\n    This way our templates and css can easily adapt to the various desktop page widths that we encounter.\n    The configuration option might not be a simple width.  Perhaps, if we provide a breakpoint declaration\n    system in the configs, then we cana more complex breakpoint system rule s\n\n\n   */\n}\n.riotbar-base-element,\n.riotbar-base-element div, .riotbar-base-element span,\n.riotbar-base-element h1, .riotbar-base-element h2, .riotbar-base-element h3, .riotbar-base-element h4, .riotbar-base-element h5, .riotbar-base-element h6,\n.riotbar-base-element a,\n.riotbar-base-element img,\n.riotbar-base-element ol, .riotbar-base-element ul, .riotbar-base-element li,\n.riotbar-base-element strong, .riotbar-base-element em {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  vertical-align: baseline;\n  /* prevent text selection */\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  /* Fix webkit fonts */\n  -webkit-font-smoothing: antialiased;\n}\n.riotbar-base-element:lang(ar),\n.riotbar-base-element div:lang(ar), .riotbar-base-element span:lang(ar),\n.riotbar-base-element h1:lang(ar), .riotbar-base-element h2:lang(ar), .riotbar-base-element h3:lang(ar), .riotbar-base-element h4:lang(ar), .riotbar-base-element h5:lang(ar), .riotbar-base-element h6:lang(ar),\n.riotbar-base-element a:lang(ar),\n.riotbar-base-element img:lang(ar),\n.riotbar-base-element ol:lang(ar), .riotbar-base-element ul:lang(ar), .riotbar-base-element li:lang(ar),\n.riotbar-base-element strong:lang(ar), .riotbar-base-element em:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n.riotbar-base-element:lang(ru), .riotbar-base-element:lang(vi), .riotbar-base-element:lang(vn), .riotbar-base-element:lang(el), .riotbar-base-element:lang(gr), .riotbar-base-element:lang(th),\n.riotbar-base-element div:lang(ru),\n.riotbar-base-element div:lang(vi),\n.riotbar-base-element div:lang(vn),\n.riotbar-base-element div:lang(el),\n.riotbar-base-element div:lang(gr),\n.riotbar-base-element div:lang(th), .riotbar-base-element span:lang(ru), .riotbar-base-element span:lang(vi), .riotbar-base-element span:lang(vn), .riotbar-base-element span:lang(el), .riotbar-base-element span:lang(gr), .riotbar-base-element span:lang(th),\n.riotbar-base-element h1:lang(ru),\n.riotbar-base-element h1:lang(vi),\n.riotbar-base-element h1:lang(vn),\n.riotbar-base-element h1:lang(el),\n.riotbar-base-element h1:lang(gr),\n.riotbar-base-element h1:lang(th), .riotbar-base-element h2:lang(ru), .riotbar-base-element h2:lang(vi), .riotbar-base-element h2:lang(vn), .riotbar-base-element h2:lang(el), .riotbar-base-element h2:lang(gr), .riotbar-base-element h2:lang(th), .riotbar-base-element h3:lang(ru), .riotbar-base-element h3:lang(vi), .riotbar-base-element h3:lang(vn), .riotbar-base-element h3:lang(el), .riotbar-base-element h3:lang(gr), .riotbar-base-element h3:lang(th), .riotbar-base-element h4:lang(ru), .riotbar-base-element h4:lang(vi), .riotbar-base-element h4:lang(vn), .riotbar-base-element h4:lang(el), .riotbar-base-element h4:lang(gr), .riotbar-base-element h4:lang(th), .riotbar-base-element h5:lang(ru), .riotbar-base-element h5:lang(vi), .riotbar-base-element h5:lang(vn), .riotbar-base-element h5:lang(el), .riotbar-base-element h5:lang(gr), .riotbar-base-element h5:lang(th), .riotbar-base-element h6:lang(ru), .riotbar-base-element h6:lang(vi), .riotbar-base-element h6:lang(vn), .riotbar-base-element h6:lang(el), .riotbar-base-element h6:lang(gr), .riotbar-base-element h6:lang(th),\n.riotbar-base-element a:lang(ru),\n.riotbar-base-element a:lang(vi),\n.riotbar-base-element a:lang(vn),\n.riotbar-base-element a:lang(el),\n.riotbar-base-element a:lang(gr),\n.riotbar-base-element a:lang(th),\n.riotbar-base-element img:lang(ru),\n.riotbar-base-element img:lang(vi),\n.riotbar-base-element img:lang(vn),\n.riotbar-base-element img:lang(el),\n.riotbar-base-element img:lang(gr),\n.riotbar-base-element img:lang(th),\n.riotbar-base-element ol:lang(ru),\n.riotbar-base-element ol:lang(vi),\n.riotbar-base-element ol:lang(vn),\n.riotbar-base-element ol:lang(el),\n.riotbar-base-element ol:lang(gr),\n.riotbar-base-element ol:lang(th), .riotbar-base-element ul:lang(ru), .riotbar-base-element ul:lang(vi), .riotbar-base-element ul:lang(vn), .riotbar-base-element ul:lang(el), .riotbar-base-element ul:lang(gr), .riotbar-base-element ul:lang(th), .riotbar-base-element li:lang(ru), .riotbar-base-element li:lang(vi), .riotbar-base-element li:lang(vn), .riotbar-base-element li:lang(el), .riotbar-base-element li:lang(gr), .riotbar-base-element li:lang(th),\n.riotbar-base-element strong:lang(ru),\n.riotbar-base-element strong:lang(vi),\n.riotbar-base-element strong:lang(vn),\n.riotbar-base-element strong:lang(el),\n.riotbar-base-element strong:lang(gr),\n.riotbar-base-element strong:lang(th), .riotbar-base-element em:lang(ru), .riotbar-base-element em:lang(vi), .riotbar-base-element em:lang(vn), .riotbar-base-element em:lang(el), .riotbar-base-element em:lang(gr), .riotbar-base-element em:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n.riotbar-base-element:lang(ko), .riotbar-base-element:lang(kr),\n.riotbar-base-element div:lang(ko),\n.riotbar-base-element div:lang(kr), .riotbar-base-element span:lang(ko), .riotbar-base-element span:lang(kr),\n.riotbar-base-element h1:lang(ko),\n.riotbar-base-element h1:lang(kr), .riotbar-base-element h2:lang(ko), .riotbar-base-element h2:lang(kr), .riotbar-base-element h3:lang(ko), .riotbar-base-element h3:lang(kr), .riotbar-base-element h4:lang(ko), .riotbar-base-element h4:lang(kr), .riotbar-base-element h5:lang(ko), .riotbar-base-element h5:lang(kr), .riotbar-base-element h6:lang(ko), .riotbar-base-element h6:lang(kr),\n.riotbar-base-element a:lang(ko),\n.riotbar-base-element a:lang(kr),\n.riotbar-base-element img:lang(ko),\n.riotbar-base-element img:lang(kr),\n.riotbar-base-element ol:lang(ko),\n.riotbar-base-element ol:lang(kr), .riotbar-base-element ul:lang(ko), .riotbar-base-element ul:lang(kr), .riotbar-base-element li:lang(ko), .riotbar-base-element li:lang(kr),\n.riotbar-base-element strong:lang(ko),\n.riotbar-base-element strong:lang(kr), .riotbar-base-element em:lang(ko), .riotbar-base-element em:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n.riotbar-base-element ol, .riotbar-base-element ul {\n  list-style: none;\n}\n.riotbar-base-element,\n.riotbar-base-element * {\n  box-sizing: border-box;\n  position: static;\n  /* default to ensure overrides from other websites don\'t mess with us */\n}\n.riotbar-base-element .riotbar-pagewidth {\n  position: relative;\n  width: 100%;\n  margin: 0 auto;\n  padding: 0px;\n}\n.riotbar-base-element a,\n.riotbar-base-element a:link,\n.riotbar-base-element a:visited {\n  text-decoration: none;\n  color: #F9F9F9;\n}\n\n#riotbar-bar-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 0;\n  border: 0;\n  width: 100%;\n}\n#riotbar-bar-wrapper.riotbar-sticky {\n  position: fixed;\n  z-index: 10000;\n}\n\n#riotbar-bar {\n  background-color: #111111;\n  border-bottom: 2px solid #333333;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  font-size: 14px !important;\n  font-weight: bold;\n  height: 80px;\n  line-height: normal;\n  position: relative;\n  text-align: left;\n  width: 100%;\n  z-index: 3000000;\n}\n#riotbar-bar .sub-menu-header-icon {\n  color: #F9F9F9;\n  display: inline-block;\n}\n#riotbar-bar .sub-menu-header-icon svg, #riotbar-bar .sub-menu-header-icon span {\n  display: none;\n  float: left;\n}\n#riotbar-bar:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-bar:lang(ru), #riotbar-bar:lang(vi), #riotbar-bar:lang(vn), #riotbar-bar:lang(el), #riotbar-bar:lang(gr), #riotbar-bar:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-bar:lang(ko), #riotbar-bar:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-navbar-separator {\n  border-left: 2px solid #7E7E7E;\n  display: inline-block;\n  font-size: 14px;\n  height: 30px;\n  margin-left: 0.25em;\n  margin-right: 0.25em;\n  margin-top: 24px;\n  vertical-align: top;\n  opacity: 0.4;\n}\n#riotbar-bar .riotbar-navbar-separator.riotbar-title-separator {\n  margin-right: 0.85em;\n}\n#riotbar-bar .riotbar-bar-content {\n  text-align: center;\n  height: 80px;\n  flex: 1;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar .riotbar-bar-content {\n    padding-left: 0;\n  }\n}\n#riotbar-bar .riotbar-left-content, #riotbar-bar .riotbar-content {\n  opacity: 1;\n  transition: opacity 0.5s cubic-bezier(0.06, 0.81, 0, 0.98) 0s;\n}\n#riotbar-bar .riotbar-left-content {\n  height: 80px;\n  padding-top: 15px;\n  padding-right: 30px;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar .riotbar-left-content {\n    padding-right: 0;\n  }\n}\n#riotbar-bar .riotbar-left-content:lang(ar) {\n  padding-right: 10px;\n  padding-left: 15px;\n}\n#riotbar-bar.sidebar-open .riotbar-bar-content, #riotbar-bar.sidebar-open .riotbar-left-content {\n  opacity: 0.25;\n}\n#riotbar-bar .riotbar-right-mobile-content {\n  display: none;\n  right: 70px;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar .riotbar-right-mobile-content {\n    display: block;\n  }\n  #riotbar-bar .riotbar-right-mobile-content #riotbar-service-status-messages {\n    right: -10px;\n  }\n}\n#riotbar-bar .riotbar-right-content, #riotbar-bar .riotbar-right-mobile-content {\n  bottom: 0;\n  top: 0;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar.riotbar-mobile-responsive .riotbar-right-content .riotbar-navmenu-dropdown {\n    transform: translateX(100%);\n    width: 315px;\n    overflow-y: auto;\n  }\n}\n#riotbar-bar .riotbar-right-content {\n  padding-right: 16px;\n  right: 0px;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar .riotbar-right-content {\n    padding-right: 0;\n  }\n  #riotbar-bar .riotbar-right-content #riotbar-service-status, #riotbar-bar .riotbar-right-content #riotbar-account {\n    display: none;\n  }\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons {\n  margin: 0px 12px;\n  float: left;\n  white-space: nowrap;\n  color: #F9F9F9;\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons > div {\n  float: left;\n  padding: 0 8px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons .lang-switch-trigger {\n  cursor: pointer;\n  display: block;\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons:lang(ar) {\n  float: right;\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons .riotbar-navmenu-right-icon {\n  float: left;\n}\n#riotbar-bar .riotbar-right-content .riotbar-right-content-icons .riotbar-navmenu-right-icon .lang-switch-trigger svg {\n  margin-top: 32px;\n  pointer-events: none;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown {\n  background: #212121;\n  border-top: 2px solid #262626;\n  box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.5);\n  margin: 0;\n  opacity: 0;\n  overflow: visible;\n  padding-bottom: 18px;\n  position: fixed;\n  height: 100%;\n  text-align: left;\n  transform: translateY(-5%);\n  top: 0px;\n  right: 0;\n  visibility: hidden;\n  width: 460px;\n  z-index: 10;\n  transition: transform 300ms, opacity 300ms;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .lang-switch-dropdown {\n  z-index: 11;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown a {\n  padding-left: 18px;\n  padding-right: 18px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown.riotbar-click-active {\n  visibility: visible;\n  transform: translateX(0%);\n  opacity: 1;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown.slide-out {\n  visibility: visible;\n  transform: translateX(100%);\n  opacity: 1;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header {\n  height: 78px;\n  background-color: #111111;\n  border-bottom: 2px solid #262626;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header a {\n  cursor: pointer;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header .sub-menu-header-text {\n  font-size: 18px;\n  position: absolute;\n  top: 22px;\n  left: 40px;\n  color: #F9F9F9;\n  text-overflow: ellipsis;\n  max-width: 200px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header .sub-menu-back {\n  position: absolute;\n  top: 20px;\n  height: 30px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header .sub-menu-back svg {\n  display: inline-block;\n  margin-top: 12px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header .sub-menu-close {\n  position: absolute;\n  top: 21px;\n  right: 31px;\n  width: 32px;\n  height: 32px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .sub-menu-header .sub-menu-close svg {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .side-menu-icon {\n  position: absolute;\n  top: 28px;\n  right: 30px;\n  width: 10px;\n  height: 10px;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-dropdown .side-menu-icon svg {\n  display: block;\n}\n#riotbar-bar .riotbar-right-content .riotbar-navmenu-touchpoints, #riotbar-bar .riotbar-right-content .riotbar-navmenu-links {\n  transition: opacity 0.2s linear;\n}\n#riotbar-bar .riotbar-right-content.riotbar-click-active .riotbar-navmenu-touchpoints {\n  display: block;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link {\n  position: relative;\n  display: block;\n  font-size: 16px;\n  font-weight: 800;\n  margin: 0;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  text-transform: uppercase;\n  transition: color 1s cubic-bezier(0.06, 0.81, 0, 0.98);\n  border-bottom: 1px solid #111111;\n  cursor: pointer;\n  letter-spacing: 0.1em;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.disabled {\n  color: #7E7E7E;\n  cursor: default;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.disabled svg {\n  position: absolute;\n  right: 25px;\n  top: 25px;\n  fill: #7E7E7E;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.riotbar-active-link {\n  background-color: #333333;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link:lang(ar) {\n  letter-spacing: 0;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.riotbar-active-link {\n  color: #F9F9F9;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link:last-child {\n  margin-bottom: 0;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.show-auth-sub-menu {\n  text-transform: none;\n  background-color: #171717;\n  letter-spacing: 0;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link.show-auth-sub-menu svg.arrow-down {\n  margin-left: 10px;\n  margin-bottom: 3px;\n  transform: rotate(270deg);\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link .sideMenuIcons {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 100px;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link .sideMenuIcons .lang-switch-trigger {\n  width: 32px;\n  height: 32px;\n  position: absolute;\n  right: 31px;\n  top: 5px;\n  padding: 0;\n  border-radius: 16px;\n  background-color: #212121;\n}\n#riotbar-bar .riotbar-right-content a.riotbar-navmenu-link .sideMenuIcons .lang-switch-trigger svg {\n  position: absolute;\n  top: 9px;\n  left: 9px;\n}\n#riotbar-bar .riotbar-right-content.riotbar-menu-transition .riotbar-navmenu-touchpoints, #riotbar-bar .riotbar-right-content.riotbar-menu-transition .riotbar-navmenu-links {\n  opacity: 0;\n}\n#riotbar-bar .riotbar-right-content.riotbar-show-links .riotbar-navmenu-links {\n  display: block;\n}\n#riotbar-bar #riotbar-mobile-nav {\n  display: none;\n  margin-right: 10px;\n  margin-left: 10px;\n}\n#riotbar-bar #riotbar-mobile-nav a {\n  margin-top: 23px;\n  display: inline-block;\n  cursor: pointer;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar #riotbar-mobile-nav {\n    display: inline !important;\n  }\n}\n\n#riotbar-subbar {\n  position: relative;\n  top: 0px;\n  width: 100%;\n  z-index: 10;\n  /* this z-index is questionable, but is required to place it above the lolkit header */\n  pointer-events: none;\n  text-align: left;\n}\n#riotbar-subbar:lang(ar) {\n  direction: rtl;\n}\n#riotbar-subbar .riotbar-subcontent {\n  pointer-events: auto;\n}\n\n@media screen and (max-width: 1024px) {\n  #riotbar-bar .riotbar-right-content a.riotbar-navmenu-link .sideMenuIcons .lang-switch-trigger {\n    top: 12px;\n    right: 30px;\n  }\n}\n/** Global Keyframes **/\n/* Keyframes */\n/* Basic Fade-in effect */\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/* Slide in from left animation */\n@keyframes slideInFromLeft {\n  0% {\n    left: -76vw;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-moz-keyframes slideInFromLeft {\n  0% {\n    left: -76vw;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-webkit-keyframes slideInFromLeft {\n  0% {\n    left: -76vw;\n  }\n  100% {\n    left: 0;\n  }\n}\n#riotbar-navbar {\n  display: table;\n  font-size: 0;\n  height: 80px;\n  margin-right: 0;\n  max-width: 100%;\n  opacity: 1;\n  text-align: center;\n}\n@media (max-width: 1024px) {\n  #riotbar-navbar {\n    display: inline-block;\n  }\n}\n#riotbar-navbar.fade-in {\n  opacity: 0;\n}\n#riotbar-navbar.fade-in.ready {\n  opacity: 1;\n  transition: opacity 0.3s cubic-bezier(0.06, 0.81, 0, 0.98) 0s;\n}\n#riotbar-navbar .link-out,\n#riotbar-navbar .link-out-white {\n  margin-left: 4px;\n}\n#riotbar-navbar .link-out:lang(ar),\n#riotbar-navbar .link-out-white:lang(ar) {\n  margin-left: 0;\n  margin-right: 4px;\n}\n#riotbar-navbar .riotbar-explore-label {\n  display: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container {\n  display: inline-block;\n  position: relative;\n  height: 80px;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container:lang(ar) {\n  direction: rtl;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subsubnav-menu-wrapper {\n  position: relative;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subsubnav-menu {\n  position: absolute;\n  right: 0;\n  left: 200px;\n  top: 0;\n  opacity: 0;\n  min-width: 200px;\n  background-color: #111111;\n  display: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subsubnav-menu:lang(ar) {\n  right: 200px;\n  left: 0;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subsubnav-menu li:hover {\n  background-color: #333333;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subsubnav-menu.subsubnav-active {\n  opacity: 1;\n  display: block;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-subnav-nested-menu {\n  background-color: #111111;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-subnav-nested-menu li {\n  padding-left: 15px;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu {\n  visibility: hidden;\n  position: absolute;\n  left: 0;\n  top: 80px;\n  background-color: #111111;\n  text-align: left;\n  font-size: 1rem;\n  min-width: 200px;\n  opacity: 0;\n  transition: opacity 0.5s cubic-bezier(0.06, 0.81, 0, 0.98) 0s, visibility 0s;\n  display: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li {\n  text-align: left;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li:lang(ar) {\n  text-align: right;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu .riotbar-navbar-sub-link {\n  padding: 12px 32px;\n  width: 100%;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li {\n  color: #1d1d1d;\n  border-bottom: solid 2px #111111;\n  list-style-type: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li:hover {\n  cursor: pointer;\n  background-color: #333333;\n  color: #ffffff;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li.no-linkage {\n  cursor: default;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-subnav-menu li.no-linkage:hover {\n  background-color: #111111;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container .riotbar-navbar-external-link {\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  margin-bottom: 5px;\n  display: inline-block;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container svg.arrow-down {\n  display: inline-block;\n  margin-bottom: 1px;\n  margin-left: 5px;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container svg.arrow-down:lang(ar) {\n  margin-right: 5px;\n  margin-left: 0;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container svg.hover {\n  display: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container:hover svg.non-hover, #riotbar-navbar .riotbar-navbar-navitem-container.nav-dropdown-active svg.non-hover {\n  display: none;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container:hover svg.hover, #riotbar-navbar .riotbar-navbar-navitem-container.nav-dropdown-active svg.hover {\n  display: inline-block;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container.nav-dropdown-active .riotbar-navbar-subnav-menu {\n  transition: opacity 0.5s cubic-bezier(0.06, 0.81, 0, 0.98) 0s, visibility 0s;\n  opacity: 1;\n  visibility: visible;\n  display: block;\n}\n#riotbar-navbar .riotbar-navbar-navitem-container.nav-dropdown-overflow.hide {\n  display: none;\n}\n#riotbar-navbar a {\n  border-bottom: 2px solid transparent;\n  color: #F9F9F9;\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 800;\n  line-height: 76px;\n  margin: 0 0.85em;\n  overflow: hidden;\n  padding-left: 12px;\n  padding-right: 12px;\n  padding-top: 2px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  transition: color 1s cubic-bezier(0.06, 0.81, 0, 0.98), border-color 0.5s cubic-bezier(0.06, 0.81, 0, 0.98);\n}\n#riotbar-navbar a:lang(ar) {\n  letter-spacing: 0;\n}\n#riotbar-navbar a.riotbar-navbar-title {\n  font-size: 18px;\n  color: #F9F9F9;\n  line-height: 80px;\n  margin-left: 0;\n  padding-left: 0;\n  padding-top: 0;\n  border: none;\n}\n#riotbar-navbar a.riotbar-navbar-title.mobile {\n  display: none;\n}\n@media (max-width: 1024px) {\n  #riotbar-navbar a.riotbar-navbar-title {\n    display: none;\n  }\n}\n#riotbar-navbar a.riotbar-active-link {\n  color: #F9F9F9;\n}\n#riotbar-navbar.riotbar-fade-left {\n  margin-right: 10%;\n  opacity: 0;\n}\n#riotbar-navbar.riotbar-fade-right {\n  margin-right: -10%;\n  opacity: 0;\n}\n@media (max-width: 1115px) {\n  #riotbar-navbar a {\n    margin: 0 0.6375em;\n  }\n  #riotbar-navbar .riotbar-navbar-separator.riotbar-title-separator {\n    margin-right: 0.6375em;\n  }\n}\n@media (max-width: 1024px) {\n  #riotbar-navbar {\n    position: static;\n  }\n  #riotbar-navbar .riotbar-navbar-separator,\n#riotbar-navbar .riotbar-navbar-link,\n#riotbar-navbar .riotbar-navbar-navitem-container {\n    display: none;\n  }\n  #riotbar-navbar .riotbar-explore-label {\n    display: block;\n    line-height: 80px;\n    height: 80px;\n  }\n  #riotbar-navbar .riotbar-explore-label svg {\n    display: block;\n    margin: 24px auto 0;\n    max-height: 50px;\n  }\n  #riotbar-navbar .riotbar-explore-label img {\n    max-height: 50px;\n    vertical-align: middle;\n    display: inline-block;\n  }\n  #riotbar-navbar .riotbar-explore-label a, #riotbar-navbar .riotbar-explore-label a:hover {\n    border-bottom-width: 0;\n  }\n}\n#riotbar-navbar .riotbar-navbar-sub-link {\n  border: none;\n  line-height: 1.5em;\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n}\n\n#riotbar-navmenu {\n  color: #F9F9F9;\n  font-size: 14px;\n  height: 50px;\n}\n#riotbar-navmenu .riotbar-explore {\n  cursor: pointer;\n  display: inline-block;\n  font-size: 0;\n  font-weight: bold;\n  height: 50px;\n  line-height: 1;\n  min-width: 36px;\n}\n#riotbar-navmenu .riotbar-logo {\n  position: relative;\n  display: inline-block;\n  height: 50px;\n  margin-left: 32px;\n  width: 75px;\n}\n#riotbar-navmenu .riotbar-logo .riot-bar-fist-logo {\n  width: 160px;\n  height: 160px;\n  background: url("https://lolstatic-a.akamaihd.net/riotbar/live/1.1.5/images/navigation/fistsprite.png") 0 -2400px no-repeat;\n  transition: background-position 0.25s steps(15, end);\n  transform: scale(0.33);\n  position: absolute;\n  top: -55px;\n  left: -55px;\n}\n#riotbar-navmenu .riotbar-logo .riot-bar-fist-logo:hover, .riotbar-application-switcher-open #riotbar-navmenu .riotbar-logo .riot-bar-fist-logo {\n  background-position: 0 0;\n}\n#riotbar-navmenu .riotbar-logo svg {\n  position: absolute;\n  top: 3px;\n  left: 51px;\n}\n#riotbar-navmenu .riotbar-logo svg.hover {\n  display: none;\n}\n#riotbar-navmenu .riotbar-logo svg.drop {\n  margin-top: 22px !important;\n  margin-bottom: 0;\n  margin-left: 5px;\n}\n#riotbar-navmenu .riotbar-logo:hover svg.hover {\n  display: inline-block;\n}\n#riotbar-navmenu .riotbar-logo:hover svg.non-hover {\n  display: none;\n}\n#riotbar-navmenu .riotbar-navbar-separator.main-logo-separator {\n  margin-left: 0;\n  margin-right: 32px;\n  margin-top: 10px;\n}\n#riotbar-navmenu .riotbar-navbar-separator.main-logo-separator:lang(ar) {\n  margin-right: 0;\n  margin-left: 32px;\n}\n@media (max-width: 1024px) {\n  #riotbar-navmenu .riotbar-navbar-separator.main-logo-separator {\n    display: none;\n  }\n}\n#riotbar-navmenu .second-logo {\n  display: inline-block;\n  height: 50px;\n}\n#riotbar-navmenu .second-logo a {\n  min-width: 38px;\n  display: block;\n}\n#riotbar-navmenu .second-logo svg {\n  margin-top: 9px;\n  display: block;\n}\n@media (max-width: 1024px) {\n  .riotbar-mobile-responsive #riotbar-navmenu {\n    content: "sidebar";\n  }\n  .riotbar-mobile-responsive #riotbar-navmenu .second-logo {\n    display: none;\n  }\n}\n\n#riotbar-bar {\n  border-bottom: 2px solid rgba(51, 51, 51, 0.25);\n  display: -ms-flexbox;\n  display: flex;\n}\n#riotbar-bar .riotbar-navmenu-category {\n  overflow: visible;\n  position: relative;\n  border-top: 0;\n  margin-top: 0;\n  padding-top: 0;\n}\n#riotbar-bar .riotbar-navmenu-category .black-side-menu-option {\n  background-color: #111111 !important;\n}\n#riotbar-bar .riotbar-navmenu-category .riotbar-category-name {\n  color: #f1e6d0;\n  font-size: 14px;\n  margin-bottom: 9px;\n  text-transform: uppercase;\n}\n#riotbar-bar .riotbar-navmenu-category:before, #riotbar-bar .riotbar-navmenu-category:after {\n  content: " ";\n  display: table;\n}\n#riotbar-bar .riotbar-navmenu-category:after {\n  clear: both;\n}\n\n#riotbar-account {\n  float: left;\n  white-space: nowrap;\n}\n#riotbar-account:after {\n  clear: both;\n}\n#riotbar-account .riotbar-account-anonymous-link-wrapper {\n  display: inline-block;\n  height: 80px;\n}\n#riotbar-account .riotbar-anonymous-link {\n  cursor: pointer;\n  display: inline-block;\n  margin: 20px 15px;\n  transition: color 300ms cubic-bezier(0.06, 0.81, 0, 0.98);\n  vertical-align: middle;\n  font-size: 12px;\n  text-transform: uppercase;\n}\n#riotbar-account .riotbar-anonymous-link.theme-button {\n  font-size: 12px;\n  font-weight: 800;\n  text-align: center;\n  border-radius: 2px;\n  line-height: 16px;\n  height: 41px;\n  padding: 12px 0;\n  position: relative;\n  min-width: 129px;\n  max-width: 220px;\n  z-index: 0;\n  text-overflow: ellipsis;\n}\n#riotbar-account .riotbar-anonymous-link.theme-button:hover:before {\n  opacity: 1;\n}\n.i18n-hu #riotbar-account .riotbar-anonymous-link.theme-button {\n  font-size: 12px;\n  letter-spacing: -0.6px;\n}\n#riotbar-account .riotbar-summoner-name {\n  color: #F9F9F9;\n  font-size: 16px;\n  margin-top: 7px;\n  font-weight: bold;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);\n}\n#riotbar-account .riotbar-summoner-name:lang(ar) {\n  line-height: 1.4em;\n}\n@media (max-width: 640px) {\n  .riotbar-mobile-responsive #riotbar-account .riotbar-anonymous-link {\n    display: none;\n  }\n  .riotbar-mobile-responsive #riotbar-account .riotbar-anonymous-link.riotbar-account-action {\n    display: inline-block;\n  }\n}\n\n#riotbar-account-bar {\n  cursor: pointer;\n  float: right;\n  height: 80px;\n  margin-top: 0;\n  padding-top: 23px;\n  padding-right: 16px;\n  padding-left: 16px;\n}\n#riotbar-account-bar .riotbar-summoner-info {\n  float: left;\n  margin: -3px 0 -10px 0;\n}\n#riotbar-account-bar .riotbar-summoner-info svg {\n  display: inline;\n  margin-left: 11px;\n  margin-bottom: 2px;\n  transition: transform 0.25s ease-out;\n}\n#riotbar-account-bar.active .riotbar-summoner-info svg {\n  transform: rotate(180deg);\n}\n.riotbar-not-responsive #riotbar-account-bar:hover .riotbar-summoner-info svg {\n  transform: rotate(180deg);\n}\n@media (min-width: 1025px) {\n  .riotbar-mobile-responsive #riotbar-account-bar:hover .riotbar-summoner-info svg, .riotbar-mobile-responsive #riotbar-account-bar.YES .riotbar-summoner-info svg {\n    transform: rotate(180deg);\n  }\n}\n@media (max-width: 640px) {\n  .riotbar-mobile-responsive #riotbar-account-bar {\n    border-left: none;\n  }\n  .riotbar-mobile-responsive #riotbar-account-bar .riotbar-summoner-info {\n    display: none;\n  }\n}\n\n#riotbar-account-dropdown-plugins {\n  height: 50px;\n  position: absolute;\n  right: 0;\n  top: 12px;\n}\n\n#riotbar-account-dropdown {\n  background: #111;\n  border-top: 1px solid #262626;\n  box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.5);\n  margin: 0;\n  opacity: 0;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  text-align: left;\n  transform: translateY(-5%);\n  transition: transform 300ms, opacity 300ms;\n  top: 79px;\n  right: 0;\n  visibility: hidden;\n  z-index: 10;\n}\n#riotbar-account-dropdown:lang(ar) {\n  left: 0;\n  right: auto;\n}\n#riotbar-account-dropdown .riotbar-account-info {\n  border-bottom: 1px solid #262626;\n  display: none;\n  margin-bottom: 18px;\n  padding-bottom: 18px;\n}\n#riotbar-account-dropdown .riotbar-account-info .riotbar-summoner-name {\n  max-width: 175px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (max-width: 640px) {\n  .riotbar-mobile-responsive #riotbar-account-dropdown .riotbar-account-info {\n    display: block;\n  }\n}\n#riotbar-account.active #riotbar-account-dropdown {\n  opacity: 1;\n  transform: translateX(0%);\n  visibility: visible;\n  width: 200px;\n}\n@media (min-width: 1025px) {\n  #riotbar-account-dropdown {\n    width: 200px;\n  }\n  #riotbar-account:hover #riotbar-account-dropdown {\n    opacity: 1;\n    transform: translateX(0%);\n    visibility: visible;\n  }\n}\n@media (max-width: 1024px) {\n  .riotbar-mobile-responsive #riotbar-account-dropdown {\n    content: "sidebar";\n    transform: none;\n    transition: width 300ms, opacity 300ms;\n    width: 0;\n  }\n}\n\n#riotbar-account-dropdown-links {\n  font-size: 0;\n  position: relative;\n  white-space: normal;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link {\n  cursor: pointer;\n  display: block;\n  font-size: 12px;\n  line-height: 1.5em;\n  text-transform: uppercase;\n  transition: color 300ms cubic-bezier(0.06, 0.81, 0, 0.98);\n  width: 200px;\n  padding: 15px 0 15px 15px;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link:lang(ar) {\n  padding: 15px 15px 15px 0;\n  text-align: right;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext {\n  color: #a09a8e;\n  display: block;\n  font-size: 12px;\n  text-transform: none;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n}\n#riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(ru), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(vi), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(vn), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(el), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(gr), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(ko), #riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link .riotbar-link-subtext:lang(ar) {\n  text-align: right;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link:first-child {\n  margin-top: 0;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link:last-child {\n  margin-bottom: 0;\n}\n#riotbar-account-dropdown-links a.riotbar-account-link:hover {\n  background-color: #333333;\n}\n\n#riotbar-account-warning {\n  background-color: #352039;\n  color: #F9F9F9;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  font-size: 12px;\n  font-weight: 600;\n  min-height: 20px;\n  padding: 1px 0 0;\n  position: absolute;\n  width: 100%;\n  margin: 0;\n  text-align: center;\n}\n#riotbar-account-warning:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-account-warning:lang(ru), #riotbar-account-warning:lang(vi), #riotbar-account-warning:lang(vn), #riotbar-account-warning:lang(el), #riotbar-account-warning:lang(gr), #riotbar-account-warning:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-account-warning:lang(ko), #riotbar-account-warning:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-account-warning svg {\n  display: inline-block;\n  line-height: 16px;\n  vertical-align: middle;\n  margin: 0 15px 0 0;\n}\n#riotbar-account-warning svg:lang(ar) {\n  margin: 0 0 0 15px;\n}\n#riotbar-account-warning a {\n  display: inline-block;\n  line-height: 16px;\n  color: #F9F9F9;\n  padding-bottom: 3px;\n  padding-left: 10%;\n  padding-right: 10%;\n}\n#riotbar-account-warning a span {\n  margin-left: 10px;\n  color: #F9F9F9;\n}\n\n#riotbar-alerts-container {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 1000;\n}\n#riotbar-alerts-container .riotbar-alert {\n  background-color: #BE29CC;\n  color: #F9F9F9;\n  animation-name: alertSlideUp;\n  animation-duration: 0.25s;\n  animation-fill-mode: forwards;\n}\n#riotbar-alerts-container .riotbar-alert.riotbar-alert-is-closing {\n  animation-name: alertSlideDown;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-inner {\n  padding: 40px;\n  margin: 0 auto;\n  max-width: 1200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-inner {\n    display: block;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content {\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  text-align: left;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ru), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(vi), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(vn), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(el), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(gr), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ko), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ar) {\n  text-align: right;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-ctas-container {\n  display: flex;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-title {\n  padding: 0 0 10px 0;\n  font-size: 1.6rem;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-logo {\n  max-width: 280px;\n  padding: 10px;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-logo img {\n  width: 100%;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-body {\n  font-size: 1.2rem;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container {\n  padding: 10px 0;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container {\n    flex-basis: 50%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button {\n  max-height: 68px;\n  display: inline-block;\n  cursor: pointer;\n  padding: 20px 40px;\n  margin: 10px 20px;\n  background-color: #8E1F99;\n  border-radius: 4px;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  white-space: nowrap;\n  text-decoration: none;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ru), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(vi), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(vn), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(el), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(gr), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ko), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:hover {\n  background-color: #7B1385;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:active {\n  background-color: #670770;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary {\n  background-color: #b41bc6;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary:hover {\n  background-color: #b421be;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary:active {\n  background-color: #b429b6;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button {\n    margin: 10px 0;\n  }\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-cta-filler {\n    flex-basis: 25%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container {\n    flex-basis: 25%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container svg {\n  cursor: pointer;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container svg:hover {\n  opacity: 0.7;\n}\n\n@keyframes alertSlideUp {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n@keyframes alertSlideDown {\n  from {\n    transform: translateY(0%);\n  }\n  to {\n    transform: translateY(100%);\n  }\n}\n/* Legacy CSS -- to be deleted */\n#riotbar-alerts {\n  position: relative;\n  width: 100%;\n  z-index: 10;\n  /* Any immediate elements will fade in - these are the actual alerts */\n}\n#riotbar-alerts:lang(ar) {\n  direction: rtl;\n}\n#riotbar-alerts > div,\n#riotbar-alerts > p,\n#riotbar-alerts > span {\n  animation: fadeIn 0.75s;\n}\n#riotbar-alerts a:link,\n#riotbar-alerts a:visited {\n  color: #71b5bd;\n  text-decoration: none;\n}\n#riotbar-alerts a.active,\n#riotbar-alerts a:hover,\n#riotbar-alerts a:active {\n  color: #ffffff;\n}\n#riotbar-alerts a.btn-gold-trim:link,\n#riotbar-alerts a.btn-gold-trim:visited {\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  color: #dec58d;\n  font-weight: bold;\n  padding: 2px 10px;\n  border-radius: 4px;\n  text-decoration: none;\n  display: inline;\n  display: inline-block;\n  cursor: pointer;\n  background-color: #151515;\n  background: linear-gradient(to bottom, #313131 0%, #000000 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#313131", endColorstr="#000000",GradientType=0 );\n  border: 1px solid #766e4c;\n  text-transform: uppercase;\n  margin: -2px 0 -2px 10px;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ar),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ru), #riotbar-alerts a.btn-gold-trim:link:lang(vi), #riotbar-alerts a.btn-gold-trim:link:lang(vn), #riotbar-alerts a.btn-gold-trim:link:lang(el), #riotbar-alerts a.btn-gold-trim:link:lang(gr), #riotbar-alerts a.btn-gold-trim:link:lang(th),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ru),\n#riotbar-alerts a.btn-gold-trim:visited:lang(vi),\n#riotbar-alerts a.btn-gold-trim:visited:lang(vn),\n#riotbar-alerts a.btn-gold-trim:visited:lang(el),\n#riotbar-alerts a.btn-gold-trim:visited:lang(gr),\n#riotbar-alerts a.btn-gold-trim:visited:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ko), #riotbar-alerts a.btn-gold-trim:link:lang(kr),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ko),\n#riotbar-alerts a.btn-gold-trim:visited:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ar),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ar) {\n  margin: -2px 10px -2px 0;\n}\n#riotbar-alerts a.btn-gold-trim.active,\n#riotbar-alerts a.btn-gold-trim:hover,\n#riotbar-alerts a.btn-gold-trim:active {\n  color: #f7da9b;\n}\n\n#riotbar-alerts-container {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 1000;\n}\n#riotbar-alerts-container .riotbar-alert {\n  background-color: #BE29CC;\n  color: #F9F9F9;\n  animation-name: alertSlideUp;\n  animation-duration: 0.25s;\n  animation-fill-mode: forwards;\n}\n#riotbar-alerts-container .riotbar-alert.riotbar-alert-is-closing {\n  animation-name: alertSlideDown;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-inner {\n  padding: 40px;\n  margin: 0 auto;\n  max-width: 1200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-inner {\n    display: block;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content {\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  text-align: left;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ru), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(vi), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(vn), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(el), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(gr), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ko), #riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-content:lang(ar) {\n  text-align: right;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-ctas-container {\n  display: flex;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-title {\n  padding: 0 0 10px 0;\n  font-size: 1.6rem;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-logo {\n  max-width: 280px;\n  padding: 10px;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-logo img {\n  width: 100%;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-body {\n  font-size: 1.2rem;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container {\n  padding: 10px 0;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container {\n    flex-basis: 50%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button {\n  max-height: 68px;\n  display: inline-block;\n  cursor: pointer;\n  padding: 20px 40px;\n  margin: 10px 20px;\n  background-color: #8E1F99;\n  border-radius: 4px;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  white-space: nowrap;\n  text-decoration: none;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ru), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(vi), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(vn), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(el), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(gr), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(ko), #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:hover {\n  background-color: #7B1385;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button:active {\n  background-color: #670770;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary {\n  background-color: #b41bc6;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary:hover {\n  background-color: #b421be;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button.riotbar-alert-button-secondary:active {\n  background-color: #b429b6;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-buttons-container .riotbar-alert-button {\n    margin: 10px 0;\n  }\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-cta-filler {\n    flex-basis: 25%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container {\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 1024px) {\n  #riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container {\n    flex-basis: 25%;\n  }\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container svg {\n  cursor: pointer;\n}\n#riotbar-alerts-container .riotbar-alert .riotbar-alert-close-container svg:hover {\n  opacity: 0.7;\n}\n\n@keyframes alertSlideUp {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n@keyframes alertSlideDown {\n  from {\n    transform: translateY(0%);\n  }\n  to {\n    transform: translateY(100%);\n  }\n}\n/* Legacy CSS -- to be deleted */\n#riotbar-alerts {\n  position: relative;\n  width: 100%;\n  z-index: 10;\n  /* Any immediate elements will fade in - these are the actual alerts */\n}\n#riotbar-alerts:lang(ar) {\n  direction: rtl;\n}\n#riotbar-alerts > div,\n#riotbar-alerts > p,\n#riotbar-alerts > span {\n  animation: fadeIn 0.75s;\n}\n#riotbar-alerts a:link,\n#riotbar-alerts a:visited {\n  color: #71b5bd;\n  text-decoration: none;\n}\n#riotbar-alerts a.active,\n#riotbar-alerts a:hover,\n#riotbar-alerts a:active {\n  color: #ffffff;\n}\n#riotbar-alerts a.btn-gold-trim:link,\n#riotbar-alerts a.btn-gold-trim:visited {\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  color: #dec58d;\n  font-weight: bold;\n  padding: 2px 10px;\n  border-radius: 4px;\n  text-decoration: none;\n  display: inline;\n  display: inline-block;\n  cursor: pointer;\n  background-color: #151515;\n  background: linear-gradient(to bottom, #313131 0%, #000000 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#313131", endColorstr="#000000",GradientType=0 );\n  border: 1px solid #766e4c;\n  text-transform: uppercase;\n  margin: -2px 0 -2px 10px;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ar),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ru), #riotbar-alerts a.btn-gold-trim:link:lang(vi), #riotbar-alerts a.btn-gold-trim:link:lang(vn), #riotbar-alerts a.btn-gold-trim:link:lang(el), #riotbar-alerts a.btn-gold-trim:link:lang(gr), #riotbar-alerts a.btn-gold-trim:link:lang(th),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ru),\n#riotbar-alerts a.btn-gold-trim:visited:lang(vi),\n#riotbar-alerts a.btn-gold-trim:visited:lang(vn),\n#riotbar-alerts a.btn-gold-trim:visited:lang(el),\n#riotbar-alerts a.btn-gold-trim:visited:lang(gr),\n#riotbar-alerts a.btn-gold-trim:visited:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ko), #riotbar-alerts a.btn-gold-trim:link:lang(kr),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ko),\n#riotbar-alerts a.btn-gold-trim:visited:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-alerts a.btn-gold-trim:link:lang(ar),\n#riotbar-alerts a.btn-gold-trim:visited:lang(ar) {\n  margin: -2px 10px -2px 0;\n}\n#riotbar-alerts a.btn-gold-trim.active,\n#riotbar-alerts a.btn-gold-trim:hover,\n#riotbar-alerts a.btn-gold-trim:active {\n  color: #f7da9b;\n}\n\n#riotbar-application-switcher {\n  position: relative;\n  top: 0;\n  width: 100%;\n  z-index: 3000001;\n  pointer-events: none;\n  background-color: #F9F9F9;\n  animation: fadeIn 0.25s forwards, appSwitcherSlideDown 0.2s forwards;\n  height: 26vw;\n  min-height: 320px;\n  /** Custom event Tab CSS */\n}\n#riotbar-application-switcher:lang(ar) {\n  direction: rtl;\n}\n#riotbar-application-switcher .riotbar-subcontent {\n  pointer-events: auto;\n  color: #111111;\n  width: 100%;\n  padding: 0;\n}\n#riotbar-application-switcher #riotbar-application-switcher-content {\n  min-height: 320px;\n  max-height: 620px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper {\n  opacity: 0;\n  animation: fadeIn 0.25s forwards;\n  animation-delay: 0.2s;\n  margin: 0;\n  padding: 24px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper .mobile-caret {\n  display: none;\n}\n#riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span {\n  margin: 0 16px;\n  font-size: 24px;\n  font-weight: 950;\n  font-family: "FF Mark W05", sans-serif;\n  cursor: pointer;\n  color: #C7C7C7;\n  transition: color 0.1s linear;\n  display: inline-block;\n}\n@media screen and (max-width: 768px) {\n  #riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span {\n    display: block;\n    width: 100%;\n  }\n}\n#riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span:hover {\n  color: #7E7E7E;\n}\n#riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span.riotbar-application-selected-tab {\n  color: #333333;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper {\n  overflow-y: hidden;\n  overflow-x: auto;\n  padding: 0 32px 32px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-application-switcher-cards-wrapper-selected-event {\n  display: flex;\n  align-items: center;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card {\n  float: left;\n  padding: 0 0.4%;\n  -webkit-animation: fadeIn 0.25s forwards;\n  animation: fadeIn 0.25s forwards;\n  opacity: 0;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(1) {\n  animation-delay: 0.15s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(2) {\n  animation-delay: 0.2s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(3) {\n  animation-delay: 0.25s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(4) {\n  animation-delay: 0.3s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(5) {\n  animation-delay: 0.35s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card:nth-child(6) {\n  animation-delay: 0.4s;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card img {\n  width: 100%;\n  height: auto;\n  border-radius: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  display: block;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card img:hover {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card > a {\n  display: block;\n  position: relative;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card h4 {\n  color: #7E7E7E;\n  font-size: 11px;\n  margin-top: 16px;\n  font-weight: 800;\n  letter-spacing: 0.03em;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card h4:lang(ar) {\n  letter-spacing: 0;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper {\n  color: #5f5c5c;\n  margin-top: 8px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper .riotbar-platform-availability-icon-wrapper {\n  float: left;\n  padding-right: 8px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper .riotbar-platform-availability-icon-wrapper:lang(ar) {\n  float: right;\n  padding-right: 0;\n  padding-left: 8px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper .riotbar-platform-availability-icon-wrapper .riotbar-application-platform-icon {\n  height: 11px;\n  width: 11px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper:after {\n  content: " ";\n  clear: both;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper:after {\n  content: " ";\n  clear: both;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-promo {\n  width: 25%;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-game {\n  width: 12.5%;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-custom_event {\n  flex: 2;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore {\n  width: 16.6%;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore .riotbar-application-switcher-card-image-wrapper {\n  position: relative;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore .riotbar-application-card-title-wrapper {\n  position: absolute;\n  bottom: 8%;\n  left: 8%;\n  right: 8%;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore h4 {\n  font-family: "FF Mark W05", sans-serif;\n  font-weight: 900;\n  color: #f9f9f9;\n  font-size: 20px;\n  line-height: 1.014rem;\n  text-shadow: 1px 1px 1px rgba(51, 51, 51, 0.4);\n  letter-spacing: -0.01rem;\n  transition: transform 0.15s linear;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore h4:lang(ar) {\n  letter-spacing: 0;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder {\n  /* Shimmer styles here */\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-application-switcher-card-image-wrapper {\n  width: 100%;\n  height: 250px;\n  position: relative;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-application-switcher-card-image-wrapper svg {\n  position: absolute;\n  left: calc(50% - 16px);\n  top: calc(50% - 22px);\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-application-card-title-wrapper {\n  width: 60%;\n  height: 30px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-platform-availability-wrapper {\n  width: 30%;\n  height: 22px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-application-switcher-card-image-wrapper,\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-application-card-title-wrapper,\n#riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-placeholder .riotbar-platform-availability-wrapper {\n  animation-name: placeholderShimmer;\n  animation-duration: 3s;\n  animation-fill-mode: forwards;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n  background: #7E7E7E;\n  opacity: 0.1;\n  background-image: linear-gradient(to right, #7E7E7E 0%, #C7C7C7 5%, #7E7E7E 10%, #7E7E7E 100%);\n  background-size: 800px 104px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-arrow {\n  position: absolute;\n  top: -16px;\n  left: 45px;\n}\n#riotbar-application-switcher .riotbar-application-switcher-arrow:lang(ar) {\n  right: 45px;\n  left: 0;\n}\n#riotbar-application-switcher .riotbar-application-switcher-mobile-header {\n  display: none;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-close {\n  position: absolute;\n  top: 30px;\n  right: 40px;\n  cursor: pointer;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-close:lang(ar) {\n  right: auto;\n  left: 40px;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-close svg {\n  vertical-align: middle;\n  display: inline-block;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-visit-riot-games {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 11px;\n  margin-right: 10px;\n  height: 24px;\n  vertical-align: middle;\n  line-height: 11px;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-visit-riot-games a {\n  color: #111111;\n}\n#riotbar-application-switcher #riotbar-application-switcher-desktop-visit-riot-games:hover {\n  background-color: rgba(53, 53, 53, 0.07);\n}\n#riotbar-application-switcher .custom-event-callout {\n  flex: 3;\n  padding: 2%;\n}\n#riotbar-application-switcher .custom-event-callout .custom-event-callout-image-wrapper img {\n  width: 100%;\n  height: 100%;\n}\n#riotbar-application-switcher .custom-event-callout .custom-event-callout-buttons {\n  margin: 20px auto;\n  text-align: center;\n}\n#riotbar-application-switcher .custom-event-callout .custom-event-callout-buttons a.custom-event-callout-btn {\n  padding: 12px 0;\n  line-height: 16px;\n  height: 41px;\n  border-radius: 2px;\n  min-width: 129px;\n  max-width: 220px;\n  text-overflow: ellipsis;\n  text-align: center;\n  position: relative;\n  display: inline-block;\n  margin: 0 12px;\n}\n#riotbar-application-switcher .custom-event-callout-tagline {\n  font-size: 12px;\n  text-align: center;\n  margin: 8px auto;\n}\n\n/* Pip */\n#riotbar-pip-container {\n  margin: auto;\n  position: absolute;\n  padding: 5px;\n  top: 0;\n  right: 15px;\n}\n\n#riotbar-pip {\n  height: 8px;\n  width: 8px;\n  border-radius: 50%;\n  background-color: #d13639;\n}\n\n#riotbar-pip-pulse {\n  border-radius: 50%;\n  background-color: #e82c29;\n  animation: pulse 5s infinite;\n}\n\n/** Page Overlay */\n#riotbar-page-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: #111111;\n  opacity: 0;\n  transition: opacity 0.15s;\n}\n\nbody.riotbar-application-switcher-open #riotbar-page-overlay {\n  z-index: 500;\n  opacity: 0.7;\n}\n\n@media (max-width: 1024px) {\n  body.riotbar-application-switcher-open {\n    overflow-y: hidden;\n  }\n\n  #riotbar-application-switcher {\n    width: 75vw;\n    height: 100vh;\n    left: -76vw;\n    top: -80px;\n    pointer-events: all;\n    animation: slideInFromLeft 0.3s forwards;\n    overflow-y: auto;\n  }\n  #riotbar-application-switcher .custom-event-callout {\n    width: 100%;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span {\n    font-size: 18px;\n  }\n  #riotbar-application-switcher #riotbar-application-switcher-desktop-close {\n    display: none;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-arrow {\n    display: none;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper {\n    display: block;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-application-switcher-cards-wrapper-selected-event {\n    display: block;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-switcher-cards-wrapper-selected-riot-games .riotbar-application-switcher-card {\n    margin: 12px auto;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-switcher-cards-wrapper-selected-explore .riotbar-application-switcher-card {\n    margin: 8px auto;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card {\n    padding: 4px 0 12px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper {\n    margin-top: 0;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card h4 {\n    font-size: 12px;\n    margin: 6px 0px 0px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-game {\n    width: 50%;\n    padding: 4px 0.4% 16px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-promo {\n    width: 100%;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore {\n    width: 50%;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore h4 {\n    font-size: 24px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-custom_event {\n    width: 100%;\n    margin: 12px auto;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-custom_event h4 {\n    font-size: 12px;\n    margin: 6px 0px 0px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-mobile-header {\n    display: block;\n    width: 100%;\n    position: relative;\n    padding: 24px;\n    border-bottom: 1px solid #e8e8e8;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-mobile-header:after {\n    content: " ";\n    clear: both;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-mobile-logo-wrapper {\n    display: inline-block;\n    height: 32px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-close {\n    float: right;\n    top: 32px;\n    right: 32px;\n    cursor: pointer;\n    z-index: 300;\n  }\n}\n@media (max-width: 768px) {\n  #riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper {\n    margin: 4px 0 12px;\n    padding: 16px 0;\n    border-bottom: 1px solid #e8e8e8;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper > span {\n    padding: 6px 0;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-tabs-wrapper .mobile-caret {\n    width: 8px;\n    height: 8px;\n    float: right;\n    margin-right: 20px;\n    margin-top: 8px;\n    display: block;\n    transform: rotate(90deg);\n    font-weight: 500;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper {\n    overflow-y: hidden;\n    overflow-x: auto;\n    padding: 0 12px 32px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card {\n    padding: 4px 0 16px 0;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card.riotbar-application-switcher-card-game:nth-child(3) {\n    padding-right: 4px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card.riotbar-application-switcher-card-game:nth-child(5) {\n    padding-right: 4px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card.riotbar-application-switcher-card-game:nth-child(4) {\n    padding-left: 4px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card.riotbar-application-switcher-card-game:nth-child(6) {\n    padding-left: 4px;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card .riotbar-platform-availability-wrapper {\n    margin-top: 0;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-switcher-cards-wrapper-selected-explore div.riotbar-application-switcher-card {\n    margin: 6px auto;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper.riotbar-switcher-cards-wrapper-selected-riot-games div.riotbar-application-switcher-card {\n    margin: 12px auto;\n    padding: 0 1.2%;\n  }\n  #riotbar-application-switcher .riotbar-application-switcher-cards-wrapper .riotbar-application-switcher-card-explore h4 {\n    font-size: 14px;\n  }\n}\n/* cards dropdown slide down effect */\n@keyframes appSwitcherSlideDown {\n  0% {\n    top: -80px;\n  }\n  100% {\n    top: 0;\n  }\n}\n@-moz-keyframes appSwitcherSlideDown {\n  0% {\n    top: -80px;\n  }\n  100% {\n    top: 0;\n  }\n}\n@-webkit-keyframes appSwitcherSlideDown {\n  0% {\n    top: -80px;\n  }\n  100% {\n    top: 0;\n  }\n}\n/* Card placeholder shimmer effect */\n@keyframes placeholderShimmer {\n  0% {\n    background-position: -600px 0;\n  }\n  100% {\n    background-position: 600px 0;\n  }\n}\n@-moz-keyframes placeholderShimmer {\n  0% {\n    background-position: -600px 0;\n  }\n  100% {\n    background-position: 600px 0;\n  }\n}\n@-webkit-keyframes placeholderShimmer {\n  0% {\n    background-position: -600px 0;\n  }\n  100% {\n    background-position: 600px 0;\n  }\n}\n@keyframes pulse {\n  0% {\n    opacity: 0.6;\n    height: 8px;\n    width: 8px;\n    transition: opacity 0.5s linear;\n  }\n  50% {\n    opacity: 0;\n    transform: scale(2.5);\n    transition: opacity 0.5s linear;\n  }\n  100% {\n    opacity: 0;\n    transition: opacity 0.5s ease;\n  }\n}\n.localization-management-list {\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  display: none;\n  width: 240px;\n  background-color: #F9F9F9;\n  border-radius: 4px;\n}\n.localization-management-list:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n.localization-management-list:lang(ru), .localization-management-list:lang(vi), .localization-management-list:lang(vn), .localization-management-list:lang(el), .localization-management-list:lang(gr), .localization-management-list:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n.localization-management-list:lang(ko), .localization-management-list:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n.localization-management-list.active {\n  display: block;\n}\n.localization-management-list ul {\n  margin: 0;\n  padding: 0;\n  text-align: left;\n  font-size: 12px;\n  max-height: 360px;\n  overflow-x: auto;\n}\n.localization-management-list ul:lang(ar) {\n  direction: rtl;\n  text-align: right;\n}\n.localization-management-list ul li {\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  padding: 0;\n  cursor: pointer;\n}\n.localization-management-list ul li .lang-name {\n  text-transform: uppercase;\n  display: inline-block;\n  width: 20px;\n}\n.localization-management-list ul li a, .localization-management-list ul li a:visited, .localization-management-list ul li a:link {\n  transition: color 0.3s linear;\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n  color: #999999;\n  width: 100%;\n  padding: 0 0 0 20px;\n}\n.localization-management-list ul li a:lang(ar), .localization-management-list ul li a:visited:lang(ar), .localization-management-list ul li a:link:lang(ar) {\n  padding: 0 20px 0 0;\n}\n.localization-management-list ul li a svg, .localization-management-list ul li a:visited svg, .localization-management-list ul li a:link svg {\n  position: absolute;\n  top: 35%;\n  right: 20px;\n  width: 14px;\n  height: 12px;\n  fill: #F9F9F9;\n}\n.localization-management-list ul li a svg:lang(ar), .localization-management-list ul li a:visited svg:lang(ar), .localization-management-list ul li a:link svg:lang(ar) {\n  right: auto;\n  left: 20px;\n}\n.localization-management-list ul li:hover a {\n  color: #111111;\n}\n.localization-management-list ul li.active {\n  cursor: default;\n}\n.localization-management-list ul li.active a {\n  color: #c4202b;\n}\n\n.riotbar-locale .icon-lang-switch {\n  position: relative;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n}\n.riotbar-locale .icon-lang-switch:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n.riotbar-locale .icon-lang-switch:lang(ru), .riotbar-locale .icon-lang-switch:lang(vi), .riotbar-locale .icon-lang-switch:lang(vn), .riotbar-locale .icon-lang-switch:lang(el), .riotbar-locale .icon-lang-switch:lang(gr), .riotbar-locale .icon-lang-switch:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n.riotbar-locale .icon-lang-switch:lang(ko), .riotbar-locale .icon-lang-switch:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n.riotbar-locale .icon-lang-switch .lang-switch-dropdown {\n  position: absolute;\n  top: 90px;\n  left: -115px;\n  padding: 8px 0 8px 8px;\n}\n@media (max-width: 1024px) {\n  .riotbar-locale .icon-lang-switch .lang-switch-dropdown {\n    left: -155px;\n  }\n}\n.riotbar-locale .icon-lang-switch .lang-switch-dropdown .lang-switch-caret {\n  height: 0;\n  position: absolute;\n  width: 0;\n  left: 113px;\n  top: -20px;\n  border: 10px solid transparent;\n  border-bottom-color: #F9F9F9;\n}\n@media (max-width: 1024px) {\n  .riotbar-locale .icon-lang-switch .lang-switch-dropdown .lang-switch-caret {\n    left: 153px;\n  }\n}\n.sideMenuIcons .riotbar-locale .icon-lang-switch .lang-switch-dropdown {\n  top: 50px;\n  right: 0;\n  left: unset;\n}\n.sideMenuIcons .riotbar-locale .icon-lang-switch .lang-switch-dropdown:before {\n  left: unset;\n  right: 20px;\n  top: -20px;\n}\n.riotbar-locale:lang(ar) {\n  direction: rtl;\n}\n\n#riotbar-bar .riotbar-service-status-wrapper {\n  margin-top: 28px;\n  position: relative;\n}\n#riotbar-bar .riotbar-service-status-icon-wrapper {\n  cursor: pointer;\n}\n#riotbar-bar .riotbar-service-status-icon-wrapper svg {\n  display: block;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper {\n  position: absolute;\n  top: 40px;\n  left: -180px;\n  padding: 8px 0 8px 8px;\n  width: 280px;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-caret {\n  height: 0;\n  position: absolute;\n  width: 0;\n  left: 140px;\n  top: -11px;\n  border: 10px solid transparent;\n  border-bottom-color: #F9F9F9;\n}\n@media (max-width: 1024px) {\n  #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-caret {\n    left: 153px;\n  }\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner {\n  background-color: #F9F9F9;\n  border-radius: 8px;\n  padding: 20px;\n  border: solid 1px #111111;\n  font-weight: 500;\n  font-size: 12px;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n  color: #3D3D3D;\n  white-space: pre-wrap;\n  /* CSS3 */\n  white-space: -moz-pre-wrap;\n  /* Firefox */\n  white-space: -pre-wrap;\n  /* Opera <7 */\n  white-space: -o-pre-wrap;\n  /* Opera 7 */\n  word-wrap: break-word;\n  /* IE */\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(ru), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(vi), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(vn), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(el), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(gr), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(ko), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container {\n  text-align: center;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a {\n  color: #111111;\n  /* These custom font references are actually loaded in when the `customFonts` plugin is enabled */\n  /* Main font by default */\n  font-family: "FF Mark W05";\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(ar) {\n  font-family: "Cairo", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(ru), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(vi), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(vn), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(el), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(gr), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(th) {\n  font-family: "Neue Frutiger World", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(ko), #riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:lang(kr) {\n  font-family: "RixSGo", Tahoma, sans-serif;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:visited {\n  color: #111111;\n}\n#riotbar-bar .riotbar-service-status-popup-wrapper .riotbar-service-status-popup-inner .riotbar-service-status-view-all-container a:hover {\n  text-decoration: underline;\n}\n#riotbar-bar .riotbar-service-status-message {\n  margin: 5px 0;\n  padding: 10px 0 15px 0;\n  border-bottom: solid 1px rgba(168, 171, 171, 0.7);\n}\n#riotbar-bar .riotbar-service-status-message:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n#riotbar-bar .riotbar-service-status-message:first-child {\n  padding-top: 0;\n  margin-top: 0;\n}\n#riotbar-bar .riotbar-service-status-type {\n  padding: 3px 18px;\n  border-radius: 16px;\n  border: solid 2px #111111;\n  background-color: #F9F9F9;\n  text-transform: uppercase;\n}\n#riotbar-bar .riotbar-service-status-type:lang(ar), #riotbar-bar .riotbar-service-status-type:lang(el), #riotbar-bar .riotbar-service-status-type:lang(ro), #riotbar-bar .riotbar-service-status-type:lang(ru), #riotbar-bar .riotbar-service-status-type:lang(tr) {\n  text-transform: none;\n}\n#riotbar-bar .riotbar-service-status-type.riotbar-service-status-type-warning {\n  background-color: #E69700;\n  border-color: #E69700;\n  color: #F9F9F9;\n}\n#riotbar-bar .riotbar-service-status-type.riotbar-service-status-type-critical {\n  background-color: #BE29CC;\n  border-color: #BE29CC;\n  color: #F9F9F9;\n}\n#riotbar-bar .riotbar-service-status-product {\n  margin: 12px 0 10px 0;\n  font-size: 10px;\n}\n#riotbar-bar .riotbar-service-status-incident-title {\n  font-size: 16px;\n  line-height: 16px;\n  font-weight: 700;\n  margin: 10px 0;\n}\n#riotbar-bar .riotbar-service-status-incident-description {\n  font-size: 12px;\n  margin: 10px 0;\n  text-align: start;\n  line-height: 120%;\n}\n#riotbar-bar .riotbar-service-status-incident-more-details {\n  margin: 5px 0;\n  color: #333333;\n  font-weight: 700;\n  cursor: pointer;\n}\n#riotbar-bar .riotbar-service-status-incident-more-details:hover {\n  text-decoration: underline;\n}',
    zn = {
      authInfo: null,
      isLoggedIn: null,
      homepageUrl: null,
      init: function () {
        var t = window.RiotBar;
        (this.authInfo = t.plugins.account.extensions.getGlobalAccount()),
          (this.isLoggedIn = this.authInfo.summoner);
      },
      getHomepageUrl: function () {
        return window.RiotBar.config &&
          window.RiotBar.config.navigation &&
          window.RiotBar.config.navigation.homepageUrl
          ? window.RiotBar.config.navigation.homepageUrl
          : null;
      },
    },
    Un = {},
    Hn = function (t) {
      return t;
    },
    Wn = {},
    Vn = (function () {
      function t() {
        T(this, t);
      }
      return (
        B(t, [
          {
            key: "getName",
            value: function () {
              return "";
            },
          },
          {
            key: "getClassNamePrefix",
            value: function () {
              return "";
            },
          },
          {
            key: "getAccentColor",
            value: function () {
              return "#fff";
            },
          },
          {
            key: "getDesktopLogo",
            value: function () {
              return null;
            },
          },
          {
            key: "getMobileLogo",
            value: function () {
              return null;
            },
          },
          {
            key: "getStyles",
            value: function () {
              return "";
            },
          },
        ]),
        t
      );
    })(),
    Gn =
      "/* Breakpoints */\n/* Common Mixins */\n.theme-button {\n  background-color: #0bc4e2 !important;\n}\n.theme-button:hover {\n  background-color: #00b2cf !important;\n}\n.theme-button:active {\n  background-color: #00a0ba !important;\n}\n\n#riotbar-bar.lol-theme .riotbar-active-link, #riotbar-bar.lol-theme .riotbar-navbar-link:hover {\n  border-color: #0bc4e2;\n}\n#riotbar-bar.lol-theme #riotbar-navbar {\n  left: 200px;\n}\n#riotbar-bar.lol-theme .nav-dropdown-active a {\n  border-color: #0bc4e2;\n}\n#riotbar-bar.lol-theme .riotbar-navbar-subnav-menu .riotbar-active-sub-item {\n  border-bottom-color: #0bc4e2;\n}\n#riotbar-bar.lol-theme .sub-menu-header-icon svg {\n  margin-top: 20px;\n  margin-left: 15px;\n  display: block;\n}\n\n@media screen and (max-width: 1024px) {\n  #riotbar-bar.lol-theme .riotbar-explore-label svg {\n    display: block;\n    margin-top: 22px;\n  }\n}",
    Zn = (function (t) {
      function n() {
        return T(this, n), H(this, j(n).apply(this, arguments));
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "getName",
            value: function () {
              return "lol";
            },
          },
          {
            key: "getClassNamePrefix",
            value: function () {
              return "lol";
            },
          },
          {
            key: "getDesktopLogo",
            value: function () {
              return nt(
                "svg",
                {
                  className: "league",
                  width: "30",
                  height: "32",
                  viewBox: "0 0 30 32",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                nt(
                  "g",
                  { "clip-path": "url(#clip0)" },
                  nt("path", {
                    d: "M1.80644 9.75049C0.655032 11.8373 0 14.2271 0 16.7683C0 19.3095 0.655032 21.7015 1.80644 23.7883V9.75049Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M15 2.02222C13.7829 2.02222 12.602 2.16921 11.4688 2.43647V4.75718C12.5907 4.44093 13.7738 4.26721 15 4.26721C22.0218 4.26721 27.7153 9.84627 27.7153 16.7305C27.7153 19.8307 26.5571 22.6659 24.6464 24.8463L24.2838 26.118L23.4814 28.9331C27.4184 26.2761 30.0023 21.8195 30.0023 16.7705C30 8.62355 23.2843 2.02222 15 2.02222Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M11.4688 24.4209H22.9737H23.2253C25.1723 22.4209 26.3713 19.7126 26.3713 16.7305C26.3713 10.5746 21.2806 5.58569 15 5.58569C13.767 5.58569 12.5816 5.78168 11.4688 6.1358V24.4209Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M10.1088 0H1.55029L3.16634 3.29844V28.7038L1.55029 32H21.1922L22.9737 25.7572H10.1088V0Z",
                    fill: "#C28F2C",
                  })
                ),
                nt(
                  "defs",
                  null,
                  nt(
                    "clipPath",
                    { id: "clip0" },
                    nt("rect", { width: "30", height: "32", fill: "white" })
                  )
                )
              );
            },
          },
          {
            key: "getMobileLogo",
            value: function () {
              return nt(
                "svg",
                {
                  className: "league",
                  width: "85",
                  height: "32",
                  viewBox: "0 0 85 32",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                nt(
                  "g",
                  { clipPath: "url(#clip0)" },
                  nt("path", {
                    d: "M59.7261 17.2695V31.749H56.5229L49.6035 22.34V31.749H46.5347V18.6228L45.8335 17.2695H49.801L56.6573 26.8087V17.2695H59.7261Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M27.8345 31.9991C28.8909 32.0048 29.8667 31.8267 30.7619 31.467C31.6582 31.1072 32.4307 30.6082 33.0828 29.9721C33.7337 29.336 34.2444 28.5811 34.6148 27.7098C34.8813 27.0828 35.0531 26.4205 35.1314 25.7238C35.1618 25.4532 35.2143 24.3614 35.1582 23.7025H27.8649L26.5665 26.3131H31.7704C31.5694 27.1376 31.1148 27.8171 30.409 28.3287C29.7019 28.8415 28.8559 29.095 27.8707 29.0904C27.2373 29.087 26.646 28.9637 26.0979 28.7204C25.5498 28.4772 25.073 28.1483 24.6675 27.7338C24.2608 27.3192 23.9441 26.8327 23.7139 26.2743C23.4848 25.7158 23.3715 25.1197 23.375 24.487C23.3785 23.8544 23.4977 23.2594 23.7326 22.7032C23.9675 22.1471 24.29 21.664 24.7014 21.2529C25.1116 20.8418 25.5884 20.522 26.1318 20.2902C26.6752 20.0595 27.263 19.9453 27.8976 19.9476C28.7565 19.9522 29.515 20.1417 30.1752 20.5163C30.8355 20.8909 31.3462 21.4299 31.7085 22.1334L34.588 20.7858C33.9885 19.6141 33.1026 18.6948 31.9305 18.0279C30.7584 17.3621 29.4261 17.0252 27.9338 17.0172C26.8774 17.0115 25.877 17.2034 24.9328 17.5905C23.9874 17.9776 23.1646 18.5098 22.4646 19.1882C21.7646 19.8654 21.2072 20.6579 20.7947 21.5635C20.381 22.4691 20.173 23.4387 20.1671 24.4699C20.1613 25.5011 20.3576 26.473 20.7538 27.3832C21.1511 28.2933 21.6922 29.0904 22.3782 29.7745C23.0641 30.4586 23.8752 30.9999 24.8089 31.3962C25.7415 31.7924 26.7512 31.9934 27.8345 31.9991Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M3.90672 17.2686H0L0.737403 18.7657V30.2542L0 31.7503H8.9657L9.77906 28.917H3.90672V17.2686Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M10.8613 31.7503H19.6003V28.9181H14.0423V25.7411H18.3394L19.1177 23.0185H14.0423V20.0893H19.6003V17.2686H10.8613V31.7503Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M36.2681 31.7503H45.007V28.9181H39.4491V25.7411H43.7473L44.5244 23.0185H39.4491V20.0893H45.007V17.2686H36.2681V31.7503Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M41.8662 14.9822C42.9227 14.9879 43.8985 14.8098 44.7936 14.45C45.69 14.0903 46.4624 13.5912 47.1145 12.9551C47.7654 12.3191 48.2761 11.5642 48.6466 10.6928C48.913 10.0659 49.0848 9.40352 49.1631 8.7069C49.1935 8.43625 49.2461 7.3445 49.19 6.68556H41.8966L40.5983 9.29503H45.8022C45.6011 10.1196 45.1466 10.799 44.4407 11.3107C43.7337 11.8234 42.8876 12.0769 41.9024 12.0724C41.269 12.069 40.6777 11.9456 40.1296 11.7024C39.5816 11.4591 39.1048 11.1302 38.6992 10.7157C38.2926 10.3011 37.9759 9.81464 37.7456 9.25621C37.5166 8.69777 37.4032 8.10164 37.4067 7.46897C37.4102 6.83631 37.5294 6.24132 37.7643 5.68517C37.9992 5.12901 38.3218 4.64595 38.7331 4.23483C39.1433 3.82371 39.6201 3.50395 40.1635 3.27212C40.7069 3.04144 41.2948 2.92724 41.9293 2.92952C42.7883 2.93409 43.5467 3.12366 44.207 3.49824C44.8673 3.87281 45.3779 4.41184 45.7402 5.11531L48.6197 3.76775C48.0202 2.59606 47.1344 1.67675 45.9623 1.00982C44.7901 0.344031 43.4579 0.00714122 41.9656 -0.000852784C40.9091 -0.00656279 39.9088 0.185293 38.9645 0.572432C38.0191 0.95957 37.1964 1.49174 36.4964 2.17009C35.7964 2.8473 35.2389 3.63985 34.8264 4.54545C34.4127 5.45106 34.2047 6.42062 34.1989 7.45184C34.193 8.48307 34.3893 9.45491 34.7855 10.3651C35.1828 11.2753 35.7239 12.0724 36.4099 12.7564C37.0959 13.4405 37.9069 13.9818 38.8406 14.3781C39.7732 14.7766 40.7817 14.9776 41.8662 14.9822Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M3.90672 0.252441H0L0.737403 1.7496V13.2381L0 14.7342H8.9657L9.77906 11.8997H3.90672V0.252441Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M10.8613 14.7342H19.6003V11.9008H14.0423V8.72494H18.3394L19.1177 6.00241H14.0423V3.07318H19.6003V0.252441H10.8613V14.7342Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M63.5688 14.7342H72.3067V11.9008H66.7498V8.72494H71.0469L71.824 6.00241H66.7498V3.07318H72.3067V0.252441H63.5688V14.7342Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M29.397 0.252441H24.8779L25.8338 2.09906L20.6147 14.7353H23.8659L24.9737 11.91H30.8519L31.9913 14.7353H35.3055L29.397 0.252441ZM26.0594 9.14063L27.9677 4.27457L29.8013 9.14063H26.0594Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M80.6094 4.23486V10.7477H82.2466V8.54591H83.9365L84.3455 7.11385H82.2466V5.71033H84.647V4.23486H80.6094Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M76.5625 4.10547C74.6553 4.10547 73.1045 5.62433 73.1045 7.4915C73.1045 9.35867 74.6553 10.8775 76.5625 10.8775C78.4697 10.8775 80.0204 9.35867 80.0204 7.4915C80.0204 5.62433 78.4685 4.10547 76.5625 4.10547ZM76.5625 9.30614C75.5423 9.30614 74.7125 8.49189 74.7125 7.4915C74.7125 6.49111 75.5423 5.67686 76.5625 5.67686C77.5827 5.67686 78.4124 6.49111 78.4124 7.4915C78.4124 8.49189 77.5827 9.30614 76.5625 9.30614Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M56.2401 14.9854C55.3099 14.9854 54.4778 14.8438 53.7451 14.5617C53.0124 14.2796 52.3918 13.8765 51.8847 13.3523C51.3775 12.8293 50.986 12.1955 50.7114 11.4509C50.4367 10.7075 50.2988 9.88065 50.2988 8.97161V0.252441H53.5125V8.80717C53.5125 9.78586 53.7451 10.5567 54.2102 11.122C54.6753 11.6873 55.352 11.9694 56.2401 11.9694C57.1283 11.9694 57.8049 11.6873 58.27 11.122C58.7351 10.5567 58.9677 9.78586 58.9677 8.80717V0.252441H62.1814V8.97276C62.1814 9.88179 62.0435 10.7086 61.7689 11.452C61.4943 12.1955 61.1028 12.8293 60.5956 13.3535C60.0884 13.8776 59.4679 14.2796 58.7351 14.5628C58.0012 14.8438 57.1703 14.9854 56.2401 14.9854Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M80.8372 23.1624L78.8365 22.7866C77.9367 22.6176 77.4412 22.1243 77.4412 21.3968C77.4412 20.4056 78.4813 19.8129 79.4863 19.8129C79.8287 19.8129 81.5325 19.8997 81.8831 21.5601L84.6399 20.2446C84.2332 19.0637 83.0155 17.0161 79.4664 17.0161C76.6045 17.0161 74.2754 19.0706 74.2754 21.5955C74.2754 23.7368 75.7408 25.307 78.1938 25.7958L80.1956 26.191C81.1843 26.3839 81.7745 26.9333 81.7745 27.6596C81.7745 28.5994 80.9599 29.1704 79.6487 29.1841C78.0582 29.2001 76.7727 28.0444 76.5741 26.907L73.9248 28.3516C74.5325 30.285 76.4046 32.0026 79.6289 32.0026C81.6576 32.0026 82.9104 31.2363 83.6034 30.5934C84.4927 29.77 85.0022 28.636 85.0022 27.4826C84.9999 25.3036 83.4047 23.6489 80.8372 23.1624Z",
                    fill: "#C28F2C",
                  }),
                  nt("path", {
                    d: "M73.0452 21.6891C72.6514 20.8086 72.1138 20.0457 71.4325 19.3982C70.7501 18.7519 69.9519 18.2425 69.038 17.8702C68.123 17.4979 66.8211 17.2661 66.1258 17.2661H61.1147V31.7467H66.1165C67.1437 31.7467 68.1148 31.5651 69.0298 31.1951C69.9449 30.824 70.743 30.3158 71.4267 29.6705C72.1092 29.0242 72.6491 28.2624 73.0429 27.382C73.4379 26.5026 73.6354 25.5536 73.6366 24.5361C73.6354 23.5186 73.4391 22.5696 73.0452 21.6891ZM70.0454 26.2251C69.8198 26.7481 69.5137 27.2015 69.1268 27.5864C68.7389 27.9712 68.2784 28.2773 67.7432 28.5034C67.208 28.7295 66.6377 28.8426 66.0335 28.8426H64.2817V20.2205H66.0393C66.6447 20.2205 67.2138 20.3347 67.749 20.5619C68.2831 20.7892 68.7435 21.0952 69.1315 21.4801C69.5183 21.8661 69.8233 22.3229 70.0489 22.8528C70.2733 23.3827 70.3866 23.9434 70.3854 24.5338C70.3843 25.1402 70.2709 25.7032 70.0454 26.2251Z",
                    fill: "#C28F2C",
                  })
                ),
                nt(
                  "defs",
                  null,
                  nt(
                    "clipPath",
                    { id: "clip0" },
                    nt("rect", { width: "85", height: "32", fill: "white" })
                  )
                )
              );
            },
          },
          {
            key: "getAccentColor",
            value: function () {
              return "#0BC4E2";
            },
          },
          {
            key: "getStyles",
            value: function () {
              return Gn;
            },
          },
        ]),
        n
      );
    })(Vn),
    qn = (function (t) {
      function n() {
        var t;
        return (
          T(this, n),
          (t = H(this, j(n).call(this))),
          (t.themeData = {}),
          (t.defaultThemeClass = new Zn()),
          t
        );
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "setThemeData",
            value: function (t) {
              this.themeData = t;
            },
          },
          {
            key: "getClassNamePrefix",
            value: function () {
              return this.themeData.name;
            },
          },
          {
            key: "getDesktopLogo",
            value: function () {
              if (this.themeData.desktopSVG)
                try {
                  var t = Mt(this.themeData.desktopSVG, "xml", nt);
                  return t;
                } catch (n) {
                  return null;
                }
              return this.themeData.desktopImage
                ? nt("img", { src: this.themeData.desktopImage })
                : this.defaultThemeClass.getDesktopLogo();
            },
          },
          {
            key: "getMobileLogo",
            value: function () {
              if (this.themeData.mobileSVG)
                try {
                  var t = Mt(this.themeData.mobileSVG, "xml", nt);
                  return t;
                } catch (n) {
                  return null;
                }
              return this.themeData.mobileImage
                ? nt("img", { src: this.themeData.mobileImage })
                : this.defaultThemeClass.getMobileLogo();
            },
          },
          {
            key: "getAccentColor",
            value: function () {
              return this.themeData.accentColor
                ? this.themeData.accentColor
                : this.defaultThemeClass.getAccentColor();
            },
          },
          {
            key: "getName",
            value: function () {
              return this.defaultThemeClass.getName();
            },
          },
          {
            key: "getHomepageURL",
            value: function () {
              return this.themeData.homepageURL || "https://www.riotgames.com";
            },
          },
          {
            key: "getStyles",
            value: function () {
              return "\n      .theme-button {\n        background-color: "
                .concat(
                  this.themeData.accentColor,
                  " !important;\n      }\n      .theme-button:hover {\n        background-color: "
                )
                .concat(
                  this.themeData.accentColorHover,
                  " !important;\n      }\n\n      .theme-button:active {\n        background-color: "
                )
                .concat(
                  this.themeData.accentColorActive,
                  " !important;\n      }\n      #riotbar-bar .riotbar-active-link {\n        border-color: "
                )
                .concat(
                  this.themeData.accentColorActive,
                  " !important;\n      }\n\n      .riotbar-navbar-link:hover {\n        border-color: "
                )
                .concat(
                  this.themeData.accentColorHover,
                  " !important;\n      }\n\n      #riotbar-navbar a:hover {\n        border-bottom-color: "
                )
                .concat(
                  this.themeData.accentColorHover,
                  " !important;\n      }\n\n      #riotbar-bar .nav-dropdown-active a {\n        border-bottom-color: "
                )
                .concat(
                  this.themeData.accentColorActive,
                  ";\n      }\n\n      #riotbar-bar .sub-menu-header-icon svg, #riotbar-bar .sub-menu-header-icon img{\n        margin-top: 20px;\n        margin-left: 15px;\n        display: block;\n        max-height: 50px;\n      }\n    "
                );
            },
          },
        ]),
        n
      );
    })(Vn),
    Xn = new qn(),
    Yn = {
      navigation: zn,
      global: null,
      authInfo: null,
      localeInfo: null,
      init: function () {
        (this.global = window.RiotBar.config.global),
          zn.init(),
          Xn.setThemeData(window.RiotBar.data.theme),
          (this.authInfo =
            window.RiotBar.plugins.account.extensions.getGlobalAccount());
        var t = {
          availableLanguages: [],
          localeContext: null,
          currentRegion: null,
          allLanguages:
            RiotBar.plugins.locale.localeUtils.getAllLanguagesWithRegions(
              window.RiotBar.config.locale
            ),
        };
        window.RiotBar.config.locale &&
          ((t.localeContext =
            RiotBar.plugins.locale.localeUtils.getRenderContext()),
          (t.currentRegion = t.localeContext.regions.filter(function (n) {
            return n.id == t.localeContext.currentRegion;
          })[0]),
          t.currentRegion &&
            t.currentRegion.locales &&
            t.currentRegion.locales.length > 1 &&
            (t.availableLanguages = t.currentRegion.locales)),
          (this.localeInfo = t);
      },
    },
    $n = [],
    Jn = wn.__r,
    Kn = wn.diffed,
    Qn = wn.__c,
    te = wn.unmount;
  (wn.__r = function (t) {
    Jn && Jn(t),
      (Bn = 0),
      (Pn = t.__c).__H &&
        (Pn.__H.u.forEach(Vt), Pn.__H.u.forEach(Gt), (Pn.__H.u = []));
  }),
    (wn.diffed = function (t) {
      Kn && Kn(t);
      var n = t.__c;
      if (n) {
        var e = n.__H;
        e &&
          e.u.length &&
          ((1 !== $n.push(n) && In === wn.requestAnimationFrame) ||
            (
              (In = wn.requestAnimationFrame) ||
              function (t) {
                var n,
                  e = function () {
                    clearTimeout(r), cancelAnimationFrame(n), setTimeout(t);
                  },
                  r = setTimeout(e, 100);
                "undefined" != typeof window && (n = requestAnimationFrame(e));
              }
            )(Wt));
      }
    }),
    (wn.__c = function (t, n) {
      n.some(function (t) {
        t.__h.forEach(Vt),
          (t.__h = t.__h.filter(function (t) {
            return !t.i || Gt(t);
          }));
      }),
        Qn && Qn(t, n);
    }),
    (wn.unmount = function (t) {
      te && te(t);
      var n = t.__c;
      if (n) {
        var e = n.__H;
        e &&
          e.t.forEach(function (t) {
            return t.m && t.m();
          });
      }
    });
  var ne =
    ((function (t) {
      function n(n) {
        var e;
        return ((e = t.call(this, n) || this).isPureReactComponent = !0), e;
      }
      var e, r;
      return (
        (r = t),
        ((e = n).prototype = Object.create(r.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = r),
        (n.prototype.shouldComponentUpdate = function (t, n) {
          return Yt(this.props, t) || Yt(this.state, n);
        }),
        n
      );
    })(it),
    wn.vnode);
  wn.vnode = function (t) {
    t.type && t.type.t && t.ref && ((t.props.ref = t.ref), (t.ref = null)),
      ne && ne(t);
  };
  var ee = wn.__e;
  (wn.__e = function (t, n, e) {
    if (t.then)
      for (var r, a = n; (a = a.__); )
        if ((r = a.__c) && r.l) return r.l(t, n.__c);
    ee(t, n, e);
  }),
    ((Jt.prototype = new it()).l = function (t, n) {
      var e = this,
        r = Kt(e.__v),
        a = !1,
        i = function () {
          a || ((a = !0), r ? r(o) : o());
        };
      (n.__c = n.componentWillUnmount),
        (n.componentWillUnmount = function () {
          i(), n.__c && n.__c();
        });
      var o = function () {
        --e.__u ||
          ((e.__v.__k[0] = e.state.o), e.setState({ o: (e.__b = null) }));
      };
      e.__u++ || e.setState({ o: (e.__b = e.__v.__k[0]) }), t.then(i, i);
    }),
    (Jt.prototype.render = function (t, n) {
      return (
        this.__b && ((this.__v.__k[0] = $t(this.__b)), (this.__b = null)),
        [nt(it, null, n.o ? null : t.children), n.o && t.fallback]
      );
    });
  var re = function (t, n, e) {
    if (
      (++e[1] === e[0] && t.i["delete"](n),
      t.props.revealOrder && ("t" !== t.props.revealOrder[0] || !t.i.size))
    )
      for (e = t.u; e; ) {
        for (; e.length > 3; ) e.pop()();
        if (e[1] < e[0]) break;
        t.u = e = e[2];
      }
  };
  ((Qt.prototype = new it()).o = function (t) {
    var n = this,
      e = Kt(n.__v),
      r = n.i.get(t);
    return (
      r[0]++,
      function (a) {
        var i = function () {
          n.props.revealOrder ? (r.push(a), re(n, t, r)) : a();
        };
        e ? e(i) : i();
      }
    );
  }),
    (Qt.prototype.render = function (t) {
      (this.u = null), (this.i = new Map());
      var n = pt(t.children);
      t.revealOrder && "b" === t.revealOrder[0] && n.reverse();
      for (var e = n.length; e--; ) this.i.set(n[e], (this.u = [1, 0, this.u]));
      return t.children;
    }),
    (Qt.prototype.componentDidUpdate = Qt.prototype.componentDidMount =
      function () {
        var t = this;
        t.i.forEach(function (n, e) {
          re(t, e, n);
        });
      });
  var ae = (function () {
      function t() {}
      var n = t.prototype;
      return (
        (n.getChildContext = function () {
          return this.props.context;
        }),
        (n.render = function (t) {
          return t.children;
        }),
        t
      );
    })(),
    ie =
      /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;
  it.prototype.isReactComponent = {};
  var oe =
      ("undefined" != typeof Symbol &&
        Symbol["for"] &&
        Symbol["for"]("react.element")) ||
      60103,
    le = wn.event;
  wn.event = function (t) {
    return le && (t = le(t)), (t.persist = function () {}), (t.nativeEvent = t);
  };
  var se = {
      configurable: !0,
      get: function () {
        return this["class"];
      },
    },
    ce = wn.vnode;
  wn.vnode = function (t) {
    t.$$typeof = oe;
    var n = t.type,
      e = t.props;
    if ("function" != typeof n) {
      var r, a, i;
      for (i in (e.defaultValue &&
        (e.value || 0 === e.value || (e.value = e.defaultValue),
        delete e.defaultValue),
      Array.isArray(e.value) &&
        e.multiple &&
        "select" === n &&
        (pt(e.children).forEach(function (t) {
          -1 != e.value.indexOf(t.props.value) && (t.props.selected = !0);
        }),
        delete e.value),
      e))
        if ((r = ie.test(i))) break;
      if (r)
        for (i in ((a = t.props = {}), e))
          a[ie.test(i) ? i.replace(/([A-Z0-9])/, "-$1").toLowerCase() : i] =
            e[i];
    }
    (e["class"] || e.className) &&
      ((se.enumerable = "className" in e),
      e.className && (e["class"] = e.className),
      Object.defineProperty(e, "className", se)),
      (function (n) {
        var e = t.type,
          r = t.props;
        if (r && "string" == typeof e) {
          var a = {};
          for (var i in r)
            /^on(Ani|Tra|Tou)/.test(i) &&
              ((r[i.toLowerCase()] = r[i]), delete r[i]),
              (a[i.toLowerCase()] = i);
          if (
            (a.ondoubleclick &&
              ((r.ondblclick = r[a.ondoubleclick]), delete r[a.ondoubleclick]),
            a.onbeforeinput &&
              ((r.onbeforeinput = r[a.onbeforeinput]),
              delete r[a.onbeforeinput]),
            a.onchange &&
              ("textarea" === e ||
                ("input" === e.toLowerCase() && !/^fil|che|ra/i.test(r.type))))
          ) {
            var o = a.oninput || "oninput";
            r[o] || ((r[o] = r[a.onchange]), delete r[a.onchange]);
          }
        }
      })(),
      "function" == typeof n &&
        !n.m &&
        n.prototype &&
        (en(n.prototype, "componentWillMount"),
        en(n.prototype, "componentWillReceiveProps"),
        en(n.prototype, "componentWillUpdate"),
        (n.m = !0)),
      ce && ce(t);
  };
  var ue = function (t) {
      return (function (n) {
        function e(t) {
          var n;
          return (
            T(this, e),
            (n = H(this, j(e).call(this, t))),
            (n.refCb = n.refCb.bind(U(n))),
            n
          );
        }
        return (
          D(e, n),
          B(e, [
            {
              key: "refCb",
              value: function (t) {
                this.el = t;
              },
            },
            {
              key: "componentDidMount",
              value: function () {
                var n = this.props._id,
                  e = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "use"
                  ),
                  r = "https://lolstatic-a.akamaihd.net/riotbar/live/1.1.5/";
                r.length && "/" !== r[r.length - 1] && (r += "/");
                var a = ""
                  .concat(r, "svg/")
                  .concat(t, "/defs/svg/sprite.defs.svg#")
                  .concat(n);
                e.setAttribute("data-href", a), this.el.appendChild(e);
              },
            },
            {
              key: "render",
              value: function () {
                var t = this.props,
                  n = t.width,
                  e = t.height,
                  r = t.domClassName;
                return nt("svg", {
                  ref: this.refCb,
                  width: n,
                  height: e,
                  className: r ? r : "",
                });
              },
            },
          ]),
          e
        );
      })(it);
    },
    pe = ue("locale"),
    be = function () {
      var t = jt(null),
        n = jt(null),
        e = jt(null),
        r = Pt(!1),
        a = W(r, 2),
        i = a[0],
        o = a[1];
      Dt(
        function () {
          var t = function (t) {
            t.target &&
              (On.isDescendantOfClass(t.target, "lang-switch-dropdown") ||
                On.isDescendantOfClass(t.target, "icon-lang-switch") ||
                o(!1));
          };
          return (
            document.addEventListener("click", t),
            function () {
              document.removeEventListener("click", t);
            }
          );
        },
        [o]
      );
      var l = function () {
        if (t && t.current && n.current) {
          if (!i)
            return (
              (t.current.style.left = ""), void (n.current.style.left = "")
            );
          var r = window.outerWidth,
            a = t.current.getBoundingClientRect(),
            o = -115,
            l = 113,
            s =
              r - (e.current.getBoundingClientRect().x + e.current.clientWidth);
          if (a.x + a.width > r - 9) {
            var c = a.width + a.x - (r - 9),
              u = o - c - s,
              p = l + c + s;
            if (Math.abs(p) >= 210) {
              var b = p - 210;
              (u += b), (p -= b);
            }
            (t.current.style.left = u + "px"),
              (n.current.style.left = p + "px");
          }
        }
      };
      Dt(function () {
        return (
          window.addEventListener("resize", l),
          function () {
            window.removeEventListener("resize", l);
          }
        );
      }),
        Ot(
          function () {
            i === !0 && l();
          },
          [i]
        );
      var s = window.RiotBar.data.localizationSwitcher;
      if (!s || !s.enabled) return null;
      var c = s.links || [];
      return c.length < 2
        ? null
        : nt(
            "div",
            { className: "riotbar-locale riotbar-navmenu-right-icon" },
            nt(
              "div",
              { className: "icon-lang-switch" },
              nt(
                "a",
                {
                  ref: e,
                  onClick: function () {
                    return o(!0);
                  },
                  className: "lang-switch-trigger",
                },
                nt(pe, { width: "14", height: "14", _id: "globeIcon" })
              ),
              nt(
                "div",
                {
                  className:
                    "lang-switch-dropdown localization-management-list ".concat(
                      i ? "active" : ""
                    ),
                  ref: t,
                },
                nt("div", { className: "lang-switch-caret", ref: n }),
                nt(
                  "ul",
                  null,
                  c.map(function (t) {
                    return nt(
                      "li",
                      { className: t.active ? "active" : "", key: t.text },
                      nt(
                        "a",
                        { href: t.active ? void 0 : t.url },
                        nt("span", { className: "lang-name" }, t.text),
                        t.active
                          ? nt(pe, {
                              width: "14",
                              height: "12",
                              _id: "checkSmall",
                            })
                          : null
                      )
                    );
                  })
                )
              )
            )
          );
    },
    de = { enabled: !1, incidents: [] },
    fe = Ct(de),
    he = function (t) {
      var n = t.type,
        e = void 0 === n ? "informational" : n,
        r = { info: "#EBEBEB", critical: "#BE29CC", warning: "#E69700" },
        a = "#EBEBEB";
      return (
        r.hasOwnProperty(e) && (a = r[e]),
        nt(
          "svg",
          {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          nt("rect", {
            x: "12",
            y: "0.75",
            width: "15.8648",
            height: "15.9549",
            rx: "2",
            transform: "rotate(45 12 0.75)",
            fill: a,
          }),
          nt("path", {
            d: "M12.9653 12.9481H11.0518L10.824 8H13.1931L12.9653 12.9481ZM12.0085 13.5372C12.1756 13.5372 12.3331 13.5708 12.4812 13.6381C12.6331 13.7017 12.7659 13.7896 12.8798 13.9018C12.9937 14.014 13.083 14.1449 13.1475 14.2945C13.2158 14.4404 13.25 14.5956 13.25 14.7602C13.25 14.9285 13.2158 15.0874 13.1475 15.237C13.083 15.3866 12.9937 15.5175 12.8798 15.6297C12.7659 15.7419 12.6331 15.8317 12.4812 15.899C12.3331 15.9663 12.1756 16 12.0085 16C11.8377 16 11.6763 15.9663 11.5245 15.899C11.3726 15.8317 11.2397 15.7419 11.1259 15.6297C11.012 15.5175 10.9208 15.3866 10.8525 15.237C10.7842 15.0874 10.75 14.9285 10.75 14.7602C10.75 14.5956 10.7842 14.4404 10.8525 14.2945C10.9208 14.1449 11.012 14.014 11.1259 13.9018C11.2397 13.7896 11.3726 13.7017 11.5245 13.6381C11.6763 13.5708 11.8377 13.5372 12.0085 13.5372Z",
            fill: "#141414",
          })
        )
      );
    },
    me = {
      info: function (t) {
        console.info ? void 0 : this.log(t);
      },
      log: function (t) {
        console.log, void 0;
      },
      error: function (t) {
        console.error ? void 0 : this.log(t);
      },
    },
    ge =
      (me.info,
      me.log,
      me.error,
      function (t, n) {
        return new Promise(function (e, r) {
          fetch(n)
            .then(function (t) {
              return t.json();
            })
            .then(function (n) {
              (n.product = t), e(n);
            })
            ["catch"](function (t) {
              return r(t);
            });
        });
      }),
    ve = function () {
      return new Promise(function (t, n) {
        for (
          var e = [], r = RiotBar.data.serviceStatus.productURLs || [], a = 0;
          a < r.length;
          a++
        )
          for (var i = r[a], o = i.urls || [], l = 0; l < o.length; l++) {
            var s = o[l];
            e.push(ge(i.product, s));
          }
        Promise.all(e)
          .then(function (n) {
            for (var e = [], r = 0; r < n.length; r++) {
              var a = n[r];
              if (a.incidents) {
                var i = a.incidents.filter(function (t) {
                  return "" !== we(t) && ye(t);
                });
                e.push.apply(e, V(i));
              }
              if (a.maintenances) {
                var o = a.maintenances.filter(function (t) {
                  return "" !== we(t) && ye(t);
                });
                e.push.apply(e, V(o));
              }
            }
            var l = e.sort(function (t, n) {
              return (
                new Date(n.created_at).getTime() -
                new Date(t.created_at).getTime()
              );
            });
            t(l);
          })
          ["catch"](function (t) {
            me.error(t), n(t);
          });
      });
    },
    we = function (t) {
      var n = "en_US",
        e = "",
        r = t.titles.find(function (t) {
          return t.locale === n;
        });
      return r && (e = r.content), e;
    },
    ye = function (t) {
      try {
        return (
          0 !== t.updates.length &&
          t.updates[0].publish_locations.includes("riotstatus")
        );
      } catch (n) {
        return !1;
      }
    },
    ke = function (t) {
      var n = "en_US",
        e = "";
      if (t.updates.length < 0) return e;
      var r = (t.updates || []).sort(function (t, n) {
        return (
          new Date(n.updated_at || n.created_at).getTime() -
          new Date(t.updated_at || t.created_at).getTime()
        );
      })[0];
      if (!r || !r.translations) return e;
      var a = r.translations.find(function (t) {
        return t.locale === n;
      });
      return a && (e = a.content), e;
    },
    xe = function (t) {
      var n;
      if (t.created_at)
        try {
          n = new Date(t.created_at);
        } catch (e) {
          n = new Date();
        }
      else n = new Date();
      var r = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "America/Los_Angeles",
          timeZoneName: "short",
        },
        a = "en_US".replace("_", "-"),
        i = "";
      try {
        i = n.toLocaleString(a, r);
      } catch (e) {
        i = n.toISOString();
      }
      return i;
    },
    _e = function (t) {
      if (!t || 0 === t.length) return "";
      for (var n = 0, e = "", r = 0; r < t.length; r++) {
        var a = t[r];
        Ce(a.incident_severity) > n &&
          ((e = a.incident_severity), (n = Ce(a.incident_severity)));
      }
      return e;
    },
    Ce = function (t) {
      switch (t) {
        case "warning":
          return 1;
        case "critical":
          return 2;
        default:
          return 0;
      }
    },
    Se = function (t) {
      var n = t.incident_severity ? t.incident_severity : t.maintenance_status;
      switch (n) {
        case "info":
          return "Informational";
        case "warning":
          return "Warning";
        case "critical":
          return "Critical";
        case "scheduled":
          return "Scheduled";
        case "planned":
          return "Planned";
        case "in_progress":
          return "In Progress";
        case "closed":
          return "Closed";
        default:
          return n;
      }
    },
    Re = function (t) {
      if (!t.product) return "Riot Games";
      switch (t.product) {
        case "lol":
          return "League of Legends";
        case "lor":
          return "Legends of Runeterra";
        case "tft":
          return "Teamfight Tactics";
        case "wildrift":
          return "Wild Rift";
        case "riot-client":
          return "Riot Games";
        case "valorant":
          return "Valorant";
        default:
          return t.product;
      }
    },
    Le = function (t) {
      var n = t.incident;
      return nt(
        "div",
        { className: "riotbar-service-status-message" },
        nt(
          "div",
          null,
          nt(
            "span",
            {
              className:
                "riotbar-service-status-type riotbar-service-status-type-".concat(
                  n.incident_severity
                ),
            },
            Se(n)
          )
        ),
        nt("div", { className: "riotbar-service-status-product" }, Re(n)),
        nt(
          "div",
          { className: "riotbar-service-status-incident-title" },
          we(n)
        ),
        nt(
          "div",
          { className: "riotbar-service-status-incident-posted-date" },
          nt("span", null, "Posted:", " ", xe(n))
        ),
        nt(
          "div",
          { className: "riotbar-service-status-incident-description" },
          ke(n)
        ),
        nt(
          "div",
          null,
          nt(
            "a",
            {
              target: "_blank",
              className: "riotbar-service-status-incident-more-details",
              href: "https://status.riotgames.com",
            },
            "MORE DETAILS"
          )
        )
      );
    },
    Fe = function (t) {
      var n = t.open,
        e = rt(null),
        r = rt(null),
        a = function () {
          if (e && e.current && r.current) {
            var t = window.outerWidth,
              n = e.current.getBoundingClientRect(),
              a = -140,
              i = 0,
              o = 50;
            n.x + n.width + o > t - 9 && (i = n.width + n.x + o - (t - 9));
            var l = a - i,
              s = n.width / 2 + r.current.getBoundingClientRect().width / 2 + i;
            if (Math.abs(s) >= n.width) {
              var c = s - n.width;
              (l += c), (s -= c);
            }
            (e.current.style.left = l + "px"),
              (r.current.style.left = s + "px");
          }
        };
      Dt(
        function () {
          a();
        },
        [e.current, r.current, n]
      );
      var i = Ht(fe);
      if (!n || 0 === i.incidents.length || !Array.isArray(i.incidents))
        return null;
      var o = i.incidents
        .filter(function (t) {
          return !!["critical", "warning"].includes(t.incident_severity);
        })
        .slice(0, 2);
      if (!o) return null;
      var l = i.incidents.length > 2,
        s = "VIEW ALL %s SERVICE STATUSES";
      return nt(
        "div",
        { className: "riotbar-service-status-popup-wrapper", ref: e },
        nt("div", { className: "riotbar-service-status-popup-caret", ref: r }),
        nt(
          "div",
          { className: "riotbar-service-status-popup-inner" },
          o.map(function (t) {
            return nt(Le, { incident: t });
          }),
          l
            ? nt(
                "div",
                { className: "riotbar-service-status-view-all-container" },
                nt(
                  "a",
                  { href: "https://status.riotgames.com", target: "_blank" },
                  "".concat(s.replace("%s", i.incidents.length))
                )
              )
            : null
        )
      );
    },
    Ne = function () {
      var t = Ht(fe),
        n = Pt(!1),
        e = W(n, 2),
        r = e[0],
        a = e[1],
        i = Pt(""),
        o = W(i, 2),
        l = o[0],
        s = o[1];
      return t.enabled && 0 !== t.incidents.length
        ? (Ot(
            function () {
              var n =
                t.incidents && t.incidents.length > 0
                  ? t.incidents.filter(function (t) {
                      return !!["critical", "warning"].includes(
                        t.incident_severity
                      );
                    })
                  : [];
              s(_e(n));
            },
            [t, s]
          ),
          Dt(function () {
            function t(t) {
              On.isDescendantOfClass(
                t.target,
                "riotbar-service-status-wrapper"
              ) || a(!1);
            }
            return (
              document.addEventListener("click", t),
              function () {
                document.removeEventListener("click", t);
              }
            );
          }, []),
          l && ["warning", "critical"].includes(l)
            ? nt(
                "div",
                { className: "riotbar-service-status-wrapper" },
                nt(
                  "div",
                  {
                    className: "riotbar-service-status-icon-wrapper",
                    onClick: function () {
                      return a(!r);
                    },
                  },
                  nt(he, { type: l })
                ),
                nt(Fe, { open: r })
              )
            : null)
        : null;
    },
    Ee = function (t) {
      t.icons;
      return nt(
        "div",
        { className: "riotbar-right-content-icons" },
        nt(Ne, null),
        nt(be, null)
      );
    },
    Me = ue("navigation"),
    Te = function () {
      return nt(
        at,
        null,
        nt(Me, {
          width: "10",
          height: "5",
          _id: "mainNavArrowDown",
          domClassName: "non-hover arrow-down",
        }),
        nt(Me, {
          width: "10",
          height: "5",
          _id: "mainNavArrowDownHover",
          domClassName: "hover arrow-down",
        })
      );
    },
    Ae = function () {
      return nt(
        at,
        null,
        nt(Me, {
          width: "7",
          height: "7",
          _id: "mainNavLinkOut",
          domClassName: "inline-block link-out non-hover",
        }),
        nt(Me, {
          width: "7",
          height: "7",
          _id: "mainNavLinkOutWhite",
          domClassName: "inline-block link-out hover",
        })
      );
    },
    Be = { id: "__moreItems__", text: "More", subMenuItems: [] },
    Pe = null,
    Ie = null,
    Oe = (function (t) {
      function n(t) {
        var e;
        T(this, n), (e = H(this, j(n).call(this, t)));
        var r = [];
        try {
          r = RiotBar.data.touchpoints.links
            ? V(RiotBar.data.touchpoints.links)
            : [];
        } catch (a) {}
        return (
          r.push(Be),
          (e.state = {
            activeDropdownId: null,
            activeSubDropdownId: null,
            links: r,
            ready: !1,
          }),
          (e.dropdownClicked = e.dropdownClicked.bind(U(e))),
          (e.dropdownMouseOver = e.dropdownMouseOver.bind(U(e))),
          (e.dropdownMouseOut = e.dropdownMouseOut.bind(U(e))),
          (e.adjustMenu = e.adjustMenu.bind(U(e))),
          (e.handleActionClick = e.handleActionClick.bind(U(e))),
          document.addEventListener("click", function (t) {
            On.isDescendantOfClass(
              t.target,
              "riotbar-navbar-navitem-container"
            ) ||
              e.setState({ activeDropdownId: null, activeSubDropdownId: null });
          }),
          e
        );
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "dropdownClicked",
            value: function (t, n) {
              this.state.activeDropdownId !== n.id &&
                this.setState({ activeDropdownId: n.id });
            },
          },
          {
            key: "dropdownMouseOver",
            value: function (t) {
              this.state.activeDropdownId !== t.id &&
                this.setState({
                  activeDropdownId: t.id,
                  activeSubDropdownId: null,
                });
            },
          },
          {
            key: "dropdownMouseOut",
            value: function (t) {
              var n = this;
              if (this.state.activeDropdownId === t.id) {
                var e = !0;
                t.subMenuItems &&
                  t.subMenuItems.length > 0 &&
                  t.subMenuItems.forEach(function (t) {
                    t.id === n.state.activeSubDropdownId && (e = !1);
                  }),
                  e &&
                    this.setState({
                      activeDropdownId: null,
                      activeSubDropdownId: null,
                    });
              }
            },
          },
          {
            key: "dropdownSubMouseOver",
            value: function (t) {
              this.state.activeSubDropdownId !== t.id &&
                this.setState({ activeSubDropdownId: t.id });
            },
          },
          {
            key: "dropdownSubMouseOut",
            value: function (t) {
              this.state.activeSubDropdownId === t.id &&
                this.setState({ activeSubDropdownId: null });
            },
          },
          {
            key: "componentDidMount",
            value: function () {
              var t = this;
              this.isAdjustable()
                ? Promise.race([
                    new Promise(function (t) {
                      return setTimeout(function () {
                        return t(0);
                      }, 500);
                    }),
                    this.props.fontLoaded,
                  ])
                    .then(function (n) {
                      t.adjustMenu(),
                        t.setState({ ready: !0 }),
                        window.addEventListener("resize", function () {
                          return t.adjustMenu();
                        });
                    })
                    ["catch"](function (t) {
                      console && void 0;
                    })
                : setTimeout(function () {
                    return t.setState({ ready: !0 }, function () {
                      return t.adjustMenu();
                    });
                  }, 500);
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              this.adjustMenu();
            },
          },
          {
            key: "isAdjustable",
            value: function () {
              return document.fonts && "function" == typeof window.Promise;
            },
          },
          {
            key: "adjustMenu",
            value: function () {
              var t = document.getElementById("riotbar-navbar"),
                n = document.getElementsByClassName("riotbar-left-content")[0],
                e = document.getElementsByClassName("riotbar-right-content")[0],
                r = document.getElementsByClassName("riotbar-bar-content")[0],
                a = document.getElementsByClassName("nav-dropdown-overflow")[0],
                i = document.getElementsByClassName("riotbar-explore-label")[0],
                o = document.getElementById("riotbar-bar");
              if (t && n && e && r && a && i) {
                if (
                  "none" !==
                  window.getComputedStyle(i).getPropertyValue("display")
                ) {
                  var l = document.getElementsByClassName(
                      "riotbar-right-mobile-content"
                    )[0],
                    s = 0;
                  return (
                    l && (s = l.offsetWidth),
                    void (r.style.width =
                      o.offsetWidth - n.offsetWidth - e.offsetWidth - s + "px")
                  );
                }
                if (
                  ((r.style.width = "auto"), Ie || (Ie = a.offsetWidth), !Pe)
                ) {
                  Pe = {};
                  for (
                    var c = document.getElementsByClassName(
                        "riotbar-navbar-navitem-container"
                      ),
                      u = 0;
                    u < c.length;
                    u++
                  ) {
                    var p = c[u],
                      b = p.getAttribute("data-link-id");
                    Pe[b] = p.offsetWidth;
                  }
                }
                var d = o.offsetWidth,
                  f = n.offsetWidth,
                  h = e.offsetWidth,
                  m = d - f - h - 10,
                  g = t.offsetWidth,
                  v = this.state.links.concat();
                if (m < g) {
                  var w = g - m,
                    y = document.getElementsByClassName(
                      "riotbar-navbar-navitem-container"
                    ),
                    k = y.length;
                  Be.subMenuItems.length || (w += Ie);
                  for (
                    var x = function (t) {
                        var n = y[t],
                          e = n.getAttribute("data-link-id");
                        if ("__moreItems__" == e) return "continue";
                        w -= n.offsetWidth;
                        var r = v.filter(function (t) {
                          return t.id == e;
                        })[0];
                        (Be.subMenuItems = [r].concat(V(Be.subMenuItems))),
                          (v = v.filter(function (t) {
                            return t != r;
                          }));
                      },
                      _ = k - 1;
                    _ >= 0 && w > 0;
                    --_
                  ) {
                    x(_);
                  }
                  this.setState({ links: v, ready: !0 });
                } else if (Be.subMenuItems.length > 0) {
                  var C = m - g,
                    S = !1;
                  1 === Be.subMenuItems.length && (C += Ie);
                  do {
                    var R = Be.subMenuItems[0],
                      L = Pe[R.id];
                    if (!(L + 10 < C)) break;
                    Be.subMenuItems.shift(),
                      (S = !0),
                      v.splice(v.length - 1, 0, R),
                      (C -= L);
                  } while (C > 0 && Be.subMenuItems.length);
                  S && this.setState({ links: v, ready: !0 });
                }
              }
            },
          },
          {
            key: "handleActionClick",
            value: function (t, n) {
              try {
                t.preventDefault();
              } catch (e) {}
              try {
                window.RiotBar.navigation[n]();
              } catch (e) {}
            },
          },
          {
            key: "getNavItemsList",
            value: function () {
              var t = this,
                n = [],
                e = this.state,
                r = e.activeDropdownId,
                a = e.links;
              e.ready;
              return (
                a.forEach(function (e) {
                  if (!e.menuOnly) {
                    var a = (e.subMenuItems || []).length > 0,
                      i = "__moreItems__" === e.id,
                      o = [
                        "riotbar-navbar-navitem-container",
                        r == e.id ? "nav-dropdown-active" : "",
                        i ? "nav-dropdown-overflow" : "",
                        i && !e.subMenuItems.length ? "hide" : "",
                      ],
                      l = On.checkLinkMatch(e.activeLinkRegex),
                      s = [
                        "riotbar-navbar-link",
                        l ? "riotbar-active-link" : "",
                      ];
                    n.push(
                      nt(
                        "div",
                        {
                          key: e.id,
                          "data-link-id": e.id,
                          className: o.join(" "),
                          onMouseEnter: a
                            ? function (n) {
                                return t.dropdownMouseOver(e);
                              }
                            : null,
                          onMouseLeave: a
                            ? function (n) {
                                return t.dropdownMouseOut(e);
                              }
                            : null,
                        },
                        nt(
                          "a",
                          {
                            className: s.join(" "),
                            href:
                              a || e.programmaticAction
                                ? void 0
                                : e.url || void 0,
                            "data-riotbar-link-id": e.id,
                            target: e.target ? e.target : null,
                            onClick: e.programmaticAction
                              ? function (n) {
                                  return t.handleActionClick(
                                    n,
                                    e.programmaticAction
                                  );
                                }
                              : a
                              ? function (n) {
                                  return t.dropdownClicked(n, e);
                                }
                              : null,
                          },
                          e.text,
                          a || i
                            ? nt(Te, null)
                            : e.url && e.target && "_self" !== e.target
                            ? nt(Ae, null)
                            : null
                        ),
                        a ? t.getSubNavItems(e) : null
                      )
                    );
                  }
                }),
                n
              );
            },
          },
          {
            key: "getSubNavItems",
            value: function (t) {
              var n = this,
                e = this.state.activeSubDropdownId;
              return nt(
                "ul",
                { className: "riotbar-navbar-subnav-menu" },
                t.subMenuItems.map(function (t) {
                  var r = [],
                    a = (t.subMenuItems || []).length > 0;
                  t.url || r.push("no-linkage"),
                    On.checkLinkMatch(t.activeLinkRegex) &&
                      r.push("riotbar-active-sub-item");
                  var i = ["riotbar-navbar-subsubnav-menu"];
                  return (
                    e === t.id && i.push("subsubnav-active"),
                    nt(
                      at,
                      null,
                      nt(
                        "li",
                        {
                          key: t.id,
                          className: r.join(" "),
                          onMouseEnter: a
                            ? function (e) {
                                return n.dropdownSubMouseOver(t);
                              }
                            : null,
                          onMouseLeave: a
                            ? function (e) {
                                return n.dropdownSubMouseOut(t);
                              }
                            : null,
                        },
                        t.subMenuItems
                          ? nt(
                              "div",
                              {
                                className:
                                  "riotbar-navbar-subsubnav-menu-wrapper",
                              },
                              nt(
                                "ul",
                                { className: i.join(" ") },
                                (t.subMenuItems || []).map(function (t) {
                                  var e = ["riotbar-navbar-sub-link"];
                                  return (
                                    On.checkLinkMatch(t.activeLinkRegex) &&
                                      e.push("riotbar-active-link"),
                                    nt(
                                      "li",
                                      {
                                        className:
                                          "riotbar-navbar-subnav-subsubmenu",
                                      },
                                      nt(
                                        "a",
                                        {
                                          href: t.programmaticAction
                                            ? void 0
                                            : t.url,
                                          target: t.target || void 0,
                                          className: e.join(" "),
                                          onClick: t.programmaticAction
                                            ? function (e) {
                                                n.handleActionClick(
                                                  e,
                                                  t.programmaticAction
                                                );
                                              }
                                            : void 0,
                                        },
                                        t.text
                                      ),
                                      t.subMenuItems
                                        ? n.renderNestedSubMenuItems(
                                            t.subMenuItems
                                          )
                                        : null
                                    )
                                  );
                                })
                              )
                            )
                          : null,
                        nt(
                          "a",
                          {
                            href: t.programmaticAction
                              ? void 0
                              : t.url || void 0,
                            target: t.target || void 0,
                            className: "riotbar-navbar-sub-link",
                            onClick: t.programmaticAction
                              ? function (e) {
                                  n.handleActionClick(e, t.programmaticAction);
                                }
                              : void 0,
                          },
                          t.text,
                          (t.subMenuItems || []).length
                            ? nt(Me, {
                                width: "10",
                                height: "5",
                                _id: "mainNavArrowDown",
                                domClassName: "arrow-down",
                              })
                            : null
                        )
                      )
                    )
                  );
                })
              );
            },
          },
          {
            key: "renderNestedSubMenuItems",
            value: function (t) {
              var n = this;
              return nt(
                "ul",
                { className: "riotbar-subnav-nested-menu" },
                (t || []).map(function (t) {
                  return nt(
                    "li",
                    null,
                    nt(
                      "a",
                      {
                        href: t.programmaticAction ? t.url : void 0,
                        target: t.target || void 0,
                        className: "riotbar-navbar-sub-link",
                        onClick: t.programmaticAction
                          ? function (e) {
                              n.handleActionClick(e, t.programmaticAction);
                            }
                          : void 0,
                      },
                      t.text
                    )
                  );
                })
              );
            },
          },
          {
            key: "render",
            value: function () {
              var t = this.getNavItemsList(),
                n = this.state.ready,
                e = this.props.title,
                r = [this.isAdjustable() ? "fade-in" : "", n ? "ready" : ""];
              return nt(
                "div",
                { id: "riotbar-navbar", className: r.join(" ") },
                e
                  ? nt(
                      "a",
                      {
                        className: "riotbar-navbar-title",
                        href: e.url ? e.url : void 0,
                        onClick: function (t) {
                          return t.preventDefault();
                        },
                        style: { cursor: e.url ? "pointer" : "default" },
                      },
                      e.text || e
                    )
                  : null,
                nt(
                  "div",
                  { className: "riotbar-explore-label" },
                  Xn.getHomepageURL()
                    ? nt("a", { href: Xn.getHomepageURL() }, Xn.getMobileLogo())
                    : Xn.getMobileLogo(),
                  e
                    ? nt(
                        "a",
                        {
                          className: "riotbar-navbar-title mobile",
                          href: e.url ? e.url : void 0,
                          onClick: function (t) {
                            return t.preventDefault();
                          },
                          style: { cursor: e.url ? "pointer" : "default" },
                        },
                        e.text || e
                      )
                    : null
                ),
                nt(at, null, t)
              );
            },
          },
        ]),
        n
      );
    })(it),
    De = function (t) {
      var n = t.width,
        e = void 0 === n ? "11" : n,
        r = t.height,
        a = void 0 === r ? "9" : r;
      return nt(
        "svg",
        {
          width: e,
          height: a,
          viewBox: "0 0 11 9",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        nt(
          "g",
          null,
          nt("rect", {
            x: "2.10889",
            y: "7.03003",
            width: "10",
            height: "2",
            transform: "rotate(-44.6688 2.10889 7.03003)",
          }),
          nt("rect", {
            x: "1.42236",
            y: "3.48999",
            width: "5",
            height: "2",
            transform: "rotate(45.3312 1.42236 3.48999)",
          })
        )
      );
    },
    je = function (t) {
      var n = t.color;
      return nt(
        "svg",
        {
          width: "8",
          height: "5",
          viewBox: "0 0 8 5",
          className: "arrow-down",
          fill: n,
          xmlns: "http://www.w3.org/2000/svg",
        },
        nt("path", {
          d: "M0.707109 1.70711L3.29289 4.29289C3.68342 4.68342 4.31658 4.68342 4.70711 4.29289L7.29289 1.70711C7.92286 1.07714 7.47669 0 6.58579 0H1.41421C0.523309 0 0.0771438 1.07714 0.707109 1.70711Z",
        })
      );
    },
    ze = function (t) {
      return t.href || delete t.href, nt("a", t);
    },
    Ue = function (t) {
      var n = t.link,
        e = t.activeLink,
        r = t.onClick,
        a = [
          "riotbar-navmenu-link",
          (n.subMenuItems || []).length ? "sub-menu-trigger" : "",
          t.className || "",
          e == n.id ? "riotbar-active-link" : "",
        ];
      return nt(
        ze,
        {
          className: a.join(" "),
          href: n.url || null,
          "data-riotbar-link-id": n.id || null,
          "data-ping-meta": n.id
            ? "riotbar-content=navigation|riotbar-navigation=".concat(n.id)
            : null,
          onClick: function (e) {
            if (!r || r(e) !== !1) {
              var a = e.target,
                i = a.getAttribute("data-riotbar-account-action");
              if (i) {
                e.preventDefault();
                try {
                  RiotBar.account[i]();
                } catch (o) {
                  On.logError(o);
                }
              } else if (n.programmaticAction) {
                e.preventDefault();
                try {
                  RiotBar.navigation[n.programmaticAction]();
                } catch (o) {
                  On.logError(o);
                }
              } else
                (n.subMenuItems || []).length &&
                  (e.preventDefault(), t.openSubMenu(n.text, n.subMenuItems));
            }
          },
          "data-riotbar-account-action": n.action || null,
          target: n.target || null,
        },
        n.text,
        n.icon || null,
        (n.subMenuItems || []).length
          ? nt(
              "span",
              { className: "side-menu-icon" },
              nt(Me, { width: "5", height: "9", _id: "subMenuRight" })
            )
          : n.url && n.target && "_self" !== n.target
          ? nt(
              "span",
              { className: "side-menu-icon" },
              nt(Me, { width: "7", height: "7", _id: "mainNavLinkOut" })
            )
          : null,
        t.rightContent || null
      );
    },
    He = ue("navigation"),
    We = ue("locale"),
    Ve = function (t) {
      var n = t.openSubMenu,
        e = Yn.localeInfo,
        r = e.localeContext,
        a = e.availableLanguages;
      if (a.length < 2) return null;
      var i = a.map(function (t) {
        var n = r.currentLang == t.lang;
        return {
          text: t.lang + " - " + t.languageName,
          id: t.languageName,
          url: t.landingUrl,
          className: n ? "disabled" : "",
          rightContent: n ? nt(De, { width: "14", height: "12" }) : null,
        };
      });
      return nt(
        "div",
        { className: "sideMenuIcons" },
        nt(
          "a",
          {
            onClick: function (t) {
              (t.cancelBubble = !0), n("Language Select", i);
            },
            className: "lang-switch-trigger",
          },
          nt(We, { width: "14", height: "14", _id: "globeIcon" })
        )
      );
    },
    Ge = function (t) {
      var n = t.touchpoints,
        e = t.openSubMenu,
        r = t.activeTouchpoint;
      return nt(
        at,
        null,
        nt(
          "div",
          { className: "riotbar-navmenu-category" },
          n.map(function (t, n) {
            return nt(Ue, { openSubMenu: e, link: t, activeLink: r });
          })
        )
      );
    },
    Ze = function (t) {
      var n = t.openSubMenu,
        e = t.sideMenuOpen,
        r = t.closeSideMenu,
        a = t.activeTouchpoint,
        i = t.touchpoints,
        o = t.authenticatedAccountLinks,
        l = window.RiotBar.__accountUtils.accountComponentProps(),
        s = (l.anonymousLinksOverride, l.anonymousLinks);
      return nt(
        "div",
        {
          id: "riotbar-navmenu-dropdown",
          className: "riotbar-navmenu-dropdown ".concat(
            e ? "riotbar-click-active" : ""
          ),
        },
        nt(
          "div",
          { className: "sub-menu-header" },
          nt(
            "a",
            { href: Xn.getHomepageURL() },
            nt(
              "span",
              { className: "sub-menu-header-icon" },
              Xn.getMobileLogo()
            )
          ),
          nt(
            "a",
            { onClick: r, className: "sub-menu-close top-sub-menu-close" },
            nt(He, { width: "32", height: "32", _id: "burgerNavClose" })
          )
        ),
        RiotBar.data.account.enabled &&
          RiotBar.account.getAuthState().isAuthenticated &&
          o
          ? nt(
              "div",
              { className: "riotbar-navmenu-category" },
              nt(Ue, {
                onClick: function (t) {
                  if (!On.isDescendantOfClass(t.target, "riotbar-locale"))
                    return t.preventDefault(), n("Account", o), !1;
                },
                link: {
                  text: RiotBar.account.getAuthState().name || "My Account ",
                  icon: nt(je, { color: Xn.getAccentColor() }),
                },
                className: "show-auth-sub-menu black-side-menu-option",
                rightContent: nt(Ve, { openSubMenu: n }),
              })
            )
          : null,
        RiotBar.data.account.enabled &&
          !RiotBar.account.getAuthState().isAuthenticated
          ? nt(
              "div",
              { className: "riotbar-navmenu-category" },
              s
                ? s.map(function (t) {
                    return nt(Ue, { key: t.text, link: t });
                  })
                : nt(Ue, {
                    link: { text: "Login", action: "login" },
                    rightContent: nt(Ve, { openSubMenu: n }),
                    className: "black-side-menu-option",
                  })
            )
          : null,
        i
          ? nt(
              "div",
              { className: "riotbar-navmenu-links" },
              nt(Ge, {
                activeTouchpoint: a,
                openSubMenu: n,
                touchpoints: i,
                sideMenu: !0,
              })
            )
          : null
      );
    },
    qe = function (t) {
      var n = t.sideMenuOpen,
        e = t.isOpen,
        r = t.closeSubMenu,
        a = t.closeSideMenu,
        i = t.links,
        o = t.text,
        l = t.openSubMenu,
        s = [
          "riotbar-navmenu-dropdown",
          e ? "riotbar-click-active " : "",
          !e && n ? "slide-out" : "",
        ];
      return nt(
        "div",
        { id: "riotbar-navmenu-dropdown-2", className: s.join(" ") },
        nt(
          "div",
          { className: "sub-menu-header" },
          nt(
            "a",
            {
              onClick: r,
              id: "sub-sub-menu-close",
              className: "sub-menu-back sub-sub-menu-close",
            },
            nt(Me, { width: "5", height: "8", _id: "subMenuBack" })
          ),
          nt("span", { className: "sub-menu-header-text" }, o),
          nt(
            "a",
            { onClick: a, className: "sub-menu-close top-sub-menu-close" },
            nt(Me, { width: "32", height: "32", _id: "burgerNavClose" })
          )
        ),
        nt(
          "div",
          { className: "riotbar-navmenu-touchpoints" },
          nt(
            "div",
            { className: "riotbar-navmenu-category" },
            i.map(function (t) {
              return nt(Ue, {
                link: t,
                openSubMenu: l,
                rightContent: t.rightContent,
                className: t.className,
              });
            })
          )
        )
      );
    },
    Xe = (function (t) {
      function n() {
        return T(this, n), H(this, j(n).call(this));
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "render",
            value: function () {
              var t = this.props,
                n = t.sideMenuOpen,
                e = t.closeSideMenu,
                r = (t.activeLink, t.activeTouchpoint),
                a = t.touchpoints,
                i = t.authenticatedAccountLinks;
              return nt(
                at,
                null,
                nt(Ze, {
                  activeTouchpoint: r,
                  closeSideMenu: e,
                  sideMenuOpen: n,
                  openSubMenu: this.props.openSubMenu,
                  touchpoints: a,
                  authenticatedAccountLinks: i,
                }),
                nt(qe, {
                  activeTouchpoint: r,
                  closeSideMenu: e,
                  sideMenuOpen: this.props.sideMenuOpen,
                  isOpen: this.props.subMenuOpen,
                  closeSubMenu: this.props.closeSubMenu,
                  text: this.props.subItemText,
                  links: this.props.subItemItems,
                  openSubMenu: this.props.openSubMenu,
                })
              );
            },
          },
        ]),
        n
      );
    })(it),
    Ye = ue("application-switcher"),
    $e = function (t, n) {
      return "riotbar_".concat(t, "_").concat(n);
    },
    Je = "rb_pip",
    Ke = "rb_pipc",
    Qe = 3,
    tr = function (t) {
      if (!t) return !1;
      try {
        var n = window.localStorage.getItem(Je);
        if (n === t) return !1;
        var e = window.localStorage.getItem(Ke);
        if (e && e.includes(t)) {
          var r = parseInt(e.replace("".concat(t, ":"), ""), 10);
          if (r >= Qe) return !1;
        }
        return !0;
      } catch (a) {
        return Dn(a), !1;
      }
    },
    nr = function (t) {
      try {
        window.localStorage.setItem(Je, t);
      } catch (n) {
        Dn(n);
      }
    },
    er = function (t) {
      try {
        var n = window.localStorage.getItem("".concat(Ke)),
          e = 0;
        if (n && n.includes(t))
          try {
            e = parseInt(n.replace("".concat(t, ":"), ""), 10);
          } catch (r) {
            Dn(r);
          }
        e++, window.localStorage.setItem(Ke, "".concat(t, ":").concat(e));
      } catch (r) {
        Dn(r);
      }
    },
    rr = function (t, n) {
      if (!t || !t.link) return "";
      try {
        var e = new URL(t.link),
          r = e.searchParams.get("utm_medium"),
          a = "+" + window.location.hostname;
        r ? r.includes(a) || (r += a) : (r = ar(t) + n.toString() + a),
          e.searchParams.set("utm_medium", r);
        var i = e.searchParams.get("utm_source");
        return (
          i || (i = "riotbar"),
          e.searchParams.set("utm_source", i),
          e.toString()
        );
      } catch (o) {
        return Dn(o), t.link;
      }
    },
    ar = function (t) {
      if (!t.type) return "";
      switch (t.type) {
        case "promo_card":
          return "promo";
        case "game_card":
          return "game";
        default:
          return t.type;
      }
    },
    ir = (function (t) {
      function n() {
        return T(this, n), H(this, j(n).apply(this, arguments));
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "render",
            value: function () {
              var t = this.props,
                n = t.card,
                e = t.cardCount,
                r = "riotbar-application-switcher-card-".concat(
                  n.type.replace("_card", "")
                );
              (r += " riotbar-application-switcher-card"),
                n.isPlaceholder &&
                  (r += " riotbar-application-switcher-card-placeholder");
              var a = null;
              return (
                n.asset &&
                  ((a = n.asset.url),
                  a.includes("format=") || (a += "?&format=pjpg&quality=85")),
                nt(
                  "div",
                  { className: r },
                  nt(
                    "a",
                    {
                      href: rr(n, e),
                      target: "_blank",
                      "data-interaction-id": $e(
                        "app-switcher-".concat(n.type),
                        "card".concat(e)
                      ),
                    },
                    nt(
                      "div",
                      {
                        className:
                          "riotbar-application-switcher-card-image-wrapper",
                      },
                      null !== a
                        ? nt("img", { src: a, alt: n.title, title: n.title })
                        : nt(Ye, {
                            width: "44",
                            height: "33",
                            _id: "placeholderFist",
                          })
                    ),
                    n.title
                      ? nt(
                          "div",
                          {
                            className: "riotbar-application-card-title-wrapper",
                          },
                          nt("h4", null, n.title)
                        )
                      : null,
                    this.renderPlatformAvailability()
                  )
                )
              );
            },
          },
          {
            key: "renderPlatformAvailability",
            value: function () {
              var t = this.props.card;
              return t.isPlaceholder
                ? nt("div", {
                    className: "riotbar-platform-availability-wrapper",
                  })
                : t.platform_availability &&
                  0 !== t.platform_availability.length
                ? nt(
                    "div",
                    { className: "riotbar-platform-availability-wrapper" },
                    t.platform_availability.map(function (t) {
                      return nt(
                        "div",
                        {
                          className:
                            "riotbar-platform-availability-icon-wrapper platform-".concat(
                              t.toLowerCase()
                            ),
                        },
                        nt(Ye, {
                          _id: rn(t),
                          width: "8",
                          height: "8",
                          domClassName: "riotbar-application-platform-icon",
                        })
                      );
                    })
                  )
                : null;
            },
          },
        ]),
        n
      );
    })(it),
    or = function (t) {
      t = sr(t);
      var n =
        "https://lolstatic-a.akamaihd.net/webfonts/live/css/fonts/".concat(
          t.replace(/\s/g, ""),
          ".css"
        );
      return new Promise(function (t, e) {
        var r = document.createElement("link");
        (r.rel = "stylesheet"),
          (r.type = "text/css"),
          (r.href = n),
          (r.onload = function () {
            t();
          }),
          (r.onerror = function (t) {
            e(t);
          }),
          document.getElementsByTagName("head")[0].appendChild(r);
      });
    },
    lr = function (t) {
      switch (t) {
        case "beaufortforlol":
          return "Beaufort for LOL";
        case "beaufortforlol-italic":
          return "BeaufortforLOL-Italic";
        case "dinnext-ltpro-regular":
          return "DINNextLTPro-Regular";
        case "dinnext-ltpro-medium":
          return "DINNextLTPro-Medium";
      }
      return t;
    },
    sr = function (t) {
      switch (t) {
        case "beaufortforlol-italic":
          return "beaufortforlol";
        case "dinnext-ltpro-regular":
          return "dinnext";
        case "dinnext-ltpro-medium":
          return "dinnext";
      }
      return t;
    },
    cr = function (t) {
      var n = t.event,
        e = n.logo_asset,
        r = n.buttons,
        a = n.colors,
        i = n.tagline,
        o = {
          fontSize: a ? a.tagline_text_color : "14px",
          fontFamily: a ? lr(a.tagline_font_family) : "",
          color: a ? a.tagline_text_color : "",
        };
      return nt(
        "div",
        { className: "custom-event-callout" },
        e
          ? nt(
              "div",
              { className: "custom-event-callout-image-wrapper" },
              nt("img", { src: e.url })
            )
          : null,
        i
          ? nt(
              "div",
              { style: o, className: "custom-event-callout-tagline" },
              i
            )
          : null,
        nt(
          "div",
          { className: "custom-event-callout-buttons" },
          (r || []).map(function (t) {
            var n = {
              fontSize: a.primary_button_text_size || "12px",
              color: a.primary_button_text,
              backgroundColor: a.primary_button,
            };
            return nt(
              "a",
              {
                style: n,
                className: "custom-event-callout-btn riot-bar-btn ".concat(
                  "primary" === t.button_type
                    ? "riot-bar-custom-event-btn-primary"
                    : ""
                ),
                href: t.link.href,
                target: "_blank",
                "data-interaction-id": t.analytics_id,
              },
              t.link.title
            );
          })
        )
      );
    },
    ur = (function (t) {
      function n() {
        return T(this, n), H(this, j(n).apply(this, arguments));
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "render",
            value: function () {
              var t = this.props,
                n = t.cards,
                e = t.selectedTab;
              return (
                0 === n.length && n.push.apply(n, V(this.getDefaultCards())),
                nt(
                  "div",
                  {
                    className:
                      "riotbar-application-switcher-cards-wrapper riotbar-application-switcher-cards-wrapper-selected-".concat(
                        this.props.selectedTab.type.replace(/_/g, "-")
                      ),
                  },
                  e && e.custom_event
                    ? nt(cr, { event: e.custom_event })
                    : null,
                  n.map(function (t, n) {
                    return nt(ir, { card: t, key: t.title, cardCount: n + 1 });
                  })
                )
              );
            },
          },
          {
            key: "getDefaultCards",
            value: function () {
              var t = [],
                n = this.props.selectedTab;
              if ("riot_games" === n.type) {
                for (; t.length < 2; )
                  t.push({ type: "promo_card", isPlaceholder: !0 });
                for (; t.length < 6; )
                  t.push({ type: "game_card", isPlaceholder: !0 });
              } else if ("explore" === n.type)
                for (; t.length < 6; )
                  t.push({ type: "explore", isPlaceholder: !0 });
              return t;
            },
          },
        ]),
        n
      );
    })(it),
    pr = function (t, n) {
      var e = document.createElement("style");
      (e.id = t),
        (e.innerHTML = n),
        document.getElementsByTagName("head")[0].appendChild(e);
    },
    br = function (t, n) {
      document.getElementById(t)
        ? (document.getElementById(t).innerHTML = n)
        : pr(t, n);
    },
    dr = (function (t) {
      function n(t) {
        var e;
        return (
          T(this, n),
          (e = H(this, j(n).call(this, t))),
          (e.state = { selectedTab: t.defaultSelectedTab || null }),
          e
        );
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "getDefaultProps",
            value: function () {
              return {
                tabs: [],
                isOpen: !1,
                handleClose: function () {},
                defaultSelectedTab: null,
              };
            },
          },
          {
            key: "componentDidUpdate",
            value: function (t, n) {
              n.selectedTab &&
                this.state.selectedTab &&
                ((!n.selectedTab && this.state.selectedTab) ||
                  this.state.selectedTab.title !== n.selectedTab.title) &&
                this.generateCustomStyles();
            },
          },
          {
            key: "generateCustomStyles",
            value: function () {
              if (
                this.state.selectedTab &&
                this.state.selectedTab.background_asset_desktop
              ) {
                var t =
                  "\n      .riotbar-application-switcher-event {\n        background-image: url("
                    .concat(
                      this.state.selectedTab.background_asset_desktop.url,
                      ");\n        background-repeat: no-repeat;\n        background-position: 100% 100%;\n        background-size: cover;\n      }\n      @media screen and (max-width: 1024px ) {\n        .riotbar-application-switcher-event {\n          "
                    )
                    .concat(
                      this.state.selectedTab.background_asset_mobile
                        ? "background-image: url(".concat(
                            this.state.selectedTab.background_asset_mobile.url,
                            ")"
                          )
                        : "",
                      ";\n        }\n      }\n      "
                    );
                br("riotbar-app-switcher-custom-event", t);
              }
            },
          },
          {
            key: "render",
            value: function () {
              var t = this;
              return this.props.isOpen
                ? nt(
                    "div",
                    {
                      id: "riotbar-application-switcher",
                      className:
                        "riotbar-base-element riotbar-application-switcher-".concat(
                          this.state.selectedTab.type
                        ),
                    },
                    nt(Ye, {
                      width: "24",
                      height: "24",
                      _id: "applicationSwitcherArrow",
                      domClassName: "riotbar-application-switcher-arrow",
                    }),
                    nt(
                      "div",
                      {
                        className: "riotbar-application-switcher-mobile-header",
                      },
                      nt(
                        "div",
                        {
                          className:
                            "riotbar-application-switcher-mobile-logo-wrapper",
                        },
                        nt(
                          "a",
                          {
                            href: "https://www.riotgames.com",
                            target: "_blank",
                          },
                          nt(Ye, {
                            height: "32",
                            width: "99",
                            _id: "riotGamesFull",
                          })
                        )
                      ),
                      nt(
                        "div",
                        {
                          className: "riotbar-application-switcher-close",
                          onClick: function () {
                            return t.props.handleClose();
                          },
                        },
                        nt(Ye, {
                          height: "32",
                          width: "32",
                          _id: "applicationSwitcherClose",
                        })
                      )
                    ),
                    this.renderContent()
                  )
                : null;
            },
          },
          {
            key: "renderContent",
            value: function () {
              return nt(
                "div",
                {
                  className: "riotbar-pagewidth riotbar-subcontent",
                  id: "riotbar-application-switcher-content",
                },
                this.renderTabs(),
                nt(ur, {
                  cards: this.state.selectedTab.cards,
                  selectedTab: this.state.selectedTab,
                })
              );
            },
          },
          {
            key: "renderTabs",
            value: function () {
              var t = this,
                n = this.props.tabs;
              return nt(
                "div",
                { className: "riotbar-application-switcher-tabs-wrapper" },
                n.map(function (n) {
                  return nt(
                    "span",
                    {
                      onClick: function () {
                        return t.handleSelectTab(n);
                      },
                      className:
                        t.state.selectedTab &&
                        t.state.selectedTab.title === n.title
                          ? "riotbar-application-selected-tab"
                          : "",
                    },
                    n.title,
                    nt("div", { className: "mobile-caret" }, "^")
                  );
                }),
                nt(
                  "div",
                  {
                    id: "riotbar-application-switcher-desktop-close",
                    onClick: function () {
                      return t.props.handleClose();
                    },
                  },
                  nt(
                    "span",
                    {
                      id: "riotbar-application-switcher-desktop-visit-riot-games",
                    },
                    nt(
                      "a",
                      { href: "https://www.riotgames.com/", target: "_blank" },
                      "VISIT RIOT GAMES"
                    )
                  ),
                  nt(Ye, {
                    width: "24",
                    height: "24",
                    _id: "applicationSwitcherDesktopClose",
                  })
                )
              );
            },
          },
          {
            key: "handleSelectTab",
            value: function (t) {
              var n = this.props.tabs.find(function (n) {
                return n.title === t;
              });
              return n
                ? void this.setState({ selectedTab: t })
                : void this.setState({ selectedTab: t });
            },
          },
        ]),
        n
      );
    })(it),
    fr = function () {
      return nt(
        "div",
        { id: "riotbar-pip-container" },
        nt("div", { id: "riotbar-pip" }, nt("div", { id: "riotbar-pip-pulse" }))
      );
    },
    hr = Ct(null),
    mr = Ct({}),
    gr = function () {
      var t = RiotBar.data.applicationSwitcher || {},
        n = t.enabled
          ? Xn.getHomepageURL() || null
          : "https://www.riotgames.com",
        e = Pt(!1),
        r = W(e, 2),
        a = r[0],
        i = r[1],
        o = Ht(mr),
        l = Ht(hr),
        s = o && o.sections ? o.sections[0] : null,
        c = o && o.active_section && s ? s.title : null,
        u = (o && o.sections ? o.sections || [] : []).filter(function (t) {
          return t.title === c;
        }),
        p = Ut(
          function (t) {
            try {
              if (!RiotBar.data.applicationSwitcher.enabled) return !1;
            } catch (n) {
              return !1;
            }
            try {
              t.preventDefault();
            } catch (e) {}
            i(!a);
          },
          [a]
        ),
        b = function () {
          i(!1);
        },
        d = function () {
          if (!document.getElementById("riotbar-page-overlay")) {
            var t = document.createElement("div");
            (t.id = "riotbar-page-overlay"), document.body.appendChild(t);
          }
        },
        f = function () {
          try {
            var t = document.getElementById("riotbar-page-overlay");
            t && t.parentNode.removeChild(t);
          } catch (n) {}
        };
      Ot(
        function () {
          a
            ? ((document.body.className +=
                " riotbar-application-switcher-open"),
              d(),
              o && o.pip_cache_key && nr(o.pip_cache_key))
            : ((document.body.className = document.body.className
                .replace(/riotbar-application-switcher-open/g, "")
                .trim()),
              f());
        },
        [a, o]
      );
      var h = function (t) {
          t.defaultPrevented ||
            On.isDescendantOfClass(t.target, "riotbar-subcontent") ||
            On.isDescendantOfClass(t.target, "riotbar-branding-switcher") ||
            On.isDescendantOfId(t.target, "riotbar-application-switcher") ||
            b();
        },
        m = function (t) {
          if (!t.defaultPrevented) {
            var n = t.key || t.keyCode;
            ("Esc" !== n && "Escape" !== n && 27 !== n) || b();
          }
        };
      return (
        Dt(
          function () {
            a
              ? (document.addEventListener("click", h),
                document.addEventListener("keyup", m))
              : (document.removeEventListener("click", h),
                document.removeEventListener("keyup", m));
          },
          [a]
        ),
        Ot(
          function () {
            o && o.pip_cache_key && er(o.pip_cache_key);
          },
          [o]
        ),
        nt(
          "div",
          {
            id: "riotbar-navmenu",
            className: "".concat(
              Xn.getClassNamePrefix(),
              "-theme riotbar-branding-switcher"
            ),
          },
          nt(
            "span",
            { style: "display: inline-block" },
            nt(
              "a",
              {
                className: "riotbar-logo",
                href: n,
                onClick: p,
                "data-interaction-id": $e("app-switcher", "riot-logo"),
              },
              nt("span", { className: "riot-bar-fist-logo" }),
              t.enabled
                ? nt(Me, {
                    width: "8",
                    height: "5",
                    _id: "mainMenuDownNonHover",
                    domClassName: "non-hover drop",
                  })
                : null,
              t.enabled
                ? nt(Me, {
                    width: "8",
                    height: "5",
                    _id: "mainMenuDownHover",
                    domClassName: "hover drop",
                  })
                : null,
              o && o.pip_cache_key && tr(o.pip_cache_key) ? nt(fr, null) : null
            ),
            nt("span", {
              className: "riotbar-navbar-separator main-logo-separator",
            }),
            nt(
              "span",
              { className: "second-logo" },
              Xn.getHomepageURL()
                ? nt(
                    "a",
                    {
                      href: Xn.getHomepageURL(),
                      "data-interaction-id": $e("app-switcher", "theme-logo"),
                    },
                    Xn.getDesktopLogo()
                  )
                : Xn.getDesktopLogo()
            )
          ),
          t.enabled && o && o.sections
            ? nn(
                nt(dr, {
                  isOpen: a,
                  handleClose: b,
                  tabs: o ? o.sections || [] : [],
                  defaultSelectedTab: u ? u[0] : s,
                }),
                l && l.el.current ? l.el.current : document.body
              )
            : null
        )
      );
    },
    vr = function (t) {
      var n = t.authenticatedLinks,
        e = t.accountHandler;
      return nt(
        at,
        null,
        n
          ? n.map(function (t) {
              var n = [
                "riotbar-account-link",
                t.action ? "riotbar-account-action" : "",
              ];
              return nt(
                "a",
                {
                  className: n.join(" "),
                  onClick: e,
                  href: t.url || null,
                  "data-riotbar-account-action": t.action,
                },
                t.text
              );
            })
          : null
      );
    },
    wr = Ct({ isAuthenicated: !1, name: !1, tag: !1, region: null }),
    yr = function (t) {
      var n = t.accountHandler,
        e = window.RiotBar.__accountUtils.accountComponentProps(),
        r = e.anonymousLinks;
      return nt(
        at,
        null,
        r
          ? r.map(function (t) {
              var e = t.id,
                r = t.action,
                a = t.text,
                i = t.isButton,
                o = [
                  "riotbar-anonymous-link",
                  r ? "riotbar-account-action" : "",
                  i ? "theme-button" : "",
                ];
              return nt(
                "div",
                { className: "riotbar-account-anonymous-link-wrapper" },
                nt(
                  "a",
                  {
                    "data-riotbar-link-id": e,
                    className: o.join(" "),
                    "data-riotbar-account-action": r || null,
                    href: t.url || null,
                    onClick: n,
                  },
                  a
                )
              );
            })
          : null
      );
    },
    kr = document.createEvent("Event");
  kr.initEvent("riotbar_account_authstate_change", !1, !0);
  var xr = function (t) {
      var n = t.children,
        e = { enabled: !1, incidents: [] };
      (RiotBar &&
        RiotBar.data &&
        RiotBar.data.serviceStatus &&
        RiotBar.data.serviceStatus.enabled) ||
        (e.enabled = !1);
      var r = Pt(e),
        a = W(r, 2),
        i = a[0],
        o = a[1],
        l = function () {
          ve()
            .then(function (t) {
              t && t instanceof Array && o({ enabled: !0, incidents: t });
            })
            ["catch"](function (t) {
              me.error(t);
            });
        };
      return (
        Ot(
          function () {
            RiotBar.data.serviceStatus &&
              RiotBar.data.serviceStatus.enabled &&
              !i.enabled &&
              (o({ enabled: !0, incidents: [] }), l());
          },
          [RiotBar.data, i, o]
        ),
        nt(fe.Provider, { value: i }, n)
      );
    },
    _r = function (t) {
      var n = t.onClick;
      return nt(
        "svg",
        {
          width: "68",
          height: "68",
          viewBox: "0 0 68 68",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          onClick: n || void 0,
        },
        nt("rect", {
          width: "68",
          height: "68",
          rx: "24",
          fill: "#F9F9F9",
          fillOpacity: "0.1",
        }),
        nt("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M34.0001 35.4143L40.793 42.2072L42.2072 40.793L35.4143 34.0001L42.2072 27.2073L40.793 25.793L34.0001 32.5859L27.2072 25.793L25.793 27.2072L32.5859 34.0001L25.793 40.793L27.2072 42.2073L34.0001 35.4143Z",
          fill: "#EBEBEB",
        })
      );
    },
    Cr = "rbalert",
    Sr = "rbalertv",
    Rr = 3,
    Lr = function (t) {
      if (!t) return !1;
      if (t.cache_key)
        try {
          var n = window.localStorage.getItem(
            "".concat(Cr).concat(t.cache_key)
          );
          if (n) return !1;
          var e = window.localStorage.getItem(
            "".concat(Sr).concat(t.cache_key)
          );
          if (e && ((e = parseInt(e)), e >= Rr)) return !1;
          if (t.hasOwnProperty("matching_url_patterns")) {
            for (
              var r = window.location.hostname, a = !1, i = 0;
              i < t.matching_url_patterns.length;
              i++
            ) {
              var o = new RegExp(t.matching_url_patterns[i]);
              o.test(r) && (a = !0);
            }
            if (!a) return !1;
          }
        } catch (l) {
          return Dn(l), !0;
        }
      return !0;
    },
    Fr = function (t) {
      try {
        window.localStorage.setItem("".concat(Cr).concat(t.cache_key), "1");
      } catch (n) {
        Dn(n);
      }
    },
    Nr = function (t) {
      try {
        var n = window.localStorage.getItem("".concat(Sr).concat(t.cache_key));
        (n = n ? parseInt(n, 10) : 0),
          n++,
          window.localStorage.setItem(
            "".concat(Sr).concat(t.cache_key),
            n.toString()
          );
      } catch (e) {
        Dn(e);
      }
    },
    Er = function (t) {
      return O(
        { id: t.cache_key, body: t.tagline, title: t.title || t.tagline },
        t
      );
    },
    Mr = function (t) {
      var n = t.alert;
      if (!(n && n.id && n.title && n.hasOwnProperty("body"))) return null;
      var e = Pt(!1),
        r = W(e, 2),
        a = r[0],
        i = r[1],
        o = function () {
          i(!0),
            setTimeout(function () {
              if (n.onClose && "function" == typeof n.onClose)
                try {
                  n.onClose();
                } catch (t) {}
              try {
                RiotBar.alerts.hideAlert(n.id), i(!1);
              } catch (t) {
                i(!1), me.error(t);
              }
            }, 500);
        };
      Ot(
        function () {
          Nr(n), sn(n);
        },
        [n]
      );
      var l = ["riotbar-alert"];
      return (
        a && l.push("riotbar-alert-is-closing"),
        n.theme && l.push("riotbar-alert-custom-theme"),
        nt(
          "div",
          { className: l.join(" ") },
          nt(
            "div",
            { className: "riotbar-alert-inner" },
            n.theme
              ? nt("div", { className: "riotbar-alert-custom-filler" }, " ")
              : null,
            nt(
              "div",
              { className: "riotbar-alert-content" },
              nt(
                "div",
                { className: "riotbar-alert-content-inner" },
                n.logo_asset
                  ? nt(
                      "div",
                      { className: "riotbar-alert-logo" },
                      nt("img", {
                        src: n.logo_asset.url,
                        alt: n.title,
                        title: n.title,
                      })
                    )
                  : nt("div", { className: "riotbar-alert-title" }, n.title),
                nt("div", { className: "riotbar-alert-body" }, n.body)
              )
            ),
            nt(
              "div",
              { className: "riotbar-alert-ctas-container" },
              nt("div", { className: "riotbar-alert-cta-filler" }, " "),
              n.buttons && n.buttons.length
                ? nt(
                    "div",
                    { className: "riotbar-alert-buttons-container" },
                    n.buttons.slice(0, 2).map(function (t) {
                      return t.text && t.id
                        ? nt(
                            "a",
                            {
                              className:
                                "riotbar-alert-button" +
                                (t.secondary
                                  ? " riotbar-alert-button-secondary"
                                  : ""),
                              "data-ping-alert-id": t.id,
                              "data-interaction-id": t.id,
                              key: t.id,
                              onClick: t.onClick || o,
                              href: t.href || void 0,
                              target: "_blank",
                            },
                            t.text
                          )
                        : null;
                    })
                  )
                : null,
              nt(
                "div",
                { className: "riotbar-alert-close-container" },
                nt(_r, { onClick: o })
              )
            )
          )
        )
      );
    },
    Tr = Object.freeze({ default: cn }),
    Ar = K(Tr),
    Br = J(function (t) {
      function n() {
        var t = !1,
          n = "animation",
          e = "",
          r = "Webkit Moz O ms Khtml".split(" "),
          a = "",
          i = document.createElement("div");
        if ((void 0 !== i.style.animationName && (t = !0), t === !1))
          for (var o = 0; o < r.length; o++)
            if (void 0 !== i.style[r[o] + "AnimationName"]) {
              (a = r[o]),
                (n = a + "Animation"),
                (e = "-" + a.toLowerCase() + "-"),
                (t = !0);
              break;
            }
        return t;
      }
      function e(t) {
        var n;
        return (
          window.localStorage && (n = window.localStorage[t]),
          n ? JSON.parse(n) : null
        );
      }
      function r(t) {
        var n = t.split(".").reverse();
        return n.length < 0
          ? null
          : n.length >= 3 &&
            n[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i)
          ? n[2] + "." + n[1] + "." + n[0]
          : n[1] + "." + n[0];
      }
      function a(t, n) {
        var e = "";
        (e = t), (e += "?");
        for (var r in n)
          n.hasOwnProperty(r) && n[r] && (e += r + "=" + n[r] + "&");
        return e;
      }
      function i(t, e, r) {
        switch (
          ((p = document.createElement("div")),
          On.addClass(p, "riotbar-cookie-policy-v2"),
          On.addClass(p, "cookie-link"),
          On.addClass(p, "hidden"),
          e)
        ) {
          case "footer":
            On.addClass(p, "footer");
            break;
          case "corner-right":
            On.addClass(p, "corner-button"), On.addClass(p, "bottom-right");
            break;
          case "corner-left":
          default:
            On.addClass(p, "corner-button"), On.addClass(p, "bottom-left");
        }
        On.addClass(p, "dark"),
          n() ? On.addClass(p, "expanding") : On.addClass(p, "static"),
          (p.innerHTML = r({ id: t }) || ""),
          (p.onclick = function (t) {
            t = t || window.event;
            var n = t.target || t.srcElement;
            "a" !== n.nodeName.toLowerCase() &&
              window.truste &&
              window.truste.eu &&
              window.truste.eu.clickListener();
          }),
          d.appendChild(p);
      }
      function o(t) {
        var n = document.body || document.getElementsByTagName("body")[0];
        (b = document.createElement("div")),
          (b.id = f),
          On.addClass(b, "riotbar-cookie-policy-v2"),
          On.addClass(b, "cookie-banner"),
          On.addClass(b, "hidden"),
          t && On.addClass(b, t),
          window.RiotBar &&
          window.RiotBar.alerts &&
          window.RiotBar.data &&
          window.RiotBar.data.cookiePolicyV2 &&
          window.RiotBar.data.cookiePolicyV2.enabled
            ? (On.getCookie("notice_gdpr_prefs") ||
                window.RiotBar.alerts.showAlert({
                  id: "cookie-policy-v2",
                  title: "Cookie Policy",
                  body: "To help personalize content to your interests, remember you, tailor and measure ads, provide a secure experience and improve Riot Services, we use cookies. By using or navigating this site, you agree to collection of information on and off our site through cookies. Learn more, including about available controls, using the More Information link. You can use these controls now or later.",
                  onClose: function () {
                    var t = {
                      source: "preference_manager",
                      message: "submit_preferences",
                      data: "0,1,2,3",
                    };
                    try {
                      truste.eu.actmessage(t);
                    } catch (n) {
                      On.setCookie("notice_gdpr_prefs", "0,1,2,3", {
                        expires: new Date(Date.now() + 12096e5).toUTCString(),
                      });
                    }
                  },
                  buttons: [
                    {
                      id: "cookie-policy-more-info",
                      text: "More Information",
                      onClick: function () {
                        try {
                          truste.eu.prefview(),
                            window.RiotBar.alerts.hideAlert("cookie-policy-v2");
                        } catch (t) {
                          window.RiotBar.alerts.hideAlert("cookie-policy-v2");
                        }
                      },
                    },
                  ],
                }),
              (b = c("#" + f).first()))
            : (n.insertBefore(b, n.firstChild), (b = c(b)));
      }
      function l() {
        c(".riotbar-cookie-policy-v2.hidden").removeClass("hidden"),
          window.jQuery("#" + u.urlParams.c + ", #" + f).off();
      }
      function s(t) {
        try {
          var n = JSON.parse(t.originalEvent.data);
          if ("preference_manager" === n.source)
            switch (n.message) {
              case "submit_preferences":
            }
        } catch (e) {}
      }
      var c,
        u,
        p,
        b,
        d = document.body || document.getElementsByTagName("body")[0],
        f = "consent_blackbar",
        h = {
          jQueryJS:
            "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
          createDomElements: !0,
          disableDefaultStyling: !1,
          linkStyle: "corner-left",
          scriptUrl: "//consent.trustarc.com/notice",
          styles: null,
          html: Ar,
          urlParams: {
            domain: r(window.location.hostname),
            c: "teconsent",
            js: "bb",
            noticeType: "bb",
            gtm: 1,
            cdn: 1,
            ios: 0,
            pn: 0,
            text: !0,
            country: null,
            language: null,
            responsive: "true",
            pcookie: 1,
          },
        },
        m = (t.exports = {
          commonUtil: On,
          config: {},
          init: function (t) {
            (this.config = u = On.deepOverride(h, t || {}, 1)),
              u.styles && !u.disableDefaultStyling && On.appendStyles(u.styles),
              On.ensureScript("jQuery", { url: u.jQueryJS }).then(function () {
                (c = window.jQuery),
                  c(window).on("message", s),
                  u.createDomElements &&
                    (i(u.urlParams.c, u.linkStyle, u.html), o(u.theme)),
                  window
                    .jQuery("#" + u.urlParams.c + ", #" + f + ".riot-banner")
                    .on("DOMSubtreeModified propertychange", l),
                  On.appendScript(a(u.scriptUrl, u.urlParams));
              }),
              (window.RiotCookieBar = {
                hasCPA: this.hasFunctionalCookieConsent,
                getGDPRConsent: this.getGDPRConsent,
                hasFunctionalCookieConsent: this.hasFunctionalCookieConsent,
                hasAdvertisingCookieConsent: this.hasAdvertisingCookieConsent,
                hasSocialCookieConsent: this.hasSocialCookieConsent,
              });
          },
          getCookieConsentLevel: function () {
            var t,
              n = e("truste.eu.cookie.notice_preferences"),
              r = On.getCookie("notice_preferences");
            return (t = n
              ? Number(n.value.split(":").join(""))
              : r
              ? Number(r.split(":").join(""))
              : 3);
          },
          getGDPRConsent: function () {
            var t;
            try {
              t = e("truste.eu.cookie.notice_gdpr_prefs").value;
            } catch (n) {
              t = On.getCookie("notice_gdpr_prefs");
            }
            if (!t || t.indexOf(":") === -1) return null;
            var r = t
                .split(":")[0]
                .split(",")
                .map(function (t) {
                  return parseInt(t);
                }),
              a = ["essential", "functional", "analytics", "advertising"],
              i = {};
            return (
              a.forEach(function (t, n) {
                i[t] = r.indexOf(n) !== -1;
              }),
              i
            );
          },
          hasGDPRConsent: function (t, n) {
            var e = m.getGDPRConsent();
            return e ? e[t] : m.getCookieConsentLevel() >= n;
          },
          hasFunctionalCookieConsent: function () {
            return m.hasGDPRConsent("functional", 1);
          },
          hasSocialCookieConsent: function () {
            return m.hasGDPRConsent("analytics", 2);
          },
          hasAdvertisingCookieConsent: function () {
            return m.hasGDPRConsent("advertising", 3);
          },
        });
    }),
    Pr = Br.commonUtil,
    Ir =
      (Br.config,
      Br.init,
      Br.getCookieConsentLevel,
      Br.getGDPRConsent,
      Br.hasGDPRConsent,
      Br.hasFunctionalCookieConsent,
      Br.hasSocialCookieConsent,
      Br.hasAdvertisingCookieConsent,
      function () {
        var t = Pt([]),
          n = W(t, 2),
          e = n[0],
          r = n[1],
          a = jt(),
          i = Ht(mr),
          o = function (t) {
            (t && t.id && t.title && t.body) ||
              Dn(
                "Invalid alert data. Must pass an object with id, title and body properties."
              ),
              r([].concat(V(e), [t]));
          },
          l = function (t) {
            var n = e.find(function (n) {
              return n.id === t;
            });
            n && Fr(n);
            var a = e.filter(function (n) {
              return n.id !== t;
            });
            r(V(a));
          },
          s = function () {
            var t = document.querySelector(
              ".riotbar-cookie-policy-v2.cookie-link"
            );
            t &&
              a.current &&
              (t.style.bottom =
                a.current.getBoundingClientRect().height + 10 + "px");
          };
        return (
          Ot(
            function () {
              RiotBar.alerts = { hideAlert: l, showAlert: o };
            },
            [l, o]
          ),
          Ot(
            function () {
              if (i && i.alerts)
                try {
                  if (
                    RiotBar.data.cookiePolicyV2 &&
                    RiotBar.data.cookiePolicyV2.enabled &&
                    !Pr.getCookie("notice_gdpr_prefs")
                  ) {
                    var t = e.find(function (t) {
                      return "cookie-policy-v2" === t.id;
                    });
                    if (!t) return;
                  }
                  for (
                    var n = [],
                      a = function (t) {
                        var r = e.find(function (n) {
                          return n.id === i.alerts[t].cache_key;
                        });
                        Lr(i.alerts[t]) && !r && n.push(Er(i.alerts[t]));
                      },
                      o = 0;
                    o < i.alerts.length;
                    o++
                  )
                    a(o);
                  n.length > 0 && r([].concat(V(e), n));
                } catch (l) {
                  Dn(l);
                }
            },
            [e, i, r]
          ),
          Dt(
            function () {
              s();
            },
            [e]
          ),
          nt(
            "div",
            { id: "riotbar-alerts-container", ref: a },
            e && e.length > 0 ? nt(Mr, { alert: e[0] }) : null
          )
        );
      }),
    Or = function () {
      return nn(nt(Ir, null), document.body);
    },
    Dr = function (t) {
      var n = t.children,
        e = Pt(null),
        r = W(e, 2),
        a = r[0],
        i = r[1],
        o = Pt("en_US"),
        l = W(o, 2),
        s = l[0],
        c = l[1];
      return (
        Ot(
          function () {
            fetch(zr(s))
              .then(function (t) {
                return t.json();
              })
              .then(function (t) {
                if (t && t.sections && 0 === t.sections.length)
                  throw new Error("No sections found in the content");
                return t;
              })
              .then(jr)
              .then(i)
              ["catch"](function (t) {
                Dn(t), "en_US" !== s && c("en_US");
              });
          },
          [i, s, c]
        ),
        Ot(
          function () {
            if (a && a.sections)
              for (
                var t = function (t) {
                    var n = a.sections[t];
                    n.custom_event &&
                      n.custom_event.colors.tagline_font_family &&
                      or(n.custom_event.colors.tagline_font_family)
                        .then(function () {})
                        ["catch"](function (t) {
                          Dn(
                            "Unable to load the font "
                              .concat(
                                n.custom_event.colors.tagline_font_family,
                                " - "
                              )
                              .concat(t.toString())
                          );
                        });
                  },
                  n = 0;
                n < a.sections.length;
                n++
              )
                t(n);
          },
          [a]
        ),
        nt(mr.Provider, { value: a }, n)
      );
    },
    jr = function (t) {
      var n = function (t) {
        return new Promise(function (n, e) {
          var r = new Image();
          (r.onload = function () {
            n();
          }),
            (r.onerror = function () {
              n();
            }),
            (r.src = t);
        });
      };
      return new Promise(function (e, r) {
        var a = [];
        (t && t.sections) || e();
        for (var i = 0; i < t.sections.length; i++) {
          var o = t.sections[i];
          o.background_asset_desktop &&
            a.push(n(o.background_asset_desktop.url)),
            o.background_asset_mobile &&
              a.push(n(o.background_asset_mobile.url)),
            o.custom_event &&
              o.custom_event.logo_asset &&
              a.push(n(o.custom_event.logo_asset.url));
        }
        if (t.alerts)
          for (var l = 0; l < t.alerts.length; l++) {
            var s = t.alerts[l];
            s.background_asset_desktop &&
              a.push(n(s.background_asset_desktop.url)),
              s.background_asset_mobile &&
                a.push(n(s.background_asset_mobile.url)),
              s.logo_asset && a.push(n(s.logo_asset.url));
          }
        Promise.all(a)
          .then(function () {
            e(t);
          })
          ["catch"](function (n) {
            Dn(n), e(t);
          });
      });
    },
    zr = function (t) {
      var n = t ? t : "en_US",
        e = RiotBar.data.applicationSwitcher.contentManifestCDN;
      return "".concat(e).concat(n, ".json");
    };
  On.appendStyles(jn);
  var Ur = ue("navigation"),
    Hr = null;
  window.Promise &&
    document.fonts &&
    (Hr = new Promise(function (t) {
      document.fonts.onloadingdone = function (n) {
        n.fontfaces.filter(function (t) {
          return "FF Mark W05" == t.family;
        }) && t(1);
      };
    }));
  var Wr = hr.Provider,
    Vr = (function (t) {
      function n() {
        var t;
        return (
          T(this, n),
          (t = H(this, j(n).call(this))),
          (t.state = {
            sideMenuOpen: !1,
            subMenuOpen: !1,
            subItemText: "",
            subItemItems: [],
            activeLink: null,
            activeTouchpoint: null,
            hasTitle: !1,
            title: null,
            touchpoints: null,
            authenticatedAccountLinks: null,
          }),
          (t.openSideMenu = t.openSideMenu.bind(U(t))),
          (t.closeSideMenu = t.closeSideMenu.bind(U(t))),
          (t.openSubMenu = t.openSubMenu.bind(U(t))),
          (t.closeSubMenu = t.closeSubMenu.bind(U(t))),
          (t.updateParentMargin = t.updateParentMargin.bind(U(t))),
          (t.rootRenderElementRef = rt()),
          (window.RiotBar.updateParentMargin = t.updateParentMargin),
          document.addEventListener("click", function (n) {
            On.isDescendantOfClass(n.target, "riotbar-navmenu-dropdown") ||
              On.isDescendantOfId(n.target, "riotbar-explore") ||
              t.closeSideMenu();
          }),
          (window.RiotBar.navigation = {
            setActiveLink: t.setActiveLink.bind(U(t)),
            setActiveTouchpoint: t.setActiveTouchpoint.bind(U(t)),
          }),
          (window.RiotBar.__internalSetState = t.setState.bind(U(t))),
          t
        );
      }
      return (
        D(n, t),
        B(n, [
          {
            key: "setActiveLink",
            value: function (t) {
              this.setState({ activeLink: t });
            },
          },
          {
            key: "setActiveTouchpoint",
            value: function (t) {
              this.setState({ activeTouchpoint: t });
            },
          },
          {
            key: "openSubMenu",
            value: function (t, n) {
              this.setState({
                subMenuOpen: !0,
                subItemText: t,
                subItemItems: n,
              });
            },
          },
          {
            key: "closeSubMenu",
            value: function () {
              this.setState({ subMenuOpen: !1 });
            },
          },
          {
            key: "openSideMenu",
            value: function (t) {
              this.setState({ sideMenuOpen: !0 });
            },
          },
          {
            key: "closeSideMenu",
            value: function () {
              this.setState({ sideMenuOpen: !1, subMenuOpen: !1 });
            },
          },
          {
            key: "componentDidMount",
            value: function () {
              this.updateParentMargin();
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              this.updateParentMargin();
            },
          },
          {
            key: "render",
            value: function () {
              var t = this.state,
                n = t.activeLink,
                e = t.activeTouchpoint,
                r = t.sideMenuOpen,
                a = RiotBar.data.touchpoints.links || [],
                i = RiotBar.data.theme.desktopTitle || null,
                o = [
                  "i18n-en",
                  "riotbar-mobile-responsive",
                  "".concat(
                    Xn.getClassNamePrefix(),
                    "-theme riotbar-base-element"
                  ),
                  r ? "sidebar-open" : "",
                ],
                l = ["riotbar-right-content", "riotbar-show-links"],
                s = !(RiotBar.data.account.enabled || (a && 0 !== a.length));
              return nt(
                "div",
                {
                  id: "riotbar-bar-wrapper",
                  ref: this.rootRenderElementRef,
                  className:
                    RiotBar.data.theme && RiotBar.data.theme.isSticky
                      ? "riotbar-sticky"
                      : "",
                },
                nt(
                  ln,
                  null,
                  nt(
                    Wr,
                    {
                      value: {
                        el: this.rootRenderElementRef,
                        updateParentMargin: this.updateParentMargin,
                      },
                    },
                    nt(
                      xr,
                      null,
                      nt(
                        Dr,
                        null,
                        nt(
                          "div",
                          {
                            id: "riotbar-bar",
                            className: o.join(" "),
                            lang: "en",
                          },
                          nt(
                            "div",
                            {
                              id: "riotbar-left-content",
                              className: "riotbar-left-content",
                            },
                            nt(gr, null)
                          ),
                          nt(
                            "div",
                            {
                              id: "riotbar-bar-content",
                              className: "riotbar-bar-content",
                            },
                            nt(Oe, { fontLoaded: Hr, title: i })
                          ),
                          nt(
                            "div",
                            {
                              id: "riotbar-right-content",
                              className: l.join(" "),
                            },
                            s
                              ? null
                              : nt(
                                  "div",
                                  { id: "riotbar-mobile-nav" },
                                  nt(
                                    "a",
                                    {
                                      id: "riotbar-explore",
                                      class: "riotbar-explore",
                                      onClick: this.openSideMenu,
                                    },
                                    nt(Ur, {
                                      width: "32",
                                      height: "32",
                                      _id: "burgerNav",
                                    })
                                  )
                                ),
                            nt(Ee, null),
                            nt(on, null),
                            nt(Xe, {
                              openSubMenu: this.openSubMenu,
                              closeSideMenu: this.closeSideMenu,
                              closeSubMenu: this.closeSubMenu,
                              sideMenuOpen: this.state.sideMenuOpen,
                              subMenuOpen: this.state.subMenuOpen,
                              subItemText: this.state.subItemText,
                              subItemItems: this.state.subItemItems,
                              activeLink: n,
                              activeTouchpoint: e,
                              touchpoints: a,
                              authenticatedAccountLinks:
                                RiotBar.data.account.authenticatedLinks || [],
                            })
                          )
                        ),
                        nt(Or, null)
                      )
                    )
                  )
                )
              );
            },
          },
          {
            key: "updateParentMargin",
            value: function () {
              if (
                !this.rootRenderElementRef ||
                !this.rootRenderElementRef.current
              )
                return null;
              var t = this.rootRenderElementRef.current.parentNode;
              RiotBar.data.renderInto
                ? document.body.style.marginTop &&
                  (document.body.style.marginTop = "initial")
                : (t = document.body);
              for (
                var n = 0,
                  e = this.rootRenderElementRef.current.children,
                  r = 0;
                r < e.length;
                r++
              )
                "riotbar-application-switcher" !== e[r].id &&
                  (n += e[r].getBoundingClientRect().height);
              t.style.marginTop = n + "px";
            },
          },
        ]),
        n
      );
    })(it);
  On.appendStyles(jn);
  var Gr = function (t) {
      return new Promise(function (n) {
        function e() {
          (a = document.getElementById(RiotBar.data.renderInto)),
            a ? r() : setTimeout(e, 50);
        }
        function r() {
          Yn.init(),
            On.appendStyles(Xn.getStyles()),
            (window.RiotBar.renderRoot = a),
            xt(nt(Vr, null), a);
          var e = document.getElementById("riotbar-bar");
          (t.base = e),
            (t.barContent = document.getElementById("riotbar-bar-content")),
            (t.rightBarContent = document.getElementById(
              "riotbar-right-content"
            )),
            (document.getElementsByTagName("body")[0].className +=
              " riotbar-present"),
            n();
        }
        var a = !1;
        RiotBar.data.renderInto
          ? "string" == typeof RiotBar.data.renderInto &&
            "" !== RiotBar.data.renderInto.trim()
            ? e()
            : "object" === N(Riotbar.data.renderInto)
            ? ((a = On.determineRenderIntoElement(RiotBar.data.renderInto)),
              r())
            : ((a = document.createElement("div")),
              (a.className = "riotbar-root"),
              document.body.appendChild(a),
              r())
          : ((a = document.createElement("div")),
            (a.className = "riotbar-root"),
            document.body.appendChild(a),
            r());
      });
    },
    Zr = document.createEvent("Event");
  Zr.initEvent("riotbar_onload", !1, !0);
  var qr = J(function (t) {
      var n = [],
        e = (t.exports = {
          gatherDefaults: function (t, n) {
            return (
              On.map(n, function (e) {
                t[e] = n[e].defaults;
              }),
              t
            );
          },
          getPluginStyles: function (t, n) {
            n.styles && t.push(n.styles);
          },
          addPluginExtensions: function (t, n, e) {
            e.extensions && (t[n] = e.extensions);
          },
          toggleActive: function (t, e) {
            var r = { trigger: t, target: e };
            n.push(r), On.toggleClass(e, "active");
          },
          removeActive: function (t) {
            for (
              var e = t.target || window.event.srcElement, r = 0;
              r < n.length;
              r++
            ) {
              var a = n[r],
                i = a.trigger,
                o = a.target;
              o.contains(e) ||
                i.contains(e) ||
                ((o.className = o.className.replace("active", "")),
                n.splice(r, 1),
                r--);
            }
          },
        });
      On.addEvent(document.body, "click", e.removeActive);
    }),
    Xr =
      (qr.gatherDefaults,
      qr.getPluginStyles,
      qr.addPluginExtensions,
      qr.toggleActive,
      qr.removeActive,
      J(function (t) {
        var n;
        try {
          n = JSON.parse("{internal_regions}");
        } catch (e) {
          n = {};
        }
        for (
          var r = {
              na: ["en_US"],
              euw: ["en_GB", "de_DE", "es_ES", "fr_FR", "it_IT"],
              eune: ["en_PL", "pl_PL", "el_GR", "ro_RO", "hu_HU", "cs_CZ"],
              lan: ["es_MX"],
              las: ["es_AR"],
              br: ["pt_BR"],
              jp: ["ja_JP"],
              ru: ["ru_RU"],
              tr: ["tr_TR"],
              oce: ["en_AU"],
              kr: ["ko_KR"],
              pbe: ["en_BE"],
              garena: [
                "en_PH",
                "en_SGMY",
                "ms_MY",
                "id_ID",
                "th_TH",
                "vn_VN",
                "zh_TW",
              ],
            },
            a = [],
            i = Object.keys(r),
            o = ["garena", "pbe"],
            l = 0;
          l < i.length;
          l++
        )
          o.includes(i[l]) || a.push.apply(a, V(r[i[l]]));
        var s = {
            na: "North America",
            euw: "EU West",
            eune: "EU Nordic & East",
            lan: "Latin America North",
            las: "Latin America South",
            br: "Brazil",
            tr: "Turkey",
            ru: "Russia",
            oce: "Oceania",
            kr: "Republic of Korea",
            jp: "Japan",
            napreprod: "NA PreProd",
            pbe: "PBE",
            garena: "",
          },
          c = {
            ar: "اللغة العربية",
            en: "English",
            de: "Deutsch",
            es: "Español",
            fr: "Français",
            it: "Italiano",
            pl: "Polski",
            ru: "Русский",
            pt: "Português",
            el: "Ελληνικά",
            ro: "Română",
            tr: "Türkçe",
            hu: "Magyar",
            cs: "Čeština",
            ko: "한국어",
            ja: "日本語",
            zh: "繁體中文",
            vn: "Tiếng Việt",
            th: "คนไทย",
            id: "Indonesian",
            ms: "Malaysian",
          },
          u = (t.exports = {
            includeInternalRegions: function () {
              r = {};
              for (var t = Object.keys(n), e = 0; e < t.length; e++) {
                var a = t[e];
                void 0 === r[a] && (r[a] = n[a].locales),
                  void 0 === s[a] && (s[a] = n[a].name);
              }
            },
            getAllLanguagesWithRegions: function (t) {
              void 0 === t && (t = u.getDefaultLandingURLPattern());
              for (var n = [], e = Object.keys(r), a = 0; a < e.length; a++)
                for (var i = e[a], o = r[i], l = 0; l < o.length; l++) {
                  var s = o[l],
                    p = s.substr(0, 2).toLowerCase(),
                    b = c[p] || c.en,
                    d = t
                      .replace("{{lang}}", p)
                      .replace("{{region}}", i)
                      .replace("{{locale}}", s)
                      .replace(
                        "{{locale-hyphen}}",
                        s.toLowerCase().replace("_", "-")
                      );
                  n.push({
                    region: i,
                    locale: s,
                    name: b + " (" + i.toUpperCase() + ")",
                    landingUrl: d,
                  });
                }
              return n;
            },
            getLocaleMappings: function () {
              return r;
            },
            getRegionNames: function () {
              return s;
            },
            getLanguageNames: function () {
              return c;
            },
            isRegion: function (t) {
              return s.hasOwnProperty(t);
            },
            getRegionLang: function (t, n) {
              var e;
              return (
                (e = u.supportsLanguage(t, n) ? n : r[t][0]), e.substr(0, 2)
              );
            },
            supportsLanguage: function (t, n) {
              if (!u.isRegion(t) || !r.hasOwnProperty(t)) return !0;
              for (
                var e = r[t], a = n.substr(0, 2), i = 0, o = e.length;
                i < o;
                i++
              )
                if (0 === e[i].indexOf(a)) return !0;
              return !1;
            },
            localeForRegion: function (t, n) {
              if (!u.isRegion(t)) return "en_US";
              var e = r[t];
              if (!e) return "en_US";
              var a,
                i = e.length,
                o = e[0];
              if (i > 1)
                for (var l = 0; l < i; l += 1)
                  if (((a = e[l]), a.substr(0, 2) === n)) {
                    o = a;
                    break;
                  }
              return o;
            },
            getDefaultLocales: function () {
              return On.deepOverride(
                u.getLocaleMappings(),
                {
                  kr: [
                    {
                      locale: "ko_KR",
                      lang: "ko",
                      languageName: "한국어",
                      landingUrl: "https://www.leagueoflegends.co.kr/",
                    },
                  ],
                  pbe: void 0,
                },
                1
              );
            },
            getDefaultLocaleCodes: function () {
              return a;
            },
            getDefaultLandingURLPattern: function () {
              return "http://{{region}}.leagueoflegends.com/{{lang}}";
            },
          });
      })),
    Yr =
      (Xr.includeInternalRegions,
      Xr.getAllLanguagesWithRegions,
      Xr.getLocaleMappings,
      Xr.getRegionNames,
      Xr.getLanguageNames,
      Xr.isRegion,
      Xr.getRegionLang,
      Xr.supportsLanguage,
      Xr.localeForRegion,
      Xr.getDefaultLocales,
      Xr.getDefaultLocaleCodes,
      Xr.getDefaultLandingURLPattern,
      J(function (t) {
        t.exports = {
          initialized: !1,
          config: {},
          defaults: { enabled: !1, settings: null },
          init: function (n) {
            if (RiotBar.data.cookiePolicyV2.enabled) {
              var e = On.determineDeferredFilePrefix();
              On.ensureScript("RiotBar.plugins.cookiePolicyV2Deferred", {
                url:
                  "https://lolstatic-a.akamaihd.net/riotbar/live/1.1.5/" +
                  e +
                  "en_US-defer-cookie-policy-v2.js",
              }).then(function () {
                if (!t.exports.initialized) {
                  t.exports.initialized = !0;
                  var n = window.RiotBar.plugins.cookiePolicyV2Deferred;
                  n.init(RiotBar.data.cookiePolicyV2);
                }
              });
            }
          },
        };
      })),
    $r =
      (Yr.initialized,
      Yr.config,
      Yr.defaults,
      Yr.init,
      J(function (t) {
        t.exports = {
          activeLink: null,
          config: {},
          linksById: {},
          styles: null,
          defaults: {
            enabled: !0,
            title: null,
            links: null,
            activeLink: null,
            activeTouchpoint: null,
            homepageUrl: null,
          },
          init: function (t, n) {},
        };
      })),
    Jr =
      ($r.activeLink,
      $r.config,
      $r.linksById,
      $r.styles,
      $r.defaults,
      $r.init,
      On.logError),
    Kr = function (t, n) {
      function e(t, n) {
        return t + n.toUpperCase();
      }
      function r(t) {
        var n = "https://"
          .concat(
            t.useStageRSO ? "stage.login.i" : "login",
            ".leagueoflegends.com/?redirect_uri="
          )
          .concat(
            encodeURIComponent(t.redirectURI || window.location.href),
            "&lang="
          )
          .concat(f, "&region=")
          .concat(o);
        return n;
      }
      function a(t) {
        return "https://"
          .concat(
            t.useStageRSO ? "stage.auth.accounts" : "auth",
            ".riotgames.com/authorize?client_id="
          )
          .concat(t.clientName)
          .concat(
            t.responseType ? "&response_type=".concat(t.responseType) : ""
          )
          .concat(t.scope ? "&scope=".concat(t.scope) : "", "&redirect_uri=")
          .concat(
            encodeURIComponent(t.redirectURI || window.location.href),
            "&ui_locales="
          )
          .concat(i(), "\n    ");
      }
      function i() {
        var t = { "zh-tw": "zh-Hant", "es-mx": "es-419", "pt-br": "pt-BR" };
        return Object.prototype.hasOwnProperty.call(t, h)
          ? t[h]
          : h.substr(0, 2);
      }
      var o = "na",
        l = "leagueoflegends.com",
        s = RiotBar.data.account.currentDomain || null;
      s || (s = On.getCurrentDomain(l));
      var c = Xr.getRegionNames(),
        u = [o];
      On.map(c, function (t) {
        t !== o && u.push(t);
      });
      var p = {
          token: "PVPNET_TOKEN_",
          user: "PVPNET_ACCT_",
          lang: "PVPNET_LANG",
          region: "PVPNET_REGION",
          userid: "PVPNET_ID_",
          idHint: "id_hint",
        },
        b = { name: !1, tag: !1, region: o, isAuthenticated: !1 },
        d = Object.assign({}, b),
        f = "en",
        h = "en_US",
        m = {
          cookies: {
            token: e(p.token, o),
            user: e(p.user, o),
            lang: p.lang,
            region: p.region,
            userid: e(p.userid, o),
            idHint: p.idHint,
          },
          login: function () {
            try {
              var t = RiotBar.data.account.rso;
              t.useCustomClient
                ? On.window.location.assign(a(t))
                : On.window.location.assign(r(t));
            } catch (n) {
              Jr("Error calling login: " + n);
            }
          },
          logout: function () {
            try {
              var t = RiotBar.data.account.rso;
              t.useCustomClient
                ? On.window.location.assign(a(t))
                : On.window.location.assign(
                    "https://"
                      .concat(
                        t.useStageRSO ? "stage.login.i" : "login",
                        ".leagueoflegends.com/out?redirect_uri="
                      )
                      .concat(encodeURIComponent(On.window.location.href))
                  );
            } catch (n) {
              Jr("Error calling logout: " + n);
            }
          },
          recoverPassword: function () {
            var t = RiotBar.data.account.rso;
            t.useStageRSO
              ? On.window.location.assign(
                  "https://stage.recovery.accounts.riotgames.com/".concat(i())
                )
              : On.window.location.assign(
                  "https://recovery.riotgames.com/".concat(i())
                );
          },
          recoverUsername: function () {
            var t = RiotBar.data.account.rso;
            t.useStageRSO
              ? On.window.location.assign(
                  "https://stage.recovery.accounts.riotgames.com/".concat(i())
                )
              : On.window.location.assign(
                  "https://recovery.riotgames.com/".concat(i())
                );
          },
          management: function () {
            var t = RiotBar.data.account.rso;
            t.useStageRSO
              ? On.window.location.assign(
                  "https://stage.auth.account.riotgames.com/account"
                )
              : On.window.location.assign(
                  "https://account.riotgames.com/account"
                );
          },
          getRegion: function () {
            return o;
          },
          getGlobalAccount: function () {
            var t, n, e;
            (t = o), (n = m.getLang());
            var r = On.getCookie(p.idHint);
            if (r) {
              var a = un(r, "tag");
              a && Xr.isRegion(a) && (t = a);
              var i = un(r, "lang");
              i && Xr.getLanguageNames().hasOwnProperty(i) && (n = i);
            }
            return (
              (e = Xr.localeForRegion(t, n)),
              {
                summoner: d.name,
                gameTag: d.name,
                region: d.region,
                lang: n,
                locale: e,
              }
            );
          },
          getRegionName: function (t) {
            return (t = t || o), c.hasOwnProperty(t) ? c[t] : o;
          },
          getLocale: function () {
            return h;
          },
          getLang: function () {
            return f;
          },
          getSummonerName: function () {
            return d.name;
          },
          getURL: function (t) {
            return n.urls.hasOwnProperty(t) ? n.urls[t] : "#";
          },
          setURL: function (t, e) {
            n.urls[t] = e;
          },
          supportsPlayerRegion: function () {
            var n, e, r, a, i;
            if (
              ((n = t.supportedRegions),
              (e = m.getGlobalAccount()),
              (r = e.region),
              On.isArray(n) && e.summoner)
            ) {
              for (a = 0, i = n.length; a < i; a++) if (n[a] === r) return !0;
              return !1;
            }
            return !0;
          },
          getPvpnetId: function () {
            var t = On.getCookie(m.cookies.token),
              n = On.getCookie(m.cookies.userid);
            return t && n;
          },
          isEmail: function (t) {
            var n = /^([^@\s\t]+@[^@\s\t\.]+(\.[^@\s\t\.]*)?\.[^@\s\t\.]+)$/;
            return n.test(t);
          },
          getIDHint: function () {
            var t = On.getCookie(p.idHint);
            return !!t && t;
          },
          isRegionlessAccount: function () {
            var t = m.getIDHint();
            if (!t) return !1;
            var n = un(t, "region");
            return !n;
          },
          initializeAuthState: function () {
            d = Object.assign({}, b);
            var t = On.getCookie(p.idHint);
            if (!t) return d;
            d.isAuthenticated = !0;
            var n = un(t, "game_name");
            n &&
              ((n = decodeURIComponent(
                n.replace(/\+/g, " ").replace(/[<">]/g, "")
              )),
              (d.name = n));
            var e = un(t, "tag");
            e && Xr.isRegion(e) && (d.region = e);
            var r = un(t, "tag_line");
            return r && (d.tag = r), d;
          },
          getAuthState: function () {
            return d;
          },
          __setAuthState: function (t) {
            if (!t || "object" !== N(t))
              throw new Error("Argument passed must be an object.");
            for (
              var n = Object.keys(d),
                e = ["isAuthenticated"],
                r = Object.keys(t),
                a = 0;
              a < r.length;
              a++
            )
              if (!n.includes(r[a]))
                throw new Error("Invalid property '" + r[a] + "'");
            for (var a = 0; a < e.length; a++)
              if (!r.includes(e[a]))
                throw new Error("Missing required property '" + e[a] + "'");
            return (d = Object.assign(b, t));
          },
        };
      return m;
    },
    Qr = {
      invalidSummonerName: "j:null",
      cookieGeo: "geo",
      cookieGeoDebug: "geo_debug",
    },
    ta =
      (Qr.invalidSummonerName,
      Qr.cookieGeo,
      Qr.cookieGeoDebug,
      function (t, n) {
        var e = On.getCurrentDomain(),
          r = "en_US",
          a = "na",
          i = {
            ensurePVPNetCookies: function () {
              i.ensureLangCookie(), i.ensureRegionCookie();
            },
            ensureLangCookie: function () {
              if (!On.getCookie(n.cookies.lang)) {
                var t = new Date();
                t.setTime(new Date().getTime() + 12096e5),
                  On.setCookie(n.cookies.lang, r, {
                    expires: t.toGMTString(),
                    path: "/",
                    domain: e,
                  });
              }
            },
            ensureRegionCookie: function () {
              if (!On.getCookie(n.cookies.region)) {
                var t = new Date();
                t.setTime(new Date().getTime() + 12096e5),
                  On.setCookie(n.cookies.region, a, {
                    expires: t.toGMTString(),
                    path: "/",
                    domain: e,
                  });
              }
            },
            accountComponentProps: function () {
              var t = {
                  player: null,
                  extensions: n,
                  anonymousLinksOverride: !1,
                },
                e = window.RiotBar.data.account.anonymousLinks;
              window.RiotBar.data &&
                window.RiotBar.data.account &&
                window.RiotBar.data.account.anonymousLinks &&
                ((e = window.RiotBar.data.account.anonymousLinks),
                (t.anonymousLinksOverride = !0)),
                (t.anonymousLinks = e);
              var r = n.getGlobalAccount(),
                a = r.summoner;
              if (a !== !1) {
                var i = r.region;
                (t.player = {
                  gameName: a,
                  region: n.getRegionName(i),
                  avatarUrl:
                    "https://avatar.leagueoflegends.com/" +
                    i +
                    "/" +
                    encodeURIComponent(a) +
                    ".png",
                  summonerName: a,
                }),
                  (a !== Qr.invalidSummonerName && "" !== a) ||
                    (t.player.summonerName = "My Account");
              }
              return t;
            },
          };
        return i;
      }),
    na = J(function (t) {
      var n = (t.exports = {
        config: {},
        styles: null,
        defaults: {
          authMode: "prod",
          enabled: !0,
          currentDomain: null,
          utilityLinks: !1,
          returnUrl: null,
          boardsProfileLink: !1,
          supportedRegions: ["na"],
          loginVariant: "text",
          initializeAuthState: !0,
        },
        hasLoadedDeferredScript: !1,
        preInit: function (t) {
          var e = window.RiotBar.data.account;
          (n.extensions = Kr(t, e)),
            (this.accountUtils = ta(t, n.extensions)),
            (window.RiotBar.__accountUtils = this.accountUtils),
            (n.extensions.setAuthState = this.setAuthState.bind(this)),
            qr.addPluginExtensions(RiotBar, "account", n);
        },
        init: function (t, n, e) {},
        setAuthState: function (t) {
          n.extensions.__setAuthState(t), document.dispatchEvent(kr);
        },
      });
    }),
    ea =
      (na.config,
      na.styles,
      na.defaults,
      na.hasLoadedDeferredScript,
      na.preInit,
      na.init,
      na.setAuthState,
      Xr.getRegionNames()),
    ra =
      (Xr.getLanguageNames(),
      function (t) {
        var n = {
          regionNames: Xr.getRegionNames(),
          languageNames: Xr.getLanguageNames(),
          allLanguagesWithRegions: Xr.getAllLanguagesWithRegions(),
          getRenderContext: function () {
            return {
              currentRegion: "na",
              currentLang: "en",
              currentLocale: "en_US",
              currentRegionName: n.regionNames.na,
              currentLanguageName: n.languageNames.en,
              regions: Object.keys(ea),
            };
          },
          getAllLanguagesWithRegions: function (t) {
            return Xr.getAllLanguagesWithRegions(
              t && "object" === N(t) ? t.landingUrlPattern : void 0
            );
          },
          processRegionConfig: function () {
            var e = [];
            return (
              On.map(t.locales, function (t, r) {
                for (var a = [], i = 0; i < r.length; i++)
                  a[i] = n.processLangConfig(r[i], t);
                e.push({ id: t, regionName: n.regionNames[t], locales: a });
              }),
              e
            );
          },
          processLangConfig: function (e, r) {
            var a,
              i = t.landingUrlPattern;
            if ("string" == typeof e) {
              var o = e.substring(0, 2),
                l = i
                  .replace("{{lang}}", o)
                  .replace("{{region}}", r)
                  .replace("{{locale}}", e)
                  .replace(
                    "{{locale-hyphen}}",
                    e.toLowerCase().replace("_", "-")
                  );
              a = {
                locale: e,
                lang: o,
                languageName: n.languageNames[o],
                landingUrl: l,
              };
            } else "object" === N(e) && (a = e);
            return a;
          },
        };
        return n;
      }),
    aa =
      (Xr.getDefaultLocales(),
      {
        config: {},
        styles: null,
        defaults: {
          enabled: !0,
          landingUrlPattern: Xr.getDefaultLandingURLPattern(),
          languages: null,
          switcherEnabled: !0,
          supportedLocales: Xr.getDefaultLocaleCodes(),
        },
        init: function (t, n) {
          this.config = t;
          var e = ra(this.config);
          this.localeUtils = e;
        },
      }),
    ia =
      (aa.config,
      aa.styles,
      aa.defaults,
      aa.init,
      {
        config: {},
        defaults: {
          enabled: !0,
          pingUrl: "https://lolstatic-a.akamaihd.net/ping/ping-0.1.663.min.js",
          pCfg: null,
        },
        init: function (t) {
          (this.config = t),
            !window.pCfg &&
              RiotBar.data.ping &&
              RiotBar.data.ping.pCfg &&
              (window.pCfg = RiotBar.data.ping.pCfg),
            RiotBar.data.ping &&
              RiotBar.data.ping.pingUrl &&
              On.appendScript(RiotBar.data.ping.pingUrl);
        },
      }),
    oa =
      (ia.config,
      ia.defaults,
      ia.init,
      {
        enabled: !1,
        disableRender: !1,
        container: {
          renderFooterInto: null,
          marginTop: null,
          disableFooterBackground: !1,
        },
        footerLinks: { enabled: !0 },
        socialLinks: { enabled: !1 },
      }),
    la =
      (oa.enabled,
      oa.disableRender,
      oa.container,
      oa.footerLinks,
      oa.socialLinks,
      J(function (t) {
        t.exports = {
          initialized: !1,
          config: {},
          defaults: oa,
          init: function (n, e) {
            if (RiotBar.data.footer.enabled && !t.exports.initialized) {
              var r = On.determineDeferredFilePrefix();
              On.ensureScript("RiotBar.plugins.footerContent", {
                url:
                  "https://lolstatic-a.akamaihd.net/riotbar/live/1.1.5/" +
                  r +
                  "en_US-defer-footer.js",
              }).then(function () {
                if (!t.exports.initialized) {
                  t.exports.initialized = !0;
                  var n = window.RiotBar.plugins.footerContent;
                  n.init(RiotBar.data.footer, e);
                }
              });
            }
          },
        };
      })),
    sa = (la.initialized, la.config, la.defaults, la.init, K(Ln));
  if ((Nn({ polyfill: !0 }), void 0 === window.RiotBar)) {
    var ca = qr,
      ua = On;
    ua.appendStyles(sa);
    var pa = Xr,
      ba = (window.RiotBar = {
        util: ua,
        data: {
          showAutomatically: !0,
          renderInto: "riotbar-header",
          account: {
            enabled: !0,
            initializeAuthState: !1,
            urls: {
              login:
                "https://{{login_prefix}}{{current_domain}}/?region=na&lang=en_US&redirect_uri={{then}}",
              logout:
                "https://{{login_prefix}}{{current_domain}}/{{summonerRegion}}/out?redirect_uri={{then}}",
              management: "https://account.riotgames.com/account",
              usernameRecovery:
                "https://recovery.riotgames.com/en/forgot-username?region=NA1",
              passwordRecovery:
                "https://recovery.riotgames.com/en/forgot-password?region=NA1",
            },
            currentDomain: null,
            anonymousLinks: [
              {
                id: "play-now",
                text: "PLAY NOW",
                isButton: !0,
                action: "openModal",
              },
            ],
            authenticatedLinks: [
              { id: "logout", text: "Logout", action: "logout" },
            ],
            rso: {
              useCustomClient: !1,
              clientName: "",
              scope: "",
              redirectURI: "",
              responseType: "",
              useStageRSO: !1,
            },
          },
          applicationSwitcher: {
            enabled: !0,
            contentManifestCDN:
              "https://lolstatic-a.akamaihd.net/riotbar/live/1.1.5/../content-manifests/",
          },
          cookiePolicyV2: { enabled: !1, settings: {} },
          footer: {
            enabled: !0,
            renderInto: "",
            copyright: {
              leagueCopyright:
                "© %year% Riot Games, Inc. Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.",
              copyrightText:
                "© %year% Riot Games, Inc. Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.",
            },
            footerLinks: [
              {
                id: "download-footer",
                url: "/en-us/download/",
                text: "Download Game Client",
              },
            ],
            socialLinks: [
              {
                id: "twitter",
                url: "https://twitter.com/playvalorant",
                title: "Twitter",
              },
              {
                id: "youtube",
                url: "https://www.youtube.com/PlayValorant",
                title: "YouTube",
              },
              {
                id: "instagram",
                url: "https://www.instagram.com/playvalorantofficial/",
                title: "Instagram",
              },
              {
                id: "facebook",
                url: "https://www.facebook.com/playvalorant/",
                title: "Facebook",
              },
              {
                id: "discord",
                url: "https://discord.gg/valorant",
                title: "Discord",
              },
            ],
            legalLinks: [
              {
                id: "Privacy",
                bold: !1,
                url: "https://www.riotgames.com/en/privacy-notice",
                text: "Privacy Notice",
              },
              {
                id: "Terms of Service",
                bold: !1,
                url: "https://www.riotgames.com/en/terms-of-service",
                text: "Terms of Service",
              },
            ],
            gameRatings: [
              {
                id: "na-esrb",
                url: "",
                logoAltText: "",
                image:
                  "https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt67f8b7843bd8166a/5e71600f353d6343a753219d/na-esrb.png?&height=100&disable=upscale",
                ratingDetailTextList: [
                  "Blood",
                  "Language",
                  "Violence",
                  "Users Interact",
                  "In-Game Purchases",
                ],
              },
            ],
            subLogos: [],
          },
          localizationSwitcher: {
            enabled: !0,
            links: [
              { url: "/en-us/", text: "English (NA)", active: !0 },
              { url: "/en-gb/", text: "English (EUW)", active: !1 },
              { url: "/de-de/", text: "Deutsch", active: !1 },
              { url: "/es-es/", text: "Español (EUW)", active: !1 },
              { url: "/fr-fr/", text: "Français", active: !1 },
              { url: "/it-it/", text: "Italiano", active: !1 },
              { url: "/pl-pl/", text: "Polski", active: !1 },
              { url: "/ru-ru/", text: "Русский", active: !1 },
              { url: "/tr-tr/", text: "Türkçe", active: !1 },
              { url: "/es-mx/", text: "Español (LATAM)", active: !1 },
              { url: "/id-id/", text: "Indonesian", active: !1 },
              { url: "/ja-jp/", text: "日本語", active: !1 },
              { url: "/ko-kr/", text: "한국어", active: !1 },
              { url: "/pt-br/", text: "Português", active: !1 },
              { url: "/th-th/", text: "ภาษาไทย", active: !1 },
              { url: "/vi-vn/", text: "Tiếng Việt", active: !1 },
              { url: "/zh-tw/", text: "繁體中文", active: !1 },
              { url: "/ar-ae/", text: "العربية", active: !1 },
            ],
          },
          ping: {
            enabled: !0,
            pCfg: {},
            pingUrl:
              "https://lolstatic-a.akamaihd.net/ping/ping-0.1.663.min.js",
          },
          serviceStatus: {
            enabled: !0,
            productURLs: [
              {
                product: "valorant",
                urls: [
                  "https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/na.json",
                  "https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/latam.json",
                ],
              },
            ],
          },
          theme: {
            name: "playvalorantfinal",
            isSticky: !0,
            accentColor: "#FF4655",
            accentColorHover: "#FF4655",
            accentColorActive: "#FF4655",
            homepageURL: "https://playvalorant.com/en-us/",
            desktopSVG:
              '<svg fill="none" height="35" viewBox="0 0 100 100" width="35" xmlns="http://www.w3.org/2000/svg"><path d="M99.25 48.66V10.28c0-.59-.75-.86-1.12-.39l-41.92 52.4a.627.627 0 00.49 1.02h30.29c.82 0 1.59-.37 2.1-1.01l9.57-11.96c.38-.48.59-1.07.59-1.68zM1.17 50.34L32.66 89.7c.51.64 1.28 1.01 2.1 1.01h30.29c.53 0 .82-.61.49-1.02L1.7 9.89c-.37-.46-1.12-.2-1.12.39v38.38c0 .61.21 1.2.59 1.68z" fill="#fff"></path></svg>',
            mobileSVG:
              '<svg fill="none" height="35" viewBox="0 0 690 98.9" width="109" xmlns="http://www.w3.org/2000/svg"><path d="M615.11 19.15h24.69l.08 75.59c0 .97.79 1.77 1.77 1.77l14.14-.01c.98 0 1.77-.79 1.77-1.77l-.08-75.58h30.96c.91 0 1.43-1.06.85-1.77l-10.6-13.26a4.68 4.68 0 00-3.65-1.76h-59.93c-.98 0-1.77.79-1.77 1.77v13.26c0 .96.79 1.76 1.77 1.76M19.25 94.75L91.67 4.13c.57-.71.06-1.77-.85-1.77H72.71c-1.42 0-2.77.65-3.65 1.76L17.68 68.4V4.12c0-.98-.79-1.77-1.77-1.77H1.77C.79 2.35 0 3.14 0 4.12v90.62c0 .98.79 1.77 1.77 1.77H15.6c1.42 0 2.76-.65 3.65-1.76M70.31 94.75l24.91-31.17 24.91 31.17a4.685 4.685 0 003.66 1.76h13.83c.98 0 1.77-.79 1.77-1.77V4.12c0-.97-.79-1.77-1.77-1.77h-11.6c-2.84 0-5.53 1.29-7.31 3.51L47.69 94.73c-.57.71-.06 1.77.85 1.77h18.11c1.43.01 2.77-.64 3.66-1.75m51.39-66.21v41.75l-16.68-20.87 16.68-20.88zM526.07 94.73L453.65 4.11A4.68 4.68 0 00450 2.35h-13.84c-.98 0-1.77.79-1.77 1.77v90.62c0 .98.79 1.77 1.77 1.77h13.83c1.42 0 2.77-.65 3.65-1.76l24.91-31.17 24.91 31.17a4.68 4.68 0 003.65 1.76h18.11c.91 0 1.42-1.06.85-1.78m-57.33-45.31L452.05 70.3V28.54l16.69 20.88zM269.45 0c-27.3 0-49.43 22.13-49.43 49.43s22.13 49.43 49.43 49.43 49.43-22.13 49.43-49.43C318.89 22.13 296.75 0 269.45 0m0 82.06c-17.54 0-31.75-14.61-31.75-32.63 0-18.02 14.21-32.64 31.75-32.64S301.2 31.4 301.2 49.43c.01 18.02-14.21 32.63-31.75 32.63M583.38 4.12V68.4L532 4.11a4.68 4.68 0 00-3.65-1.76H514.5c-.97 0-1.77.79-1.77 1.77v43.67c0 1.06.36 2.09 1.03 2.92l14.71 18.41c.65.81 1.95.35 1.95-.68v-38l51.39 64.31a4.68 4.68 0 003.65 1.76h13.83c.98 0 1.77-.79 1.77-1.77V4.12c0-.97-.79-1.77-1.77-1.77h-14.14c-.98 0-1.77.8-1.77 1.77M410.62 23.76V4.12c0-.98-.79-1.77-1.77-1.77h-72.37c-.98 0-1.77.79-1.77 1.77v90.62c0 .98.79 1.77 1.77 1.77h14.14c.98 0 1.77-.79 1.77-1.77V19.16h40.55l-27.37 34.26c-.51.64-.51 1.56 0 2.21l31.27 39.13a4.68 4.68 0 003.65 1.76h18.11c.91 0 1.42-1.06.85-1.77l-32.14-40.21 22.28-27.84c.66-.85 1.03-1.88 1.03-2.94M162.39 96.51h41.96c1.42 0 2.77-.65 3.65-1.76l10.6-13.27c.57-.71.06-1.77-.85-1.77H178.3V4.12c0-.98-.79-1.77-1.77-1.77h-14.14c-.98 0-1.77.79-1.77 1.77v90.62c0 .97.8 1.77 1.77 1.77" fill="#fff"></path></svg>',
          },
          touchpoints: {
            links: [
              {
                id: "game-info",
                text: "GAME INFO",
                url: "#",
                programmaticAction: null,
                subMenuItems: [
                  {
                    id: "agents",
                    text: "AGENTS",
                    url: "/en-us/agents/",
                    programmaticAction: null,
                  },
                  {
                    id: "maps",
                    text: "MAPS",
                    url: "/en-us/maps/",
                    programmaticAction: null,
                  },
                  {
                    id: "arsenal",
                    text: "ARSENAL",
                    url: "/en-us/arsenal/",
                    programmaticAction: null,
                  },
                ],
              },
              {
                id: "media",
                text: "MEDIA",
                url: "/en-us/media",
                programmaticAction: null,
                activeLinkRegex: "media(\\/?).+",
              },
              {
                id: "news",
                text: "NEWS",
                url: "/en-us/news/",
                programmaticAction: null,
                activeLinkRegex: "^news(\\/?).+",
              },
              {
                id: "leaderboards",
                text: "Leaderboards",
                url: "/en-us/leaderboards/",
                programmaticAction: null,
                activeLinkRegex: "leaderboards(\\/?).+",
              },
              {
                id: "support",
                text: "SUPPORT",
                url: "#",
                programmaticAction: null,
                target: "_blank",
                subMenuItems: [
                  {
                    id: "specs",
                    text: "SPECS",
                    url: "/en-us/specs/",
                    programmaticAction: null,
                  },
                  {
                    id: "support-subnav",
                    text: "SUPPORT",
                    url: "https://support-valorant.riotgames.com/hc/en-us/",
                    programmaticAction: null,
                    target: "_blank",
                  },
                  {
                    id: "Community Code",
                    text: "COMMUNITY CODE",
                    url: "https://playvalorant.com/en-us/news/announcements/valorant-community-code/",
                    programmaticAction: null,
                    activeLinkRegex: "^community-code(\\/?).+",
                  },
                ],
              },
              {
                id: "social",
                text: "Our Socials",
                url: "#",
                programmaticAction: null,
                subMenuItems: [
                  {
                    id: "social.twitter",
                    text: "Twitter",
                    url: "https://twitter.com/playvalorant",
                    programmaticAction: null,
                    target: "_blank",
                  },
                  {
                    id: "social.youtube",
                    text: "YouTube",
                    url: "https://www.youtube.com/PlayValorant",
                    programmaticAction: null,
                    target: "_blank",
                  },
                  {
                    id: "social.instagram",
                    text: "Instagram",
                    url: "https://www.instagram.com/playvalorantofficial/",
                    programmaticAction: null,
                    target: "_blank",
                  },
                  {
                    id: "social.facebook",
                    text: "Facebook",
                    url: "https://www.facebook.com/playvalorant/",
                    programmaticAction: null,
                    target: "_blank",
                  },
                  {
                    id: "social.discord",
                    text: "Discord",
                    url: "https://discord.gg/valorant",
                    programmaticAction: null,
                    target: "_blank",
                  },
                ],
              },
              {
                id: "Esports",
                text: "ESPORTS",
                url: "https://valorantesports.com/",
                programmaticAction: null,
                target: "_blank",
                activeLinkRegex: "esports(\\/?).+",
              },
            ],
          },
        },
        plugins: {
          cookiePolicyV2: Yr,
          navigation: $r,
          account: na,
          locale: aa,
          ping: ia,
          footer: la,
        },
        defaults: {
          mobileResponsive: !0,
          plugins: null,
          onLoad: null,
          global: { theme: "lol", renderInto: null },
        },
        config: {},
        show: function (t) {
          function n(t) {
            var n = ba.plugins[t],
              e = ba.config[t];
            (!e || (e && e.enabled)) &&
              (n.init(e, a),
              ca.getPluginStyles(i, n),
              "account" != t && ca.addPluginExtensions(ba, t, n));
          }
          if ((t || (t = {}), !ba.initialized)) {
            (ba.initialized = !0), (ba.config = t);
            var e = t.beforeLoad;
            e && "function" == typeof e && t.beforeLoad();
            var r = ba.data.account.authMode || "prod";
            "prod" !== r && pa.includeInternalRegions(),
              ba.config.plugins &&
                ua.map(ba.config.plugins, function (n, e) {
                  ba.plugins[n] = e;
                  var r = e.defaults || { enabled: !0 },
                    a = t[n] || {};
                  for (var i in a) r.hasOwnProperty(i) || (r[i] = a[i]);
                  var o = ua.deepOverride(r, a, 0);
                  ba.config[n] = o;
                });
            var a = {},
              i = [];
            ba.plugins.account.preInit(ba.config.account),
              n("locale"),
              Gr(a)
                .then(function () {
                  ua.map(ba.plugins, function (t) {
                    "locale" !== t && n(t);
                  }),
                    ua.appendStyles(i.join(""));
                  var t = ba.config.onLoad;
                  t && "function" == typeof t && ba.config.onLoad();
                  try {
                    document.dispatchEvent(Zr);
                  } catch (e) {}
                })
                ["catch"](function (t) {});
          }
        },
      });
  }
  window.riotBarConfig
    ? window.RiotBar.show(window.riotBarConfig)
    : window.RiotBar.data.hasOwnProperty("showAutomatically") &&
      window.RiotBar.data.showAutomatically === !0 &&
      window.RiotBar.show({});
  var da = {};
  return da;
})();
