var _api,
  _API_JQUERY = 1,
  _API_PROTOTYPE = 2,
  _idleTimeout = 3e4,
  _awayTimeout = 6e5,
  _idleNow = !1,
  _idleTimestamp = null,
  _idleTimer = null,
  _awayNow = !1,
  _awayTimestamp = null,
  _awayTimer = null;
function setIdleTimeout(e) {
  (_idleTimeout = e),
    (_idleTimestamp = new Date().getTime() + e),
    null != _idleTimer && clearTimeout(_idleTimer),
    (_idleTimer = setTimeout(_makeIdle, e + 50));
}
function setAwayTimeout(e) {
  (_awayTimeout = e),
    (_awayTimestamp = new Date().getTime() + e),
    null != _awayTimer && clearTimeout(_awayTimer),
    (_awayTimer = setTimeout(_makeAway, e + 50));
}
function _makeIdle() {
  var e = new Date().getTime();
  if (e < _idleTimestamp)
    _idleTimer = setTimeout(_makeIdle, _idleTimestamp - e + 50);
  else {
    _idleNow = !0;
    try {
      document.onIdle && document.onIdle();
    } catch (e) {}
  }
}
function _makeAway() {
  var e = new Date().getTime();
  if (e < _awayTimestamp)
    _awayTimer = setTimeout(_makeAway, _awayTimestamp - e + 50);
  else {
    _awayNow = !0;
    try {
      document.onAway && document.onAway();
    } catch (e) {}
  }
}
function _initPrototype() {
  _api = _API_PROTOTYPE;
}
function _active(e) {
  var t = new Date().getTime();
  TimerPause = false;
  (_idleTimestamp = t + _idleTimeout),
    (_awayTimestamp = t + _awayTimeout),
    _idleNow && setIdleTimeout(_idleTimeout),
    _awayNow && setAwayTimeout(_awayTimeout);
  try {
    (_idleNow || _awayNow) &&
      document.onBack &&
      document.onBack(_idleNow, _awayNow);
  } catch (e) {}
  (_idleNow = !1), (_awayNow = !1);
}
function _initJQuery() {
  _api = _API_JQUERY;
  var e = $(document);
  e.ready(function () {
    e.mousemove(_active);
    try {
      e.mouseenter(_active);
    } catch (e) {}
    try {
      e.scroll(_active);
    } catch (e) {}
    try {
      e.keydown(_active);
    } catch (e) {}
    try {
      e.click(_active);
    } catch (e) {}
    try {
      e.dblclick(_active);
    } catch (e) {}
  });
}
function _initPrototype() {
  _api = _API_PROTOTYPE;
  $(document);
  Event.observe(window, "load", function (e) {
    Event.observe(window, "click", _active),
      Event.observe(window, "mousemove", _active),
      Event.observe(window, "mouseenter", _active),
      Event.observe(window, "scroll", _active),
      Event.observe(window, "keydown", _active),
      Event.observe(window, "click", _active),
      Event.observe(window, "dblclick", _active);
      console.log("_initPrototype",_active);
  });
}
try {
  Prototype && _initPrototype();
} catch (e) {}
try {
  jQuery && _initJQuery();
} catch (e) {}
