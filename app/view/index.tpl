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
            <li lay-id='{{loop.index}}'>
              {{generaMap[group._id]}}
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
        <div class="layui-form-item">
          <label class="layui-form-label">选择框</label>
          <div class="layui-input-block">
            <select name="account" lay-verify="required">
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
    </div>
    <script src="//cdn.junn.top/layui/2.4.3/layui.js"></script>
    <script>

      layui.use([
        'form', 'laydate', 'element', 'jquery'
      ], function () {
        var form = layui.form,
          layer = layui.layer,
          element = layui.element,
          $ = layui.jquery,
          laydate = layui.laydate;
        var chooseId = null;
        init()
        function init() {
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

        function createRecord(data) {
          $.ajax({
            url: '/api/records',
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
              form.val("classifyForm", {price: '', remark: ''})
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