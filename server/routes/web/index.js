module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Slogan = mongoose.model('Slogan')
    const Category = mongoose.model('Category')
    const Item = mongoose.model('Item')
    const City = mongoose.model('City')
    const Quiz = mongoose.model('Quiz')
    const User = mongoose.model('User')
    const Message = mongoose.model('Message')



    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')


    router.get('/news/init', async(req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.find().where({
                parent: parent
            }).lean() //lean()
        const newsTitles = ["想成为“垃圾分类达人”？来大鹏这个垃圾分类体验馆就对了！", "智能神器、积分换鸡蛋 青岛农村垃圾分类“招招鲜”", "今年乌鲁木齐市将实现居民小区生活垃圾分类全覆盖", "垃圾分类“全民模式”启动　你准备好了吗", "废旧家电如何规范回收（倾听·关注垃圾分类和资源化利用）", "两会热议垃圾分类：增进共识汇聚实施合力", "青岛市北区四方街道开展垃圾分类集中宣传活动", "马国兵：关注垃圾分类“后半场”", "垃圾分类准确率达90%，青岛这个社区是怎么做到的？", "垃圾分类如何“智能又时尚”", "市政协委员沈婷婷：垃圾怎么分类要让市民“心里有数”", "上海垃圾分类半年考“初战告捷” 定时定点有争议 后端处理待加强", "2019（住建委主办）上海垃圾分类与生态环保展", "2019中国国际垃圾分类与城市环卫设施展览会", "2019上海国际垃圾分类与餐厨垃圾设备技术展", "上海召开生活垃圾分类工作动员大会", "IE expo 2019国际环卫技术与装备展览会", "“互联网+垃圾分类”产业沙龙在京召开", "2018 ′中国（深圳）垃圾分类减量 高峰论坛"]
            //map方法循环，传入一个title 返回一个对象 把传入的title赋给该对象的title属性
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2), //每条新闻都有两个分类 比如：赛事、公告，所以一个category下的新闻条数不一致，因为有可能这个分类被随机了多次，那么对应的他的新闻也就更多
                title: title //随机分配两个分类，所以一个title可以属于多个分类，所下下面/news/list中，populate 了children的newslist ，而且是按照categories来查询的，所以赛事的新闻条数和公告的不一样，因为是随机的
            }

        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    //新闻列表接口
    router.get('/news/list', async(req, res) => {
        //效率更高，且可以限制数据个数
        //聚合查询 ，采用管道查询，| 第二步作用在第一步的基础上
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'categories', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'newsList' //将查到的数据存为newsList
                }
            },
            {
                $addFields: {
                    // 修改newsList的数据，我们只要5条
                    //每个newsList只装5条数据
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '今日热点',
            newsList: await Article.find().where({
                categories: { $in: subCats }
                //因为article中有categories这个引用，所以可以使用populate关联查询
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })

        res.send(cats)
    })




    //初始化 slogan 

    // router.get('/slogans/init', async(req, res) => {

    //     // const sloganTitles = [{ "title": "举手之劳，资源永续的源泉。" }, { "title": "就算是扔垃圾，也能小窥操行之高低。" }, { "title": "养成文明餐饮习惯，减少餐厨垃圾。" }, { "title": "垃圾分类一小步，低碳生活一大步。" }, { "title": "垃圾也有家，不要走错门。" }, { "title": "分类投放垃圾，关系你我。" }, { "title": "要是垃圾变为宝，分类回收不可少。" }, { "title": "提高社区的品味，从垃圾分类开始。" }, { "title": "垃圾要分类，生活更美好。" }, { "title": "仍掉，成为“白色污染”回收，变成“白色资源”。" }, { "title": "想要垃圾变为宝，分类回收不可少。" }, { "title": "众人一条分类心，垃圾也能变成金。" }, { "title": "公德竞赛，今天正式开赛。" }, { "title": "配合垃圾分类，争做文明市民。" }, { "title": "混放是垃圾，分类成资源。" }, { "title": "给垃圾一个分类的归宿，还我们一个清洁的世界。" }, { "title": "各类与箱配，变废为宝贝。" }, { "title": "适量点菜，餐后打包，倡导绿色消费。" }, { "title": "垃圾分类，利国利民。" }, { "title": "做好垃圾分类，让我们一起来为地球多添一抹绿色！" }, { "title": "该出手时就出手，该分类时就分类。" }, { "title": "给电池一个安全的归宿，给我们自己一个清洁的世界。" }, { "title": "垃圾分类人人做，做好分类为人人。" }, { "title": "垃圾要分类，生活变美好。" }, { "title": "简单的动作，造就美好环境。" }, { "title": "给电池一个安全的归宿，给自己一个清洁的世界。" }, { "title": "环境是大事，扔垃圾是小事，大事要从小事做起。" }, { "title": "世界变成大花园，垃圾分类是关键。" }, { "title": "要是你疏忽我的存在，把垃圾桶乱丢，我赌气了，这次真的活力了！" }, { "title": "垃圾分类，举手之劳；变废为宝，美化家园。" }, { "title": "干湿垃圾分类装，有害垃圾定点放。" }, { "title": "垃圾混置是垃圾，垃圾分类是资源。" }, { "title": "垃圾分类举手之劳，循环利用变废为宝。" }, { "title": "轻而易举分垃圾，举手之劳变资源。" }, { "title": "给自己一个文明习惯，给垃圾一个利用空间。" }, { "title": "有了垃圾分类箱，垃圾回家方便多。" }, { "title": "人以群分，物以类聚。" }, { "title": "垃圾分类呵护，成就美家美沪。" }, { "title": "你需要优美的环境，我需要你的电池。" }, { "title": "循环，让地球生生不息。" }, { "title": "红蓝黄绿要看清，垃圾分类。" }, { "title": "一点分类，聚成绿洲。" }, { "title": "为垃圾分家，给城市减负。" }, { "title": "创意生活，文明分类。" }, { "title": "垃圾处理有法宝，分门别类利环保。" }, { "title": "垃圾分类益处多，环境保护靠你我。" }, { "title": "垃圾分分类，大家都不累。" }, { "title": "垃圾儿女要分家，安居乐业靠大家。" }, { "title": "垃圾分类，举手之劳。" }, { "title": "呵护我们的环境，与万物共享尊荣。" }, { "title": "积极参与垃圾分类，创优美社区环境。" }, { "title": "给垃圾选一条循环利用的路，给人类谋一条和谐发展的路。" }, { "title": "回收废电池，创造美好家园。" }, { "title": "我虽渺小，但意义重大。" }, { "title": "垃圾分类，创造美好生活。" }, { "title": "环境保护在心中，垃圾分类在手中。" }, { "title": "分类有道，垃圾成宝！" }, { "title": "垃圾分类，守护家园。" }, { "title": "垃圾分类，从无做起。" }, { "title": "垃圾分好类，生活没烦恼。" }, { "title": "众人一条分类心，垃圾也能变成金！" }, { "title": "垃圾分类，人人有责！" }, { "title": "垃圾分类三步走，一干湿，二有害，最后挑出可回收。" }, { "title": "分类一小步，文明一大步。" }, { "title": "废物，宝物，一息之中；垃圾，资源，一念之间。" }, { "title": "积极参与垃圾分类，创建优美社区环境。" }, { "title": "全民参与垃圾分类，共享环保低碳生活。" }, { "title": "感激你的关照，我寂寞的心如沐东风。" }, { "title": "一个萝卜一个坑，别让垃圾跳错坑。" }, { "title": "垃圾分一分，环境美十分。" }, { "title": "分类收集人人有责，男女老幼齐参与。" }, { "title": "你们的舍弃却是我的最爱，它们在这里找到了归宿。" }, { "title": "谢谢您的配合，我为您的风度而赞美。" }, { "title": "垃圾科学分类，文明你我同行。" }, { "title": "未来人类的文明，将是绿色文明垃圾桶。" }, { "title": "垃圾分类人人做，做好分类为人人！" }, { "title": "积极参与垃圾分类，共同呵护绿色家园。" }, { "title": "未来人类的文明，将是绿色文明。" }, { "title": "走过我的窗前，留下您不要的东西。" }, { "title": "地球是我家，垃圾分类靠大家。" }, { "title": "伸出你的手，让垃圾对上号。" }, { "title": "我们不想住在一起，请给我们分个家。" }, { "title": "垃圾分类，和谐广州。" }, { "title": "垃圾分类，举手之劳。变废为宝，美化家园。" }, { "title": "参与垃圾分类，保护地球家园，共创美好世界。" }, { "title": "垃圾和人一样，应该各有所归。" }, { "title": "举手之劳，好处无限。" }, { "title": "我们兄弟有点像\n句子大全http://Www.1juzI.coM/\n，分清我们好处多。" }, { "title": "请为你手中的垃圾，找一个合适的家。" }, { "title": "干湿要分类，有害单独放，资源重复用，生活更健康。" }]
    //     await Slogan.deleteMany({})
    //     await Slogan.insertMany(sloganTitles)
    //     res.send(sloganTitles)
    // })


    //用户 新建 slogan
    router.post('/slogans/init', async(req, res) => {

        const token = String(req.headers.authorization || '').split(' ').pop()
        const { id } = jwt.verify(token, app.get('secret'))
            // 想要再之后的路由中也继续使用这个user就就要把他黑挂载到req上面去
        req.user = await User.findById(id)
        const model = req.body
        model['user'] = req.user._id
            // console.log(req.body, req.user)
        const info = Slogan.create(model)
            // console.log(info)
        res.send(info)


    })


    router.post('/messages', async(req, res) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        const { id } = jwt.verify(token, app.get('secret'))
            // 想要再之后的路由中也继续使用这个user就就要把他黑挂载到req上面去
        req.user = await User.findById(id)
        const model = req.body
        model['user'] = req.user._id
            // console.log(req.body, req.user)
        const info = Message.create(model)
            // console.log(info)
        res.send(info)
    })


    // slogans接口
    router.get('/slogans/all', async(req, res) => {
        const slogans = await Slogan.find()
        res.send(slogans)
    })

    router.get('/slogans/list/:count', async(req, res) => {
        let count = parseInt(req.params.count)
        if (count === "") {
            var slogans = await Slogan.find().populate('user').sort({ '_id': -1 }).limit(1)
        } else {
            // 在mongodb的_id字段里其实已经包含了时间信息，所以想要对查询结果进行时间数据插入时间来排序的很简单.sort({ '_id': -1 })
            var slogans = await Slogan.find().populate('user').sort({ '_id': -1 }).limit(count)
        }
        res.send(slogans)
    })

    //用户删除自己创建的标语
    router.delete('/slogans/:id', async(req, res) => {
        // 这里的req.body什么意思啊
        await Slogan.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 用户更新自己的留言
    router.put('/slogans/:id', async(req, res) => {
        const model = await Slogan.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })


    //quiz接口
    router.get('/quizzes/list', async(req, res) => {
        const quizzes = await Quiz.find()
        res.send(quizzes)
    })

    //导入英雄数据  也是供测试使用  自己手动访问 http://localhost:3000/web/api/items/init
    router.get('/items/init', async(req, res) => {
        await Item.deleteMany({})
        const rowData = [{
                "name": "热门",
                "items": [{ "name": "" }, { "name": "" }]
            },
            {
                "name": "可回收垃圾",
                "items": [{ "name": "作业" }, { "name": "梳子" }, { "name": "皮拖鞋" }, { "name": "泡膜" }, { "name": "小提琴" }, { "name": "医保卡" }, { "name": "木柜" }, { "name": "快递盒" }, { "name": "积分卡" }, { "name": "白色泡沫" }, { "name": "烤箱" }, { "name": "玻璃片" }, { "name": "牙膏盒" },
                    { "name": "显示器" },
                    { "name": "塑料杯" }, { "name": "棉手套" }, { "name": "电熨斗" }, { "name": "石英手表" }, { "name": "不锈钢勺" },
                    { "name": "皮具" }, { "name": "剃须刀" }, { "name": "闹钟" }, { "name": "微波炉" }, { "name": "纸张" }, { "name": "香烟盒" }, { "name": "硬卡" }, { "name": "钱袋" }, { "name": "收据" }, { "name": "菜篮" }, { "name": "金条" }, { "name": "指套" }, { "name": "热水瓶盖" }
                ]
            },
            {
                "name": "干垃圾",
                "items": [{ "name": "化妆棉" }, { "name": "泡面袋" }, { "name": "花露水" }, { "name": "手写笔" },
                    { "name": "毛毡" }, { "name": "暖手袋" }, { "name": "镜框" }, { "name": "煤球" }, { "name": "卷笔刀" }, { "name": "退热贴" },
                    { "name": "橡胶塞" }, { "name": "订书针" }, { "name": "防水贴" }, { "name": "防碎袋" }, { "name": "发胶瓶" }, { "name": "土灰" },
                    { "name": "润滑油" }, { "name": "石灰水" }, { "name": "化妆刷" }, { "name": "猫砂" }, { "name": "枕巾" }, { "name": "吸湿剂" },
                    { "name": "棉纱" }, { "name": "棉纱" }, { "name": "自热盒" }, { "name": "湿巾纸" }, { "name": "牙线棒" }, { "name": "橡皮胶" },
                    { "name": "痰" }, { "name": "方便袋" }, { "name": "冷饮袋" }, { "name": "胶管" }, { "name": "饮料管" }
                ]
            },
            {
                "name": "湿垃圾",
                "items": [{ "name": "芦粟渣" }, { "name": "面膜" }, { "name": "馍" }, { "name": "烧烤" }, { "name": "葡萄皮" }, { "name": "鸡心" }, { "name": "白醋" }, { "name": "珍珠粉" }, { "name": "橙子" },
                    { "name": "小骨头" }, { "name": "剩饭" }, { "name": "果肉" }, { "name": "枣壳" }, { "name": "碎骨" }, { "name": "蛋卷" }, { "name": "肉松" }, { "name": "生日蛋糕" }, { "name": "葱根" },
                    { "name": "梭子蟹" }, { "name": "仙人球" }, { "name": "茴香" }, { "name": "棒冰" }, { "name": "芒果核" }, { "name": "豆腐干" }, { "name": "茶叶蛋" },
                    { "name": "面条" }, { "name": "鸡" }, { "name": "萝卜" }, { "name": "蜘蛛" }, { "name": "汤料" }, { "name": "糖浆" }, { "name": "椰奶" }
                ]
            },
            {
                "name": "有害垃圾",
                "items": [{ "name": "针套" }, { "name": "卸甲水" }, { "name": "油墨盒" }, { "name": "止咳糖浆" }, { "name": "染料" },
                    { "name": "聚氨酯漆" }, { "name": "药瓶" }, { "name": "防水漆" }, { "name": "盐水袋" }, { "name": "消毒剂" },
                    { "name": "硫酸瓶" }, { "name": "杀虫剂罐" }, { "name": "墨汁" }, { "name": "农药包装袋" }, { "name": "药品包装" }, { "name": "相片纸" },
                    { "name": "输液管" }, { "name": "防水漆" }, { "name": "碘酒瓶" }, { "name": "安瓿" }, { "name": "吸氧面罩" }, { "name": "消毒水" }, { "name": "矿物油" }, { "name": "荧光管" },
                    { "name": "充电电池" }, { "name": "碘酒瓶" }, { "name": "84消毒液" }, { "name": "老鼠药" }, { "name": "底片" }, { "name": "处方药" }, { "name": "探热针" },
                ]
            }
        ]



        for (let cat of rowData) {
            if (cat.name === '热门') {
                continue
            }
            // 找到当前分类在数据库中对应的数据
            const category = await Category.findOne({
                    name: cat.name
                })
                // 其实 map 是按引用传值的，改了 引用对象也会更改本身
            cat.items = cat.items.map(item => {
                    item.category = category
                    return item
                })
                //录入垃圾
            await Item.insertMany(cat.items)
        }
        res.send(await Item.find())
    })

    //父级分类是垃圾分类的分类接口

    router.get('/categories/garbage', async(req, res) => {
        const parent = await Category.findOne({
            name: '垃圾分类'
        })
        const cats = await Category.aggregate([
                { $match: { parent: parent._id } },

            ])
            //返回垃圾分类的子分类 
        res.send(cats)
    })

    //垃圾列表接口
    router.get('/items/list', async(req, res) => {
        const parent = await Category.findOne({
            name: '垃圾分类'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'items', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'category', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'itemList' //将查到的数据存为newsList
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            itemList: await Item.find().where({
                category: { $in: subCats }
                //因为article中有categories这个引用，所以可以使用populate关联查询
            }).limit(10).lean()
        })
        res.send(cats)
    })


    //垃圾源头接口http://localhost:3000/web/api/origins/张家界市

    router.get('/origins/:city', async(req, res) => {
        const city = await City.findOne({
            city: req.params.city
        })
        console.log(city)
        const cats = await City.aggregate([
            { $match: { city: city.city } }, //与要查的origins中存的city的id值一致
            {
                $lookup: {
                    from: 'origins', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'city', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'originList' //将查到的数据存为newsList
                }
            },
        ])
        res.send(cats)
    })

    //垃圾处理场所接口http://localhost:3000/web/api/places/%E5%BC%A0%E5%AE%B6%E7%95%8C%E5%B8%82

    router.get('/places/:city', async(req, res) => {
        const city = await City.findOne({
            city: req.params.city
        })
        console.log(city)
        const cats = await City.aggregate([
            { $match: { city: city.city } }, //与要查的places中存的city的id值一致
            {
                $lookup: {
                    from: 'places', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'city', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'placeList' //将查到的数据存为newsList
                }
            },
        ])
        res.send(cats)
    })

    //垃圾报表接口
    router.get('/tables/:city', async(req, res) => {
        const city = await City.findOne({
            city: req.params.city
        })
        console.log(city)
        const cats = await City.aggregate([
            { $match: { city: city.city } }, //与要查的tables中存的city的city值一致
            {
                $lookup: {
                    from: 'tables', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'city', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'tableList' //将查到的数据存为newsList
                }
            },
        ])
        res.send(cats)
    })


    // // 文章详情 相关资讯，就查同一个分类的资讯
    router.get('/articles/:id', async(req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories }
        }).limit(2)
        res.send(data)
    })

    //政策法规列表接口
    router.get('/policy/list', async(req, res) => {
        //效率更高，且可以限制数据个数
        //聚合查询 ，采用管道查询，| 第二步作用在第一步的基础上
        const parent = await Category.findOne({
            name: '政策法规'
        })
        const cats = await Category.aggregate([
            { $match: { name: parent.name } },
            {
                $lookup: {
                    from: 'articles', //从哪个集合
                    localField: '_id', // 查到的该条数据的id，article的id
                    foreignField: 'categories', //Article 的categories 是对Category的一个引用，所以是外键
                    as: 'newsList' //将查到的数据存为newsList
                }
            },
        ])
        res.send(cats)
    })

    //政策详情文章
    router.get('/policy/:id', async(req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories }
        }).limit(2)
        res.send(data)
    })




    // 为了上传图片服务

    const multer = require('multer')
    const path = require('path')
    const dest = path.join(__dirname, '../../uploads')
    const upload = multer({ dest })
        // console.log(dest)
        //一定要加upload.single(file) 才会有req.file
    app.post('/web/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file
            // 记得这里的filename是小写 
            //   file.url = `http://glory.dupanpan.top/uploads/${file.filename}`
        file.url = `http://localhost:3000/uploads/${file.filename}`
        console.log(file)
        console.log(file.fileName)
        res.send(file)
    })



    //用户补录垃圾信息
    router.post('/items/add', async(req, res) => {

        const model = req.body
        const info = Item.create(model)
        res.send(info)
    })

    //获取所有的垃圾
    //首先是获取所由得垃圾  然后用户点击下拉列表中得垃圾后，回车/搜索  就显示这个垃圾得分类信息 不用再fetch直接显示就好
    // 使用正则表达式 在搜索得时候，之后 就全部显示 不用获取所有，什么时候显示呢 应该是用户输入一个字之后就开始匹配，input触发这个事件，
    router.get('/items', async(req, res) => {
        // const data = await Item.findById(req.params.val).lean()
        const garbage = req.params.val
        const item = await Item.findOne({ name: garbage }).populate('category')
        res.send(item)
    })

    //垃圾详情
    router.get('/items/:val', async(req, res) => {
        // const data = await Item.findById(req.params.val).lean()
        const garbage = req.params.val
        const item = await Item.findOne({ name: garbage }).populate('category')
        res.send(item)
    })


    //创建用户
    router.post('/register', (req, res) => {
        const model = User.create(req.body)
        res.send(model)
    })

    //获取用户
    router.get('/users', async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        const { id } = jwt.verify(token, app.get('secret'))
            // 想要再之后的路由中也继续使用这个user就就要把他黑挂载到req上面去
        req.user = await User.findById(id)
        res.send(req.user)

        await next()
            // res.send(model)
    })

    // 保存留言
    router.post('/messages', async(req, res) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        const { id } = jwt.verify(token, app.get('secret'))
            // 想要再之后的路由中也继续使用这个user就就要把他黑挂载到req上面去
        req.user = await User.findById(id)
        const model = req.body
        model['user'] = req.user._id
            // console.log(req.body, req.user)
        const info = Message.create(model)
            // console.log(info)
        res.send(info)
    })


    //获取留言  需要根据userid 获取username
    router.get('/messages', async(req, res, next) => {
        const messages = await Message.find().populate('user').sort({ '_id': -1 }).limit(30)
            // console.log(messages)
        res.send(messages)
    })

    // 用户删除自己的留言
    // 删除资源
    router.delete('/messages/:id', async(req, res) => {
        // 这里的req.body什么意思啊
        await Message.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 用户更新自己的留言
    router.put('/messages/:id', async(req, res) => {
        const model = await Message.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //login

    router.post('/login', async(req, res) => {
        // 解构赋值
        const { username, password } = req.body
            //1. 根据用户名找用户
            // 这里之所以使用select('+password'),是由于我们在User中,设置了select:false,默认就查不到
        const user = await User.findOne({ username }).select('+password')
            // 这里使用http-assert 直接抛出错误,让express的错误处理中间件来统一处理就好

        // assert(user, 422, '用户不存在')

        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        //2. 校验密码 :由于我们的密码已经被加密的,(职业操守:就算是开发人员也不知道用户的密码),
        // 所以不能通过明文找到用户
        const isValid = require('bcrypt').compareSync(password, user.password)
            // assert(isValid, 422, '密码错误')

        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }

        //3. 返回token
        const token = jwt.sign({ id: user._id, username: user.username }, app.get('secret')) //app.get是密钥，防止用户信息被篡改
        res.send({ token })
    })


    app.use('/web/api', router)
}