const fs = require('fs')
const querystring = require('querystring')
const { default: axios } = require('axios')
const dayjs = require('dayjs')

// 需要解析的域名列表
const domainList = require('./domainList')

// 保存 ip 结果的数组
const resultHostsList = new Array(domainList.length)

// 系统存放 hosts 文件的绝对路径
const systemHostsPath = 'C:\\Windows\\System32\\drivers\\etc\\hosts'

// 生成的 hosts 内容的头尾注释
const startComment = `# Hosts generated at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}\r\n`
const endComment = '\r\n# Hosts end'

// 要替换内容的正则
const replaceContentRegExp = /# Hosts generated at[\s\S]*# Hosts end/ium

// ip 地址的正则表达式
// const ipRegExp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ium
// <input name="host" type="radio" value="220.181.38.148">
const condition1 = /<input name="host" type="radio" value="(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"/ium
// <h1>IP Lookup : 140.82.113.3 (gist.github.com)</h1>
const condition2 = /<h1>IP Lookup : (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/ium

const reqIP = (host, i) => new Promise((resolve, reject) => {
  axios({
    url: 'https://www.ipaddress.com/ip-lookup',
    method: 'POST',
    data: querystring.stringify({
      host,
    }),
  }).then(res => {
    // res: [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
    const { data } = res
    let execResult = condition1.exec(data)
    if (!execResult) {
      execResult = condition2.exec(data)
    }
    const ip = execResult[1]
    const oneLine = `${ip.padEnd(30, ' ')}${host}`
    console.log(oneLine)
    resultHostsList[i] = oneLine
    resolve()
  }).catch(reject)
})

const ipList = domainList.map((host, i) => reqIP(host, i))

Promise.all(ipList).then(() => {
  console.log('获取 hosts 完成')
  const hostsString = resultHostsList.join('\r\n')
  const newHosts = `${startComment}${hostsString}${endComment}`
  fs.writeFileSync('./hosts', newHosts)
  const systemHosts = fs.readFileSync(systemHostsPath, {
    encoding: 'utf-8',
  })
  let newSystemHosts = ''
  if (replaceContentRegExp.test(systemHosts)) {
    newSystemHosts = systemHosts.replace(replaceContentRegExp, newHosts)
  } else {
    newSystemHosts = `${systemHosts}\r\n${newHosts}\r\n`
  }
  fs.writeFileSync(systemHostsPath, newSystemHosts)
  console.log(`写入到系统 hosts (${systemHostsPath}) 完成`)
}).catch(err => {
  console.log(err)
})
