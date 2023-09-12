# LogForMe

A simple and useful ally for your daily logs

Easily logged message logs with custom, easily searched for **methods** and **tags**, with fields that can be specified for each message or set by default.

---

## Details 

* **Message**: the message that will be logged. If the message is not defined, nothing will be logged

* **Method**: the methods of this log message. By *default*, this field's value is **INFO**
  * Options: **INFO**, **DEBUG**, **WARN**, **ERROR**
  * If you use **INFO**, **WARN**, **ERROR**, the respective *console* command will be used (*console.info*, *console.warn*, *console.error*)
  * If you use some custom string, the console's command will be **log** (*console.log*)

* **Tag**: Use tags to make it easier when you need to search among log records. The default is **null**.

* **Extra data**: Optional object that will be logged with the message

---

## How to Use

The main method to logged a message is **logForMe**. It accepts four params:

```
logForMe(message: string, method: string, tag: string, extraData: object): void
```

To log a message:

```javascript
const { logForMe } = require('logForMe');

logForMe('Testing Log System');

```

This will be logged on the terminal:

```
[2023-09-07T18:33:27.260Z] [INFO] Testing Log System
```
---

## Specifying a Method and Tag

For each message, you can inform the **method** and the **tag**

```javascript
const { logForMe } = require('logForMe');

logForMe('Error to connect to the database', 'ERROR', 'DATABESE');
```

This will be logged on the terminal:

```
[2023-09-07T18:36:05.776Z] [ERROR] (DATABESE) Error to connect to the database
```

---

## Set a default **Method** and **Tag**

You can set a default value for a **method** and **tag**. These will be used if no method or tag is defined on the **logForMe** method.

```javascript
const { logForMe, setMethod } = require('logForMe');

logForMe('Testing using the default values');

// Setting a default method
setMethod('DEBUG')

logForMe('Start the debug session')

// Setting a default tag
setTag('API')

logForMe('Creating new database connection')

// You still can specify a method and/or tag for each log message, without losing the defaults
logForMe('This is not a problem that we will fix right now', 'WARN')

// Using the *default*
logForMe('In case of error, we will retry this ten times...')
```

These commands will be logged the following messages:

```
[2023-09-07T18:40:35.083Z] [INFO] Testing using the default values 
[2023-09-07T18:40:35.088Z] [DEBUG] Start the debug session
[2023-09-07T18:40:35.089Z] [DEBUG](API) Creating new database connection
[2023-09-07T18:40:35.089Z] [WARN] (API) This is not a problem that we will fix right now
[2023-09-07T18:40:35.090Z] [DEBUG](API) In case of error, we will retry this ten times...
``` 
---

## Including an Object with Extra Data and How to use the Flat Format

If you want the output to be logged on a single line, you can set this using **setFlatData** method.

Consider the following object:

```
const data = {
  name: 'John',
  age: 23,
  props: [
    { item: 'Car', quantity: 3, price: '132223.99' },
    { item: 'House', quantity: 1, price: '124567.49' },
  ],
};
``` 

If you log this object using the default values:
```
...
  logForMe('Shop Items', 0, 0, data)
...
```
This is what it will be logged on terminal:

```
[2023-09-07T18:47:19.222Z] [INFO] Extra Data 
{
  "name": "John",
  "age": 23,
  "props": [
    {
      "item": "Car",
      "quantity": 3,
      "price": "132223.99"
    },
    {
      "item": "House",
      "quantity": 1,
      "price": "124567.49"
    }
  ]
}
```

It's more easy to read, but not always the best option. If you need that each log message uses only one line, you can either set **isFlat** as default

### Example setting TRUE to *isFlat*

```
const { logForMe, setFlatData } = require('logForMe');
setFlatData(true)

const data = {
  name: 'John',
  age: 23,
  props: [
    { item: 'Car', quantity: 3, price: '132223.99' },
    { item: 'House', quantity: 1, price: '124567.49' },
  ],
};

logForMe('Extra Data', 0, 0, data);
```

This will be the result:

```
[2023-09-07T18:48:15.090Z] [INFO] Extra Data {"name":"John","age":23,"props":[{"item":"Car","quantity":3,"price":"132223.99"},{"item":"House","quantity":1,"price":"124567.49"}]}
```

---

## Removing a Timestamp

To remove the timestamp before each log message, call the method **includeTimestamp()** with *false* as argument.

```
const { includeTimestamp, logForMe } = require('logForMe');

logForMe('Log with timestemp (DEFAULT)');

includeTimestamp(false);

logForMe('Log with none timestemp');
```

This will be logged the following messages on the terminal:

```
[2023-09-07T18:56:00.213Z] [INFO] Log with timestemp (DEFAULT)
[INFO] Log with none timestemp
```

To activate, use the same method, but passing *true* as argument. The default value is **TRUE**

---

## Restricting the Environment to Use Logs

It's possible use a Log's messages only to a specific **NODE_ENV** is set.

For example, if you want to logged all the messages when in **DEVELOPMENT** and **TESTING** environment, set the NODE_ENV environment to **DEVELOPMENT** and **TESTING** and set the following command:

```
setEnvironment(['DEVELOPMENT','TESTING'])
```

To reset, so that all the messages can be logged, use the same method, but passing **null** as argument.

You can set/unset this at any time to the messages will be or not logged.

---

## Restoring Defaults Values

You can reset the values of **method**,  **tag** and **isFlat** calling these methods without any parameter:

```javascript
const { setMethod, setTag, setFlatData } = require('logForMe');

setMethod()
setTag()
setFlatData()
...
```
--- 

## History

**v1.0.0**: Initial Release