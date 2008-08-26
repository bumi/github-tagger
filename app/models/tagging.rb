class Tagging < ActiveRecord::Base 
  serialize_fu :only => [:created_at], :methods => [:tag_name]
  
  belongs_to :tag
  belongs_to :repository
  belongs_to :user
  validates_uniqueness_of :tag_id, :scope=>[:user_id, :repository_id]
  
  def tag_name
    self.tag.name
  end
  
  def self.create_from_list(list,user)
    list.split(Tag::DELIMITER).each do |tag_name|
      self.create(:tag => Tag.find_or_create_by_name(tag_name), :user => user)
    end
  end
  
  def user=(value)
    self.user_id = value.is_a?(User) ? value.id : User.find_or_create_by_name(value).id
  end
  
  # If you also need to use <tt>acts_as_list</tt>, you will have to manage the tagging positions manually by creating decorated join records when you associate Tags with taggables.
  # acts_as_list :scope => :taggable
    
  # This callback makes sure that an orphaned <tt>Tag</tt> is deleted if it no longer tags anything.
  def after_destroy
    tag.destroy_without_callbacks if tag and tag.taggings.count == 0
  end    
end
