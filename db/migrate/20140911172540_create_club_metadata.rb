class CreateClubMetadata < ActiveRecord::Migration
  def change
    create_table :club_metadata do |t|
      t.string :title, :null => false
      t.text :history
      t.string :founded
      t.string :stadium
      t.string :stadium_capacity
      t.string :coach
      t.string :website
      t.string :rival
    end
  end
end
