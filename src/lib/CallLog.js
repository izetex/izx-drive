var Promise = require('promise');

function wrap_promise(promise, originalObj, name, logger, start_at){
    return new Promise(function(resolve, reject){
        promise.then(function(result){
            logger.success(originalObj, name, [], result, start_at, true);
            resolve(result);
        }).catch(function(error){
            logger.error(originalObj, name, [], error, start_at, true);
            reject(error);
        });
    });
}

function wrap_result_array(result, originalObj, name, logger, start_at) {
    for(var i=0;i<result.length;i++){
        if(result instanceof Promise){
            result[i] = wrap_promise(result[i], originalObj, name, logger, start_at);
        }else if(result instanceof Object){
            wrap_result_object(result[i], originalObj, name, logger, start_at);
        }
    }
}


function wrap_result_object(result, originalObj, name, logger, start_at) {
    for(var result_name in result){
        if(result[result_name] instanceof Promise){
            result[result_name] = wrap_promise(result[result_name], originalObj, name, logger, start_at);
        }
    }
}

function args_to_array(_arguments){
    var args = [];
    for (var i = 0; i < _arguments.length; i++) {
        args[i] = _arguments[i];
    }
    return args;
}

function wrap_function(func, originalObj, name, logger){
    return function() {

        var start_at = new Date().getTime();
        var args = args_to_array(arguments);
        try {
            var result = func.apply(originalObj, arguments);
            if(result instanceof Promise) {
                result = wrap_promise(result, originalObj, name, logger, start_at);
            }else{
                if(result instanceof Array){
                    wrap_result_array(result, originalObj, name, logger, start_at);
                }else if(result instanceof Object){
                    wrap_result_object(result, originalObj, name, logger, start_at);
                }
                logger.success(originalObj, name, args, result, start_at);
            }
            return result;
        }catch(e){
            logger.error(originalObj, name, args, e, start_at);
            throw e;
        }
    }
}

function monitor(namespaceObject, logger){
    for(var name in namespaceObject){
        var originalFunction = namespaceObject[name];

        if(Object.prototype.toString.call(originalFunction) === '[object Function]'){
            namespaceObject[name] = wrap_function(originalFunction, namespaceObject, name, logger);
        }
    }
}


function CallLog(monitorable) {
    this.observers = [];
    monitor(monitorable, this);
}

CallLog.prototype = {

    subscribe: function(fn) {
        this.observers.push(fn);
    },

    unsubscribe: function(fn) {
        this.observers = this.observers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    record: function(content, thisObj) {
        try {
            this.observers.forEach(function (item) {
                item.call(thisObj, content);
            });
        }catch(e){}
    },

    error: function(originalObj, method, args, e, start_at, async){
        this.record({ async: !!async, success: false, start_at: start_at, duration: new Date().getTime() - start_at,
            exception: e, method: method,  object: originalObj.constructor.name, args: args
        }, originalObj);
    },

    success: function(originalObj, method, args, result, start_at, async){
        this.record({ async: !!async, success: true,  start_at: start_at, duration: new Date().getTime() - start_at,
            method: method, object: originalObj.constructor.name, args: args, result: result
        }, originalObj);
    }

}

module.exports = CallLog;