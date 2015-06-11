# Sir Mix-Alot

## Mixin exercise

to build (parts of) a fake ORM with a non-persistent data store

### Goal

Create a class named `Model` that will be used as our mixin.  
All classes that extend `Model` becomes a "model" and inherits all of it's capabilities.

Create a pseudo "Data Store" class that acts as storage for each "Model".

Create 4 sample classes to test the inherited behaviors of a "Model".

Once the Data Store and Model is setup correctly, then each Class extends the Model properly, then all tests will pass.

Create all class files in the `lib/` subdirectory.

### Install Dependencies

```
npm install
```

### Run tests

```
mocha -w --bail
```

## Data Store

Is a class that has a single public property named `store`.

Export **an instance** of the Data Store class as a module.

## Model

Will require the `Data Store` module, and assign it's `store` property to a temporary variable.

Define a constructor that accepts a singl argument `schema` and assign it's value to a public property named `schema`.  
The constructor sets a public property named `id` set to `null`.  
The constructor sets a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null.

The constructor sets a new default value of an empty array in the datastore using the constructor's name as the key, if that key does not already exist in the datastore.

### Model Prototype

Defines the behaviors of instances of classes that inherit from `Model`.

should have a method named `save` that sets it's `id` to the next id in this model's datastore, if this object's `id` is null

should have a method named `destroy` that removes the stored data object from the datastore for this model, if it has an `id` set

### Inheritable Static Methods

should have a method named `getNextId` that returns the next successive number in the datastore for this model, the highest `id` plus one.

should have a method named `find` that accepts a single argument `id` that returns the stored data object in the datastore for this model, having the same `id` value passed in from the `find` argument

should have a method named `extend` that accepts a single argument `klass`, and extends each static and prototype method of `Model` onto `klass`

## User

Will require the `Model` module, and assign it to a temporary variable.

Will declare a new variable named `UserSchema` and assign it's value to a literal object with the following keys and values

`username` = `String`  
`password` = `String`

The constructor will `call` the `Model` constructor method using `this` as it's context, and `UserSchema` as it's only argument.

After the class constructor, invoke the `Model.extend` static method passing in a single argument `User`.

export the `User` class definition as a module.

## Account

Will require the `Model` module, and assign it to a temporary variable.  
Will require the `User` module, and assign it to a temporary variable.  

Will declare a new variable named `AccountSchema` and assign it's value to a literal object with the following keys and values

`user` = `User`  
`accountNumber` = `Number`  
`address` = `String`  
`balance` = `Number`

The constructor will `call` the `Model` constructor method using `this` as it's context, and `AccountSchema` as it's only argument.

After the class constructor, invoke the `Model.extend` static method passing in a single argument `Account`.

export the `Account` class definition as a module.

## Message

Will require the `Model` module, and assign it to a temporary variable.  
Will require the `User` module, and assign it to a temporary variable.  

Will declare a new variable named `MessageSchema` and assign it's value to a literal object with the following keys and values

`from` = `User`  
`to` = `User`  
`message` = `String`  
`sent` = `Date`

The constructor will `call` the `Model` constructor method using `this` as it's context, and `MessageSchema` as it's only argument.

After the class constructor, invoke the `Model.extend` static method passing in a single argument `Message`.

export the `Message` class definition as a module.

## Location

Will require the `Model` module, and assign it to a temporary variable.  

Will declare a new variable named `LocationSchema` and assign it's value to a literal object with the following keys and values

`lng` = `Number`  
`lat` = `Number`

The constructor will `call` the `Model` constructor method using `this` as it's context, and `LocationSchema` as it's only argument.

After the class constructor, invoke the `Model.extend` static method passing in a single argument `Location`.

export the `Location` class definition as a module.
