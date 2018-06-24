var devEnv = require('./dev.env')
var prodEnv = require('./prod.env')

var isProd = false
var args = process.argv.splice(2)
for (var arg of args) {
  if (arg === '--prod') {
    console.log('采用生产模式配置')
    isProd = true
  }
}

module.exports = isProd ? prodEnv : devEnv
