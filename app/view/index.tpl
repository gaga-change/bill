<html>
  <head>
    <title>账单</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="//cdn.junn.top/layui/2.4.3/css/layui.css">
    <style>
      .container {
        margin-top: 20px;
      }
      .classifyItem {
        margin-top: 20px;
      }
      .layui-btn-normal {
        border: 1px solid #1E9FFF;
      }
    </style>
  </head>
  <body>
    <div class="layui-container container">
      <div class="layui-tab " lay-filter="classify">
        <ul class="layui-tab-title">
          {% for group in classifyList %}
            <li lay-id='{{loop.index}}' data-type={{generaMap[group._id].type}}>
              {{generaMap[group._id].name}}
            </li>
          {% endfor %}
        </ul>
        <div class="layui-tab-content">
          {% for group in classifyList %}
            <div class="layui-tab-item" data-id='{{loop.index}}'>
              {% for item in group.children %}
                <button type="button" class="layui-btn layui-btn-radius layui-btn-primary classifyItem" data-id="{{item._id}}" data-name="{{item.name}}">
                  {{item.name}}
                </button>
              {% endfor %}
            </div>
          {% endfor %}
        </div>
      </div>
      <form class="layui-form" action="" lay-filter="classifyForm">
        <div class="layui-form-item">
          <label class="layui-form-label">金额</label>
          <div class="layui-input-block">
            <input type="number" name="price" required  lay-verify="required" placeholder="请输入金额" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item" id="accountChoose1">
          <label class="layui-form-label">账户</label>
          <div class="layui-input-block">
            <select name="account" lay-verify="required">
              {% for item in accountList %}
                <option value="{{item.id}}">
                  {{item.name}}</option>
              {% endfor %}
            </select>
          </div>
        </div>
        <div class="layui-form-item" id="accountChoose2" style="display:none">
          <label class="layui-form-label">资金流动</label>
          <div class="layui-input-inline">
            <select name="account1" lay-verify="required">
              {% for item in accountList %}
                <option value="{{item.id}}">
                  {{item.name}}</option>
              {% endfor %}
            </select>
          </div>
          <div class="layui-input-inline">
            <select name="account2" lay-verify="required">
              {% for item in accountList %}
                <option value="{{item.id}}">
                  {{item.name}}</option>
              {% endfor %}
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">日期选择</label>
          <div class="layui-input-block">
            <input type="text" name="date" id="date" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">备注</label>
          <div class="layui-input-block">
            <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
            {# <button type="reset" class="layui-btn layui-btn-primary">重置</button> #}
          </div>
        </div>
      </form>
      <table id="recordTable" lay-filter="recordTable"></table>
    </div>
    <script src="//cdn.junn.top/layui/2.4.3/layui.js"></script>
    <script type="text/html" id="recordTableBar">
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script>

      layui.use([
        'form',
        'laydate',
        'element',
        'jquery',
        'table',
        'util'
      ], function () {
        var form = layui.form,
          layer = layui.layer,
          element = layui.element,
          $ = layui.jquery,
          table = layui.table,
          util = layui.util,
          laydate = layui.laydate;
        var chooseId = null;
        init()
        function init() {
          //第一个实例
          table.render({
            elem: '#recordTable', url: '/api/records', //数据接口
            parseData: function (res) { //res 即为原始返回的数据
              return {
                "code": 0, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.count, //解析数据长度
                "data": res
                  .records
                  .map(function (item) {
                    item.classifyName = item.classify && item.classify.name
                    item.date = util.toDateString(item.date, 'MM-dd HH:mm')
                    return item
                  }) //解析数据列表
              };
            },
            request: {
              pageName: 'page', //页码的参数名称，默认：page
              limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
            cols: [
              [
                {
                  field: 'classifyName',
                  title: '分类'
                }, {
                  field: 'price',
                  title: '金额'
                }, {
                  field: 'remark',
                  title: '备注'
                }, {
                  field: 'date',
                  title: '时间'
                }, {
                  title: '操作',
                  toolbar: '#recordTableBar'
                }
              ]
            ]
          });
          laydate.render({elem: '#date', type: 'datetime', value: new Date()});
          var ele = $('[data-name=早餐]').closest('.layui-tab-item')
          var checkTabIndex = 1
          if (ele.length) {
            checkTabIndex = ele.attr('data-id')
          }
          element.tabChange('classify', checkTabIndex);
          /*
            3 ~ 10 早
            10 ~ 15 午
            15 ~ 22 晚
            22 ~ 03 夜宵
          */
          var d = new Date();
          var hours = d.getHours()
          if (hours > 3 && hours < 10) {
            checkClassifyBtn("[data-name=早餐]", true)
          } else if (hours >= 10 && hours < 15) {
            checkClassifyBtn("[data-name=午餐]", true)
          } else if (hours >= 15 && hours < 22) {
            checkClassifyBtn("[data-name=晚餐]", true)
          } else {
            checkClassifyBtn("[data-name=夜宵]", true)
          }
        }
        $('.classifyItem').click(function (e) {
          var id = $(e.target).attr('data-id')
          if (chooseId === id) {
            return
          }
          checkClassifyBtn('.classifyItem', false)
          checkClassifyBtn(e.target, true)
        })
        form.on('submit(formDemo)', function (data) {
          data.field.classify = chooseId
          data.field.price = Number(Number(data.field.price).toFixed(2))
          createRecord(data.field)
          return false;
        });

        // 监听tab 切换
        element.on('tab(classify)', function (data) {
          console.log(data);
          // 判断是否时转账类型，动态显示表单
          var type = Number($(data.elem.context).attr('data-type'))
          $('.layui-tab-item[data-id="'+ (data.index + 1) +'"]').find('.classifyItem')[0].click()
          if (type === 3 || type === 4) {
            $('#accountChoose1').hide()
            $('#accountChoose2').show()
          } else {
            $('#accountChoose1').show()
            $('#accountChoose2').hide()
          }
        });

        //监听行工具事件
        table.on('tool(recordTable)', function (obj) {
          var data = obj.data;
          if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
              obj.del();
              $.ajax({
                url: '/api/records/' + data._id,
                type: 'delete',
                data: JSON.stringify({_csrf: $('[name=_csrf]').val()}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (res) {}
              });
              layer.close(index);
            });
          }
        });

        function createRecord(data) {
          $.ajax({
            url: '/api/records',
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              form.val("classifyForm", {
                price: '',
                remark: ''
              })
              table.reload('recordTable', {
                where: {} //设定异步数据接口的额外参数
              });
            }
          });
        }

        function checkClassifyBtn(ele, type) {
          if (type) {
            chooseId = $(ele).attr('data-id')
            $(ele).addClass('layui-btn-normal')
            $(ele).removeClass('layui-btn-primary')
          } else {
            $(ele).removeClass('layui-btn-normal')
            $(ele).addClass('layui-btn-primary')
          }
        }
      })
    </script>
  </body>
</html>