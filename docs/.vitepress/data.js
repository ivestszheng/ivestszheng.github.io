export function nav() {
    return [
        { text: '前端', link: '/frontend/' },
        { text: '代码人生', link: '/life/' },
        {
            text: '关于我',
            items: [
                { text: 'GitHub', link: 'https://github.com/ivestszheng' },
                { text: '掘金', link: 'https://juejin.cn/user/1618116899507735' },
            ]
        }
    ]
}

export function sidebarFrontend() {
    return [
        {
            text: '前端心得总结',
            collapsible: true,
            items: [
                { text: '钉钉H5微应用开发', link: '/frontend/钉钉H5微应用开发' },
                { text: 'Vue 2.x 组件通信方式，初学者也能看懂', link: '/frontend/Vue 2.x 组件通信方式，初学者也能看懂' },
                { text: '记录我的第一个开源组件', link: '/frontend/记录我的第一个开源组件' },
                { text: '骨架屏优化——细粒度模式的实现', link: '/frontend/骨架屏优化——细粒度模式的实现' },
                { text: 'xlsx库实现纯前端导入导出Excel', link: '/frontend/xlsx库实现纯前端导入导出Excel' },
                { text: '长列表无限下拉的实现（上）', link: '/frontend/长列表无限下拉的实现（上）' },
                { text: '长列表无限下拉的实现（下）', link: '/frontend/长列表无限下拉的实现（下）' },
                { text: 'Vue2.x项目工程环境搭建思路', link: '/frontend/Vue2.x项目工程环境搭建思路' },
                { text: '后台系统的权限控制与管理', link: '/frontend/后台系统的权限控制与管理' },
                { text: 'vue-cli5关于yarn的一个小坑', link: '/frontend/vue-cli5关于yarn的一个小坑' },
                { text: '前端已经接好接口还要写假数据，如何优雅处理？', link: '/frontend/前端已经接好接口还要写假数据，如何优雅处理？' },
                { text: '跨域通信之postmessage', link: '/frontend/跨域通信之postmessage' },
                { text: 'Vue3在浙里办的实践', link: '/frontend/Vue3在浙里办的实践' },
                { text: 'node.js 实现压缩', link: '/frontend/node.js 实现压缩' },
                { text: 'Vue3 hooks 实践后的个人偏见', link: '/frontend/Vue3 hooks 实践后的个人偏见' },
                { text: 'Tailwind CSS 很好，但不适合我', link: '/frontend/Tailwind CSS 很好，但不适合我' },
            ]
        }
    ]
}

export function sidebarLife() {
    return [
        {
            text: '年度总结',
            collapsible: true,
            items: [
                { text: '二本应届生杭州小厂前端面试总结', link: '/life/summary/二本应届生杭州小厂前端面试总结' },
                { text: '菜鸡的自我审视——我的2021', link: '/life/summary/菜鸡的自我审视——我的2021' },
                { text: ' 不断学习 | 2022年中总结', link: '/life/summary/不断学习2022年中总结' },
                { text: '2023 的一些思考', link: '/life/summary/2023 的一些思考'}
            ]
        },
        {
            text: '闲谈',
            collapsible: true,
            items: [
                { text: '小白买自行车功课记录', link: 'life/chat/小白买自行车功课记录' },
            ]
        }
    ]
}
