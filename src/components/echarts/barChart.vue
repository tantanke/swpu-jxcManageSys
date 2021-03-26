<template>
    <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    export default {
        name:'barChat',
        data(){
            return {
                 id:'barChart',
                 myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
        beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
            loadChart(){
                this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
            },
         	initOption(){
                let option = {
                    title: {
                        text: '商品销售统计（单位/万）'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['总数量','总金额']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['手工艺品','口红','眼霜','洗面奶','精华','显卡','手机','耳机','笔记本','茶叶','水杯','衣服']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'总数量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 235.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'总金额',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                            markPoint : {
                                data : [
                                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                ]
                            }
                        }
                    ]
                };
				return option;
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
