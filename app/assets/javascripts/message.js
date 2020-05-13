$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
     var html =
      `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } 
    else {
     var html =
      `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
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
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  })

  //自動更新用の関数定義
  let reloadMessages = function () {

      //ブラウザに表示されている最後のメッセージからidを取得して、変数に代入
      let last_message_id = $('.message:last').data("message-id");

      //ajaxの処理   
      $.ajax({
        //今回はapiのmessagesコントローラーに飛ばす
        url: "api/messages",
        //HTTP＿メソッド
        type: 'get',
        //データはjson型で
        dataType: 'json',
        //キーを自分で決め（今回はｌａｓｔ_id)そこに先ほど定義したlast_message_idを代入。これはコントローラーのparamsで取得される。
        data: {last_id: last_message_id} 
      })

    //doneの処理
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するhtmlの入れ物をつくる
        let insertHTML = '';
        //取得したメッセージたちをEach文で分解
        messages.forEach(function (message) {
        //htmlを作り出して、それを変数に代入(作り出す処理は非同期の時に作った)
        insertHTML = buildHTML(message);
        });
        //変数に代入されたhtmlをmessagesクラスにぶち込む
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
  
    //failの処理
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 2000);
  }
});