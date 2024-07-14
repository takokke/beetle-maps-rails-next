class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :creature_name, comment: "生き物の名前"
      t.text :caption, comment: "説明"
      t.float :latitude, default: 0.0, comment: "緯度"
      t.float :longitude, default: 0.0, comment: "軽度"
      t.string :address, comment: "住所"
      t.date :discover_date, comment: "発見日"
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
