const test = require('tape')

const tree = require('../../src/tree.js')

test('tree strings', t => {
  let actual, expected

  const config = { len: 0, dTheta: 0 }

  t.equal(typeof tree.makeStep, 'function', 'function exists')

  expected = 'A'
  actual = tree.makeStep({})('A')
  t.equal(actual, expected, 'works with no rules')

  const basicWalk = tree.makeStep({'A' : 'AA'})

  actual = basicWalk('AB')
  expected = 'AAB'
  t.equal(actual, expected, 'single rule walk')

  actual = basicWalk(expected)
  expected = 'AAAAB'
  t.equal(actual, expected, 'single rule walk with two steps')

  actual = tree.makeStep({ 'A': 'B', 'C': 'D' })('AC')
  expected = 'BD'
  t.equal(actual, expected, 'walk with two rules')

  t.end()
})

test('tree rendering', t => {
  let actual, expected

  const theta = Math.PI / 2
  const roundLines = lines => lines.map(line => line.map(Math.round))

  const treeRenderer = tree.renderer(1, theta)
  const treeRender = walk => roundLines(treeRenderer(walk))

  actual = treeRender('F')
  expected = [[0, 0, 0, 1, 1]]
  t.deepEqual(actual, expected, 'one straight line')

  actual = treeRender('FF')
  expected = [[0, 0, 0, 1, 1], [0, 1, 0, 2, 2]]
  t.deepEqual(actual, expected, 'two straight lines')

  actual = treeRender('F+F')
  expected = [[0, 0, 0, 1, 1], [0, 1, -1, 1, 2]]
  t.deepEqual(actual, expected, 'anticlockwise angle')

  actual = treeRender('F-F')
  expected = [[0, 0, 0, 1, 1], [0, 1, 1, 1, 2]]
  t.deepEqual(actual, expected, 'clockwise angle')

  actual = treeRender('F[F]-F')
  expected = [[0, 0, 0, 1, 1], [0, 1, 0, 2, 2], [0, 1, 1, 1, 2]]
  t.deepEqual(actual, expected, 'with stack')

  t.end()
})
