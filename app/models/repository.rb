class Repository < ActiveRecord::Base
  serialize_fu :only => [:url, :name, :permalink], :include => :tags, :methods => [:tag_list]
  
  validates_presence_of :url
  validates_uniqueness_of :url
  
  acts_as_taggable
  
  belongs_to :user
  
  make_permalink :with => :url
  
  def tag_list
    tags.map(&:name).join(" ")
  end
  def self.create_from_url(url)
    return if url.blank?
    url, author, name  = parse_url(url)[0..2]
    create(:url => url, :name => name, :author => author)
  end
  
  def self.find_or_create_from_url(url)
    return if url.blank?
    url, author, name  = parse_url(url)[0..2]
    find_by_url(url) ||  create_from_url(url)
  end
  
  def full_url=(value)
    url, author, name  = parse_url(value)[0..2]
    write_attribute(:author, author)
    write_attribute(:name, name)
    write_attribute(:url, url)
  end
  
  def user=(value)
    self.user_id = value.is_a?(User) ? value.id : User.find_or_create_by_name(value).id
  end
  
  
  protected
    def self.parse_url(value)
      value.match(/http[s]?:\/\/github.com\/([^\/]*)\/([^\/]*)/)
    end
    def parse_url(value)
      self.class.parse_url(value)
    end
    
    def escape(value)
      Digest::MD5.hexdigest value
    end

end
