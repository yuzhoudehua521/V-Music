!(function(e) {
  var t,
    n,
    l,
    i,
    o,
    d,
    a,
    c =
      '<svg><symbol id="icon-suo" viewBox="0 0 1024 1024"><path d="M721.794214 789.44971427l-60.943176 60.943176-211.189225-211.189225L510.604989 578.26048827z" fill="#d81e06" ></path><path d="M299.316831 789.32124727l60.943176 60.943177 211.189226-211.189225L510.506056 578.13202227z" fill="#d81e06" ></path><path d="M301.900488 234.26025373l60.943177-60.943177 211.189225 211.189226L513.089714 445.44947873z" fill="#d81e06" ></path><path d="M724.391342 234.39659773l-60.943176-60.943177-211.189226 211.189226L513.202117 445.58582273z" fill="#d81e06" ></path></symbol><symbol id="icon-shen" viewBox="0 0 1024 1024"><path d="M721.794214 384.116381l-60.943176 60.943176-211.189225-211.189225L510.604989 172.927155z" fill="#d81e06" ></path><path d="M299.316831 383.987914l60.943176 60.943177 211.189226-211.189225L510.506056 172.798689z" fill="#d81e06" ></path><path d="M301.900488 639.593587l60.943177-60.943177 211.189225 211.189226L513.089714 850.782812z" fill="#d81e06" ></path><path d="M724.391342 639.729931l-60.943176-60.943177-211.189226 211.189226L513.202117 850.919156z" fill="#d81e06" ></path></symbol></svg>',
    s = (t = document.getElementsByTagName('script'))[
      t.length - 1
    ].getAttribute('data-injectcss')
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  function h() {
    d || ((d = !0), i())
  }
  ;(n = function() {
    var e,
      t,
      n,
      l,
      i,
      o = document.createElement('div')
    ;(o.innerHTML = c),
      (c = null),
      (e = o.getElementsByTagName('svg')[0]) &&
        (e.setAttribute('aria-hidden', 'true'),
        (e.style.position = 'absolute'),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = 'hidden'),
        (t = e),
        (n = document.body).firstChild
          ? ((l = t), (i = n.firstChild).parentNode.insertBefore(l, i))
          : n.appendChild(t))
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(n, 0)
        : ((l = function() {
            document.removeEventListener('DOMContentLoaded', l, !1), n()
          }),
          document.addEventListener('DOMContentLoaded', l, !1))
      : document.attachEvent &&
        ((i = n),
        (o = e.document),
        (d = !1),
        (a = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(a, 50)
          }
          h()
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), h())
        }))
})(window)
