---
title: Chrome浏览器Timing中的信息
---
Chrome浏览器查看Network信息中，有一个Timing的tab可以查看请求所消耗的时间，通过这些信息可以进行合适的优化

## Timing信息
### Stalled

  翻译为“暂停”、“停滞”，这是请求最开始的一步。因为浏览器对于同一个域名的并行处理线程是有限的，所以如果请求数大于并行数的时候，排队排在后面的请求就需要等待处理了。

### DNS Loopup

  DNS轮询的耗时，将域名解析成ip，然后才能进行访问

### Initial Connection

  这是创建连接的过程，例如http的三次握手，或者https创建链接的耗时

### SSL

  当使用https协议时候才会有此耗时，包含与https连接的创建过程中

### Request Sent

发送请求的耗时，从第一个bit到最后一个bit

### Waiting

从发送到接收到返回之间的等待耗时，会收到例如网络、服务器距离等因素的影响

### Content Download

下载Response的耗时（包括返回头与内容）

## 浏览器的优化
### 链路复用

  以http为例，开始时候进行3次握手建立连接，完成任务之后就进行4次挥手断开链接。当浏览一个网页的时候其实会需要请求很多的资源，如果每一次都按照这样做的话，将会耗费很多的时间，所以出现了链路复用这个优化，即创建的链接不会马上断开，而是留着给后面的请求使用。因此如果留意Network信息的话，会发现最先请求的一些资源有Initial Connection这个过程，而后面访问相同域名的链接则没有了Initial Connection这个过程（包括页面刷新这个操作）。
  Chrome的话可以在chrome://net-internals/#sockets中看到其所保留的socket链接，当将这些链接清除之后，后面的访问都会走所有的流程了。

### 浏览器请求的并行

  浏览器对于同一个域名是可以进行并行处理请求的，例如Chrome对于http1.1和http1.0可以并行6个线程，所以在Network信息中可以看到，同一个域名下，前面6个请求会有DNS Loopup和Initial Connection过程，后面的同一域名的请求就不再有这两个过程了，前提是请求头中有Connection:keep-alive信息。
