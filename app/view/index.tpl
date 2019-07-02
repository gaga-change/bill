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
    </style>
  </head>
  <body>
    <div class="layui-container container">
     <form class="layui-form" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">金额</label>
        <div class="layui-input-block">
          <input type="text" name="title" required  lay-verify="required" placeholder="请输入金额" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">选择框</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            {% for item in accountList %}
              <option value="{{item.id}}">
                {{item.name}}</option>
            {% endfor %}
          </select>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form></div>
    <script src="//cdn.junn.top/layui/2.4.3/layui.js"></script>
    <script>
      layui.use([
        'form', 'laydate'
      ], function () {
        var form = layui.form,
          layer = layui.layer,
          laydate = layui.laydate;
        form.on('submit(formDemo)', function (data) {
          layer.msg(JSON.stringify(data.field));
          console.log(data.field)
          return false;
        });
      })
    </script>
  </body>
</html>