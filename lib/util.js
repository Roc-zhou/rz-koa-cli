const fs = require('fs');
const path = require('path');

const copyFile = (srcPath, tarPath, cb) => {
  const readStream = fs.createReadStream(srcPath)
  readStream.on('error', (err) => {
    if (err) {
      // console.log('读取错误', srcPath)
    }
    cb && cb(err)
  })

  const writeStream = fs.createWriteStream(tarPath)
  writeStream.on('error', (err) => {
    if (err) {
      // console.log('write error', tarPath)
    }
    cb && cb(err)
  })
  writeStream.on('close', (ex) => {
    cb && cb(ex)
  })

  readStream.pipe(writeStream)
}
const copyFolder = (srcDir, tarDir, cb) => {
  fs.readdir(srcDir, (err, files) => {
    let count = 0
    const checkEnd = () => {
      ++count == files.length && cb && cb()
    }
    if (err) {
      checkEnd()
      return
    }

    files.forEach((file) => {
      const srcPath = path.join(srcDir, file)
      const tarPath = path.join(tarDir, file)
      fs.stat(srcPath, (err, stats) => {
        if (stats.isDirectory()) {
          // console.log('mkdir', tarPath)
          fs.mkdir(tarPath, (err) => {
            if (err) {
              // console.log(err)
              return
            }
            copyFolder(srcPath, tarPath, checkEnd)
          })
        } else {
          copyFile(srcPath, tarPath, checkEnd)
        }
      })
    })
    //为空时直接回调
    files.length === 0 && cb && cb()
  })
}

module.exports.copyFolder = copyFolder

module.exports.mkdir = (path) => {
  fs.mkdireadStreamync(path)
}

module.exports.exists = (path, callback) => {
  return new Promise((res, rej) => {
    fs.exists(path, function (exists) {
      if (!exists) {
        rej(exists)
      }
      res(exists)
    });
  })

}


module.exports.install = (projectPath, packageName, save = true, dev = false) => {
  return new Promise((res, rej) => {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    const args = ['install']
    args.push(packageName)
    if (save) args.push('--save')
    if (dev) args.push('-D')
    var ls = require('child_process').spawn(npm, args, {
      cwd: projectPath
    })
    ls.stdout.on('data', function (data) {
      // console.log('stdout: ' + data)
    })
    ls.stderr.on('data', function (err) {
      // console.log('stderr: ' + err)
    })
    ls.once('close', function () {
      // console.log(`${packageName} install successfully`)
      res()
    })
  })

}