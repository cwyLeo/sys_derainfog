"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__A22F030",
    appName: "defograin-uniapp",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.98",
    uniRuntimeVersion: "3.98",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__A22F030",
      appName: "defograin-uniapp",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(
          s,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var jszip_minExports = {};
var jszip_min = {
  get exports() {
    return jszip_minExports;
  },
  set exports(v) {
    jszip_minExports = v;
  }
};
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(module2, exports2) {
  !function(e2) {
    module2.exports = e2();
  }(function() {
    return function s(a, o2, h) {
      function u(r, e3) {
        if (!o2[r]) {
          if (!a[r]) {
            var t2 = "function" == typeof commonjsRequire && commonjsRequire;
            if (!e3 && t2)
              return t2(r, true);
            if (l)
              return l(r, true);
            var n2 = new Error("Cannot find module '" + r + "'");
            throw n2.code = "MODULE_NOT_FOUND", n2;
          }
          var i = o2[r] = { exports: {} };
          a[r][0].call(i.exports, function(e4) {
            var t3 = a[r][1][e4];
            return u(t3 || e4);
          }, i, i.exports, s, a, o2, h);
        }
        return o2[r].exports;
      }
      for (var l = "function" == typeof commonjsRequire && commonjsRequire, e2 = 0; e2 < h.length; e2++)
        u(h[e2]);
      return u;
    }({ 1: [function(e2, t2, r) {
      var d = e2("./utils"), c = e2("./support"), p2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      r.encode = function(e3) {
        for (var t3, r2, n2, i, s, a, o2, h = [], u = 0, l = e3.length, f2 = l, c2 = "string" !== d.getTypeOf(e3); u < e3.length; )
          f2 = l - u, n2 = c2 ? (t3 = e3[u++], r2 = u < l ? e3[u++] : 0, u < l ? e3[u++] : 0) : (t3 = e3.charCodeAt(u++), r2 = u < l ? e3.charCodeAt(u++) : 0, u < l ? e3.charCodeAt(u++) : 0), i = t3 >> 2, s = (3 & t3) << 4 | r2 >> 4, a = 1 < f2 ? (15 & r2) << 2 | n2 >> 6 : 64, o2 = 2 < f2 ? 63 & n2 : 64, h.push(p2.charAt(i) + p2.charAt(s) + p2.charAt(a) + p2.charAt(o2));
        return h.join("");
      }, r.decode = function(e3) {
        var t3, r2, n2, i, s, a, o2 = 0, h = 0, u = "data:";
        if (e3.substr(0, u.length) === u)
          throw new Error("Invalid base64 input, it looks like a data url.");
        var l, f2 = 3 * (e3 = e3.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (e3.charAt(e3.length - 1) === p2.charAt(64) && f2--, e3.charAt(e3.length - 2) === p2.charAt(64) && f2--, f2 % 1 != 0)
          throw new Error("Invalid base64 input, bad content length.");
        for (l = c.uint8array ? new Uint8Array(0 | f2) : new Array(0 | f2); o2 < e3.length; )
          t3 = p2.indexOf(e3.charAt(o2++)) << 2 | (i = p2.indexOf(e3.charAt(o2++))) >> 4, r2 = (15 & i) << 4 | (s = p2.indexOf(e3.charAt(o2++))) >> 2, n2 = (3 & s) << 6 | (a = p2.indexOf(e3.charAt(o2++))), l[h++] = t3, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n2);
        return l;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(e2, t2, r) {
      var n2 = e2("./external"), i = e2("./stream/DataWorker"), s = e2("./stream/Crc32Probe"), a = e2("./stream/DataLengthProbe");
      function o2(e3, t3, r2, n3, i2) {
        this.compressedSize = e3, this.uncompressedSize = t3, this.crc32 = r2, this.compression = n3, this.compressedContent = i2;
      }
      o2.prototype = { getContentWorker: function() {
        var e3 = new i(n2.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t3 = this;
        return e3.on("end", function() {
          if (this.streamInfo.data_length !== t3.uncompressedSize)
            throw new Error("Bug : uncompressed data size mismatch");
        }), e3;
      }, getCompressedWorker: function() {
        return new i(n2.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, o2.createWorkerFrom = function(e3, t3, r2) {
        return e3.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t3.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t3);
      }, t2.exports = o2;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e2, t2, r) {
      var n2 = e2("./stream/GenericWorker");
      r.STORE = { magic: "\0\0", compressWorker: function() {
        return new n2("STORE compression");
      }, uncompressWorker: function() {
        return new n2("STORE decompression");
      } }, r.DEFLATE = e2("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e2, t2, r) {
      var n2 = e2("./utils");
      var o2 = function() {
        for (var e3, t3 = [], r2 = 0; r2 < 256; r2++) {
          e3 = r2;
          for (var n3 = 0; n3 < 8; n3++)
            e3 = 1 & e3 ? 3988292384 ^ e3 >>> 1 : e3 >>> 1;
          t3[r2] = e3;
        }
        return t3;
      }();
      t2.exports = function(e3, t3) {
        return void 0 !== e3 && e3.length ? "string" !== n2.getTypeOf(e3) ? function(e4, t4, r2, n3) {
          var i = o2, s = n3 + r2;
          e4 ^= -1;
          for (var a = n3; a < s; a++)
            e4 = e4 >>> 8 ^ i[255 & (e4 ^ t4[a])];
          return -1 ^ e4;
        }(0 | t3, e3, e3.length, 0) : function(e4, t4, r2, n3) {
          var i = o2, s = n3 + r2;
          e4 ^= -1;
          for (var a = n3; a < s; a++)
            e4 = e4 >>> 8 ^ i[255 & (e4 ^ t4.charCodeAt(a))];
          return -1 ^ e4;
        }(0 | t3, e3, e3.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(e2, t2, r) {
      r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
    }, {}], 6: [function(e2, t2, r) {
      var n2 = null;
      n2 = "undefined" != typeof Promise ? Promise : e2("lie"), t2.exports = { Promise: n2 };
    }, { lie: 37 }], 7: [function(e2, t2, r) {
      var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e2("pako"), s = e2("./utils"), a = e2("./stream/GenericWorker"), o2 = n2 ? "uint8array" : "array";
      function h(e3, t3) {
        a.call(this, "FlateWorker/" + e3), this._pako = null, this._pakoAction = e3, this._pakoOptions = t3, this.meta = {};
      }
      r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e3) {
        this.meta = e3.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o2, e3.data), false);
      }, h.prototype.flush = function() {
        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
      }, h.prototype.cleanUp = function() {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, h.prototype._createPako = function() {
        this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
        var t3 = this;
        this._pako.onData = function(e3) {
          t3.push({ data: e3, meta: t3.meta });
        };
      }, r.compressWorker = function(e3) {
        return new h("Deflate", e3);
      }, r.uncompressWorker = function() {
        return new h("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e2, t2, r) {
      function A(e3, t3) {
        var r2, n3 = "";
        for (r2 = 0; r2 < t3; r2++)
          n3 += String.fromCharCode(255 & e3), e3 >>>= 8;
        return n3;
      }
      function n2(e3, t3, r2, n3, i2, s2) {
        var a, o2, h = e3.file, u = e3.compression, l = s2 !== O.utf8encode, f2 = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p2 = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        t3 && !r2 || (x.crc32 = e3.crc32, x.compressedSize = e3.compressedSize, x.uncompressedSize = e3.uncompressedSize);
        var S = 0;
        t3 && (S |= 8), l || !_ && !g || (S |= 2048);
        var z = 0, C = 0;
        w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= function(e4, t4) {
          var r3 = e4;
          return e4 || (r3 = t4 ? 16893 : 33204), (65535 & r3) << 16;
        }(h.unixPermissions, w)) : (C = 20, z |= function(e4) {
          return 63 & (e4 || 0);
        }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o2 = k.getUTCFullYear() - 1980, o2 <<= 4, o2 |= k.getUTCMonth() + 1, o2 <<= 5, o2 |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f2), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p2), 4) + m, b += "uc" + A(y.length, 2) + y);
        var E2 = "";
        return E2 += "\n\0", E2 += A(S, 2), E2 += u.magic, E2 += A(a, 2), E2 += A(o2, 2), E2 += A(x.crc32, 4), E2 += A(x.compressedSize, 4), E2 += A(x.uncompressedSize, 4), E2 += A(f2.length, 2), E2 += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E2 + f2 + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E2 + A(p2.length, 2) + "\0\0\0\0" + A(z, 4) + A(n3, 4) + f2 + b + p2 };
      }
      var I = e2("../utils"), i = e2("../stream/GenericWorker"), O = e2("../utf8"), B = e2("../crc32"), R = e2("../signature");
      function s(e3, t3, r2, n3) {
        i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t3, this.zipPlatform = r2, this.encodeFileName = n3, this.streamFiles = e3, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      I.inherits(s, i), s.prototype.push = function(e3) {
        var t3 = e3.meta.percent || 0, r2 = this.entriesCount, n3 = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e3) : (this.bytesWritten += e3.data.length, i.prototype.push.call(this, { data: e3.data, meta: { currentFile: this.currentFile, percent: r2 ? (t3 + 100 * (r2 - n3 - 1)) / r2 : 100 } }));
      }, s.prototype.openedSource = function(e3) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e3.file.name;
        var t3 = this.streamFiles && !e3.file.dir;
        if (t3) {
          var r2 = n2(e3, t3, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: r2.fileRecord, meta: { percent: 0 } });
        } else
          this.accumulate = true;
      }, s.prototype.closedSource = function(e3) {
        this.accumulate = false;
        var t3 = this.streamFiles && !e3.file.dir, r2 = n2(e3, t3, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(r2.dirRecord), t3)
          this.push({ data: function(e4) {
            return R.DATA_DESCRIPTOR + A(e4.crc32, 4) + A(e4.compressedSize, 4) + A(e4.uncompressedSize, 4);
          }(e3), meta: { percent: 100 } });
        else
          for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
            this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, s.prototype.flush = function() {
        for (var e3 = this.bytesWritten, t3 = 0; t3 < this.dirRecords.length; t3++)
          this.push({ data: this.dirRecords[t3], meta: { percent: 100 } });
        var r2 = this.bytesWritten - e3, n3 = function(e4, t4, r3, n4, i2) {
          var s2 = I.transformTo("string", i2(n4));
          return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e4, 2) + A(e4, 2) + A(t4, 4) + A(r3, 4) + A(s2.length, 2) + s2;
        }(this.dirRecords.length, r2, e3, this.zipComment, this.encodeFileName);
        this.push({ data: n3, meta: { percent: 100 } });
      }, s.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, s.prototype.registerPrevious = function(e3) {
        this._sources.push(e3);
        var t3 = this;
        return e3.on("data", function(e4) {
          t3.processChunk(e4);
        }), e3.on("end", function() {
          t3.closedSource(t3.previous.streamInfo), t3._sources.length ? t3.prepareNextSource() : t3.end();
        }), e3.on("error", function(e4) {
          t3.error(e4);
        }), this;
      }, s.prototype.resume = function() {
        return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, s.prototype.error = function(e3) {
        var t3 = this._sources;
        if (!i.prototype.error.call(this, e3))
          return false;
        for (var r2 = 0; r2 < t3.length; r2++)
          try {
            t3[r2].error(e3);
          } catch (e4) {
          }
        return true;
      }, s.prototype.lock = function() {
        i.prototype.lock.call(this);
        for (var e3 = this._sources, t3 = 0; t3 < e3.length; t3++)
          e3[t3].lock();
      }, t2.exports = s;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e2, t2, r) {
      var u = e2("../compressions"), n2 = e2("./ZipFileWorker");
      r.generateWorker = function(e3, a, t3) {
        var o2 = new n2(a.streamFiles, t3, a.platform, a.encodeFileName), h = 0;
        try {
          e3.forEach(function(e4, t4) {
            h++;
            var r2 = function(e5, t5) {
              var r3 = e5 || t5, n4 = u[r3];
              if (!n4)
                throw new Error(r3 + " is not a valid compression method !");
              return n4;
            }(t4.options.compression, a.compression), n3 = t4.options.compressionOptions || a.compressionOptions || {}, i = t4.dir, s = t4.date;
            t4._compressWorker(r2, n3).withStreamInfo("file", { name: e4, dir: i, date: s, comment: t4.comment || "", unixPermissions: t4.unixPermissions, dosPermissions: t4.dosPermissions }).pipe(o2);
          }), o2.entriesCount = h;
        } catch (e4) {
          o2.error(e4);
        }
        return o2;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e2, t2, r) {
      function n2() {
        if (!(this instanceof n2))
          return new n2();
        if (arguments.length)
          throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var e3 = new n2();
          for (var t3 in this)
            "function" != typeof this[t3] && (e3[t3] = this[t3]);
          return e3;
        };
      }
      (n2.prototype = e2("./object")).loadAsync = e2("./load"), n2.support = e2("./support"), n2.defaults = e2("./defaults"), n2.version = "3.10.1", n2.loadAsync = function(e3, t3) {
        return new n2().loadAsync(e3, t3);
      }, n2.external = e2("./external"), t2.exports = n2;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e2, t2, r) {
      var u = e2("./utils"), i = e2("./external"), n2 = e2("./utf8"), s = e2("./zipEntries"), a = e2("./stream/Crc32Probe"), l = e2("./nodejsUtils");
      function f2(n3) {
        return new i.Promise(function(e3, t3) {
          var r2 = n3.decompressed.getContentWorker().pipe(new a());
          r2.on("error", function(e4) {
            t3(e4);
          }).on("end", function() {
            r2.streamInfo.crc32 !== n3.decompressed.crc32 ? t3(new Error("Corrupted zip : CRC32 mismatch")) : e3();
          }).resume();
        });
      }
      t2.exports = function(e3, o2) {
        var h = this;
        return o2 = u.extend(o2 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n2.utf8decode }), l.isNode && l.isStream(e3) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e3, true, o2.optimizedBinaryString, o2.base64).then(function(e4) {
          var t3 = new s(o2);
          return t3.load(e4), t3;
        }).then(function(e4) {
          var t3 = [i.Promise.resolve(e4)], r2 = e4.files;
          if (o2.checkCRC32)
            for (var n3 = 0; n3 < r2.length; n3++)
              t3.push(f2(r2[n3]));
          return i.Promise.all(t3);
        }).then(function(e4) {
          for (var t3 = e4.shift(), r2 = t3.files, n3 = 0; n3 < r2.length; n3++) {
            var i2 = r2[n3], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
            h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o2.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
          }
          return t3.zipComment.length && (h.comment = t3.zipComment), h;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e2, t2, r) {
      var n2 = e2("../utils"), i = e2("../stream/GenericWorker");
      function s(e3, t3) {
        i.call(this, "Nodejs stream input adapter for " + e3), this._upstreamEnded = false, this._bindStream(t3);
      }
      n2.inherits(s, i), s.prototype._bindStream = function(e3) {
        var t3 = this;
        (this._stream = e3).pause(), e3.on("data", function(e4) {
          t3.push({ data: e4, meta: { percent: 0 } });
        }).on("error", function(e4) {
          t3.isPaused ? this.generatedError = e4 : t3.error(e4);
        }).on("end", function() {
          t3.isPaused ? t3._upstreamEnded = true : t3.end();
        });
      }, s.prototype.pause = function() {
        return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
      }, s.prototype.resume = function() {
        return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, t2.exports = s;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e2, t2, r) {
      var i = e2("readable-stream").Readable;
      function n2(e3, t3, r2) {
        i.call(this, t3), this._helper = e3;
        var n3 = this;
        e3.on("data", function(e4, t4) {
          n3.push(e4) || n3._helper.pause(), r2 && r2(t4);
        }).on("error", function(e4) {
          n3.emit("error", e4);
        }).on("end", function() {
          n3.push(null);
        });
      }
      e2("../utils").inherits(n2, i), n2.prototype._read = function() {
        this._helper.resume();
      }, t2.exports = n2;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e2, t2, r) {
      t2.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e3, t3) {
        if (Buffer.from && Buffer.from !== Uint8Array.from)
          return Buffer.from(e3, t3);
        if ("number" == typeof e3)
          throw new Error('The "data" argument must not be a number');
        return new Buffer(e3, t3);
      }, allocBuffer: function(e3) {
        if (Buffer.alloc)
          return Buffer.alloc(e3);
        var t3 = new Buffer(e3);
        return t3.fill(0), t3;
      }, isBuffer: function(e3) {
        return Buffer.isBuffer(e3);
      }, isStream: function(e3) {
        return e3 && "function" == typeof e3.on && "function" == typeof e3.pause && "function" == typeof e3.resume;
      } };
    }, {}], 15: [function(e2, t2, r) {
      function s(e3, t3, r2) {
        var n3, i2 = u.getTypeOf(t3), s2 = u.extend(r2 || {}, f2);
        s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e3 = g(e3)), s2.createFolders && (n3 = _(e3)) && b.call(this, n3, true);
        var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
        r2 && void 0 !== r2.binary || (s2.binary = !a2), (t3 instanceof c && 0 === t3.uncompressedSize || s2.dir || !t3 || 0 === t3.length) && (s2.base64 = false, s2.binary = true, t3 = "", s2.compression = "STORE", i2 = "string");
        var o3 = null;
        o3 = t3 instanceof c || t3 instanceof l ? t3 : p2.isNode && p2.isStream(t3) ? new m(e3, t3) : u.prepareContent(e3, t3, s2.binary, s2.optimizedBinaryString, s2.base64);
        var h2 = new d(e3, o3, s2);
        this.files[e3] = h2;
      }
      var i = e2("./utf8"), u = e2("./utils"), l = e2("./stream/GenericWorker"), a = e2("./stream/StreamHelper"), f2 = e2("./defaults"), c = e2("./compressedObject"), d = e2("./zipObject"), o2 = e2("./generate"), p2 = e2("./nodejsUtils"), m = e2("./nodejs/NodejsStreamInputAdapter"), _ = function(e3) {
        "/" === e3.slice(-1) && (e3 = e3.substring(0, e3.length - 1));
        var t3 = e3.lastIndexOf("/");
        return 0 < t3 ? e3.substring(0, t3) : "";
      }, g = function(e3) {
        return "/" !== e3.slice(-1) && (e3 += "/"), e3;
      }, b = function(e3, t3) {
        return t3 = void 0 !== t3 ? t3 : f2.createFolders, e3 = g(e3), this.files[e3] || s.call(this, e3, null, { dir: true, createFolders: t3 }), this.files[e3];
      };
      function h(e3) {
        return "[object RegExp]" === Object.prototype.toString.call(e3);
      }
      var n2 = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(e3) {
        var t3, r2, n3;
        for (t3 in this.files)
          n3 = this.files[t3], (r2 = t3.slice(this.root.length, t3.length)) && t3.slice(0, this.root.length) === this.root && e3(r2, n3);
      }, filter: function(r2) {
        var n3 = [];
        return this.forEach(function(e3, t3) {
          r2(e3, t3) && n3.push(t3);
        }), n3;
      }, file: function(e3, t3, r2) {
        if (1 !== arguments.length)
          return e3 = this.root + e3, s.call(this, e3, t3, r2), this;
        if (h(e3)) {
          var n3 = e3;
          return this.filter(function(e4, t4) {
            return !t4.dir && n3.test(e4);
          });
        }
        var i2 = this.files[this.root + e3];
        return i2 && !i2.dir ? i2 : null;
      }, folder: function(r2) {
        if (!r2)
          return this;
        if (h(r2))
          return this.filter(function(e4, t4) {
            return t4.dir && r2.test(e4);
          });
        var e3 = this.root + r2, t3 = b.call(this, e3), n3 = this.clone();
        return n3.root = t3.name, n3;
      }, remove: function(r2) {
        r2 = this.root + r2;
        var e3 = this.files[r2];
        if (e3 || ("/" !== r2.slice(-1) && (r2 += "/"), e3 = this.files[r2]), e3 && !e3.dir)
          delete this.files[r2];
        else
          for (var t3 = this.filter(function(e4, t4) {
            return t4.name.slice(0, r2.length) === r2;
          }), n3 = 0; n3 < t3.length; n3++)
            delete this.files[t3[n3].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(e3) {
        var t3, r2 = {};
        try {
          if ((r2 = u.extend(e3 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type)
            throw new Error("No output type specified.");
          u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
          var n3 = r2.comment || this.comment || "";
          t3 = o2.generateWorker(this, r2, n3);
        } catch (e4) {
          (t3 = new l("error")).error(e4);
        }
        return new a(t3, r2.type || "string", r2.mimeType);
      }, generateAsync: function(e3, t3) {
        return this.generateInternalStream(e3).accumulate(t3);
      }, generateNodeStream: function(e3, t3) {
        return (e3 = e3 || {}).type || (e3.type = "nodebuffer"), this.generateInternalStream(e3).toNodejsStream(t3);
      } };
      t2.exports = n2;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e2, t2, r) {
      t2.exports = e2("stream");
    }, { stream: void 0 }], 17: [function(e2, t2, r) {
      var n2 = e2("./DataReader");
      function i(e3) {
        n2.call(this, e3);
        for (var t3 = 0; t3 < this.data.length; t3++)
          e3[t3] = 255 & e3[t3];
      }
      e2("../utils").inherits(i, n2), i.prototype.byteAt = function(e3) {
        return this.data[this.zero + e3];
      }, i.prototype.lastIndexOfSignature = function(e3) {
        for (var t3 = e3.charCodeAt(0), r2 = e3.charCodeAt(1), n3 = e3.charCodeAt(2), i2 = e3.charCodeAt(3), s = this.length - 4; 0 <= s; --s)
          if (this.data[s] === t3 && this.data[s + 1] === r2 && this.data[s + 2] === n3 && this.data[s + 3] === i2)
            return s - this.zero;
        return -1;
      }, i.prototype.readAndCheckSignature = function(e3) {
        var t3 = e3.charCodeAt(0), r2 = e3.charCodeAt(1), n3 = e3.charCodeAt(2), i2 = e3.charCodeAt(3), s = this.readData(4);
        return t3 === s[0] && r2 === s[1] && n3 === s[2] && i2 === s[3];
      }, i.prototype.readData = function(e3) {
        if (this.checkOffset(e3), 0 === e3)
          return [];
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e3);
        return this.index += e3, t3;
      }, t2.exports = i;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e2, t2, r) {
      var n2 = e2("../utils");
      function i(e3) {
        this.data = e3, this.length = e3.length, this.index = 0, this.zero = 0;
      }
      i.prototype = { checkOffset: function(e3) {
        this.checkIndex(this.index + e3);
      }, checkIndex: function(e3) {
        if (this.length < this.zero + e3 || e3 < 0)
          throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e3 + "). Corrupted zip ?");
      }, setIndex: function(e3) {
        this.checkIndex(e3), this.index = e3;
      }, skip: function(e3) {
        this.setIndex(this.index + e3);
      }, byteAt: function() {
      }, readInt: function(e3) {
        var t3, r2 = 0;
        for (this.checkOffset(e3), t3 = this.index + e3 - 1; t3 >= this.index; t3--)
          r2 = (r2 << 8) + this.byteAt(t3);
        return this.index += e3, r2;
      }, readString: function(e3) {
        return n2.transformTo("string", this.readData(e3));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var e3 = this.readInt(4);
        return new Date(Date.UTC(1980 + (e3 >> 25 & 127), (e3 >> 21 & 15) - 1, e3 >> 16 & 31, e3 >> 11 & 31, e3 >> 5 & 63, (31 & e3) << 1));
      } }, t2.exports = i;
    }, { "../utils": 32 }], 19: [function(e2, t2, r) {
      var n2 = e2("./Uint8ArrayReader");
      function i(e3) {
        n2.call(this, e3);
      }
      e2("../utils").inherits(i, n2), i.prototype.readData = function(e3) {
        this.checkOffset(e3);
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e3);
        return this.index += e3, t3;
      }, t2.exports = i;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e2, t2, r) {
      var n2 = e2("./DataReader");
      function i(e3) {
        n2.call(this, e3);
      }
      e2("../utils").inherits(i, n2), i.prototype.byteAt = function(e3) {
        return this.data.charCodeAt(this.zero + e3);
      }, i.prototype.lastIndexOfSignature = function(e3) {
        return this.data.lastIndexOf(e3) - this.zero;
      }, i.prototype.readAndCheckSignature = function(e3) {
        return e3 === this.readData(4);
      }, i.prototype.readData = function(e3) {
        this.checkOffset(e3);
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e3);
        return this.index += e3, t3;
      }, t2.exports = i;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e2, t2, r) {
      var n2 = e2("./ArrayReader");
      function i(e3) {
        n2.call(this, e3);
      }
      e2("../utils").inherits(i, n2), i.prototype.readData = function(e3) {
        if (this.checkOffset(e3), 0 === e3)
          return new Uint8Array(0);
        var t3 = this.data.subarray(this.zero + this.index, this.zero + this.index + e3);
        return this.index += e3, t3;
      }, t2.exports = i;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e2, t2, r) {
      var n2 = e2("../utils"), i = e2("../support"), s = e2("./ArrayReader"), a = e2("./StringReader"), o2 = e2("./NodeBufferReader"), h = e2("./Uint8ArrayReader");
      t2.exports = function(e3) {
        var t3 = n2.getTypeOf(e3);
        return n2.checkSupport(t3), "string" !== t3 || i.uint8array ? "nodebuffer" === t3 ? new o2(e3) : i.uint8array ? new h(n2.transformTo("uint8array", e3)) : new s(n2.transformTo("array", e3)) : new a(e3);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e2, t2, r) {
      r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(e2, t2, r) {
      var n2 = e2("./GenericWorker"), i = e2("../utils");
      function s(e3) {
        n2.call(this, "ConvertWorker to " + e3), this.destType = e3;
      }
      i.inherits(s, n2), s.prototype.processChunk = function(e3) {
        this.push({ data: i.transformTo(this.destType, e3.data), meta: e3.meta });
      }, t2.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e2, t2, r) {
      var n2 = e2("./GenericWorker"), i = e2("../crc32");
      function s() {
        n2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      e2("../utils").inherits(s, n2), s.prototype.processChunk = function(e3) {
        this.streamInfo.crc32 = i(e3.data, this.streamInfo.crc32 || 0), this.push(e3);
      }, t2.exports = s;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e2, t2, r) {
      var n2 = e2("../utils"), i = e2("./GenericWorker");
      function s(e3) {
        i.call(this, "DataLengthProbe for " + e3), this.propName = e3, this.withStreamInfo(e3, 0);
      }
      n2.inherits(s, i), s.prototype.processChunk = function(e3) {
        if (e3) {
          var t3 = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = t3 + e3.data.length;
        }
        i.prototype.processChunk.call(this, e3);
      }, t2.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e2, t2, r) {
      var n2 = e2("../utils"), i = e2("./GenericWorker");
      function s(e3) {
        i.call(this, "DataWorker");
        var t3 = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e3.then(function(e4) {
          t3.dataIsReady = true, t3.data = e4, t3.max = e4 && e4.length || 0, t3.type = n2.getTypeOf(e4), t3.isPaused || t3._tickAndRepeat();
        }, function(e4) {
          t3.error(e4);
        });
      }
      n2.inherits(s, i), s.prototype.cleanUp = function() {
        i.prototype.cleanUp.call(this), this.data = null;
      }, s.prototype.resume = function() {
        return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n2.delay(this._tickAndRepeat, [], this)), true);
      }, s.prototype._tickAndRepeat = function() {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n2.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, s.prototype._tick = function() {
        if (this.isPaused || this.isFinished)
          return false;
        var e3 = null, t3 = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max)
          return this.end();
        switch (this.type) {
          case "string":
            e3 = this.data.substring(this.index, t3);
            break;
          case "uint8array":
            e3 = this.data.subarray(this.index, t3);
            break;
          case "array":
          case "nodebuffer":
            e3 = this.data.slice(this.index, t3);
        }
        return this.index = t3, this.push({ data: e3, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, t2.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e2, t2, r) {
      function n2(e3) {
        this.name = e3 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      n2.prototype = { push: function(e3) {
        this.emit("data", e3);
      }, end: function() {
        if (this.isFinished)
          return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (e3) {
          this.emit("error", e3);
        }
        return true;
      }, error: function(e3) {
        return !this.isFinished && (this.isPaused ? this.generatedError = e3 : (this.isFinished = true, this.emit("error", e3), this.previous && this.previous.error(e3), this.cleanUp()), true);
      }, on: function(e3, t3) {
        return this._listeners[e3].push(t3), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(e3, t3) {
        if (this._listeners[e3])
          for (var r2 = 0; r2 < this._listeners[e3].length; r2++)
            this._listeners[e3][r2].call(this, t3);
      }, pipe: function(e3) {
        return e3.registerPrevious(this);
      }, registerPrevious: function(e3) {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = e3.streamInfo, this.mergeStreamInfo(), this.previous = e3;
        var t3 = this;
        return e3.on("data", function(e4) {
          t3.processChunk(e4);
        }), e3.on("end", function() {
          t3.end();
        }), e3.on("error", function(e4) {
          t3.error(e4);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function() {
        if (!this.isPaused || this.isFinished)
          return false;
        var e3 = this.isPaused = false;
        return this.generatedError && (this.error(this.generatedError), e3 = true), this.previous && this.previous.resume(), !e3;
      }, flush: function() {
      }, processChunk: function(e3) {
        this.push(e3);
      }, withStreamInfo: function(e3, t3) {
        return this.extraStreamInfo[e3] = t3, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var e3 in this.extraStreamInfo)
          Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e3) && (this.streamInfo[e3] = this.extraStreamInfo[e3]);
      }, lock: function() {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function() {
        var e3 = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + e3 : e3;
      } }, t2.exports = n2;
    }, {}], 29: [function(e2, t2, r) {
      var h = e2("../utils"), i = e2("./ConvertWorker"), s = e2("./GenericWorker"), u = e2("../base64"), n2 = e2("../support"), a = e2("../external"), o2 = null;
      if (n2.nodestream)
        try {
          o2 = e2("../nodejs/NodejsStreamOutputAdapter");
        } catch (e3) {
        }
      function l(e3, o3) {
        return new a.Promise(function(t3, r2) {
          var n3 = [], i2 = e3._internalType, s2 = e3._outputType, a2 = e3._mimeType;
          e3.on("data", function(e4, t4) {
            n3.push(e4), o3 && o3(t4);
          }).on("error", function(e4) {
            n3 = [], r2(e4);
          }).on("end", function() {
            try {
              var e4 = function(e5, t4, r3) {
                switch (e5) {
                  case "blob":
                    return h.newBlob(h.transformTo("arraybuffer", t4), r3);
                  case "base64":
                    return u.encode(t4);
                  default:
                    return h.transformTo(e5, t4);
                }
              }(s2, function(e5, t4) {
                var r3, n4 = 0, i3 = null, s3 = 0;
                for (r3 = 0; r3 < t4.length; r3++)
                  s3 += t4[r3].length;
                switch (e5) {
                  case "string":
                    return t4.join("");
                  case "array":
                    return Array.prototype.concat.apply([], t4);
                  case "uint8array":
                    for (i3 = new Uint8Array(s3), r3 = 0; r3 < t4.length; r3++)
                      i3.set(t4[r3], n4), n4 += t4[r3].length;
                    return i3;
                  case "nodebuffer":
                    return Buffer.concat(t4);
                  default:
                    throw new Error("concat : unsupported type '" + e5 + "'");
                }
              }(i2, n3), a2);
              t3(e4);
            } catch (e5) {
              r2(e5);
            }
            n3 = [];
          }).resume();
        });
      }
      function f2(e3, t3, r2) {
        var n3 = t3;
        switch (t3) {
          case "blob":
          case "arraybuffer":
            n3 = "uint8array";
            break;
          case "base64":
            n3 = "string";
        }
        try {
          this._internalType = n3, this._outputType = t3, this._mimeType = r2, h.checkSupport(n3), this._worker = e3.pipe(new i(n3)), e3.lock();
        } catch (e4) {
          this._worker = new s("error"), this._worker.error(e4);
        }
      }
      f2.prototype = { accumulate: function(e3) {
        return l(this, e3);
      }, on: function(e3, t3) {
        var r2 = this;
        return "data" === e3 ? this._worker.on(e3, function(e4) {
          t3.call(r2, e4.data, e4.meta);
        }) : this._worker.on(e3, function() {
          h.delay(t3, arguments, r2);
        }), this;
      }, resume: function() {
        return h.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(e3) {
        if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType)
          throw new Error(this._outputType + " is not supported by this method");
        return new o2(this, { objectMode: "nodebuffer" !== this._outputType }, e3);
      } }, t2.exports = f2;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e2, t2, r) {
      if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer)
        r.blob = false;
      else {
        var n2 = new ArrayBuffer(0);
        try {
          r.blob = 0 === new Blob([n2], { type: "application/zip" }).size;
        } catch (e3) {
          try {
            var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            i.append(n2), r.blob = 0 === i.getBlob("application/zip").size;
          } catch (e4) {
            r.blob = false;
          }
        }
      }
      try {
        r.nodestream = !!e2("readable-stream").Readable;
      } catch (e3) {
        r.nodestream = false;
      }
    }, { "readable-stream": 16 }], 31: [function(e2, t2, s) {
      for (var o2 = e2("./utils"), h = e2("./support"), r = e2("./nodejsUtils"), n2 = e2("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++)
        u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
      u[254] = u[254] = 1;
      function a() {
        n2.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function l() {
        n2.call(this, "utf-8 encode");
      }
      s.utf8encode = function(e3) {
        return h.nodebuffer ? r.newBufferFrom(e3, "utf-8") : function(e4) {
          var t3, r2, n3, i2, s2, a2 = e4.length, o3 = 0;
          for (i2 = 0; i2 < a2; i2++)
            55296 == (64512 & (r2 = e4.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n3 = e4.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i2++), o3 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (t3 = h.uint8array ? new Uint8Array(o3) : new Array(o3), i2 = s2 = 0; s2 < o3; i2++)
            55296 == (64512 & (r2 = e4.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n3 = e4.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i2++), r2 < 128 ? t3[s2++] = r2 : (r2 < 2048 ? t3[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s2++] = 224 | r2 >>> 12 : (t3[s2++] = 240 | r2 >>> 18, t3[s2++] = 128 | r2 >>> 12 & 63), t3[s2++] = 128 | r2 >>> 6 & 63), t3[s2++] = 128 | 63 & r2);
          return t3;
        }(e3);
      }, s.utf8decode = function(e3) {
        return h.nodebuffer ? o2.transformTo("nodebuffer", e3).toString("utf-8") : function(e4) {
          var t3, r2, n3, i2, s2 = e4.length, a2 = new Array(2 * s2);
          for (t3 = r2 = 0; t3 < s2; )
            if ((n3 = e4[t3++]) < 128)
              a2[r2++] = n3;
            else if (4 < (i2 = u[n3]))
              a2[r2++] = 65533, t3 += i2 - 1;
            else {
              for (n3 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t3 < s2; )
                n3 = n3 << 6 | 63 & e4[t3++], i2--;
              1 < i2 ? a2[r2++] = 65533 : n3 < 65536 ? a2[r2++] = n3 : (n3 -= 65536, a2[r2++] = 55296 | n3 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n3);
            }
          return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o2.applyFromCharCode(a2);
        }(e3 = o2.transformTo(h.uint8array ? "uint8array" : "array", e3));
      }, o2.inherits(a, n2), a.prototype.processChunk = function(e3) {
        var t3 = o2.transformTo(h.uint8array ? "uint8array" : "array", e3.data);
        if (this.leftOver && this.leftOver.length) {
          if (h.uint8array) {
            var r2 = t3;
            (t3 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t3.set(r2, this.leftOver.length);
          } else
            t3 = this.leftOver.concat(t3);
          this.leftOver = null;
        }
        var n3 = function(e4, t4) {
          var r3;
          for ((t4 = t4 || e4.length) > e4.length && (t4 = e4.length), r3 = t4 - 1; 0 <= r3 && 128 == (192 & e4[r3]); )
            r3--;
          return r3 < 0 ? t4 : 0 === r3 ? t4 : r3 + u[e4[r3]] > t4 ? r3 : t4;
        }(t3), i2 = t3;
        n3 !== t3.length && (h.uint8array ? (i2 = t3.subarray(0, n3), this.leftOver = t3.subarray(n3, t3.length)) : (i2 = t3.slice(0, n3), this.leftOver = t3.slice(n3, t3.length))), this.push({ data: s.utf8decode(i2), meta: e3.meta });
      }, a.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, s.Utf8DecodeWorker = a, o2.inherits(l, n2), l.prototype.processChunk = function(e3) {
        this.push({ data: s.utf8encode(e3.data), meta: e3.meta });
      }, s.Utf8EncodeWorker = l;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e2, t2, a) {
      var o2 = e2("./support"), h = e2("./base64"), r = e2("./nodejsUtils"), u = e2("./external");
      function n2(e3) {
        return e3;
      }
      function l(e3, t3) {
        for (var r2 = 0; r2 < e3.length; ++r2)
          t3[r2] = 255 & e3.charCodeAt(r2);
        return t3;
      }
      e2("setimmediate"), a.newBlob = function(t3, r2) {
        a.checkSupport("blob");
        try {
          return new Blob([t3], { type: r2 });
        } catch (e3) {
          try {
            var n3 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return n3.append(t3), n3.getBlob(r2);
          } catch (e4) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var i = { stringifyByChunk: function(e3, t3, r2) {
        var n3 = [], i2 = 0, s2 = e3.length;
        if (s2 <= r2)
          return String.fromCharCode.apply(null, e3);
        for (; i2 < s2; )
          "array" === t3 || "nodebuffer" === t3 ? n3.push(String.fromCharCode.apply(null, e3.slice(i2, Math.min(i2 + r2, s2)))) : n3.push(String.fromCharCode.apply(null, e3.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
        return n3.join("");
      }, stringifyByChar: function(e3) {
        for (var t3 = "", r2 = 0; r2 < e3.length; r2++)
          t3 += String.fromCharCode(e3[r2]);
        return t3;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return o2.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
        } catch (e3) {
          return false;
        }
      }(), nodebuffer: function() {
        try {
          return o2.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
        } catch (e3) {
          return false;
        }
      }() } };
      function s(e3) {
        var t3 = 65536, r2 = a.getTypeOf(e3), n3 = true;
        if ("uint8array" === r2 ? n3 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n3 = i.applyCanBeUsed.nodebuffer), n3)
          for (; 1 < t3; )
            try {
              return i.stringifyByChunk(e3, r2, t3);
            } catch (e4) {
              t3 = Math.floor(t3 / 2);
            }
        return i.stringifyByChar(e3);
      }
      function f2(e3, t3) {
        for (var r2 = 0; r2 < e3.length; r2++)
          t3[r2] = e3[r2];
        return t3;
      }
      a.applyFromCharCode = s;
      var c = {};
      c.string = { string: n2, array: function(e3) {
        return l(e3, new Array(e3.length));
      }, arraybuffer: function(e3) {
        return c.string.uint8array(e3).buffer;
      }, uint8array: function(e3) {
        return l(e3, new Uint8Array(e3.length));
      }, nodebuffer: function(e3) {
        return l(e3, r.allocBuffer(e3.length));
      } }, c.array = { string: s, array: n2, arraybuffer: function(e3) {
        return new Uint8Array(e3).buffer;
      }, uint8array: function(e3) {
        return new Uint8Array(e3);
      }, nodebuffer: function(e3) {
        return r.newBufferFrom(e3);
      } }, c.arraybuffer = { string: function(e3) {
        return s(new Uint8Array(e3));
      }, array: function(e3) {
        return f2(new Uint8Array(e3), new Array(e3.byteLength));
      }, arraybuffer: n2, uint8array: function(e3) {
        return new Uint8Array(e3);
      }, nodebuffer: function(e3) {
        return r.newBufferFrom(new Uint8Array(e3));
      } }, c.uint8array = { string: s, array: function(e3) {
        return f2(e3, new Array(e3.length));
      }, arraybuffer: function(e3) {
        return e3.buffer;
      }, uint8array: n2, nodebuffer: function(e3) {
        return r.newBufferFrom(e3);
      } }, c.nodebuffer = { string: s, array: function(e3) {
        return f2(e3, new Array(e3.length));
      }, arraybuffer: function(e3) {
        return c.nodebuffer.uint8array(e3).buffer;
      }, uint8array: function(e3) {
        return f2(e3, new Uint8Array(e3.length));
      }, nodebuffer: n2 }, a.transformTo = function(e3, t3) {
        if (t3 = t3 || "", !e3)
          return t3;
        a.checkSupport(e3);
        var r2 = a.getTypeOf(t3);
        return c[r2][e3](t3);
      }, a.resolve = function(e3) {
        for (var t3 = e3.split("/"), r2 = [], n3 = 0; n3 < t3.length; n3++) {
          var i2 = t3[n3];
          "." === i2 || "" === i2 && 0 !== n3 && n3 !== t3.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
        }
        return r2.join("/");
      }, a.getTypeOf = function(e3) {
        return "string" == typeof e3 ? "string" : "[object Array]" === Object.prototype.toString.call(e3) ? "array" : o2.nodebuffer && r.isBuffer(e3) ? "nodebuffer" : o2.uint8array && e3 instanceof Uint8Array ? "uint8array" : o2.arraybuffer && e3 instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, a.checkSupport = function(e3) {
        if (!o2[e3.toLowerCase()])
          throw new Error(e3 + " is not supported by this platform");
      }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e3) {
        var t3, r2, n3 = "";
        for (r2 = 0; r2 < (e3 || "").length; r2++)
          n3 += "\\x" + ((t3 = e3.charCodeAt(r2)) < 16 ? "0" : "") + t3.toString(16).toUpperCase();
        return n3;
      }, a.delay = function(e3, t3, r2) {
        setImmediate(function() {
          e3.apply(r2 || null, t3 || []);
        });
      }, a.inherits = function(e3, t3) {
        function r2() {
        }
        r2.prototype = t3.prototype, e3.prototype = new r2();
      }, a.extend = function() {
        var e3, t3, r2 = {};
        for (e3 = 0; e3 < arguments.length; e3++)
          for (t3 in arguments[e3])
            Object.prototype.hasOwnProperty.call(arguments[e3], t3) && void 0 === r2[t3] && (r2[t3] = arguments[e3][t3]);
        return r2;
      }, a.prepareContent = function(r2, e3, n3, i2, s2) {
        return u.Promise.resolve(e3).then(function(n4) {
          return o2.blob && (n4 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n4))) && "undefined" != typeof FileReader ? new u.Promise(function(t3, r3) {
            var e4 = new FileReader();
            e4.onload = function(e5) {
              t3(e5.target.result);
            }, e4.onerror = function(e5) {
              r3(e5.target.error);
            }, e4.readAsArrayBuffer(n4);
          }) : n4;
        }).then(function(e4) {
          var t3 = a.getTypeOf(e4);
          return t3 ? ("arraybuffer" === t3 ? e4 = a.transformTo("uint8array", e4) : "string" === t3 && (s2 ? e4 = h.decode(e4) : n3 && true !== i2 && (e4 = function(e5) {
            return l(e5, o2.uint8array ? new Uint8Array(e5.length) : new Array(e5.length));
          }(e4))), e4) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e2, t2, r) {
      var n2 = e2("./reader/readerFor"), i = e2("./utils"), s = e2("./signature"), a = e2("./zipEntry"), o2 = e2("./support");
      function h(e3) {
        this.files = [], this.loadOptions = e3;
      }
      h.prototype = { checkSignature: function(e3) {
        if (!this.reader.readAndCheckSignature(e3)) {
          this.reader.index -= 4;
          var t3 = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t3) + ", expected " + i.pretty(e3) + ")");
        }
      }, isSignature: function(e3, t3) {
        var r2 = this.reader.index;
        this.reader.setIndex(e3);
        var n3 = this.reader.readString(4) === t3;
        return this.reader.setIndex(r2), n3;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var e3 = this.reader.readData(this.zipCommentLength), t3 = o2.uint8array ? "uint8array" : "array", r2 = i.transformTo(t3, e3);
        this.zipComment = this.loadOptions.decodeFileName(r2);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var e3, t3, r2, n3 = this.zip64EndOfCentralSize - 44; 0 < n3; )
          e3 = this.reader.readInt(2), t3 = this.reader.readInt(4), r2 = this.reader.readData(t3), this.zip64ExtensibleData[e3] = { id: e3, length: t3, value: r2 };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
          throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var e3, t3;
        for (e3 = 0; e3 < this.files.length; e3++)
          t3 = this.files[e3], this.reader.setIndex(t3.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t3.readLocalPart(this.reader), t3.handleUTF8(), t3.processAttributes();
      }, readCentralDir: function() {
        var e3;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); )
          (e3 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e3);
        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length)
          throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var e3 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
        if (e3 < 0)
          throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
        this.reader.setIndex(e3);
        var t3 = e3;
        if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (e3 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(e3), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var r2 = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
        var n3 = t3 - r2;
        if (0 < n3)
          this.isSignature(t3, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n3);
        else if (n3 < 0)
          throw new Error("Corrupted zip: missing " + Math.abs(n3) + " bytes.");
      }, prepareReader: function(e3) {
        this.reader = n2(e3);
      }, load: function(e3) {
        this.prepareReader(e3), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, t2.exports = h;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e2, t2, r) {
      var n2 = e2("./reader/readerFor"), s = e2("./utils"), i = e2("./compressedObject"), a = e2("./crc32"), o2 = e2("./utf8"), h = e2("./compressions"), u = e2("./support");
      function l(e3, t3) {
        this.options = e3, this.loadOptions = t3;
      }
      l.prototype = { isEncrypted: function() {
        return 1 == (1 & this.bitFlag);
      }, useUTF8: function() {
        return 2048 == (2048 & this.bitFlag);
      }, readLocalPart: function(e3) {
        var t3, r2;
        if (e3.skip(22), this.fileNameLength = e3.readInt(2), r2 = e3.readInt(2), this.fileName = e3.readData(this.fileNameLength), e3.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize)
          throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if (null === (t3 = function(e4) {
          for (var t4 in h)
            if (Object.prototype.hasOwnProperty.call(h, t4) && h[t4].magic === e4)
              return h[t4];
          return null;
        }(this.compressionMethod)))
          throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t3, e3.readData(this.compressedSize));
      }, readCentralPart: function(e3) {
        this.versionMadeBy = e3.readInt(2), e3.skip(2), this.bitFlag = e3.readInt(2), this.compressionMethod = e3.readString(2), this.date = e3.readDate(), this.crc32 = e3.readInt(4), this.compressedSize = e3.readInt(4), this.uncompressedSize = e3.readInt(4);
        var t3 = e3.readInt(2);
        if (this.extraFieldsLength = e3.readInt(2), this.fileCommentLength = e3.readInt(2), this.diskNumberStart = e3.readInt(2), this.internalFileAttributes = e3.readInt(2), this.externalFileAttributes = e3.readInt(4), this.localHeaderOffset = e3.readInt(4), this.isEncrypted())
          throw new Error("Encrypted zip are not supported");
        e3.skip(t3), this.readExtraFields(e3), this.parseZIP64ExtraField(e3), this.fileComment = e3.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var e3 = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), 0 == e3 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var e3 = n2(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e3.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e3.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e3.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e3.readInt(4));
        }
      }, readExtraFields: function(e3) {
        var t3, r2, n3, i2 = e3.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); e3.index + 4 < i2; )
          t3 = e3.readInt(2), r2 = e3.readInt(2), n3 = e3.readData(r2), this.extraFields[t3] = { id: t3, length: r2, value: n3 };
        e3.setIndex(i2);
      }, handleUTF8: function() {
        var e3 = u.uint8array ? "uint8array" : "array";
        if (this.useUTF8())
          this.fileNameStr = o2.utf8decode(this.fileName), this.fileCommentStr = o2.utf8decode(this.fileComment);
        else {
          var t3 = this.findExtraFieldUnicodePath();
          if (null !== t3)
            this.fileNameStr = t3;
          else {
            var r2 = s.transformTo(e3, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(r2);
          }
          var n3 = this.findExtraFieldUnicodeComment();
          if (null !== n3)
            this.fileCommentStr = n3;
          else {
            var i2 = s.transformTo(e3, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(i2);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var e3 = this.extraFields[28789];
        if (e3) {
          var t3 = n2(e3.value);
          return 1 !== t3.readInt(1) ? null : a(this.fileName) !== t3.readInt(4) ? null : o2.utf8decode(t3.readData(e3.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var e3 = this.extraFields[25461];
        if (e3) {
          var t3 = n2(e3.value);
          return 1 !== t3.readInt(1) ? null : a(this.fileComment) !== t3.readInt(4) ? null : o2.utf8decode(t3.readData(e3.length - 5));
        }
        return null;
      } }, t2.exports = l;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e2, t2, r) {
      function n2(e3, t3, r2) {
        this.name = e3, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t3, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
      }
      var s = e2("./stream/StreamHelper"), i = e2("./stream/DataWorker"), a = e2("./utf8"), o2 = e2("./compressedObject"), h = e2("./stream/GenericWorker");
      n2.prototype = { internalStream: function(e3) {
        var t3 = null, r2 = "string";
        try {
          if (!e3)
            throw new Error("No output type specified.");
          var n3 = "string" === (r2 = e3.toLowerCase()) || "text" === r2;
          "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t3 = this._decompressWorker();
          var i2 = !this._dataBinary;
          i2 && !n3 && (t3 = t3.pipe(new a.Utf8EncodeWorker())), !i2 && n3 && (t3 = t3.pipe(new a.Utf8DecodeWorker()));
        } catch (e4) {
          (t3 = new h("error")).error(e4);
        }
        return new s(t3, r2, "");
      }, async: function(e3, t3) {
        return this.internalStream(e3).accumulate(t3);
      }, nodeStream: function(e3, t3) {
        return this.internalStream(e3 || "nodebuffer").toNodejsStream(t3);
      }, _compressWorker: function(e3, t3) {
        if (this._data instanceof o2 && this._data.compression.magic === e3.magic)
          return this._data.getCompressedWorker();
        var r2 = this._decompressWorker();
        return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o2.createWorkerFrom(r2, e3, t3);
      }, _decompressWorker: function() {
        return this._data instanceof o2 ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
      } };
      for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, f2 = 0; f2 < u.length; f2++)
        n2.prototype[u[f2]] = l;
      t2.exports = n2;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e2, l, t2) {
      (function(t3) {
        var r, n2, e3 = t3.MutationObserver || t3.WebKitMutationObserver;
        if (e3) {
          var i = 0, s = new e3(u), a = t3.document.createTextNode("");
          s.observe(a, { characterData: true }), r = function() {
            a.data = i = ++i % 2;
          };
        } else if (t3.setImmediate || void 0 === t3.MessageChannel)
          r = "document" in t3 && "onreadystatechange" in t3.document.createElement("script") ? function() {
            var e4 = t3.document.createElement("script");
            e4.onreadystatechange = function() {
              u(), e4.onreadystatechange = null, e4.parentNode.removeChild(e4), e4 = null;
            }, t3.document.documentElement.appendChild(e4);
          } : function() {
            setTimeout(u, 0);
          };
        else {
          var o2 = new t3.MessageChannel();
          o2.port1.onmessage = u, r = function() {
            o2.port2.postMessage(0);
          };
        }
        var h = [];
        function u() {
          var e4, t4;
          n2 = true;
          for (var r2 = h.length; r2; ) {
            for (t4 = h, h = [], e4 = -1; ++e4 < r2; )
              t4[e4]();
            r2 = h.length;
          }
          n2 = false;
        }
        l.exports = function(e4) {
          1 !== h.push(e4) || n2 || r();
        };
      }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 37: [function(e2, t2, r) {
      var i = e2("immediate");
      function u() {
      }
      var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n2 = ["PENDING"];
      function o2(e3) {
        if ("function" != typeof e3)
          throw new TypeError("resolver must be a function");
        this.state = n2, this.queue = [], this.outcome = void 0, e3 !== u && d(this, e3);
      }
      function h(e3, t3, r2) {
        this.promise = e3, "function" == typeof t3 && (this.onFulfilled = t3, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
      }
      function f2(t3, r2, n3) {
        i(function() {
          var e3;
          try {
            e3 = r2(n3);
          } catch (e4) {
            return l.reject(t3, e4);
          }
          e3 === t3 ? l.reject(t3, new TypeError("Cannot resolve promise with itself")) : l.resolve(t3, e3);
        });
      }
      function c(e3) {
        var t3 = e3 && e3.then;
        if (e3 && ("object" == typeof e3 || "function" == typeof e3) && "function" == typeof t3)
          return function() {
            t3.apply(e3, arguments);
          };
      }
      function d(t3, e3) {
        var r2 = false;
        function n3(e4) {
          r2 || (r2 = true, l.reject(t3, e4));
        }
        function i2(e4) {
          r2 || (r2 = true, l.resolve(t3, e4));
        }
        var s2 = p2(function() {
          e3(i2, n3);
        });
        "error" === s2.status && n3(s2.value);
      }
      function p2(e3, t3) {
        var r2 = {};
        try {
          r2.value = e3(t3), r2.status = "success";
        } catch (e4) {
          r2.status = "error", r2.value = e4;
        }
        return r2;
      }
      (t2.exports = o2).prototype.finally = function(t3) {
        if ("function" != typeof t3)
          return this;
        var r2 = this.constructor;
        return this.then(function(e3) {
          return r2.resolve(t3()).then(function() {
            return e3;
          });
        }, function(e3) {
          return r2.resolve(t3()).then(function() {
            throw e3;
          });
        });
      }, o2.prototype.catch = function(e3) {
        return this.then(null, e3);
      }, o2.prototype.then = function(e3, t3) {
        if ("function" != typeof e3 && this.state === a || "function" != typeof t3 && this.state === s)
          return this;
        var r2 = new this.constructor(u);
        this.state !== n2 ? f2(r2, this.state === a ? e3 : t3, this.outcome) : this.queue.push(new h(r2, e3, t3));
        return r2;
      }, h.prototype.callFulfilled = function(e3) {
        l.resolve(this.promise, e3);
      }, h.prototype.otherCallFulfilled = function(e3) {
        f2(this.promise, this.onFulfilled, e3);
      }, h.prototype.callRejected = function(e3) {
        l.reject(this.promise, e3);
      }, h.prototype.otherCallRejected = function(e3) {
        f2(this.promise, this.onRejected, e3);
      }, l.resolve = function(e3, t3) {
        var r2 = p2(c, t3);
        if ("error" === r2.status)
          return l.reject(e3, r2.value);
        var n3 = r2.value;
        if (n3)
          d(e3, n3);
        else {
          e3.state = a, e3.outcome = t3;
          for (var i2 = -1, s2 = e3.queue.length; ++i2 < s2; )
            e3.queue[i2].callFulfilled(t3);
        }
        return e3;
      }, l.reject = function(e3, t3) {
        e3.state = s, e3.outcome = t3;
        for (var r2 = -1, n3 = e3.queue.length; ++r2 < n3; )
          e3.queue[r2].callRejected(t3);
        return e3;
      }, o2.resolve = function(e3) {
        if (e3 instanceof this)
          return e3;
        return l.resolve(new this(u), e3);
      }, o2.reject = function(e3) {
        var t3 = new this(u);
        return l.reject(t3, e3);
      }, o2.all = function(e3) {
        var r2 = this;
        if ("[object Array]" !== Object.prototype.toString.call(e3))
          return this.reject(new TypeError("must be an array"));
        var n3 = e3.length, i2 = false;
        if (!n3)
          return this.resolve([]);
        var s2 = new Array(n3), a2 = 0, t3 = -1, o3 = new this(u);
        for (; ++t3 < n3; )
          h2(e3[t3], t3);
        return o3;
        function h2(e4, t4) {
          r2.resolve(e4).then(function(e5) {
            s2[t4] = e5, ++a2 !== n3 || i2 || (i2 = true, l.resolve(o3, s2));
          }, function(e5) {
            i2 || (i2 = true, l.reject(o3, e5));
          });
        }
      }, o2.race = function(e3) {
        var t3 = this;
        if ("[object Array]" !== Object.prototype.toString.call(e3))
          return this.reject(new TypeError("must be an array"));
        var r2 = e3.length, n3 = false;
        if (!r2)
          return this.resolve([]);
        var i2 = -1, s2 = new this(u);
        for (; ++i2 < r2; )
          a2 = e3[i2], t3.resolve(a2).then(function(e4) {
            n3 || (n3 = true, l.resolve(s2, e4));
          }, function(e4) {
            n3 || (n3 = true, l.reject(s2, e4));
          });
        var a2;
        return s2;
      };
    }, { immediate: 36 }], 38: [function(e2, t2, r) {
      var n2 = {};
      (0, e2("./lib/utils/common").assign)(n2, e2("./lib/deflate"), e2("./lib/inflate"), e2("./lib/zlib/constants")), t2.exports = n2;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e2, t2, r) {
      var a = e2("./zlib/deflate"), o2 = e2("./utils/common"), h = e2("./utils/strings"), i = e2("./zlib/messages"), s = e2("./zlib/zstream"), u = Object.prototype.toString, l = 0, f2 = -1, c = 0, d = 8;
      function p2(e3) {
        if (!(this instanceof p2))
          return new p2(e3);
        this.options = o2.assign({ level: f2, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e3 || {});
        var t3 = this.options;
        t3.raw && 0 < t3.windowBits ? t3.windowBits = -t3.windowBits : t3.gzip && 0 < t3.windowBits && t3.windowBits < 16 && (t3.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
        var r2 = a.deflateInit2(this.strm, t3.level, t3.method, t3.windowBits, t3.memLevel, t3.strategy);
        if (r2 !== l)
          throw new Error(i[r2]);
        if (t3.header && a.deflateSetHeader(this.strm, t3.header), t3.dictionary) {
          var n3;
          if (n3 = "string" == typeof t3.dictionary ? h.string2buf(t3.dictionary) : "[object ArrayBuffer]" === u.call(t3.dictionary) ? new Uint8Array(t3.dictionary) : t3.dictionary, (r2 = a.deflateSetDictionary(this.strm, n3)) !== l)
            throw new Error(i[r2]);
          this._dict_set = true;
        }
      }
      function n2(e3, t3) {
        var r2 = new p2(t3);
        if (r2.push(e3, true), r2.err)
          throw r2.msg || i[r2.err];
        return r2.result;
      }
      p2.prototype.push = function(e3, t3) {
        var r2, n3, i2 = this.strm, s2 = this.options.chunkSize;
        if (this.ended)
          return false;
        n3 = t3 === ~~t3 ? t3 : true === t3 ? 4 : 0, "string" == typeof e3 ? i2.input = h.string2buf(e3) : "[object ArrayBuffer]" === u.call(e3) ? i2.input = new Uint8Array(e3) : i2.input = e3, i2.next_in = 0, i2.avail_in = i2.input.length;
        do {
          if (0 === i2.avail_out && (i2.output = new o2.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n3)) && r2 !== l)
            return this.onEnd(r2), !(this.ended = true);
          0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n3 && 2 !== n3) || ("string" === this.options.to ? this.onData(h.buf2binstring(o2.shrinkBuf(i2.output, i2.next_out))) : this.onData(o2.shrinkBuf(i2.output, i2.next_out)));
        } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
        return 4 === n3 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n3 || (this.onEnd(l), !(i2.avail_out = 0));
      }, p2.prototype.onData = function(e3) {
        this.chunks.push(e3);
      }, p2.prototype.onEnd = function(e3) {
        e3 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o2.flattenChunks(this.chunks)), this.chunks = [], this.err = e3, this.msg = this.strm.msg;
      }, r.Deflate = p2, r.deflate = n2, r.deflateRaw = function(e3, t3) {
        return (t3 = t3 || {}).raw = true, n2(e3, t3);
      }, r.gzip = function(e3, t3) {
        return (t3 = t3 || {}).gzip = true, n2(e3, t3);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e2, t2, r) {
      var c = e2("./zlib/inflate"), d = e2("./utils/common"), p2 = e2("./utils/strings"), m = e2("./zlib/constants"), n2 = e2("./zlib/messages"), i = e2("./zlib/zstream"), s = e2("./zlib/gzheader"), _ = Object.prototype.toString;
      function a(e3) {
        if (!(this instanceof a))
          return new a(e3);
        this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e3 || {});
        var t3 = this.options;
        t3.raw && 0 <= t3.windowBits && t3.windowBits < 16 && (t3.windowBits = -t3.windowBits, 0 === t3.windowBits && (t3.windowBits = -15)), !(0 <= t3.windowBits && t3.windowBits < 16) || e3 && e3.windowBits || (t3.windowBits += 32), 15 < t3.windowBits && t3.windowBits < 48 && 0 == (15 & t3.windowBits) && (t3.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
        var r2 = c.inflateInit2(this.strm, t3.windowBits);
        if (r2 !== m.Z_OK)
          throw new Error(n2[r2]);
        this.header = new s(), c.inflateGetHeader(this.strm, this.header);
      }
      function o2(e3, t3) {
        var r2 = new a(t3);
        if (r2.push(e3, true), r2.err)
          throw r2.msg || n2[r2.err];
        return r2.result;
      }
      a.prototype.push = function(e3, t3) {
        var r2, n3, i2, s2, a2, o3, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f2 = false;
        if (this.ended)
          return false;
        n3 = t3 === ~~t3 ? t3 : true === t3 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e3 ? h.input = p2.binstring2buf(e3) : "[object ArrayBuffer]" === _.call(e3) ? h.input = new Uint8Array(e3) : h.input = e3, h.next_in = 0, h.avail_in = h.input.length;
        do {
          if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o3 = "string" == typeof l ? p2.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o3)), r2 === m.Z_BUF_ERROR && true === f2 && (r2 = m.Z_OK, f2 = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK)
            return this.onEnd(r2), !(this.ended = true);
          h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n3 !== m.Z_FINISH && n3 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p2.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p2.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f2 = true);
        } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
        return r2 === m.Z_STREAM_END && (n3 = m.Z_FINISH), n3 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n3 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
      }, a.prototype.onData = function(e3) {
        this.chunks.push(e3);
      }, a.prototype.onEnd = function(e3) {
        e3 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e3, this.msg = this.strm.msg;
      }, r.Inflate = a, r.inflate = o2, r.inflateRaw = function(e3, t3) {
        return (t3 = t3 || {}).raw = true, o2(e3, t3);
      }, r.ungzip = o2;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e2, t2, r) {
      var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      r.assign = function(e3) {
        for (var t3 = Array.prototype.slice.call(arguments, 1); t3.length; ) {
          var r2 = t3.shift();
          if (r2) {
            if ("object" != typeof r2)
              throw new TypeError(r2 + "must be non-object");
            for (var n3 in r2)
              r2.hasOwnProperty(n3) && (e3[n3] = r2[n3]);
          }
        }
        return e3;
      }, r.shrinkBuf = function(e3, t3) {
        return e3.length === t3 ? e3 : e3.subarray ? e3.subarray(0, t3) : (e3.length = t3, e3);
      };
      var i = { arraySet: function(e3, t3, r2, n3, i2) {
        if (t3.subarray && e3.subarray)
          e3.set(t3.subarray(r2, r2 + n3), i2);
        else
          for (var s2 = 0; s2 < n3; s2++)
            e3[i2 + s2] = t3[r2 + s2];
      }, flattenChunks: function(e3) {
        var t3, r2, n3, i2, s2, a;
        for (t3 = n3 = 0, r2 = e3.length; t3 < r2; t3++)
          n3 += e3[t3].length;
        for (a = new Uint8Array(n3), t3 = i2 = 0, r2 = e3.length; t3 < r2; t3++)
          s2 = e3[t3], a.set(s2, i2), i2 += s2.length;
        return a;
      } }, s = { arraySet: function(e3, t3, r2, n3, i2) {
        for (var s2 = 0; s2 < n3; s2++)
          e3[i2 + s2] = t3[r2 + s2];
      }, flattenChunks: function(e3) {
        return [].concat.apply([], e3);
      } };
      r.setTyped = function(e3) {
        e3 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
      }, r.setTyped(n2);
    }, {}], 42: [function(e2, t2, r) {
      var h = e2("./common"), i = true, s = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e3) {
        i = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e3) {
        s = false;
      }
      for (var u = new h.Buf8(256), n2 = 0; n2 < 256; n2++)
        u[n2] = 252 <= n2 ? 6 : 248 <= n2 ? 5 : 240 <= n2 ? 4 : 224 <= n2 ? 3 : 192 <= n2 ? 2 : 1;
      function l(e3, t3) {
        if (t3 < 65537 && (e3.subarray && s || !e3.subarray && i))
          return String.fromCharCode.apply(null, h.shrinkBuf(e3, t3));
        for (var r2 = "", n3 = 0; n3 < t3; n3++)
          r2 += String.fromCharCode(e3[n3]);
        return r2;
      }
      u[254] = u[254] = 1, r.string2buf = function(e3) {
        var t3, r2, n3, i2, s2, a = e3.length, o2 = 0;
        for (i2 = 0; i2 < a; i2++)
          55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n3 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
        for (t3 = new h.Buf8(o2), i2 = s2 = 0; s2 < o2; i2++)
          55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n3 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i2++), r2 < 128 ? t3[s2++] = r2 : (r2 < 2048 ? t3[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s2++] = 224 | r2 >>> 12 : (t3[s2++] = 240 | r2 >>> 18, t3[s2++] = 128 | r2 >>> 12 & 63), t3[s2++] = 128 | r2 >>> 6 & 63), t3[s2++] = 128 | 63 & r2);
        return t3;
      }, r.buf2binstring = function(e3) {
        return l(e3, e3.length);
      }, r.binstring2buf = function(e3) {
        for (var t3 = new h.Buf8(e3.length), r2 = 0, n3 = t3.length; r2 < n3; r2++)
          t3[r2] = e3.charCodeAt(r2);
        return t3;
      }, r.buf2string = function(e3, t3) {
        var r2, n3, i2, s2, a = t3 || e3.length, o2 = new Array(2 * a);
        for (r2 = n3 = 0; r2 < a; )
          if ((i2 = e3[r2++]) < 128)
            o2[n3++] = i2;
          else if (4 < (s2 = u[i2]))
            o2[n3++] = 65533, r2 += s2 - 1;
          else {
            for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; )
              i2 = i2 << 6 | 63 & e3[r2++], s2--;
            1 < s2 ? o2[n3++] = 65533 : i2 < 65536 ? o2[n3++] = i2 : (i2 -= 65536, o2[n3++] = 55296 | i2 >> 10 & 1023, o2[n3++] = 56320 | 1023 & i2);
          }
        return l(o2, n3);
      }, r.utf8border = function(e3, t3) {
        var r2;
        for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r2 = t3 - 1; 0 <= r2 && 128 == (192 & e3[r2]); )
          r2--;
        return r2 < 0 ? t3 : 0 === r2 ? t3 : r2 + u[e3[r2]] > t3 ? r2 : t3;
      };
    }, { "./common": 41 }], 43: [function(e2, t2, r) {
      t2.exports = function(e3, t3, r2, n2) {
        for (var i = 65535 & e3 | 0, s = e3 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
          for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t3[n2++] | 0) | 0, --a; )
            ;
          i %= 65521, s %= 65521;
        }
        return i | s << 16 | 0;
      };
    }, {}], 44: [function(e2, t2, r) {
      t2.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(e2, t2, r) {
      var o2 = function() {
        for (var e3, t3 = [], r2 = 0; r2 < 256; r2++) {
          e3 = r2;
          for (var n2 = 0; n2 < 8; n2++)
            e3 = 1 & e3 ? 3988292384 ^ e3 >>> 1 : e3 >>> 1;
          t3[r2] = e3;
        }
        return t3;
      }();
      t2.exports = function(e3, t3, r2, n2) {
        var i = o2, s = n2 + r2;
        e3 ^= -1;
        for (var a = n2; a < s; a++)
          e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
        return -1 ^ e3;
      };
    }, {}], 46: [function(e2, t2, r) {
      var h, c = e2("../utils/common"), u = e2("./trees"), d = e2("./adler32"), p2 = e2("./crc32"), n2 = e2("./messages"), l = 0, f2 = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o2 = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E2 = 113, A = 1, I = 2, O = 3, B = 4;
      function R(e3, t3) {
        return e3.msg = n2[t3], t3;
      }
      function T(e3) {
        return (e3 << 1) - (4 < e3 ? 9 : 0);
      }
      function D(e3) {
        for (var t3 = e3.length; 0 <= --t3; )
          e3[t3] = 0;
      }
      function F(e3) {
        var t3 = e3.state, r2 = t3.pending;
        r2 > e3.avail_out && (r2 = e3.avail_out), 0 !== r2 && (c.arraySet(e3.output, t3.pending_buf, t3.pending_out, r2, e3.next_out), e3.next_out += r2, t3.pending_out += r2, e3.total_out += r2, e3.avail_out -= r2, t3.pending -= r2, 0 === t3.pending && (t3.pending_out = 0));
      }
      function N(e3, t3) {
        u._tr_flush_block(e3, 0 <= e3.block_start ? e3.block_start : -1, e3.strstart - e3.block_start, t3), e3.block_start = e3.strstart, F(e3.strm);
      }
      function U(e3, t3) {
        e3.pending_buf[e3.pending++] = t3;
      }
      function P(e3, t3) {
        e3.pending_buf[e3.pending++] = t3 >>> 8 & 255, e3.pending_buf[e3.pending++] = 255 & t3;
      }
      function L(e3, t3) {
        var r2, n3, i2 = e3.max_chain_length, s2 = e3.strstart, a2 = e3.prev_length, o3 = e3.nice_match, h2 = e3.strstart > e3.w_size - z ? e3.strstart - (e3.w_size - z) : 0, u2 = e3.window, l2 = e3.w_mask, f3 = e3.prev, c2 = e3.strstart + S, d2 = u2[s2 + a2 - 1], p3 = u2[s2 + a2];
        e3.prev_length >= e3.good_match && (i2 >>= 2), o3 > e3.lookahead && (o3 = e3.lookahead);
        do {
          if (u2[(r2 = t3) + a2] === p3 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
            s2 += 2, r2++;
            do {
            } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
            if (n3 = S - (c2 - s2), s2 = c2 - S, a2 < n3) {
              if (e3.match_start = t3, o3 <= (a2 = n3))
                break;
              d2 = u2[s2 + a2 - 1], p3 = u2[s2 + a2];
            }
          }
        } while ((t3 = f3[t3 & l2]) > h2 && 0 != --i2);
        return a2 <= e3.lookahead ? a2 : e3.lookahead;
      }
      function j(e3) {
        var t3, r2, n3, i2, s2, a2, o3, h2, u2, l2, f3 = e3.w_size;
        do {
          if (i2 = e3.window_size - e3.lookahead - e3.strstart, e3.strstart >= f3 + (f3 - z)) {
            for (c.arraySet(e3.window, e3.window, f3, f3, 0), e3.match_start -= f3, e3.strstart -= f3, e3.block_start -= f3, t3 = r2 = e3.hash_size; n3 = e3.head[--t3], e3.head[t3] = f3 <= n3 ? n3 - f3 : 0, --r2; )
              ;
            for (t3 = r2 = f3; n3 = e3.prev[--t3], e3.prev[t3] = f3 <= n3 ? n3 - f3 : 0, --r2; )
              ;
            i2 += f3;
          }
          if (0 === e3.strm.avail_in)
            break;
          if (a2 = e3.strm, o3 = e3.window, h2 = e3.strstart + e3.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o3, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o3, l2, h2) : 2 === a2.state.wrap && (a2.adler = p2(a2.adler, o3, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e3.lookahead += r2, e3.lookahead + e3.insert >= x)
            for (s2 = e3.strstart - e3.insert, e3.ins_h = e3.window[s2], e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[s2 + 1]) & e3.hash_mask; e3.insert && (e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[s2 + x - 1]) & e3.hash_mask, e3.prev[s2 & e3.w_mask] = e3.head[e3.ins_h], e3.head[e3.ins_h] = s2, s2++, e3.insert--, !(e3.lookahead + e3.insert < x)); )
              ;
        } while (e3.lookahead < z && 0 !== e3.strm.avail_in);
      }
      function Z(e3, t3) {
        for (var r2, n3; ; ) {
          if (e3.lookahead < z) {
            if (j(e3), e3.lookahead < z && t3 === l)
              return A;
            if (0 === e3.lookahead)
              break;
          }
          if (r2 = 0, e3.lookahead >= x && (e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[e3.strstart + x - 1]) & e3.hash_mask, r2 = e3.prev[e3.strstart & e3.w_mask] = e3.head[e3.ins_h], e3.head[e3.ins_h] = e3.strstart), 0 !== r2 && e3.strstart - r2 <= e3.w_size - z && (e3.match_length = L(e3, r2)), e3.match_length >= x)
            if (n3 = u._tr_tally(e3, e3.strstart - e3.match_start, e3.match_length - x), e3.lookahead -= e3.match_length, e3.match_length <= e3.max_lazy_match && e3.lookahead >= x) {
              for (e3.match_length--; e3.strstart++, e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[e3.strstart + x - 1]) & e3.hash_mask, r2 = e3.prev[e3.strstart & e3.w_mask] = e3.head[e3.ins_h], e3.head[e3.ins_h] = e3.strstart, 0 != --e3.match_length; )
                ;
              e3.strstart++;
            } else
              e3.strstart += e3.match_length, e3.match_length = 0, e3.ins_h = e3.window[e3.strstart], e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[e3.strstart + 1]) & e3.hash_mask;
          else
            n3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++;
          if (n3 && (N(e3, false), 0 === e3.strm.avail_out))
            return A;
        }
        return e3.insert = e3.strstart < x - 1 ? e3.strstart : x - 1, t3 === f2 ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
      }
      function W(e3, t3) {
        for (var r2, n3, i2; ; ) {
          if (e3.lookahead < z) {
            if (j(e3), e3.lookahead < z && t3 === l)
              return A;
            if (0 === e3.lookahead)
              break;
          }
          if (r2 = 0, e3.lookahead >= x && (e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[e3.strstart + x - 1]) & e3.hash_mask, r2 = e3.prev[e3.strstart & e3.w_mask] = e3.head[e3.ins_h], e3.head[e3.ins_h] = e3.strstart), e3.prev_length = e3.match_length, e3.prev_match = e3.match_start, e3.match_length = x - 1, 0 !== r2 && e3.prev_length < e3.max_lazy_match && e3.strstart - r2 <= e3.w_size - z && (e3.match_length = L(e3, r2), e3.match_length <= 5 && (1 === e3.strategy || e3.match_length === x && 4096 < e3.strstart - e3.match_start) && (e3.match_length = x - 1)), e3.prev_length >= x && e3.match_length <= e3.prev_length) {
            for (i2 = e3.strstart + e3.lookahead - x, n3 = u._tr_tally(e3, e3.strstart - 1 - e3.prev_match, e3.prev_length - x), e3.lookahead -= e3.prev_length - 1, e3.prev_length -= 2; ++e3.strstart <= i2 && (e3.ins_h = (e3.ins_h << e3.hash_shift ^ e3.window[e3.strstart + x - 1]) & e3.hash_mask, r2 = e3.prev[e3.strstart & e3.w_mask] = e3.head[e3.ins_h], e3.head[e3.ins_h] = e3.strstart), 0 != --e3.prev_length; )
              ;
            if (e3.match_available = 0, e3.match_length = x - 1, e3.strstart++, n3 && (N(e3, false), 0 === e3.strm.avail_out))
              return A;
          } else if (e3.match_available) {
            if ((n3 = u._tr_tally(e3, 0, e3.window[e3.strstart - 1])) && N(e3, false), e3.strstart++, e3.lookahead--, 0 === e3.strm.avail_out)
              return A;
          } else
            e3.match_available = 1, e3.strstart++, e3.lookahead--;
        }
        return e3.match_available && (n3 = u._tr_tally(e3, 0, e3.window[e3.strstart - 1]), e3.match_available = 0), e3.insert = e3.strstart < x - 1 ? e3.strstart : x - 1, t3 === f2 ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
      }
      function M(e3, t3, r2, n3, i2) {
        this.good_length = e3, this.max_lazy = t3, this.nice_length = r2, this.max_chain = n3, this.func = i2;
      }
      function H() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o2 + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function G(e3) {
        var t3;
        return e3 && e3.state ? (e3.total_in = e3.total_out = 0, e3.data_type = i, (t3 = e3.state).pending = 0, t3.pending_out = 0, t3.wrap < 0 && (t3.wrap = -t3.wrap), t3.status = t3.wrap ? C : E2, e3.adler = 2 === t3.wrap ? 0 : 1, t3.last_flush = l, u._tr_init(t3), m) : R(e3, _);
      }
      function K(e3) {
        var t3 = G(e3);
        return t3 === m && function(e4) {
          e4.window_size = 2 * e4.w_size, D(e4.head), e4.max_lazy_match = h[e4.level].max_lazy, e4.good_match = h[e4.level].good_length, e4.nice_match = h[e4.level].nice_length, e4.max_chain_length = h[e4.level].max_chain, e4.strstart = 0, e4.block_start = 0, e4.lookahead = 0, e4.insert = 0, e4.match_length = e4.prev_length = x - 1, e4.match_available = 0, e4.ins_h = 0;
        }(e3.state), t3;
      }
      function Y(e3, t3, r2, n3, i2, s2) {
        if (!e3)
          return _;
        var a2 = 1;
        if (t3 === g && (t3 = 6), n3 < 0 ? (a2 = 0, n3 = -n3) : 15 < n3 && (a2 = 2, n3 -= 16), i2 < 1 || y < i2 || r2 !== v || n3 < 8 || 15 < n3 || t3 < 0 || 9 < t3 || s2 < 0 || b < s2)
          return R(e3, _);
        8 === n3 && (n3 = 9);
        var o3 = new H();
        return (e3.state = o3).strm = e3, o3.wrap = a2, o3.gzhead = null, o3.w_bits = n3, o3.w_size = 1 << o3.w_bits, o3.w_mask = o3.w_size - 1, o3.hash_bits = i2 + 7, o3.hash_size = 1 << o3.hash_bits, o3.hash_mask = o3.hash_size - 1, o3.hash_shift = ~~((o3.hash_bits + x - 1) / x), o3.window = new c.Buf8(2 * o3.w_size), o3.head = new c.Buf16(o3.hash_size), o3.prev = new c.Buf16(o3.w_size), o3.lit_bufsize = 1 << i2 + 6, o3.pending_buf_size = 4 * o3.lit_bufsize, o3.pending_buf = new c.Buf8(o3.pending_buf_size), o3.d_buf = 1 * o3.lit_bufsize, o3.l_buf = 3 * o3.lit_bufsize, o3.level = t3, o3.strategy = s2, o3.method = r2, K(e3);
      }
      h = [new M(0, 0, 0, 0, function(e3, t3) {
        var r2 = 65535;
        for (r2 > e3.pending_buf_size - 5 && (r2 = e3.pending_buf_size - 5); ; ) {
          if (e3.lookahead <= 1) {
            if (j(e3), 0 === e3.lookahead && t3 === l)
              return A;
            if (0 === e3.lookahead)
              break;
          }
          e3.strstart += e3.lookahead, e3.lookahead = 0;
          var n3 = e3.block_start + r2;
          if ((0 === e3.strstart || e3.strstart >= n3) && (e3.lookahead = e3.strstart - n3, e3.strstart = n3, N(e3, false), 0 === e3.strm.avail_out))
            return A;
          if (e3.strstart - e3.block_start >= e3.w_size - z && (N(e3, false), 0 === e3.strm.avail_out))
            return A;
        }
        return e3.insert = 0, t3 === f2 ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : (e3.strstart > e3.block_start && (N(e3, false), e3.strm.avail_out), A);
      }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e3, t3) {
        return Y(e3, t3, v, 15, 8, 0);
      }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e3, t3) {
        return e3 && e3.state ? 2 !== e3.state.wrap ? _ : (e3.state.gzhead = t3, m) : _;
      }, r.deflate = function(e3, t3) {
        var r2, n3, i2, s2;
        if (!e3 || !e3.state || 5 < t3 || t3 < 0)
          return e3 ? R(e3, _) : _;
        if (n3 = e3.state, !e3.output || !e3.input && 0 !== e3.avail_in || 666 === n3.status && t3 !== f2)
          return R(e3, 0 === e3.avail_out ? -5 : _);
        if (n3.strm = e3, r2 = n3.last_flush, n3.last_flush = t3, n3.status === C)
          if (2 === n3.wrap)
            e3.adler = 0, U(n3, 31), U(n3, 139), U(n3, 8), n3.gzhead ? (U(n3, (n3.gzhead.text ? 1 : 0) + (n3.gzhead.hcrc ? 2 : 0) + (n3.gzhead.extra ? 4 : 0) + (n3.gzhead.name ? 8 : 0) + (n3.gzhead.comment ? 16 : 0)), U(n3, 255 & n3.gzhead.time), U(n3, n3.gzhead.time >> 8 & 255), U(n3, n3.gzhead.time >> 16 & 255), U(n3, n3.gzhead.time >> 24 & 255), U(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U(n3, 255 & n3.gzhead.os), n3.gzhead.extra && n3.gzhead.extra.length && (U(n3, 255 & n3.gzhead.extra.length), U(n3, n3.gzhead.extra.length >> 8 & 255)), n3.gzhead.hcrc && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending, 0)), n3.gzindex = 0, n3.status = 69) : (U(n3, 0), U(n3, 0), U(n3, 0), U(n3, 0), U(n3, 0), U(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U(n3, 3), n3.status = E2);
          else {
            var a2 = v + (n3.w_bits - 8 << 4) << 8;
            a2 |= (2 <= n3.strategy || n3.level < 2 ? 0 : n3.level < 6 ? 1 : 6 === n3.level ? 2 : 3) << 6, 0 !== n3.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n3.status = E2, P(n3, a2), 0 !== n3.strstart && (P(n3, e3.adler >>> 16), P(n3, 65535 & e3.adler)), e3.adler = 1;
          }
        if (69 === n3.status)
          if (n3.gzhead.extra) {
            for (i2 = n3.pending; n3.gzindex < (65535 & n3.gzhead.extra.length) && (n3.pending !== n3.pending_buf_size || (n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), F(e3), i2 = n3.pending, n3.pending !== n3.pending_buf_size)); )
              U(n3, 255 & n3.gzhead.extra[n3.gzindex]), n3.gzindex++;
            n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), n3.gzindex === n3.gzhead.extra.length && (n3.gzindex = 0, n3.status = 73);
          } else
            n3.status = 73;
        if (73 === n3.status)
          if (n3.gzhead.name) {
            i2 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), F(e3), i2 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.name.length ? 255 & n3.gzhead.name.charCodeAt(n3.gzindex++) : 0, U(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), 0 === s2 && (n3.gzindex = 0, n3.status = 91);
          } else
            n3.status = 91;
        if (91 === n3.status)
          if (n3.gzhead.comment) {
            i2 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), F(e3), i2 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.comment.length ? 255 & n3.gzhead.comment.charCodeAt(n3.gzindex++) : 0, U(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i2 && (e3.adler = p2(e3.adler, n3.pending_buf, n3.pending - i2, i2)), 0 === s2 && (n3.status = 103);
          } else
            n3.status = 103;
        if (103 === n3.status && (n3.gzhead.hcrc ? (n3.pending + 2 > n3.pending_buf_size && F(e3), n3.pending + 2 <= n3.pending_buf_size && (U(n3, 255 & e3.adler), U(n3, e3.adler >> 8 & 255), e3.adler = 0, n3.status = E2)) : n3.status = E2), 0 !== n3.pending) {
          if (F(e3), 0 === e3.avail_out)
            return n3.last_flush = -1, m;
        } else if (0 === e3.avail_in && T(t3) <= T(r2) && t3 !== f2)
          return R(e3, -5);
        if (666 === n3.status && 0 !== e3.avail_in)
          return R(e3, -5);
        if (0 !== e3.avail_in || 0 !== n3.lookahead || t3 !== l && 666 !== n3.status) {
          var o3 = 2 === n3.strategy ? function(e4, t4) {
            for (var r3; ; ) {
              if (0 === e4.lookahead && (j(e4), 0 === e4.lookahead)) {
                if (t4 === l)
                  return A;
                break;
              }
              if (e4.match_length = 0, r3 = u._tr_tally(e4, 0, e4.window[e4.strstart]), e4.lookahead--, e4.strstart++, r3 && (N(e4, false), 0 === e4.strm.avail_out))
                return A;
            }
            return e4.insert = 0, t4 === f2 ? (N(e4, true), 0 === e4.strm.avail_out ? O : B) : e4.last_lit && (N(e4, false), 0 === e4.strm.avail_out) ? A : I;
          }(n3, t3) : 3 === n3.strategy ? function(e4, t4) {
            for (var r3, n4, i3, s3, a3 = e4.window; ; ) {
              if (e4.lookahead <= S) {
                if (j(e4), e4.lookahead <= S && t4 === l)
                  return A;
                if (0 === e4.lookahead)
                  break;
              }
              if (e4.match_length = 0, e4.lookahead >= x && 0 < e4.strstart && (n4 = a3[i3 = e4.strstart - 1]) === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3]) {
                s3 = e4.strstart + S;
                do {
                } while (n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && n4 === a3[++i3] && i3 < s3);
                e4.match_length = S - (s3 - i3), e4.match_length > e4.lookahead && (e4.match_length = e4.lookahead);
              }
              if (e4.match_length >= x ? (r3 = u._tr_tally(e4, 1, e4.match_length - x), e4.lookahead -= e4.match_length, e4.strstart += e4.match_length, e4.match_length = 0) : (r3 = u._tr_tally(e4, 0, e4.window[e4.strstart]), e4.lookahead--, e4.strstart++), r3 && (N(e4, false), 0 === e4.strm.avail_out))
                return A;
            }
            return e4.insert = 0, t4 === f2 ? (N(e4, true), 0 === e4.strm.avail_out ? O : B) : e4.last_lit && (N(e4, false), 0 === e4.strm.avail_out) ? A : I;
          }(n3, t3) : h[n3.level].func(n3, t3);
          if (o3 !== O && o3 !== B || (n3.status = 666), o3 === A || o3 === O)
            return 0 === e3.avail_out && (n3.last_flush = -1), m;
          if (o3 === I && (1 === t3 ? u._tr_align(n3) : 5 !== t3 && (u._tr_stored_block(n3, 0, 0, false), 3 === t3 && (D(n3.head), 0 === n3.lookahead && (n3.strstart = 0, n3.block_start = 0, n3.insert = 0))), F(e3), 0 === e3.avail_out))
            return n3.last_flush = -1, m;
        }
        return t3 !== f2 ? m : n3.wrap <= 0 ? 1 : (2 === n3.wrap ? (U(n3, 255 & e3.adler), U(n3, e3.adler >> 8 & 255), U(n3, e3.adler >> 16 & 255), U(n3, e3.adler >> 24 & 255), U(n3, 255 & e3.total_in), U(n3, e3.total_in >> 8 & 255), U(n3, e3.total_in >> 16 & 255), U(n3, e3.total_in >> 24 & 255)) : (P(n3, e3.adler >>> 16), P(n3, 65535 & e3.adler)), F(e3), 0 < n3.wrap && (n3.wrap = -n3.wrap), 0 !== n3.pending ? m : 1);
      }, r.deflateEnd = function(e3) {
        var t3;
        return e3 && e3.state ? (t3 = e3.state.status) !== C && 69 !== t3 && 73 !== t3 && 91 !== t3 && 103 !== t3 && t3 !== E2 && 666 !== t3 ? R(e3, _) : (e3.state = null, t3 === E2 ? R(e3, -3) : m) : _;
      }, r.deflateSetDictionary = function(e3, t3) {
        var r2, n3, i2, s2, a2, o3, h2, u2, l2 = t3.length;
        if (!e3 || !e3.state)
          return _;
        if (2 === (s2 = (r2 = e3.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead)
          return _;
        for (1 === s2 && (e3.adler = d(e3.adler, t3, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t3, l2 - r2.w_size, r2.w_size, 0), t3 = u2, l2 = r2.w_size), a2 = e3.avail_in, o3 = e3.next_in, h2 = e3.input, e3.avail_in = l2, e3.next_in = 0, e3.input = t3, j(r2); r2.lookahead >= x; ) {
          for (n3 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n3 + x - 1]) & r2.hash_mask, r2.prev[n3 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n3, n3++, --i2; )
            ;
          r2.strstart = n3, r2.lookahead = x - 1, j(r2);
        }
        return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e3.next_in = o3, e3.input = h2, e3.avail_in = a2, r2.wrap = s2, m;
      }, r.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e2, t2, r) {
      t2.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function(e2, t2, r) {
      t2.exports = function(e3, t3) {
        var r2, n2, i, s, a, o2, h, u, l, f2, c, d, p2, m, _, g, b, v, y, w, k, x, S, z, C;
        r2 = e3.state, n2 = e3.next_in, z = e3.input, i = n2 + (e3.avail_in - 5), s = e3.next_out, C = e3.output, a = s - (t3 - e3.avail_out), o2 = s + (e3.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f2 = r2.wnext, c = r2.window, d = r2.hold, p2 = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
        e:
          do {
            p2 < 15 && (d += z[n2++] << p2, p2 += 8, d += z[n2++] << p2, p2 += 8), v = m[d & g];
            t:
              for (; ; ) {
                if (d >>>= y = v >>> 24, p2 -= y, 0 === (y = v >>> 16 & 255))
                  C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e3.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p2 < y && (d += z[n2++] << p2, p2 += 8), w += d & (1 << y) - 1, d >>>= y, p2 -= y), p2 < 15 && (d += z[n2++] << p2, p2 += 8, d += z[n2++] << p2, p2 += 8), v = _[d & b];
                  r:
                    for (; ; ) {
                      if (d >>>= y = v >>> 24, p2 -= y, !(16 & (y = v >>> 16 & 255))) {
                        if (0 == (64 & y)) {
                          v = _[(65535 & v) + (d & (1 << y) - 1)];
                          continue r;
                        }
                        e3.msg = "invalid distance code", r2.mode = 30;
                        break e;
                      }
                      if (k = 65535 & v, p2 < (y &= 15) && (d += z[n2++] << p2, (p2 += 8) < y && (d += z[n2++] << p2, p2 += 8)), h < (k += d & (1 << y) - 1)) {
                        e3.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (d >>>= y, p2 -= y, (y = s - a) < k) {
                        if (l < (y = k - y) && r2.sane) {
                          e3.msg = "invalid distance too far back", r2.mode = 30;
                          break e;
                        }
                        if (S = c, (x = 0) === f2) {
                          if (x += u - y, y < w) {
                            for (w -= y; C[s++] = c[x++], --y; )
                              ;
                            x = s - k, S = C;
                          }
                        } else if (f2 < y) {
                          if (x += u + f2 - y, (y -= f2) < w) {
                            for (w -= y; C[s++] = c[x++], --y; )
                              ;
                            if (x = 0, f2 < w) {
                              for (w -= y = f2; C[s++] = c[x++], --y; )
                                ;
                              x = s - k, S = C;
                            }
                          }
                        } else if (x += f2 - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; )
                            ;
                          x = s - k, S = C;
                        }
                        for (; 2 < w; )
                          C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                        w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                      } else {
                        for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); )
                          ;
                        w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                      }
                      break;
                    }
                }
                break;
              }
          } while (n2 < i && s < o2);
        n2 -= w = p2 >> 3, d &= (1 << (p2 -= w << 3)) - 1, e3.next_in = n2, e3.next_out = s, e3.avail_in = n2 < i ? i - n2 + 5 : 5 - (n2 - i), e3.avail_out = s < o2 ? o2 - s + 257 : 257 - (s - o2), r2.hold = d, r2.bits = p2;
      };
    }, {}], 49: [function(e2, t2, r) {
      var I = e2("../utils/common"), O = e2("./adler32"), B = e2("./crc32"), R = e2("./inffast"), T = e2("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n2 = 852, i = 592;
      function L(e3) {
        return (e3 >>> 24 & 255) + (e3 >>> 8 & 65280) + ((65280 & e3) << 8) + ((255 & e3) << 24);
      }
      function s() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function a(e3) {
        var t3;
        return e3 && e3.state ? (t3 = e3.state, e3.total_in = e3.total_out = t3.total = 0, e3.msg = "", t3.wrap && (e3.adler = 1 & t3.wrap), t3.mode = P, t3.last = 0, t3.havedict = 0, t3.dmax = 32768, t3.head = null, t3.hold = 0, t3.bits = 0, t3.lencode = t3.lendyn = new I.Buf32(n2), t3.distcode = t3.distdyn = new I.Buf32(i), t3.sane = 1, t3.back = -1, N) : U;
      }
      function o2(e3) {
        var t3;
        return e3 && e3.state ? ((t3 = e3.state).wsize = 0, t3.whave = 0, t3.wnext = 0, a(e3)) : U;
      }
      function h(e3, t3) {
        var r2, n3;
        return e3 && e3.state ? (n3 = e3.state, t3 < 0 ? (r2 = 0, t3 = -t3) : (r2 = 1 + (t3 >> 4), t3 < 48 && (t3 &= 15)), t3 && (t3 < 8 || 15 < t3) ? U : (null !== n3.window && n3.wbits !== t3 && (n3.window = null), n3.wrap = r2, n3.wbits = t3, o2(e3))) : U;
      }
      function u(e3, t3) {
        var r2, n3;
        return e3 ? (n3 = new s(), (e3.state = n3).window = null, (r2 = h(e3, t3)) !== N && (e3.state = null), r2) : U;
      }
      var l, f2, c = true;
      function j(e3) {
        if (c) {
          var t3;
          for (l = new I.Buf32(512), f2 = new I.Buf32(32), t3 = 0; t3 < 144; )
            e3.lens[t3++] = 8;
          for (; t3 < 256; )
            e3.lens[t3++] = 9;
          for (; t3 < 280; )
            e3.lens[t3++] = 7;
          for (; t3 < 288; )
            e3.lens[t3++] = 8;
          for (T(D, e3.lens, 0, 288, l, 0, e3.work, { bits: 9 }), t3 = 0; t3 < 32; )
            e3.lens[t3++] = 5;
          T(F, e3.lens, 0, 32, f2, 0, e3.work, { bits: 5 }), c = false;
        }
        e3.lencode = l, e3.lenbits = 9, e3.distcode = f2, e3.distbits = 5;
      }
      function Z(e3, t3, r2, n3) {
        var i2, s2 = e3.state;
        return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n3 >= s2.wsize ? (I.arraySet(s2.window, t3, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n3 < (i2 = s2.wsize - s2.wnext) && (i2 = n3), I.arraySet(s2.window, t3, r2 - n3, i2, s2.wnext), (n3 -= i2) ? (I.arraySet(s2.window, t3, r2 - n3, n3, 0), s2.wnext = n3, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
      }
      r.inflateReset = o2, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e3) {
        return u(e3, 15);
      }, r.inflateInit2 = u, r.inflate = function(e3, t3) {
        var r2, n3, i2, s2, a2, o3, h2, u2, l2, f3, c2, d, p2, m, _, g, b, v, y, w, k, x, S, z, C = 0, E2 = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e3 || !e3.state || !e3.output || !e3.input && 0 !== e3.avail_in)
          return U;
        12 === (r2 = e3.state).mode && (r2.mode = 13), a2 = e3.next_out, i2 = e3.output, h2 = e3.avail_out, s2 = e3.next_in, n3 = e3.input, o3 = e3.avail_in, u2 = r2.hold, l2 = r2.bits, f3 = o3, c2 = h2, x = N;
        e:
          for (; ; )
            switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E2[r2.check = 0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E2, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e3.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e3.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits)
                  r2.wbits = k;
                else if (k > r2.wbits) {
                  e3.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e3.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e3.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e3.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E2, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, E2[2] = u2 >>> 16 & 255, E2[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E2, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E2, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E2[0] = 255 & u2, E2[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E2, 2, 0)), l2 = u2 = 0;
                } else
                  r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o3 < (d = r2.length) && (d = o3), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n3, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n3, d, s2)), o3 -= d, s2 += d, r2.length -= d), r2.length))
                  break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o3)
                    break e;
                  for (d = 0; k = n3[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o3; )
                    ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n3, d, s2)), o3 -= d, s2 += d, k)
                    break e;
                } else
                  r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o3)
                    break e;
                  for (d = 0; k = n3[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o3; )
                    ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n3, d, s2)), o3 -= d, s2 += d, k)
                    break e;
                } else
                  r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e3.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e3.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                e3.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict)
                  return e3.next_out = a2, e3.avail_out = h2, e3.next_in = s2, e3.avail_in = o3, r2.hold = u2, r2.bits = l2, 2;
                e3.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t3 || 6 === t3)
                  break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t3)
                      break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e3.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e3.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t3)
                  break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o3 < d && (d = o3), h2 < d && (d = h2), 0 === d)
                    break e;
                  I.arraySet(i2, n3, s2, d, a2), o3 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e3.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; )
                  r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e3.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  if (b < 16)
                    u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o3)
                          break e;
                        o3--, u2 += n3[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e3.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o3)
                          break e;
                        o3--, u2 += n3[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o3)
                          break e;
                        o3--, u2 += n3[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e3.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; )
                      r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode)
                  break;
                if (0 === r2.lens[256]) {
                  e3.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e3.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e3.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t3)
                  break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o3 && 258 <= h2) {
                  e3.next_out = a2, e3.avail_out = h2, e3.next_in = s2, e3.avail_in = o3, r2.hold = u2, r2.bits = l2, R(e3, c2), a2 = e3.next_out, i2 = e3.output, h2 = e3.avail_out, s2 = e3.next_in, n3 = e3.input, o3 = e3.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e3.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o3)
                    break e;
                  o3--, u2 += n3[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e3.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e3.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2)
                  break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e3.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p2 = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else
                  m = i2, p2 = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p2++], --d; )
                  ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2)
                  break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 |= n3[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e3.total_out += c2, r2.total += c2, c2 && (e3.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e3.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o3)
                      break e;
                    o3--, u2 += n3[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e3.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
        return e3.next_out = a2, e3.avail_out = h2, e3.next_in = s2, e3.avail_in = o3, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e3.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t3)) && Z(e3, e3.output, e3.next_out, c2 - e3.avail_out) ? (r2.mode = 31, -4) : (f3 -= e3.avail_in, c2 -= e3.avail_out, e3.total_in += f3, e3.total_out += c2, r2.total += c2, r2.wrap && c2 && (e3.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e3.next_out - c2) : O(r2.check, i2, c2, e3.next_out - c2)), e3.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f3 && 0 === c2 || 4 === t3) && x === N && (x = -5), x);
      }, r.inflateEnd = function(e3) {
        if (!e3 || !e3.state)
          return U;
        var t3 = e3.state;
        return t3.window && (t3.window = null), e3.state = null, N;
      }, r.inflateGetHeader = function(e3, t3) {
        var r2;
        return e3 && e3.state ? 0 == (2 & (r2 = e3.state).wrap) ? U : ((r2.head = t3).done = false, N) : U;
      }, r.inflateSetDictionary = function(e3, t3) {
        var r2, n3 = t3.length;
        return e3 && e3.state ? 0 !== (r2 = e3.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t3, n3, 0) !== r2.check ? -3 : Z(e3, t3, n3, n3) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
      }, r.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e2, t2, r) {
      var D = e2("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t2.exports = function(e3, t3, r2, n2, i, s, a, o2) {
        var h, u, l, f2, c, d, p2, m, _, g = o2.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E2 = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
        for (b = 0; b <= 15; b++)
          O[b] = 0;
        for (v = 0; v < n2; v++)
          O[t3[r2 + v]]++;
        for (k = g, w = 15; 1 <= w && 0 === O[w]; w--)
          ;
        if (w < k && (k = w), 0 === w)
          return i[s++] = 20971520, i[s++] = 20971520, o2.bits = 1, 0;
        for (y = 1; y < w && 0 === O[y]; y++)
          ;
        for (k < y && (k = y), b = z = 1; b <= 15; b++)
          if (z <<= 1, (z -= O[b]) < 0)
            return -1;
        if (0 < z && (0 === e3 || 1 !== w))
          return -1;
        for (B[1] = 0, b = 1; b < 15; b++)
          B[b + 1] = B[b] + O[b];
        for (v = 0; v < n2; v++)
          0 !== t3[r2 + v] && (a[B[t3[r2 + v]]++] = v);
        if (d = 0 === e3 ? (A = R = a, 19) : 1 === e3 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E2 = 0, l = -1, f2 = (C = 1 << (x = k)) - 1, 1 === e3 && 852 < C || 2 === e3 && 592 < C)
          return 1;
        for (; ; ) {
          for (p2 = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E2 >> S) + (u -= h)] = p2 << 24 | m << 16 | _ | 0, 0 !== u; )
            ;
          for (h = 1 << b - 1; E2 & h; )
            h >>= 1;
          if (0 !== h ? (E2 &= h - 1, E2 += h) : E2 = 0, v++, 0 == --O[b]) {
            if (b === w)
              break;
            b = t3[r2 + a[v]];
          }
          if (k < b && (E2 & f2) !== l) {
            for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); )
              x++, z <<= 1;
            if (C += 1 << x, 1 === e3 && 852 < C || 2 === e3 && 592 < C)
              return 1;
            i[l = E2 & f2] = k << 24 | x << 16 | c - s | 0;
          }
        }
        return 0 !== E2 && (i[c + E2] = b - S << 24 | 64 << 16 | 0), o2.bits = k, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(e2, t2, r) {
      t2.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(e2, t2, r) {
      var i = e2("../utils/common"), o2 = 0, h = 1;
      function n2(e3) {
        for (var t3 = e3.length; 0 <= --t3; )
          e3[t3] = 0;
      }
      var s = 0, a = 29, u = 256, l = u + 1 + a, f2 = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p2 = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
      n2(z);
      var C = new Array(2 * f2);
      n2(C);
      var E2 = new Array(512);
      n2(E2);
      var A = new Array(256);
      n2(A);
      var I = new Array(a);
      n2(I);
      var O, B, R, T = new Array(f2);
      function D(e3, t3, r2, n3, i2) {
        this.static_tree = e3, this.extra_bits = t3, this.extra_base = r2, this.elems = n3, this.max_length = i2, this.has_stree = e3 && e3.length;
      }
      function F(e3, t3) {
        this.dyn_tree = e3, this.max_code = 0, this.stat_desc = t3;
      }
      function N(e3) {
        return e3 < 256 ? E2[e3] : E2[256 + (e3 >>> 7)];
      }
      function U(e3, t3) {
        e3.pending_buf[e3.pending++] = 255 & t3, e3.pending_buf[e3.pending++] = t3 >>> 8 & 255;
      }
      function P(e3, t3, r2) {
        e3.bi_valid > d - r2 ? (e3.bi_buf |= t3 << e3.bi_valid & 65535, U(e3, e3.bi_buf), e3.bi_buf = t3 >> d - e3.bi_valid, e3.bi_valid += r2 - d) : (e3.bi_buf |= t3 << e3.bi_valid & 65535, e3.bi_valid += r2);
      }
      function L(e3, t3, r2) {
        P(e3, r2[2 * t3], r2[2 * t3 + 1]);
      }
      function j(e3, t3) {
        for (var r2 = 0; r2 |= 1 & e3, e3 >>>= 1, r2 <<= 1, 0 < --t3; )
          ;
        return r2 >>> 1;
      }
      function Z(e3, t3, r2) {
        var n3, i2, s2 = new Array(g + 1), a2 = 0;
        for (n3 = 1; n3 <= g; n3++)
          s2[n3] = a2 = a2 + r2[n3 - 1] << 1;
        for (i2 = 0; i2 <= t3; i2++) {
          var o3 = e3[2 * i2 + 1];
          0 !== o3 && (e3[2 * i2] = j(s2[o3]++, o3));
        }
      }
      function W(e3) {
        var t3;
        for (t3 = 0; t3 < l; t3++)
          e3.dyn_ltree[2 * t3] = 0;
        for (t3 = 0; t3 < f2; t3++)
          e3.dyn_dtree[2 * t3] = 0;
        for (t3 = 0; t3 < c; t3++)
          e3.bl_tree[2 * t3] = 0;
        e3.dyn_ltree[2 * m] = 1, e3.opt_len = e3.static_len = 0, e3.last_lit = e3.matches = 0;
      }
      function M(e3) {
        8 < e3.bi_valid ? U(e3, e3.bi_buf) : 0 < e3.bi_valid && (e3.pending_buf[e3.pending++] = e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0;
      }
      function H(e3, t3, r2, n3) {
        var i2 = 2 * t3, s2 = 2 * r2;
        return e3[i2] < e3[s2] || e3[i2] === e3[s2] && n3[t3] <= n3[r2];
      }
      function G(e3, t3, r2) {
        for (var n3 = e3.heap[r2], i2 = r2 << 1; i2 <= e3.heap_len && (i2 < e3.heap_len && H(t3, e3.heap[i2 + 1], e3.heap[i2], e3.depth) && i2++, !H(t3, n3, e3.heap[i2], e3.depth)); )
          e3.heap[r2] = e3.heap[i2], r2 = i2, i2 <<= 1;
        e3.heap[r2] = n3;
      }
      function K(e3, t3, r2) {
        var n3, i2, s2, a2, o3 = 0;
        if (0 !== e3.last_lit)
          for (; n3 = e3.pending_buf[e3.d_buf + 2 * o3] << 8 | e3.pending_buf[e3.d_buf + 2 * o3 + 1], i2 = e3.pending_buf[e3.l_buf + o3], o3++, 0 === n3 ? L(e3, i2, t3) : (L(e3, (s2 = A[i2]) + u + 1, t3), 0 !== (a2 = w[s2]) && P(e3, i2 -= I[s2], a2), L(e3, s2 = N(--n3), r2), 0 !== (a2 = k[s2]) && P(e3, n3 -= T[s2], a2)), o3 < e3.last_lit; )
            ;
        L(e3, m, t3);
      }
      function Y(e3, t3) {
        var r2, n3, i2, s2 = t3.dyn_tree, a2 = t3.stat_desc.static_tree, o3 = t3.stat_desc.has_stree, h2 = t3.stat_desc.elems, u2 = -1;
        for (e3.heap_len = 0, e3.heap_max = _, r2 = 0; r2 < h2; r2++)
          0 !== s2[2 * r2] ? (e3.heap[++e3.heap_len] = u2 = r2, e3.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
        for (; e3.heap_len < 2; )
          s2[2 * (i2 = e3.heap[++e3.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e3.depth[i2] = 0, e3.opt_len--, o3 && (e3.static_len -= a2[2 * i2 + 1]);
        for (t3.max_code = u2, r2 = e3.heap_len >> 1; 1 <= r2; r2--)
          G(e3, s2, r2);
        for (i2 = h2; r2 = e3.heap[1], e3.heap[1] = e3.heap[e3.heap_len--], G(e3, s2, 1), n3 = e3.heap[1], e3.heap[--e3.heap_max] = r2, e3.heap[--e3.heap_max] = n3, s2[2 * i2] = s2[2 * r2] + s2[2 * n3], e3.depth[i2] = (e3.depth[r2] >= e3.depth[n3] ? e3.depth[r2] : e3.depth[n3]) + 1, s2[2 * r2 + 1] = s2[2 * n3 + 1] = i2, e3.heap[1] = i2++, G(e3, s2, 1), 2 <= e3.heap_len; )
          ;
        e3.heap[--e3.heap_max] = e3.heap[1], function(e4, t4) {
          var r3, n4, i3, s3, a3, o4, h3 = t4.dyn_tree, u3 = t4.max_code, l2 = t4.stat_desc.static_tree, f3 = t4.stat_desc.has_stree, c2 = t4.stat_desc.extra_bits, d2 = t4.stat_desc.extra_base, p3 = t4.stat_desc.max_length, m2 = 0;
          for (s3 = 0; s3 <= g; s3++)
            e4.bl_count[s3] = 0;
          for (h3[2 * e4.heap[e4.heap_max] + 1] = 0, r3 = e4.heap_max + 1; r3 < _; r3++)
            p3 < (s3 = h3[2 * h3[2 * (n4 = e4.heap[r3]) + 1] + 1] + 1) && (s3 = p3, m2++), h3[2 * n4 + 1] = s3, u3 < n4 || (e4.bl_count[s3]++, a3 = 0, d2 <= n4 && (a3 = c2[n4 - d2]), o4 = h3[2 * n4], e4.opt_len += o4 * (s3 + a3), f3 && (e4.static_len += o4 * (l2[2 * n4 + 1] + a3)));
          if (0 !== m2) {
            do {
              for (s3 = p3 - 1; 0 === e4.bl_count[s3]; )
                s3--;
              e4.bl_count[s3]--, e4.bl_count[s3 + 1] += 2, e4.bl_count[p3]--, m2 -= 2;
            } while (0 < m2);
            for (s3 = p3; 0 !== s3; s3--)
              for (n4 = e4.bl_count[s3]; 0 !== n4; )
                u3 < (i3 = e4.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e4.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n4--);
          }
        }(e3, t3), Z(s2, u2, e3.bl_count);
      }
      function X(e3, t3, r2) {
        var n3, i2, s2 = -1, a2 = t3[1], o3 = 0, h2 = 7, u2 = 4;
        for (0 === a2 && (h2 = 138, u2 = 3), t3[2 * (r2 + 1) + 1] = 65535, n3 = 0; n3 <= r2; n3++)
          i2 = a2, a2 = t3[2 * (n3 + 1) + 1], ++o3 < h2 && i2 === a2 || (o3 < u2 ? e3.bl_tree[2 * i2] += o3 : 0 !== i2 ? (i2 !== s2 && e3.bl_tree[2 * i2]++, e3.bl_tree[2 * b]++) : o3 <= 10 ? e3.bl_tree[2 * v]++ : e3.bl_tree[2 * y]++, s2 = i2, u2 = (o3 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
      }
      function V(e3, t3, r2) {
        var n3, i2, s2 = -1, a2 = t3[1], o3 = 0, h2 = 7, u2 = 4;
        for (0 === a2 && (h2 = 138, u2 = 3), n3 = 0; n3 <= r2; n3++)
          if (i2 = a2, a2 = t3[2 * (n3 + 1) + 1], !(++o3 < h2 && i2 === a2)) {
            if (o3 < u2)
              for (; L(e3, i2, e3.bl_tree), 0 != --o3; )
                ;
            else
              0 !== i2 ? (i2 !== s2 && (L(e3, i2, e3.bl_tree), o3--), L(e3, b, e3.bl_tree), P(e3, o3 - 3, 2)) : o3 <= 10 ? (L(e3, v, e3.bl_tree), P(e3, o3 - 3, 3)) : (L(e3, y, e3.bl_tree), P(e3, o3 - 11, 7));
            s2 = i2, u2 = (o3 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
          }
      }
      n2(T);
      var q = false;
      function J(e3, t3, r2, n3) {
        P(e3, (s << 1) + (n3 ? 1 : 0), 3), function(e4, t4, r3, n4) {
          M(e4), n4 && (U(e4, r3), U(e4, ~r3)), i.arraySet(e4.pending_buf, e4.window, t4, r3, e4.pending), e4.pending += r3;
        }(e3, t3, r2, true);
      }
      r._tr_init = function(e3) {
        q || (function() {
          var e4, t3, r2, n3, i2, s2 = new Array(g + 1);
          for (n3 = r2 = 0; n3 < a - 1; n3++)
            for (I[n3] = r2, e4 = 0; e4 < 1 << w[n3]; e4++)
              A[r2++] = n3;
          for (A[r2 - 1] = n3, n3 = i2 = 0; n3 < 16; n3++)
            for (T[n3] = i2, e4 = 0; e4 < 1 << k[n3]; e4++)
              E2[i2++] = n3;
          for (i2 >>= 7; n3 < f2; n3++)
            for (T[n3] = i2 << 7, e4 = 0; e4 < 1 << k[n3] - 7; e4++)
              E2[256 + i2++] = n3;
          for (t3 = 0; t3 <= g; t3++)
            s2[t3] = 0;
          for (e4 = 0; e4 <= 143; )
            z[2 * e4 + 1] = 8, e4++, s2[8]++;
          for (; e4 <= 255; )
            z[2 * e4 + 1] = 9, e4++, s2[9]++;
          for (; e4 <= 279; )
            z[2 * e4 + 1] = 7, e4++, s2[7]++;
          for (; e4 <= 287; )
            z[2 * e4 + 1] = 8, e4++, s2[8]++;
          for (Z(z, l + 1, s2), e4 = 0; e4 < f2; e4++)
            C[2 * e4 + 1] = 5, C[2 * e4] = j(e4, 5);
          O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f2, g), R = new D(new Array(0), x, 0, c, p2);
        }(), q = true), e3.l_desc = new F(e3.dyn_ltree, O), e3.d_desc = new F(e3.dyn_dtree, B), e3.bl_desc = new F(e3.bl_tree, R), e3.bi_buf = 0, e3.bi_valid = 0, W(e3);
      }, r._tr_stored_block = J, r._tr_flush_block = function(e3, t3, r2, n3) {
        var i2, s2, a2 = 0;
        0 < e3.level ? (2 === e3.strm.data_type && (e3.strm.data_type = function(e4) {
          var t4, r3 = 4093624447;
          for (t4 = 0; t4 <= 31; t4++, r3 >>>= 1)
            if (1 & r3 && 0 !== e4.dyn_ltree[2 * t4])
              return o2;
          if (0 !== e4.dyn_ltree[18] || 0 !== e4.dyn_ltree[20] || 0 !== e4.dyn_ltree[26])
            return h;
          for (t4 = 32; t4 < u; t4++)
            if (0 !== e4.dyn_ltree[2 * t4])
              return h;
          return o2;
        }(e3)), Y(e3, e3.l_desc), Y(e3, e3.d_desc), a2 = function(e4) {
          var t4;
          for (X(e4, e4.dyn_ltree, e4.l_desc.max_code), X(e4, e4.dyn_dtree, e4.d_desc.max_code), Y(e4, e4.bl_desc), t4 = c - 1; 3 <= t4 && 0 === e4.bl_tree[2 * S[t4] + 1]; t4--)
            ;
          return e4.opt_len += 3 * (t4 + 1) + 5 + 5 + 4, t4;
        }(e3), i2 = e3.opt_len + 3 + 7 >>> 3, (s2 = e3.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t3 ? J(e3, t3, r2, n3) : 4 === e3.strategy || s2 === i2 ? (P(e3, 2 + (n3 ? 1 : 0), 3), K(e3, z, C)) : (P(e3, 4 + (n3 ? 1 : 0), 3), function(e4, t4, r3, n4) {
          var i3;
          for (P(e4, t4 - 257, 5), P(e4, r3 - 1, 5), P(e4, n4 - 4, 4), i3 = 0; i3 < n4; i3++)
            P(e4, e4.bl_tree[2 * S[i3] + 1], 3);
          V(e4, e4.dyn_ltree, t4 - 1), V(e4, e4.dyn_dtree, r3 - 1);
        }(e3, e3.l_desc.max_code + 1, e3.d_desc.max_code + 1, a2 + 1), K(e3, e3.dyn_ltree, e3.dyn_dtree)), W(e3), n3 && M(e3);
      }, r._tr_tally = function(e3, t3, r2) {
        return e3.pending_buf[e3.d_buf + 2 * e3.last_lit] = t3 >>> 8 & 255, e3.pending_buf[e3.d_buf + 2 * e3.last_lit + 1] = 255 & t3, e3.pending_buf[e3.l_buf + e3.last_lit] = 255 & r2, e3.last_lit++, 0 === t3 ? e3.dyn_ltree[2 * r2]++ : (e3.matches++, t3--, e3.dyn_ltree[2 * (A[r2] + u + 1)]++, e3.dyn_dtree[2 * N(t3)]++), e3.last_lit === e3.lit_bufsize - 1;
      }, r._tr_align = function(e3) {
        P(e3, 2, 3), L(e3, m, z), function(e4) {
          16 === e4.bi_valid ? (U(e4, e4.bi_buf), e4.bi_buf = 0, e4.bi_valid = 0) : 8 <= e4.bi_valid && (e4.pending_buf[e4.pending++] = 255 & e4.bi_buf, e4.bi_buf >>= 8, e4.bi_valid -= 8);
        }(e3);
      };
    }, { "../utils/common": 41 }], 53: [function(e2, t2, r) {
      t2.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(e2, t2, r) {
      (function(e3) {
        !function(r2, n2) {
          if (!r2.setImmediate) {
            var i, s, t3, a, o2 = 1, h = {}, u = false, l = r2.document, e4 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
            e4 = e4 && e4.setTimeout ? e4 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e5) {
              process.nextTick(function() {
                c(e5);
              });
            } : function() {
              if (r2.postMessage && !r2.importScripts) {
                var e5 = true, t4 = r2.onmessage;
                return r2.onmessage = function() {
                  e5 = false;
                }, r2.postMessage("", "*"), r2.onmessage = t4, e5;
              }
            }() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e5) {
              r2.postMessage(a + e5, "*");
            }) : r2.MessageChannel ? ((t3 = new MessageChannel()).port1.onmessage = function(e5) {
              c(e5.data);
            }, function(e5) {
              t3.port2.postMessage(e5);
            }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e5) {
              var t4 = l.createElement("script");
              t4.onreadystatechange = function() {
                c(e5), t4.onreadystatechange = null, s.removeChild(t4), t4 = null;
              }, s.appendChild(t4);
            }) : function(e5) {
              setTimeout(c, 0, e5);
            }, e4.setImmediate = function(e5) {
              "function" != typeof e5 && (e5 = new Function("" + e5));
              for (var t4 = new Array(arguments.length - 1), r3 = 0; r3 < t4.length; r3++)
                t4[r3] = arguments[r3 + 1];
              var n3 = { callback: e5, args: t4 };
              return h[o2] = n3, i(o2), o2++;
            }, e4.clearImmediate = f2;
          }
          function f2(e5) {
            delete h[e5];
          }
          function c(e5) {
            if (u)
              setTimeout(c, 0, e5);
            else {
              var t4 = h[e5];
              if (t4) {
                u = true;
                try {
                  !function(e6) {
                    var t5 = e6.callback, r3 = e6.args;
                    switch (r3.length) {
                      case 0:
                        t5();
                        break;
                      case 1:
                        t5(r3[0]);
                        break;
                      case 2:
                        t5(r3[0], r3[1]);
                        break;
                      case 3:
                        t5(r3[0], r3[1], r3[2]);
                        break;
                      default:
                        t5.apply(n2, r3);
                    }
                  }(t4);
                } finally {
                  f2(e5), u = false;
                }
              }
            }
          }
          function d(e5) {
            e5.source === r2 && "string" == typeof e5.data && 0 === e5.data.indexOf(a) && c(+e5.data.slice(a.length));
          }
        }("undefined" == typeof self ? void 0 === e3 ? this : e3 : self);
      }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(jszip_min);
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f;
exports.index = index;
exports.n = n;
exports.o = o;
exports.p = p;
exports.resolveComponent = resolveComponent;
exports.t = t;
