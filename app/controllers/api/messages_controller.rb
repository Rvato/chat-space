class Api::MessagesController < ApplicationController
  def index
    #今いるグループの情報をparamsによって取得し変数@groupに代入
    @group = Group.find(params[:group_id]) 

    #グループ内のメッセージでlast_idよりも大きいidのメッセージがないかを探してきてそれらを@messageに代入
    @messages = @group.messages.includes(:user).where('id > ?', params[:last_id])
  end
end