/*
https://github.com/lukasolson/simple-js-set
*/
function Set(hashFunction) {
    this._hashFunction = hashFunction || JSON.stringify;
    this._values = {};
    this._size = 0;
}

Set.prototype = {
    add: function add(value) {
        if (!this.contains(value)) {
            this._values[this._hashFunction(value)] = value;
            this._size++;
        }
    },
    remove: function remove(value) {
        if (this.contains(value)) {
            delete this._values[this._hashFunction(value)];
            this._size--;
        }
    },
    contains: function contains(value) {
        return typeof this._values[this._hashFunction(value)] !== "undefined";
    },
    size: function size() {
        return this._size;
    },
    each: function each(iteratorFunction, thisObj) {
        for (var value in this._values) {
            iteratorFunction.call(thisObj, this._values[value]);
        }
    }
};

/*
Queue.js
Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode
 */
function Queue(){
  var queue  = [];
  var offset = 0;

  this.getLength = function(){
    return (queue.length - offset);
  }

  this.isEmpty = function(){
    return (queue.length == 0);
  }

  this.enqueue = function(item){
    queue.push(item);
  }

  this.dequeue = function(){

    if (queue.length == 0) return undefined;

    var item = queue[offset];

    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    return item;

  }

  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

}