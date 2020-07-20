module.exports = app => {
    const router = require('express').Router();
    const mongoose = require('mongoose')
    // const Article = require('../../models/Article')
    const Article = mongoose.model('Article');
    const Category = mongoose.model('Category');
    
    /**
     * fake 新闻数据
     */
    router.get('/news/init', async (req, res) => {
        // 获取新闻的父类查询
        const parent = await Category.findOne({
            name:'新闻分类'
        })
        // 查询所有新闻分类下的纯js对象。
        const cats = await Category.find().where({parent: parent}).lean();
        const newsTitles = ["王者荣耀周年庆表现道具设计大赛现已开启！", "百力滋X王者荣耀 大手笔赠送上百个英雄手办、永久皮肤！", "蓝方惊现自走机甲？为你揭秘蜀地木流牛马的精妙机关", "破浪对决中的战船是……戳开解锁吴地艨艟的“身世之谜”！", "红方高地惊现新建筑？一起探秘魏都代表建筑“高阙”！", "7月15日体验服停机更新公告", "7月15日净化游戏环境声明及处罚公告", "7月15日外挂专项打击公告", "7月15日“演员”惩罚名单", "7月14日全服不停机更新公告", "【微信用户专属】李信新皮肤上线抽免单活动", "【手Q用户专属】李信-一念神魔限时抽免单活动", "李信世冠皮肤即将上架，参与活动赢好礼", "【三分之战 . 集奇兵制胜】活动开启公告", "S20赛季开启，缤纷好礼等你来拿", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉", "2020年王者荣耀世界冠军杯第二轮选拔赛 加赛及抽签规则", "世冠小组赛抽签仪式6月28日现场直播，小组赛之战一触即发！", "2020年王者荣耀世界冠军杯（KCC）赛事规则"];
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort(((a,b)=> Math.random()-0.5));
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({});// 传递空对象代表以任意条件查询(全匹配)
        await Article.insertMany(newsList);
        res.send(newsList);
    })
    // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        /*
         * 无法查询每个子分类中的指定数目，pass
           const parent = await Category.findOne({
                name: '新闻分类'
            }).populate({
                path: 'children',
                populate: 'newsList'
            }).lean()
        */
        const parent = await Category.findOne({
            name:'新闻分类'
        });
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'articles', // 集合名称默认是模型名称小写的复数形式
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: {$slice: ['$newsList', 5]}
                }
            }
        ]);
        const subCats = cats.map(v => v._id);
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: {$in: subCats}
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.CategoryName = cat.name === '热门' ? news.categories[0].name : cat.name
            })
            return cat
        })
        res.send(cats);

    })
    // fake英雄数据
    
    app.use('/web/api', router);
}