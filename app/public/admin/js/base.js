$(function() {
  app.init()
})
var app = {
  init() {
    $('.aside h4').click(function() {
      $(this)
        .siblings('ul')
        .slideToggle()
    })
  },
  changeStatus(el, model, attr, id) {
    console.log(el.src)
    $.get('/admin/changeStatus', { model, attr, id }, function(param) {
      if (param.success) {
        // 跟新成功 修改状态
        if (el.src.indexOf('yes') == -1) {
          el.src = '/public/admin/images/yes.gif'
        } else {
          el.src = '/public/admin/images/no.gif'
        }
      }
    })
    console.log(el, model, attr, id)
  },
  editName: function(el, model, attr, id) {
    var val = $(el).html()
    var input = $('<input />')
    $(el).html(input)
    $(input).trigger('focus');
    $(input).val(val);
    $(input).click(function() {
      return false
    })
    $(input).blur(function() {
      $(el).html($(this).val())
      var num = $(this).val();
      $.get('/admin/editNum', { model, attr, id, num:num }, function(param) {
        // if (param.success) {
        //   // 跟新成功 修改状态
        //   if (el.src.indexOf('yes') == -1) {
        //     el.src = '/public/admin/images/yes.gif'
        //   } else {
        //     el.src = '/public/admin/images/no.gif'
        //   }
        // }
      })
    })
  }
}
