import WxCanvas from '@/utils/ec-canvas/wx-canvas'
import * as echarts from '@/utils/ec-canvas/echarts'
import wepy from 'wepy'
export default class ChartInit {
    static init(callback, canvasId, canvasClass, option, initChart) {
        const version = wepy.getSystemInfoSync().SDKVersion.split('.').map(n => parseInt(n, 10))
        const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9) ||
            (version[0] === 1 && version[1] === 9 && version[2] >= 91)
        if (!isValid) {
            console.error('微信基础库版本过低，需大于等于 1.9.91。' +
                '参见：https://github.com/ecomfe/echarts-for-weixin' +
                '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82')
            return
        }
        let ctx = wepy.createCanvasContext(canvasId, this)
        const canvas = new WxCanvas(ctx, canvasId)
        echarts.setCanvasCreator(() => {
            return canvas
        })
        var query = wepy.createSelectorQuery()
        query.select(canvasClass).boundingClientRect(res => {
            if (typeof callback === 'function') {
                this.chart = callback(canvas, res.width, res.height)
            } else if (true) {
                this.chart = initChart(canvas, res.width, res.height, option)
            }
        }).exec()
    }
}