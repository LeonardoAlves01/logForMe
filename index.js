_defaultMethod = '[INFO]';
_defaultTag = null;
_viewTimestamp = true;
_flatInfo = true;
_envAvaliable = null;

/**
 * Prints the message using the passing parameters
 *
 * @param {string} message The message that will be printed; if none is specified, this method does nothing
 * @param {string} method The method of logging this message. The default is INFO
 * @param {string} tag  The tag of this log message. The default is NULL
 * @param {object} extraData Object with extra information that can be printed. It´s optional
 */

const logForMe = (message, method, tag, extraData) => {
  if (
    !message ||
    (_envAvaliable &&
      process.env.NODE_ENV &&
      _envAvaliable.includes(process.env.NODE_ENV.trim().toUpperCase())) ===
      false
  )
    return;

  printMessage(message, method, tag, extraData);
};

const printMessage = (message, method, tag, extraData) => {
  const currentTimeStamp = _viewTimestamp
    ? `[${new Date().toISOString()}] `
    : '';

  const theMethod = method
    ? `[${String(method).trim().toUpperCase()}] `
    : _defaultMethod;

  const theTag = tag ? `(${String(tag).trim()})` : _defaultTag;

  const data = extraData
    ? _flatInfo
      ? JSON.stringify(extraData)
      : `\n${JSON.stringify(extraData, null, 2)}`
    : '';

  print(
    theMethod,
    `${currentTimeStamp}${theMethod ? theMethod : ''}${
      theTag ? ' ' + theTag : ''
    } ${message} ${data ? data : ''}`
  );
};

const print = (theMethod, fullMessage) => {
  switch (theMethod) {
    case 'INFO':
      return console.info(fullMessage);
    case 'ERROR':
      return console.error(fullMessage);
    case 'WARN':
      return console.warn(fullMessage);
    case 'DEBUG':
      return console.debug(fullMessage);
    default:
      return console.log(fullMessage);
  }
};

/**
 * @param {string} method The method that will be the default for the next log messages. The default is INFO.
 * * Options: INFO, ERROR, WARN and DEBUG
 */
const setMethod = (method) =>
  (_defaultMethod =
    method && typeof method === 'string'
      ? `[${method.trim().toUpperCase()}]`
      : '[INFO]');

/**
 * @param {string} tag The tag that will be the default for the next log messages
 */
const setTag = (tag) =>
  (_defaultTag = tag && typeof tag === 'string' ? `(${tag.trim()})` : null);

/**
 * @param {string} flat Define whether the extra data will be printed in string or formatted
 */
const setFlatData = (flat) =>
  (_flatInfo = flat && typeof flat === 'boolean' ? data : false);

/**
 * @param {boolean} view Will the log messages includes a timestamp?
 */
const includeTimestamp = (view) =>
  (_viewTimestamp = view && typeof view === 'boolean' ? view : false);

/**
 * @param {string} arrayEnv  * What NODE_ENV variable must be set to print the logs on terminal? The default value is null and all the messages will be printed.
 */
const setEnvironment = (arrayEnv) => {
  _envAvaliable =
    arrayEnv && arrayEnv.length
      ? arrayEnv.map((item) => item.toString().trim().toUpperCase())
      : null;
};

module.exports = {
  logForMe,
  setMethod,
  setTag,
  setFlatData,
  includeTimestamp,
  setEnvironment,
};
