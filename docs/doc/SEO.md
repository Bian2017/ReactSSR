
SEO
---

## 一、Title和Description的真正作用

Title和Description其实对网站的SEO作用不是特别大，或者说基本没有作用。

```HTML
<title>唯品会（原Vipshop.com）特卖会：全球精选_正品特卖_确保正品_确保低价_货到付款</title>
<meta name="description" content="唯品会vip购物网以1-7折超低折扣对全球各大品牌进行限时特卖，商品囊括服装、化妆品、家居、奢侈品等上千品牌。100%正品、低价、货到付款、7天无理由退货。" />
```

目前主流搜索引擎是基于全文索引的搜索引擎，它会针对页面中的每一个词都建立索引，然后根据关键词出现的次数和位置建立排名，因此仅仅依靠Title和Description是不够的，它对网站排名影响非常小。但这并不代表Title和Description不重要，它们的真正作用其实是提高网站的转化率。

![](https://raw.githubusercontent.com/Bian2017/ReactSSR/master/docs/img/title.png)

如上图所示，好的Title和好的Description会很有吸引力，可以增加用户点击欲望，从而提高网站的转化率。 

## 二、如何做好SEO

网站通常由三个部分组成：文字、多媒体和链接。

文字优化：原创性。因为原创的文章价值高于抄袭的文章，抄袭的文章没有太大价值，所以排名不会太好。

链接：内链和外链。内链：网站的链接内容，和网站的内容要尽量相关，相关度越强，搜索引擎就会认为链接价值越大。外链：网站的外部链接越多，说明网站的影响力越大，搜索引擎会让排名靠前。

多媒体(包含图片)：图片如果做到原创或者高清，对排名也会有帮助。有图片会默认网站的丰富度更全面。

## 三、React Helmet定制页面Title和Description

React Helmet插件不仅可以实现客户端页面Title和Description的定制，也能在服务端渲染的时候实现页面Title和Description的定制，代码修改见[分支daily/0.2.10]()。