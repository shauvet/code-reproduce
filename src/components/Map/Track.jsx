import React from 'react'

const {Component} = React
export default class Track extends Component {

  componentDidMount(prevProps, prevState) {
    var that = this;
    var map = new AMap.Map('track_map_container', {
      zoom: 6
    });

    //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
    AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {

      if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
      }

      //启动页面
      initPage(PathSimplifier);
    });

    function initPage(PathSimplifier) {
      //创建组件实例
      var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        autoSetFitView: true,
        map: map, //所属的地图实例
        getPath: function(pathData, pathIndex) {
          //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
          return pathData.path;
        },
        clickToSelectPath: false,
        getHoverTitle: () => null,
        onTopWhenSelected: false,

        renderOptions: {
          //轨迹线的样式
          pathLineStyle: {
            strokeStyle: 'red',
            lineWidth: 6,
            dirArrowStyle: true,
            eventSupportInvisible: false,
            keyPointStyle: {
              radius: 4
            }
          },
          startPointStyle: {
            radius: 6,
          },
          endPointStyle: {
            radius: 6,
          }
        }
      });
      let paths = that.props.paths;
      //这里构建两条简单的轨迹，仅作示例
      pathSimplifierIns.setData([{
        name: '轨迹',
        path: paths
      }]);
    }
  }

  render(){
    return <div id="track_map_container" style={{...this.props.style}} className={this.props.className}></div>
  }

}

