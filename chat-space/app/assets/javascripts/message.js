$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message-list__box">
        <div class="message-list__box__info">
          <div class="message-list__box__info__name">
            ${message.user_name}
          </div>
          <div class="message-list__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__box__text">
          ${message.body}
        </div>
        <div class="message__image">
        <img class="message__image" src="${message.image}">
      </div>`
      return html;
    } else {
      var html =
      `<div class="message-list__box">
        <div class="message-list__box__info">
          <div class="message-list__box__info__name">
            ${message.user_name}
          </div>
          <div class="message-list__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__box__text">
          ${message.body}
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.message-form__new__btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});