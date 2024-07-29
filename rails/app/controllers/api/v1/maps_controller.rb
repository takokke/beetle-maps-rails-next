class Api::V1::MapsController < ApplicationController
    def show
        # 地図上に表示されているデータのみを取り出す
        point_tr = {"lat" => params[:top_right_latitude] || nil, "lon" => params[:top_right_longitude] || nil} # 地図の右上の緯度経度
        point_bl = {"lat" => params[:bottom_left_latitude] || nil, "lon" => params[:bottom_left_longitude] || nil} # 地図の左上の緯度経度

        # 上記の一つでもnilの時、render json: []で終了
        if point_tr["lat"].nil? || point_tr["lon"].nil? || point_bl["lat"].nil? || point_bl["lon"].nil?
            render json: []
            return 
        end

        # 日本の範囲を超えて表示されている場合は空を返す
        # 北緯 20度から45度の間 東経 120度から150度の間 

        # 一つの地方のおよその範囲は、131.14614691411475 - 136.7431440531297 = 5.596997139より
        # 経度の差が5.597以上の時は何も返さない
        if (point_tr["lon"].to_f - point_bl["lon"].to_f).abs >= 5.597
            render json: []
            return
        end
        
        # 数の制限がいるかも
        # 最新の投稿をlimit 50で取得
        posts = Post.where(
            "latitude < ? AND latitude > ? AND longitude < ? AND longitude > ?", 
            point_tr["lat"],
            point_bl["lat"], 
            point_tr["lon"],
            point_bl["lon"]
        )
        render json: posts
    end
end
