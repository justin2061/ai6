/* eslint-disable camelcase */
var ai6 = require('../../source/ai6')
var x = [
  [1, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0]]
var y = [
  [1, 0],
  [1, 0],
  [1, 0],
  [0, 1],
  [0, 1],
  [0, 1]]

var pretrain_lr = 0.6
var pretrain_epochs = 900
var k = 1
var finetune_lr = 0.6
var finetune_epochs = 500

var dbn = new ai6.NN.DBN({
  input: x,
  label: y,
  nIns: 6,
  nOuts: 2,
  hiddenLayerSizes: [10, 12, 11, 8, 6, 4]
})

// Pre-Training using using RBM
dbn.pretrain({
  'lr': pretrain_lr,
  'k': k,
  'epochs': pretrain_epochs
})

// Fine-Tuning dbn using mlp backpropagation.
dbn.finetune({
  'lr': finetune_lr,
  'epochs': finetune_epochs
})

x = [[1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 0]]

console.log(dbn.predict(x))
