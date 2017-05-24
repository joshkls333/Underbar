(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(n === undefined){
      return array[0];
    } else {
      return array.slice(0,n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined){
      return array[array.length-1];
    } else if (n > array.length){
      return array;
    } else {
      return array.slice(array.length -n);
    }
   };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // return _.filter(array, function(item){
    //     console.log("item: " +item);
    //     console.log(result);
    //   if(_.indexOf(array, item) === -1){
    //     return item;
    //     console.log("item tested: " +item);
    //     console.log(result);
    //   }
    // });
    var result = [];
    var wasFound;
    _.each(array, function(item){
      wasFound = _.indexOf(result, item);
      if(wasFound === -1){
        result.push(item);
      }
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of result
    var result = [];
    _.each(collection, function(item) {
      result.push(iterator(item));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var flag = accumulator === undefined;
    _.each(collection, function(item) {
      if (flag) {
        accumulator = item;
        flag = false;
      }
      else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(status, item) {
      //run reduce on collection, accumulator is boolean, iterating through entire collection
      //running truth validation against individual items of collection
      return status || item === target;
      //If array or object contains value, then item === target evaluates to true
      //status is always false until proven otherwise
      //false || false = false
      //false || true = true
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;

    return _.reduce(collection, function(status, item){
    //even if one item fails truth test then accumulator set to false
      return status && !!iterator(item);
      // if return true && true = true
      // if status changes to false then overall result will be false
    },true )
  };

  // var isEven = function(x){
  //   if(x % 2 === 0){
  //   return true;}
  //  };

  // _.every([0,10,28], isEven);

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
      iterator = iterator || _.identity;
      return _.reduce(collection, function(status, item) {
        return status || !!iterator(item);
        //even if only one element passes the truth test, then status
        //is set to true, and the function returns true
      }, false);
   };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(newObject){
      //Arguments is pulling all of the other properties of obj
      for(var key in newObject){
        //Iterating through each object and its properties
        obj[key] = newObject[key];
        //Adding new properties to original object
      }
    });
    return obj;
    //return object
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(newObject){
      for(var key in newObject){
        if(obj[key]=== undefined){
          //Checks if property exists in original object
          //If it does not exist, add new properties to original object
          obj[key] = newObject[key];
        }
      }
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result = {};
    //empty object to store function results
    return function() {
      var args = JSON.stringify(arguments);
      //takes the array of arguments and assigns them to an object as properties
      //with incremental keys such that first property = first value of array
      //assigned to key zero, second property = second value of array assigned to
      //key one
      //console.log(arguments);
      //console.log(args);
      //console.log(result[args]);
      if (result[args] === undefined) {
        //result[args] will be undefined until checked
        result[args] = func.apply(this, arguments);
        //Take function passed in to memoize and run it with the object args
        //properties
        //Stores the applied function results in result
      }
//      console.log(result[args])
      return result[args];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait ) {
    var args = Array.prototype.slice.call(arguments,2);
    //Takes all the arguments except first two and stores in args.
    setTimeout(function(){
      // will delay the function by a certain designated time that corresponds to the value of wait
      func.apply(this,args);
      //invoking func and using args as it's parameters
      // this binds the function to the function being passed into delay
    },wait);
  };

/*
  var timer = function(increment) {
  var counter = 0;
  return setInterval(function() {
    counter++;
    console.log(counter);
  }, increment);

  return function() {
    counter = 0;
  }
}
*/

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //var copyArray = array.slice();
    var copyArray = Array.prototype.slice.call(array);
    //Creating a duplicate of the original array
    var result = [];
    //Creating a storage array for random results
    for (var i = 0; i < array.length; i++) {
      var randomize = Math.floor(Math.random() * copyArray.length);
      //Creating value for random index
      result.push(copyArray[randomize]);
      //Pushing value at random index in copyArray to result array
      copyArray.splice(randomize, 1);
      //Removing that specific randomized index from the duplicate array
    }
    return result;
  };




  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    //call functionOrKey on collection with each/map
    //use apply to call the function on each value in the list
      //if function is a function reference
      if(typeof functionOrKey === "function") {
      return _.map(collection, function(item) {
        return functionOrKey.apply(item, args);
      });
    }
      //if function is a string
      else {
      return _.map(collection, function(stringItem) {
        //console.log(stringItem + ' str');
        //console.log(functionOrKey + ' func');
        return stringItem[functionOrKey](args);
        //??
        //'dog'['toUpperCase()']
      });
    }
  };


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //if string does this, do something else
    //if the collection is an array
    if (typeof iterator === 'function') {
      return collection.sort(function(a,b) {
         return iterator(a) - iterator(b);
      });
    }
    //console.log("checking" + typeof(iterator));
    else if (typeof iterator === 'string') {
      return collection.sort(function(a,b) {
        return a[iterator] - b[iterator];
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  // args = [['a','b','c','d'], [1,2,3]]
  _.zip = function() {
    var result = [];
    var args = Array.prototype.slice.call(arguments);
    // set up a variable for max length of the given args
    var maxlength = 0;

    for(var i = 0; i < args.length; i++) {
      //console.log("maxlength :" , maxlength);
      //loops through args(array of arguments) to determine which is the longest
      // determining if the current arg array is longer, if so assign it as the maxlength.
      maxlength = Math.max(args[i].length, maxlength);
      //console.log("updated maxlngth: " , maxlength);
    }

    for (var j = 0; j < maxlength; j++) {
      //iterating through maxlength (array of longest length)
      //console.log("maxlength2 " , maxlength);
      //console.log("args and j" , args, j);
      // will pluck the value, however if it no value will be undefined

      result.push(_.pluck(args, j));

      //args[0][0], args[1][0], args[2][0], args[3][0]
      //['a'],1,'jim',1]

      //args[0][1], args[1][1], args[2][1], args[3][1]
      //args[0][2], args[1][2], args[2][2], args[3][2]
      //args[0][3], args[1][3], args[2][3], args[3][3]
      //console.log("result:" ,j , result);
      //['a',1,'jim',1],
    }
    return result;
  };
/*
  _.pluck = function(args, j) {
    return _.map(args, function(item) {
      return item[j];
    });
  };
*/

//  console.log("test run :" , _.zip(['a','b','c','d'], [1,2,3], ["jim","bob"],[1,2,3,4,5,6,7]));

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array

  //[[1,2],[1]] --> [1,2,1]
  _.flatten = function(nestedArray, result) {
    //check nestedArray to see if it is an array
    //attempt to reduce nested array to a flattened result array

    var result = [];
    var execute = function(array){
      _.each(array, function(item){
        if(Array.isArray(item)){
          execute(item);
        } else {
          result.push(item);
        }
      });
    };

    execute(nestedArray);
    return result;
  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    //array of arguments
    var result = [];
    _.each(args[0], function(item) {
      //Iterating over the first inner array in the argument array
      var wasFound = false;

      for (var i = 1; i < args.length; i++) {
      //iterates over the rest of the inner arrays
        _.each(args[i], function(index) {
          //iterates through the inside of each inner array
          if (index === item) {
            //index is each element inside each inner array
            //item is the current element inside the first inner array that we're comparing with
            wasFound = true;
            //if found, set to true
          }
       });
      }
      if (wasFound) {
        result.push(item);
        //push the shared element to result array
      }
    });
    return result;
  };
  //return filter....
    //return _.indexOf(array, value) !== -1



  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var result = [];
    _.each(array, function(item) {
      //iterating the first array
      var wasFound = false;
      //create a variable to keep track of whether or not same element is found across all arrays
      for (var i = 1; i < args.length; i++) {
        //iterate over each argument array
        for (var j = 0; j < args[i].length; j++) {
          //iterates over each element inside each array that represents each argument
          if (item === args[i][j]) {
            wasFound = true;
          }
        }
      }
      if (!wasFound) {
        result.push(item);
      }
    });
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

    //if function has not been called before
    var hasbeencalled = false;

    //call this function
    return function(){
      //If we're not waiting
      if(!hasbeencalled){
        //execute the function
        func.apply(this,arguments);
      // within this set a Timeout to exit the function
        setTimeout(function(){
          //After wait time, run function
          hasbeencalled = true;

          //return a function
        }, wait);

      };
    // break out of throttle
    }
  };





}());
