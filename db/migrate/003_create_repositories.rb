class CreateRepositories < ActiveRecord::Migration
  def self.up
    create_table :repositories do |t|
      t.string :url, :name, :author, :permalink
      t.integer :user_id
      t.timestamps
    end
    add_index :repositories, :url
    add_index :repositories, :permalink
  end

  def self.down
    drop_table :repositories
  end
end
