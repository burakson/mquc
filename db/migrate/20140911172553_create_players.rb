class CreatePlayers < ActiveRecord::Migration
  def up
    create_table :players do |t|
      t.string :name, :null => false
      t.string :fullname
      t.integer :jersey_number
      t.integer :age
      t.string :url
      t.string :picture
      t.integer :is_god, :default => 0
      t.timestamps
    end
  end
 
  def down
    drop_table :players
  end
end
