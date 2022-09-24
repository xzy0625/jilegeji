## 纯前端实现羊了个羊

### 技术栈

react + vite + ts + antd

### 体验网址

jilegeji.zyxiong.com

### 游戏展示

配置界面：

![image-20220924203210310](https://csuxzy-images-1300770696.cos.ap-guangzhou.myqcloud.com/image-20220924203210310.png)

游戏界面:

![image-20220924203235615](https://csuxzy-images-1300770696.cos.ap-guangzhou.myqcloud.com/image-20220924203235615.png)

游戏结束界面：

![image-20220924203257350](https://csuxzy-images-1300770696.cos.ap-guangzhou.myqcloud.com/image-20220924203257350.png)

### 运行
```yarn install```
```yarn dev```
### 核心原理

1. 由于没有使用redux，所有的配置都放置在顶层组件上，方便使用
2. 地图看成一个三维空间，每一个平面(x, y)都可以确定一个方块，一个方块占据四个点位
3. 计算层叠关系的时候关键就是要考虑更高层的点位上是否有卡片



### 后续

所有代码均已开源，请勿做其他用处。由于是闲暇时间所做，难免会有bug，也欢迎大家踊跃提issuse，代码有不懂的也可以留言，作者看到了会第一时间回复