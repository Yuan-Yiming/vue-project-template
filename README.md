# Vue项目开发模板

### 在本地复制一个模板项目（your-project-name为项目名称）
```
git clone git@39.104.108.161:james/vue-project-template.git your-project-name
```

### 进入新建的项目目录
```
cd your-project-name
```

### 将原有的git仓库删除，并新建一个git仓库（成为一个独立的项目）
```
rm -rf .git
git init
```

### 安装依赖
```
cnpm i // npm install
```

### 项目运行
```
npm run serve
```

### 项目打包
```
npm run build
```

### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).



## 开发规范
### 0. 规范说明
优先级A: 必要的

优先级B: 强烈推荐的

优先级C: 推荐的

### 1. 命名规范（优先级A）
1.1 文件夹/普通文件命名统一使用小写和短横线命名 (kebab-case)，包括js、css、html、图片等文件；

1.2 组件文件命名统一使用驼峰式命名（PascalCase），首字母需大写，且尽量避免使用单个单词；

1.3 变量命名统一使用驼峰式命名（PascalCase），除了类以外其它普通变量首字母小写，类名首字母大写；

1.4 常量命名全部使用大写字母，使用下划线分割；

1.5 组件name属性，建议使用组件文件名同名，如VideoViewer.vue的name为"VideoViewer"；如果是Index.vue组件，使用外层文件名来做驼峰命名，如video-viewer/Index.vue，name为"VideoViewer";

1.6 组件根标签建议加一个与组件名同名的类名，如VideoViewer.vue组件，根标签设置`<div class="video-viewer"></div>`，方便开发调试；

1.7 html的class命名，统一使用小写和短横线命名 (kebab-case)，如`<div class="content-wrapper"></div>`；

### 2. css规范（优先级C）
参考 [BEM命名规范](https://blog.csdn.net/chenmoquan/article/details/17095465)

### 3. js规范（优先级B）
参考 [JavaScript编程风格](http://wangdoc.com/javascript/features/style.html)

### 4. vue规范（优先级B）
参考 [Vue 风格指南](https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-A-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BF%85%E8%A6%81%E7%9A%84-%E8%A7%84%E9%81%BF%E9%94%99%E8%AF%AF)

