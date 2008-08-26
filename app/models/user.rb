class User < ActiveRecord::Base
  validates_presence_of :name
  has_many :own_repositories, :class_name => "Repository", :foreign_key => "user_id"
  has_many :taggings
  has_many :repositories, :through => :taggings

  make_permalink :with => :name
end
