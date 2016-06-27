const tree = (() => {
  const { PI, cos, sin } = Math

  const applyCommands = (commands, walk) =>
    [].reduce.call(walk, (renderData, char) => {
      return commands[char] ? commands[char](renderData) : renderData
    }, { stack: [], x: 0, y: 0, theta: PI/2, lines:[], i: 1 }).lines

  const renderer = (len, dTheta) => {
    const commands = {
      'F': ({stack, x, y, theta, lines, i}) => {
        const [x2, y2] = [x + len*cos(theta), y + len*sin(theta)]
        lines.push([x, y, x2, y2, i])
        return { stack, x: x2, y: y2, theta, lines, i: i + 1 }
      },
      '+': ({ stack, x, y, theta, lines, i }) =>
      ({ stack, x, y, theta: theta + dTheta, lines, i }),
      '-': ({ stack, x, y, theta, lines, i }) =>
      ({ stack, x, y, theta: theta - dTheta, lines, i }),
      '[': ({ stack, x, y, theta, lines, i }) => {
        stack.push({ x, y, theta, i })
        return { stack, x, y, theta, lines, i}
      },
      ']': ({ stack, x, y, theta, lines, i }) => {
        const { x: x_, y: y_, theta: theta_, i: i_ } = stack.pop()
        return { stack, x: x_, y: y_, theta: theta_, lines, i: i_ }
      }
    }
    return walk => applyCommands(commands, walk)
  }

  const makeStep = rules => last =>
    [].reduce.call(last, (next, char) => next + (rules[char] || char), "")

  const withRenderData = (renderData, walk) =>
    ({ walk, renderData: renderData(walk) })

  return { makeStep, renderer }
})()

if (module && module.exports) module.exports = tree
