class Tag < ActiveRecord::Base
  DELIMITER = "," unless const_defined?("DELIMITER") # Controls how to split and join tagnames from strings. You may need to change the <tt>validates_format_of parameters</tt> if you change this.
  # If database speed becomes an issue, you could remove these validations and rescue the ActiveRecord database constraint errors instead.
  validates_presence_of :name
  validates_uniqueness_of :name, :url, :case_sensitive => false
  
  # Change this validation if you need more complex tag names.
  #validates_format_of :name, :with => /^[a-zA-Z0-9\_\-]+$/, :message => "can not contain special characters"
  
  #alias_attribute :to_s, :name
  
  has_many :taggings, :dependent => :destroy
  has_many :repositories, :through => :taggings
  
  make_permalink :with => :name
  serialize_fu :only => [:name]
    
  # Callback to strip extra spaces from the tagname before saving it. If you allow tags to be renamed later, you might want to use the <tt>before_save</tt> callback instead.
  def before_create 
    self.name = name.downcase.strip.squeeze(" ")
  end
  
  # LIKE is used for cross-database case-insensitivity
  def self.find_or_create_with_like_by_name(name)
    find(:first, :conditions => ["name LIKE ?", name]) || create(:name => name)
  end
  
  def ==(object)
    super || (object.is_a?(Tag) && name == object.name)
  end
    
end
