### Introduction

A starter based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) and [node-java](https://github.com/joeferner/node-java)

### Features

- Support program Java interact with nodejs

- Support persistence of the Redux Store
- Support hot updates by download source code and replace it while program running
- Implementated Redux with Typescript and React Hook
- Good decoupling and expandability, write business with Classes, Inheritance and Polymorphism
- Only support win32, x86 nodejs and java, electron version 2.0.6, electron-builder version 20.29.0, adaptation to new versions and other desktop platforms is in planning

### Preparation

1. Install nodejs [10.12.0/](https://nodejs.org/download/release/v10.12.0/) x86

2. Install jdk8 x86 https://www.oracle.com/java/technologies/downloads/#java8

3. Install python 2.7 https://www.python.org/downloads/release/python-2715/

4. Configure system environment variables

5. Compile app/node/java project with eclipse x86 or other IDE

6. Install node-gyp

   ```shell
   npm install -g node-gyp
   ```

7. Install Build Tools for Visual Studio 2017 https://my.visualstudio.com/Downloads?q=visual%20studio%202017%20version%2015.9

8. Run shell

   ```shell
   yarn config set msvs_version 2017 --global
   yarn config set python [the directory path of python.exe] --global
   #yarn config set python C:\Python27\python.exe --global
   yarn config set electron_mirror https://mirrors.huaweicloud.com/electron/ --global
   ```

9. Run shell in root directory of this project

   ```shell
   yarn
   ```

10. Run shell in directory path app/node_modules/java

    ```shell
    yarn postinstall
    ```

### Build and Run

Run shell in root directory of this project

```shell
yarn dev
```

### Package

Run shell in root directory of this project

```shell
yarn package-win
```

### Errors Solution

- Can't download iojs-2.0.6

  Download iojs-2.0.6 folder in this url https://pan.baidu.com/s/1s7N_71un2oMeUwSkCerlsQ?pwd=tl6e

  Then copy the iojs-2.0.6 folder to C:\Users\\[your username]\\.electron-gyp and C:\Users\\[your username]\\.electron-gyp\\.node-gyp

- Packaging error

  Download Cache folder in this url https://pan.baidu.com/s/1Gbcz_f20JPNq2qxw2SVUJA?pwd=gtwe

  Then copy or replace the Cache folder to C:\Users\\[your username]\AppData\Local\electron-builder\Cache

- Cannot find module '../build/jvm_dll_path.json'

  Check your system environment variables of java

  ```shell
  javac
  ```

  Then run shell in directory path app/node_modules/java

  ```shell
  yarn postinstall
  ```

  

