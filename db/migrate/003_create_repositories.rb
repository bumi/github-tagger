class CreateRepositories < ActiveRecord::Migration
  def self.up
    create_table :repositories do |t|
      t.string :url, :name, :author, :permalink
      t.integer :user_id
      t.timestamps
    end
    add_index :url
    add_index :permalink
  end

  def self.down
    drop_table :repositories
  end
end
