# hexo-theme-microb

A very simple Hexo theme. 

一个超级简单的Hexo主题。

[Demo](https://blog.meiqiu.me)

- 速度至上
- 简洁
- 基于PureCSS

### 基本法：

- 保证最少的css/js/图片引用，如有必要可内联资源，加快页面展示速度。
- 按需引入，拒绝全局引入。
- 保持简洁。

### 隐藏特性

- 点击图标显示目录
- 生成摘要（使用`<!-- more -->`分割)
- 移动端友好

### 快速使用：

- 配置菜单

  在主题`_config.yml` 中配置menu选项：

  ```
  # main menu navigation
  menu:
    home: /
    tags: /tags
    search: /search
    about: /about
    # archives: /archives
  ```


- 创建页面

  hexo中创建页面，需要手动在source文件夹下创建对应的目录和index.md文件。例如about页面：

  /source/about/index.md

  ```markdown
  ---
  title: 关于俺
  date: 2016-05-24 13:45:13
  type: "about"
  comments: false
  ---
  ```

  配置说明：

  > type: 页面类型，参考hexo文档
  >
  > title: about页面的title标签，如果没有默认为About


- 标签

  搜索使用了插件hexo-generator-tag，必须先npm install

  在文章头部声明标签：

  ```markdown
  ---
  title: ES6/ES7参考手册
  date: 2016-12-23 16:08:28
  category:
  - 前端
  tags:
  - es6
  - 手册
  ---
  ```

- 搜索页

  搜索使用了插件[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search) . 必须先npm install 

  a、npm install hexo-generator-search --save

  b、在主目录`_config.yml`配置搜索选项

  ```yaml
  search:
    path: search.xml
    field: post
  ```

  c、参考创建页面创建search文件。


- 配置多语言（可选）

  menu配置中为`key:value` 格式，key支持多语言配置，翻译文件在languages文件夹下。


- 评论

  目前只支持disqus，在主目录中配置disqus_shortname

  ```yaml
  disqus_shortname: xxxyourdisqus
  ```

- 站点统计

  支持百度统计和google统计，在主目录中配置

  ```yaml
  google_analytics: UA-xxxx
  baidu_analytics: xxxx
  ```

如果喜欢并使用本主题，请在页面底部放置主题链接，以方便他人获取，如有问题，请提交issue。感谢。
