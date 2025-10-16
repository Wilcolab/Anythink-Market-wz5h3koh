'use strict';

// In-memory storage for calculation history
var calculationHistory = [];
const MAX_HISTORY_SIZE = 100;

function addToHistory(operation, operand1, operand2, result) {
  var entry = {
    id: Date.now(),
    operation: operation,
    operand1: operand1,
    operand2: operand2 || null,
    result: result,
    timestamp: new Date().toISOString()
  };

  calculationHistory.unshift(entry); // Add to beginning

  // Keep only the most recent MAX_HISTORY_SIZE entries
  if (calculationHistory.length > MAX_HISTORY_SIZE) {
    calculationHistory = calculationHistory.slice(0, MAX_HISTORY_SIZE);
  }
}

exports.calculate = function(req, res) {
  req.app.use(function(err, _req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  // TODO: Add operator
  var operations = {
    'add':      function(a, b) { return Number(a) + Number(b) },
    'subtract': function(a, b) { return a - b },
    'multiply': function(a, b) { return a * b },
    'divide':   function(a, b) { return a / b },
    'power':    function(a, b) { return Math.pow(a, b) },
    'sin':      function(a) { return Math.sin(a * Math.PI / 180) }, // degrees to radians
    'cos':      function(a) { return Math.cos(a * Math.PI / 180) },
    'tan':      function(a) { return Math.tan(a * Math.PI / 180) },
    'log':      function(a) { return Math.log10(a) },
    'ln':       function(a) { return Math.log(a) },
    'sqrt':     function(a) { return Math.sqrt(a) },
    'factorial': function(a) {
      if (a < 0 || !Number.isInteger(Number(a))) throw new Error("Factorial requires non-negative integer");
      let result = 1;
      for (let i = 2; i <= a; i++) result *= i;
      return result;
    }
  };

  // Define which operations are unary (require only operand1)
  var unaryOperations = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'factorial'];

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  // For unary operations, operand2 is optional
  if (!unaryOperations.includes(req.query.operation)) {
    if (!req.query.operand2 ||
        !req.query.operand2.match(/^(-)?[0-9.]+(e(-)?[0-9]+)?$/) ||
        req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
      throw new Error("Invalid operand2: " + req.query.operand2);
    }
  }

  // Call operation with appropriate number of arguments
  var result;
  if (unaryOperations.includes(req.query.operation)) {
    result = operation(req.query.operand1);
  } else {
    result = operation(req.query.operand1, req.query.operand2);
  }

  // Add to history
  addToHistory(req.query.operation, req.query.operand1, req.query.operand2, result);

  res.json({ result: result });
};

exports.getHistory = function(req, res) {
  var limit = parseInt(req.query.limit) || 10;
  var offset = parseInt(req.query.offset) || 0;

  var history = calculationHistory.slice(offset, offset + limit);

  res.json({
    history: history,
    total: calculationHistory.length,
    limit: limit,
    offset: offset
  });
};

exports.clearHistory = function(req, res) {
  calculationHistory = [];
  res.json({ message: "History cleared successfully" });
};
