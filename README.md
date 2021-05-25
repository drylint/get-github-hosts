# get-github-hosts

[toc]

> 目前仅支持 windows 系统下使用，对其他系统不熟悉，欢迎大佬来完善其他系统下~
> 主要是解决 github 打不开的问题，但其实可以添加任何需要的域名到域名列表中来获取 IP 地址并更新到 hosts 文件

由于 Github 的 CDN 域名遭到 DNS 污染，经常导致 Github 的很多域名无法解析获取 IP 地址，导致访问 Github 速度慢或打不开。

工具依托于 `node` 环境来获取 github 各个域名的 IP 地址，建立 IP 和域名的映射关系，因此在访问 Github 的时候，不需要再通过 DNS 来解析 IP 地址，而是直接就访问到了实际 IP 地址，从而可以打开 Github 网站。

## 安装

依赖于 `node` 环境，所以必须要先安装 `node`，然后在命令行执行：

```bash
npm install -g get-github-hosts
```

## 运行

按下键盘 `windows` + `X` 键，在弹出的菜单中选择 `Windows PowerShell (管理员)` （旧系统为 `命令提示符 (管理员)`）一项，会打开命令行。

```bash
ggh
```

在命令行运行 `ggh` 命令即可开始获取 hosts 映射地址，获取完毕后会自动更新系统 hosts 文件（`C:\Windows\System32\drivers\etc\hosts`）。

Github 的 IP 地址会频繁变动，所以当发现打不开了之后，需要重新在命令行执行 `ggh` 命令来更新 hosts。

### 注意

一定要以管理员身份打开命令行，否则会没有权限修改系统 hosts 文件。

## 添加 / 更新域名列表

不定期更新域名列表，欢迎补充遗漏的域名，修改文件为项目根目录下的 `domainList.js` 。

有任何问题欢迎提出 `Issue` 或 `Pull Request` ，或者添加我的微信 `drylint` ，一起进步~
